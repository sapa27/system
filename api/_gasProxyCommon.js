"use strict";

const RELEASE_STAMP = "commission-v1.2-hotfix-track-meeting-2026-07-09-r12";
const MAX_BODY_BYTES = 1048576;
const DEFAULT_PROXY_TIMEOUT_MS = Number(process.env.GAS_PROXY_TIMEOUT_MS || 9000) || 9000;
const MAX_PROXY_TIMEOUT_MS = Number(process.env.GAS_PROXY_MAX_TIMEOUT_MS || 25000) || 25000;

function header(res, key, value) {
  try { res.setHeader(key, value); } catch (_) {}
}

function noStore(res) {
  header(res, "Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
  header(res, "Pragma", "no-cache");
  header(res, "X-Production-Vercel-Proxy", RELEASE_STAMP);
}

function json(res, status, body) {
  noStore(res);
  header(res, "Content-Type", "application/json; charset=utf-8");
  res.statusCode = status || 200;
  res.end(JSON.stringify(body == null ? {} : body));
}

function methodNotAllowed(res, allowed) {
  header(res, "Allow", allowed || "POST, OPTIONS");
  return json(res, 405, {
    ok: false,
    error: "Method not allowed",
    errorCode: "METHOD_NOT_ALLOWED",
    releaseStamp: RELEASE_STAMP,
  });
}

function text(value) {
  return value == null ? "" : String(value);
}

function normalizeGasWebAppUrl(url) {
  url = text(url).trim();
  if ((url.startsWith('"') && url.endsWith('"')) || (url.startsWith("'") && url.endsWith("'"))) {
    url = url.slice(1, -1).trim();
  }
  url = url.replace(/\s+/g, "");
  url = url.replace(/\/exec\/(?=($|[?#]))/i, "/exec");
  return url;
}

function gasUrl() {
  return normalizeGasWebAppUrl(process.env.GAS_WEB_APP_URL || process.env.VERCEL_GAS_WEB_APP_URL || "");
}

function isLikelyGasExecUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/i.test(normalizeGasWebAppUrl(url));
}

function normalizeTimeoutMs(value, fallback, maxValue) {
  const fallbackMs = Number(fallback || DEFAULT_PROXY_TIMEOUT_MS) || DEFAULT_PROXY_TIMEOUT_MS;
  const maxMs = Math.max(1000, Math.min(Number(maxValue || MAX_PROXY_TIMEOUT_MS) || MAX_PROXY_TIMEOUT_MS, MAX_PROXY_TIMEOUT_MS));
  const raw = Number(value == null || value === "" ? fallbackMs : value);
  if (!Number.isFinite(raw) || raw <= 0) return Math.min(fallbackMs, maxMs);
  return Math.max(1000, Math.min(Math.floor(raw), maxMs));
}

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value) && !Buffer.isBuffer(value) && !(value instanceof Uint8Array);
}

function safeMethod(method) {
  method = text(method).trim();
  return /^api[A-Za-z0-9_]+$/.test(method) || method === "apiRouter" || method === "getDeferredInclude" ? method : "";
}

function redact(value) {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(redact);
  const out = {};
  for (const [key, child] of Object.entries(value)) {
    out[key] = /password|pass|pwd|token|csrf|secret|authorization|cookie/i.test(key) ? "[redacted]" : redact(child);
  }
  return out;
}

function clientIp(req) {
  return text(req && req.headers && req.headers["x-forwarded-for"] || "").split(",")[0].trim() || text(req && req.socket && req.socket.remoteAddress || "");
}

function jsonByteLength(str) {
  return Buffer.byteLength(text(str), "utf8");
}

function parseJsonText(raw) {
  if (!text(raw).trim()) return {};
  try { return JSON.parse(raw); } catch (_) { return null; }
}

async function readJsonBody(req) {
  if (req && req.body !== undefined && req.body !== null) {
    if (isPlainObject(req.body)) return req.body;
    if (typeof req.body === "string") return parseJsonText(req.body);
    if (Buffer.isBuffer(req.body) || req.body instanceof Uint8Array) return parseJsonText(Buffer.from(req.body).toString("utf8"));
  }

  if (!req || typeof req[Symbol.asyncIterator] !== "function") return {};
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_BODY_BYTES) {
      const err = new Error("Payload too large");
      err.code = "PAYLOAD_TOO_LARGE";
      throw err;
    }
    chunks.push(buf);
  }
  return parseJsonText(Buffer.concat(chunks).toString("utf8"));
}

function normalizeProxyBody(body, fallbackMethod) {
  body = isPlainObject(body) ? body : {};
  const request = isPlainObject(body.request) ? body.request : {};
  const method = safeMethod(fallbackMethod || body.method || body.action || request.method || "");
  let payload = isPlainObject(body.payload)
    ? body.payload
    : isPlainObject(body.params)
      ? body.params
      : isPlainObject(body.data)
        ? body.data
        : isPlainObject(request.payload)
          ? request.payload
          : isPlainObject(request.params)
            ? request.params
            : isPlainObject(request.data)
              ? request.data
              : null;
  if (!payload) {
    const loosePayload = Object.assign({}, body);
    ["method", "action", "request", "timeoutMs", "releaseStamp", "source", "bridge", "requestId"].forEach((key) => delete loosePayload[key]);
    payload = Object.keys(loosePayload).length ? loosePayload : {};
  }
  return { method, payload };
}

async function callGas({ method, payload, req, timeoutMs }) {
  const url = gasUrl();
  if (!url) {
    return {
      status: 500,
      body: {
        ok: false,
        error: "ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL ใน Vercel Environment Variables",
        errorCode: "GAS_WEB_APP_URL_MISSING",
        method,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
      },
    };
  }
  if (!isLikelyGasExecUrl(url)) {
    return {
      status: 500,
      body: {
        ok: false,
        error: "GAS_WEB_APP_URL ไม่ถูกต้อง ต้องเป็น Apps Script Web App /exec URL เท่านั้น ห้ามใช้ /dev กับ Vercel proxy",
        errorCode: "GAS_WEB_APP_URL_INVALID",
        method,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
      },
    };
  }
  if (!method) {
    return {
      status: 400,
      body: { ok: false, error: "method required", errorCode: "METHOD_REQUIRED", transport: "vercel-api-proxy", releaseStamp: RELEASE_STAMP },
    };
  }

  const requestId = "vercel_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  const started = Date.now();
  const controller = new AbortController();
  const effectiveTimeoutMs = normalizeTimeoutMs(timeoutMs || process.env.GAS_PROXY_TIMEOUT_MS, DEFAULT_PROXY_TIMEOUT_MS, MAX_PROXY_TIMEOUT_MS);
  const timer = setTimeout(() => controller.abort(), effectiveTimeoutMs);
  const safePayload = isPlainObject(payload) ? Object.assign({}, payload) : {};
  delete safePayload.__clientGasWebAppUrl;

  const envelope = {
    method,
    payload: Object.assign({}, safePayload, {
      __productionVercelProxy: true,
      __vercelRequestId: requestId,
      __vercelForwardedFor: clientIp(req),
      __vercelReleaseStamp: RELEASE_STAMP,
    }),
    bridge: "vercel-api-proxy",
    source: "vercel-api-proxy",
    requestId,
    releaseStamp: RELEASE_STAMP,
  };
  const bodyText = JSON.stringify(envelope);
  if (jsonByteLength(bodyText) > MAX_BODY_BYTES) {
    clearTimeout(timer);
    return {
      status: 413,
      body: {
        ok: false,
        error: "API payload ใหญ่เกินขนาดที่ Vercel proxy อนุญาต",
        errorCode: "PAYLOAD_TOO_LARGE",
        method,
        requestId,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
      },
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json, text/plain, */*",
        "X-Production-Vercel-Proxy": RELEASE_STAMP,
        "X-Vercel-Proxy-Method": method,
        "X-Vercel-Proxy-Request-Id": requestId,
      },
      body: bodyText,
      signal: controller.signal,
    });
    const raw = await response.text();
    let result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch (_) {
      const html = /<html|<!doctype/i.test(raw);
      result = {
        ok: false,
        error: html ? "GAS ส่ง HTML กลับมา ไม่ใช่ JSON: ตรวจว่า GAS_WEB_APP_URL เป็น /exec และ Deploy access เป็น Anyone/Anyone with link" : "GAS response ไม่ใช่ JSON",
        errorCode: html ? "GAS_RETURNED_HTML_NOT_JSON" : "GAS_RESPONSE_NOT_JSON",
        method,
        httpStatus: response.status,
        contentType: response.headers.get("content-type") || "",
        rawPreview: raw.slice(0, 300),
      };
    }
    if (!result || typeof result !== "object") result = { ok: false, error: "GAS response empty", errorCode: "GAS_RESPONSE_EMPTY", method };
    result.method = result.method || method;
    result.requestId = result.requestId || requestId;
    result.transport = result.transport || "vercel-api-proxy";
    result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
    result.meta = Object.assign({}, isPlainObject(result.meta) ? result.meta : {}, {
      vercelProxy: true,
      productionCurrent: true,
      releaseStamp: RELEASE_STAMP,
      httpStatus: response.status,
      requestId,
      durationMs: Date.now() - started,
      timeoutMs: effectiveTimeoutMs,
    });
    if (!response.ok && result.ok !== false) {
      result.ok = false;
      result.error = result.error || "GAS HTTP error " + response.status;
      result.errorCode = result.errorCode || "GAS_HTTP_ERROR";
    }
    return { status: 200, body: result };
  } catch (err) {
    const aborted = err && err.name === "AbortError";
    return {
      status: aborted ? 504 : 502,
      body: {
        ok: false,
        error: aborted ? "GAS API timeout ผ่าน Vercel proxy" : text(err && err.message || err),
        errorCode: aborted ? "VERCEL_PROXY_GAS_TIMEOUT" : "VERCEL_PROXY_GAS_FAILED",
        method,
        requestId,
        transport: "vercel-api-proxy",
        releaseStamp: RELEASE_STAMP,
        meta: {
          vercelProxy: true,
          productionCurrent: true,
          durationMs: Date.now() - started,
          timeoutMs: effectiveTimeoutMs,
          releaseStamp: RELEASE_STAMP,
        },
      },
    };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  RELEASE_STAMP,
  noStore,
  json,
  methodNotAllowed,
  gasUrl,
  normalizeGasWebAppUrl,
  isLikelyGasExecUrl,
  normalizeTimeoutMs,
  safeMethod,
  readJsonBody,
  normalizeProxyBody,
  callGas,
  redact,
};
