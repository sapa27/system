'use strict';
const { json, methodNotAllowed, readJsonBody, normalizeProxyBody, callGas, RELEASE_STAMP } = require('./_gasProxyCommon');

function text(v) { return v == null ? '' : String(v); }

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true, allow: 'POST, OPTIONS', releaseStamp: RELEASE_STAMP });
  if (req.method !== 'POST') return methodNotAllowed(res, 'POST, OPTIONS');
  try {
    const body = await readJsonBody(req);
    if (body == null) return json(res, 400, { ok: false, error: 'JSON request body ไม่ถูกต้อง', errorCode: 'BAD_JSON', method: 'apiLogin', transport: 'vercel-login-proxy', releaseStamp: RELEASE_STAMP });
    const normalized = normalizeProxyBody(body, 'apiLogin');
    const payload = normalized.payload || {};
    const username = text(payload.username || payload.user || payload.userId || payload.email).trim();
    const password = text(payload.password || payload.pass || payload.pwd).trim();
    if (!username) return json(res, 400, { ok: false, error: 'กรุณาระบุ username ก่อนเข้าสู่ระบบ', errorCode: 'USERNAME_REQUIRED', method: 'apiLogin', transport: 'vercel-login-proxy', releaseStamp: RELEASE_STAMP });
    if (!password) return json(res, 400, { ok: false, error: 'กรุณาระบุ password ก่อนเข้าสู่ระบบ', errorCode: 'PASSWORD_REQUIRED', method: 'apiLogin', transport: 'vercel-login-proxy', releaseStamp: RELEASE_STAMP });
    const result = await callGas({ method: 'apiLogin', payload, req, timeoutMs: body.timeoutMs || process.env.GAS_LOGIN_PROXY_TIMEOUT_MS || 30000 });
    result.body.transport = result.body.transport || 'vercel-login-proxy';
    if (result.body && result.body.ok) {
      try {
        const maxAge = 60 * 60 * 8;
        res.setHeader('Set-Cookie', [
          'commission_proxy_login=1; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=' + maxAge,
        ]);
      } catch (_) {}
    }
    return json(res, result.status, result.body);
  } catch (err) {
    return json(res, err && err.code === 'PAYLOAD_TOO_LARGE' ? 413 : 500, { ok: false, error: String(err && err.message || err), errorCode: err && err.code || 'VERCEL_LOGIN_PROXY_ERROR', method: 'apiLogin', transport: 'vercel-login-proxy', releaseStamp: RELEASE_STAMP });
  }
};
