'use strict';

const RELEASE_STAMP = 'commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1';
const MAX_BODY_BYTES = 1024 * 1024;

function header(res, key, value) {
  try { res.setHeader(key, value); } catch (_) {}
}

function noStore(res) {
  header(res, 'Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate');
  header(res, 'Pragma', 'no-cache');
  header(res, 'X-Phase-Q-Vercel-Proxy', RELEASE_STAMP);
  header(res, 'X-Single-Owner-Registry', RELEASE_STAMP);
}

function json(res, status, body) {
  noStore(res);
  header(res, 'Content-Type', 'application/json; charset=utf-8');
  res.statusCode = status || 200;
  res.end(JSON.stringify(body == null ? {} : body));
}

function methodNotAllowed(res, allowed) {
  header(res, 'Allow', allowed || 'POST, OPTIONS');
  return json(res, 405, { ok: false, error: 'Method not allowed', errorCode: 'METHOD_NOT_ALLOWED', releaseStamp: RELEASE_STAMP });
}

function gasUrl() {
  return String(process.env.GAS_WEB_APP_URL || process.env.VERCEL_GAS_WEB_APP_URL || process.env.NEXT_PUBLIC_GAS_WEB_APP_URL || '').trim();
}

function isLikelyGasExecUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/(exec|dev)(?:[?#].*)?$/i.test(String(url || '').trim());
}

function safeMethod(method) {
  method = String(method || '').trim();
  return /^api[A-Za-z0-9_]+$/.test(method) || method === 'apiRouter' || method === 'getDeferredInclude' ? method : '';
}

function redact(value) {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(redact);
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (/password|pass|pwd|token|csrf|secret|authorization|cookie/i.test(k)) out[k] = '[redacted]';
    else out[k] = redact(v);
  }
  return out;
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || String(req.socket && req.socket.remoteAddress || '');
}

function jsonByteLength(str) {
  return Buffer.byteLength(String(str || ''), 'utf8');
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.trim()) {
    try { return JSON.parse(req.body); } catch (_) { return null; }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_BODY_BYTES) {
      const err = new Error('Payload too large');
      err.code = 'PAYLOAD_TOO_LARGE';
      throw err;
    }
    chunks.push(buf);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return {};
  try { return JSON.parse(raw); }
  catch (_) { return null; }
}

function normalizeProxyBody(body, fallbackMethod) {
  body = body && typeof body === 'object' && !Array.isArray(body) ? body : {};
  const method = safeMethod(fallbackMethod || body.method || body.action || (body.request && body.request.method) || '');
  const payload = body.payload && typeof body.payload === 'object' && !Array.isArray(body.payload)
    ? body.payload
    : (body.params && typeof body.params === 'object' && !Array.isArray(body.params) ? body.params : (body.data && typeof body.data === 'object' && !Array.isArray(body.data) ? body.data : {}));
  return { method, payload };
}

async function callGas({ method, payload, req, timeoutMs }) {
  const url = gasUrl();
  if (!url) {
    return { status: 500, body: { ok: false, error: 'ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL ใน Vercel Environment Variables', errorCode: 'GAS_WEB_APP_URL_MISSING', method, transport: 'vercel-api-proxy', releaseStamp: RELEASE_STAMP } };
  }
  if (!isLikelyGasExecUrl(url)) {
    return { status: 500, body: { ok: false, error: 'GAS_WEB_APP_URL ไม่ถูกต้อง ต้องเป็น Apps Script Web App /exec หรือ /dev URL', errorCode: 'GAS_WEB_APP_URL_INVALID', method, transport: 'vercel-api-proxy', releaseStamp: RELEASE_STAMP } };
  }
  if (!method) {
    return { status: 400, body: { ok: false, error: 'method required', errorCode: 'METHOD_REQUIRED', transport: 'vercel-api-proxy', releaseStamp: RELEASE_STAMP } };
  }
  const requestId = 'vercel_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(timeoutMs || process.env.GAS_PROXY_TIMEOUT_MS || 55000) || 55000);
  const safePayload = payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {};
  const envelope = {
    method,
    payload: Object.assign({}, safePayload, {
      __phaseQVercelProxy: true,
      __singleOwnerRegistry: true,
      __vercelRequestId: requestId,
      __vercelForwardedFor: clientIp(req),
      __vercelReleaseStamp: RELEASE_STAMP,
    }),
    bridge: 'vercel-api-proxy',
    source: 'vercel-api-proxy',
    requestId,
    releaseStamp: RELEASE_STAMP,
  };
  const bodyText = JSON.stringify(envelope);
  if (jsonByteLength(bodyText) > MAX_BODY_BYTES) {
    clearTimeout(timer);
    return { status: 413, body: { ok: false, error: 'API payload ใหญ่เกินขนาดที่ Vercel proxy อนุญาต', errorCode: 'PAYLOAD_TOO_LARGE', method, requestId, transport: 'vercel-api-proxy', releaseStamp: RELEASE_STAMP } };
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain, */*',
        'X-Phase-Q-Vercel-Proxy': RELEASE_STAMP,
        'X-Single-Owner-Registry': RELEASE_STAMP,
      'X-Single-Release-Gate': 'tools/release_gate.py',
        'X-Vercel-Proxy-Method': method,
        'X-Vercel-Proxy-Request-Id': requestId,
      },
      body: bodyText,
      signal: controller.signal,
    });
    const raw = await response.text();
    let result;
    try { result = raw ? JSON.parse(raw) : {}; }
    catch (_) {
      result = { ok: false, error: 'GAS response ไม่ใช่ JSON', errorCode: 'GAS_RESPONSE_NOT_JSON', method, rawPreview: raw.slice(0, 300) };
    }
    if (!result || typeof result !== 'object') result = { ok: false, error: 'GAS response empty', errorCode: 'GAS_RESPONSE_EMPTY', method };
    result.method = result.method || method;
    result.requestId = result.requestId || requestId;
    result.transport = result.transport || 'vercel-api-proxy';
    result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
    result.meta = Object.assign({}, result.meta && typeof result.meta === 'object' ? result.meta : {}, {
      vercelProxy: true,
      phaseQ: true,
      singleOwnerRegistry: true,
      releaseStamp: RELEASE_STAMP,
      httpStatus: response.status,
      requestId,
      durationMs: Date.now() - started,
    });
    if (!response.ok && result.ok !== false) {
      result.ok = false;
      result.error = result.error || 'GAS HTTP error ' + response.status;
      result.errorCode = result.errorCode || 'GAS_HTTP_ERROR';
    }
    return { status: 200, body: result };
  } catch (err) {
    const aborted = err && err.name === 'AbortError';
    return { status: aborted ? 504 : 502, body: { ok: false, error: aborted ? 'GAS API timeout ผ่าน Vercel proxy' : String(err && err.message || err), errorCode: aborted ? 'VERCEL_PROXY_GAS_TIMEOUT' : 'VERCEL_PROXY_GAS_FAILED', method, requestId, transport: 'vercel-api-proxy', releaseStamp: RELEASE_STAMP, meta: { vercelProxy: true, phaseQ: true, singleOwnerRegistry: true, durationMs: Date.now() - started, releaseStamp: RELEASE_STAMP } } };
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
  isLikelyGasExecUrl,
  safeMethod,
  readJsonBody,
  normalizeProxyBody,
  callGas,
  redact,
};
