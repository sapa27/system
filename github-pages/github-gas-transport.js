/* Vercel/GAS transport.
 * Phase Q transport contract:
 *   - Browser login uses same-origin Vercel /api/login proxy only.
 *   - Browser read/write API calls use same-origin Vercel /api/gas proxy only.
 *   - Public config uses same-origin Vercel /api/public-config proxy only.
 *   - No browser fallback transport is present in this runtime.
 */
(function(root, doc) {
'use strict';
if (!root || !doc) return;

var FALLBACK_LOGO = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E';
var PHASE_RELEASE_STAMP = 'commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1';
var PHASE_ASSET_STAMP = 'asset-manifest-commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1';
var PHASE_TRANSPORT_MODE = 'phaseQ-vercel-proxy-only-runtime-slim-single-gate';
var manifest = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || {};
var cache = Object.create(null);
var apiCache = Object.create(null);
var apiInFlight = Object.create(null);
var apiMetrics = { calls: 0, cacheHits: 0, cacheWrites: 0, dedupeHits: 0, vercelProxyCalls: 0, errors: 0, last: [] };
var lastPublicConfig = null;
var lastReleaseMismatch = null;

function text(v) { return v == null ? '' : String(v); }
function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
function safeName(name) { return /^[A-Za-z0-9_\-]+$/.test(text(name)); }
function cfg(name, fallback) { var c = root.APP_CONFIG || {}; return c[name] == null || c[name] === '' ? fallback : c[name]; }
function cfgList(name) { var value = cfg(name, []); if (Array.isArray(value)) return value.map(text).filter(Boolean); return text(value).split(',').map(function(x){ return x.trim(); }).filter(Boolean); }
function normalizeUrl(url) { url = text(url).trim(); return url ? url.replace(/\s+/g, '') : ''; }
function sameOriginProxyUrl(name, fallback) { var raw = text(cfg(name, fallback || '')).trim() || fallback || ''; try { return new URL(raw, root.location && root.location.href || './').href; } catch (_) { return raw || fallback || ''; } }
function vercelApiProxyUrl() { return sameOriginProxyUrl('vercelApiProxyUrl', '/api/gas'); }
function vercelLoginProxyUrl() { return sameOriginProxyUrl('vercelLoginProxyUrl', '/api/login'); }
function vercelPublicConfigProxyUrl() { return sameOriginProxyUrl('vercelPublicConfigProxyUrl', '/api/public-config'); }
function isSafeLogoUrl(url) { url = normalizeUrl(url); return !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url); }
function markBadLogo(url) { try { url = normalizeUrl(url); if (url && url !== FALLBACK_LOGO) { root.localStorage && root.localStorage.setItem('APP_BAD_LOGO_URL', url); root.localStorage && root.localStorage.removeItem('APP_LOGO_URL'); } } catch (_) {} }
function isBadLogo(url) { try { return normalizeUrl(url) && normalizeUrl(url) === normalizeUrl(root.localStorage && root.localStorage.getItem('APP_BAD_LOGO_URL') || ''); } catch (_) { return false; } }
function bridgeError(message, code, method) { var err = new Error(message); err.code = code || 'VERCEL_PROXY_TRANSPORT_ERROR'; err.errorCode = err.code; err.method = method || ''; err.transportMode = PHASE_TRANSPORT_MODE; return err; }
function vercelProxyEnabled() { return true; }
function payloadWantsFresh(payload) { payload = isObj(payload) ? payload : {}; return payload.forceFresh === true || payload.noCache === true || payload.bypassCache === true || Number(payload.cacheTtlSeconds) === 0; }
function isWriteApiMethod(method) { method = text(method).trim(); if (!method) return false; if (/^api(?:Save|Delete|Update|Create|Import|Extract|Upload|Issue|Process|Cleanup|Generate|Send|Patch|Approve|Reject|Submit|Queue|Migrate|Revoke|Refresh)/i.test(method)) return true; if (/^api(?:Admin)?(?:Save|Delete|Update|Create)/i.test(method)) return true; if (/^apiBudget(?:Save|Delete|Import)/i.test(method)) return true; return false; }
function isReadApiMethod(method) { method = text(method).trim(); if (!method) return false; if (/^api(Login|Logout)$/i.test(method)) return false; if (isWriteApiMethod(method)) return false; return /^(apiGet|apiList|apiSearch|apiBootstrap|apiSessionCheck|apiSessionResume|apiVerifySession|apiBudgetGet|apiBudgetList|apiBudgetAdminList|apiAdminList|apiCheckDuplicateCase)/i.test(method) || method === 'apiRouter'; }
function ttlForRead(method, payload) { if (payloadWantsFresh(payload)) return 0; var map = cfg('clientApiCacheTtlSecMap', {}) || {}; var ttl = map && map[method] != null ? Number(map[method]) : Number(cfg('clientApiCacheDefaultTtlSec', 30)); return isFinite(ttl) && ttl > 0 ? Math.min(ttl, 900) : 0; }
function stableClone(value) { if (Array.isArray(value)) return value.map(stableClone); if (!isObj(value)) return value; var out = {}; Object.keys(value).sort().forEach(function(k){ if (/^(token|_token|authToken|csrf|csrfToken|_csrf|_csrfToken|actionToken|csrfActionToken|_actionToken|password|pass|pwd)$/i.test(k)) return; if (/^(_|nonce|at|source|clientContext)$/i.test(k)) return; out[k] = stableClone(value[k]); }); return out; }
function stableKey(method, payload) { try { return method + '|' + JSON.stringify(stableClone(payload || {})); } catch (_) { return method + '|' + Date.now(); } }
function recordApiMetric(item) { try { item = item || {}; item.at = item.at || new Date().toISOString(); apiMetrics.calls += item.kind === 'call' ? 1 : 0; apiMetrics.cacheHits += item.cacheHit ? 1 : 0; apiMetrics.cacheWrites += item.cacheWrite ? 1 : 0; apiMetrics.dedupeHits += item.dedupeHit ? 1 : 0; apiMetrics.vercelProxyCalls += /^vercel/i.test(String(item.transport || '')) && item.kind === 'call' ? 1 : 0; apiMetrics.errors += item.error ? 1 : 0; apiMetrics.last.push(item); if (apiMetrics.last.length > 30) apiMetrics.last.shift(); } catch (_) {} }
function annotateResult(result, meta) { try { if (!isObj(result)) return result; var out = Object.assign({}, result); out.meta = Object.assign({}, isObj(result.meta) ? result.meta : {}, meta || {}); if (isObj(out.data)) out.data = Object.assign({}, out.data, { meta: Object.assign({}, isObj(out.data.meta) ? out.data.meta : {}, meta || {}) }); return out; } catch (_) { return result; } }

function fetchJsonWithTimeout(url, options, timeoutMs, method) {
  if (typeof fetch !== 'function') return Promise.reject(bridgeError('browser fetch ไม่พร้อมใช้งานสำหรับ Vercel proxy', 'FETCH_NOT_AVAILABLE', method));
  var ctrl = null, timer = null;
  try { ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null; } catch (_) { ctrl = null; }
  options = options || {};
  if (ctrl) options.signal = ctrl.signal;
  timer = setTimeout(function(){ try { ctrl && ctrl.abort(); } catch (_) {} }, Number(timeoutMs || 45000) || 45000);
  return fetch(url, options).then(function(resp){
    return resp.text().then(function(raw){
      var data = null;
      try { data = raw ? JSON.parse(raw) : {}; } catch (_) { data = { ok:false, error:'Vercel proxy response ไม่ใช่ JSON', errorCode:'VERCEL_PROXY_RESPONSE_NOT_JSON', rawPreview:String(raw || '').slice(0, 300), method:method }; }
      if (!resp.ok && data && data.ok !== false) { data.ok = false; data.error = data.error || ('Vercel proxy HTTP error ' + resp.status); data.errorCode = data.errorCode || 'VERCEL_PROXY_HTTP_ERROR'; }
      return data || { ok:false, error:'empty Vercel proxy response', errorCode:'VERCEL_PROXY_EMPTY_RESPONSE', method:method };
    });
  }, function(err){
    var code = err && err.name === 'AbortError' ? 'VERCEL_PROXY_TIMEOUT' : 'VERCEL_PROXY_FETCH_FAILED';
    throw bridgeError((code === 'VERCEL_PROXY_TIMEOUT' ? 'Vercel API proxy timeout' : 'Vercel API proxy fetch failed') + ': ' + (err && err.message || err), code, method);
  }).then(function(data){ try { clearTimeout(timer); } catch (_) {} return data; }, function(err){ try { clearTimeout(timer); } catch (_) {} throw err; });
}
function runVercelApiProxy(method, payload, options) {
  method = text(method).trim();
  if (!method) return Promise.reject(bridgeError('method required', 'METHOD_REQUIRED', method));
  var url = vercelApiProxyUrl();
  var timeoutMs = Number((options && options.timeoutMs) || cfg('vercelApiProxyTimeoutMs', cfg('apiTimeoutMs', 45000))) || 45000;
  var body = { method: method, payload: payload == null ? {} : payload, releaseStamp: PHASE_RELEASE_STAMP, source: 'vercel-client-proxy-phaseQ' };
  return fetchJsonWithTimeout(url, {
    method:'POST', credentials:'same-origin', cache:'no-store',
    headers:{ 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json', 'X-Phase-Q-Vercel-Proxy': PHASE_RELEASE_STAMP, 'X-Phase-O-Owner-Consolidation': PHASE_RELEASE_STAMP },
    body: JSON.stringify(body)
  }, timeoutMs, method).then(function(result){
    result = isObj(result) ? result : { ok:false, error:'empty Vercel proxy response', errorCode:'VERCEL_PROXY_EMPTY_RESPONSE', method:method };
    result.method = result.method || method;
    result.transport = result.transport || 'vercel-api-proxy';
    result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP;
    result.meta = Object.assign({}, isObj(result.meta) ? result.meta : {}, { clientVercelProxy:true, phaseQ:true, phaseOOwnerConsolidation:true, removedBrowserTransports:true, releaseStamp:PHASE_RELEASE_STAMP, transport:result.transport || 'vercel-api-proxy' });
    return result;
  });
}
function runVercelLoginProxy(payload) {
  payload = isObj(payload) ? payload : {};
  var username = text(payload.username || payload.user || payload.userId || payload.email || '').trim();
  var password = text(payload.password || payload.pass || payload.pwd || '').trim();
  if (!username) return Promise.reject(bridgeError('กรุณาระบุ username ก่อนเข้าสู่ระบบ', 'USERNAME_REQUIRED', 'apiLogin'));
  if (!password) return Promise.reject(bridgeError('กรุณาระบุ password ก่อนเข้าสู่ระบบ', 'PASSWORD_REQUIRED', 'apiLogin'));
  var url = vercelLoginProxyUrl();
  var timeoutMs = Number(cfg('vercelLoginProxyTimeoutMs', 30000)) || 30000;
  return fetchJsonWithTimeout(url, {
    method:'POST', credentials:'same-origin', cache:'no-store',
    headers:{ 'Content-Type':'application/json; charset=utf-8', 'Accept':'application/json', 'X-Phase-Q-Vercel-Proxy': PHASE_RELEASE_STAMP, 'X-Phase-O-Owner-Consolidation': PHASE_RELEASE_STAMP },
    body: JSON.stringify({ method:'apiLogin', payload:payload, releaseStamp:PHASE_RELEASE_STAMP, source:'vercel-login-proxy-phaseN' })
  }, timeoutMs, 'apiLogin').then(function(result){
    result = isObj(result) ? result : { ok:false, error:'empty login proxy response', errorCode:'VERCEL_LOGIN_PROXY_EMPTY_RESPONSE', method:'apiLogin' };
    result.method = result.method || 'apiLogin';
    result.transport = result.transport || 'vercel-login-proxy';
    result.releaseStamp = result.releaseStamp || PHASE_RELEASE_STAMP;
    result.meta = Object.assign({}, isObj(result.meta) ? result.meta : {}, { clientVercelProxy:true, phaseQ:true, phaseOOwnerConsolidation:true, loginProxy:true, removedBrowserTransports:true, releaseStamp:PHASE_RELEASE_STAMP });
    return result;
  });
}
function loadPublicConfig() {
  var url = vercelPublicConfigProxyUrl();
  return fetchJsonWithTimeout(url, { method:'GET', credentials:'same-origin', cache:'no-store', headers:{ 'Accept':'application/json', 'X-Phase-Q-Vercel-Proxy': PHASE_RELEASE_STAMP, 'X-Phase-O-Owner-Consolidation': PHASE_RELEASE_STAMP } }, Number(cfg('vercelPublicConfigProxyTimeoutMs', cfg('publicConfigTimeoutMs', 8000))) || 8000, '__publicConfig').then(function(data){
    if (data && data.ok) {
      lastPublicConfig = data;
      var logo = text(data.logoUrl || (data.appLogo && (data.appLogo.active || data.appLogo.svg)) || '');
      logo && !isBadLogo(logo) && setLogo(logo, 'vercel-public-config-proxy');
      try { var rel = releaseStatus(); if (!rel.ok) recordApiMetric({ kind:'release-mismatch', method:'__vercelPublicConfig', transport:'vercel-public-config-proxy', error:true, message:JSON.stringify(rel.mismatch) }); } catch (_) {}
    }
    return data || null;
  }, function(err){ recordApiMetric({ kind:'call', method:'__vercelPublicConfig', transport:'vercel-public-config-proxy', error:true, message:err && err.message || String(err || '') }); return null; });
}
function runReadWithPolicy(method, payload) {
  method = text(method).trim();
  var transport = 'vercel-api-proxy';
  var cacheable = cfg('clientApiCacheEnabled', true) !== false && isReadApiMethod(method);
  var dedupe = cfg('clientInFlightDedupe', true) !== false && isReadApiMethod(method);
  var ttl = ttlForRead(method, payload || {});
  var key = stableKey(method, payload || {});
  var now = Date.now ? Date.now() : +new Date();
  if (cacheable && ttl > 0 && apiCache[key] && apiCache[key].expiresAt > now) {
    recordApiMetric({ kind:'cache', method:method, transport:transport, cacheHit:true, ageMs:Math.max(0, now - Number(apiCache[key].storedAt || now)) });
    return Promise.resolve(annotateResult(apiCache[key].value, { clientCacheHit:true, phaseNCache:true, phaseOOwnerConsolidation:true, cacheAgeMs:Math.max(0, now - Number(apiCache[key].storedAt || now)), cacheTtlSec:ttl, transport:transport, releaseStamp:PHASE_RELEASE_STAMP }));
  }
  if (dedupe && apiInFlight[key]) {
    recordApiMetric({ kind:'dedupe', method:method, transport:transport, dedupeHit:true });
    return apiInFlight[key].then(function(result){ return annotateResult(result, { clientDedupeHit:true, phaseNDedupe:true, phaseOOwnerConsolidation:true, transport:transport, releaseStamp:PHASE_RELEASE_STAMP }); });
  }
  var started = now;
  var promise = runVercelApiProxy(method, payload || {}).then(function(result){
    var durationMs = Math.max(0, (Date.now ? Date.now() : +new Date()) - started);
    var annotated = annotateResult(result, { clientDurationMs:durationMs, clientCacheHit:false, phaseNCache:false, phaseOOwnerConsolidation:true, cacheTtlSec:ttl, transport:transport, releaseStamp:PHASE_RELEASE_STAMP });
    if (cacheable && ttl > 0 && result && result.ok !== false) {
      apiCache[key] = { value: annotated, expiresAt: started + ttl * 1000, storedAt: (Date.now ? Date.now() : +new Date()), method:method };
      recordApiMetric({ kind:'call', method:method, transport:transport, durationMs:durationMs, cacheWrite:true });
    } else {
      recordApiMetric({ kind:'call', method:method, transport:transport, durationMs:durationMs });
    }
    return annotated;
  }, function(err){
    recordApiMetric({ kind:'call', method:method, transport:transport, error:true, message:err && err.message || String(err || ''), durationMs:Math.max(0, (Date.now ? Date.now() : +new Date()) - started) });
    throw err;
  });
  if (dedupe) { apiInFlight[key] = promise; promise.then(function(){ delete apiInFlight[key]; }, function(){ delete apiInFlight[key]; }); }
  return promise;
}

function localBase() { return text(cfg('localAssetBase', './partials/')); }
function bundleFiles(name) { var key = text(name).replace(/^bundle:/i, ''); var b = manifest && manifest.bundles && manifest.bundles[key]; return b && Array.isArray(b.files) ? b.files.slice() : []; }
function uniquePush(list, value) { value = text(value).trim(); if (value && list.indexOf(value) < 0) list.push(value); }
function ensureSlash(value) { value = text(value).trim(); return value && value.charAt(value.length - 1) !== '/' ? value + '/' : value; }
function scriptDirectory() { try { var scripts = doc.querySelectorAll('script[src]'); for (var i = scripts.length - 1; i >= 0; i--) { var src = scripts[i].getAttribute('src') || ''; if (/github-gas-transport\.js/i.test(src)) return new URL('.', scripts[i].src || src).href; } } catch (_) {} try { return new URL('.', root.location && root.location.href || doc.baseURI || './').href; } catch (_) { return './'; } }
function pageDirectories() { var out=[]; try { var u = new URL(root.location && root.location.href || doc.baseURI || './'); var parts = u.pathname.split('/'); if (!/\/$/.test(u.pathname)) parts.pop(); while (parts.length > 0) { var path = parts.join('/'); if (!path) path = '/'; if (path.charAt(0) !== '/') path = '/' + path; if (path.charAt(path.length - 1) !== '/') path += '/'; uniquePush(out, u.origin + path); if (path === '/') break; parts.pop(); } } catch (_) {} return out; }
function assetBaseCandidates() { var c=[], conf=root.APP_CONFIG || {}, arr=Array.isArray(conf.localAssetBaseCandidates) ? conf.localAssetBaseCandidates : []; uniquePush(c, localBase()); arr.forEach(function(x){ uniquePush(c, x); }); try { uniquePush(c, new URL('./partials/', scriptDirectory()).href); } catch (_) {} try { uniquePush(c, new URL('../partials/', scriptDirectory()).href); } catch (_) {} pageDirectories().forEach(function(d){ try { uniquePush(c, new URL('partials/', d).href); } catch (_) {} }); uniquePush(c, './partials/'); uniquePush(c, 'partials/'); uniquePush(c, '../partials/'); return c; }
function fileUrlFromBase(base, file) { return ensureSlash(base) + encodeURIComponent(file) + '.html'; }
function inlinePartialMap() { if (cfg('inlinePartialsEnabled', false) !== true) return null; var map = root.__APP_INLINE_PARTIALS__ || (root.APP_CONFIG && root.APP_CONFIG.inlinePartials) || null; return map && typeof map === 'object' ? map : null; }
function withAssetStamp(url) { var m = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || manifest || {}; var boot = root.__APP_BOOTSTRAP__ || {}; var release = (root.APP_CONFIG && root.APP_CONFIG.phase5ReleaseManifest) || {}; var stamp = text((m && m.stamp) || cfg('assetStamp', '') || boot.assetStamp || release.cacheBustVersion || release.stamp || PHASE_ASSET_STAMP); return stamp ? url + (url.indexOf('?') >= 0 ? '&' : '?') + 'v=' + encodeURIComponent(stamp) : url; }
function getInlinePartial(file) { file = text(file).trim(); var map = inlinePartialMap(); if (!map || !safeName(file)) return null; if (Object.prototype.hasOwnProperty.call(map, file)) return text(map[file]); if (Object.prototype.hasOwnProperty.call(map, file + '.html')) return text(map[file + '.html']); return null; }
function fetchFile(file) {
  file = text(file).trim();
  if (!safeName(file)) return Promise.reject(bridgeError('ไม่อนุญาตให้โหลด asset: ' + file, 'ASSET_NAME_REJECTED'));
  if (Object.prototype.hasOwnProperty.call(cache, file)) return Promise.resolve(cache[file]);
  var inline = getInlinePartial(file);
  if (inline != null && inline !== '') { cache[file] = inline; try { root.__APP_ASSET_BASE_RESOLVED__ = root.__APP_ASSET_BASE_RESOLVED__ || {}; root.__APP_ASSET_BASE_RESOLVED__[file] = 'index.inline.__APP_INLINE_PARTIALS__'; } catch (_) {} return Promise.resolve(inline); }
  var urls = assetBaseCandidates().map(function(base){ return fileUrlFromBase(base, file); });
  var tried = [];
  function tryAt(i) {
    if (i >= urls.length) { var err = bridgeError('โหลด asset ไม่สำเร็จ: ' + file + ' — ตรวจไม่พบไฟล์ใน partials paths: ' + tried.join(', '), 'ASSET_LOAD_FAILED'); err.triedUrls = tried.slice(); try { root.__APP_ASSET_LAST_404S__ = root.__APP_ASSET_LAST_404S__ || {}; root.__APP_ASSET_LAST_404S__[file] = tried.slice(); } catch (_) {} throw err; }
    var url = urls[i]; tried.push(url);
    return fetch(withAssetStamp(url), { credentials:'same-origin', cache:'force-cache' }).then(function(resp){ if (!resp.ok) return tryAt(i + 1); return resp.text().then(function(html){ cache[file] = html; try { root.__APP_ASSET_BASE_RESOLVED__ = root.__APP_ASSET_BASE_RESOLVED__ || {}; root.__APP_ASSET_BASE_RESOLVED__[file] = url; } catch (_) {} return html; }); }, function(){ return tryAt(i + 1); });
  }
  return tryAt(0);
}
function localInclude(name) { name = text(name).trim(); var files = /^bundle:/i.test(name) ? bundleFiles(name) : [name]; if (!files.length) return Promise.reject(bridgeError('ไม่พบ bundle/asset: ' + name, 'ASSET_NOT_FOUND')); return Promise.all(files.map(fetchFile)).then(function(parts){ return { ok:true, data:{ name:name, html:parts.join('\n'), loadedAt:new Date().toISOString(), local:true }, msg:'โหลด partial จาก Vercel static สำเร็จ' }; }); }
function apiEnvelope(fn, args) { var method = text(fn).trim(); var payload = args; if (method === 'apiRouter' && isObj(args)) { method = text(args.method || args.action || '').trim(); payload = args.payload || args.params || args.data || {}; } return { method:method, payload:payload == null ? {} : payload }; }
function applyImageAttrs(img) { try { img.setAttribute('loading', img.id === 'login-logo-img' ? 'eager' : 'lazy'); img.setAttribute('decoding', img.id === 'login-logo-img' ? 'sync' : 'async'); img.setAttribute('fetchpriority', img.id === 'login-logo-img' ? 'high' : 'auto'); } catch (_) {} }
function setLogo(url, source) { url = normalizeUrl(url || FALLBACK_LOGO); if (!isSafeLogoUrl(url) || isBadLogo(url)) url = FALLBACK_LOGO; root.APP_CONFIG = root.APP_CONFIG || {}; root.APP_CONFIG.logoUrl = url; root.APP_LOGO = root.APP_LOGO || {}; root.APP_LOGO.active = url; root.APP_LOGO.svg = url; root.APP_LOGO.png96 = url; root.APP_LOGO.png192 = url; root.APP_LOGO.png512 = url; root.DEFAULT_LOGO = url; root.LOGO_URL = url; root.currentLogoUrl = url; root.__SAFE_LOGO_URL__ = url; root.__APP_PARLIAMENT_LOGO__ = url; try { if (url !== FALLBACK_LOGO) root.localStorage && root.localStorage.setItem('APP_LOGO_URL', url); } catch (_) {} try { var nodes = doc.querySelectorAll('[data-logo="parliament"],#login-logo-img,#side-logo-img,#mobile-topbar-logo,#summary-logo-img,#ps-ai-print-logo,#report-logo-img,.print-logo-img'); Array.prototype.forEach.call(nodes, function(img){ if (!img || !img.setAttribute) return; applyImageAttrs(img); img.onerror = function(){ try { var bad = img.getAttribute('src') || url; markBadLogo(bad); img.onerror = null; img.setAttribute('src', FALLBACK_LOGO); } catch (_) {} }; img.style.display = ''; if (img.getAttribute('src') !== url) img.setAttribute('src', url); img.dataset.logoSource = source || 'app-config'; }); } catch (_) {} try { root.updateLogos && root.updateLogos(url); } catch (_) {} try { root.patchParliamentLogo && root.patchParliamentLogo(); } catch (_) {} return true; }
function releaseStatus() { var configStamp = text(cfg('releaseStamp', PHASE_RELEASE_STAMP) || PHASE_RELEASE_STAMP); var manifestObj = (root.APP_CONFIG && root.APP_CONFIG.assetManifest) || root.__APP_ASSET_MANIFEST__ || {}; var assetStamp = text((manifestObj && manifestObj.stamp) || cfg('assetStamp', PHASE_ASSET_STAMP)); var publicStamp = text(lastPublicConfig && (lastPublicConfig.releaseStamp || lastPublicConfig.stamp) || ''); var backendAssetStamp = text(lastPublicConfig && lastPublicConfig.assetStamp || ''); var mismatch=[]; if (configStamp && configStamp !== PHASE_RELEASE_STAMP) mismatch.push({ field:'client-config-releaseStamp', expected:PHASE_RELEASE_STAMP, actual:configStamp }); if (publicStamp && publicStamp !== PHASE_RELEASE_STAMP) mismatch.push({ field:'backend-public-releaseStamp', expected:PHASE_RELEASE_STAMP, actual:publicStamp }); if (backendAssetStamp && assetStamp && backendAssetStamp !== assetStamp) mismatch.push({ field:'assetStamp', expected:assetStamp, actual:backendAssetStamp }); lastReleaseMismatch = mismatch.length ? mismatch : null; return { ok:!mismatch.length, expectedStamp:PHASE_RELEASE_STAMP, clientStamp:PHASE_RELEASE_STAMP, configStamp:configStamp, assetStamp:assetStamp, backendReleaseStamp:publicStamp, backendAssetStamp:backendAssetStamp, mismatch:mismatch }; }

root.AppTransport = root.AppTransport || {};
root.AppTransport.__vercelApiProxyOnly = true;
root.AppTransport.__removedBrowserTransports = true;
root.AppTransport.transportMode = PHASE_TRANSPORT_MODE;
root.AppTransport.bridgeClientState = function(){ return { ready:false, loaded:false, assumedReady:false, removed:true, mode:PHASE_TRANSPORT_MODE }; };
root.AppTransport.phase2Status = function(){ var release=releaseStatus(); return { ok:release.ok, stamp:PHASE_RELEASE_STAMP, phase:'Phase Q Runtime Slim & Size Gate', release:release, releaseMismatch:release.mismatch, transportMode:PHASE_TRANSPORT_MODE, vercelApiProxyEnabled:true, hostingTarget:cfg('hostingTarget', 'vercel-api-proxy'), removedBrowserTransports:true, sizeGateEnabled:true, fastLoginDisabled:true, allowAssumedBridgeReady:false, securityHardening:cfg('securityHardening', true) !== false, phaseIContractFinalCleanup:cfg('phaseIContractGateEnabled', true) !== false, runtimeSlimming:cfg('runtimeSlimming', true) !== false, phaseKWriteSchemaUnification:cfg('phaseKWriteSchemaUnification', true) !== false, phaseLVercelMigrationFoundation:cfg('phaseLVercelMigrationFoundation', true) !== false, phaseQRuntimeSlimming:cfg('phaseQRuntimeSlimming', true) !== false, phaseOOwnerConsolidation:cfg('phaseOOwnerConsolidation', true) !== false, runtimeOwnerConsolidated:cfg('runtimeOwnerConsolidated', true) !== false, apiOwnerConsolidated:cfg('apiOwnerConsolidated', true) !== false, phaseQsingleGate:cfg('phaseQsingleGate', true) !== false, releaseGate:cfg('ownerConsolidationGate', 'tools/release_gate.py'), syncTool:cfg('phaseISyncTool', 'tools/sync_frontend_partials.py'), singleSourceRoot:cfg('phase2CanonicalPartialRoot', 'gas-backend'), generatedMirrorPolicy:cfg('phase2GeneratedMirrorPolicy', 'edit-gas-backend-run-sync-do-not-edit-generated-mirrors'), clientApiCacheEnabled:cfg('clientApiCacheEnabled', true) !== false, clientInFlightDedupe:cfg('clientInFlightDedupe', true) !== false, cacheEntries:Object.keys(apiCache).length, inFlight:Object.keys(apiInFlight).length, metrics:Object.assign({}, apiMetrics), clientState:root.AppTransport.bridgeClientState(), proxy:{ enabled:true, apiUrl:vercelApiProxyUrl(), loginUrl:vercelLoginProxyUrl(), publicConfigUrl:vercelPublicConfigProxyUrl() } }; };
root.AppTransport.releaseStatus = releaseStatus;
root.AppTransport.phase1Status = root.AppTransport.phase2Status;
root.AppTransport.phase0Status = root.AppTransport.phase2Status;
root.AppTransport.clearApiCache = function(){ apiCache = Object.create(null); apiInFlight = Object.create(null); apiMetrics.cacheHits = 0; apiMetrics.cacheWrites = 0; apiMetrics.dedupeHits = 0; apiMetrics.last = []; return true; };
root.AppTransport.run = function(fn, args) { var req = apiEnvelope(fn, args || {}); if (/^getDeferredInclude$/i.test(req.method)) { var name = req.payload && (req.payload.name || req.payload.partial || req.payload.file) || ''; return localInclude(name); } if (/^apiLogin$/i.test(req.method)) return runVercelLoginProxy(req.payload || {}); if (isReadApiMethod(req.method)) return runReadWithPolicy(req.method, req.payload || {}); return runVercelApiProxy(req.method, req.payload || {}); };
root.AppTransport.setGasWebAppUrl = function(){ return ''; };
root.AppTransport.setLogoUrl = function(url){ return setLogo(url, 'manual'); };
root.AppTransport.ping = function(){ return runVercelApiProxy('apiGetRouteContract', { at:new Date().toISOString(), transportMode:'vercel-api-proxy-only-ping', phaseQ:true, phaseOOwnerConsolidation:true }); };
root.AppTransport.loadPublicConfig = loadPublicConfig;
root.AppTransport.runVercelApiProxy = runVercelApiProxy;
root.AppTransport.runVercelLoginProxy = runVercelLoginProxy;
root.AppTransport.vercelProxyEnabled = vercelProxyEnabled;
root.AppTransport.ensureBridgeClient = function(){ return Promise.reject(bridgeError('Phase Q: ใช้ /api/gas เท่านั้น', 'BROWSER_FALLBACK_TRANSPORT_REMOVED')); };

try { setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config'); } catch (_) {}
if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function(){ setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config-dom'); loadPublicConfig(); }, { once:true });
else { setLogo(cfg('logoUrl', FALLBACK_LOGO), 'app-config-dom'); loadPublicConfig(); }
})(typeof window !== 'undefined' ? window : globalThis, typeof document !== 'undefined' ? document : null);
