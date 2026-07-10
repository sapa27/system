(function(root) {
    "use strict"; 
    var existing = root.APP_CONFIG || {
    }
    ,
    APP_RELEASE_STAMP = "commission-v1.2-gas-hosted-production-2026-07-10-r28",
    APP_ASSET_STAMP = "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-10-r28",
    APP_VERSION = "1.2.0-production-current",
    FALLBACK_LOGO = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22%23f8fafc%22/%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2248%22%20r%3D%2226%22%20fill%3D%22%23d4af37%22/%3E%3Cpath%20d%3D%22M28%20100h72M40%2088h48M48%2074h32%22%20stroke%3D%22%23334155%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22/%3E%3Ctext%20x%3D%2264%22%20y%3D%2255%22%20text-anchor%3D%22middle%22%20font-family%3D%22Sarabun%2C%20Arial%22%20font-size%3D%2218%22%20fill%3D%22%23334155%22%3E%E0%B8%AA%E0%B8%A0%E0%B8%B2%3C/text%3E%3C/svg%3E"; 
    function text(v) {
      return v == null ? "": String(v)
    }
    function cleanUrl(url) {
      return text(url).trim().replace(/\s+/g, "")
    }
    function isSafeLogoUrl(url) {
      return url = cleanUrl(url),
      !url || /^data:image\//i.test(url) || /^https?:\/\//i.test(url)
    }
    var VERCEL_MIGRATION_CONFIG = root.__VERCEL_MIGRATION_CONFIG__ || {
    }
    ,
    VERCEL_GAS_WEB_APP_URL = cleanUrl(VERCEL_MIGRATION_CONFIG.gasWebAppUrl || VERCEL_MIGRATION_CONFIG.GAS_WEB_APP_URL || ""),
    VERCEL_LOGO_URL = cleanUrl(VERCEL_MIGRATION_CONFIG.logoUrl || VERCEL_MIGRATION_CONFIG.APP_LOGO_URL || ""),
    defaults = {
      appVersion: "1.2.0-production-current",
      appTitle: "ระบบบริหารจัดการเรื่องพิจารณา",
      gasWebAppUrl: VERCEL_GAS_WEB_APP_URL || "",
      logoUrl: VERCEL_LOGO_URL && isSafeLogoUrl(VERCEL_LOGO_URL) ? VERCEL_LOGO_URL: FALLBACK_LOGO,
      fallbackLogoUrl: FALLBACK_LOGO,
      localAssetBase: "./partials/",
      localAssetBaseCandidates: ["./partials/",
        "partials/",
        "../partials/"],
      transportMode: "production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe",
      hostingTarget: "vercel-api-proxy",
      vercelStaticFrontendReady: !0,
      vercelApiProxyEnabled: !0,
      vercelEnvBuildTool: "tools/generate_vercel_env.py",
      releaseGate: "tools/phaseN_legacy_transport_gate.py",
      vercelApiProxyUrl: "/api/gas",
      vercelLoginProxyUrl: "/api/login",
      vercelPublicConfigProxyUrl: "/api/public-config",
      vercelApiProxyTimeoutMs: 45e3,
      vercelLoginProxyTimeoutMs: 3e4,
      vercelPublicConfigProxyTimeoutMs: 8e3,
      vercelProxyAttachCredentials: !0,
      proxyRejectGoogleHostedFrontend: !0,
      gasBackendUiDisabled: !0,
      gasBackendFrontendEntryProperty: "VERCEL_FRONTEND_URL",
      vercelMigrationConfig: VERCEL_MIGRATION_CONFIG,
      dataLoadingPerformance: !0,
      singleSourceRefactor: !0,
      canonicalPartialRoot: "gas-backend",
      apiRouteAllowlistOwner: "Code_20_Router._apiRouteRegistry_",
      apiDtoContractOwner: "AppBackendCore.API_DTO_CONTRACT_BY_METHOD",
      staticApiContractAllowlistDisabled: !0,
      contractFreezeEnabled: !0,
      contractFreezeStamp: "production-contract-freeze-current-2026-07-06",
      frozenApiMethodCount: 108,
      frozenWriteMethodCount: 27,
      canonicalEditableRoot: "gas-backend",
      generatedMirrorRoot: "github-pages/partials",
      syncTool: "tools/phaseN_legacy_transport_gate.py",
      contractGate: "tools/phaseN_legacy_transport_gate.py",
      runtimeSlimmingEnabled: !0,
      writeSchemaUnification: !0,
      writeSchemaGate: "tools/phaseN_legacy_transport_gate.py",
      runtimeAssets: ["app-index-foundation-pre-vue.js",
        "app-index-foundation-after-vue.js",
        "app-index-foundation-after-swal.js",
        "critical-login-runtime.js",
        "app-index-bootstrap.js"],
      contractGateEnabled: !0,
      generatedMirrorPolicy: "edit-gas-backend-run-sync-do-not-edit-generated-mirrors",
      dashboardFirstPaintEnabled: !0,
      dashboardLazyHydrationEnabled: !0,
      dashboardIdleHydrationEnabled: !0,
      dashboardCoreLoginDeferEnabled: !0,
      dashboardInitialIncludeBudget: !1,
      dashboardInitialIncludeCases: !1,
      dashboardInitialIncludeMeetingRows: !1,
      dashboardLazyIncludeBudget: !1,
      dashboardLazyIncludeCases: !0,
      dashboardLazyIncludeMeetingRows: !1,
      dashboardLazyCaseLimit: 30,
      dashboardLazyHydrationDelayMs: 650,
      dashboardBudgetHydrationEnabled: !0,
      dashboardBudgetHydrationDelayMs: 900,
      dashboardBudgetHydrationCacheTtlSec: 300,
      dashboardSessionCacheTtlSec: 300,
      dashboardFirstPaintTargetMs: 1500,
      dashboardLazyHydrationTargetMs: 6500,
      apiPerformanceTimingEnabled: !0,
      inlinePartialsEnabled: !1,
      bridgeReadyTimeoutMs: 1e4,
      bridgeLoadGraceMs: 0,
      requireBridgeReadyMessage: !0,
      allowAssumedBridgeReady: !1,
      securityHardening: !0,
      fastLoginJsonpDisabled: !0,
      forceBridgeClientOnly: !1,
      apiTimeoutMs: 45e3,
      bridgeNoMessageTimeoutMs: 45e3,
      publicConfigTimeoutMs: 4e3,
      fastLoginJsonp: !1,
      loginFormPost: !1,
      loginPostTimeoutMs: 2e4,
      loginViaVercelProxy: !0,
      loginBridgeFallback: !1,
      fastLoginTimeoutMs: 0,
      readJsonpApi: !1,
      readJsonpFallbackToBridge: !1,
      writeFormPost: !1,
      clientApiCacheEnabled: !1,
      clientInFlightDedupe: !0,
      clientSessionStorageReadCacheEnabled: !1,
      clientApiCacheOwner: "backend-router-cache",
      clientInFlightOwner: "github-pages/github-gas-transport.js::AppTransport.inFlightOnly",
      clientReadResponseCacheEnabled: !1,
      jsonpApiTimeoutMs: 25e3,
      jsonpReadCircuitBreaker: !1,
      jsonpReadCircuitBreakMs: 6e4,
      productionStabilization: !0,
      releaseStamp: APP_RELEASE_STAMP,
      requireGasWebAppUrl: !1,
      forceAuthenticatedReadBridge: !1,
      forceAuthenticatedReadVercelProxy: !0,
      supersededTransportPolicyC: "superseded-by-production-vercel-proxy-only",
      supersededTransportPolicyM: "superseded-by-production-vercel-proxy-only",
      securityPolicy: "login-post-only-no-fast-login-jsonp-require-explicit-bridge-ready",
      contractFinalCleanupPolicy: "route-registry-only-api-allowlist-dto-contract-separated",
      writeSchemaPolicy: "single-write-schema-by-method-backend-client-gate",
      publicJsonpReadMethods: [],
      clientApiCacheDefaultTtlSec: 0,
      cachePolicyOwner: "Code_20_Router._routerHotPathContractSpec_",
      cachePolicyPhase3SingleOwner: !0,
      cachePolicySourceOfTruth: "router-hot-path-contract",
      clientApiCacheTtlSecMap: {
        apiGetDashboardBundle: 240,
        apiSearchCasesLite: 180,
        apiGetTracking: 180,
        apiBudgetGetSummary: 300,
        apiBudgetGetTypeSummaryByFY: 600,
        apiGetMasterDataBundle: 900,
        apiGetPeoplePageBundle: 300,
        apiGetRouteContract: 300,
        apiGetClientDataContract: 300,
        apiSessionCheck: 20,
        apiSessionResume: 15
      }
      ,
      strictBridgeOriginCheck: !0,
      allowNullLoginPostOrigin: !0,
      allowedBridgeOrigins: ["https://script.google.com"],
      bridgeTargetOrigin: "",
      legacyTransportRemoved: !0,
      transportPolicy: "browser-uses-vercel-api-proxy-only-no-jsonp-no-hidden-bridge-no-login-post-iframe",
      legacyJsonpTransportRemoved: !0,
      legacyGasBridgeTransportRemoved: !0,
      legacyLoginPostIframeRemoved: !0,
      frontendTransportSinglePathPhase2: !0,
      staticGasDirectDisabled: !0,
      gasDirectFallbackDisabled: !0,
      releaseManifest: {
        stamp: APP_RELEASE_STAMP,
        githubCommitHash: "",
        gasDeploymentId: "",
        cacheBustVersion: APP_RELEASE_STAMP
      }
      ,
      assetManifest: {
        stamp: APP_ASSET_STAMP,
        bundles: {
          appCritical: {
            files: []
          }
          ,
          appCore: {
            files: ["Scripts_Core_Runtime"]
          }
          ,
          pageDashboard: {
            files: ["Scripts_Page_Dashboard"]
          }
          ,
          pageMeeting: {
            files: ["Scripts_Page_Meeting"]
          }
          ,
          pageCommitteeMeeting: {
            files: ["Scripts_Page_Meeting"]
          }
          ,
          pageTrackReport: {
            files: ["Scripts_Page_ReportTrack"]
          }
          ,
          pagePetitioner: {
            files: ["Scripts_Page_Petitioner"]
          }
          ,
          pagePeople: {
            files: ["Scripts_Page_People"]
          }
          ,
          pageBudget: {
            files: ["Scripts_Page_Budget"]
          }
          ,
          pageAdmin: {
            files: ["Scripts_Page_Admin"],
            minRole: "admin"
          }
          ,
          pageAiPrint: {
            files: ["Scripts_Core_Runtime"]
          }
        }
        ,
        upfrontScripts: [],
        chunks: {
          dashboard: ["Scripts_Page_Dashboard"],
          search: ["Scripts_Page_ReportTrack"],
          petitioner: ["Scripts_Page_Petitioner"],
          meeting: ["Scripts_Page_Meeting"],
          "committee-meeting": ["Scripts_Page_Meeting"],
          track: ["Scripts_Page_ReportTrack"],
          report: ["Scripts_Page_ReportTrack"],
          people: ["Scripts_Page_People"],
          personnel: ["Scripts_Page_People"],
          budget: ["Scripts_Page_Budget"],
          admin: ["Scripts_Page_Admin"],
          ai: ["Scripts_Core_Runtime"],
          print: ["Scripts_Core_Runtime"]
        }
        ,
        templates: {
        }
        ,
        externalGroups: ["bootstrap",
          "xlsx"],
        externalAssets: {
          bootstrap: {
            script: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
            onDemand: !0
          }
          ,
          xlsx: {
            script: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
            onDemand: !0
          }
        }
      }
    }
    ; 
    root.APP_CONFIG = Object.assign({}, defaults, existing || {});

    root.APP_CONFIG.clientApiCacheEnabled = false;
    root.APP_CONFIG.clientReadResponseCacheEnabled = false;
    root.APP_CONFIG.clientSessionStorageReadCacheEnabled = false;
    root.APP_CONFIG.clientApiCacheDefaultTtlSec = 0;
    root.APP_CONFIG.clientApiCacheOwner = "backend-router-cache";
    root.APP_CONFIG.clientInFlightOwner = "github-pages/github-gas-transport.js::AppTransport.inFlightOnly";
    root.APP_CONFIG.fastLoginJsonp = false;
    root.APP_CONFIG.fastLoginJsonpDisabled = true;
    root.APP_CONFIG.requireBridgeReadyMessage = true;
    root.APP_CONFIG.allowAssumedBridgeReady = false;
    root.APP_CONFIG.bridgeLoadGraceMs = 0;
    root.APP_CONFIG.transportMode = "production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe";
    root.APP_CONFIG.contractGate = "tools/phaseN_legacy_transport_gate.py";
    root.APP_CONFIG.runtimeSlimmingEnabled = true;
    root.APP_CONFIG.vercelStaticFrontendReady = true;
    root.APP_CONFIG.vercelApiProxyEnabled = true;
    root.APP_CONFIG.loginViaVercelProxy = true;
    root.APP_CONFIG.loginFormPost = false;
    root.APP_CONFIG.vercelApiProxyUrl = root.APP_CONFIG.vercelApiProxyUrl || "/api/gas";
    root.APP_CONFIG.vercelLoginProxyUrl = root.APP_CONFIG.vercelLoginProxyUrl || "/api/login";
    root.APP_CONFIG.vercelPublicConfigProxyUrl = root.APP_CONFIG.vercelPublicConfigProxyUrl || "/api/public-config";
    root.APP_CONFIG.hostingTarget = "vercel-api-proxy";
    root.APP_CONFIG.releaseGate = "tools/phaseN_legacy_transport_gate.py";
    root.APP_CONFIG.apiRouteAllowlistOwner = "Code_20_Router._apiRouteRegistry_";
    root.APP_CONFIG.apiDtoContractOwner = "AppBackendCore.API_DTO_CONTRACT_BY_METHOD";
    root.APP_CONFIG.staticApiContractAllowlistDisabled = true;
    root.APP_CONFIG.legacyTransportRemoved = true;
    root.APP_CONFIG.legacyJsonpTransportRemoved = true;
    root.APP_CONFIG.legacyGasBridgeTransportRemoved = true;
    root.APP_CONFIG.legacyLoginPostIframeRemoved = true;
    root.APP_CONFIG.frontendTransportSinglePathPhase2 = true;
    root.APP_CONFIG.staticGasDirectDisabled = true;
    root.APP_CONFIG.gasDirectFallbackDisabled = true;
    root.APP_CONFIG.readJsonpApi = false;
    root.APP_CONFIG.publicJsonpReadMethods = [];
    root.APP_CONFIG.releaseStamp = APP_RELEASE_STAMP;
    root.APP_CONFIG.assetStamp = APP_ASSET_STAMP;
    root.APP_CONFIG.appVersion = APP_VERSION;
    root.APP_CONFIG.releaseManifest = Object.assign({}, root.APP_CONFIG.releaseManifest || {}, {
      stamp: APP_RELEASE_STAMP,
      cacheBustVersion: APP_RELEASE_STAMP
    });
    root.APP_CONFIG.assetManifest = Object.assign({}, root.APP_CONFIG.assetManifest || {}, {
      stamp: APP_ASSET_STAMP
    });

    function publishDeployRelease() {
      root.APP_DEPLOY_RELEASE = Object.assign({}, root.APP_DEPLOY_RELEASE || {}, {
        stamp: APP_RELEASE_STAMP,
        assetStamp: APP_ASSET_STAMP,
        version: APP_VERSION,
        source: "github-pages/app-config.js",
        transportMode: root.APP_CONFIG.transportMode || "",
        hostingTarget: root.APP_CONFIG.hostingTarget || "vercel-api-proxy",
        vercelStaticFrontendReady: true,
        vercelApiProxyEnabled: true,
        legacyTransportRemoved: true
      });
    }

    try {
      var params = new URLSearchParams(root.location && root.location.search || "");
      var logoUrl = params.get("logo") || params.get("logoUrl") || "";
      var transport = params.get("transport") || "";

      if (logoUrl && isSafeLogoUrl(logoUrl)) {
        if (root.localStorage) root.localStorage.setItem("APP_LOGO_URL", logoUrl.trim());
        root.APP_CONFIG.logoUrl = logoUrl.trim();
      }
      if (!root.APP_CONFIG.gasWebAppUrl && VERCEL_GAS_WEB_APP_URL) {
        root.APP_CONFIG.gasWebAppUrl = VERCEL_GAS_WEB_APP_URL;
      }
      if ((!root.APP_CONFIG.logoUrl || root.APP_CONFIG.logoUrl === FALLBACK_LOGO) &&
          VERCEL_LOGO_URL && isSafeLogoUrl(VERCEL_LOGO_URL)) {
        root.APP_CONFIG.logoUrl = VERCEL_LOGO_URL;
      }
      if (root.localStorage) {
        var storedLogo = cleanUrl(root.localStorage.getItem("APP_LOGO_URL") || "");
        var badLogo = cleanUrl(root.localStorage.getItem("APP_BAD_LOGO_URL") || "");
        if (storedLogo && storedLogo === badLogo) storedLogo = "";
        if (storedLogo && isSafeLogoUrl(storedLogo)) root.APP_CONFIG.logoUrl = storedLogo;
        if (storedLogo && !isSafeLogoUrl(storedLogo)) root.localStorage.removeItem("APP_LOGO_URL");
      }
      if (!isSafeLogoUrl(root.APP_CONFIG.logoUrl)) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
      if (!root.APP_CONFIG.logoUrl) root.APP_CONFIG.logoUrl = FALLBACK_LOGO;
      root.APP_CONFIG.transportMode = transport && /production-vercel-proxy-only/i.test(transport)
        ? transport
        : "production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe";
    } catch (_configError) {
      // Preserve safe defaults when browser storage or URL parsing is unavailable.
    }

    publishDeployRelease();
    root.GAS_WEB_APP_URL = root.GAS_WEB_APP_URL || root.APP_CONFIG.gasWebAppUrl || "";
    root.APP_FALLBACK_LOGO_URL = root.APP_FALLBACK_LOGO_URL || FALLBACK_LOGO;
    root.APP_LOGO = root.APP_LOGO || {};
    root.APP_LOGO.active = root.APP_LOGO.active || root.APP_CONFIG.logoUrl || FALLBACK_LOGO;
    root.APP_LOGO.svg = root.APP_LOGO.svg || root.APP_LOGO.active;
    root.APP_LOGO.png96 = root.APP_LOGO.png96 || root.APP_LOGO.active;
    root.APP_LOGO.png192 = root.APP_LOGO.png192 || root.APP_LOGO.active;
    root.APP_LOGO.png512 = root.APP_LOGO.png512 || root.APP_LOGO.active;
    root.DEFAULT_LOGO = root.DEFAULT_LOGO || root.APP_LOGO.active;
    root.LOGO_URL = root.LOGO_URL || root.APP_LOGO.active;
    root.currentLogoUrl = root.currentLogoUrl || root.APP_LOGO.active;
    root.__SAFE_LOGO_URL__ = root.__SAFE_LOGO_URL__ || root.APP_LOGO.active;
  }
)(typeof window !== "undefined" ? window : globalThis);
