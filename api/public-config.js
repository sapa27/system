'use strict';
const { json, methodNotAllowed, gasUrl, isLikelyGasExecUrl, RELEASE_STAMP } = require('./_gasProxyCommon');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true, allow: 'GET, OPTIONS', releaseStamp: RELEASE_STAMP });
  if (req.method !== 'GET') return methodNotAllowed(res, 'GET, OPTIONS');
  const url = gasUrl();
  if (!url) return json(res, 500, { ok: false, error: 'ยังไม่ได้ตั้งค่า GAS_WEB_APP_URL ใน Vercel Environment Variables', errorCode: 'GAS_WEB_APP_URL_MISSING', transport: 'vercel-public-config-proxy', releaseStamp: RELEASE_STAMP });
  if (!isLikelyGasExecUrl(url)) return json(res, 500, { ok: false, error: 'GAS_WEB_APP_URL ไม่ถูกต้อง ต้องเป็น Apps Script Web App /exec หรือ /dev URL', errorCode: 'GAS_WEB_APP_URL_INVALID', transport: 'vercel-public-config-proxy', releaseStamp: RELEASE_STAMP });
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.GAS_PUBLIC_CONFIG_TIMEOUT_MS || 8000));
  try {
    const endpoint = url + (url.indexOf('?') >= 0 ? '&' : '?') + '__githubPublicConfig=1&_=' + Date.now();
    const response = await fetch(endpoint, { method: 'GET', redirect: 'follow', headers: { 'Accept': 'application/json, text/plain, */*', 'X-Phase-Q-Vercel-Proxy': RELEASE_STAMP }, signal: controller.signal });
    const raw = await response.text();
    let result;
    try { result = raw ? JSON.parse(raw) : {}; }
    catch (_) { result = { ok: false, error: 'GAS public config response ไม่ใช่ JSON', errorCode: 'GAS_PUBLIC_CONFIG_NOT_JSON', rawPreview: raw.slice(0, 300) }; }
    result = result && typeof result === 'object' ? result : {};
    result.transport = result.transport || 'vercel-public-config-proxy';
    result.releaseStamp = result.releaseStamp || RELEASE_STAMP;
    result.meta = Object.assign({}, result.meta && typeof result.meta === 'object' ? result.meta : {}, { vercelProxy: true, phaseQ: true, releaseStamp: RELEASE_STAMP, durationMs: Date.now() - started, httpStatus: response.status });
    if (!response.ok && result.ok !== false) {
      result.ok = false;
      result.error = result.error || 'GAS public config HTTP error ' + response.status;
      result.errorCode = result.errorCode || 'GAS_PUBLIC_CONFIG_HTTP_ERROR';
    }
    return json(res, 200, result);
  } catch (err) {
    const aborted = err && err.name === 'AbortError';
    return json(res, aborted ? 504 : 502, { ok: false, error: aborted ? 'GAS public config timeout ผ่าน Vercel proxy' : String(err && err.message || err), errorCode: aborted ? 'VERCEL_PUBLIC_CONFIG_TIMEOUT' : 'VERCEL_PUBLIC_CONFIG_FAILED', transport: 'vercel-public-config-proxy', releaseStamp: RELEASE_STAMP, meta: { vercelProxy: true, phaseQ: true, durationMs: Date.now() - started } });
  } finally {
    clearTimeout(timer);
  }
};
