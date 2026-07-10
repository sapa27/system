var __APP_GLOBAL__ = typeof __APP_GLOBAL__ != "undefined" && __APP_GLOBAL__ || typeof globalThis != "undefined" && globalThis || this || {
}, AppDomain = __APP_GLOBAL__.AppDomain = __APP_GLOBAL__.AppDomain || {
}, CaseDomain = __APP_GLOBAL__.CaseDomain = __APP_GLOBAL__.CaseDomain || {
}, TrackingDomain = __APP_GLOBAL__.TrackingDomain = __APP_GLOBAL__.TrackingDomain || {
}, MeetingDomain = __APP_GLOBAL__.MeetingDomain = __APP_GLOBAL__.MeetingDomain || {
}, DashboardDomain = __APP_GLOBAL__.DashboardDomain = __APP_GLOBAL__.DashboardDomain || {
}, _r66 = "case-domain-dto-no-envelope-refactor-2026-06-15", _r65 = "phase5-domain-owner-cleanup-current",
_rT = "c5-case-tracking-meeting-domain-owner-current", _rQ = "c5-domain-physical-owner-lock-current",
_CDO_ = "Code_30_Domain_Cases", _CWR_ = ["apiSaveCase",
  "apiDeleteCase"], _TWR_ = ["apiSaveLetter",
  "apiDeleteLetter"], _MWR_ = ["apiSaveMeetingLog",
  "apiDeleteMeetingLog",
  "apiSaveCommitteeMeetingSystem",
  "apiDeleteCommitteeMeetingSystem"], _L0 = "คณะอนุกรรมาธิการ", _L1 = "ผู้เสนอญัตติ/ผู้ร้อง", _L2 = "ชื่อเรื่องพิจารณา (ถ้ามี)",
_L3 = "เรื่องเข้าใหม่", _L4 = "เลขรับเรื่อง", _L5 = "เรื่องพิจารณา", _L6 = "ลำดับเรื่อง", _L7 = "คณะกรรมาธิการ",
_L8 = "เจ้าหน้าที่ฝ่ายเลขานุการ", _L9 = "ชื่อเรื่อง", _L10 = "เหตุผล(ไม่รับเรื่อง)", _L11 = "ชื่อเรื่องพิจารณา",
_L12 = "วันที่ประชุม", _L13 = "ผู้เสนอญัตติ", _L14 = "เลขที่รับเรื่อง", _L15 = "วันที่รับเรื่อง", _L16 = "รับเรื่องเลขที่",
_L17 = "ประเภทการประชุม", _L18 = "รอพิจารณา", _L19 = "เรื่อง", _L20 = "ผลการพิจารณา", _L21 = "ได้รับแล้ว",
_L22 = "ทะเบียนรับ", _L23 = "สถานะเรื่อง", _L24 = "ผู้ร้อง", _S0 = "MeetingLogs", _S1 = "function", _S2 = "MainData",
_S3 = "petitioners", _S4 = "isDeleted", _S5 = "updatedAt", _S6 = "deletedAt", _S7 = "caseTitle", _S8 = "CommitteeMeetingAgendaItems",
_S9 = "petitionerName", _S10 = "considerationTitle", _S11 = "receiveNo", _S12 = "caseId", _S13 = "meetingLogs",
_S14 = "subcommittee", _S15 = "เลขรับ", _S16 = "createdAt", _S17 = "สถานะ", _S18 = "status", _S19 = "เหตุผล",
_S20 = "subject", _S21 = "หน่วยงาน", _S22 = "ครั้งที่", _S23 = "recNo", _S24 = "runningNo", _S25 = "CommitteeMeetings",
_S26 = "rejectionReason", _S27 = "subcommitteeHistory", _S28 = "title", _S29 = "subcommitteeName", _S30 = "caseNo",
_S31 = "agencyName", _S32 = "respondent", _S33 = "assignees", _S34 = "meetingId", _S35 = "round", _S36 = "staff",
_S37 = "staffs", _S38 = "logId", _S39 = "result", _T0 = "คณะอนุกรรมาธิการ", _T1 = "บันทึกประวัติการประชุมไม่สำเร็จ",
_T2 = "บันทึกประวัติการประชุมสำเร็จ", _T3 = "รอพิจารณา", _T4 = "caseNum", _T5 = "function", _T6 = "เหตุผลไม่รับเรื่อง",
_T7 = "สถานะเรื่องพิจารณา", _T8 = "ได้รับแล้ว", _T9 = "การประชุมคณะกรรมาธิการ", _T10 = "object", _T11 = "หมายเหตุรอการพิจารณา",
_T12 = "เรื่องร้องเรียน", _T13 = "เหตุผล (ไม่รับเรื่อง)", _T14 = "กรรมาธิการรับผิดชอบ", _T15 = "ประเด็นพิจารณา",
_T16 = "หน่วยงาน/ผู้ถูกร้อง", _T17 = "เหตุผลรอการพิจารณา", _T18 = "สถานะปัจจุบัน", _T19 = "ได้รับตอบกลับแล้ว",
_T20 = "หมายเหตุรอพิจารณา", _T21 = "กมธ.รับผิดชอบ", _T22 = "ไม่รับเรื่อง", _T23 = "ประเภทเรื่อง", _T24 = "เหตุผลรอพิจารณา",
_T25 = "สถานะการพิจารณา", _T26 = "ส่งหน่วยงาน", _T27 = "หน่วยงานที่ส่ง", _T28 = "ยุติเรื่อง", _T29 = "ผลการประชุม",
_T30 = "Letters", _T31 = "meetingDate", _T32 = "MainData+MeetingLogs", _T33 = "committeeType", _T34 = "subcommitteeId",
_T35 = "committeeHistory", _T36 = "ผู้ถูกร้อง", _T37 = "coAssignees", _T38 = "caseConsiderationTitle",
_T39 = "[object Date]", _T40 = "ไม่ระบุ", _T41 = "หนังสือ", _T42 = "ประเด็น", _T43 = "เลขรับที่", _T44 = "responsibleCommittee",
_T45 = "meetingSubcommitteeHistory", _T46 = "statusReason", _T47 = "committeeMeeting", _T48 = "cases",
_T49 = "subcommitteeMeeting", _T50 = "pendingRemark", _T51 = "ลำดับที่", _T52 = "responsibleCommissioners",
_T53 = "petitioner", _T54 = "ประเภท", _T55 = "secretariatOfficer", _T56 = "meetingCommitteeHistory",
_r51 = [_T4,
  _S30,
  _S24,
  "orderNo",
  "seq",
  "no",
  _L6,
  "ลำดับ",
  _T51], _r29 = [_T50,
  "pendingReason",
  "waitReason",
  "waitingReason",
  _T46,
  "decisionReason",
  "reason",
  _S19,
  _T24,
  _T17,
  _T20,
  _T11], _r11 = ["petitionerPhone",
  "petitionerTel",
  "petitionerTelephone",
  "petitionerMobile",
  "petitionerContactPhone",
  "proposerPhone",
  "proposerTel",
  "proposerTelephone",
  "proposerMobile",
  "complainantPhone",
  "complainantTel",
  "complainantTelephone",
  "complainantMobile",
  "phone",
  "tel",
  "telephone",
  "mobile",
  "contactPhone",
  "phoneNumber",
  "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง",
  "เบอร์โทรผู้เสนอญัตติ/ผู้ร้อง",
  "โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง",
  "เบอร์โทรศัพท์ผู้ร้อง",
  "เบอร์โทรผู้ร้อง",
  "โทรศัพท์ผู้ร้อง",
  "เบอร์โทรศัพท์ผู้เสนอ",
  "เบอร์โทรผู้เสนอ",
  "โทรศัพท์ผู้เสนอ",
  "เบอร์โทรศัพท์",
  "เบอร์โทร",
  "โทรศัพท์",
  "หมายเลขโทรศัพท์",
  "มือถือ"], _r48 = ["sentAgency",
  "sendToAgency",
  "sentToAgency",
  "forwardedAgency",
  "forwardAgency",
  "forwardToAgency",
  "sentAgencyName",
  _T27,
  "ส่งให้หน่วยงาน",
  _T26,
  "หน่วยงานที่เกี่ยวข้อง"], _r37 = [_T37,
  "coAssignee",
  "coOwners",
  "coResponsible",
  "ผู้รับผิดชอบร่วม",
  "ผู้ร่วมรับผิดชอบ"], _r9 = [_S29,
  _S14,
  "subCommitteeName",
  _L0], _r63 = [_S7,
  _S10,
  _T38,
  "titleConsider",
  "considerTitle",
  _L2,
  _L11,
  _L5], _C30K_TITLE_ = [_S28,
  _S20,
  "caseSubject",
  _L19,
  _L9,
  _T12], _r97 = [_S3,
  _T53,
  _S9,
  _L24,
  _L13,
  _L1], _r114 = ["offerDate",
  "bookDate",
  "letterDate",
  "dateProposed",
  "proposalDate",
  "proposeDate",
  "proposedDate",
  "submittedDate",
  "submitDate",
  "dateSubmitted",
  "วันที่หนังสือ",
  "วันที่เสนอ",
  "วันที่เสนอเรื่อง",
  "วันเดือนปีที่เสนอ",
  "วันที่ยื่น",
  "วันที่ยื่นเรื่อง"], _r79 = ["closedReason",
  "closeReason",
  "terminateReason",
  "stopReason",
  "endReason",
  "caseCloseReason",
  "caseEndReason",
  _T46,
  "decisionReason",
  "reason",
  _S19,
  "เหตุผลยุติเรื่อง",
  "เหตุผลการยุติเรื่อง"], _r113 = [_S32,
  _S31,
  "accusedAgency",
  "accused",
  "agency",
  _T16,
  _T16,
  _T36,
  _S21], _r132 = [_S37,
  _T55,
  "operationOfficer",
  "opStaff",
  "operator",
  "responsibleOfficer",
  "operationStaff",
  _S36,
  "officer",
  _L8,
  _L8], _r112 = [_S28,
  _S20,
  "caseSubject",
  "caseName",
  "name",
  _L19,
  _L9,
  "หัวข้อเรื่อง"], _r47 = [_S3,
  _T53,
  _S9,
  "requester",
  "complainant",
  "proposer",
  "motionProposer",
  _L1,
  _L24,
  _L13], _r42 = [_S32,
  _S31,
  "accusedAgency",
  "accused",
  "agency",
  "หน่วยงาน / ผู้ถูกร้อง",
  _T16,
  _T36,
  _S21], _r19 = [_S12,
  "id",
  _T4,
  _S30,
  _S24,
  _S23,
  _S11,
  _S28,
  _S20,
  _S7,
  _S10,
  _S3,
  _S9,
  _S18,
  "cat",
  "subCat",
  _S33,
  _S37,
  _T37,
  _S31,
  _S32,
  "recDate",
  "recDateText",
  "receiveDate",
  "receiveDateText",
  "type",
  "typeLabel",
  _L6,
  _L4,
  _L15,
  _L2,
  _L1];
function _s_(v) {
  return String(v || "")
}
function _a_(v) {
  return _c30A_(v) ? v.slice(): []
}
function _cm_(o) {
  return _c30O_({
      uiDomChanged: !1,
      businessLogicChanged: !1
    }, o || {
    })
}
function _c30S_(v) {
  return String(v == null ? "": v)
}
function _c30W_(k, e, c) {
  return _appIsFnName_("_recordWarning_") && _recordWarning_(k, e, c)
}
function _c30A_(v) {
  return Array.isArray(v)
}
function _c30O_() {
  return Object.assign.apply(Object, arguments)
}
function _c30H_(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}
var PHASEC_DOMAIN_CONSOLIDATION_STAMP = "phaseC-code30-domain-status-consolidation-current";
function _domainStatusPhaseC_(domain, name, extra) {
  var out = {
    ok: !0,
    owner: name,
    phase5: domain.OWNER_CONTRACT_PHASE5,
    uiDomChanged: !1,
    businessLogicChanged: !1,
    phaseCStamp: PHASEC_DOMAIN_CONSOLIDATION_STAMP
  };
  domain.BOUNDARY &&(out.boundary = domain.BOUNDARY),
  domain.PHYSICAL &&(out.physical = domain.PHYSICAL),
  domain.VERSION &&(out.version = domain.VERSION),
  (domain.BOUNDARY || domain.PHYSICAL) &&(out.stamp = _rQ, out.boundaryStamp = _rT);
  return _c30O_(out, extra || {
    })
}
function _phaseCDomainConsolidationContract_() {
  return _cm_({
      ok: !0,
      stamp: PHASEC_DOMAIN_CONSOLIDATION_STAMP,
      owner: _CDO_,
      consolidated: ["CaseDomain.status",
        "TrackingDomain.status",
        "MeetingDomain.status",
        "DashboardDomain.status"],
      singleStatusFactory: "_domainStatusPhaseC_",
      apiNamesPreserved: !0,
      noNewFiles: !0
    })
}
var PHASED_CODE30_MAPPER_DEDUP_STAMP = "phaseD-code30-status-mapper-dedup-current";
function _caseStatusNormalizePhaseD_(value, opts) {
  opts = opts || {
  };
  var fallback = String(opts.defaultStatus || _L3),
  raw = _c30S_(value).trim(),
  compact = raw.replace(/\s+/g, "");
  try {
    if (typeof AppBackendCore != "undefined" && AppBackendCore && typeof AppBackendCore.normalizeCaseStatus == "function") {
      var normalized = AppBackendCore.normalizeCaseStatus(raw, {
          defaultStatus: fallback,
          strict: opts.strict === !0
        });
      if (normalized)return normalized
    }
  } catch (_z100) {
    _c30W_(String(opts.warningKey || "case.status.phaseD"), _z100, {
        value: value
      })
  }
  return!compact ? fallback: /^(รับเรื่อง|ได้รับเรื่อง|เรื่องใหม่|รับเข้า|รับ)$/.test(compact) ? "เรื่องเข้าใหม่": /^(อยู่ระหว่างดำเนินการ|รอติดตาม)$/.test(compact) ? "รอพิจารณา": raw || fallback
}
function _phaseDCode30MapperDedupContract_() {
  return _cm_({
      ok: !0,
      stamp: PHASED_CODE30_MAPPER_DEDUP_STAMP,
      owner: _CDO_,
      consolidated: ["_caseNormalizeStatusForDisplay_",
        "_caseReportStatusPhase3_",
        "_dashboardNormalizeCaseStatusForCount_"],
      singleStatusMapper: "_caseStatusNormalizePhaseD_",
      apiNamesPreserved: !0,
      noNewFiles: !0,
      uiDomChanged: !1,
      businessLogicChanged: !1
    })
}
var PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP = "phaseD2-code30-row-date-mapper-dedup-current";
function _caseD2Pad2_(value) {
  return String(Number(value) || 0).padStart(2, "0")
}
function _z103(year) {
  year = Number(_c30S_(year).replace(/[^0-9]/g, "")) || 0;
  return year ? year >= 3600 && year <= 3700 ? year - 1086: year >= 3e3 && year <= 3200 ? year - 543: year < 100 ? year + 2500: year < 2400 ? year + 543: year: 0
}
function _r111(year) {
  year = _z103(year);
  return year > 2400 ? year - 543: year
}
function _caseDateOnlyPhaseD2_(value) {
  if (value == null || value === "")return null;
  try {
    var d = null;
    if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime()))d = new Date(value.getFullYear(),
      value.getMonth(), value.getDate());
    else if (typeof value === "number" && isFinite(value) && value > 2e4 && value < 4e5) {
      var serial = new Date(Math.round(864e5 *(value - 25569)));
      d = new Date(serial.getUTCFullYear(), serial.getUTCMonth(), serial.getUTCDate())
    } else {
      var text = _c30S_(value).replace(/^'+/, "").replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").trim();
      if (!text)return null;
      if (/^\d+(?:\.0+)?$/.test(text)) {
        var serialNumber = Number(text);
        if (isFinite(serialNumber) && serialNumber > 2e4 && serialNumber < 4e5) {
          var serialText = new Date(Math.round(864e5 *(serialNumber - 25569)));
          d = new Date(serialText.getUTCFullYear(), serialText.getUTCMonth(), serialText.getUTCDate())
        }
      }
      if (!d) {
        var iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
        if (iso)d = new Date(_r111(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
        else {
          var th = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
          if (th)d = new Date(_r111(th[3]), Number(th[2]) - 1, Number(th[1]));
          else if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(text) || /GMT[+-]\d{4}|เวลาอินโดจีน|^[A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d{4}/.test(text)) {
            var parsed = new Date(text.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, "").trim());
            if (!isNaN(parsed.getTime()))d = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
          } else {
            var parsed2 = new Date(text);
            if (!isNaN(parsed2.getTime()))d = new Date(parsed2.getFullYear(), parsed2.getMonth(), parsed2.getDate())
          }
        }
      }
    }
    if (!d || isNaN(d.getTime()))return null;
    d.getFullYear() > 2400 &&(d = new Date(d.getFullYear() - 543, d.getMonth(), d.getDate()));
    return d.setHours(0, 0, 0, 0),
    d
  } catch (_r130) {
    return _c30W_("case.date.phaseD2", _r130, {
        value: value
      }),
    null
  }
}
function _caseDateTextPhaseD2_(value, opts) {
  opts = opts || {
  };
  if (value == null || value === "")return "";
  var d = _caseDateOnlyPhaseD2_(value);
  if (d) {
    var be = d.getFullYear() < 2400 ? d.getFullYear() + 543: d.getFullYear();
    return _caseD2Pad2_(d.getDate()) + "/" + _caseD2Pad2_(d.getMonth() + 1) + "/" + String(be)
  }
  var raw = _c30S_(value).trim();
  return opts.preserveRaw === !0 ? raw: ""
}
function _caseRowPickPhaseD2_(row, aliases, defaultValue) {
  row = row || {
  },
  aliases = _c30A_(aliases) ? aliases: [aliases];
  for (var i = 0; i < aliases.length; i += 1) {
    var key = aliases[i];
    if (key && _c30H_(row, key) && row[key] != null && String(row[key]).trim() !== "")return row[key]
  }
  return defaultValue == null ? "": defaultValue
}
function _phaseD2Code30RowDateMapperDedupContract_() {
  return _cm_({
      ok: !0,
      stamp: PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP,
      owner: _CDO_,
      consolidated: ["_committeeMeetingDateText_",
        "_dashboardDate_",
        "_trackingDateOnly_",
        "_trackingDueDateOnly_",
        "_normalizeLetterDateFromFields_"],
      singleDateMapper: "_caseDateTextPhaseD2_/_caseDateOnlyPhaseD2_",
      singleRowPicker: "_caseRowPickPhaseD2_",
      apiNamesPreserved: !0,
      noNewFiles: !0,
      uiDomChanged: !1,
      businessLogicChanged: !1
    })
}
CaseDomain.dto = function(data, meta) {
  return _c30O_({
      domain: _T48,
      contractOwner: _CDO_,
      stamp: _r66
    }, data || {
    }, {
      meta: _c30O_({
          dtoOnly: !0
        }, meta || {
        })
    })
};
function _r61(n, s, r, w) {
  return _cm_({
      ok: !0,
      owner: _s_(n),
      codeOwner: _CDO_,
      stamp: _r65,
      sourceOfTruth: _a_(s),
      readOwner: _s_(r),
      writeOwner: _s_(w),
      apiFacadeMode: "thin-api-to-domain-owner",
      apiNamesPreserved: !0,
      noNewFiles: !0
    })
}
function _r121(n, p, apis, h, w) {
  return _cm_({
      name: _s_(n),
      purpose: _s_(p),
      owner: _CDO_,
      stamp: _rT,
      api: _a_(apis),
      helpersPrefix: _s_(h),
      writes: _a_(w)
    })
}
function _r64(n, o, p, api, h, s, w) {
  return _cm_({
      name: _s_(n),
      owner: _s_(o),
      purpose: _s_(p),
      apiPrefix: _s_(api || "api"),
      helperPrefixes: _a_(h),
      sourceSheets: _a_(s),
      writes: _a_(w),
      stamp: _rQ,
      apiNamesPreserved: !0
    })
}
[[CaseDomain,
    "CaseDomain",
    "case",
    ["apiSaveCase",
      "apiDeleteCase",
      "apiSearch",
      "apiGetCaseContext",
      "apiSearchCasesLite",
      "apiGetCaseReportExportRows",
      "apiGetCases",
      "apiGetCasesBundle",
      "apiGetCaseReportOptions"],
    "_case",
    _CWR_],
  [TrackingDomain,
    "TrackingDomain",
    "tracking",
    ["apiGetTracking",
      "apiGetLetters",
      "apiSaveLetter",
      "apiDeleteLetter",
      "apiGetAllLettersWithCaseInfo"],
    "_tracking",
    _TWR_],
  [MeetingDomain,
    "MeetingDomain",
    "meeting",
    ["apiGetMeetingLookupOptions",
      "apiGetMeetingHistory",
      "apiSaveMeetingLog",
      "apiDeleteMeetingLog",
      "apiListCommitteeMeetings",
      "apiGetCommitteeMeetingSystem",
      "apiGetCommitteeMeetingSystemSpec",
      "apiSearchMeetingAgendaCases",
      "apiGetCommitteeMeetingPrintBundle",
      "apiSaveCommitteeMeetingSystem",
      "apiDeleteCommitteeMeetingSystem"],
    "_committeeMeeting",
    _MWR_]].forEach(function(d) {
    d[0].BOUNDARY = _r121(d[1], d[2], d[3], d[4], d[5])
  });
[[CaseDomain,
    "Case physical cluster",
    "Code_30_Domain_Cases.gs:CaseDomain",
    "case",
    ["_case",
      "_Domain_getCase",
      "_dashboardCase"],
    [_S2,
      _S0,
      _T30],
    _CWR_],
  [TrackingDomain,
    "Tracking physical cluster",
    "Code_30_Domain_Cases.gs:TrackingDomain",
    "tracking",
    ["_tracking",
      "_letter",
      "_meetingLetters"],
    [_T30,
      _S2],
    _TWR_],
  [MeetingDomain,
    "Meeting physical cluster",
    "Code_30_Domain_Cases.gs:MeetingDomain",
    "meeting",
    ["_meeting",
      "_committeeMeeting"],
    [_S0,
      _S25,
      _S8],
    _MWR_]].forEach(function(d) {
    d[0].PHYSICAL = _r64(d[1], d[2], d[3], "api", d[4], d[5], d[6])
  });
function _r57() {
  return {
    ok: !0,
    stamp: _rQ,
    owner: _CDO_,
    physical: {
      cases: CaseDomain.PHYSICAL,
      tracking: TrackingDomain.PHYSICAL,
      meeting: MeetingDomain.PHYSICAL
    },
    rules: _cm_({
        apiNamesPreserved: !0,
        noRouteRenamed: !0,
        noNewFiles: !0,
        physicalCleanupOnly: !0
      })
  }
}
function _domainBoundaryContractPhase3_() {
  return {
    ok: !0,
    stamp: _rT,
    owner: _CDO_,
    domains: {
      cases: CaseDomain.BOUNDARY,
      tracking: TrackingDomain.BOUNDARY,
      meeting: MeetingDomain.BOUNDARY
    },
    physical: _r57(),
    rules: _cm_({
        routerFacadeOnly: !0,
        apiNamesPreserved: !0,
        noNewFiles: !0,
        productionPhysicalCleanup: !0
      })
  }
}
CaseDomain.PHASEC_CONSOLIDATION = _phaseCDomainConsolidationContract_();
CaseDomain.PHASED_MAPPER_DEDUP = _phaseDCode30MapperDedupContract_();
CaseDomain.PHASED2_ROW_DATE_MAPPER_DEDUP = _phaseD2Code30RowDateMapperDedupContract_();
[[CaseDomain,
    "CaseDomain",
    [_S2,
      _S0,
      _T30],
    "CaseDomain.searchCases / CaseDomain.getReportOptions / CaseDomain.getReportExportRows / CaseDomain.quickSummary",
    "apiSaveCase / apiDeleteCase"],
  [DashboardDomain,
    "DashboardDomain",
    [_S2,
      _S0,
      _T30],
    "DashboardDomain.getBundle + BudgetDomain.getDashboardSummaryForDashboard",
    "read-only; budget delegated to BudgetDomain"],
  [TrackingDomain,
    "TrackingDomain",
    [_T30,
      _S2],
    "TrackingDomain.getTracking / TrackingDomain.getLetters",
    "TrackingDomain.saveLetter / TrackingDomain.deleteLetter"],
  [MeetingDomain,
    "MeetingDomain",
    [_S0,
      _S25,
      _S8,
      _S2],
    "MeetingDomain.getHistory / MeetingDomain.listMeetings / MeetingDomain.getSystem",
    "MeetingDomain.saveLog / MeetingDomain.saveSystem"]].forEach(function(d) {
    d[0].OWNER_CONTRACT_PHASE5 = _r61(d[1], d[2], d[3], d[4])
  });
var CASE_READ_MODEL_LOCK_ID = "case-read-model-current", CASE_RECEIVE_DATE_CANONICAL_KEYS_current = ["recDate",
  "receiveDate",
  "recDateText",
  "receiveDateText",
  _L15];
function _r129(value) {
  return value != null && String(value).trim() !== ""
}
function _r106() {
  for (var merged = {
    }, i = 0; i < arguments.length; i += 1) {
    var row = arguments[i] || {
    };
    Object.keys(row).forEach(function(key) {
        var value = row[key]; _r129(value) ? merged[key] = value: _c30H_(merged, key) ||(merged[key] = value)
      })
  }
  return sanitizeRow_(merged)
}
function getCanonicalCaseBundleImpl_(payload) {
  payload = payload || {
  };
  var aliases = _resolveCaseIdentityAliases_(payload),
  seed = aliases.case || null,
  rows = _c30A_(aliases.rows) ? aliases.rows.slice(): [];
  if (seed && rows.every(function(r) {
        return _s_(r.caseId).trim() !== _s_(seed.caseId).trim()
      }) && rows.unshift(seed), (rows = _dedupeLatestRowsBy_(rows, function(r) {
          return _s_(r.caseId || r.caseNum || r.recNo).trim()
        })).sort(function(a, b) {
        var av = String(a &&(a.updatedAt || a.createdAt) || ""),
        bv = String(b &&(b.updatedAt || b.createdAt) || ""); return av === bv ? _s_(b && b.caseId).localeCompare(_s_(a && a.caseId),
          "th"): av > bv ? - 1: 1
      }), rows.length || seed) {
    var mergeSources = [payload].concat(rows.slice().reverse());
    seed && mergeSources.push(seed),
    seed = _r106.apply(null, mergeSources)
  }
  var history = _rJ(_c30O_({
      }, payload, {
        caseId: _s_(seed && seed.caseId || payload.caseId || payload.id).trim(),
        caseNum: _s_(seed && seed.caseNum || payload.caseNum).trim(),
        recNo: _s_(seed && seed.recNo || payload.recNo).trim(),
        title: String(seed &&(seed.title || seed.caseTitle) || payload.title || payload.caseTitle || "").trim(),
        petitioners: String(seed &&(seed.petitioners || seed.petitionerName) || payload.petitioners || "").trim()
      })),
  letters = _r23(_c30O_({
      }, payload, {
        caseId: _s_(seed && seed.caseId || payload.caseId || payload.id).trim(),
        caseNum: _s_(seed && seed.caseNum || payload.caseNum).trim(),
        recNo: _s_(seed && seed.recNo || payload.recNo).trim(),
        title: String(seed &&(seed.title || seed.caseTitle) || payload.title || payload.caseTitle || "").trim(),
        petitioners: String(seed &&(seed.petitioners || seed.petitionerName) || payload.petitioners || "").trim()
      }));
  return {
    case: seed,
    rawCase: seed,
    aliases: aliases.ids || [],
    relatedCases: rows,
    matchKey: _caseIdentityKey_(seed || payload || {
      }),
    history: _c30A_(history) ? history: [],
    letters: _c30A_(letters) ? letters: [],
    counts: {
      aliases: (aliases.ids || []).length,
      relatedCases: rows.length,
      history: _c30A_(history) ? history.length: 0,
      letters: _c30A_(letters) ? letters.length: 0
    },
    resolvedAt: new Date().toISOString()
  }
}
function _r54(payload) {
  var bundle = getCanonicalCaseBundleImpl_(payload = payload || {
    }),
  seed = bundle.case || {
  };
  return ok_({
      case: seed || null,
      aliases: bundle.aliases || [],
      relatedCases: bundle.relatedCases || [],
      matchKey: bundle.matchKey,
      historyCount: Number(bundle.counts && bundle.counts.history || 0),
      letterCount: Number(bundle.counts && bundle.counts.letters || 0),
      historyPreview: _c30A_(bundle.history) ? bundle.history.slice(0, 5): [],
      letterPreview: _c30A_(bundle.letters) ? bundle.letters.slice(0, 5): [],
      resolvedAt: bundle.resolvedAt || new Date().toISOString()
    }, "โหลดบริบทข้อมูลเรื่องสำเร็จ")
}
function _Domain_getCanonicalCaseBundle(payload) {
  return ok_(getCanonicalCaseBundleImpl_(payload || {
      }), "โหลดชุดข้อมูลเรื่องแบบ canonical สำเร็จ")
}
function _r71(limit) {
  limit = Number(limit || 200) || 200;
  var cases = [];
  try {
    cases = _dedupeLatestRowsBy_(_listMainDataRows_(!1), _caseIdentityKey_)
  } catch (_e) {
    _recordWarning_("ec", _e),
    cases = []
  }
  var sliced = cases.slice(0, limit),
  byAlias = {
  };
  sliced.forEach(function(r) {
      var key = _normalizedText_(r &&(r.title || r.caseTitle) || "") + "||" + _normalizedText_(r &&(r.petitioners || r.petitionerName) || ""); key && key !== "||" &&(byAlias[key] = byAlias[key] || [],
        byAlias[key].push(r))
    });
  var aliasCollisions = Object.keys(byAlias).filter(function(k) {
      return(byAlias[k] || []).length > 1
    }).map(function(k) {
      var group = byAlias[k] || []; return {
        aliasKey: k,
        count: group.length,
        caseIds: group.map(function(x) {
            return _s_(x.caseId).trim()
          }).filter(Boolean),
        caseNums: group.map(function(x) {
            return _s_(x.caseNum).trim()
          }).filter(Boolean),
        titles: group.map(function(x) {
            return _s_(x.title || x.caseTitle).trim()
          }).filter(Boolean).slice(0, 3)
      }
    }),
  missingCaseIds = sliced.filter(function(r) {
      return!_s_(r && r.caseId).trim()
    }).slice(0, 50).map(function(r) {
      return {
        caseNum: _s_(r.caseNum).trim(),
        recNo: _s_(r.recNo).trim(),
        title: _s_(r.title || r.caseTitle).trim()
      }
    }),
  sampledBundles,
  failedBundles = sliced.slice(0, Math.min(25, sliced.length)).map(function(r) {
      try {
        var bundle = getCanonicalCaseBundleImpl_({
            caseId: _s_(r.caseId).trim(),
            caseNum: _s_(r.caseNum).trim(),
            recNo: _s_(r.recNo).trim(),
            title: _s_(r.title || r.caseTitle).trim(),
            petitioners: _s_(r.petitioners || r.petitionerName).trim()
          }); return {
          ok: !(!bundle || !bundle.case),
          caseId: _s_(r.caseId).trim(),
          relatedCases: Number(bundle && bundle.counts && bundle.counts.relatedCases || 0),
          history: Number(bundle && bundle.counts && bundle.counts.history || 0),
          letters: Number(bundle && bundle.counts && bundle.counts.letters || 0)
        }
      } catch (e) {
        return _recordWarning_("ec", e),
        {
          ok: !1,
          caseId: _s_(r.caseId).trim(),
          error: e && e.message || String(e)
        }
      }
    }).filter(function(x) {
      return!x.ok
    }),
  report = {
    generatedAt: new Date().toISOString(),
    scannedCases: sliced.length,
    aliasCollisionCount: aliasCollisions.length,
    aliasCollisions: aliasCollisions.slice(0, 20),
    missingCaseIdCount: missingCaseIds.length,
    missingCaseIds,
    bundleFailures: failedBundles.length,
    bundleFailureCases: failedBundles.slice(0, 20),
    ok: aliasCollisions.length === 0 && missingCaseIds.length === 0 && failedBundles.length === 0
  };
  return ok_(report, report.ok ? "สถานะ identity ของเรื่องอยู่ในเกณฑ์ดี": "พบประเด็นด้าน identity/canonical ของเรื่อง")
}
function getCaseIdentityHealthReport(limit) {
  return _r71(Number(limit || 200) || 200)
}
function _rf(value) {
  if (value == null || _rM(value))return "";
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if (!raw || raw === "-" || _rM(raw) || _r5(raw))return "";
  if (/^\d+$/.test(raw))return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  return decimal ? decimal[1]: ""
}
function _z59() {
  return[_T4,
    _S30,
    _S24,
    _L6,
    _S23,
    _S11,
    "receivedNo",
    _L4,
    _L14,
    _L16]
}
function _r21() {
  try {
    var exec = _appIsFnName_("_r135") ? _r135(): typeof AppInfra != "undefined" && AppInfra ? AppInfra: {
    };
    if (exec._r44)return {
      ok: !0,
      cached: !0
    };
    if (typeof getSheet_ != "function" || !_appIsFnName_("_sheetHeaders_"))return {
      ok: !1,
      skipped: !0,
      reason: "sheet helpers unavailable"
    };
    var sh = getSheet_(_S2),
    headers = _sheetHeaders_(_S2),
    names = _z59(),
    rowCount = Math.max(2, Number(sh.getMaxRows && sh.getMaxRows()) || Number(sh.getLastRow && sh.getLastRow()) || 2),
    formatted = [];
    return names.forEach(function(name) {
        var idx = headers.indexOf(name); if (!(idx < 0))try {
          AppRepository.setRangeNumberFormat(_S2, 1, idx + 1, rowCount, 1, "@"),
          formatted.push(name)
        } catch (e) {
          _c30W_("case.referenceTextColumnFormat." + name, e)
        }
      }),
    exec._r44 = !0,
    {
      ok: !0,
      formatted,
      rowCount
    }
  } catch (e) {
    return _c30W_("case.ensureReferenceTextColumns", e),
    {
      ok: !1,
      error: String(e && e.message || e)
    }
  }
}
function _r84(value) {
  if (value == null)return "";
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    var y = value.getFullYear(),
    thaiYear = y > 2400 ? y: y + 543;
    return String(value.getMonth() + 1) + "/" + String(thaiYear)
  }
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if (!raw)return "";
  var dateLike = raw.match(/^1[\/\-](\d{1,2})[\/\-]((?:19|20|25)\d{2})$/);
  if (dateLike) {
    var m = Number(dateLike[1]);
    if (m >= 1 && m <= 12)return String(m) + "/" + dateLike[2]
  }
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)) {
    var parsed = new Date(raw);
    if (parsed && !isNaN(parsed.getTime())) {
      var py = parsed.getFullYear();
      return String(parsed.getMonth() + 1) + "/" + String(py > 2400 ? py: py + 543)
    }
  }
  return ""
}
function _re(value) {
  if (value == null)return "";
  var recovered = _r84(value);
  if (recovered)return recovered;
  var raw = String(value).replace(/^'+/, "").replace(/[​-‍﻿]/g, "").trim();
  if (!raw || raw === "-" || raw === "/" || _rM(raw) || _r5(raw))return "";
  if (/^\d+$/.test(raw))return raw;
  var decimal = raw.match(/^(\d+)\.0+$/);
  if (decimal)return decimal[1];
  var slash = raw.match(/^(\d+)\s*\/\s*((?:19|20|25)?\d{2})$/);
  if (slash)return slash[1] + "/" + slash[2];
  var dashYear = raw.match(/^(\d+)\s*[\-–—]\s*((?:19|20|25)?\d{2})$/);
  if (dashYear)return dashYear[1] + "/" + dashYear[2];
  var text = raw.replace(/\s*\/\s*/g, "/").replace(/\s+/g, " ").trim();
  return /\d/.test(text) ? text: ""
}
function _r73(value) {
  var normalized = _re(value);
  return normalized ? normalized.indexOf("/") > - 1 ? "'" + normalized: normalized: ""
}
function _z94(value, referenceDate, explicitYear) {
  return _rf(value)
}
function _r5(value) {
  var raw = _c30S_(value).trim();
  return /^CASE[_-]/i.test(raw) || /^MAIN-\d+/i.test(raw) || /^ROW-\d+/i.test(raw)
}
function _rM(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime()))return!0;
  var raw = _c30S_(value).trim();
  return!!raw &&(/^\d{4}-\d{1,2}-\d{1,2}/.test(raw) || /^\d{1,2}\/\d{1,2}\/(?:19|20|25)\d{2}$/.test(raw) || /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) || /^\d{1,2}\s*(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}$/i.test(raw))
}
function _z98(caseNum, recNo, recDate, offerDate) {
  return _re(recNo)
}
function _rg(sheetName, fields, opts) {
  return opts = opts || {
  },
  fields = _c30A_(fields) ? fields: [],
  _appIsFnName_("_appDataServiceRead_") ? _appDataServiceRead_(sheetName, fields, _c30O_({
        owner: "cases.domain",
        ttl: 180
      }, opts)) || []: fields.length && typeof readSheetProjectedObjectsCached_ == "function" ? readSheetProjectedObjectsCached_(sheetName,
    fields, {
      includeDeleted: opts.includeDeleted === !0,
      requireCanonical: opts.requireCanonical === !0,
      ttl: opts.ttl || 180
    }) || []: typeof readSheetObjectsCached_ == "function" ? readSheetObjectsCached_(sheetName, {
      includeDeleted: opts.includeDeleted === !0,
      requireCanonical: opts.requireCanonical === !0
    }) || []: readSheetObjects_(sheetName, {
      includeDeleted: opts.includeDeleted === !0,
      requireCanonical: opts.requireCanonical === !0
    }) || []
}
function _ru(includeDeleted) {
  return _rg(_S2, [_S12,
      "id",
      "cat",
      "subCat",
      _S23,
      _S11,
      "offerDate",
      "recDate",
      _S28,
      _S3,
      _S9,
      _T53,
      _S18,
      _S33,
      "owner",
      _T52,
      "responsibleComm",
      "committeeOwner",
      _T44,
      _S37,
      _T55,
      "operationOfficer",
      "opStaff",
      "operator",
      "responsibleOfficer",
      "operationStaff",
      _S36,
      "officer",
      _S32,
      _S31,
      "accusedAgency",
      "accused",
      "agency",
      _T37,
      "coAssignee",
      "coOwners",
      "coResponsible",
      _T4,
      _S30,
      _S24,
      "remark",
      _S7,
      "closedReason",
      _S26,
      _T50,
      "pendingReason",
      "waitReason",
      "waitingReason",
      _T24,
      _T17,
      _T20,
      _T11,
      _T46,
      "reason",
      _S19,
      _T35,
      _T47,
      "committeeMeetings",
      _T56,
      _L7,
      _S27,
      _T49,
      "subcommitteeMeetings",
      _T45,
      _L0,
      "petitionerPhone",
      _S20,
      "caseType",
      "topic",
      _S14,
      "dueDate",
      _S16,
      _S5,
      "meetingStatus",
      _S4,
      _S6,
      "keySummary"], {
      includeDeleted: includeDeleted === !0,
      ttl: 180
    })
}
function _r50(includeDeleted) {
  return _rg(_T30, ["letterId",
      _S12,
      "letterNo",
      "bookNo",
      "letterDate",
      "agency",
      _S20,
      "issue",
      "dueDate",
      "extendDate",
      "remark",
      "letterStatus",
      _S18,
      "repliesJSON",
      "opStaff",
      "officer",
      _S16,
      _S5,
      _S4,
      _S6], {
      includeDeleted: includeDeleted === !0,
      ttl: 180
    })
}
function _rs() {
  return getCanonicalRepository_("cases.mainData")
}
function _listMainDataRows_(includeDeleted) {
  try {
    return _ru(includeDeleted === !0)
  } catch (_projectedErr) {
    throw _recordWarning_("ec", _projectedErr),
    new Error("CASE_MAIN_DATA_PROJECTED_READER_FAILED:" + String(_projectedErr && _projectedErr.message || _projectedErr))
  }
}
function _casePick_(row, keys) {
  row = row || {
  },
  keys = _c30A_(keys) ? keys: [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (row[key] !== void 0 && row[key] !== null && String(row[key]).trim() !== "")return row[key]
  }
  return ""
}
function _r28(row) {
  var title,
  cat,
  subCat,
  assignees;
  return row = row || {
  },
  {
    title: String(_casePick_(row, _C30K_TITLE_) || "").trim(),
    cat: String(_casePick_(row, ["cat",
          "caseType",
          "category",
          _T23,
          _T54]) || "").trim(),
    subCat: String(_casePick_(row, ["subCat",
          "subCategory",
          "issue",
          "topic",
          "topicName",
          "considerIssue",
          "caseIssue",
          _T15,
          _T42]) || "").trim(),
    assignees: String(_casePick_(row, [_S33,
          "owner",
          _T52,
          "responsibleComm",
          "committeeOwner",
          _T44,
          _T21,
          _T21,
          _T14,
          "คณะกรรมาธิการรับผิดชอบ",
          "ผู้รับผิดชอบ",
          "ผู้รับผิดชอบหลัก"]) || "").trim()
  }
}
function _r118(input) {
  (input = _c30O_({
      }, input || {
      })).id = input.id || input.caseId || "",
  input.caseId = input.caseId || input.id || "";
  var schema = _r28(input);
  input.title = schema.title,
  input.caseTitle = String(_casePick_(input, [_S7,
        _S28,
        _S20,
        _L19]) || schema.title || "").trim(),
  input.subject = _s_(input.subject || schema.title).trim(),
  input.cat = schema.cat || input.cat || "",
  input.caseType = input.caseType || schema.cat || "",
  input.subCat = schema.subCat || input.subCat || "",
  input.subCategory = input.subCategory || input.subCat || "",
  input.issue = input.issue || input.subCat || "",
  input.topic = input.subCat || input.topic || "",
  input.assignees = schema.assignees || input.assignees || "",
  input.owner = input.owner || input.assignees || "",
  input.responsibleCommissioners = input.responsibleCommissioners || input.assignees || "",
  input.petitioner = String(_casePick_(input, [_T53,
        _S3,
        _S9,
        _L24,
        _L13,
        _L1]) || "").trim(),
  input.petitioners = String(_casePick_(input, _r97) || "").trim(),
  input.keySummary = String(_casePick_(input, ["keySummary",
        "summary",
        "สรุปสาระสำคัญของเรื่อง",
        "สรุปสาระสำคัญ",
        "สาระสำคัญ"]) || "").trim(),
  input.remark = String(_casePick_(input, ["remark",
        "note",
        "หมายเหตุ"]) || "").trim(),
  input.pendingRemark = String(_casePick_(input, _r29) || "").trim(),
  input.pendingReason = input.pendingRemark,
  input.rejectionReason = String(_casePick_(input, [_S26,
        "rejectReason",
        "notAcceptedReason",
        _L10,
        _T6]) || "").trim(),
  input.petitionerPhone = _appPhoneForDisplay_(_casePick_(input, _r11) || "");
  var rawStatus = String(_casePick_(input, [_S18,
        "caseStatus",
        "processStatus",
        "currentStatus",
        _S17,
        _L23]) || _L3).trim();
  input.statusRaw = rawStatus,
  input.status = typeof AppBackendCore != "undefined" && AppBackendCore && typeof AppBackendCore.normalizeCaseStatus == "function" ? AppBackendCore.normalizeCaseStatus(rawStatus,
    {
      defaultStatus: _L3,
      strict: !0
    }): _caseNormalizeStatusForDisplay_(rawStatus);
  var caseNumRaw = _casePick_(input, _r51) || "";
  _rM(caseNumRaw) &&(caseNumRaw = ""),
  input.caseNum = _z94(caseNumRaw, input.offerDate || input.recDate || input.createdAt, input.fy || input.fiscalYear || input.budgetYear),
  input.caseNo = input.caseNum,
  input.runningNo = input.caseNum,
  input.ลำดับเรื่อง = input.caseNum;
  var recNoRaw = _casePick_(input, [_S23,
      _S11,
      "receivedNo",
      _L4,
      _L14,
      _L16]) || "";
  return input.recNo = _z98(input.caseNum, recNoRaw, input.recDate, input.offerDate),
  input.receiveNo = input.recNo,
  input.เลขรับเรื่อง = input.recNo,
  input
}
function _caseNormalizeStatusForDisplay_(status) {
  return _caseStatusNormalizePhaseD_(status, {
      defaultStatus: _L3,
      warningKey: "case.display.status"
    })
}
function _r96(row) {
  var schema = _r28(row = row || {
    }),
  title = schema.title,
  cat = schema.cat,
  subCat = schema.subCat,
  assignees = schema.assignees,
  statusRaw = String(row.status || row.caseStatus || _L3).trim(),
  statusForReason = _caseNormalizeStatusForDisplay_(statusRaw),
  offerDateCanonical = String(_casePick_(row, _r114) || "").trim(),
  rawClosedReason = String(_casePick_(row, _r79) || "").trim(),
  rawRejectionReason = String(_casePick_(row, [_S26,
        "rejectReason",
        "notAcceptedReason",
        "notReceiveReason",
        "notAcceptReason",
        "caseRejectReason",
        _T46,
        "decisionReason",
        "reason",
        _S19,
        _L10,
        _T6,
        "เหตุผลการไม่รับเรื่อง"]) || "").trim(),
  rawPendingReason = String(_casePick_(row, _r29) || "").trim(),
  closedReasonForDto = rawClosedReason || rawRejectionReason || "",
  rejectionReasonForDto = rawRejectionReason || rawClosedReason || "",
  pendingReasonForDto = rawPendingReason ||(statusForReason === "รอพิจารณา" ? rawClosedReason || rawRejectionReason: ""),
  genericReasonForDto = statusForReason === "รอพิจารณา" ? pendingReasonForDto: statusForReason === "ยุติเรื่อง" ? closedReasonForDto: statusForReason === "ไม่รับเรื่อง" ? rejectionReasonForDto: rawPendingReason || rawClosedReason || rawRejectionReason || "";
  return _c30O_({
    }, row, {
      caseId: _s_(row.caseId || row.id).trim(),
      id: _s_(row.id || row.caseId).trim(),
      caseNum: _rf(_casePick_(row, _r51) || ""),
      caseNo: _rf(_casePick_(row, [_S30,
            _T4,
            _S24,
            "orderNo",
            "seq",
            "no",
            _L6,
            "ลำดับ",
            _T51]) || ""),
      recNo: _re((_appIsFnName_("_r3") ? _r3(row): "") || _casePick_(row, [_S23,
            _S11,
            "receivedNo",
            _L4,
            _S15,
            _T43,
            _L22]) || ""),
      title,
      caseTitle: String(_casePick_(row, [_S7,
            _S10,
            _T38,
            "ชื่อเรื่องพิจารณา(ถ้ามี)",
            _L11,
            _L5]) || row.caseTitle || title || "").trim(),
      subject: _s_(row.subject || title).trim(),
      cat,
      caseType: _s_(row.caseType || cat).trim(),
      petitioners: String(_casePick_(row, _r97) || "").trim(),
      petitionerPhone: _appPhoneForDisplay_(_casePick_(row, _r11) || ""),
      respondent: String(_casePick_(row, _r113) || "").trim(),
      sentAgency: String(_casePick_(row, _r48) || "").trim(),
      sendToAgency: String(_casePick_(row, _r48) || "").trim(),
      subCat,
      subCategory: subCat,
      issue: subCat,
      topic: subCat,
      assignees,
      owner: assignees,
      responsibleCommissioners: assignees,
      staffs: String(_casePick_(row, _r132) || "").trim(),
      coAssignees: String(_casePick_(row, _r37) || "").trim(),
      status: statusForReason,
      statusRaw,
      offerDate: offerDateCanonical,
      dateProposed: offerDateCanonical,
      bookDate: offerDateCanonical,
      closedReason: closedReasonForDto,
      rejectionReason: rejectionReasonForDto,
      rejectReason: rejectionReasonForDto,
      notAcceptedReason: rejectionReasonForDto,
      pendingRemark: pendingReasonForDto,
      pendingReason: pendingReasonForDto,
      statusReason: genericReasonForDto,
      reason: genericReasonForDto,
      เหตุผล: genericReasonForDto,
      "เหตุผล(ไม่รับเรื่อง)": rejectionReasonForDto,
      schemaStamp: "domain-schema-cases-current",
      contractStamp: "case-dto-current"
    })
}
function _r53(value) {
  return _c30S_(value).replace(/^'+/, "").trim()
}
function _r6(title, petitioner) {
  return title = _normalizedText_(title || ""),
  petitioner = _normalizedText_(petitioner || ""),
  title ? title + "|" + petitioner: ""
}
function _r94() {
  var cacheKey = "case.saveLookupIndex.current." +(_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1"),
  hit = _appIsFnName_("_requestScopeGet_") ? _requestScopeGet_("caseSaveLookupIndex", cacheKey): null;
  if (hit)return hit;
  var rows = [];
  try {
    rows = _appIsFnName_("_ru") ? _ru(!0): _rs().list({
        includeDeleted: !0,
        requireCanonical: !0
      })
  } catch (_idxProjectedErr) {
    rows = _rs().list({
        includeDeleted: !0,
        requireCanonical: !0
      })
  }
  var idx = {
    byId: {
    },
    byCaseNum: {
    },
    byRecNo: {
    },
    byTitlePetitioner: {
    },
    rowsRead: (rows = _c30A_(rows) ? rows: []).length,
    generatedAt: new Date().toISOString(),
    source: "case-keyed-index-current"
  };
  function caseIndexPut_(map, key, row) {
    if (key = _r53(key)) {
      var current = map[key];
      (!current || _rowFreshnessScore_(row).localeCompare(_rowFreshnessScore_(current)) > 0) &&(map[key] = row)
    }
  }
  return rows.forEach(function(row) {
      row = row || {
      },
      caseIndexPut_(idx.byId, row.caseId || row.id, row),
      caseIndexPut_(idx.byCaseNum, _rf(row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง || ""),
        row),
      caseIndexPut_(idx.byRecNo, _re(row.recNo || row.receiveNo || row.เลขรับเรื่อง || ""), row),
      caseIndexPut_(idx.byTitlePetitioner, _r6(row.title || row.caseTitle || "", row.petitioners || row.petitionerName || ""),
        row)
    }),
  _appIsFnName_("_requestScopePut_") &&(idx = _requestScopePut_("caseSaveLookupIndex", cacheKey, idx)),
  idx
}
function _r27(input) {
  input = input || {
  };
  var idx = _r94(),
  id = _r53(input.id || input.caseId || "");
  if (id && idx.byId[id])return idx.byId[id];
  var caseNum = _rf(input.caseNum || input.caseNo || input.runningNo || input.ลำดับเรื่อง || "");
  if (caseNum && idx.byCaseNum[caseNum])return idx.byCaseNum[caseNum];
  var recNo = _re(input.recNo || input.receiveNo || input.เลขรับเรื่อง || "");
  if (recNo && idx.byRecNo[recNo])return idx.byRecNo[recNo];
  var titleKey = _r6(input.title || input.caseTitle || "", input.petitioner || input.petitioners || "");
  return titleKey && idx.byTitlePetitioner[titleKey] ? idx.byTitlePetitioner[titleKey]: null
}
function _r40(input) {
  input = input || {
  };
  var targetId = _s_(input.id || input.caseId).trim();
  if (targetId)try {
    var byId = _rs().findByKey(targetId, {
        includeDeleted: !0,
        requireCanonical: !0
      });
    if (byId)return byId
  } catch (_findByIdErr) {
    _recordWarning_("cases.findExisting.byId", _findByIdErr)
  }
  try {
    var indexed = _appIsFnName_("_r27") ? _r27(input): null;
    if (indexed)return indexed
  } catch (_caseIndexErr) {
    _recordWarning_("cases.findExisting.keyedIndex", _caseIndexErr)
  }
  var rows = _rs().listActive(),
  targetCaseNum = _rf(input.caseNum || input.caseNo || input.runningNo || input.ลำดับเรื่อง || ""),
  targetRecNo = _re(input.recNo || input.receiveNo || input.เลขรับเรื่อง || ""),
  targetTitle = _normalizedText_(input.title || input.caseTitle || ""),
  targetPetitioner = _normalizedText_(input.petitioner || input.petitioners || ""),
  matches =(_c30A_(rows) ? rows: []).filter(function(row) {
      if (row = row || {
        }, targetId && _s_(row.caseId).trim() === targetId || targetCaseNum && _rf(row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง || "") === targetCaseNum || targetRecNo && _re(row.recNo || row.receiveNo || row.เลขรับเรื่อง || "") === targetRecNo)return!0; if (targetTitle && _normalizedText_(row.title || row.caseTitle || "") === targetTitle) {
        var rowPetitioner = _normalizedText_(row.petitioners || row.petitionerName || ""); return!targetPetitioner || rowPetitioner === targetPetitioner
      }
      return!1
    });
  return matches.length ?(matches.sort(function(a, b) {
        return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
      }), matches[0] || null): null
}
function _r95(input, existing, now) {
  input = input || {
  },
  existing = existing || {
  },
  now = now || new Date().toISOString();
  var resolvedId = String(existing.caseId || input.id || input.caseId || "CASE_" + Date.now() + "_" + Math.floor(9e3 * Math.random() + 1e3)).trim(),
  schema = _r28(_c30O_({
      }, existing, input)),
  title = _s_(input.title || input.caseTitle || schema.title || existing.title || existing.caseTitle).trim(),
  cat = _s_(schema.cat || input.cat || input.caseType || existing.cat || existing.caseType).trim(),
  subCat = _s_(schema.subCat || input.subCat || existing.subCat || existing.topic).trim(),
  assignees = _s_(schema.assignees || input.assignees || existing.assignees).trim(),
  receiveNoForSheet = _r73(input.recNo || input.receiveNo || existing.recNo || existing.receiveNo || existing.เลขรับเรื่อง || ""),
  statusForReason = _caseNormalizeStatusForDisplay_(String(input.status || existing.status || _L3).trim()),
  incomingClosedReason = String(input.closedReason !== void 0 ? input.closedReason: existing.closedReason || "").trim(),
  incomingRejectionReason = String(input.rejectionReason || input.rejectReason || input.notAcceptedReason || input[_L10] || existing.rejectionReason || existing.rejectReason || existing.notAcceptedReason || existing[_L10] || "").trim(),
  incomingPendingRemark = String(input.pendingRemark || input.pendingReason || input.waitReason || input.waitingReason ||(statusForReason === "รอพิจารณา" ? input.statusReason || input.reason || input.เหตุผล || existing.pendingRemark || existing.pendingReason || existing.statusReason || existing.reason || existing.เหตุผล || "": existing.pendingRemark || existing.pendingReason || "")).trim(),
  incomingStatusReason = "";
  return statusForReason === "ไม่รับเรื่อง" ?(incomingRejectionReason = incomingRejectionReason || incomingClosedReason,
    incomingClosedReason = "", incomingPendingRemark = "", incomingStatusReason = incomingRejectionReason): statusForReason === "ยุติเรื่อง" ?(incomingClosedReason = incomingClosedReason || incomingRejectionReason,
    incomingRejectionReason = "", incomingPendingRemark = "", incomingStatusReason = incomingClosedReason): statusForReason === "รอพิจารณา" ?(incomingPendingRemark = incomingPendingRemark || incomingClosedReason || incomingRejectionReason,
    incomingClosedReason = "", incomingRejectionReason = "", incomingStatusReason = incomingPendingRemark): (incomingClosedReason = "",
    incomingRejectionReason = "", incomingPendingRemark = "", incomingStatusReason = ""),
  _c30O_({
    }, existing, {
      caseId: resolvedId,
      caseNum: _rf(input.caseNum || input.caseNo || existing.caseNum || ""),
      recNo: receiveNoForSheet,
      receiveNo: receiveNoForSheet,
      เลขรับเรื่อง: receiveNoForSheet,
      title,
      petitioners: _s_(input.petitioner || input.petitioners || existing.petitioners).trim(),
      respondent: String(_casePick_(_c30O_({
            }, existing, input), _r113) || "").trim(),
      assignees,
      staffs: String(_casePick_(_c30O_({
            }, existing, input), _r132) || "").trim(),
      coAssignees: String(_casePick_(_c30O_({
            }, existing, input), _r37) || "").trim(),
      offerDate: input.offerDate || existing.offerDate || "",
      recDate: input.recDate || existing.recDate || "",
      dueDate: input.dueDate || existing.dueDate || "",
      status: statusForReason,
      caseTitle: _s_(input.caseTitle || title || existing.caseTitle).trim(),
      subCat,
      subCategory: subCat,
      issue: subCat,
      remark: String(input.remark !== void 0 ? input.remark: existing.remark || "").trim(),
      keySummary: _s_(input.keySummary || input.summary || existing.keySummary).trim(),
      agencyName: _s_(input.agencyName || existing.agencyName).trim(),
      closedReason: incomingClosedReason,
      rejectionReason: incomingRejectionReason,
      pendingRemark: incomingPendingRemark,
      pendingReason: incomingPendingRemark,
      statusReason: incomingStatusReason,
      reason: incomingStatusReason,
      เหตุผล: incomingStatusReason,
      cat,
      subcommittee: _s_(input.subcommittee || existing.subcommittee).trim(),
      owner: assignees,
      responsibleCommissioners: assignees,
      petitionerPhone: _appPhoneForSheet_(input.petitionerPhone || existing.petitionerPhone || ""),
      meetingStatus: _s_(input.meetingStatus || existing.meetingStatus).trim(),
      subject: _s_(input.subject || title || existing.subject).trim(),
      caseType: cat,
      topic: subCat,
      schemaStamp: "domain-schema-cases-current",
      createdAt: existing.createdAt || now,
      updatedAt: now,
      isDeleted: !1,
      deletedAt: ""
    })
}
function _r86(caseId, record, isNew) {
  if (!isNew)return "";
  record = record || {
  };
  var title = _s_(record.title || record.caseTitle).trim();
  if (!_getGeminiKey_() || !title)return "";
  try {
    var aiSummary = _generateCaseSummary_(title, record.petitioners || "", record.respondent || "");
    return aiSummary && !_s_(record.keySummary).trim() && _rs().upsert(caseId, {
        caseId,
        keySummary: aiSummary
      }),
    aiSummary || ""
  } catch (_aiErr) {
    return _recordWarning_("ec", _aiErr),
    ""
  }
}
function _r15(value) {
  return _c30S_(value).replace(/\s+/g, "").trim()
}
function _r58(input) {
  var caseNum = _rf((input = input || {
      }).caseNum || input.caseNo || ""),
  recNo = _re(input.recNo || input.receiveNo || ""),
  keySummary = _r15(input.keySummary || input.summary || ""),
  remark = _r15(input.remark || input.note || "");
  if (keySummary && remark && keySummary === remark)throw new Error("สรุปสาระสำคัญของเรื่อง และหมายเหตุต้องเป็นคนละรายการ ห้ามคัดลอกข้อความเดียวกัน");
  return!0
}
function apiSaveCase(payload) {
  return writeGateway_("apiSaveCase", payload || {
    }, function(inputPayload) {
      _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(inputPayload) || requireAuth_(inputPayload,
        _S36); var sess = _getSession_(inputPayload.token || inputPayload._token),
      c = _r118(inputPayload.case || inputPayload || {
        }); _r58(c); var title = _s_(c.title || c.caseTitle).trim(); if (!title)throw new Error("กรุณากรอกชื่อเรื่อง"); var repo = _rs(),
      existing = _r40(c),
      now,
      record = _r95(c, existing, new Date().toISOString()); _r21(); var saved = repo.upsert(record.caseId,
        record); invalidateSheetCache_(_S2); var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_") ? _invalidateCaseDerivedCaches_("apiSaveCase"): {
      },
      aiSummary = ""; !inputPayload || inputPayload.enableAiSummary !== !0 && inputPayload.generateAiSummary !== !0 && inputPayload.aiSummaryRequested !== !0 ||(aiSummary = _r86(record.caseId,
          record, saved && saved.mode === "create")),
      logAudit_("apiSaveCase", {
          caseId: record.caseId,
          mode: saved && saved.mode ||(existing ? "update": "create"),
          title,
          user: sess ? sess.username || sess.email: "unknown"
        }); var dto = _r96(record); return ok_(_c30O_({
          }, dto, {
            aiSummary: aiSummary || "",
            cacheInvalidation: derivedInvalidation || {
            }
          }), "บันทึกข้อมูลเรื่องสำเร็จ")
    }, "บันทึกข้อมูลเรื่องสำเร็จ", "บันทึกข้อมูลเรื่องไม่สำเร็จ")
}
function apiDeleteCase(payload) {
  return writeGateway_("apiDeleteCase", payload || {
    }, function(input) {
      _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(input) || requireAuth_(input,
        "admin"); var sess = _getSession_(input.token || input._token),
      caseId = _s_(input.caseId).trim(); if (!caseId)throw new Error("ไม่พบ caseId"); if (getCanonicalHeaderAudit_(_S2),
        !softDeleteSheetObjectByKey_(_S2, _S12, caseId))throw new Error("ไม่พบเรื่อง:" + caseId); invalidateSheetCache_(_S2); var derivedInvalidation = _appIsFnName_("_invalidateCaseDerivedCaches_") ? _invalidateCaseDerivedCaches_("apiDeleteCase"): {
      }; return logAudit_("apiDeleteCase", {
          caseId,
          user: sess ? sess.username: "unknown"
        }),
      ok_({
          deleted: !0,
          caseId,
          cacheInvalidation: derivedInvalidation || {
          }
        }, "ลบข้อมูลเรื่องสำเร็จ")
    }, "ลบข้อมูลเรื่องสำเร็จ", "ลบข้อมูลเรื่องไม่สำเร็จ")
}
function apiSearch(payload) {
  payload = payload || {
  };
  try {
    _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(payload) || requireAuth_(payload,
      "viewer");
    var q = _s_(payload.q || payload.query || payload.keyword).trim().toLowerCase(),
    type = String(payload.type || "all").toLowerCase().trim() || "all",
    limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 25) || 25, 100)),
    sourceRows = _appIsFnName_("_rp") ? _readCanonicalCaseProjection_(_caseSearchProjectedFields_(), {
        forceFresh: !0,
        noCache: !0,
        bypassCache: !0,
        cacheTtlSeconds: 0,
        source: "apiSearch.displaySafeDefaultValue"
      }): _ru(!1),
    cases =(_c30A_(sourceRows) ? sourceRows: []).map(function(r) {
        var dto = _r96(r || {
          }); _appIsFnName_("_caseSearchEnsureReceiveNo_") &&(dto = _caseSearchEnsureReceiveNo_(dto)); var caseNum = _rf(dto.caseNum || dto.caseNo || dto.runningNo || dto.ลำดับเรื่อง || ""),
        recNo = _re(dto.recNo || dto.receiveNo || dto.เลขรับเรื่อง || ""),
        title = _s_(dto.title || dto.subject).trim(),
        caseTitle = String(dto.caseTitle || dto.considerationTitle || dto["ชื่อเรื่องพิจารณา(ถ้ามี)"] || "").trim(); return {
          id: dto.caseId || dto.id || "",
          caseId: dto.caseId || dto.id || "",
          type: "case",
          typeLabel: _L5,
          caseNum,
          caseNo: caseNum,
          runningNo: caseNum,
          ลำดับเรื่อง: caseNum,
          recNo,
          receiveNo: recNo,
          เลขรับเรื่อง: recNo,
          title: title || caseTitle || "",
          subject: title || caseTitle || "",
          caseTitle: caseTitle || title || "",
          considerationTitle: caseTitle || "",
          "ชื่อเรื่องพิจารณา(ถ้ามี)": caseTitle || title || "",
          detail: dto.petitioners || dto.petitionerName || dto.petitioner || "",
          petitioners: dto.petitioners || dto.petitionerName || dto.petitioner || "",
          respondent: dto.respondent || dto.agencyName || "",
          agencyName: dto.agencyName || dto.respondent || "",
          status: dto.status || "",
          offerDate: dto.offerDate || dto.bookDate || dto.letterDate || dto.dateProposed || "",
          dateProposed: dto.dateProposed || dto.offerDate || "",
          bookDate: dto.bookDate || dto.offerDate || "",
          closedReason: dto.closedReason || "",
          rejectionReason: dto.rejectionReason || "",
          rejectReason: dto.rejectReason || dto.rejectionReason || "",
          notAcceptedReason: dto.notAcceptedReason || dto.rejectionReason || "",
          "เหตุผล(ไม่รับเรื่อง)": dto[_L10] || dto.rejectionReason || "",
          cat: dto.cat || dto.caseType || "",
          caseType: dto.caseType || dto.cat || "",
          subCat: dto.subCat || "",
          assignees: dto.assignees || "",
          owner: dto.owner || dto.assignees || "",
          staffs: dto.staffs || dto.opStaff || "",
          coAssignees: dto.coAssignees || "",
          updatedAt: dto.updatedAt || dto.createdAt || ""
        }
      }),
    letters = _r50(!1).map(function(r) {
        return {
          id: r.letterId || "",
          type: "letter",
          typeLabel: _T41,
          title: r.subject || r.issue || "",
          detail: r.agency || "",
          status: r.letterStatus || r.status || "",
          updatedAt: r.updatedAt || r.createdAt || ""
        }
      }),
    all = cases.concat(letters);
    return type !== "all" &&(all = all.filter(function(r) {
          return r.type === type
        })),
    q &&(all = all.filter(function(r) {
          return[r.title,
            r.detail,
            r.typeLabel,
            r.status].some(function(v) {
              return _s_(v).toLowerCase().indexOf(q) !== - 1
            })
        })),
    all.sort(function(a, b) {
        return _s_(b.updatedAt).localeCompare(_s_(a.updatedAt))
      }),
    ok_(all.slice(0, limit).map(sanitizeRow_), "ค้นหาข้อมูลสำเร็จ")
  } catch (e) {
    return _recordWarning_("ec", e),
    err_(e.message || String(e), {
        rows: [],
        data: [],
        totalRecords: 0,
        technicalDebtFix: "apiSearch-projected-reader"
      })
  }
}
function apiGetCaseContext(payload) {
  return payload = requireDomainRequest_(payload, "viewer"),
  normalizeResult_(_r54(payload), "โหลดบริบทข้อมูลเรื่องสำเร็จ", "โหลดบริบทข้อมูลเรื่องไม่สำเร็จ")
}
function _rE(value) {
  if (value == null || value === "")return!1;
  if (value instanceof Date && !isNaN(value.getTime()))return!0;
  var raw = _s_(value).trim();
  if (!raw)return!1;
  if (/^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw))return!0;
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw)) {
    var parsed = new Date(raw);
    return!isNaN(parsed.getTime())
  }
  return!1
}
function _rP(value) {
  function toLetterNoFromParts(day, year) {
    var d = Number(day || 0),
    y = Number(year || 0);
    return d && y ? String(d) + "/" + String(y >= 2400 ? y: y + 543): ""
  }
  if (value instanceof Date && !isNaN(value.getTime()))return toLetterNoFromParts(value.getDate(), value.getFullYear());
  var raw = _c30S_(value).trim();
  if (!raw)return "";
  var isoMatch = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s]|$)/);
  if (isoMatch)return toLetterNoFromParts(isoMatch[3], isoMatch[1]);
  var parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? "": toLetterNoFromParts(parsed.getDate(), parsed.getFullYear())
}
function _rl(value) {
  if (value == null)return "";
  var textValue = _s_(value).trim();
  return textValue || value instanceof Date ? /^\d{1,5}\s*\/\s*\d{2,4}$/.test(textValue) ? textValue.replace(/\s*\/\s*/,
    "/"): _rE(value) && _rP(value) || textValue: ""
}
function _normalizeLetterDateFromFields_(letterDate, letterNo, bookNo) {
  return _caseDateTextPhaseD2_(letterDate || "", {
      context: "letterDate"
    }) ||(_rE(letterNo) ? _caseDateTextPhaseD2_(letterNo || "", {
        context: "letterNo"
      }): _rE(bookNo) ? _caseDateTextPhaseD2_(bookNo || "", {
        context: "bookNo"
      }): "")
}
function _ro(status) {
  var s = _c30S_(status).replace(/\s+/g, "").trim();
  return s ? s === "ได้รับตอบกลับแล้ว" || s === "ตอบรับแล้ว" || s === "ได้รับแล้ว" ? "ได้รับแล้ว": s: "ยังไม่ได้รับ"
}
function _r0(status) {
  return _ro(status) === "ได้รับแล้ว"
}
function _r7(row) {
  var rawLetterNo =(row = row || {
    }).letterNo || row.bookNo || "",
  rawBookNo = row.bookNo || row.letterNo || "",
  letterNoWasDate = _rE(row.letterNo || ""),
  bookNoWasDate = _rE(row.bookNo || "");
  return sanitizeRow_({
      letterId: _s_(row.letterId),
      caseId: _s_(row.caseId).trim(),
      letterNo: _rl(rawLetterNo),
      letterNoRaw: _c30S_(rawLetterNo),
      letterNoSchemaIssue: letterNoWasDate || bookNoWasDate ? "date-like-letter-number": "",
      letterDate: _normalizeLetterDateFromFields_(row.letterDate || "", row.letterNo || "", row.bookNo || ""),
      agency: _s_(row.agency),
      subject: _s_(row.subject),
      issue: _s_(row.issue),
      dueDate: normalizeDateOutput_(row.dueDate || ""),
      extendDate: normalizeDateOutput_(row.extendDate || ""),
      remark: _s_(row.remark),
      letterStatus: _ro(row.letterStatus || row.status || ""),
      repliesJSON: String(row.repliesJSON || row.repliesJson || "[]"),
      opStaff: _s_(row.opStaff || row.officer),
      bookNo: _rl(rawBookNo),
      bookNoRaw: _c30S_(rawBookNo),
      officer: _s_(row.officer || row.opStaff)
    })
}
function _r39(row) {
  row = row || {
  };
  var raw = _s_(row.committeeType || row.meetingType || row.type || row.meetingGroup || row.ประเภทการประชุม).replace(/\s+/g,
    "").trim(),
  sub = _s_(row.subcommitteeName || row.subcommittee || row.subCommitteeName || row.คณะอนุกรรมาธิการ).replace(/\s+/g,
    "").trim();
  return /อนุกรรมาธิการ/.test(raw) || sub ? "คณะอนุกรรมาธิการ": (/กรรมาธิการ/.test(raw), _L7)
}
function _normalizeMeetingLogRow_(row) {
  row = row || {
  };
  var meetingDateText = _committeeMeetingDateText_(_caseRowPickPhaseD2_(row, ["date",
        _T31,
        "dateRaw",
        _L12], "")),
  meetingTypeText = _r39(row),
  subcommitteeName = String(_caseRowPickPhaseD2_(row, _r9, "")).replace(/\s+/g, "").trim();
  return sanitizeRow_({
      logId: _s_(row.logId || row.meetingLogId || row.id),
      caseId: _s_(row.caseId).trim(),
      caseNum: _s_(row.caseNum || row.caseNo || row.runningNo || row.orderNo || row.ลำดับเรื่อง).trim(),
      caseNo: _s_(row.caseNo || row.caseNum || row.runningNo || row.orderNo || row.ลำดับเรื่อง).trim(),
      recNo: _s_(row.recNo || row.receiveNo || row.receiptNo || row.เลขรับเรื่อง || row.เลขรับ).trim(),
      receiveNo: _s_(row.receiveNo || row.recNo || row.receiptNo || row.เลขรับเรื่อง || row.เลขรับ).trim(),
      round: _s_(row.round || row.meetingRound || row.meetingNo || row.ครั้งที่ || row.ครั้งที่ประชุม),
      date: meetingDateText,
      meetingDate: meetingDateText,
      dateRaw: meetingDateText,
      วันที่ประชุม: meetingDateText,
      meetingType: meetingTypeText,
      committeeType: meetingTypeText,
      ประเภทการประชุม: meetingTypeText,
      subcommitteeName: meetingTypeText === "คณะอนุกรรมาธิการ" ? subcommitteeName: "",
      meetingGroup: meetingTypeText === "คณะอนุกรรมาธิการ" ? subcommitteeName || "คณะอนุกรรมาธิการ": _L7,
      note: _s_(row.note || row.result || row.summary || row.มติ || row.ผลการประชุม),
      title: _s_(row.title || row.caseTitle || row.subject || row.เรื่อง || row.ชื่อเรื่อง),
      location: _s_(row.location || row.meetingLocation || row.สถานที่ประชุม),
      attendees: _s_(row.attendees || row.participants || row.ผู้เข้าร่วมประชุม),
      summary: _s_(row.summary || row.note || row.result),
      result: _s_(row.result || row.note || row.summary)
    })
}
function _rd(value) {
  if (_appIsFnName_("_r117"))try {
    return _r117(value || "")
  } catch (_e) {
    _recordWarning_("ec", _e)
  }
  return _c30S_(value).replace(/\s+/g, "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim().toLowerCase()
}
function _r125(row) {
  row = row || {
  };
  var primary = _s_(row.caseId).trim();
  return primary || [_s_(row.caseNum).trim(),
    _s_(row.recNo).trim(),
    _rd(row.title || row.caseTitle || ""),
    _rd(row.petitioners || row.petitionerName || "")].join("|")
}
function _r89(row) {
  row = row || {
  };
  var caseId = _s_(row.caseId).trim(),
  caseNum = _s_(row.caseNum || row.caseNo).trim(),
  recNo = _s_(row.recNo || row.receiveNo).trim(),
  title = _rd(row.title || row.caseTitle || row.considerationTitle || row.subject || ""),
  caseKey = caseId || [caseNum,
    recNo,
    title].join("|"),
  round = _s_(row.round || row.meetingRound || row.meetingNo || row.relatedMeetingNo || row.roundNo || row.ครั้งที่ || row.ครั้งที่ประชุม).replace(/^ครั้งที่\s*/i,
    "").replace(/^ครั้งประชุม\s*/i, "").replace(/\s+/g, "").trim(),
  date = _committeeMeetingDateText_(row.date || row.meetingDate || row.relatedMeetingDate || row.dateRaw || row.วันที่ประชุม || ""),
  meetingType = _r39(row),
  subcommitteeName = meetingType === "คณะอนุกรรมาธิการ" ? _rd(row.subcommitteeName || row.subcommittee || row.subCommitteeName || row.คณะอนุกรรมาธิการ || row.meetingGroup || ""): "";
  return[caseKey,
    round,
    date,
    meetingType,
    subcommitteeName].join("|")
}
function _r46(row) {
  return row = row || {
  },
  _appIsFnName_("_letterIdentityKey_") ? _letterIdentityKey_(row): [_s_(row.letterId).trim(),
    _s_(row.caseId).trim(),
    _s_(row.letterNo || row.bookNo).trim(),
    normalizeDateOutput_(row.letterDate || ""),
    _rd(row.subject || row.issue || "")].join("|")
}
function _rL(rows, keyFn) {
  if (rows = _c30A_(rows) ? rows.slice(): [], _appIsFnName_("_dedupeLatestRowsBy_"))try {
    return _dedupeLatestRowsBy_(rows, keyFn)
  } catch (_e) {
    _recordWarning_("ec", _e)
  }
  var map = {
  };
  return rows.forEach(function(row) {
      if (row) {
        var key = ""; try {
          key = String((typeof keyFn == "function" ? keyFn(row): "") || "")
        } catch (_eKey) {
          _recordWarning_("ec", _eKey),
          key = ""
        }
        key ||(key = String(row.id || row.caseId || row.logId || row.letterId || JSON.stringify(row))); var current = map[key],
        rowStamp,
        curStamp; if (!current)return map[key] = row,
        void 0; _s_(row.updatedAt || row.modifiedAt || row.timestamp || row.createdAt) >= _s_(current.updatedAt || current.modifiedAt || current.timestamp || current.createdAt) &&(map[key] = row)
      }
    }),
  Object.keys(map).map(function(key) {
      return map[key]
    })
}
function _rx(payload) {
  if (payload = payload || {
    }, _appIsFnName_("_resolveCaseIdentityAliases_"))try {
    var resolved = _resolveCaseIdentityAliases_(payload) || {
    };
    if (resolved && typeof resolved == "object")return resolved
  } catch (_e) {
    _recordWarning_("ec", _e)
  }
  var seedCase = null;
  try {
    seedCase = _findCaseByIdentity_(payload)
  } catch (_eFind) {
    _recordWarning_("ec", _eFind),
    seedCase = null
  }
  var ids = [],
  seedId = String(payload &&(payload.caseId || payload.id) || "").trim();
  return seedId && ids.push(seedId),
  seedCase &&(_s_(seedCase.caseId).trim() && ids.push(_s_(seedCase.caseId).trim()), _s_(seedCase.id).trim() && ids.push(_s_(seedCase.id).trim())),
  {
    ids: ids = ids.filter(Boolean).filter(function(v, i, arr) {
        return arr.indexOf(v) === i
      }),
    case: seedCase || {
      caseId: seedId,
      caseNum: _s_(payload.caseNum || payload.caseNo || payload.runningNo || payload.orderNo || payload.ลำดับเรื่อง).trim(),
      recNo: _s_(payload.recNo || payload.receiveNo || payload.receiptNo || payload.เลขรับเรื่อง || payload.เลขรับ).trim(),
      title: _s_(payload.title || payload.caseTitle || payload.subject || payload.เรื่อง || payload.ชื่อเรื่อง).trim(),
      caseTitle: _s_(payload.caseTitle || payload.title || payload.subject || payload.เรื่อง || payload.ชื่อเรื่อง).trim(),
      petitioners: _s_(payload.petitioners || payload.petitionerName || payload.petitioner || payload[_L1] || payload.ผู้ร้อง).trim()
    },
    rows: seedCase ? [seedCase]: []
  }
}
function _r122(payloadOrCaseId, sourceName) {
  var payload = payloadOrCaseId && typeof payloadOrCaseId == "object" ? payloadOrCaseId: {
    caseId: payloadOrCaseId
  };
  if (_appIsFnName_("_assertCaseExists_"))try {
    return _assertCaseExists_(payload, sourceName)
  } catch (_eAssert) {
    _recordWarning_("ec", _eAssert)
  }
  var found = null;
  try {
    found = _findCaseByIdentity_(payload)
  } catch (_eFind) {
    _recordWarning_("meeting.caseAssert.find", _eFind),
    found = null
  }
  if (!found)throw new Error("ไม่พบข้อมูลเรื่องพิจารณา");
  return found
}
function _r56(name) {
  return(name = _s_(name).trim()) === "MainData" ? [_S12,
    _T4,
    _S23,
    _S28,
    _S7,
    _S20,
    _S3,
    _S9,
    _S18,
    _S5,
    _S16,
    _S4,
    _S6]: name === "MeetingLogs" ? [_S38,
    _S34,
    _S12,
    _S35,
    "date",
    _T31,
    _S28,
    "location",
    "attendees",
    "summary",
    _S39,
    "note",
    _T33,
    _T34,
    _S29,
    "meetingGroup",
    _T4,
    _S23,
    _S5,
    _S16,
    _S4,
    _S6]: name === "Letters" ? ["letterId",
    _S12,
    "letterNo",
    "bookNo",
    "agency",
    _S20,
    "issue",
    "letterStatus",
    _S18,
    "officer",
    "opStaff",
    "letterDate",
    "dueDate",
    "extendDate",
    "repliesJSON",
    "repliesJson",
    _S5,
    _S16,
    _S4,
    _S6]: []
}
function _r30(name, includeDeleted) {
  var fields = _r56(name = _s_(name).trim());
  if (!fields.length)throw new Error("MEETING_LETTERS_PROJECTED_READER_UNAVAILABLE:" + name);
  try {
    return _rg(name, fields, {
        includeDeleted: includeDeleted === !0,
        ttl: 120,
        requireCanonical: !1
      }) || []
  } catch (_projectedErr) {
    throw _recordWarning_("ec", _projectedErr),
    new Error("MEETING_LETTERS_PROJECTED_READER_FAILED:" + name + ":" + String(_projectedErr && _projectedErr.message ? _projectedErr.message: _projectedErr))
  }
}
function _r98() {
  return {
    letters: ["letterId",
      _S12,
      "letterNo",
      "bookNo",
      "agency",
      _S20,
      "issue",
      "letterStatus",
      _S18,
      "officer",
      "opStaff",
      "letterDate",
      "dueDate",
      "extendDate",
      "repliesJSON",
      "repliesJson",
      _S5,
      _S4,
      _S6],
    cases: [_S12,
      _T4,
      _S23,
      _S28,
      _S7,
      _S18,
      _S5,
      _S4,
      _S6]
  }
}
function TrackingRepository_() {
  var fields = _r98();
  function projected(sheetName, selectedFields, ttl) {
    try {
      return _rg(sheetName, selectedFields, {
          includeDeleted: !1,
          ttl: ttl || 120
        }) || []
    } catch (_projectedErr) {
      throw _recordWarning_("ec", _projectedErr),
      new Error("TRACKING_PROJECTED_READER_FAILED:" + _s_(sheetName) + ":" + String(_projectedErr && _projectedErr.message ? _projectedErr.message: _projectedErr))
    }
  }
  return {
    repositoryOwner: !0,
    strictErrorMode: !0,
    listLetters: function() {
      return projected(_T30, fields.letters, 120)
    },
    listCases: function() {
      return projected(_S2, fields.cases, 120)
    },
    searchIndex: function(lettersRows, caseMap) {
      return _getLettersSearchIndex_(lettersRows, caseMap)
    }
  }
}
function _r2() {
  return TrackingRepository_().listLetters()
}
function _rt() {
  var out = [];
  function push(row) {
    row = row || {
    };
    try {
      if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(row))return
    } catch (_e) {
      _appIgnore_(_e, "c6.C30:769")
    }
    out.push(row)
  }
  try {
    (_rg(_S0, [_S12,
          _S35,
          "meetingRound",
          "meetingNo",
          "relatedMeetingNo",
          "date",
          _T31,
          "relatedMeetingDate",
          _L12,
          "note",
          _S38,
          _S34,
          _S28,
          _S7,
          _S10,
          _S20,
          "location",
          "attendees",
          "summary",
          _S39,
          _T33,
          "meetingType",
          _L17,
          _T34,
          _S29,
          _S14,
          _L0,
          "meetingGroup",
          _T4,
          _S30,
          _S23,
          _S11,
          _S5,
          _S4,
          _S6], {
          includeDeleted: !1,
          ttl: 120
        }) || []).forEach(push)
  } catch (_logErr) {
    _c30W_("meetingHistory.logs.read", _logErr)
  }
  try {
    var meetings = _rg(_S25, [_S34,
        "id",
        "meetingNo",
        "meetingNumber",
        "no",
        "roundNo",
        _S22,
        "ครั้งประชุม",
        "การประชุมครั้งที่",
        _T31,
        "date",
        _L12,
        "วันประชุม",
        _S28,
        _S18,
        "note",
        _T33,
        "meetingType",
        _L17,
        _T34,
        _S29,
        _S14,
        _L0,
        "meetingGroup",
        _S5,
        _S4,
        _S6], {
        includeDeleted: !1,
        ttl: 120
      }) || [],
    byId = {
    };
    meetings.forEach(function(m) {
        m = m || {
        }; var id = _s_(m.meetingId).trim(); id &&(byId[id] = m)
      }),
    (_rg(_S8, ["itemId",
          "id",
          _S34,
          "agendaNo",
          "seq",
          "agenda",
          _S28,
          _L19,
          _L9,
          _L5,
          _S10,
          "relatedMeetingNo",
          "relatedMeetingDate",
          _S12,
          _T4,
          _S30,
          _S23,
          _S11,
          _S7,
          "agencyOrPresenter",
          _S21,
          "ผู้เสนอ",
          _S39,
          _T29,
          "มติ",
          "note",
          _T33,
          "meetingType",
          _L17,
          _T34,
          _S29,
          _S14,
          _L0,
          "meetingGroup",
          _S5,
          _S4,
          _S6], {
          includeDeleted: !1,
          ttl: 120
        }) || []).forEach(function(item) {
        item = item || {
        }; try {
          if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(item))return
        } catch (_delErr) {
          _appIgnore_(_delErr, "c6.C30:799")
        }
        var meeting = byId[_s_(item.meetingId).trim()] || {
        },
        caseId = _s_(item.caseId).trim(),
        caseNum = _s_(item.caseNum || item.caseNo).trim(),
        recNo = _s_(item.recNo || item.receiveNo).trim(),
        title = _s_(item.caseTitle || item.considerationTitle || item.title || item.ชื่อเรื่อง || item.เรื่อง || item.เรื่องพิจารณา).trim(); if (caseId || caseNum || recNo || title) {
          var sub = _s_(item.subcommitteeName || item.subcommittee || item.คณะอนุกรรมาธิการ || meeting.subcommitteeName || meeting.subcommittee || meeting.คณะอนุกรรมาธิการ || item.meetingGroup || meeting.meetingGroup).trim(),
          ctype = _s_(item.committeeType || item.meetingType || item.ประเภทการประชุม || meeting.committeeType || meeting.meetingType || meeting.ประเภทการประชุม).trim(),
          meetingTitleTypeProbe = _s_(meeting.title || meeting.ชื่อการประชุม).trim(); /อนุกรรมาธิการ/.test([ctype,
              sub,
              meetingTitleTypeProbe].join("")) || sub ? ctype = "คณะอนุกรรมาธิการ": ctype = "คณะกรรมาธิการ"; var round = _s_(item.relatedMeetingNo || item.meetingNo || item.roundNo || item.ครั้งที่ || meeting.meetingNo || meeting.meetingNumber || meeting.roundNo || meeting.ครั้งที่).trim(),
          date = item.relatedMeetingDate || item.meetingDate || item.date || item.วันที่ประชุม || meeting.meetingDate || meeting.date || meeting.วันที่ประชุม || ""; push({
              logId: "CMI-" + String(item.itemId || item.id || item.meetingId || caseId || caseNum || recNo || title).replace(/[^A-Za-z0-9_-]/g,
                "").slice(0, 60),
              meetingId: item.meetingId || "",
              caseId,
              caseNum,
              caseNo: caseNum,
              recNo,
              receiveNo: recNo,
              round,
              meetingNo: round,
              date,
              meetingDate: date,
              title: title || meeting.title || "",
              caseTitle: title || "",
              considerationTitle: title || "",
              note: item.result || item.ผลการประชุม || item.มติ || item.note || item.agencyOrPresenter || meeting.note || "",
              summary: [_s_(item.agendaNo || item.agenda).trim() ? "วาระ" + String(item.agendaNo || item.agenda).trim(): "",
                item.agencyOrPresenter || item.หน่วยงาน || item.ผู้เสนอ || ""].filter(function(v) {
                  return _s_(v).trim()
                }).join("/"),
              result: item.result || item.ผลการประชุม || item.มติ || item.note || "",
              committeeType: ctype,
              meetingType: ctype,
              ประเภทการประชุม: ctype,
              subcommitteeId: item.subcommitteeId || meeting.subcommitteeId || "",
              subcommitteeName: ctype === "คณะอนุกรรมาธิการ" ? sub: "",
              meetingGroup: ctype === "คณะอนุกรรมาธิการ" ? sub || "คณะอนุกรรมาธิการ": _L7,
              updatedAt: item.updatedAt || meeting.updatedAt || ""
            })
        }
      })
  } catch (_agendaErr) {
    _c30W_("meetingHistory.agenda.read", _agendaErr)
  }
  var seen = {
  };
  return out.filter(function(r) {
      var k = [r.logId,
        r.caseId,
        r.caseNum,
        r.recNo,
        r.round,
        r.date,
        r.note,
        r.committeeType,
        r.subcommitteeName].join("|"); return!seen[k] &&(seen[k] = 1, !0)
    })
}
function _rV(value) {
  return _appIsFnName_("_rl") ? _rl(value): _c30S_(value).trim()
}
function _r33(status) {
  if (_appIsFnName_("_ro"))return _ro(status);
  var s = _c30S_(status).replace(/\s+/g, "").trim();
  return s ? s === "ได้รับตอบกลับแล้ว" || s === "ตอบรับแล้ว" ? "ได้รับแล้ว": s: "ยังไม่ได้รับ"
}
function _r128(status) {
  return _appIsFnName_("_r0") ? _r0(status): _r33(status) === "ได้รับแล้ว"
}
function _r116(payload) {
  payload = payload || {
  };
  var todayKey = Utilities.formatDate(new Date, Session.getScriptTimeZone() || "Asia/Bangkok", "yyyy-MM-dd"),
  raw = {
    query: _s_(payload.query || payload.search),
    filterType: String(payload.filterType || payload.type || "all"),
    status: _s_(payload.status),
    opStaff: _s_(payload.opStaff || payload.staff),
    agency: _s_(payload.agency || payload.agencyFilter || payload.agencyName),
    caseId: _s_(payload.caseId),
    sortBy: String(payload.sortBy || "sequence"),
    sortDir: String(payload.sortDir || "asc"),
    page: Math.max(1, Number(payload.page || 1) || 1),
    limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
    date: todayKey,
    release: String((_appIsFnName_("_appRelease_") && _appRelease_() || {
        }).assetStamp ||(_appIsFnName_("_appRelease_") && _appRelease_() || {
        }).stamp || "")
  };
  return "tracking_query_status_filter_v8_" +(_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("letters"): "1") + "_" +(_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1") + "_" + _hashPassword_(JSON.stringify(raw)).substring(0,
    24)
}
function _r99() {
  return "tracking_case_map_current_" +(_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1")
}
function _r120(cases, guardShouldYield, guardMarkPartial) {
  var caseMap = {
  };
  cases = _c30A_(cases) ? cases: [];
  for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {
    if (typeof guardShouldYield == "function" && guardShouldYield(650)) {
      typeof guardMarkPartial == "function" && guardMarkPartial({
          stage: "case-map",
          processedCases: caseIndex,
          totalCases: cases.length
        });
      break
    }
    var r = cases[caseIndex];
    r && !isSoftDeletedRow_(r) &&(caseMap[_s_(r.caseId)] = {
        caseNum: _s_(r.caseNum),
        recNo: _s_(r.recNo),
        title: _s_(r.title || r.caseTitle),
        status: _s_(r.status)
      })
  }
  return caseMap
}
function _r78(trackingRepo, guardShouldYield, guardMarkPartial, forceFresh) {
  var key = _r99(),
  requestHit = _requestScopeGet_("trackingCaseMap", key);
  if (requestHit && typeof requestHit == "object")return requestHit;
  if (forceFresh !== !0 && _appIsFnName_("_cacheGetJson_")) {
    var cached = _cacheGetJson_(key);
    if (cached && cached.map && typeof cached.map == "object")return _requestScopePut_("trackingCaseMap",
      key, cached.map)
  }
  var map = _r120(trackingRepo.listCases(), guardShouldYield, guardMarkPartial);
  if (_appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(key, {
        map
      }, 180)
  } catch (_cacheErr) {
    _recordWarning_("ec", _cacheErr)
  }
  return _requestScopePut_("trackingCaseMap", key, map)
}
function _r124(payload, message, code) {
  payload = payload || {
  };
  var limit = Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
  page;
  return {
    rows: [],
    data: [],
    page: Math.max(1, Number(payload.page || 1) || 1),
    limit,
    totalRecords: 0,
    totalPages: 1,
    generatedAt: new Date().toISOString(),
    cached: !1,
    cacheStatus: "safe-empty",
    serverPaged: !0,
    serverFiltered: !0,
    statusCounts: {
      all: 0,
      received: 0,
      overdue: 0,
      notdue: 0
    },
    maxPageSize: 25,
    contract: "tracking-server-paged-current",
    dataQuality: {
      letterNoSchemaIssues: 0
    },
    filterType: String(payload.filterType || payload.type || "all"),
    sortBy: String(payload.sortBy || "sequence"),
    sortDir: String(payload.sortDir || "asc"),
    warning: _s_(message),
    errorCode: _s_(code)
  }
}
function _r119(row) {
  try {
    var raw = String(row &&(row.repliesJSON || row.repliesJson) || "[]").trim();
    return raw && raw.charAt(0) === "[" ? JSON.parse(raw): []
  } catch (_e) {
    return _recordWarning_("ec", _e),
    []
  }
}
function _trackingDateOnly_(value) {
  return _caseDateOnlyPhaseD2_(value)
}
function _trackingDueDateOnly_(value) {
  return _caseDateOnlyPhaseD2_(value)
}
function _r80(normalized, replies, today) {
  normalized = normalized || {
  },
  replies = _c30A_(replies) ? replies: [];
  for (var i = 0; i < replies.length; i++) {
    var rd = _trackingDateOnly_(replies[i] &&(replies[i].date || replies[i].replyDate || replies[i].receivedDate));
    if (rd)return rd
  }
  return _trackingDateOnly_(normalized.receivedDate || normalized.replyDate || normalized.statusUpdatedAt || normalized.updatedAt || normalized.modifiedAt) || _trackingDateOnly_(today) || null
}
function _r38(value) {
  var text = _rV(value),
  m = _s_(text).match(/\d+/);
  return m ? Number(m[0]): Number.MAX_SAFE_INTEGER
}
function _rW(items) {
  var counts = {
    all: 0,
    received: 0,
    overdue: 0,
    notdue: 0
  };
  return(_c30A_(items) ? items: []).forEach(function(item) {
      counts.all += 1; var key = String(item && item.filterKey || "notdue"); counts[key] ||(counts[key] = 0),
      counts[key] += 1
    }),
  counts
}
function _r18(items, filters) {
  var matchedLetterIds =(filters = filters || {
    }).matchedLetterIds || null,
  query = _s_(filters.query),
  statusFilter = _s_(filters.statusFilter),
  staffFilter = _s_(filters.staffFilter).toLowerCase(),
  agencyFilter = _s_(filters.agencyFilter).toLowerCase(),
  caseIdFilter = _s_(filters.caseIdFilter);
  return(_c30A_(items) ? items: []).filter(function(item) {
      return!(!item || isSoftDeletedRow_(item)) &&(!caseIdFilter || _s_(item.caseId) === caseIdFilter) &&(!statusFilter || _s_(item.letterStatus) === statusFilter || _s_(item.status) === statusFilter) &&(!staffFilter || _s_(item.opStaff || item.officer).toLowerCase().indexOf(staffFilter) !== - 1) &&(!agencyFilter || _s_(item.agency).toLowerCase().indexOf(agencyFilter) !== - 1) && !(query && matchedLetterIds && !matchedLetterIds[_s_(item.letterId)])
    })
}
function _r45(guard) {
  function shouldYield(bufferMs) {
    return!!guard &&(_appIsFn_(guard.shouldYield) ? guard.shouldYield(bufferMs): !!_appIsFn_(guard.timeLeftMs) && guard.timeLeftMs() <= Math.max(Number(bufferMs || 0) || 0,
        1500))
  }
  function markPartial(detail) {
    if (guard) {
      if (_appIsFn_(guard.markPartial))try {
        guard.markPartial(detail || {
          })
      } catch (_markErr) {
        _recordWarning_("tracking.guard.markPartial", _markErr)
      } else if (_appIsFn_(guard.check))try {
        guard.check("partial", detail || {
          })
      } catch (_checkErr) {
        _recordWarning_("tracking.guard.checkPartial", _checkErr)
      }
    }
  }
  return {
    shouldYield,
    markPartial
  }
}
function _r81(query, letterIndex) {
  if (!(query = _s_(query).trim().toLowerCase()))return null;
  var matchedLetterIds = {
  },
  queryTokens = query.split(/[^0-9a-zA-Zก-๙]+/).map(function(x) {
      return _s_(x).trim()
    }).filter(Boolean);
  return(letterIndex || []).forEach(function(entry) {
      if (entry) {
        var hit = _s_(entry.text).indexOf(query) !== - 1; if (!hit && queryTokens.length) {
          var tokenMap = {
          }; (entry.tokens || []).forEach(function(t) {
              tokenMap[t] = 1
            }),
          hit = queryTokens.every(function(t) {
              return tokenMap[t] || _s_(entry.text).indexOf(t) !== - 1
            })
        }
        hit &&(matchedLetterIds[_s_(entry.letterId)] = 1)
      }
    }),
  matchedLetterIds
}
function _rU(rows, caseMap, today, guardApi) {
  var normalizedItems = [];
  rows = _c30A_(rows) ? rows: [];
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    if (guardApi && guardApi.shouldYield && guardApi.shouldYield(650)) {
      guardApi.markPartial && guardApi.markPartial({
          stage: "normalize-letters",
          processedRows: rowIndex,
          totalRows: rows.length
        });
      break
    }
    var r = rows[rowIndex] || {
    },
    normalized = _appIsFnName_("_r7") ? _r7(r): r,
    due = _trackingDueDateOnly_(normalized.extendDate || normalized.dueDate),
    daysLeft = due ? Math.round((due - today) / 864e5): null,
    letterStatus = _r33(normalized.letterStatus || normalized.status || ""),
    received = _r128(letterStatus),
    repliesParsed = _r119(normalized),
    receivedFreezeDate = received ? _r80(normalized, repliesParsed, today): null;
    received && due && receivedFreezeDate &&(daysLeft = Math.round((due - receivedFreezeDate) / 864e5));
    var filterKey = received ? "received": due && daysLeft <= 0 ? "overdue": "notdue",
    caseInfo =(caseMap || {
      })[_s_(normalized.caseId)] || {
      caseNum: "-",
      recNo: "",
      title: "-",
      status: ""
    };
    normalizedItems.push(sanitizeRow_({
          letterId: normalized.letterId || "",
          caseId: normalized.caseId || "",
          caseNum: caseInfo.caseNum,
          recNo: caseInfo.recNo,
          caseTitle: caseInfo.title,
          title: caseInfo.title,
          caseStatus: caseInfo.status,
          letterNo: _rV(normalized.letterNo || normalized.bookNo || ""),
          bookNo: _rV(normalized.bookNo || normalized.letterNo || ""),
          letterNoRaw: normalized.letterNoRaw || "",
          letterNoSchemaIssue: normalized.letterNoSchemaIssue || "",
          agency: normalized.agency || "",
          subject: normalized.subject || normalized.title || "",
          issue: normalized.issue || "",
          daysLeft: daysLeft === null ? "": daysLeft,
          frozenDaysLeft: received && daysLeft !== null ? daysLeft: "",
          stoppedDayCount: received,
          receivedDate: receivedFreezeDate ? Utilities.formatDate(receivedFreezeDate, Session.getScriptTimeZone() || "Asia/Bangkok",
            "yyyy-MM-dd"): "",
          status: letterStatus,
          letterStatus,
          filterKey,
          officer: normalized.officer || normalized.opStaff || "",
          opStaff: normalized.opStaff || normalized.officer || "",
          letterDate: normalized.letterDate || "",
          dueDate: normalized.dueDate || "",
          extendDate: normalized.extendDate || "",
          repliesJSON: normalized.repliesJSON || "[]",
          replies: repliesParsed
        }))
  }
  return normalizedItems
}
function _r32(items, sortBy, sortDir) {
  return(items = _c30A_(items) ? items: []).sort(function(a, b) {
      var av,
      bv; if (sortBy === "caseNum" || sortBy === "sequence" || sortBy === "seq")return(av = _r38(a &&(a.caseNum || a.recNo || a.letterNo))) ===(bv = _r38(b &&(b.caseNum || b.recNo || b.letterNo))) ? _s_(a.caseNum || a.letterNo).localeCompare(_s_(b.caseNum || b.letterNo),
        "th", {
          numeric: !0,
          sensitivity: "base"
        }): sortDir === "desc" ? bv - av: av - bv; if (av = a && a[sortBy], bv = b && b[sortBy], sortBy === "daysLeft" ?(av = Number(av === "" || av == null ? 999999: av),
          bv = Number(bv === "" || bv == null ? 999999: bv)): sortBy === "letterDate" || sortBy === "dueDate" || sortBy === "extendDate" ?(av = av ? new Date(av).getTime(): 0,
          bv = bv ? new Date(bv).getTime(): 0): (av = _c30S_(av).toLowerCase(), bv = _c30S_(bv).toLowerCase()),
        av === bv)return 0; var cmp = av > bv ? 1: - 1; return sortDir === "desc" ? - cmp: cmp
    }),
  items
}
function _r13(items, payload) {
  var trackingPayload = _c30O_({
    }, payload, {
      limit: Math.max(1, Math.min(Number(payload.limit || 25) || 25, 25)),
      page: Math.max(1, Number(payload.page || 1) || 1)
    });
  return _appIsFnName_("_paginateArrayResult_") ? _paginateArrayResult_(items.map(sanitizeRow_), trackingPayload,
    25, 25, {
      source: "tracking-core-server-filtered"
    }): {
    rows: items.map(sanitizeRow_).slice(0, 25),
    totalRecords: items.length,
    page: 1,
    limit: Math.min(items.length, 25),
    totalPages: Math.max(1, Math.ceil(items.length / 25))
  }
}
function _r8(payload) {
  payload = payload || {
  };
  var query = _s_(payload.query || payload.search).trim().toLowerCase(),
  rawType = String(payload.filterType || payload.type || payload.statusType || "all").replace(/[ ​-‍﻿]/g,
    "").trim().toLowerCase(),
  compact = rawType.replace(/[\s_\-\/]+/g, ""),
  thai = _s_(payload.filterType || payload.type).replace(/\s+/g, ""),
  typeFilter = "all";
  rawType && compact !== "all" && thai !== "หนังสือทั้งหมด" ? compact === "received" || compact === "done" || compact === "reply" || compact === "replied" || thai.indexOf("ตอบรับ") > - 1 || thai.indexOf(_L21) > - 1 ? typeFilter = "received": compact === "overdue" || compact === "due" || compact === "late" || compact === "expired" || compact === "ครบเลยกำหนด" || thai.indexOf("เลยกำหนด") > - 1 || thai.indexOf("ครบกำหนด") > - 1 ? typeFilter = "overdue": (compact === "notdue" || compact === "notyetdue" || compact === "pending" || compact === "soon" || compact === "ยังไม่ครบกำหนด" || compact === "ไม่ครบกำหนด" || thai.indexOf("ไม่ครบกำหนด") > - 1) &&(typeFilter = "notdue"): typeFilter = "all";
  var sortBy = String(payload.sortBy || "sequence").trim(),
  allowedSorts;
  return {
    sequence: !0,
    seq: !0,
    caseNum: !0,
    letterNo: !0,
    letterDate: !0,
    dueDate: !0,
    extendDate: !0,
    daysLeft: !0,
    agency: !0,
    opStaff: !0,
    status: !0,
    letterStatus: !0
  }
  [sortBy] ||(sortBy = "sequence"),
  {
    query,
    typeFilter,
    statusFilter: _s_(payload.status).trim(),
    staffFilter: _s_(payload.opStaff || payload.staff).trim().toLowerCase(),
    agencyFilter: _s_(payload.agency || payload.agencyFilter || payload.agencyName).trim().toLowerCase(),
    caseIdFilter: _s_(payload.caseId).trim(),
    sortBy,
    sortDir: String(payload.sortDir || "asc").trim().toLowerCase() === "desc" ? "desc": "asc"
  }
}
function _r107(cacheKey) {
  if (!_appIsFnName_("_cacheGetJson_"))return null;
  var cachedTracking = _cacheGetJson_(cacheKey);
  return cachedTracking && _c30A_(cachedTracking.rows) && cachedTracking.serverPaged === !0 && cachedTracking.serverFiltered === !0 && cachedTracking.contract === "tracking-server-paged-current" && cachedTracking.rows.length <= 25 && Number(cachedTracking.limit || 25) <= 25 ?(cachedTracking.cached = !0,
    cachedTracking.cacheStatus = "hit", cachedTracking): null
}
function _r67(payload, guardApi) {
  var opts = _r8(payload = payload || {
    }),
  trackingRepo = TrackingRepository_(),
  rows = trackingRepo.listLetters(),
  caseMap = _r78(trackingRepo, guardApi && guardApi.shouldYield, guardApi && guardApi.markPartial, payload.forceFresh === !0),
  today = new Date;
  today.setHours(0, 0, 0, 0);
  var matchedLetterIds = _r81(opts.query, trackingRepo.searchIndex(rows, caseMap)),
  normalizedItems = _rU(rows, caseMap, today, guardApi || {
    }),
  baseItems = _r18(normalizedItems, {
      query: opts.query,
      matchedLetterIds,
      statusFilter: opts.statusFilter,
      staffFilter: opts.staffFilter,
      agencyFilter: opts.agencyFilter,
      caseIdFilter: opts.caseIdFilter
    }),
  statusCounts = _rW(baseItems),
  items = baseItems.filter(function(item) {
      return!opts.typeFilter || opts.typeFilter === "all" || _s_(item.filterKey) === opts.typeFilter
    });
  return items = _r32(items, opts.sortBy, opts.sortDir),
  {
    opts,
    rows,
    normalizedItems,
    baseItems,
    items,
    paged: _r13(items, payload),
    statusCounts
  }
}
function _r24(payload, result, cacheKey, guard) {
  var opts =(result = result || {
    }).opts || _r8(payload || {
    }),
  baseItems = _c30A_(result.baseItems) ? result.baseItems: [],
  paged = result.paged || {
  },
  generatedAt = new Date().toISOString(),
  out = _c30O_({
    }, paged, {
      generatedAt,
      cached: !1,
      cacheStatus: "miss",
      serverPaged: !0,
      serverFiltered: !0,
      statusCounts: result.statusCounts || _rW(baseItems),
      maxPageSize: 25,
      contract: "tracking-server-paged-current",
      contractEnvelope: "rows-totalRecords-page-limit-meta-current",
      meta: {
        source: "tracking-core-server-filtered",
        generatedAt,
        filterType: opts.typeFilter || "all",
        sortBy: opts.sortBy,
        sortDir: opts.sortDir
      },
      dataQuality: {
        letterNoSchemaIssues: baseItems.filter(function(x) {
            return!(!x || !x.letterNoSchemaIssue)
          }).length
      },
      filterType: opts.typeFilter || "all",
      sortBy: opts.sortBy,
      sortDir: opts.sortDir,
      partial: !!(guard && guard.report && guard.report().yielded),
      warning: guard && guard.report && guard.report().yielded ? "PARTIAL_RESULT_TIMEOUT_GUARD": ""
    });
  return guard && _appIsFnName_("_r92") &&(out = _r92(out, guard, {
        rowsRead: (result.rows || []).length,
        normalizedRows: (result.normalizedItems || []).length
      })),
  _appIsFnName_("_noteResponseBudget_") &&(out.responseBudget = _noteResponseBudget_("apiGetTracking",
      out)),
  out
}
function _r110(payload) {
  payload = payload || {
  };
  var guard = typeof createExecutionGuard_ == "function" ? createExecutionGuard_({
      label: "_r110",
      route: "apiGetTracking",
      maxMs: Number(payload.hardLimitMs || 28e3) || 28e3,
      warningMs: Number(payload.softLimitMs || 24e3) || 24e3
    }): null,
  guardApi = _r45(guard);
  try {
    var cacheTtlSeconds = Math.max(10, Math.min(Number(payload.cacheTtlSeconds || 45) || 45, 180)),
    cacheKey = _r116(payload);
    if (payload.forceFresh !== !0) {
      var cachedTracking = _r107(cacheKey);
      if (cachedTracking)return ok_(cachedTracking, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
    }
    var pageData,
    out = _r24(payload, _r67(payload, guardApi), cacheKey, guard);
    return _appIsFnName_("_cachePutJson_") && _cachePutJson_(cacheKey, out, cacheTtlSeconds),
    ok_(out, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
  } catch (e) {
    _recordWarning_("ec", e);
    var userMessage = _appIsFnName_("_aiUserFacingError_") ? _aiUserFacingError_(e): e && e.message ? e.message: String(e);
    try {
      typeof logAudit_ == "function" && logAudit_("tracking.strict_error", {
          message: _s_(userMessage).substring(0, 240)
        })
    } catch (_auditErr) {
      _recordWarning_("ec", _auditErr)
    }
    var empty = _r124(payload, userMessage, "TRACKING_PROJECTED_READER_REQUIRED");
    return empty.partial = !0,
    empty.cacheStatus = "error",
    empty.strictErrorMode = !0,
    err_("โหลดข้อมูลติดตามหนังสือไม่สำเร็จ:" + userMessage, empty)
  }
}
function _r23(caseId) {
  try {
    getCanonicalHeaderAudit_(_T30);
    var aliases = _rx(caseId),
    idMap = {
    };
    if ((aliases.ids || []).forEach(function(id) {
          idMap[String(id)] = !0
        }), !Object.keys(idMap).length && caseId && typeof caseId == "object") {
      var rawCaseId = _s_(caseId.caseId || caseId.id).trim();
      rawCaseId &&(idMap[rawCaseId] = !0)
    }
    var targetTitle = _rd(aliases.case &&(aliases.case.title || aliases.case.caseTitle) || caseId &&(caseId.title || caseId.caseTitle) || ""),
    allLetters = _r2(),
    rows = allLetters.filter(function(r) {
        return!!idMap[_s_(r.caseId)] && !isSoftDeletedRow_(r)
      });
    return!rows.length && targetTitle &&(rows = allLetters.filter(function(r) {
          if (!r || isSoftDeletedRow_(r))return!1; var titleHit = _rd(r.subject || r.issue || "") || ""; return!!titleHit &&(titleHit.indexOf(targetTitle) > - 1 || targetTitle.indexOf(titleHit) > - 1)
        })),
    Object.keys(idMap).length || rows.length ?(rows = _rL(rows, _r46)).map(function(r) {
        var normalized = _r7(r),
        parsedReplies = []; try {
          var repliesJson = normalized.repliesJSON || "[]"; repliesJson && String(repliesJson).trim().startsWith("[") &&(parsedReplies = JSON.parse(repliesJson))
        } catch (e) {
          _recordWarning_("ec", e)
        }
        return normalized.replies = parsedReplies,
        normalized
      }).sort(function(a, b) {
        var av = _s_(a.letterDate || a.dueDate),
        bv = _s_(b.letterDate || b.dueDate); return av === bv ? _s_(b.letterId).localeCompare(_s_(a.letterId),
          "th"): av > bv ? - 1: 1
      }): []
  } catch (e) {
    throw _recordWarning_("ec", e),
    logAudit_("letters.strict_error", {
        error: String(e && e.message ? e.message: e)
      }),
    e
  }
}
function _rJ(caseId) {
  try {
    var aliases = _rx(caseId),
    idMap = {
    };
    if ((aliases.ids || []).forEach(function(id) {
          idMap[String(id)] = !0
        }), !Object.keys(idMap).length && caseId && typeof caseId == "object") {
      var rawCaseId = _s_(caseId.caseId || caseId.id).trim();
      rawCaseId &&(idMap[rawCaseId] = !0)
    }
    var targetTitle = _rd(aliases.case &&(aliases.case.title || aliases.case.caseTitle) || caseId &&(caseId.title || caseId.caseTitle) || ""),
    allLogs = _rt(),
    rows = allLogs.filter(function(r) {
        return!!idMap[_s_(r.caseId)] && !isSoftDeletedRow_(r)
      });
    if (!rows.length && targetTitle &&(rows = allLogs.filter(function(r) {
            if (!r || isSoftDeletedRow_(r))return!1; var rowTitle = _rd(r.title || r.caseTitle || r.summary || r.note || ""); return!!rowTitle &&(rowTitle.indexOf(targetTitle) > - 1 || targetTitle.indexOf(rowTitle) > - 1)
          })), !rows.length && aliases && aliases.case) {
      var caseNum = _rd(aliases.case.caseNum || caseId && caseId.caseNum || ""),
      recNo = _rd(aliases.case.recNo || caseId && caseId.recNo || "");
      rows = allLogs.filter(function(r) {
          if (!r || isSoftDeletedRow_(r))return!1; var rowCaseNum = _rd(r.caseNum || ""),
          rowRecNo = _rd(r.recNo || ""); return!!caseNum && rowCaseNum === caseNum || !!recNo && rowRecNo === recNo
        })
    }
    return Object.keys(idMap).length || rows.length ?(rows = _rL(rows, _r89)).map(function(r) {
        return _normalizeMeetingLogRow_(r)
      }).sort(function(a, b) {
        var av = _s_(a.dateRaw),
        bv = _s_(b.dateRaw); return av === bv ? _s_(a.round).localeCompare(_s_(b.round), "th"): av > bv ? - 1: 1
      }): []
  } catch (e) {
    throw _recordWarning_("ec", e),
    logAudit_("meeting_history.strict_error", {
        error: String(e && e.message ? e.message: e)
      }),
    e
  }
}
function deleteLetter(payload) {
  var input;
  return domainWrite_("deleteLetter", payload && typeof payload == "object" ? payload: {
      letterId: payload
    }, function(req) {
      var letterId = String(_payloadValue_(req, ["letterId",
            "id"]) || "").trim(); if (!letterId)throw new Error("ไม่พบรหัสหนังสือติดตามที่ต้องการลบ"); var res = getCanonicalRepository_("letters.main").softDelete(letterId,
        {
          isDeleted: !0,
          deletedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }),
      cacheInvalidation = _appIsFnName_("_invalidateLettersDerivedCaches_") ? _invalidateLettersDerivedCaches_("deleteLetter"): {
      }; return ok_({
          letterId,
          cacheInvalidation,
          result: res
        }, "ลบหนังสือติดตามสำเร็จ")
    })
}
function _fetchAllLettersWithCaseInfoImpl_(payload) {
  payload = payload || {
  };
  var allCases = _rL(_r30(_S2, !1), _r125),
  caseMap = {
  };
  allCases.forEach(function(row) {
      if (row && !isSoftDeletedRow_(row)) {
        var id = _s_(row.caseId).trim(); id &&(caseMap[id] = row)
      }
    });
  var letters = _rL(_r30(_T30, !1), _r46).filter(function(row) {
      return row && !isSoftDeletedRow_(row)
    }).map(function(row) {
      var normalized = _r7(row),
      owner = caseMap[_s_(normalized.caseId).trim()] || _findCaseByIdentity_({
          caseId: normalized.caseId,
          title: normalized.subject,
          caseTitle: normalized.issue
        }); owner &&(normalized.caseNum = _s_(owner.caseNum), normalized.recNo = _s_(owner.recNo), normalized.caseTitle = _s_(owner.caseTitle || owner.title),
        normalized.title = _s_(owner.title || owner.caseTitle), normalized.petitioners = _s_(owner.petitioners || owner.petitionerName),
        normalized.assignees = _s_(owner.assignees), normalized.status = _s_(owner.status)); try {
        var repliesJson = normalized.repliesJSON || "[]"; normalized.replies = repliesJson && String(repliesJson).trim().charAt(0) === "[" ? JSON.parse(repliesJson): []
      } catch (_e) {
        _recordWarning_("ec", _e),
        normalized.replies = []
      }
      return normalized
    }),
  filterType = String(payload.filterType || payload.type || "all").trim();
  if (filterType === "received")letters = letters.filter(function(row) {
      return _s_(row.letterStatus).trim() === "ได้รับแล้ว" || _s_(row.letterStatus).trim() === "ได้รับตอบกลับแล้ว"
    });
  else if (filterType === "overdue" || filterType === "notdue") {
    var today = new Date;
    today.setHours(0, 0, 0, 0),
    letters = letters.filter(function(row) {
        var status = _s_(row.letterStatus).trim(); if (status === "ได้รับแล้ว" || status === "ได้รับตอบกลับแล้ว")return!1; var target = row.extendDate || row.dueDate; if (!target)return filterType === "notdue"; var d = _trackingDueDateOnly_(target); return d ? filterType === "overdue" ? today >= d: today < d: filterType === "notdue"
      })
  }
  return letters.sort(function(a, b) {
      var av = _s_(a.letterDate || a.dueDate),
      bv = _s_(b.letterDate || b.dueDate); return av === bv ? _s_(a.caseNum).localeCompare(_s_(b.caseNum),
        "th"): av > bv ? - 1: 1
    }),
  ok_(letters, "โหลดหนังสือติดตามพร้อมข้อมูลเรื่องสำเร็จ")
}

/**
 * Meeting-history write helpers.
 *
 * These helpers are intentionally stateless so saveMeetingLog keeps one
 * transaction path while avoiding a large set of nested utility functions.
 */
function _meetingSaveText_(value) {
  return _c30S_(value).replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, "").trim()
}
function _meetingSaveNorm_(value) {
  return _meetingSaveText_(value).toLowerCase().replace(/[\s_\-\/().:]+/g, "")
}
function _meetingSaveUnique_(list) {
  var out = [],
  seen = {
  };
  return(_c30A_(list) ? list: []).forEach(function(value) {
      value = _meetingSaveText_(value),
      value && !seen[value] &&(seen[value] = !0, out.push(value))
    }),
  out
}
function _meetingSaveAliases_(domain, field, fallback) {
  var list = [];
  try {
    if (typeof AppBackendCore != "undefined" && AppBackendCore.getFieldAliases)list = AppBackendCore.getFieldAliases(domain,
      field) || [];
    else if (typeof AppBackendCore != "undefined" && AppBackendCore.FIELD_MAP) {
      var domains = AppBackendCore.FIELD_MAP.domains || {
      },
      spec = domains[domain] || {
      },
      fields = spec.fields || {
      },
      item = fields[field] || {
      };
      list = item.aliases || []
    }
  } catch (err) {
    _c30W_("meeting.saveLog.alias", err, {
        domain: domain,
        field: field
      })
  }
  return _meetingSaveUnique_((_c30A_(list) ? list: []).concat(_c30A_(fallback) ? fallback: [field]))
}
function _meetingSavePick_(scopes, keys) {
  scopes = _c30A_(scopes) ? scopes: [scopes],
  keys = _meetingSaveUnique_(_c30A_(keys) ? keys: [keys]);
  for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex++)for (var obj = scopes[scopeIndex] || {
    }, keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    var key = keys[keyIndex];
    if (_c30H_(obj, key) && obj[key] != null && String(obj[key]).trim() !== "")return obj[key]
  }
  return ""
}
function _meetingSaveHashKey_(parts) {
  for (var raw = parts.map(_meetingSaveText_).join("|").toLowerCase(), hash = 2166136261, i = 0; i < raw.length; i++)hash^=raw.charCodeAt(i),
  hash +=(hash << 1) +(hash << 4) +(hash << 7) +(hash << 8) +(hash << 24);
  return(hash >>> 0).toString(36).toUpperCase()
}
function _meetingEnsureLogSheet_() {
  var requiredHeaders = [_S12,
    _S35,
    "date",
    "note",
    _S38,
    _S34,
    _T31,
    _S28,
    "location",
    "attendees",
    "summary",
    _S39,
    _T33,
    _T34,
    _S29,
    "meetingGroup",
    _S16,
    _S5,
    _S4,
    _S6,
    _T4,
    _S30,
    _S23,
    _S11,
    "phase2BusinessKey"],
  spreadsheet = getSpreadsheet_(),
  sheet = spreadsheet.getSheetByName(_S0);
  return sheet ||(sheet = spreadsheet.insertSheet(_S0), sheet.getRange(1, 1, 1,
      requiredHeaders.length).setValues([requiredHeaders])),
  requiredHeaders.forEach(function(header) {
      _appIsFnName_("ensureHeaderColumn_") && ensureHeaderColumn_(_S0, header)
    }),
  getSheet_(_S0)
}
function _meetingInvalidateAfterLogWrite_(rowNumber) {
  if (_appIsFnName_("_afterSheetWrite_"))try {
    _afterSheetWrite_(_S0, {
        operation: "saveMeetingLog",
        rows: 1,
        row: rowNumber,
        owner: "phase2.meetingHistory.singleSavePath"
      })
  } catch (err) {
    _c30W_("meeting.saveLog.phase2.afterWrite", err, {
        row: rowNumber
      })
  }
  if (_appIsFnName_("_invalidateMeetingDerivedCaches_"))try {
    _invalidateMeetingDerivedCaches_("saveMeetingLog.phase2")
  } catch (err2) {
    _c30W_("meeting.saveLog.phase2.invalidate", err2, {
        row: rowNumber
      })
  }
  else if (typeof invalidateSheetCache_ == "function")try {
    invalidateSheetCache_(_S0)
  } catch (err3) {
    _c30W_("meeting.saveLog.phase2.invalidateSheet", err3, {
        row: rowNumber
      })
  }
  if (_appIsFnName_("_invalidateCaseDerivedCaches_"))try {
    _invalidateCaseDerivedCaches_("saveMeetingLog.phase3.reportReadModel")
  } catch (err4) {
    _c30W_("meeting.saveLog.phase3.invalidateCaseReport", err4, {
        row: rowNumber
      })
  }
}

function saveMeetingLog(p) {
  return domainWrite_("saveMeetingLog", p, function(input) {
      input = input && typeof input == "object" ? input: {
      }; var now = new Date().toISOString(),
      lock = null,
      locked = !1,
      text = _meetingSaveText_,
      norm = _meetingSaveNorm_,
      unique = _meetingSaveUnique_,
      aliases = _meetingSaveAliases_,
      pick = _meetingSavePick_,
      hashKey = _meetingSaveHashKey_,
      ensureSheet = _meetingEnsureLogSheet_,
      invalidateAfterWrite = _meetingInvalidateAfterLogWrite_;                         var casePayload = input.caseIdentity && typeof input.caseIdentity == "object" ? input.caseIdentity: input.case && typeof input.case == "object" ? input.case: {
      },
      logPayload = input.log && typeof input.log == "object" ? input.log: input.meetingLog && typeof input.meetingLog == "object" ? input.meetingLog: input.history && typeof input.history == "object" ? input.history: {
      };       function caseVal(field, extra) {
        return text(pick([casePayload,
              input,
              logPayload], aliases(_T48, field, extra || [field])))
      }
      function logVal(field, extra) {
        return text(pick([logPayload,
              input,
              casePayload], aliases(_S13, field, extra || [field])))
      }
                        try {
        let col2 = function(names) {
          names = unique(_c30A_(names) ? names: [names]); for (var n = 0; n < names.length; n++)for (var want = norm(names[n]),
            c = 0; c < headers.length; c++)if (norm(headers[c]) === want)return c; return - 1
        },
        cell2 = function(row3, names) {
          var idx = col2(names); return idx >= 0 ? text(row3[idx]): ""
        },
        rowDeleted2 = function(row3) {
          return cDel >= 0 && /^true|1|yes|deleted$/i.test(text(row3[cDel])) || cDeletedAt >= 0 && !!text(row3[cDeletedAt])
        },
        sameBusiness2 = function(row3) {
          if (cBusiness >= 0 && text(row3[cBusiness]) && text(row3[cBusiness]) === businessKey)return!0; var rowCaseId = cell2(row3,
            aliases(_S13, _S12, [_S12])),
          sameCaseId = rowCaseId && rowCaseId === caseId,
          sameCaseNum = caseNum && cell2(row3, aliases(_S13, _T4, [_T4,
                _S30,
                _S24,
                "orderNo",
                _L6])) === caseNum,
          sameRecNo = recNo && cell2(row3, aliases(_S13, _S23, [_S23,
                _S11,
                "receiptNo",
                _L4,
                _S15])) === recNo,
          sameTitle = title && cell2(row3, aliases(_S13, _S28, [_S28,
                _S7,
                _S20,
                _L19,
                _L9])) === title,
          identityScore =(sameCaseNum ? 1: 0) +(sameRecNo ? 1: 0) +(sameTitle ? 1: 0),
          sameCase = sameCaseId || identityScore > 0,
          sameRound = !round || cell2(row3, aliases(_S13, _S35, [_S35,
                "meetingRound",
                "meetingNo",
                _S22,
                "ครั้งที่ประชุม"])) === round,
          sameDate = !date || cell2(row3, aliases(_S13, "date", ["date",
                _T31,
                _L12])) === date,
          rowType = cell2(row3, [_T33,
              "meetingType",
              _L17]),
          sameType = !rowType || rowType === committeeType,
          rowSub = cell2(row3, [_S29,
              _S14,
              _L0,
              "meetingGroup"]),
          sameSub = committeeType !== "คณะอนุกรรมาธิการ" || rowSub === subcommitteeName; return sameCase && sameRound && sameDate && sameType && sameSub
        },
        setCol2 = function(names, value) {
          names = unique(_c30A_(names) ? names: [names]); for (var i = 0; i < names.length; i++) {
            var idx = col2(names[i]); idx >= 0 &&(out[idx] = value)
          }
        }; var col = col2,
        cell = cell2,
        rowDeleted = rowDeleted2,
        sameBusiness = sameBusiness2,
        setCol = setCol2; if (typeof LockService != "undefined" && LockService.getDocumentLock &&(lock = LockService.getDocumentLock(),
            locked = lock && lock.tryLock ? lock.tryLock(15e3): !1, lock && !locked))throw new Error("ระบบกำลังบันทึกประวัติการประชุมจากคำสั่งก่อนหน้า กรุณาลองอีกครั้ง"); var caseSeed = {
          caseId: caseVal(_S12, [_S12,
              "id",
              "case_id"]),
          caseNum: caseVal(_T4, [_T4,
              _S30,
              _S24,
              "orderNo",
              "seq",
              "no",
              _L6,
              "ลำดับ",
              _T51,
              "เลขลำดับ"]),
          recNo: caseVal(_S23, [_S23,
              _S11,
              "receiptNo",
              _L4,
              _S15]),
          title: caseVal(_S28, [_S28,
              _S7,
              _S20,
              _L19,
              _L9]),
          caseTitle: caseVal(_S7, [_S7,
              _S28,
              _S20,
              _L19,
              _L9]),
          petitioners: caseVal(_S3, [_S3,
              _T53,
              _S9,
              _L1,
              _L24])
        },
        resolved = null; try {
          resolved = _rx(caseSeed) || {
          }
        } catch (_resolveErr) {
          _c30W_("meeting.saveLog.phase2.resolveCase", _resolveErr, caseSeed)
        }
        var caseInfo = resolved && resolved.case || {
        },
        realCaseId = text(caseSeed.caseId || caseInfo.caseId || caseInfo.id || ""),
        caseNum = text(caseSeed.caseNum || caseInfo.caseNum || caseInfo.caseNo || caseInfo.runningNo || caseInfo.orderNo || ""),
        recNo = text(caseSeed.recNo || caseInfo.recNo || caseInfo.receiveNo || caseInfo.receiptNo || ""),
        title = text(caseSeed.title || caseSeed.caseTitle || caseInfo.title || caseInfo.caseTitle || caseInfo.subject || ""),
        petitioners = text(caseSeed.petitioners || caseInfo.petitioners || caseInfo.petitionerName || caseInfo.petitioner || ""); if (!realCaseId && !caseNum && !recNo && !title)throw new Error("ไม่พบข้อมูลอ้างอิงเรื่องพิจารณา กรุณาเลือกเรื่องก่อนบันทึกประวัติการประชุม"); var syntheticCaseId = !realCaseId,
        caseId = realCaseId || "CASE-IDENTITY-" + hashKey([caseNum,
            recNo,
            title,
            petitioners]),
        round = logVal(_S35, [_S35,
            "newRound",
            "meetingRound",
            "meetingNo",
            "roundNo",
            _S22,
            "ครั้งที่ประชุม"]),
        date = logVal("date", ["date",
            "newDate",
            _T31,
            "meetingDateText",
            _L12]),
        note = logVal(_S39, ["note",
            "newNote",
            _S39,
            "summary",
            "decision",
            "มติ",
            _L20,
            _T29]); if (!round && !date && !note)throw new Error("กรุณากรอกข้อมูลประวัติการประชุม"); var committeeType = logVal(_T33,
          [_T33,
            "meetingType",
            "committeeKind",
            _L17]) || text(input.committeeType || input.meetingType || "") || _L7,
        subcommitteeId = logVal(_T34, [_T34,
            "subCommitteeId"]),
        subcommitteeName = logVal(_S29, _r9); if (committeeType !== "คณะอนุกรรมาธิการ")subcommitteeId = "",
        subcommitteeName = ""; else if (!subcommitteeName && subcommitteeId &&(subcommitteeName = subcommitteeId),
          !subcommitteeId && subcommitteeName &&(subcommitteeId = subcommitteeName), !subcommitteeName)throw new Error("กรุณาเลือกคณะอนุกรรมาธิการ"); var meetingGroup = committeeType === "คณะอนุกรรมาธิการ" ? subcommitteeName: committeeType,
        businessKey = [caseId,
          caseNum,
          recNo,
          title,
          round,
          date,
          committeeType,
          subcommitteeName].map(text).join("|"),
        logId = text(pick([logPayload,
              input], [_S38,
              "currentLogId",
              "meetingLogId"])); logId ||(logId = "LOGH-" + hashKey([businessKey,
              note])); for (var rowObj = {
            caseId,
            caseNum,
            caseNo: caseNum,
            recNo,
            receiveNo: recNo,
            round,
            meetingRound: round,
            meetingNo: round,
            date,
            meetingDate: date,
            note,
            logId,
            id: logId,
            meetingLogId: logId,
            meetingId: logVal(_S34, [_S34]),
            title,
            caseTitle: title,
            subject: title,
            location: logVal("location", ["location",
                "meetingLocation",
                "สถานที่ประชุม"]),
            attendees: logVal("attendees", ["attendees",
                "participants",
                "ผู้เข้าร่วมประชุม"]),
            summary: logVal("summary", ["summary"]) || note,
            result: logVal(_S39, [_S39]) || note,
            committeeType,
            meetingType: committeeType,
            subcommitteeId,
            subcommitteeName,
            subcommittee: subcommitteeName,
            meetingGroup,
            phase2BusinessKey: businessKey,
            updatedAt: now,
            isDeleted: !1,
            deletedAt: ""
          }, sh = ensureSheet(), width = Math.max(sh.getLastColumn(), 1), lastRow = Math.max(sh.getLastRow(),
            1), values = sh.getRange(1, 1, lastRow, width).getValues(), headers =(values[0] || []).map(function(h) {
              return text(h)
            }), cLog = col2(aliases(_S13, _S38, [_S38,
                "meetingLogId",
                "id"])), cBusiness = col2(["phase2BusinessKey"]), cDel = col2([_S4,
              "deleted"]), cDeletedAt = col2([_S6]), targetRow = - 1, r = 1; r < values.length; r++) {
          var row = values[r] || []; if (!rowDeleted2(row) && cLog >= 0 && text(row[cLog]) && text(row[cLog]) === logId) {
            targetRow = r + 1; break
          }
        }
        if (targetRow < 0)for (var rr = 1; rr < values.length; rr++) {
          var row2 = values[rr] || []; if (!rowDeleted2(row2) && sameBusiness2(row2)) {
            targetRow = rr + 1; var existingId = cLog >= 0 ? text(row2[cLog]): ""; existingId &&(rowObj.logId = rowObj.id = rowObj.meetingLogId = logId = existingId); break
          }
        }
        var cCreated = col2([_S16]),
        existingCreated = ""; targetRow > 1 && cCreated >= 0 &&(existingCreated = values[targetRow - 1] && values[targetRow - 1][cCreated] || ""),
        rowObj.createdAt = existingCreated || now; var isCreate = targetRow < 1; isCreate &&(targetRow = Math.max(sh.getLastRow(),
            1) + 1); for (var out = targetRow > 1 && values[targetRow - 1] ? values[targetRow - 1].slice(0,
            width): []; out.length < width; )out.push(""); return setCol2(aliases(_S13, _S12, [_S12]),
          rowObj.caseId),
        setCol2(aliases(_S13, _T4, [_T4,
              _S30,
              _S24,
              "orderNo",
              _L6]), rowObj.caseNum),
        setCol2(aliases(_S13, _S23, [_S23,
              _S11,
              "receiptNo",
              _L4,
              _S15]), rowObj.recNo),
        setCol2(aliases(_S13, _S35, [_S35,
              "meetingRound",
              "meetingNo",
              _S22,
              "ครั้งที่ประชุม"]), rowObj.round),
        setCol2(aliases(_S13, "date", ["date",
              _T31,
              _L12]), rowObj.date),
        setCol2(["note",
            "newNote",
            "มติ",
            _L20,
            _T29], rowObj.note),
        setCol2(["summary"], rowObj.summary),
        setCol2([_S39], rowObj.result),
        setCol2(aliases(_S13, _S38, [_S38,
              "meetingLogId",
              "id"]), rowObj.logId),
        setCol2([_S34], rowObj.meetingId),
        setCol2(aliases(_S13, _S28, [_S28,
              _S7,
              _S20,
              _L19,
              _L9]), rowObj.title),
        setCol2(["location",
            "meetingLocation",
            "สถานที่ประชุม"], rowObj.location),
        setCol2(["attendees",
            "participants",
            "ผู้เข้าร่วมประชุม"], rowObj.attendees),
        setCol2([_T33,
            "meetingType",
            _L17], rowObj.committeeType),
        setCol2([_T34,
            "subCommitteeId"], rowObj.subcommitteeId),
        setCol2(_r9, rowObj.subcommitteeName),
        setCol2(["meetingGroup"], rowObj.meetingGroup),
        setCol2(["phase2BusinessKey"], rowObj.phase2BusinessKey),
        setCol2([_S16], rowObj.createdAt),
        setCol2([_S5], rowObj.updatedAt),
        setCol2([_S4,
            "deleted"], rowObj.isDeleted),
        setCol2([_S6], rowObj.deletedAt),
        sh.getRange(targetRow, 1, 1, out.length).setValues([out]),
        invalidateAfterWrite(targetRow),
        ok_({
            logId,
            caseId,
            syntheticCaseId,
            rowNumber: targetRow,
            mode: isCreate ? "create": "update",
            source: "MeetingLogs.phase2.single-save-path",
            phase2BusinessKey: businessKey
          }, _T2)
      } finally {
        try {
          lock && locked && lock.releaseLock && lock.releaseLock()
        } catch (_releaseErr) {
          _c30W_("meeting.saveLog.phase2.releaseLock", _releaseErr)
        }
      }
    }, _T2, _T1)
}
function deleteMeetingLog(payload) {
  var input;
  return domainWrite_("deleteMeetingLog", payload && typeof payload == "object" ? payload: {
      logId: payload
    }, function(req) {
      var logId = String(_payloadValue_(req, [_S38,
            "id",
            "rowId",
            "meetingLogId"]) || "").trim(); if (!logId)throw new Error("ไม่พบรหัสประวัติการประชุมที่ต้องการลบ"); var now = new Date().toISOString(),
      repo = getCanonicalRepository_("meeting.logs"),
      res = null; try {
        res = repo.softDelete(logId, {
            isDeleted: !0,
            deletedAt: now,
            updatedAt: now
          })
      } catch (_repoDeleteErr) {
        _c30W_("meeting.delete.repo", _repoDeleteErr, {
            logId
          })
      }
      var okDeleted = !(!res || res.ok === !1 && !res.deleted && !res.mode); if (!okDeleted)try {
        var sh = typeof AppRepository != "undefined" && AppRepository.getSheet ? AppRepository.getSheet(_S0): typeof getSheet_ == "function" ? getSheet_(_S0): null; if (sh) {
          let readMeetingLogMatrix_2 = function() {
            return typeof AppRepository != "undefined" && AppRepository.readMatrix ? AppRepository.readMatrix(_S0): typeof getSheetMatrix_ == "function" ? getSheetMatrix_(sh): []
          }; var readMeetingLogMatrix_ = readMeetingLogMatrix_2,
          values = readMeetingLogMatrix_2(); if (values.length > 1) {
            let col2 = function(names) {
              for (var i = 0; i < names.length; i++) {
                var j = head.indexOf(names[i]); if (j >= 0)return j
              }
              return - 1
            }; var col = col2,
            head = values[0].map(function(h) {
                return _s_(h).trim()
              }),
            cLog = col2([_S38,
                "id",
                "rowId",
                "meetingLogId"]),
            cCase = col2([_S12]),
            cRound = col2([_S35,
                "meetingNo",
                _S22]),
            cDate = col2(["date",
                _T31,
                _L12]),
            cDel = col2([_S4]); cDel < 0 && _appIsFnName_("ensureHeaderColumn_") &&(ensureHeaderColumn_(_S0,
                _S4), values = readMeetingLogMatrix_2(), cDel =(head = values[0].map(function(h) {
                    return _s_(h).trim()
                  })).indexOf(_S4)); var cDeletedAt = col2([_S6]); cDeletedAt < 0 && _appIsFnName_("ensureHeaderColumn_") &&(ensureHeaderColumn_(_S0,
                _S6), values = readMeetingLogMatrix_2(), cDeletedAt =(head = values[0].map(function(h) {
                    return _s_(h).trim()
                  })).indexOf(_S6)); var cUpdated = col2([_S5]); cUpdated < 0 && _appIsFnName_("ensureHeaderColumn_") &&(ensureHeaderColumn_(_S0,
                _S5), values = readMeetingLogMatrix_2(), cUpdated =(head = values[0].map(function(h) {
                    return _s_(h).trim()
                  })).indexOf(_S5)); for (var caseId = _s_(req.caseId).trim(), r = 1; r < values.length; r++) {
              var row = values[r],
              match = cLog >= 0 && _s_(row[cLog]).trim() === logId; if (!match && caseId && _s_(logId).indexOf("LOG-") < 0 &&(match = cCase >= 0 && _s_(row[cCase]).trim() === caseId &&(cRound >= 0 && _s_(row[cRound]).trim() === logId || cDate >= 0 && _s_(row[cDate]).trim() === logId)),
                match) {
                cDel >= 0 && AppRepository.setCellValue(_S0, r + 1, cDel + 1, !0, {
                    invalidate: !1
                  }),
                cDeletedAt >= 0 && AppRepository.setCellValue(_S0, r + 1, cDeletedAt + 1, now, {
                    invalidate: !1
                  }),
                cUpdated >= 0 && AppRepository.setCellValue(_S0, r + 1, cUpdated + 1, now, {
                    invalidate: !1
                  }),
                okDeleted = !0,
                res = {
                  ok: !0,
                  mode: "softDeleteFallback",
                  row: r + 1
                }; break
              }
            }
          }
        }
      } catch (_r131) {
        _c30W_("meeting.delete.sheetFallback", _r131, {
            logId
          })
      }
      if (!okDeleted)throw new Error("ไม่พบข้อมูลประวัติการประชุมที่ต้องการลบ"); var cacheInvalidation = _appIsFnName_("_invalidateMeetingDerivedCaches_") ? _invalidateMeetingDerivedCaches_("deleteMeetingLog"): {
      }; return ok_({
          logId,
          cacheInvalidation,
          result: res
        }, "ลบประวัติการประชุมสำเร็จ")
    })
}
function saveLetter(p) {
  return domainWrite_("saveLetter", p, function(input) {
      getCanonicalHeaderAudit_(_T30); var caseId = _s_(input.caseId).trim(); if (!caseId)return err_("ไม่พบ caseId"); _r122({
          caseId,
          caseNum: input.caseNum,
          recNo: input.recNo,
          title: input.title,
          caseTitle: input.caseTitle,
          petitioners: input.petitioners
        }, _T30); var now = new Date().toISOString(),
      letterId = String(input.letterId || "LTR-" + Date.now()).trim(),
      incomingLetterNo = input.letterNo || input.bookNo || "",
      incomingBookNo = input.bookNo || input.letterNo || "",
      normalizedLetterDate = _normalizeLetterDateFromFields_(input.letterDate || "", input.letterNo || "",
        input.bookNo || ""),
      row = {
        letterId,
        caseId,
        letterNo: _rl(incomingLetterNo),
        letterDate: normalizedLetterDate,
        agency: _s_(input.agency).trim(),
        subject: _s_(input.subject).trim(),
        issue: _s_(input.issue).trim(),
        dueDate: input.dueDate || "",
        extendDate: input.extendDate || "",
        remark: _s_(input.remark).trim(),
        letterStatus: _ro(input.letterStatus || "ยังไม่ได้รับ"),
        repliesJSON: _safeJsonStringify_(_c30A_(input.replies) ? input.replies: []),
        opStaff: _s_(input.opStaff).trim(),
        bookNo: _rl(incomingBookNo),
        officer: _s_(input.officer || input.opStaff).trim(),
        updatedAt: now,
        isDeleted: !1,
        deletedAt: ""
      },
      repo = getCanonicalRepository_("letters.main"),
      existing = null; if (_s_(input.letterId).trim() &&(existing = repo.findByKey(letterId, {
              includeDeleted: !0,
              requireCanonical: !0
            })), !existing) {
        var existingLetters = _r30(_T30, !0).filter(function(r) {
            return!(!r || isSoftDeletedRow_(r)) && _s_(r.caseId) === caseId && _s_(r.letterNo || r.bookNo).trim() === _s_(row.letterNo || row.bookNo).trim() && _s_(r.agency).trim() === _s_(row.agency).trim()
          }).sort(function(a, b) {
            return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
          }); existingLetters.length &&(existing = existingLetters[0], letterId = String(existing.letterId || letterId),
          row.letterId = letterId)
      }
      var result = repo.upsert(letterId, row),
      cacheInvalidation = _appIsFnName_("_invalidateLettersDerivedCaches_") ? _invalidateLettersDerivedCaches_("saveLetter"): {
      }; return ok_({
          letterId,
          caseId,
          cacheInvalidation: cacheInvalidation || {
          },
          mode: result.mode
        }, result.mode === "update" ? "อัปเดตหนังสือติดตามสำเร็จ": "บันทึกหนังสือติดตามสำเร็จ")
    })
}
MeetingDomain.getLookupOptions = function(payload) {
  try {
    return payload = requireDomainRequest_(payload, "viewer"),
    ok_(_r62(payload), "โหลดข้อมูลตัวเลือกการประชุมสำเร็จ")
  } catch (e) {
    return _c30W_("cases.meetingLookup.auth", e),
    err_("ไม่สามารถโหลดข้อมูลตัวเลือกการประชุมได้:ไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง",
      {
        authRequired: !0,
        route: "apiGetMeetingLookupOptions",
        error: String(e && e.message || e)
      })
  }
}, MeetingDomain.getHistory = function(payload) {
  payload = payload || {
  };
  var perfToken = _appIsFnName_("_r133") ? _r133("apiGetMeetingHistory", payload): null;
  _appIsFnName_("_domainRouterAuthAlreadyOk_") && _domainRouterAuthAlreadyOk_(payload) || requireAuth_(payload,
    "viewer");
  var rows = _rJ(payload),
  data = _paginateArrayResult_(rows, payload, 20, 250, {
      source: "getMeetingHistory",
      pageFacade: "AppPageKit.rowsFrom-publicBridge",
      domainOwner: "MeetingDomain.getHistory"
    });
  return _appIsFnName_("_r136") &&(data = _r136(perfToken, "ok", data, {
        rowsRead: _c30A_(rows) ? rows.length: 0
      })),
  ok_(data, "โหลดประวัติการประชุมสำเร็จ")
}, MeetingDomain.saveLog = function(payload) {
  try {
    return payload = requireDomainRequest_(payload, _S36),
    normalizeResult_(saveMeetingLog(payload), _T2, _T1)
  } catch (e) {
    var message = String(e && e.message || e || _T1);
    return _c30W_("cases.saveMeetingLog", e),
    err_("บันทึกประวัติการประชุมไม่สำเร็จ:" + message, {
        route: "apiSaveMeetingLog",
        error: message
      })
  }
}, MeetingDomain.deleteLog = function(payload) {
  payload = requireDomainRequest_(payload, _S36);
  var logId = _payloadValue_(payload, [_S38,
      "id",
      "meetingLogId",
      "currentLogId"]);
  return logId ?(payload.logId = logId, payload.id = logId, normalizeResult_(deleteMeetingLog(payload),
      "ลบประวัติการประชุมสำเร็จ", "ลบประวัติการประชุมไม่สำเร็จ")): err_("ลบประวัติการประชุมไม่สำเร็จ:ไม่พบรหัสรายการประชุม",
    {
      route: "apiDeleteMeetingLog"
    })
}, TrackingDomain.getLetters = function(payload) {
  payload = requireDomainRequest_(payload, "viewer");
  var rows = _r23(payload);
  return ok_(_paginateArrayResult_(rows, payload, 20, 250, {
        source: "getLetters",
        domainOwner: "TrackingDomain.getLetters"
      }), "โหลดข้อมูลหนังสือสำเร็จ")
}, TrackingDomain.saveLetter = function(payload) {
  return payload = requireDomainRequest_(payload, _S36),
  auditEvent_("letters", {
      route: "apiSaveLetter",
      caseId: payload.caseId || ""
    }),
  _normalizeOkEnvelope_(saveLetter(payload), "บันทึกหนังสือติดตามสำเร็จ", "บันทึกหนังสือติดตามไม่สำเร็จ")
}, TrackingDomain.deleteLetter = function(payload) {
  return payload = requireDomainRequest_(payload, _S36),
  _normalizeOkEnvelope_(deleteLetter(payload.letterId || payload.id || ""), "ลบหนังสือติดตามสำเร็จ",
    "ลบหนังสือติดตามไม่สำเร็จ")
};
function apiGetMeetingLookupOptions(payload) {
  return MeetingDomain.getLookupOptions(payload || {
    })
}
function apiGetMeetingHistory(payload) {
  return MeetingDomain.getHistory(payload || {
    })
}
function apiSaveMeetingLog(payload) {
  return writeGateway_("apiSaveMeetingLog", payload || {
    }, function(input) {
      return MeetingDomain.saveLog(input || {
        })
    }, _T2, _T1)
}
function apiDeleteMeetingLog(payload) {
  return writeGateway_("apiDeleteMeetingLog", payload || {
    }, function(input) {
      return MeetingDomain.deleteLog(input || {
        })
    }, "ลบประวัติการประชุมสำเร็จ", "ลบประวัติการประชุมไม่สำเร็จ")
}
function apiGetLetters(payload) {
  return TrackingDomain.getLetters(payload || {
    })
}
function apiSaveLetter(payload) {
  return writeGateway_("apiSaveLetter", payload || {
    }, function(input) {
      return TrackingDomain.saveLetter(input || {
        })
    }, "บันทึกหนังสือติดตามสำเร็จ", "บันทึกหนังสือติดตามไม่สำเร็จ")
}
function apiDeleteLetter(payload) {
  return writeGateway_("apiDeleteLetter", payload || {
    }, function(input) {
      return TrackingDomain.deleteLetter(input || {
        })
    }, "ลบหนังสือติดตามสำเร็จ", "ลบหนังสือติดตามไม่สำเร็จ")
}
function _r101(sheetName) {
  var sh = getSheet_(sheetName),
  data = getSheetMatrix_(sh);
  if (!data || data.length <= 1)return[];
  var headers =(data[0] || []).map(function(v) {
      return _s_(v).trim()
    });
  return data.slice(1).map(function(row, idx) {
      var obj = {
      }; return headers.forEach(function(h, i) {
          h &&(obj[h] = row[i])
        }),
      obj._sheetName = sheetName,
      obj._rowNumber = idx + 2,
      obj._rowValues = row,
      obj
    }).filter(function(row) {
      return!isSoftDeletedRow_(row)
    })
}
function _r69(sheetName, row) {
  return row = row || {
  },
  sheetName === "MainData" ? [_s_(row.caseId).trim(),
    _s_(row.caseNum).trim(),
    _s_(row.recNo).trim(),
    _normalizedText_(row.title || row.caseTitle || row.subject || ""),
    _normalizedText_(row.petitioners || row.petitionerName || "")].join("|"): sheetName === "MeetingLogs" ? [_s_(row.caseId).trim(),
    _s_(row.round).trim(),
    normalizeDateOutput_(row.meetingDate || row.date || ""),
    _normalizedText_(row.title || ""),
    _normalizedText_(row.result || row.note || row.summary || "")].join("|"): sheetName === "Letters" ? [_s_(row.caseId).trim(),
    _s_(row.letterNo || row.bookNo).trim(),
    normalizeDateOutput_(row.letterDate || ""),
    _normalizedText_(row.agency || ""),
    _normalizedText_(row.subject || row.issue || "")].join("|"): ""
}
function _rR(sheetName, row) {
  return row = row || {
  },
  sheetName === "MainData" ? _s_(row.caseId).trim(): sheetName === "MeetingLogs" ? _s_(row.logId || row.meetingId).trim(): sheetName === "Letters" ? _s_(row.letterId).trim(): ""
}
function _rN(sheetName) {
  var rows = _r101(sheetName),
  primaryGroups = {
  },
  businessGroups = {
  };
  function buildDuplicateItems(map, kind) {
    return Object.keys(map).filter(function(key) {
        return key && map[key] && map[key].length > 1
      }).map(function(key) {
        var items = map[key].slice().sort(function(a, b) {
            return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
          }),
        keep = items[0] || null,
        remove = items.slice(1); return {
          type: kind,
          key,
          count: items.length,
          keepRowNumber: keep ? keep._rowNumber: 0,
          removeRowNumbers: remove.map(function(row) {
              return row._rowNumber
            }),
          keepId: keep ? _rR(sheetName, keep): "",
          ids: items.map(function(row) {
              return _rR(sheetName, row)
            })
        }
      })
  }
  rows.forEach(function(row) {
      var primaryKey = _rR(sheetName, row),
      businessKey = _r69(sheetName, row); primaryKey &&(primaryGroups[primaryKey] ||(primaryGroups[primaryKey] = []),
        primaryGroups[primaryKey].push(row)),
      businessKey &&(businessGroups[businessKey] ||(businessGroups[businessKey] = []), businessGroups[businessKey].push(row))
    });
  var primaryDuplicates = buildDuplicateItems(primaryGroups, "primary"),
  businessDuplicates = buildDuplicateItems(businessGroups, "business").filter(function(item) {
      return!primaryGroups[item.key] || primaryGroups[item.key].length <= 1
    }),
  duplicateItems = primaryDuplicates.concat(businessDuplicates);
  return {
    sheetName,
    totalRows: rows.length,
    duplicateGroups: duplicateItems.length,
    duplicates: duplicateItems.reduce(function(sum, item) {
        return sum + Math.max(0, Number(item.count || 0) - 1)
      }, 0),
    items: duplicateItems
  }
}
function _rB() {
  return {
    generatedAt: new Date().toISOString(),
    cases: _rN(_S2),
    meetingLogs: _rN(_S0),
    letters: _rN(_T30)
  }
}
function _r91(audit) {
  audit = audit || _rB();
  var rows = [["sheet",
      "duplicateType",
      "key",
      "count",
      "keepRowNumber",
      "removeRowNumbers",
      "ids"]];
  return[_T48,
    _S13,
    "letters"].forEach(function(section) {
      var report = audit[section] || {
      },
      items; (_c30A_(report.items) ? report.items: []).forEach(function(item) {
          rows.push([String(report.sheetName || section),
              _s_(item.type),
              _s_(item.key),
              Number(item.count || 0),
              Number(item.keepRowNumber || 0),
              String((item.removeRowNumbers || []).join("|")),
              String((item.ids || []).join("|"))])
        })
    }),
  rows.map(function(row) {
      return row.map(function(cell) {
          var value = _c30S_(cell); return /[",\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"': value
        }).join(",")
    }).join(`
    `)
}
function _z62(sheetName, rowNumbers, patchObj) {
  if (!(rowNumbers = _c30A_(rowNumbers) ? rowNumbers.slice(): []).length)return 0;
  var sh = getSheet_(sheetName),
  audit = getCanonicalHeaderAudit_(sheetName);
  if (audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var data = getSheetMatrix_(sh);
  if (data.length <= 1)return 0;
  var map = _headerMap_(data[0].map(function(v) {
        return _s_(v).trim()
      })),
  patch = _c30O_({
      isDeleted: !0,
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, patchObj || {
    }),
  touched = 0;
  return rowNumbers.forEach(function(rowNumber) {
      var rowIndex = Number(rowNumber || 0) - 1; rowIndex < 1 || rowIndex >= data.length ||(Object.keys(patch).forEach(function(key) {
            map[key] !== void 0 &&(data[rowIndex][map[key]] = patch[key])
          }), touched++)
    }),
  touched &&(AppRepository.setRangeValues(sheetName, 2, 1, data.slice(1), {
        invalidate: !1
      }), invalidateSheetCache_(sheetName)),
  touched
}
function apiAuditMeetingData(payload) {
  return payload = requireDomainRequest_(payload, "admin"),
  ok_(_rB(), "ตรวจสอบข้อมูลซ้ำสำเร็จ")
}
function apiExportMeetingDuplicateAuditCsv(payload) {
  payload = requireDomainRequest_(payload, "admin");
  var audit = _rB();
  return ok_({
      fileName: "meeting_duplicate_audit_" + Utilities.formatDate(new Date, Session.getScriptTimeZone(),
        "yyyyMMdd_HHmmss") + ".csv",
      csv: _r91(audit),
      audit
    }, "สร้างไฟล์รายงานข้อมูลซ้ำสำเร็จ")
}
function apiCleanupMeetingData(payload) {
  return writeGateway_("apiCleanupMeetingData", payload || {
    }, function(input) {
      input = requireDomainRequest_(input, "admin"); var audit = _rB(),
      result = {
        cases: 0,
        meetingLogs: 0,
        letters: 0,
        generatedAt: new Date().toISOString()
      }; return[{
          section: _T48,
          sheetName: _S2
        },
        {
          section: _S13,
          sheetName: _S0
        },
        {
          section: "letters",
          sheetName: _T30
        }].forEach(function(entry) {
          var report = audit[entry.section] || {
          },
          rowNumbers = []; (report.items || []).forEach(function(item) {
              rowNumbers = rowNumbers.concat(item.removeRowNumbers || [])
            }),
          result[entry.section] = _z62(entry.sheetName, rowNumbers, {
              remark: "duplicate-cleanup",
              note: "duplicate-cleanup"
            })
        }),
      _appIsFnName_("_invalidateMeetingDerivedCaches_") && _invalidateMeetingDerivedCaches_("cleanupDuplicates"),
      _appIsFnName_("_invalidateLettersDerivedCaches_") && _invalidateLettersDerivedCaches_("cleanupDuplicates"),
      ok_(result, "รวมข้อมูลซ้ำสำเร็จ")
    }, "รวมข้อมูลซ้ำสำเร็จ", "รวมข้อมูลซ้ำไม่สำเร็จ")
}
function _z60(payload) {
  return _appIsFnName_("_dashboardStatsDirect_") ? _dashboardStatsDirect_(payload || {
    }): {
    total: 0,
    totalMeetings: 0,
    meetingItemTotal: 0,
    meetings: {
      total: 0,
      totalMeetings: 0,
      totalItems: 0
    },
    statusRows: [],
    byType: [],
    byTopic: [],
    meta: {
      source: "dashboard-owner-code21-unavailable"
    }
  }
}
typeof _Domain_getCanonicalCaseBundle == "function" &&(AppDomain.getCanonicalCaseBundle = _Domain_getCanonicalCaseBundle),
AppDomain.CasesService = AppDomain.CasesService || {
  cleanOwner: !0,
  getBundle: function(payload) {
    return _Domain_getCanonicalCaseBundle(payload || {
      })
  },
  getContext: function(payload) {
    return _r54(payload || {
      })
  },
  findExisting: function(payload) {
    return _r40(payload || {
      })
  },
  repository: function() {
    return _rs()
  }
}, typeof _z38 == "function" &&(AppDomain.getCaseIdentityHealthReport = _z38), typeof _r23 == "function" &&(AppDomain.getLetters = _r23),
typeof _rJ == "function" &&(AppDomain.getMeetingHistory = _rJ), AppDomain.getDashboardStatsRaw = _z60;
var _r35 = 600;
function getLookupBundle_(type, query, scope, limit) {
  var normalizedType;
  if (_rc(type || "meeting") === "meeting") {
    var base = _r109(scope);
    return limit = Math.max(20, Math.min(Number(limit || 120) || 120, 300)),
    {
      petitioners: _rk(base.petitioners, query, limit),
      proposer: _rk(base.proposer, query, limit),
      assignees: _rk(base.assignees, query, limit),
      coAssignees: _rk(base.coAssignees, query, limit),
      staffs: _rk(base.staffs, query, limit),
      opStaff: _rk(base.opStaff, query, limit),
      subcommittees: _rk(base.subcommittees, query, limit),
      bundles: {
        petitioners: _rk(base.bundles.petitioners, query, limit),
        comms: _rk(base.bundles.comms, query, limit),
        staffs: _rk(base.bundles.staffs, query, limit),
        ops: _rk(base.bundles.ops, query, limit),
        subcommittees: _rk(base.bundles.subcommittees, query, limit)
      }
    }
  }
  return {
    rows: []
  }
}
function _z48(payload) {
  payload = payload || {
  };
  var limit = Math.max(1, Math.min(Number(payload.limit || 80) || 80, 300)),
  page = Math.max(1, Number(payload.page || 1) || 1),
  cursor = _s_(payload.cursor).trim();
  return {
    type: String(payload.type || "meeting").trim() || "meeting",
    key: _s_(payload.key || payload.kind || payload.target).trim(),
    q: _s_(payload.q || payload.query || payload.keyword).trim(),
    scope: _s_(payload.scope || payload.category || payload.group).trim(),
    limit,
    page,
    cursor,
    offset: cursor && /^\d+$/.test(cursor) ? Number(cursor): (page - 1) * limit,
    contractStamp: "lookup-contract-current"
  }
}
function apiSearchLookup(payload) {
  payload = payload || {
  };
  var boundary = _routerAuthorizedEntry_("apiSearchLookup", payload, "viewer");
  if (!boundary.ok)return boundary.result;
  var bundle = getLookupBundle_((payload = _z48(payload)).type, payload.q, payload.scope, Math.max(payload.limit + payload.offset + 1,
      payload.limit)),
  rows = payload.key &&(bundle[payload.key] ||(bundle.bundles || {
      })[payload.key]) || [];
  rows.length || payload.key || Object.keys(bundle || {
    }).forEach(function(k) {
      _c30A_(bundle[k]) &&(rows = rows.concat(bundle[k]))
    });
  var sliced =(rows = _c30A_(rows) ? rows: []).slice(payload.offset, payload.offset + payload.limit),
  nextOffset = payload.offset + sliced.length;
  return {
    ok: !0,
    data: {
      rows: sliced,
      items: sliced,
      records: sliced,
      key: payload.key,
      type: payload.type,
      q: payload.q,
      scope: payload.scope,
      limit: payload.limit,
      cursor: payload.cursor,
      nextCursor: nextOffset < rows.length ? String(nextOffset): "",
      totalRecords: rows.length,
      contractStamp: payload.contractStamp
    }
  }
}
function _rc(value) {
  return _s_(value).trim()
}
function _rv(value) {
  return _rc(value).toLowerCase()
}
function _r17(rows, source) {
  return(_c30A_(rows) ? rows: []).map(function(r) {
      return {
        name: _rc(r &&(r.name || r.fullName) || ""),
        phone: _rc(r &&(r.phone || r.tel) || "").replace(/'/g, ""),
        position: _rc(r && r.position || ""),
        status: _rc(r && r.status || ""),
        source: _rc(source || "")
      }
    }).filter(function(x) {
      return!!x.name &&(!x.status || x.status === "ดำรงตำแหน่ง" || x.status === "ใช้งาน" || x.status.toLowerCase() === "active")
    })
}
function _rz(rows) {
  var map = {
  };
  return(_c30A_(rows) ? rows: []).forEach(function(x) {
      var key = _rv((x = x || {
          }).name); if (key) {
        if (!map[key])return map[key] = {
          name: _rc(x.name),
          phone: _rc(x.phone),
          position: _rc(x.position),
          source: _rc(x.source)
        },
        void 0; !map[key].phone && x.phone &&(map[key].phone = _rc(x.phone)),
        !map[key].position && x.position &&(map[key].position = _rc(x.position)),
        !map[key].source && x.source &&(map[key].source = _rc(x.source))
      }
    }),
  Object.keys(map).map(function(key) {
      return map[key]
    }).sort(function(a, b) {
      return _s_(a.name).localeCompare(_s_(b.name), "th")
    })
}
function _rk(rows, query, limit) {
  var q = _rv(query),
  out = _c30A_(rows) ? rows.slice(): [];
  return q &&(out = out.filter(function(x) {
        return _rv(x.name).indexOf(q) !== - 1 || _rv(x.phone).indexOf(q) !== - 1 || _rv(x.position).indexOf(q) !== - 1 || _rv(x.source).indexOf(q) !== - 1
      })),
  out.slice(0, Math.max(1, Number(limit || 120) || 120))
}
function _r68(category) {
  var cacheTokens = [_appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_(_S3): "na",
    _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_comm"): "na",
    _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_staff"): "na",
    _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("personnel_op"): "na",
    _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("subcommittees"): "na"].join("_");
  return "meeting_lookup_bundle_current_" + _rc(category || "all") + "_" + cacheTokens
}
function _r109(category) {
  var cache = _co(),
  cacheKey = _r68(category);
  try {
    var cached = cache.get(cacheKey);
    if (cached)return JSON.parse(cached)
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var petitioners = _rz(_Domain_getPetitioners().map(function(x) {
        return {
          name: _rc(x && x.name),
          phone: _rc(x && x.phone),
          position: "",
          source: _S3
        }
      })),
  comms = _rz(_r17(_Domain_getPersonnelComms(), "comms")),
  staffs = _rz(_r17(_Domain_getPersonnelStaffs(), _S37)),
  ops = _rz(_r17(_Domain_getPersonnelOps(), "ops")),
  subcommittees = _rz(_rg("Subcommittees", [], {
        includeDeleted: !1
      }).map(function(x) {
        return {
          name: _rc(x && x.name),
          phone: "",
          position: _S14,
          source: "subcommittees"
        }
      }).filter(function(x) {
        return x.name
      })),
  proposer,
  bundle = {
    petitioners,
    proposer: _s_(category).trim() === "กรรมาธิการเสนอญัตติ" ? comms: petitioners,
    assignees: comms,
    coAssignees: staffs,
    staffs: ops,
    opStaff: ops,
    subcommittees,
    bundles: {
      petitioners,
      comms,
      staffs,
      ops,
      subcommittees
    }
  };
  try {
    safeCachePut_(cache, cacheKey, bundle, _r35)
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return bundle
}
function _r62(payload) {
  var category = _rc((payload = payload || {
      }).category || payload.cat),
  query = _rc(payload.query || payload.q),
  limit = Math.max(20, Math.min(Number(payload.limit || 120) || 120, 300)),
  result = getLookupBundle_("meeting", query, category, limit);
  return result.meta = {
    category,
    query: _rv(query),
    limit,
    generatedAt: new Date().toISOString(),
    cacheTtlSec: _r35
  },
  Object.keys(result).forEach(function(key) {
      _c30A_(result[key]) &&(result[key] = result[key].slice(0, limit))
    }),
  result
}
var _r75 = "ThailandLocations", _r10 = null;
function _r70() {
  var cacheKey = "th_loc_flat_current|" + _entityCacheStamp_("thailandlocations"),
  cache = _co();
  try {
    var cached = cache.get(cacheKey);
    if (cached)return JSON.parse(cached)
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var sh = getSheet_(_r75),
  data = getSheetMatrix_(sh, 4),
  rows = [];
  if (data.length > 1)for (var headerMap = _headerMap_((data[0] || []).map(function(v) {
          return _s_(v).trim()
        })), cProvince = headerMap.province, cDistrict = headerMap.district, cSubDistrict = headerMap.subDistrict > - 1 ? headerMap.subDistrict: headerMap.subdistrict,
    cZip = headerMap.zip > - 1 ? headerMap.zip: headerMap.postalCode, i = 1; i < data.length; i++) {
    var province = String(cProvince > - 1 ? data[i][cProvince]: "").trim(),
    district = String(cDistrict > - 1 ? data[i][cDistrict]: "").trim(),
    subDistrict = String(cSubDistrict > - 1 ? data[i][cSubDistrict]: "").trim(),
    zip = String(cZip > - 1 ? data[i][cZip]: "").trim();
    province && district && subDistrict && rows.push({
        province,
        district,
        subDistrict,
        zip
      })
  }
  try {
    safeCachePut_(cache, cacheKey, rows, 21600)
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return rows
}
function _r52() {
  var rows = _r70();
  if (!rows.length)return[];
  var provinceMap = {
  };
  return rows.forEach(function(row) {
      var province = provinceMap[row.province]; province ||(province = provinceMap[row.province] = {
          name: row.province,
          districts: []
        }); for (var district = null, i = 0; i < province.districts.length; i++)if (_s_(province.districts[i].name) === row.district) {
        district = province.districts[i]; break
      }
      district ||(district = {
          name: row.district,
          subDistricts: []
        }, province.districts.push(district)),
      district.subDistricts.push({
          name: row.subDistrict,
          zip: row.zip
        })
    }),
  Object.keys(provinceMap).map(function(key) {
      return provinceMap[key]
    })
}
function _r85() {
  if (_r10)return _r10;
  var tree = _r52(),
  index = {
    provinces: {
    },
    districts: {
    },
    subDistricts: {
    },
    postalCodeMap: {
    }
  };
  return(_c30A_(tree) ? tree: []).forEach(function(province) {
      var provinceName = _s_(province && province.name).trim(); provinceName &&(index.provinces[provinceName] = province,
        (_c30A_(province && province.districts) ? province.districts: []).forEach(function(district) {
            var districtName = _s_(district && district.name).trim(); if (districtName) {
              var districtKey = provinceName + "|" + districtName; index.districts[districtKey] = district,
              (_c30A_(district && district.subDistricts) ? district.subDistricts: []).forEach(function(subDistrict) {
                  var subName = _s_(subDistrict && subDistrict.name).trim(); if (subName) {
                    var subKey = districtKey + "|" + subName; index.subDistricts[subKey] = subDistrict,
                    index.postalCodeMap[subKey] = _s_(subDistrict && subDistrict.zip).trim()
                  }
                })
            }
          }))
    }),
  _r10 = index,
  index
}
function _r55(payload) {
  payload = payload || {
  };
  var province = _s_(payload.province).trim(),
  district = _s_(payload.district).trim(),
  subDistrict = _s_(payload.subDistrict || payload.subdistrict).trim(),
  index = _r85();
  if (province && !district && !subDistrict && index.provinces[province])return[index.provinces[province]];
  if (province && district && !subDistrict) {
    var districtKey = province + "|" + district;
    if (index.districts[districtKey])return[{
        name: province,
        districts: [index.districts[districtKey]]
      }]
  }
  if (province && district && subDistrict) {
    var subKey = province + "|" + district + "|" + subDistrict;
    if (index.subDistricts[subKey])return[{
        name: province,
        districts: [{
            name: district,
            subDistricts: [index.subDistricts[subKey]]
          }]
      }]
  }
  return null
}
function _r90(payload) {
  return payload = payload || {
  },
  "th_loc_current|" + [_s_(payload.province),
    _s_(payload.district),
    _s_(payload.subDistrict || payload.subdistrict),
    _s_(payload.query || payload.q),
    payload.summaryOnly ? "1": "0",
    _entityCacheStamp_("thailandlocations")].join("|")
}
function _r100(rows) {
  return(rows = _c30A_(rows) ? rows: []).map(function(p) {
      var districts = _c30A_(p && p.districts) ? p.districts: [],
      subDistrictCount = districts.reduce(function(total, district) {
          return total +(_c30A_(district && district.subDistricts) ? district.subDistricts.length: 0)
        }, 0); return {
        name: _s_(p && p.name),
        districtCount: districts.length,
        subDistrictCount
      }
    })
}
function _r108(payload) {
  payload = payload || {
  };
  var province = _s_(payload.province).trim(),
  district = _s_(payload.district).trim(),
  subDistrict = _s_(payload.subDistrict || payload.subdistrict).trim(),
  query = _s_(payload.query || payload.q).trim().toLowerCase(),
  rows = _r55(payload) || _r52();
  return province &&(rows = rows.filter(function(p) {
        return _s_(p && p.name) === province
      })),
  district &&(rows = rows.map(function(p) {
        var districts =(_c30A_(p && p.districts) ? p.districts: []).filter(function(d) {
            return _s_(d && d.name) === district
          }); return {
          name: _s_(p && p.name),
          districts
        }
      }).filter(function(p) {
        return p.districts.length
      })),
  subDistrict &&(rows = rows.map(function(p) {
        var districts =(_c30A_(p && p.districts) ? p.districts: []).map(function(d) {
            var subs =(_c30A_(d && d.subDistricts) ? d.subDistricts: []).filter(function(s) {
                return _s_(s && s.name) === subDistrict
              }); return {
              name: _s_(d && d.name),
              subDistricts: subs
            }
          }).filter(function(d) {
            return d.subDistricts.length
          }); return {
          name: _s_(p && p.name),
          districts
        }
      }).filter(function(p) {
        return p.districts.length
      })),
  query &&(rows = rows.map(function(p) {
        var provinceName = _s_(p && p.name),
        districts =(_c30A_(p && p.districts) ? p.districts: []).map(function(d) {
            var districtName = _s_(d && d.name),
            subs =(_c30A_(d && d.subDistricts) ? d.subDistricts: []).filter(function(s) {
                return[provinceName,
                  districtName,
                  _s_(s && s.name),
                  _s_(s && s.zip)].join(" ").toLowerCase().indexOf(query) !== - 1
              }); return districtName.toLowerCase().indexOf(query) === - 1 || subs.length ||(subs = _c30A_(d && d.subDistricts) ? d.subDistricts: []),
            {
              name: districtName,
              subDistricts: subs
            }
          }).filter(function(d) {
            return d.subDistricts.length || d.name.toLowerCase().indexOf(query) !== - 1
          }); return provinceName.toLowerCase().indexOf(query) === - 1 || districts.length ||(districts = _c30A_(p && p.districts) ? p.districts: []),
        {
          name: provinceName,
          districts
        }
      }).filter(function(p) {
        return p.districts.length || p.name.toLowerCase().indexOf(query) !== - 1
      })),
  rows
}
function _Domain_getThailandLocations(payload) {
  payload = payload || {
  };
  var cache = _co(),
  cacheKey = _r90(payload);
  try {
    var cached = cache.get(cacheKey);
    if (cached)return ok_(JSON.parse(cached), "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ")
  } catch (_cacheReadErr) {
    _recordWarning_("ec", _cacheReadErr)
  }
  var rows = _r108(payload),
  summaryOnly = !!payload.summaryOnly,
  province = _s_(payload.province).trim(),
  result;
  result = summaryOnly ? {
    provinces: _r100(rows),
    totalProvinces: rows.length
  }
  : {
    rows,
    provinces: rows,
    totalProvinces: rows.length,
    province: province || "",
    districtOptions: rows[0] && _c30A_(rows[0].districts) ? rows[0].districts.map(function(d) {
        return _s_(d && d.name)
      }): [],
    subDistrictOptions: rows[0] && rows[0].districts && rows[0].districts[0] && _c30A_(rows[0].districts[0].subDistricts) ? rows[0].districts[0].subDistricts.map(function(s) {
        return {
          name: _s_(s && s.name),
          zip: _s_(s && s.zip)
        }
      }): []
  };
  try {
    safeCachePut_(cache, cacheKey, result, 1800)
  } catch (_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return ok_(result, province && !rows.length ? "ไม่พบข้อมูลจังหวัด": "โหลดข้อมูลจังหวัด/อำเภอสำเร็จ")
}
function _normalizeSearchText_(value) {
  return _c30S_(value).toLowerCase().replace(/\s+/g, " ").trim()
}
function _r83(row, keys) {
  row = row || {
  },
  keys = _c30A_(keys) ? keys: [];
  for (var i = 0; i < keys.length; i++) {
    var key,
    value = row[keys[i]];
    if (value != null && String(value).trim() !== "" && !_r5(value))return value
  }
  return ""
}
function _rD(value) {
  return _re(value)
}
function _r82() {
  return[_S23,
    _S11,
    "receivedNo",
    "receive_no",
    "caseReceiveNo",
    "caseRecNo",
    "receiptNo",
    "receiveNumber",
    "registrationNo",
    "registrationNumber",
    "receiveRegistrationNo",
    "receiveCode",
    "receiveBookNo",
    "bookReceiveNo",
    "petitionReceiveNo",
    "complaintReceiveNo",
    "documentReceiveNo",
    "canonicalReceiveNo",
    "receiveNoDisplay",
    "displayReceiveNo",
    _L4,
    _L14,
    _L16,
    "เลขรับเรื่องพิจารณา",
    _T43,
    "เลขรับคำร้อง",
    "เลขรับหนังสือ",
    "เลขทะเบียนรับ",
    _L22,
    "ทะเบียนหนังสือรับ",
    "เลขหนังสือรับ",
    "รับเลขที่",
    "รับที่",
    _S15]
}
function _r20(row) {
  row = row || {
  };
  var best = "";
  return Object.keys(row).forEach(function(key) {
      if (!best || !/^\d+\s*[\/\-–—]\s*25\d{2}$/.test(best)) {
        var normalizedKey = _s_(key).replace(/[\s_\-–—()（）\[\]{}:：/\.]+/g, "").toLowerCase(),
        isReceiveKey; if ((normalizedKey === "recno" || normalizedKey.indexOf("receive") !== - 1 || normalizedKey.indexOf("receipt") !== - 1 || normalizedKey.indexOf("registration") !== - 1 || String(key).indexOf(_S15) !== - 1 || String(key).indexOf(_L22) !== - 1 || String(key).indexOf("รับเลข") !== - 1) && !/date|วันที่|วันรับ|receiveddate|receivedat/i.test(normalizedKey)) {
          var candidate = _rD(row[key]); candidate &&(!best || /^\d+\s*[\/\-–—]\s*25\d{2}$/.test(candidate) || /^\d+$/.test(candidate) && !/^\d+$/.test(best)) &&(best = candidate)
        }
      }
    }),
  best
}
function _r3(row) {
  var recRaw = _rD((row = row || {
      }).recNo),
  aliasRaw = "",
  raw;
  return recRaw ||(aliasRaw = _rD(_r83(row, _r82()))),
  _re(recRaw || aliasRaw || _r20(row))
}
function _rG() {
  return["MainData.recDate",
    "MainData/recDate",
    "MainData_recDate",
    "mainData.recDate",
    "mainData/recDate",
    "mainData_recDate",
    "recDate",
    "rec_date",
    "rec date",
    "receiveDate",
    "receive_date",
    "receive date",
    "receiptDate",
    "receipt_date",
    "registrationDate",
    "registration_date",
    "caseReceiveDate",
    "caseRecDate",
    "petitionReceiveDate",
    "complaintReceiveDate",
    "documentReceiveDate",
    "receiveAt",
    "receivedAt",
    "receiveOn",
    "receivedOn",
    "recDateText",
    "receiveDateText",
    "receiveDateDisplay",
    _L15,
    "วันที่รับเรื่อง (พ.ศ.)",
    "วันที่รับเรื่อง(พ.ศ.)",
    "วันเดือนปีที่รับเรื่อง",
    "วันเดือนปีรับเรื่อง",
    "วันที่รับ",
    "วันรับเรื่อง",
    "วันรับ",
    "รับเรื่องวันที่",
    "วันที่ลงรับ",
    "วันที่ลงทะเบียนรับ",
    "วันที่รับคำร้อง",
    "วันที่รับหนังสือ",
    "วันเดือนปีที่รับ",
    "วันเดือนปีรับ",
    "รับวันที่",
    "วันที่รับเรื่องร้องเรียน",
    "วันรับคำร้อง",
    "วันรับหนังสือ"]
}
function _rF(source) {
  source = source || {
  };
  var best = "";
  return Object.keys(source).forEach(function(key) {
      if (!best) {
        var rawKey = _s_(key),
        normalizedKey = _r31(rawKey),
        thaiDateKey = rawKey.indexOf("วัน") !== - 1 || rawKey.indexOf("วันที่") !== - 1,
        thaiReceiveKey = rawKey.indexOf("รับ") !== - 1 || rawKey.indexOf("ลงรับ") !== - 1 || rawKey.indexOf(_L22) !== - 1,
        enReceiveDateKey = /^(maindata)?(recdate|receivedate|receiveddate|receiptdate|registrationdate|datereceived|datereceive|receivedat|receiveat|receivedon|receiveon|casereceivedate|caserecdate|petitionreceivedate|complaintreceivedate|documentreceivedate)$/i.test(normalizedKey),
        excluded; if (!(/offer|propose|submit|book|letter|due|deadline|extend|delete|deleted|update|updated|create|created|meeting|reply|response|closed|close|refund|report|status/i.test(normalizedKey) || rawKey.indexOf("เสนอ") !== - 1 || rawKey.indexOf(_T41) !== - 1 && rawKey.indexOf("รับหนังสือ") === - 1 || rawKey.indexOf("ครบกำหนด") !== - 1 || rawKey.indexOf("ประชุม") !== - 1 || rawKey.indexOf("แก้ไข") !== - 1 || rawKey.indexOf("สร้าง") !== - 1 || rawKey.indexOf("ลบ") !== - 1 || rawKey.indexOf(_S17) !== - 1) &&(enReceiveDateKey || thaiDateKey && thaiReceiveKey)) {
          var text = _rj(source[key]); text &&(best = text)
        }
      }
    }),
  best
}
function _r31(value) {
  return _c30S_(value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g,
    "").toLowerCase()
}
function _rn(source, keys) {
  source = source || {
  },
  keys = _c30A_(keys) ? keys: [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (_c30H_(source, key) && source[key] !== void 0 && source[key] !== null && String(source[key]).trim() !== "")return source[key]
  }
  var dict = {
  };
  Object.keys(source).forEach(function(key2) {
      var nk = _r31(key2); nk && !_c30H_(dict, nk) &&(dict[nk] = source[key2])
    });
  for (var j = 0; j < keys.length; j++) {
    var nkey = _r31(keys[j]);
    if (nkey && dict[nkey] !== void 0 && dict[nkey] !== null && String(dict[nkey]).trim() !== "")return dict[nkey]
  }
  return ""
}
function _rj(value) {
  if (value == null)return "";
  var pad2 = _appIsFnName_("_cr") ? _cr: function(n) {
    return String(n).padStart(2, "0")
  };
  function cleanText(v) {
    return _c30S_(v).replace(/^'+/, "").replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").trim()
  }
  function normalizeThaiYear(y) {
    return y = Number(_c30S_(y).replace(/[^0-9]/g, "")) || 0,
    y ? y >= 3600 && y <= 3700 ? y - 1086: y >= 3e3 && y <= 3200 ? y - 543: y < 2400 ? y + 543: y: 0
  }
  function validDayMonth(d2, m) {
    return d2 = Number(d2),
    m = Number(m),
    d2 >= 1 && d2 <= 31 && m >= 1 && m <= 12
  }
  function safeDateText(day, month, year) {
    return validDayMonth(day, month) ?(year = normalizeThaiYear(year), year ? pad2(Number(day)) + "/" + pad2(Number(month)) + "/" + String(year): ""): ""
  }
  function formatDateObject(d2) {
    if (!d2 || isNaN(d2.getTime()))return "";
    var tz = typeof Session != "undefined" && Session.getScriptTimeZone && Session.getScriptTimeZone() || "Asia/Bangkok";
    try {
      if (typeof Utilities != "undefined" && Utilities.formatDate)return safeDateText(Utilities.formatDate(d2,
          tz, "dd"), Utilities.formatDate(d2, tz, "MM"), Utilities.formatDate(d2, tz, "yyyy"))
    } catch (_fmtErr) {
      _appIgnore_(_fmtErr, "c6.C30:2134")
    }
    return safeDateText(d2.getDate(), d2.getMonth() + 1, d2.getFullYear())
  }
  function rejectNonDateText(text) {
    return!text || text === "-" || text === "/" || /^CASE[_-]/i.test(text) || /^MAIN-\d+/i.test(text) || /^ROW-\d+/i.test(text) || /^\d+\s*\/\s*25\d{2}$/.test(text)
  }
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime()))return formatDateObject(value);
  if (typeof value == "number" && isFinite(value) && value > 2e4 && value < 9e4)return formatDateObject(new Date(Math.round(864e5 *(value - 25569))));
  var raw = cleanText(value);
  if (rejectNonDateText(raw))return "";
  var dmy = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.]((?:19|20|25|30|31|36)\d{2})$/);
  if (dmy)return safeDateText(dmy[1], dmy[2], dmy[3]);
  var iso = raw.match(/^((?:19|20|25|30|31|36)\d{2})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);
  if (iso)return safeDateText(iso[3], iso[2], iso[1]);
  if (/GMT|T\d{2}:\d{2}:\d{2}/i.test(raw)) {
    var d = new Date(raw);
    if (!isNaN(d.getTime()))return formatDateObject(d)
  }
  if (_appIsFnName_("_appThaiDateText_"))try {
    var converted = cleanText(_appThaiDateText_(raw)),
    parts = converted.match(/^(\d{1,2})\/(\d{1,2})\/((?:19|20|25|30|31|36)\d{2})$/);
    if (parts)return safeDateText(parts[1], parts[2], parts[3])
  } catch (_err) {
    _appIgnore_(_err, "c6.C30:2158")
  }
  return ""
}
function _r93(row) {
  var raw =(row = row || {
    }).raw && typeof row.raw == "object" ? row.raw: row.__raw && typeof row.__raw == "object" ? row.__raw: {
  };
  return row.MainData && typeof row.MainData == "object" && !_c30A_(row.MainData) ? row.MainData: row.mainData && typeof row.mainData == "object" && !_c30A_(row.mainData) ? row.mainData: row.MainData && typeof row.MainData == "object" && !_c30A_(row.MainData) ? row.MainData: row.mainData && typeof row.mainData == "object" && !_c30A_(row.mainData) ? row.mainData: raw.MainData && typeof raw.MainData == "object" && !_c30A_(raw.MainData) ? raw.MainData: raw.mainData && typeof raw.mainData == "object" && !_c30A_(raw.mainData) ? raw.mainData: {
  }
}
function _r25(value) {
  return(value = _c30S_(value).replace(/^'+/, "").trim()) ? _appIsFnName_("_normalizedText_") ? _normalizedText_(value): value.replace(/[\u00A0\u200B-\u200D\uFEFF]/g,
    "").replace(/\s+/g, " ").trim().toLowerCase(): ""
}
function _rY(title, petitioner) {
  return title = _r25(title),
  petitioner = _r25(petitioner),
  title ? title + "|" + petitioner: ""
}
function _r12(row) {
  row = row || {
  };
  var keys = [],
  seen = {
  };
  function addCaseIdentityKey_(prefix, value) {
    var key =(value = _c30S_(value).replace(/^'+/, "").trim()) ? prefix + ":" + value: "";
    return key && !seen[key] &&(seen[key] = 1, keys.push(key)),
    value
  }
  function firstValue(list) {
    return _rn(row, list) || ""
  }
  var title = firstValue(_r112),
  consideration = firstValue(_r63),
  petitioners = firstValue(_r47),
  caseId = addCaseIdentityKey_(_S12, firstValue([_S12,
        "id",
        "uid",
        "rowId",
        "_id"])),
  caseNum = addCaseIdentityKey_(_T4, firstValue([_T4,
        _S30,
        _S24,
        _L6])),
  recNo = addCaseIdentityKey_(_S23, firstValue([_S23,
        _S11,
        _L4]));
  if (caseNum && recNo) {
    var pair = "caseNumRecNo:" + caseNum + "|" + recNo;
    seen[pair] ||(seen[pair] = 1, keys.push(pair))
  }
  var tp = _rY(title || consideration, petitioners);
  if (tp && tp.indexOf("|") > 0 && tp.split("|")[1]) {
    var tpKey = "titlePetitioner:" + tp;
    seen[tpKey] ||(seen[tpKey] = 1, keys.push(tpKey))
  }
  return keys
}
function _r49() {
  var cacheNs = "MainData.recDate.owner",
  cached = _appIsFnName_("_requestScopeGet_") ? _requestScopeGet_("caseSearchMainDataRecDateIndex", cacheNs): null;
  if (cached && typeof cached == "object")return cached;
  var map = {
  };
  function addKey(prefix, value, text) {
    return(value = _c30S_(value).replace(/^'+/, "").trim()) && text && !map[prefix + ":" + value] &&(map[prefix + ":" + value] = text),
    value
  }
  function addDirectKey(key, text) {
    key && text && !map[key] &&(map[key] = text)
  }
  try {
    var fields = [_S12,
      "id",
      "uid",
      "rowId",
      "_id",
      _T4,
      _S30,
      _S24,
      _L6,
      _S23,
      _S11,
      _L4,
      _S28,
      _S20,
      "caseSubject",
      "caseName",
      "name",
      _L19,
      _L9,
      "หัวข้อเรื่อง",
      _S7,
      _S10,
      _T38,
      "titleConsider",
      "considerTitle",
      _L2,
      _L11,
      _L5,
      _S3,
      _T53,
      _S9,
      "requester",
      "complainant",
      "proposer",
      "motionProposer",
      _L1,
      _L24,
      _L13,
      _S4].concat(_rG()),
    rows = typeof readSheetProjectedObjectsCached_ == "function" ? readSheetProjectedObjectsCached_(_S2,
      fields, {
        includeDeleted: !1,
        requireCanonical: !1,
        ttl: 180,
        batchSize: 500
      }): [];
    (_c30A_(rows) ? rows: []).forEach(function(row) {
        var text = _rj(_rn(row = row || {
            }, _rG())) || _rF(row); if (text) {
          var dateIndexCaseId = addKey(_S12, _rn(row, [_S12,
                "id",
                "uid",
                "rowId",
                "_id"]), text),
          dateIndexCaseNum = addKey(_T4, _rn(row, [_T4,
                _S30,
                _S24,
                _L6]), text),
          dateIndexRecNo = addKey(_S23, _rn(row, [_S23,
                _S11,
                _L4]), text); dateIndexCaseNum && dateIndexRecNo && addDirectKey("caseNumRecNo:" + dateIndexCaseNum + "|" + dateIndexRecNo,
            text); var dateIndexTitle = _rn(row, _r112),
          dateIndexConsideration = _rn(row, _r63),
          dateIndexPetitioners,
          titlePetitionerKey = _rY(dateIndexTitle || dateIndexConsideration, _rn(row, _r47)); titlePetitionerKey && titlePetitionerKey.indexOf("|") > 0 && titlePetitionerKey.split("|")[1] && addKey("titlePetitioner",
            titlePetitionerKey, text)
        }
      })
  } catch (e) {
    _c30W_("case.search.maindata.recDate.index.owner", e)
  }
  return _appIsFnName_("_requestScopePut_") && _requestScopePut_("caseSearchMainDataRecDateIndex", cacheNs,
    map),
  map
}
function _r36(row) {
  row = row || {
  };
  var keys = _rG();
  function read(source) {
    var value2 = _rn(source = source || {
      }, keys);
    return value2 !== "" && value2 != null ? value2: _rF(source)
  }
  var rawObj = row.raw && typeof row.raw == "object" ? row.raw: row.__raw && typeof row.__raw == "object" ? row.__raw: {
  },
  value = read(row),
  main,
  data;
  if (value !== "" && _rj(value) ||(value = read(rawObj)) !== "" && _rj(value) ||(value = read(_r93(row))) !== "" && _rj(value) ||(value = read(row.data && typeof row.data == "object" && !_c30A_(row.data) ? row.data: {
        })) !== "" && _rj(value))return value;
  for (var idx = _r49(), identityKeys = _r12(row), i = 0; i < identityKeys.length; i++)if (idx && idx[identityKeys[i]])return idx[identityKeys[i]];
  return ""
}
function _rZ(row) {
  return _rj(_r36(row || {
      }))
}
function _caseSearchEnsureReceiveNo_(row) {
  row = row || {
  };
  var out = _c30O_({
    }, row),
  receiveNo = _r3(out),
  receiveDateText = _rZ(out),
  caseNum = _rf(_casePick_(out, _r51) || ""),
  title = String(_casePick_(out, _C30K_TITLE_) || "").trim(),
  consideration = String(_casePick_(out, [_S10,
        _T38,
        _S7,
        _L2,
        _L11,
        _L5]) || "").trim(),
  petitioners = String(_casePick_(out, [_S3,
        _S9,
        _T53,
        "requester",
        "complainant",
        "proposer",
        "motionProposer",
        _L1,
        _L13,
        _L24]) || "").trim(),
  respondent = String(_casePick_(out, _r42) || "").trim();
  return caseNum ?(out.caseNum = caseNum, out.caseNo = caseNum, out.runningNo = caseNum, out.ลำดับเรื่อง = caseNum): (out.caseNum = "",
    out.caseNo = "", out.runningNo = "", out.ลำดับเรื่อง = ""),
  receiveNo ?(out.receiveNo = receiveNo, out.recNo = receiveNo, out.receiveNoDisplay = receiveNo, out.canonicalReceiveNo = receiveNo,
    out.เลขรับเรื่อง = receiveNo): (out.receiveNo = "", out.recNo = "", out.receiveNoDisplay = "", out.canonicalReceiveNo = "",
    out.เลขรับเรื่อง = ""),
  receiveDateText ?(out.recDate = receiveDateText, out.receiveDate = receiveDateText, out.recDateText = receiveDateText,
    out.receiveDateText = receiveDateText, out.วันที่รับเรื่อง = receiveDateText): (out.recDate = out.recDate || "",
    out.receiveDate = out.receiveDate || "", out.recDateText = out.recDateText || "", out.receiveDateText = out.receiveDateText || "",
    out.วันที่รับเรื่อง = out.วันที่รับเรื่อง || ""),
  title &&(out.title = title, out.subject = out.subject || title, out.ชื่อเรื่อง = title),
  consideration &&(out.caseTitle = consideration, out.considerationTitle = consideration, out[_L2] = consideration),
  petitioners &&(out.petitioners = petitioners, out.petitionerName = out.petitionerName || petitioners,
    out[_L1] = petitioners),
  respondent &&(out.respondent = respondent, out.agencyName = out.agencyName || respondent),
  out.type = "case",
  out.typeLabel = "เรื่องพิจารณา",
  out
}
function _r43() {
  return[_S12,
    "cat",
    "subCat",
    _S23,
    "offerDate",
    "recDate",
    _S28,
    _S3,
    _S18,
    _S33,
    _S37,
    _S32,
    _T37,
    _T4,
    "remark",
    _S7,
    _S31,
    "closedReason",
    _S26,
    _T50,
    "pendingReason",
    _T46,
    "reason",
    _S19,
    "petitionerPhone",
    _S20,
    "caseType",
    "topic",
    _S14,
    "owner",
    "dueDate",
    _S16,
    _S5,
    "meetingStatus",
    _S4,
    _S6,
    "keySummary",
    "sentAgency"]
}
function _caseSearchProjectedFields_() {
  return[_S12,
    "id",
    "cat",
    "caseType",
    "subCat",
    "subCategory",
    "issue",
    "topic",
    _S23,
    _S11,
    _L4,
    _L14,
    _L16,
    "เลขรับเรื่องพิจารณา",
    _T43,
    "เลขรับคำร้อง",
    "เลขรับหนังสือ",
    "เลขทะเบียนรับ",
    _L22,
    "ทะเบียนหนังสือรับ",
    "เลขหนังสือรับ",
    "caseReceiveNo",
    "caseRecNo",
    "receiptNo",
    "receiveNumber",
    "registrationNo",
    "registrationNumber",
    "receiveRegistrationNo",
    "receiveCode",
    "receiveBookNo",
    "bookReceiveNo",
    "petitionReceiveNo",
    "complaintReceiveNo",
    "documentReceiveNo",
    "รับเลขที่",
    "รับที่",
    _S15,
    "offerDate",
    "bookDate",
    "letterDate",
    "dateProposed",
    "proposalDate",
    "proposeDate",
    "proposedDate",
    "submittedDate",
    "submitDate",
    "dateSubmitted",
    "วันที่หนังสือ",
    "วันที่เสนอ",
    "วันที่เสนอเรื่อง",
    "วันเดือนปีที่เสนอ",
    "วันที่ยื่น",
    "วันที่ยื่นเรื่อง",
    "recDate",
    "receiveDate",
    "dateReceive",
    "receiveAt",
    "receivedAt",
    "receiveOn",
    "receivedOn",
    "recDateText",
    "receiveDateText",
    _L15,
    "วันที่รับเรื่อง (พ.ศ.)",
    "วันที่รับเรื่อง(พ.ศ.)",
    "วันที่รับ",
    "วันรับเรื่อง",
    "รับเรื่องวันที่",
    "วันที่ลงรับ",
    "วันที่รับคำร้อง",
    "วันที่",
    "วันเดือนปี",
    "วันที่ (พ.ศ.)",
    "วันที่(พ.ศ.)",
    "date",
    "dateText",
    "recordDate",
    "recordedDate",
    _S28,
    _S20,
    "caseSubject",
    _L9,
    _L19,
    _T12,
    _S7,
    _S10,
    _T38,
    _L2,
    _L11,
    _L5,
    _S3,
    _S9,
    _T53,
    "requester",
    "complainant",
    "proposer",
    "motionProposer",
    _L1,
    _L13,
    _L24,
    _S18,
    _S33,
    "owner",
    _T52,
    "responsibleComm",
    "committeeOwner",
    _T44,
    _S37,
    _T55,
    "operationOfficer",
    "opStaff",
    "operator",
    "responsibleOfficer",
    "operationStaff",
    _S36,
    "officer",
    _S32,
    _S31,
    "accusedAgency",
    "accused",
    "agency",
    _T37,
    "coAssignee",
    "coOwners",
    "coResponsible",
    _T4,
    _S30,
    _S24,
    "remark",
    "note",
    "reason",
    _T46,
    "decisionReason",
    "closedReason",
    "closeReason",
    "terminateReason",
    "stopReason",
    "endReason",
    "caseCloseReason",
    "caseEndReason",
    _S26,
    "rejectReason",
    "notAcceptedReason",
    "notReceiveReason",
    "notAcceptReason",
    "caseRejectReason",
    _S19,
    _T13,
    _T6,
    "เหตุผลการไม่รับเรื่อง",
    "เหตุผลยุติเรื่อง",
    "เหตุผลการยุติเรื่อง",
    _T50,
    "pendingReason",
    "waitReason",
    "waitingReason",
    _T24,
    _T17,
    _T20,
    _T11,
    _T35,
    _T47,
    "committeeMeetings",
    _T56,
    _L7,
    _S27,
    _T49,
    "subcommitteeMeetings",
    _T45,
    _L0,
    "petitionerPhone",
    _S14,
    "dueDate",
    _S16,
    _S5,
    "meetingStatus",
    _S4,
    _S6,
    "keySummary",
    "sentAgency",
    "sendToAgency",
    "sentToAgency",
    "forwardedAgency",
    "forwardAgency",
    "forwardToAgency",
    "sentAgencyName",
    _T27,
    "ส่งให้หน่วยงาน",
    _T26,
    "หน่วยงานที่เกี่ยวข้อง"]
}
/**
 * Return the canonical field set used by case search/report projections.
 */
function _ry() {
  return _caseSearchProjectedFields_()
}

/**
 * Read and canonicalize the MainData projection through one owner.
 */
/**
 * Canonical case-projection helpers.
 *
 * These functions are stateless and shared by search, report, and tracking
 * read models. Keeping them outside the projection reader makes the data-flow
 * explicit and prevents a single 300+ line nested function owner.
 */
function _caseProjectionPickCanonical_(row, keys) {
    return typeof AppBackendCore != "undefined" && AppBackendCore.pickNormalized ? AppBackendCore.pickNormalized(row,
      keys, ""): _casePick_(row, keys)
  }
function _caseProjectionLooksLikeDate_(value) {
    var s = _c30S_(value).trim();
    return!!s &&(Object.prototype.toString.call(value) === "[object Date]" || /^\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:19|20|25)\d{2}$/.test(s) || /^\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}/.test(s) || /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(s) || /GMT|เวลาอินโดจีน|T\d{2}:\d{2}/i.test(s) || /^\d{1,2}\s*(?:ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\s*(?:19|20|25)\d{2}/i.test(s))
  }
function _caseProjectionNormalizeStatusCandidate_(value) {
    var v = _c30S_(value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ").replace(/\s+/g, " ").trim();
    return!v || v === "-" || _caseProjectionLooksLikeDate_(v) ? "": typeof AppBackendCore != "undefined" && AppBackendCore && typeof AppBackendCore.normalizeCaseStatus == "function" ? AppBackendCore.normalizeCaseStatus(v,
      {
        defaultStatus: _L3
      }): _caseNormalizeStatusForDisplay_(v)
  }
function _caseProjectionParseObject_(value) {
    if (value && typeof value == "object" && !_c30A_(value))return value;
    if (typeof value == "string") {
      var s = value.trim();
      if (s.charAt(0) === "{" && s.charAt(s.length - 1) === "}" || s.charAt(0) === "[" && s.charAt(s.length - 1) === "]")try {
        var parsed = JSON.parse(s);
        return parsed && typeof parsed == "object" && !_c30A_(parsed) ? parsed: {
        }
      } catch (e) {
        _c30W_("ec", e)
      }
    }
    return {
    }
  }
function _caseProjectionNormalizeKey_(key) {
    return _c30S_(key).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").replace(/[\s_.-]+/g, "").replace(/[\\/]+/g,
      "/").toLowerCase()
  }
function _caseProjectionReadStatus_(source, keys) {
    source = _caseProjectionParseObject_(source);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (_c30H_(source, k)) {
        var v = _caseProjectionNormalizeStatusCandidate_(source[k]);
        if (v)return v
      }
    }
    var dict = {
    };
    Object.keys(source).forEach(function(k2) {
        dict[_caseProjectionNormalizeKey_(k2)] = source[k2]
      });
    for (var j = 0; j < keys.length; j++) {
      var nk = _caseProjectionNormalizeKey_(keys[j]);
      if (_c30H_(dict, nk)) {
        var x = _caseProjectionNormalizeStatusCandidate_(dict[nk]);
        if (x)return x
      }
    }
    return ""
  }
function _caseProjectionStatus_(row) {
    var raw = _caseProjectionParseObject_((row = row || {
        }).raw || row.__raw || {
      }),
    main = _caseProjectionParseObject_(row.MainData || row.mainData || row.MainData || row.mainData || raw.MainData || raw.mainData || raw.MainData || raw.mainData),
    flat = ["MainData/status",
      "MainData.status",
      "MainData_status",
      "mainData/status",
      "mainData.status",
      "mainData_status",
      "Main Data/status",
      "Main Data.status"],
    mainKeys = [_S18,
      _S17,
      _L23,
      _T18,
      _L20,
      _T25,
      "สถานะพิจารณา",
      _T7],
    direct = _caseProjectionReadStatus_(row, flat) || _caseProjectionReadStatus_(raw, flat) || _caseProjectionReadStatus_(main, mainKeys) || _caseProjectionReadStatus_(_caseProjectionParseObject_(raw.MainData || raw.mainData || raw.MainData || raw.mainData),
      mainKeys);
    if (direct)return direct;
    var normal = _caseProjectionReadStatus_(row, [_S18,
        _S17]) || _caseProjectionReadStatus_(raw, [_S18,
        _S17]);
    if (normal)return normal;
    var statusKeys = [_T18,
      _L20,
      _T25,
      _T7,
      _L23,
      "caseStatus",
      "processStatus",
      "currentStatus",
      "statusText",
      "caseState",
      "workflowStatus",
      "meetingStatus",
      "resultStatus"];
    return _caseProjectionReadStatus_(row, statusKeys) || _caseProjectionReadStatus_(raw, statusKeys) || ""
  }
function _caseProjectionCanonicalRow_(row, index) {
    var caseNum = _rf(_caseProjectionPickCanonical_(row = row || {
        }, _r51) || ""),
    recNo = _re(_caseProjectionPickCanonical_(row, [_S23,
          _S11,
          "receivedNo",
          "caseReceiveNo",
          "caseRecNo",
          "receiptNo",
          "receiveNumber",
          "registrationNo",
          "registrationNumber",
          "receiveRegistrationNo",
          "receiveCode",
          "receiveBookNo",
          "bookReceiveNo",
          "petitionReceiveNo",
          "complaintReceiveNo",
          "documentReceiveNo",
          _L4,
          _L14,
          _L16,
          "เลขรับเรื่องพิจารณา",
          _T43,
          "เลขรับคำร้อง",
          "เลขรับหนังสือ",
          "เลขทะเบียนรับ",
          _L22,
          "ทะเบียนหนังสือรับ",
          "เลขหนังสือรับ",
          "รับเลขที่",
          "รับที่",
          _S15]) || ""),
    title = String(_caseProjectionPickCanonical_(row, [_S28,
          _S20,
          "caseSubject",
          _L9,
          _L19,
          _T12]) || "").trim(),
    caseTitle = String(_caseProjectionPickCanonical_(row, _r63) || "").trim();
    !title && caseTitle &&(title = caseTitle),
    !caseTitle && title &&(caseTitle = title);
    var petitioners = String(_caseProjectionPickCanonical_(row, [_S3,
          _S9,
          _T53,
          "requester",
          "complainant",
          "proposer",
          "motionProposer",
          _L1,
          _L13,
          _L24,
          "ผู้เสนอ"]) || "").trim(),
    respondent = String(_caseProjectionPickCanonical_(row, _r42) || "").trim(),
    sentAgency = String(_caseProjectionPickCanonical_(row, _r48) || "").trim(),
    status = _caseProjectionStatus_(row),
    statusForReason = _caseNormalizeStatusForDisplay_(String(status || _L3).trim()),
    offerDate = String(_caseProjectionPickCanonical_(row, _r114) || "").trim(),
    rawPendingReason = String(_caseProjectionPickCanonical_(row, _r29) || "").trim(),
    rawClosedReason = String(_caseProjectionPickCanonical_(row, _r79) || "").trim(),
    rawRejectionReason = String(_caseProjectionPickCanonical_(row, [_S26,
          "rejectReason",
          "notAcceptedReason",
          "notReceiveReason",
          "notAcceptReason",
          "caseRejectReason",
          _T46,
          "decisionReason",
          "reason",
          _S19,
          _T13,
          _T6,
          "เหตุผลการไม่รับเรื่อง"]) || "").trim(),
    pendingReason = statusForReason === "รอพิจารณา" ? rawPendingReason || rawClosedReason || rawRejectionReason: rawPendingReason,
    reasonGeneric = statusForReason === "รอพิจารณา" ? pendingReason: rawRejectionReason || rawClosedReason || rawPendingReason || "",
    closedReason = rawClosedReason || reasonGeneric || "",
    rejectionReason = rawRejectionReason || rawClosedReason || reasonGeneric || "",
    cat = String(_caseProjectionPickCanonical_(row, ["cat",
          "caseType",
          "type",
          "category",
          _T23,
          _T54]) || "").trim(),
    subCat = String(_caseProjectionPickCanonical_(row, ["subCat",
          "subCategory",
          "issue",
          "topic",
          "issueTitle",
          _T15,
          _T42]) || "").trim(),
    assignees = String(_caseProjectionPickCanonical_(row, [_S33,
          "committeeOwner",
          _T44,
          _T52,
          "responsibleComm",
          _S14,
          "owner",
          _T21,
          "กมธ. รับผิดชอบ",
          _T14,
          "คณะกรรมาธิการรับผิดชอบ",
          "ผู้รับผิดชอบ",
          "ผู้รับผิดชอบหลัก"]) || "").trim(),
    staffs = String(_caseProjectionPickCanonical_(row, [_T55,
          "operationOfficer",
          "opStaff",
          _S37,
          "operator",
          "responsibleOfficer",
          "operationStaff",
          _S36,
          "officer",
          _L8,
          _L8]) || "").trim(),
    coAssignees = String(_caseProjectionPickCanonical_(row, _r37) || "").trim(),
    petitionerPhone = _appPhoneForDisplay_(_caseProjectionPickCanonical_(row, _r11) || ""),
    receiveDateText = _rZ(row),
    id = String(_caseProjectionPickCanonical_(row, [_S12,
          "id",
          "uid",
          "rowId",
          "_id"]) || "").trim() || "MAIN-" + String(row.__rowNumber || index + 2),
    out = _c30O_({
      }, row, {
        caseId: id,
        id: row.id || id,
        caseNum,
        caseNo: caseNum,
        runningNo: caseNum,
        recNo,
        receiveNo: recNo,
        title,
        subject: row.subject || title,
        caseTitle,
        considerationTitle: row.considerationTitle || caseTitle,
        petitioners,
        petitionerName: row.petitionerName || petitioners,
        respondent,
        agencyName: row.agencyName || respondent,
        sentAgency,
        sendToAgency: sentAgency,
        ส่งให้หน่วยงาน: sentAgency,
        status: statusForReason || _L3,
        statusRaw: _s_(status).trim(),
        offerDate,
        dateProposed: offerDate,
        bookDate: offerDate,
        letterDate: row.letterDate || offerDate,
        documentDate: row.documentDate || offerDate,
        วันที่หนังสือ: row.วันที่หนังสือ || offerDate,
        reason: reasonGeneric,
        statusReason: row.statusReason || reasonGeneric,
        decisionReason: row.decisionReason || reasonGeneric,
        closedReason,
        rejectionReason,
        rejectReason: rejectionReason,
        notAcceptedReason: rejectionReason,
        pendingRemark: pendingReason,
        pendingReason,
        waitReason: pendingReason,
        เหตุผลรอพิจารณา: pendingReason,
        เหตุผลรอการพิจารณา: pendingReason,
        หมายเหตุรอพิจารณา: pendingReason,
        "เหตุผล (ไม่รับเรื่อง)": rejectionReason,
        เหตุผล: reasonGeneric,
        petitionerPhone,
        petitionerTel: petitionerPhone,
        phone: petitionerPhone,
        "เบอร์โทรศัพท์ผู้เสนอญัตติ/ผู้ร้อง": petitionerPhone,
        cat,
        caseType: row.caseType || cat,
        subCat,
        subCategory: row.subCategory || subCat,
        assignees,
        owner: row.owner || assignees,
        staffs,
        opStaff: row.opStaff || staffs,
        coAssignees,
        type: "case",
        typeLabel: _L5
      });
    return out.ลำดับเรื่อง = caseNum,
    out.เลขรับเรื่อง = recNo,
    receiveDateText &&(out.recDate = receiveDateText, out.receiveDate = receiveDateText, out.recDateText = receiveDateText,
      out.receiveDateText = receiveDateText, out.วันที่รับเรื่อง = receiveDateText),
    out[_L2] = out[_L2] || caseTitle,
    out[_L1] = out[_L1] || petitioners,
    _appIsFnName_("_caseSearchEnsureReceiveNo_") &&(out = _caseSearchEnsureReceiveNo_(out)),
    out
  }
function _caseProjectionHasIdentity_(row) {
    var caseNum,
    recNo,
    title,
    petitioners,
    score;
    return row = row || {
    },
    (String(_caseProjectionPickCanonical_(row, [_T4,
            _S30,
            _S24,
            _L6]) || "").trim() ? 1: 0) +(String(_caseProjectionPickCanonical_(row, [_S23,
            _S11,
            _L4]) || "").trim() ? 1: 0) +(String(_caseProjectionPickCanonical_(row, [_S28,
            _S20,
            _S7,
            _S10,
            _L9,
            _L2]) || "").trim() ? 1: 0) +(String(_caseProjectionPickCanonical_(row, [_S3,
            _S9,
            _L1]) || "").trim() ? 1: 0) >= 2
  }
function _readCanonicalCaseProjection_(fields, opts) {
  opts = opts || {
  };
  var requested = _c30A_(fields) ? fields.slice(): [];

  

  

  
  try {
    var projectedFields = requested.length ? requested.slice(): _appIsFnName_("_ry") ? _caseSearchProjectedFields_(): [],
    effectiveTtl = opts.forceFresh === !0 || opts.noCache === !0 || opts.bypassCache === !0 ? 0: Math.max(60,
      Math.min(Number(opts.cacheTtlSeconds || opts.ttl || 180) || 180, 300)),
    projectedRows = typeof readSheetProjectedObjectsCached_ == "function" ? readSheetProjectedObjectsCached_(_S2,
      projectedFields, {
        includeDeleted: !1,
        requireCanonical: !1,
        ttl: effectiveTtl,
        batchSize: 500
      }): [];
    if (_c30A_(projectedRows) && projectedRows.length) {
      var canonicalRows = projectedRows.map(function(row, idx) {
          return _caseProjectionCanonicalRow_(_c30O_({
                __rowNumber: idx + 2
              }, row || {
              }), idx)
        }).filter(function(row) {
          var deleted = _s_(row.isDeleted || row.deleted || row.deletedAt || row.ลบ).trim().toLowerCase(); return deleted !== "true" && deleted !== "1" && deleted !== "deleted" && deleted !== "ลบ"
        }),
      identityRows = canonicalRows.filter(_caseProjectionHasIdentity_);
      if (identityRows.length)return canonicalRows = identityRows,
      _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_("MainData.projected.identity",
        canonicalRows.length),
      requested.length &&(canonicalRows = canonicalRows.map(function(row) {
            var out = {
            }; return requested.forEach(function(f) {
                out[f] = row[f] !== void 0 && row[f] !== null ? row[f]: ""
              }),
            _r19.forEach(function(k) {
                out[k] !== void 0 && out[k] !== null && String(out[k]).trim() !== "" || row[k] === void 0 || row[k] === null || String(row[k]).trim() === "" ||(out[k] = row[k])
              }),
            out
          })),
      canonicalRows;
      _c30W_("case.search.projectedRead.emptyIdentity.fullMatrixRead", new Error("PROJECTED_ROWS_WITHOUT_CASE_IDENTITY"))
    }
  } catch (projectedErr) {
    _c30W_("case.search.projectedRead.fullMatrixRead", projectedErr)
  }
  try {
    var sh = typeof getSheet_ == "function" ? getSheet_(_S2): null;
    if (!sh)return[];
    var matrix = typeof getSheetMatrixCached_ == "function" ? getSheetMatrixCached_(sh, 0, {
        allowFullMatrix: !0
      }): typeof getSheetMatrix_ == "function" ? getSheetMatrix_(sh, 0, {
        allowFullMatrix: !0
      }): [];
    if (!_c30A_(matrix) || matrix.length < 2)return[];
    var schema = typeof SHEET_SCHEMAS != "undefined" && SHEET_SCHEMAS && _c30A_(SHEET_SCHEMAS.MainData) ? SHEET_SCHEMAS.MainData: [],
    aliases = typeof SHEET_HEADER_ALIASES != "undefined" && SHEET_HEADER_ALIASES && SHEET_HEADER_ALIASES.MainData ? SHEET_HEADER_ALIASES.MainData: {
    },
    appAliases = typeof getAppFieldAliases_ == "function" ? getAppFieldAliases_(_S2): aliases,
    rawRows,
    rows =(typeof AppBackendCore != "undefined" && AppBackendCore.matrixToObjects ? AppBackendCore.matrixToObjects(matrix,
        {
          schema,
          aliases,
          appAliases,
          normalizeKey: normalizeDirectRowKey_,
          includeDeleted: !1
        }): []).map(function(obj, idx) {
        return _caseProjectionCanonicalRow_(obj, idx)
      });
    return _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_(_S2, rows.length),
    requested.length &&(rows = rows.map(function(row) {
          var out = {
          }; return requested.forEach(function(f) {
              out[f] = row[f] !== void 0 && row[f] !== null ? row[f]: ""
            }),
          _r19.forEach(function(k) {
              out[k] !== void 0 && out[k] !== null && String(out[k]).trim() !== "" || row[k] === void 0 || row[k] === null || String(row[k]).trim() === "" ||(out[k] = row[k])
            }),
          out
        })),
    rows
  } catch (e) {
    return _c30W_("case.directMainData.recDateOwner.failed", e),
    []
  }
}
/**
 * Compatibility alias retained for frozen diagnostics and older internal calls.
 */
function _rp(fields, opts) {
  return _readCanonicalCaseProjection_(fields, opts)
}
function _caseProjectedRows_(fields, ttl) {
  var requested = fields || _caseSearchProjectedFields_(),
  rows = [];
  try {
    rows = _readCanonicalCaseProjection_(requested) || []
  } catch (directErr) {
    _c30W_("case.search.projectedRows.directMainDataRecDate", directErr),
    rows = []
  }
  if (!rows.length) {
    var effectiveTtl = ttl === 0 ? 0: ttl || 180;
    try {
      rows = _rg(_S2, requested, {
          includeDeleted: !1,
          requireCanonical: !1,
          ttl: effectiveTtl
        }) || []
    } catch (e) {
      _c30W_("case.search.projectedRows.sharedRead", e),
      rows = []
    }
  }
  return(_c30A_(rows) ? rows: []).map(_caseSearchEnsureReceiveNo_).filter(function(row) {
      var deleted = _s_(row.isDeleted || row.deleted || row.deletedAt).trim().toLowerCase(); if (deleted === "true" || deleted === "1" || deleted === "deleted" || deleted === "ลบ")return!1; var type = _s_(row.type).trim().toLowerCase(),
      label = _s_(row.typeLabel).trim(); return type !== "letter" && label !== "หนังสือ" && label !== "หนังสือติดตามมติ"
    })
}
function _rh(value) {
  return _c30S_(value).replace(/\s+/g, " ").trim()
}
function _r59(log) {
  log = log || {
  };
  var raw = _rh(log.meetingType || log.committeeType || log.type || log.meetingGroup || log.ประเภทการประชุม || ""),
  sub = _rh(log.subcommitteeName || log.subcommittee || log.subCommitteeName || log.คณะอนุกรรมาธิการ || "");
  return /อนุกรรมาธิการ/.test(raw) || sub ? "คณะอนุกรรมาธิการ": _L7
}
function _r60(log) {
  log = log || {
  };
  function cleanPart(v) {
    return _rh(v).replace(/^ครั้งที่\s*/i, "").replace(/^ครั้งประชุม\s*/i, "").trim()
  }
  var round = cleanPart(log.round || log.meetingRound || log.meetingNo || log.relatedMeetingNo || log.roundNo || log.ครั้งที่ || log.ครั้งที่ประชุม || log.การประชุมครั้งที่ || ""),
  dateRaw = log.date || log.meetingDate || log.relatedMeetingDate || log.dateRaw || log.วันที่ประชุม || log.วันประชุม || "",
  date = _rh(_committeeMeetingDateText_(dateRaw) || dateRaw),
  parts = [];
  return round && parts.push("ครั้งที่ " + round),
  date && parts.push("วันที่ประชุม " + date),
  parts.join(" / ")
}
function _caseMeetingHistoryIndexCurrent_() {
  var idx = {
  };
  function put(key, kind, text) {
    if (key = _rh(key), text = _rh(text), key && text) {
      var slot = idx[key] ||(idx[key] = {
          committee: [],
          subcommittee: []
        }),
      arr = slot[kind] ||(slot[kind] = []);
      arr.indexOf(text) < 0 && arr.push(text)
    }
  }
  var logs = [];
  try {
    logs = _appIsFnName_("_rt") ? _rt(): []
  } catch (_histErr) {
    _c30W_("case.report.meetingHistory.read", _histErr),
    logs = []
  }
  return(_c30A_(logs) ? logs: []).forEach(function(log) {
      log = log || {
      }; try {
        if (_appIsFnName_("isSoftDeletedRow_") && isSoftDeletedRow_(log))return
      } catch (_delErr) {
        _appIgnore_(_delErr, "case.report.meetingHistory.deletedCheck")
      }
      var kind = _r59(log) === "คณะอนุกรรมาธิการ" ? "subcommittee": "committee",
      text = _r60(log); text && [log.caseId,
        log.id,
        log.caseNum,
        log.caseNo,
        log.recNo,
        log.receiveNo,
        log.title,
        log.caseTitle,
        log.considerationTitle,
        log.subject,
        log.note,
        log.summary,
        [log.title,
          log.caseTitle,
          log.considerationTitle].filter(Boolean).join(" ")].forEach(function(k) {
          put(k, kind, text); var compactKey = _rh(k).replace(/[\s ​-‍﻿]/g, ""); compactKey && put(compactKey,
            kind, text)
        })
    }),
  idx
}
function _r1(rows) {
  return _appIsFnName_("_rA") ? _rA(_c30A_(rows) ? rows: []): _c30A_(rows) ? rows: []
}
function _caseReportMatchRows_(payload) {
  payload = payload || {
  };
  var projectedFields = payload.compactReadModel === !0 ? _r43(): _caseSearchProjectedFields_(),
  rows = _appIsFnName_("_rp") ? _readCanonicalCaseProjection_(projectedFields, payload): [];
  rows =(_c30A_(rows) ? rows: []).map(function(row) {
      return _appIsFnName_("_caseSearchEnsureReceiveNo_") ? _caseSearchEnsureReceiveNo_(row || {
        }): row || {
      }
    }),
  payload.includeMeetingHistory === !0 && _appIsFnName_("_r1") &&(rows = _r1(rows));
  var query = _normalizeSearchText_(payload.query || payload.q || payload.keyword || ""),
  reportType = String(payload.reportType || payload.groupType || payload.type || "all").toLowerCase().trim(),
  reportValue = _s_(payload.reportValue || payload.groupValue || payload.value).trim();
  function rowMatchesQuery(r) {
    return!query || [r.caseNum,
      r.recNo,
      r.receiveNo,
      r.title,
      r.subject,
      r.caseTitle,
      r.considerationTitle,
      r.petitioners,
      r.petitionerName,
      r.status,
      r.assignees,
      r.staffs,
      r.coAssignees,
      r.subCat,
      r.cat,
      r.agencyName,
      r.respondent].some(function(v) {
        return _normalizeSearchText_(v).indexOf(query) !== - 1
      })
  }
  function rowMatchesGroup(r) {
    return!reportValue ||(reportType === "cat" ? _s_(r.cat || r.caseType) === reportValue: reportType === "sub" ? _s_(r.subCat || r.subCategory || r.issue) === reportValue: reportType === "comm" ? _s_(r.assignees || r.owner).indexOf(reportValue) !== - 1: reportType === "status" ? _s_(r.status) === reportValue: [r.caseNum,
        r.recNo,
        r.title,
        r.caseTitle,
        r.petitioners,
        r.respondent,
        r.status,
        r.cat,
        r.subCat,
        r.assignees,
        r.staffs,
        r.coAssignees].some(function(v) {
          return _c30S_(v).indexOf(reportValue) !== - 1
        }))
  }
  return rows = rows.filter(rowMatchesQuery).filter(rowMatchesGroup).filter(function(row) {
      var type = _s_(row.type).trim().toLowerCase(),
      label = _s_(row.typeLabel).trim(); return type !== "letter" && label !== "หนังสือ" && label !== "หนังสือติดตามมติ"
    }),
  _appIsFnName_("_requestScopePut_") &&(rows = _requestScopePut_("caseReportRows", "MainData.recDate.directOwner",
      rows) || rows),
  rows.slice()
}
function _uniqueValuesFromRows_(rows, key) {
  rows = _c30A_(rows) ? rows: [];
  var seen = {
  },
  out = [];
  return rows.forEach(function(r) {
      _s_(r && r[key]).split(",").map(function(v) {
          return _s_(v).trim()
        }).filter(Boolean).forEach(function(v) {
          seen[v] ||(seen[v] = 1, out.push(v))
        })
    }),
  out.sort(function(a, b) {
      return a.localeCompare(b, "th")
    }),
  out
}
function _caseSortRowsForSearch_(rows, payload) {
  payload = payload || {
  },
  rows = _c30A_(rows) ? rows: [];
  var sortBy = String(payload.sortBy || _T4).trim() || _T4,
  sortDir = String(payload.sortDir || "asc").toLowerCase() === "desc" ? - 1: 1;
  return rows.slice().sort(function(a, b) {
      function sortValue(row) {
        if (sortBy === "caseNum" || sortBy === "caseNo" || sortBy === "runningNo" || sortBy === "ลำดับเรื่อง") {
          var raw,
          m = String(row &&(row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง) || "").replace(/^'+/,
            "").trim().match(/^\d+/); return m ? Number(m[0]): Number._r115
        }
        if (sortBy === "recNo" || sortBy === "receiveNo" || sortBy === "เลขรับเรื่อง") {
          var rn,
          rm = String(row &&(row.recNo || row.receiveNo || row.เลขรับเรื่อง) || "").replace(/^'+/, "").trim().match(/^\d+/); return rm ? Number(rm[0]): Number._r115
        }
        return row && row[sortBy]
      }
      var av = sortValue(a),
      bv = sortValue(b); return typeof av == "number" && typeof bv == "number" && isFinite(av) && isFinite(bv) && av !== bv ?(av - bv) * sortDir: _c30S_(av).localeCompare(_c30S_(bv),
        "th") * sortDir
    })
}
function _caseBuildSearchIndexSummary_(rows) {
  rows = _c30A_(rows) ? rows: [];
  var byStatus = {
  },
  byType = {
  },
  byFy = {
  },
  recNoCount = 0,
  caseNoCount = 0;
  return rows.forEach(function(row) {
      row = row || {
      }; var status = String(row.status || row.statusText || row.สถานะเรื่อง || _T40).trim() || _T40,
      type = String(row.category || row.caseType || row.typeName || row.ประเภท || _T40).trim() || _T40,
      fy = _s_(row.fy || row.fiscalYear || row.budgetFy || row.ปีงบประมาณ).replace(/[^0-9]/g, "") || _T40; byStatus[status] = Number(byStatus[status] || 0) + 1,
      byType[type] = Number(byType[type] || 0) + 1,
      byFy[fy] = Number(byFy[fy] || 0) + 1,
      _s_(row.recNo || row.receiveNo || row.เลขรับเรื่อง).trim() && recNoCount++,
      _s_(row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง).trim() && caseNoCount++
    }),
  {
    ok: !0,
    modelId: "case-search-index-current",
    totalRecords: rows.length,
    byStatus,
    byType,
    byFiscalYear: byFy,
    recNoCoverage: recNoCount,
    caseNoCoverage: caseNoCount,
    generatedAt: new Date().toISOString()
  }
}
var _ri = "phase3-case-report-read-model-2026-06-30";
function _ra(value) {
  return value == null ? "": Object.prototype.toString.call(value) === "[object Date]" ? isNaN(value.getTime()) ? "": _appIsFnName_("_committeeMeetingDateText_") ? _committeeMeetingDateText_(value): Utilities.formatDate(value,
    Session.getScriptTimeZone() || "Asia/Bangkok", "yyyy-MM-dd"): String(value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g,
    " ").replace(/\s+/g, " ").trim()
}
function _rS(value) {
  return _ra(value).replace(/[๐-๙]/g, function(ch) {
      return String("๐๑๒๓๔๕๖๗๘๙".indexOf(ch))
    })
}
function _rI(value) {
  return _rS(value).toLowerCase().replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\\\.]+/g, "")
}
function _r34(value) {
  return _rS(value).toLowerCase().replace(/[\s\u00A0\u1680\u180E\u2000-\u200F\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF\-–—_()（）\[\]{}:：\/\\\.]+/g,
    "")
}
function _rw(list) {
  var out = [],
  seen = {
  };
  return(_c30A_(list) ? list: []).forEach(function(value) {
      value = _ra(value),
      value && !seen[value] &&(seen[value] = !0, out.push(value))
    }),
  out
}
function _rb(domain, field, fallback) {
  var list = [];
  try {
    typeof AppBackendCore != "undefined" && AppBackendCore.getFieldAliases &&(list = AppBackendCore.getFieldAliases(domain,
        field) || [])
  } catch (_aliasErr) {
    _c30W_("case.report.phase3.alias", _aliasErr, {
        domain,
        field
      })
  }
  return _rw((_c30A_(list) ? list: []).concat(_c30A_(fallback) ? fallback: [field]))
}
function _r103(row, names) {
  row = row || {
  },
  names = _c30A_(names) ? names: [names];
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (_c30H_(row, name)) {
      var value = _ra(row[name]);
      if (value)return value
    }
  }
  var normalized = {
  };
  Object.keys(row).forEach(function(key2) {
      normalized[_rI(key2)] = row[key2]
    });
  for (var j = 0; j < names.length; j++) {
    var key = _rI(names[j]);
    if (_c30H_(normalized, key)) {
      var v = _ra(normalized[key]);
      if (v)return v
    }
  }
  return ""
}
function _r72(headers, names) {
  headers = _c30A_(headers) ? headers: [],
  names = _c30A_(names) ? names: [names];
  var headerMap = {
  };
  headers.forEach(function(h, i) {
      var key = _rI(h); key && headerMap[key] == null &&(headerMap[key] = i)
    });
  for (var n = 0; n < names.length; n++) {
    var want = _rI(names[n]);
    if (want && headerMap[want] != null)return headerMap[want]
  }
  return - 1
}
function _r4(row, index) {
  return index >= 0 ? _ra((row || [])[index]): ""
}
function _caseReportStatusPhase3_(value) {
  return _caseStatusNormalizePhaseD_(value, {
      defaultStatus: _L3,
      warningKey: "case.report.phase3.status"
    })
}
function _r26(row) {
  var marker = _ra(row &&(row.isDeleted || row.deleted || row.ลบ || row.สถานะลบ || "")).toLowerCase(),
  deletedAt = _ra(row &&(row.deletedAt || row.วันที่ลบ || ""));
  return!!deletedAt || /^(true|1|yes|deleted|ลบ)$/i.test(marker)
}
function _rC(value) {
  var m = _rS(value).replace(/^'+/, "").match(/^\d+/);
  return m ? Number(m[0]): Number._r115
}
function _z1(value) {
  return _ra(value).toLowerCase()
}
function _z23(value) {
  return _rw(_ra(value).split(/[\n;,]+/).map(function(x) {
        return _ra(x)
      }).filter(Boolean))
}
function _z24(existing, incoming) {
  return _rw(_z23(existing).concat(_c30A_(incoming) ? incoming: _z23(incoming))).join(`
    `)
}
function _z67(log) {
  log = log || {
  };
  var raw = _ra(log.committeeType || log.meetingType || log.type || log.meetingGroup || log.ประเภทการประชุม || ""),
  sub = _ra(log.subcommitteeName || log.subcommittee || log.subCommitteeName || log.คณะอนุกรรมาธิการ || "");
  return /อนุกรรมาธิการ/.test(raw) || sub ? "subcommittee": "committee"
}
function _z68(log) {
  log = log || {
  };
  function cleanRound(v) {
    return _ra(v).replace(/^ครั้งที่\s*/i, "").replace(/^ครั้งประชุม\s*/i, "").trim()
  }
  var round = cleanRound(log.round || log.meetingRound || log.meetingNo || log.relatedMeetingNo || log.roundNo || log.ครั้งที่ || log.ครั้งที่ประชุม || log.การประชุมครั้งที่ || ""),
  dateRaw = log.date || log.meetingDate || log.relatedMeetingDate || log.dateRaw || log.วันที่ประชุม || log.วันประชุม || "",
  date = "";
  try {
    date = _appIsFnName_("_committeeMeetingDateText_") ? _committeeMeetingDateText_(dateRaw): ""
  } catch (_dateErr) {
    date = ""
  }
  date = _ra(date || dateRaw);
  var parts = [];
  if (round && parts.push("ครั้งที่ " + round), date && parts.push("วันที่ประชุม " + date), !parts.length) {
    var note = _ra(log.summary || log.result || log.note || log.title || "");
    note && parts.push(note)
  }
  return parts.join(" / ")
}
function _z10(row) {
  row = row || {
  };
  var out = [],
  caseId = _ra(row.caseId || row.id || ""),
  caseNum = _ra(row.caseNum || row.caseNo || row.runningNo || row.ลำดับเรื่อง || ""),
  recNo = _ra(row.recNo || row.receiveNo || row.เลขรับเรื่อง || ""),
  title = _ra(row.title || row.caseTitle || row.considerationTitle || row.subject || row.ชื่อเรื่อง || row[_L2] || "");
  function put(prefix, value) {
    value = _r34(value),
    value && out.push(prefix + value)
  }
  return caseId && !/^MAIN-\d+$/i.test(caseId) && !/^ROW-\d+$/i.test(caseId) && put("id:", caseId),
  caseNum && recNo && put("nr:", caseNum + "|" + recNo),
  caseNum && title && put("nt:", caseNum + "|" + title),
  recNo && title && put("rt:", recNo + "|" + title),
  caseNum && put("n:", caseNum),
  recNo && put("r:", recNo),
  title && _r34(title).length >= 8 && put("t:", title),
  _rw(out)
}
function _z42(log) {
  log = log || {
  };
  var seed = {
    caseId: _ra(log.caseId || log.case_id || ""),
    caseNum: _ra(log.caseNum || log.caseNo || log.runningNo || log.ลำดับเรื่อง || ""),
    recNo: _ra(log.recNo || log.receiveNo || log.เลขรับเรื่อง || ""),
    title: _ra(log.title || log.caseTitle || log.considerationTitle || log.subject || log.ชื่อเรื่อง || "")
  },
  bk = _ra(log.phase2BusinessKey || "");
  if (bk) {
    var parts = bk.split("|").map(_ra);
    seed.caseId = seed.caseId || parts[0] || "",
    seed.caseNum = seed.caseNum || parts[1] || "",
    seed.recNo = seed.recNo || parts[2] || "",
    seed.title = seed.title || parts[3] || ""
  }
  return _z10(seed)
}
function _z32() {
  var idx = {
  },
  logs = [];
  try {
    logs = _appIsFnName_("_rt") ? _rt(): []
  } catch (_histErr) {
    _c30W_("case.report.phase3.meetingRead", _histErr),
    logs = []
  }
  function put(key, kind, text, sortKey) {
    if (key = _ra(key), text = _ra(text), !(!key || !text)) {
      var slot = idx[key] ||(idx[key] = {
          committee: [],
          subcommittee: []
        }),
      arr = slot[kind] ||(slot[kind] = []);
      arr.some(function(item) {
          return item.text === text
        }) || arr.push({
          text,
          sortKey: sortKey || text
        })
    }
  }
  return(_c30A_(logs) ? logs: []).forEach(function(log) {
      if (log = log || {
        }, !_r26(log)) {
        var kind = _z67(log),
        text = _z68(log),
        sortKey = [_ra(log.dateRaw || log.date || log.meetingDate || ""),
          _ra(log.round || log.meetingRound || log.meetingNo || ""),
          text].join("|"); text && _z42(log).forEach(function(key) {
            put(key, kind, text, sortKey)
          })
      }
    }),
  Object.keys(idx).forEach(function(key) {
      ["committee",
        _S14].forEach(function(kind) {
          idx[key][kind] =(idx[key][kind] || []).sort(function(a, b) {
              return _s_(a.sortKey).localeCompare(_s_(b.sortKey), "th", {
                  numeric: !0,
                  sensitivity: "base"
                })
            }).map(function(item) {
              return item.text
            })
        })
    }),
  idx
}
function _rA(rows) {
  rows = _c30A_(rows) ? rows: [];
  var idx = _z32(),
  matched = 0;
  return rows = rows.map(function(row) {
      row = row || {
      }; var comm = [],
      sub = []; return _z10(row).forEach(function(key) {
          var slot = idx[key]; slot &&(comm = comm.concat(slot.committee || []), sub = sub.concat(slot.subcommittee || []))
        }),
      comm = _rw(comm),
      sub = _rw(sub),
      (comm.length || sub.length) &&(matched += 1),
      row.committeeHistory = _z24(row.committeeHistory || row.committeeMeeting || row.คณะกรรมาธิการ || "",
        comm),
      row.committeeMeeting = row.committeeHistory,
      row.คณะกรรมาธิการ = row.committeeHistory,
      row.subcommitteeHistory = _z24(row.subcommitteeHistory || row.subcommitteeMeeting || row.คณะอนุกรรมาธิการ || "",
        sub),
      row.subcommitteeMeeting = row.subcommitteeHistory,
      row.คณะอนุกรรมาธิการ = row.subcommitteeHistory,
      row
    }),
  rows._r74 = matched,
  rows
}
function _z25() {
  return {
    caseId: _rb(_T48, _S12, [_S12,
        "id",
        "รหัส",
        "รหัสเรื่อง",
        "รหัสเรื่องพิจารณา"]),
    caseNum: _rb(_T48, _T4, [_L6,
        "ลำดับ",
        _T51,
        "เลขลำดับเรื่อง",
        _T4,
        _S30,
        _S24,
        "orderNo",
        "seq",
        "no"]),
    recNo: _rb(_T48, _S23, [_L4,
        _S15,
        _L14,
        _L16,
        _L22,
        _S23,
        _S11,
        "receivedNo",
        "receiptNo"]),
    recDate: _rb(_T48, "recDate", [_L15,
        "วันที่รับ",
        "วันรับเรื่อง",
        "recDate",
        "receiveDate",
        "receivedDate",
        "dateReceived"]),
    title: _rb(_T48, _S28, [_L9,
        _L19,
        _S20,
        _S28,
        _T12]),
    caseTitle: _rb(_T48, _S7, [_L2,
        _L11,
        _L5,
        _S7,
        _S10]),
    petitioners: _rb(_T48, _S3, [_L1,
        _L13,
        _L24,
        "ผู้ร้องเรียน",
        "ผู้เสนอ",
        _S3,
        _S9,
        "proposer",
        "complainant"]),
    respondent: _rb(_T48, _S32, [_T36,
        "หน่วยงาน / ผู้ถูกร้อง",
        _T16,
        _S32,
        _S31,
        "accusedAgency",
        "agency"]),
    agencyName: _rb(_T48, _S31, [_S21,
        "agency",
        _S31,
        "accusedAgency",
        _T27]),
    sentAgency: ["sentAgency",
      "sendToAgency",
      "sentAgencyName",
      "forwardAgency",
      _T27,
      "ส่งให้หน่วยงาน",
      "หน่วยงานที่เกี่ยวข้อง"],
    assignees: _rb(_T48, _S33, [_T21,
        "กมธ. รับผิดชอบ",
        _T14,
        "คณะกรรมาธิการรับผิดชอบ",
        "ผู้รับผิดชอบ",
        "ผู้รับผิดชอบหลัก",
        _S33,
        "owner",
        _T44,
        "committeeOwner"]),
    coAssignees: _rb(_T48, _T37, ["ผู้ร่วมรับผิดชอบ",
        "ผู้รับผิดชอบร่วม",
        _T37,
        "coOwners",
        "coResponsible",
        _S14]),
    opStaff: _rb(_T48, _S37, [_L8,
        "เจ้าหน้าที่ฝ่ายปฏิบัติการ",
        "opStaff",
        _S37,
        "operationOfficer",
        _T55,
        "officer",
        _S36]),
    cat: _rb(_T48, "cat", [_T23,
        _T54,
        "cat",
        "caseType",
        "category",
        "type"]),
    subCat: _rb(_T48, "subCat", [_T15,
        _T42,
        "หัวข้อประเด็น",
        "subCat",
        "subCategory",
        "issue",
        "topic"]),
    status: _rb(_T48, _S18, [_S17,
        _L23,
        _T7,
        _T18,
        _L20,
        _S18,
        "caseStatus",
        "processStatus",
        "currentStatus"]),
    reason: [_S19,
      "เหตุผลสถานะ",
      "เหตุผลการพิจารณา",
      "reason",
      _T46,
      "decisionReason"],
    pendingRemark: _rb(_T48, _T50, [_T24,
        _T17,
        _T20,
        _T11,
        _T50,
        "pendingReason",
        "waitReason",
        "waitingReason"]),
    rejectionReason: _rb(_T48, _S26, [_T13,
        _T6,
        _S26,
        "rejectReason",
        "notAcceptedReason"]),
    closedReason: _rb(_T48, "closedReason", ["เหตุผลยุติเรื่อง",
        "เหตุผลการยุติเรื่อง",
        "closedReason",
        "closeReason",
        "terminateReason"]),
    sentAgencyReason: ["sentAgencyReason",
      "sendAgencyReason",
      "sendReason",
      "forwardReason",
      "transferReason",
      "เหตุผลส่งหน่วยงาน",
      "เหตุผลการส่งหน่วยงาน",
      "เหตุผลที่ส่งหน่วยงาน"],
    committeeHistory: [_L7,
      _T35,
      _T47,
      "committeeMeetings",
      _T56],
    subcommitteeHistory: [_L0,
      _S27,
      _T49,
      "subcommitteeMeetings",
      _T45],
    updatedAt: [_S5,
      "แก้ไขล่าสุด"],
    createdAt: [_S16,
      "วันที่สร้าง"],
    isDeleted: [_S4,
      "deleted",
      "ลบ",
      "สถานะลบ"],
    deletedAt: [_S6,
      "วันที่ลบ"]
  }
}
function _z40(raw, rowNumber, headers, indexes) {
  var fields = _z25(),
  source = null;
  function pick(field) {
    return source ? _r103(source, fields[field] || [field]): _r4(raw, indexes[field])
  }
  raw && typeof raw == "object" && !_c30A_(raw) &&(source = raw);
  var rawStatus = pick(_S18),
  status = _caseReportStatusPhase3_(rawStatus),
  reason = pick("reason"),
  pendingReason = pick(_T50),
  closedReason = pick("closedReason"),
  rejectionReason = pick(_S26),
  sentAgencyReason = pick("sentAgencyReason");
  status === "รอพิจารณา" && !pendingReason &&(pendingReason = reason),
  status === "ยุติเรื่อง" && !closedReason &&(closedReason = reason),
  status === "ไม่รับเรื่อง" && !rejectionReason &&(rejectionReason = reason),
  status === "ส่งหน่วยงาน" && !sentAgencyReason &&(sentAgencyReason = reason);
  var caseNum = pick(_T4),
  recNo = pick(_S23),
  recDate = pick("recDate"),
  title = pick(_S28),
  caseTitle = pick(_S7),
  displayTitle = title || caseTitle,
  respondent = pick(_S32) || pick(_S31),
  id = pick(_S12) || "MAIN-" + _s_(rowNumber),
  statusReason = status === "รอพิจารณา" ? pendingReason: status === "ไม่รับเรื่อง" ? rejectionReason: status === "ยุติเรื่อง" ? closedReason: status === "ส่งหน่วยงาน" ? sentAgencyReason: "",
  row = {
    id,
    caseId: id,
    seq: Number(rowNumber || 1) - 1,
    __rowNumber: rowNumber || "",
    caseNo: caseNum,
    caseNum,
    runningNo: caseNum,
    recNo,
    receiveNo: recNo,
    recDate,
    recDateText: recDate,
    receiveDate: recDate,
    receiveDateText: recDate,
    title: displayTitle,
    subject: displayTitle,
    caseTitle: caseTitle || displayTitle,
    considerationTitle: caseTitle || displayTitle,
    petitioners: pick(_S3),
    petitionerName: pick(_S3),
    respondent,
    agency: respondent,
    agencyName: respondent,
    sentAgency: pick("sentAgency"),
    sendToAgency: pick("sentAgency"),
    assignees: pick(_S33),
    owner: pick(_S33),
    coAssignees: pick(_T37),
    coOwners: pick(_T37),
    opStaff: pick("opStaff"),
    operationOfficer: pick("opStaff"),
    staffs: pick("opStaff"),
    cat: pick("cat"),
    caseType: pick("cat"),
    subCat: pick("subCat"),
    subCategory: pick("subCat"),
    committeeHistory: pick(_T35),
    committeeMeeting: pick(_T35),
    subcommitteeHistory: pick(_S27),
    subcommitteeMeeting: pick(_S27),
    status,
    statusRaw: rawStatus,
    reason: statusReason || reason || pendingReason || closedReason || rejectionReason || sentAgencyReason,
    pendingRemark: pendingReason,
    pendingReason,
    closedReason,
    rejectionReason,
    sentAgencyReason,
    statusReason: statusReason || reason,
    decisionReason: statusReason || reason,
    updatedAt: pick(_S5),
    createdAt: pick(_S16),
    type: "case",
    typeLabel: _L5
  };
  return row.ลำดับเรื่อง = row.caseNum,
  row.เลขรับเรื่อง = row.recNo,
  row.วันที่รับเรื่อง = row.recDateText,
  row.ชื่อเรื่อง = row.title,
  row[_L2] = row.considerationTitle,
  row[_L1] = row.petitioners,
  row.ผู้ถูกร้อง = row.respondent,
  row.คณะกรรมาธิการ = row.committeeHistory,
  row.คณะอนุกรรมาธิการ = row.subcommitteeHistory,
  row.สถานะ = row.status,
  row.เหตุผล = row.reason,
  row.reportColumns = {
    caseNo: row.caseNo,
    recNo: row.recNo,
    recDateText: row.recDateText,
    title: row.title,
    considerationTitle: row.considerationTitle,
    committeeHistory: row.committeeHistory || "",
    subcommitteeHistory: row.subcommitteeHistory || "",
    petitioners: row.petitioners,
    respondent: row.respondent,
    assignees: row.assignees,
    coAssignees: row.coAssignees,
    status: row.status,
    reason: row.reason || ""
  },
  row
}
function _z58(payload) {
  payload = payload || {
  };
  var rows = [];
  try {
    var sh = typeof getSheet_ == "function" ? getSheet_(_S2): null;
    if (!sh)return[];
    var matrix = typeof getSheetMatrix_ == "function" ? getSheetMatrix_(sh, 0, {
        allowFullMatrix: !0
      }): sh.getDataRange().getValues();
    if (!_c30A_(matrix) || matrix.length < 2)return[];
    var headers =(matrix[0] || []).map(_ra),
    fields = _z25(),
    idx = {
    };
    Object.keys(fields).forEach(function(field) {
        idx[field] = _r72(headers, fields[field])
      });
    for (var r = 1; r < matrix.length; r++) {
      var raw = matrix[r] || [];
      if (raw.some(function(cell) {
            return!!_ra(cell)
          })) {
        var deletionProbe = {
          isDeleted: _r4(raw, idx.isDeleted),
          deletedAt: _r4(raw, idx.deletedAt)
        };
        _r26(deletionProbe) || rows.push(_z40(raw, r + 1, headers, idx))
      }
    }
  } catch (e) {
    _c30W_("case.report.phase3.readMain", e),
    rows = []
  }
  return rows
}
function _z37(row, payload) {
  payload = payload || {
  },
  row = row || {
  };
  var q = _ra(payload.query || payload.q || payload.keyword || "").toLowerCase(),
  reportType = _ra(payload.reportType || payload.groupType || payload.type || "all").toLowerCase(),
  reportValue = _ra(payload.reportValue || payload.groupValue || payload.value || "");
  if (q) {
    var hay = [row.caseNo,
      row.caseNum,
      row.recNo,
      row.receiveNo,
      row.recDateText,
      row.title,
      row.subject,
      row.considerationTitle,
      row.caseTitle,
      row.petitionerName,
      row.petitioners,
      row.respondent,
      row.agency,
      row.agencyName,
      row.assignees,
      row.owner,
      row.coOwners,
      row.coAssignees,
      row.opStaff,
      row.operationOfficer,
      row.staffs,
      row.committeeHistory,
      row.subcommitteeHistory,
      row.status,
      row.cat,
      row.subCat,
      row.reason,
      row.pendingReason,
      row.pendingRemark].join(" ").toLowerCase();
    if (hay.indexOf(q) < 0)return!1
  }
  if (reportType && reportType !== "all" && reportValue) {
    var field = reportType === "cat" ? row.cat: reportType === "sub" ? row.subCat: reportType === "comm" ? row.assignees: reportType === "status" ? row.status: "";
    if (reportType === "status") {
      if (_caseReportStatusPhase3_(field) !== _caseReportStatusPhase3_(reportValue))return!1
    } else if (reportType === "comm") {
      if (_ra(field).indexOf(reportValue) < 0)return!1
    } else if (_ra(field) !== reportValue)return!1
  }
  return!0
}
function _z31(rows, payload) {
  payload = payload || {
  };
  var sortBy = _ra(payload.sortBy || _T4) || _T4,
  desc = _ra(payload.sortDir || "asc").toLowerCase() === "desc";
  return(_c30A_(rows) ? rows: []).slice().sort(function(a, b) {
      var av,
      bv; if (sortBy === "caseNum" || sortBy === "caseNo" || sortBy === "runningNo" ?(av = _rC(a &&(a.caseNum || a.caseNo || a.runningNo)),
          bv = _rC(b &&(b.caseNum || b.caseNo || b.runningNo))): sortBy === "recNo" || sortBy === "receiveNo" ?(av = _rC(a &&(a.recNo || a.receiveNo)),
          bv = _rC(b &&(b.recNo || b.receiveNo))): (av = _z1(a && a[sortBy]), bv = _z1(b && b[sortBy])),
        av !== bv)return(av > bv ? 1: - 1) *(desc ? - 1: 1); var ar = Number(a && a.__rowNumber || 0) || 0,
      br = Number(b && b.__rowNumber || 0) || 0; return ar !== br ? ar - br: _z1(a && a.recNo).localeCompare(_z1(b && b.recNo),
        "th", {
          numeric: !0,
          sensitivity: "base"
        })
    })
}
function _rX(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  includeMeetingHistory = payload.includeMeetingHistory === !0,
  noPage = payload.noPage === !0 || payload.fullList === !0 || payload.serverPaged === !1,
  requestedLimit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, noPage ? 5e3: 100)),
  page = Math.max(1, Number(payload.page || 1) || 1),
  allowCache = payload.forceFresh !== !0 && payload.noCache !== !0 && payload.bypassCache !== !0,
  cacheScope = {
    q: _ra(payload.query || payload.q || payload.keyword || "").toLowerCase(),
    reportType: _ra(payload.reportType || payload.groupType || payload.type || "all").toLowerCase(),
    reportValue: _ra(payload.reportValue || payload.groupValue || payload.value || ""),
    sortBy: _ra(payload.sortBy || _T4),
    sortDir: _ra(payload.sortDir || "asc"),
    page: noPage ? 1: page,
    limit: requestedLimit,
    includeMeetingHistory: includeMeetingHistory ? 1: 0,
    noPage: noPage ? 1: 0,
    mainStamp: _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1",
    meetingStamp: includeMeetingHistory && _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("meeting"): "0",
    model: _ri
  },
  cacheKey = "case_report_read_model_phase3_" +(_appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(JSON.stringify(cacheScope)): String(cacheScope.page) + "_" + String(cacheScope.limit));
  if (allowCache && _appIsFnName_("_cacheGetJson_")) {
    var hit = _cacheGetJson_(cacheKey);
    if (hit && typeof hit == "object")return hit.cacheHit = !0,
    hit.cacheStatus = "hit",
    hit.durationMs = Math.max(0, Date.now() - started),
    hit
  }
  var allRows = _z58(payload),
  rowsRead = allRows.length,
  meetingMatched = 0;
  includeMeetingHistory &&(allRows = _rA(allRows), meetingMatched = Number(allRows._r74 || 0) || 0);
  var filtered = allRows.filter(function(row) {
      return _z37(row, payload)
    });
  filtered = _z31(filtered, payload);
  var totalRecords = filtered.length,
  pageSize = noPage ? Math.max(1, Math.min(Number(payload.maxRows || payload.limit || totalRecords || 5e3) || 5e3,
      5e3)): requestedLimit,
  totalPages = noPage ? 1: Math.max(1, Math.ceil(totalRecords / pageSize)),
  safePage = noPage ? 1: Math.max(1, Math.min(page, totalPages)),
  start = noPage ? 0: (safePage - 1) * pageSize,
  outRows = noPage ? filtered.slice(0, pageSize): filtered.slice(start, start + pageSize),
  res = {
    ok: !0,
    rows: outRows,
    data: outRows,
    items: outRows,
    totalRecords,
    total: totalRecords,
    page: safePage,
    limit: pageSize,
    pageSize,
    totalPages,
    columns: typeof AppBackendCore != "undefined" && AppBackendCore.reportColumns ? AppBackendCore.reportColumns(): [],
    owner: "CaseDomain.searchCases",
    source: "CaseReportReadModel.phase3",
    readModel: _ri,
    serverPaged: !noPage,
    serverFiltered: !0,
    rowsRead,
    returnedRows: outRows.length,
    durationMs: Math.max(0, Date.now() - started),
    cacheHit: !1,
    cacheStatus: allowCache ? "miss": "bypass",
    meetingHistoryAttached: includeMeetingHistory,
    meetingHistoryMatchedRows: meetingMatched,
    meta: {
      source: "CaseReportReadModel.phase3",
      sourceOfTruth: _T32,
      readModelOwner: "Code_30_Domain_Cases._rX",
      serverPaged: !noPage,
      serverFiltered: !0,
      rowsRead,
      returnedRows: outRows.length,
      durationMs: Math.max(0, Date.now() - started),
      includeMeetingHistory,
      meetingHistoryMatchedRows: meetingMatched,
      phase3Stamp: _ri
    }
  };
  if (typeof AppBackendCore != "undefined" && AppBackendCore.normalizeCaseSearchResponse &&(res = AppBackendCore.normalizeCaseSearchResponse(res)),
    allowCache && _appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(cacheKey, res, Math.max(30, Math.min(Number(payload.cacheTtlSeconds || 120) || 120,
          300)))
  } catch (_putErr) {
    _c30W_("case.report.phase3.cachePut", _putErr)
  }
  return res
}
function _z39(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  model = _Y(_c30O_({
      }, payload, {
        noPage: !0,
        fullList: !0,
        serverPaged: !1,
        includeMeetingHistory: !1,
        limit: 5e3,
        pageSize: 5e3,
        _r134: "reportOptions",
        __route: "CaseDomain.getReportOptions",
        source: "case-report-options-phase4"
      })),
  rows = _c30A_(model.rows) ? model.rows: [];
  function values(key) {
    var seen = {
    },
    out = [];
    return rows.forEach(function(row) {
        _ra(row && row[key] || "").split(",").map(_ra).filter(Boolean).forEach(function(v) {
            seen[v] ||(seen[v] = 1, out.push(v))
          })
      }),
    out.sort(function(a, b) {
        return a.localeCompare(b, "th")
      })
  }
  return {
    filteredTotal: rows.length,
    reportType: String(payload.reportType || "all"),
    query: _s_(payload.query || payload.q || payload.keyword),
    cat: values("cat"),
    sub: values("subCat"),
    comm: values(_S33),
    status: values(_S18),
    generatedAt: new Date().toISOString(),
    source: "CaseReportFacets.phase4",
    readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
    cacheHit: !!model.cacheHit,
    cacheStatus: model.cacheStatus || "bypass",
    rowsRead: Number(model.rowsRead || rows.length || 0),
    durationMs: Math.max(0, Date.now() - started),
    meta: {
      source: "CaseReportFacets.phase4",
      readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
      domainOwner: "CaseDomain"
    }
  }
}
function _z97(payload) {
  return payload = payload || {
  },
  typeof AppDataService != "undefined" && AppDataService && AppDataService.readCaseSearchModel ? AppDataService.readCaseSearchModel(payload): _rX(payload)
}
function _z89(payload) {
  return _z39(payload || {
    })
}
AppDomain.Repositories = AppDomain.Repositories || {
};
var PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP = "phaseF-dashboard-status-read-model-current";
function _z() {
  return "dashboard-status-count-s0-default-current-phaseF-read-model-2026-07-05"
}
function _z63() {
  return {
    s0: _L3,
    s8: _T22,
    s2: "อนุฯ พิจารณา",
    s3: _L18,
    s4: "กมธ. พิจารณา",
    s6: _T28,
    s5: _T26,
    s7: "จัดทำรายงาน"
  }
}
function _dashboardStatusReadModelPhaseF_(rows) {
  rows = _c30A_(rows) ? rows: [];
  var labels = _z63(),
  counts = {
  },
  unknownStatus = 0;
  Object.keys(labels).forEach(function(key) {
      counts[key] = 0
    });
  rows.forEach(function(row) {
      var key = _dashboardCaseStatusKey_(_z80(row || {
          })); _c30H_(labels, key) ? counts[key] = _x(counts[key]) + 1: unknownStatus++
    });
  var statusRows = Object.keys(labels).map(function(key) {
      return {
        key: key,
        label: labels[key],
        count: _x(counts[key])
      }
    }),
  statusRowsTotal = statusRows.reduce(function(sum, row) {
      return sum + _x(row && row.count)
    }, 0);
  unknownStatus &&(statusRows.push({
        key: "unknown",
        label: "ไม่ระบุสถานะ",
        count: unknownStatus
      }), statusRowsTotal += unknownStatus);
  return {
    stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    statusCountStamp: _z(),
    dashboardStatusCountStamp: _z(),
    source: "DashboardStatusReadModel.PhaseF",
    sourceRowCount: rows.length,
    statusRows: statusRows,
    statusRowsTotal: statusRowsTotal,
    counts: counts,
    unknownStatus: unknownStatus,
    defaultBlankToS0: !0,
    labels: labels,
    generatedAt: new Date().toISOString()
  }
}
function _phaseFDashboardStatusReadModelContract_() {
  return _cm_({
      ok: !0,
      stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      owner: "DashboardDomain.statusReadModel",
      singleSource: "_dashboardStatusReadModelPhaseF_",
      statusCountStamp: _z(),
      sourceRowCountRequired: !0,
      frontendRemapDisabled: !0,
      snapshotStampRequired: !0,
      apiNamesPreserved: !0,
      noNewFiles: !0,
      uiDomChanged: !1,
      businessLogicChanged: !1
    })
}
function _z22(reason) {
  return {
    total: 0,
    pending: 0,
    completed: 0,
    overdueLetters: 0,
    soonOverdue: 0,
    s0: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    s5: 0,
    s6: 0,
    s7: 0,
    s8: 0,
    meetings: {
      total: 0,
      recent: 0,
      byResult: []
    },
    byType: [],
    byTopic: [],
    statusRows: [],
    statusCountStamp: _z(),
    dashboardStatusCountStamp: _z(),
    statusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    dashboardStatusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    statusReadModel: {
      stamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      sourceRowCount: 0,
      statusRows: [],
      statusRowsTotal: 0
    },
    sourceRowCount: 0,
    statusSourceRowCount: 0,
    generatedAt: new Date().toISOString(),
    degraded: !!reason,
    errorCode: reason ? "DASHBOARD_STATS_DEGRADED": ""
  }
}
function _z49(stats) {
  function hasList(list) {
    return _c30A_(list) && list.some(function(x) {
        return Number(x &&(x.count || x.total || x.value) || 0) > 0
      })
  }
  var letters =(stats = stats || {
    }).letters || {
  },
  meetings = stats.meetings || {
  };
  return Number(stats.total || stats.totalCases || 0) > 0 || hasList(stats.byType) || hasList(stats.byTopic) || hasList(stats.statusRows) || Number(letters.total || 0) > 0 || Number(meetings.total || 0) > 0
}
function _X(reason) {
  return {
    fy: _appIsFnName_("_currentBudgetFyString_") ? _currentBudgetFyString_(): "",
    totalBudget: 0,
    totalPaid: 0,
    totalRemain: 0,
    byPlan: [],
    plans: [],
    rows: [],
    statusSummary: {
      refund: {
        total: 0,
        pending: 0
      },
      report: {
        total: 0,
        pending: 0
      }
    },
    generatedAt: new Date().toISOString(),
    degraded: !!reason,
    errorCode: reason ? "DASHBOARD_BUDGET_DEGRADED": ""
  }
}
function _z0(value) {
  return value == null ? "": Object.prototype.toString.call(value) === "[object Date]" ? isNaN(value.getTime()) ? "": value.toISOString(): String(value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g,
    " ").replace(/\s+/g, " ").trim()
}
function _z30(value) {
  var txt = _z0(value);
  if (!txt)return "";
  var compact = txt.replace(/[\s\u00A0\u1680\u180E\u2000-\u200F\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF]/g,
    "");
  return!compact || compact === "-" || compact === "\u2014" || compact === "\u2013" || compact === "_" || compact === "." || compact === "\u2026" || /^null$/i.test(compact) || /^undefined$/i.test(compact) || /^n\/?a$/i.test(compact) || /^na$/i.test(compact) ? "": txt
}
function _z64(row) {
  return _z30((row = row || {
      }).title)
}
function _z91(value) {
  return _appThaiDateText_(value)
}
function _x(value) {
  var n = Number(String(value == null ? 0: value).replace(/,/g, ""));
  return isFinite(n) ? n: 0
}
function _dashboardDate_(value) {
  return _caseDateOnlyPhaseD2_(value)
}
function _z46(sheetName) {
  var map;
  return({
      MainData: [_S12,
        "id",
        _T4,
        _S23,
        _S28,
        _S7,
        _S3,
        _S9,
        "cat",
        "subCat",
        "issue",
        "topic",
        _S20,
        _S18,
        "caseStatus",
        "processStatus",
        "resultStatus",
        "currentStatus",
        "statusText",
        "caseState",
        "workflowStatus",
        "meetingStatus",
        "caseType",
        "type",
        "category",
        "caseCategory",
        "subjectType",
        "topicName",
        "considerIssue",
        "caseIssue",
        "caseSubject",
        _L23,
        _T7,
        _S17,
        "สถานะพิจารณา",
        _T18,
        _L20,
        _T25,
        _T23,
        _T54,
        _T15,
        _T42,
        _S5,
        _S16,
        _S4,
        _S6],
      Letters: ["letterId",
        _S12,
        "letterNo",
        "bookNo",
        "letterDate",
        _S20,
        "issue",
        "dueDate",
        "extendDate",
        "letterStatus",
        _S18,
        "trackStatus",
        _S5,
        _S16,
        _S4,
        _S6],
      CommitteeMeetings: [_S34,
        "id",
        "meetingNo",
        "meetingNumber",
        "no",
        "roundNo",
        _S22,
        "ครั้งประชุม",
        "การประชุมครั้งที่",
        _T31,
        "date",
        _L12,
        "วันประชุม",
        _S28,
        "หัวข้อ",
        _L19,
        _S18,
        _S17,
        "note",
        "หมายเหตุ",
        _S16,
        _S5,
        _S4,
        _S6],
      CommitteeMeetingAgendaItems: ["itemId",
        "id",
        _S34,
        "agendaNo",
        "agenda",
        "วาระ",
        _S28,
        _S7,
        _L9,
        _L19,
        _L5,
        _S12,
        "agencyOrPresenter",
        _S21,
        "ผู้เสนอ",
        _S39,
        _T29,
        "มติ",
        "note",
        "หมายเหตุ",
        _S16,
        _S5,
        _S4,
        _S6]
    }
    [_s_(sheetName)] || []).slice()
}
function _z99(sheetName, options) {
  options = options || {
  },
  sheetName = _s_(sheetName).trim();
  var ttl = Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)),
  errors = [];
  function note(label, err) {
    var msg = label + ": " + String(err && err.message ? err.message: err || "unknown");
    errors.push(msg);
    try {
      _c30W_("dashboard.cg.projected." + label + "." + sheetName, err)
    } catch (_e) {
      _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") && _logWarn_("ec",
        {
          error: String(_e && _e.message || _e)
        })
    }
  }
  var clean = _r123;
  function _r123(list) {
    return(list = _c30A_(list) ? list: []).filter(function(row) {
        return row && !(typeof isSoftDeletedRow_ == "function" ? isSoftDeletedRow_(row): row.isDeleted === !0 || _s_(row.isDeleted).toLowerCase() === "true" || row.deletedAt)
      })
  }
  function done(list) {
    return clean(list)
  }
  try {
    if (_appIsFnName_("_r126")) {
      var rows = done(_r126(sheetName, null) || []);
      if (rows.length)return rows
    }
  } catch (_dashRowsErr) {
    note("rowsCached", _dashRowsErr)
  }
  try {
    if (sheetName === "MainData" && _appIsFnName_("_listMainDataRows_")) {
      var caseRows = done(_listMainDataRows_(!1) || []);
      if (caseRows.length)return caseRows
    }
    if (sheetName === "Letters" && _appIsFnName_("_r2")) {
      var letterRows = done(_r2() || []);
      if (letterRows.length)return letterRows
    }
  } catch (_domainRowsErr) {
    note("domainProjectedRows", _domainRowsErr)
  }
  try {
    if (typeof readSheetProjectedObjectsCached_ == "function") {
      var fields = _z46(sheetName);
      if (fields && fields.length) {
        var projectedRows = done(readSheetProjectedObjectsCached_(sheetName, fields, {
              includeDeleted: !1,
              requireCanonical: !1,
              ttl
            }) || []);
        if (projectedRows.length)return projectedRows
      }
    }
  } catch (_projectedErr) {
    note("projectedReader", _projectedErr)
  }
  if (errors.length && options.failOnError === !0)throw new Error("DASHBOARD_PROJECTED_ROWS_FAILED: " + sheetName + ": " + errors.join(" | "));
  return[]
}
function _z2(sheetName, options) {
  options = options || {
  },
  sheetName = _s_(sheetName).trim();
  var cacheKey = JSON.stringify({
      sheetName,
      ttl: Math.max(15, Math.min(Number(options.ttl || 60) || 60, 300)),
      failOnError: options.failOnError === !0,
      allowEmpty: options.allowEmpty === !0
    });
  try {
    if (_appIsFnName_("_requestScopeGet_")) {
      var hit = _requestScopeGet_("dashboardSafeRows", cacheKey);
      if (hit && _c30A_(hit.rows))return hit.rows.slice()
    }
  } catch (_requestHitErr) {
    _c30W_("dashboard.requestRows.hit." + sheetName, _requestHitErr)
  }
  var started = Date.now(),
  rows = _z99(sheetName, options),
  entry = {
    rows: (rows = _c30A_(rows) ? rows: []).slice(),
    meta: {
      sheetName,
      rowsRead: rows.length,
      durationMs: Math.max(0, Date.now() - started),
      source: "dashboard-request-scope-current"
    }
  };
  try {
    _appIsFnName_("_requestScopePut_") && _requestScopePut_("dashboardSafeRows", cacheKey, entry)
  } catch (_requestPutErr) {
    _c30W_("dashboard.requestRows.put." + sheetName, _requestPutErr)
  }
  return rows.slice()
}
function _dashboardNormalizeCaseStatusForCount_(status) {
  return _caseStatusNormalizePhaseD_(status, {
      defaultStatus: _L3,
      strict: !0,
      warningKey: "dashboard.status.normalize"
    })
}
function _z80(row) {
  if (!row)return _L3;
  if (typeof row != "object" || _c30A_(row))return _dashboardNormalizeCaseStatusForCount_(row);
  try {
    if (_appIsFnName_("_r102")) {
      var picked = _r102(row);
      if (picked)return _dashboardNormalizeCaseStatusForCount_(picked)
    }
  } catch (_pickErr) {
    _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _pickErr): _appIsFnName_("_logWarn_") && _logWarn_("ec",
      {
        error: String(_pickErr && _pickErr.message || _pickErr)
      })
  }
  for (var keys = [_L23,
      _T7,
      _S17,
      "สถานะพิจารณา",
      _T18,
      _L20,
      _T25,
      "caseStatus",
      _S18,
      "processStatus",
      "resultStatus",
      "currentStatus",
      "statusText",
      "caseState",
      "workflowStatus",
      "meetingStatus",
      "colStatus",
      "col10",
      "col11",
      "col12"], i = 0; i < keys.length; i++) {
    var value = row[keys[i]];
    if (value != null && String(value).trim())return _dashboardNormalizeCaseStatusForCount_(value)
  }
  return _L3
}
function _dashboardCaseStatusKey_(status) {
  var raw = _dashboardNormalizeCaseStatusForCount_(status),
  compact = _z0(raw).replace(/\s+/g, "");
  return!compact ? "s0": /จัดทำรายงาน|รายงาน/.test(compact) ? "s7": /ไม่รับเรื่อง|ไม่รับ/.test(compact) ? "s8": /ยุติ|ปิดเรื่อง|เสร็จสิ้น|สำเร็จ/.test(compact) ? "s6": /ส่ง.*หน่วยงาน|หน่วยงาน.*เกี่ยวข้อง|ติดตาม/.test(compact) ? "s5": /(อนุฯ|อนุกรรมาธิการ|คณะอนุกรรมาธิการ)/.test(compact) ? "s2": /(กมธ|กรรมาธิการ|คณะกรรมาธิการ)/.test(compact) ? "s4": /รอ|รอบรรจุ|ค้างพิจารณา/.test(compact) ? "s3": /เรื่องเข้าใหม่|ได้รับเรื่อง|เรื่องใหม่|รับเรื่อง|รับเข้า|^รับ$/.test(compact) ? "s0": "s0"
}
function _z84(map, limit) {
  return Object.keys(map || {
    }).map(function(label) {
      return {
        label,
        count: _x(map[label])
      }
    }).filter(function(x) {
      return x.count > 0
    }).sort(function(a, b) {
      return b.count - a.count || _s_(a.label).localeCompare(_s_(b.label), "th")
    }).slice(0, Math.max(1, Number(limit || 10) || 10))
}
function _z105(row) {
  var raw = _z0((row = row || {
      }).cat || row.caseType || row.type || row.category || row.caseCategory || row.subjectType || row.ประเภทเรื่อง || row.ประเภท || row.col2);
  if (!raw)return "ไม่ระบุประเภท";
  var compact = raw.replace(/\s+/g, "");
  return /ร้องเรียน|ผู้ร้อง|ร้องทุกข์/.test(compact) ? "เรื่องร้องเรียน": /ประธานสภา/.test(compact) ? "ประธานสภาผู้แทนราษฎรมอบหมาย": /สภาผู้แทนราษฎร/.test(compact) && /มอบหมาย/.test(compact) ? "สภาผู้แทนราษฎรมอบหมาย": /กรรมาธิการ/.test(compact) && /ญัตติ/.test(compact) ? "กรรมาธิการเสนอญัตติ": raw
}
function _z101(row) {
  var raw = _z0((row = row || {
      }).subCat || row.subCategory || row.ประเด็นพิจารณา || row.ประเด็น || row.issue || row.topic || row.topicName || row.considerIssue || row.caseIssue || row.col3 || row.col7);
  return raw ? raw.length > 70 ? raw.substring(0, 70) + "\u2026": raw: "ไม่ระบุประเด็น"
}
function _z54(row) {
  var meetingNo = _z0((row = row || {
      }).meetingNo || "");
  return meetingNo ? meetingNo = meetingNo.replace(/^\s*(ครั้งที่|ครั้งประชุม)\s*/, "").replace(/\s+/g,
    " ").trim(): ""
}
function _z47(row) {
  var meetingNo = _z54(row);
  return meetingNo ? "meetingNo:" + meetingNo: ""
}
function _z71(row) {
  return _z47(row = row || {
    })
}
function _z74(row) {
  return _z30((row = row || {
      }).title || row.caseTitle || row.subject || "")
}
function _Z(rows) {
  rows = _c30A_(rows) ? rows: [];
  var cutoff = new Date;
  cutoff.setDate(cutoff.getDate() - 30),
  cutoff.setHours(0, 0, 0, 0);
  var sessionMap = {
  },
  recentSessionMap = {
  },
  titleCount = 0;
  rows.forEach(function(row) {
      var sessionKey = _z71(row = row || {
        }); sessionKey &&(sessionMap[sessionKey] = !0); var d = _dashboardDate_(row.meetingDate || row.date || row.วันที่ประชุม || row.updatedAt || row.createdAt); d && d >= cutoff && sessionKey &&(recentSessionMap[sessionKey] = !0),
      _z74(row) && titleCount++
    });
  var totalMeetings = Object.keys(sessionMap).length,
  recent = Object.keys(recentSessionMap).length;
  return {
    total: totalMeetings,
    totalMeetings,
    meetingCount: totalMeetings,
    recent,
    recentMeetings: recent,
    totalItems: titleCount,
    itemTotal: titleCount,
    totalCasesDiscussed: titleCount,
    subjectCount: titleCount,
    byResult: [],
    generatedAt: new Date().toISOString(),
    source: "dashboard-current-meetingNo-title-strict"
  }
}
function _z33(payload) {
  payload = payload || {
  };
  var ttl = payload.forceFresh === !0 ? 0: payload.cacheTtlSeconds || 60,
  includeRows = payload.includeMeetingRows === !0,
  meetings = _z2(_S25, {
      ttl,
      failOnError: !1,
      allowEmpty: !0
    }).filter(function(row) {
      return!(row &&(row.isDeleted === !0 || _s_(row.isDeleted).toLowerCase() === "true"))
    }),
  meetingMap = {
  };
  includeRows && meetings.forEach(function(meeting) {
      meeting = meeting || {
      },
      meetingMap[_s_(meeting.meetingId)] = meeting
    });
  var rows = [],
  itemCount = 0;
  _z2(_S8, {
      ttl,
      failOnError: !1,
      allowEmpty: !0
    }).forEach(function(item) {
      if ((item = item || {
          }).isDeleted !== !0 && _s_(item.isDeleted).toLowerCase() !== "true" && !item.deletedAt) {
        var title = _z64(item); if (title &&(itemCount++, includeRows)) {
          var meeting = meetingMap[_s_(item.meetingId)] || {
          }; rows.push({
              meetingId: _s_(item.meetingId),
              meetingNo: _z0(meeting.meetingNo || ""),
              meetingDate: _z91(meeting.meetingDate || ""),
              title,
              agencyOrPresenter: _z0(item.agencyOrPresenter || ""),
              agendaNo: _z0(item.agendaNo || item.agenda || ""),
              source: "CommitteeMeetingAgendaItems.title.nonblank"
            })
        }
      }
    });
  var summary = _Z(meetings);
  return summary.totalItems = itemCount,
  summary.itemTotal = itemCount,
  summary.totalCasesDiscussed = itemCount,
  summary.subjectCount = itemCount,
  summary.source = "dashboard-committee-meetingNo-title-nonblank-strict-current",
  summary.meetingItemSource = "CommitteeMeetingAgendaItems.title.nonblank",
  {
    rows,
    meetingRows: includeRows ? meetings: [],
    summary
  }
}
function _z85(value) {
  if (!value && value !== 0)return null;
  try {
    if (value instanceof Date) {
      var direct = new Date(value.getFullYear(), value.getMonth(), value.getDate());
      return direct.setHours(0, 0, 0, 0),
      direct
    }
    var text = _c30S_(value).replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
    if (!text)return null;
    var m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) {
      var y = Number(m[1]);
      y > 2400 &&(y -= 543);
      var d1 = new Date(y, Number(m[2]) - 1, Number(m[3]));
      if (!isNaN(d1.getTime()))return d1.setHours(0, 0, 0, 0),
      d1
    }
    if (m = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)) {
      var yy = Number(m[3]);
      yy < 100 &&(yy += 2500),
      yy > 2400 &&(yy -= 543);
      var d2 = new Date(yy, Number(m[2]) - 1, Number(m[1]));
      if (!isNaN(d2.getTime()))return d2.setHours(0, 0, 0, 0),
      d2
    }
    var d = new Date(text);
    return isNaN(d.getTime()) ? null: (d.getFullYear() > 2400 &&(d = new Date(d.getFullYear() - 543,
          d.getMonth(), d.getDate())), d.setHours(0, 0, 0, 0), d)
  } catch (_dateErr) {
    return _c30W_("dashboard.letter.dateOnly", _dateErr),
    null
  }
}
function _z75(status) {
  var st = _z0(status).replace(/\s+/g, "");
  return /ได้รับแล้ว|ได้รับตอบกลับแล้ว|ตอบกลับแล้ว|ตอบแล้ว|เสร็จสิ้น|เสร็จ|รายงานแล้ว/.test(st)
}
function _z87(rows) {
  rows = _c30A_(rows) ? rows: [];
  var today = new Date;
  today.setHours(0, 0, 0, 0);
  var out = {
    total: rows.length,
    notDue: 0,
    overdue: 0,
    received: 0,
    soonDue: 0
  };
  return rows.forEach(function(row) {
      var status; if (_z75((row = row || {
            }).letterStatus || row.status || row.trackStatus || row.สถานะ || row.สถานะหนังสือ || ""))return out.received++,
      void 0; var due = _z85(row.extendDate || row.ขยายเวลา || row.วันที่ขยายเวลา || row.dueDate || row.วันครบกำหนดตอบ || row.ครบกำหนด || row.กำหนดตอบ || row.วันครบกำหนด); if (!due)return out.notDue++,
      void 0; var diff = Math.round((due.getTime() - today.getTime()) / 864e5); if (diff <= 0)return out.overdue++,
      void 0; diff <= 7 && out.soonDue++,
      out.notDue++
    }),
  out
}
function _dashboardStatsDirect_(payload) {
  var caseRows = _z2(_S2, {
      ttl: (payload = payload || {
        }).cacheTtlSeconds || 60,
      failOnError: !0,
      allowEmpty: !0
    }),
  letterRows = _z2(_T30, {
      ttl: payload.cacheTtlSeconds || 60,
      failOnError: !0,
      allowEmpty: !0
    }),
  committeeMeetingDashboard = _z33(payload || {
    }),
  meetingRows = _c30A_(committeeMeetingDashboard.rows) ? committeeMeetingDashboard.rows: [],
  meetingNoRows = _c30A_(committeeMeetingDashboard.meetingRows) ? committeeMeetingDashboard.meetingRows: [],
  stats = _z22("dashboard-direct-current");
  stats.degraded = !1,
  stats.errorCode = "",
  stats.total = caseRows.length;
  var statusReadModel = _dashboardStatusReadModelPhaseF_(caseRows),
  typeMap = {
  },
  topicMap = {
  };
  Object.keys(statusReadModel.counts || {
    }).forEach(function(key) {
      stats[key] = _x(statusReadModel.counts[key])
    });
  caseRows.forEach(function(row) {
      row = row || {
      }; var typeName = _z105(row),
      topic = _z101(row); typeMap[typeName] =(typeMap[typeName] || 0) + 1,
      topicMap[topic] =(topicMap[topic] || 0) + 1
    }),
  stats.byType = _z84(typeMap, 20),
  stats.byTopic = _z84(topicMap, 10),
  stats.statusRows = statusReadModel.statusRows,
  stats.statusCountStamp = statusReadModel.statusCountStamp,
  stats.dashboardStatusCountStamp = statusReadModel.dashboardStatusCountStamp,
  stats.statusReadModelStamp = PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
  stats.dashboardStatusReadModelStamp = PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
  stats.statusDefaultBlankToS0 = !0,
  stats.statusRowsTotal = statusReadModel.statusRowsTotal,
  stats.sourceRowCount = statusReadModel.sourceRowCount,
  stats.statusSourceRowCount = statusReadModel.sourceRowCount,
  stats.statusUnknownCount = statusReadModel.unknownStatus,
  stats.statusReadModel = statusReadModel,
  stats.completed = _x(stats.s6) + _x(stats.s7) + _x(stats.s8),
  stats.pending = Math.max(stats.total - stats.completed, 0),
  stats.letters = _z87(letterRows),
  stats.overdueLetters = _x(stats.letters.overdue),
  stats.soonOverdue = _x(stats.letters.soonDue),
  stats.meetings = committeeMeetingDashboard.summary || _Z(meetingNoRows),
  stats.meetings.totalItems = _x(stats.meetings.totalItems || stats.meetings.itemTotal || meetingRows.length),
  stats.meetings.itemTotal = stats.meetings.totalItems,
  stats.meetings.totalCasesDiscussed = stats.meetings.totalItems,
  stats.meetings.subjectCount = stats.meetings.totalItems,
  stats.meetings.totalMeetings = _x(stats.meetings.totalMeetings || stats.meetings.total || 0),
  stats.meetings.meetingCount = stats.meetings.totalMeetings,
  stats.meetings.total = stats.meetings.totalMeetings,
  stats.meetings.recentMeetings = _x(stats.meetings.recentMeetings || stats.meetings.recent || 0),
  stats.meetings.recent = stats.meetings.recentMeetings,
  stats.meetings.source = "dashboard-current-CommitteeMeetings-meetingNo-title-nonblank-only",
  stats.meetings.strictKpi = !0,
  stats.meetings.archivedDirectRead = !1,
  stats.totalMeetings = _x(stats.meetings.totalMeetings),
  stats.recentMeetings = _x(stats.meetings.recentMeetings || stats.meetings.recent),
  stats.meetingItemTotal = _x(stats.meetings.totalItems || stats.meetings.itemTotal || stats.meetings.totalCasesDiscussed || stats.meetings.subjectCount);
  var includeCaseRowsForDashboard = payload.includeCases === !0,
  includeMeetingRowsForDashboard = payload.includeMeetingRows === !0;
  stats.caseRows = includeCaseRowsForDashboard ? caseRows.slice(0, Math.max(1, Math.min(Number(payload.caseLimit || 30) || 30,
        120))): [],
  stats.letterRows = payload.includeLetters === !0 ? letterRows.slice(0, 100): [],
  stats.meetingRows = includeMeetingRowsForDashboard ? meetingRows.slice(0, 100): [],
  stats.meetingNoRows = includeMeetingRowsForDashboard ? meetingNoRows.slice(0, 100): [],
  stats.generatedAt = new Date().toISOString();
  var requestMetrics = typeof getRequestScopeMetrics_ == "function" ? getRequestScopeMetrics_(): {
  };
  return stats.meta = {
    generatedAt: stats.generatedAt,
    source: "dashboard-current-strict-kpi-direct",
    dashboardKpiStrict: !0,
    statusReadModelStamp: PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
    statusCountStamp: _z(),
    statusSourceRowCount: stats.sourceRowCount,
    statusRowsTotal: stats.statusRowsTotal,
    performanceMode: payload && payload.phase1FirstPaint ? "phase1-summary-kpi-first-paint": "phase5-summary-kpi-first-paint",
    meetingSource: "CommitteeMeetings.meetingNo",
    meetingItemSource: "CommitteeMeetingAgendaItems.title.nonblank-strict",
    archivedMeetingLogsDirectRead: !1,
    cases: caseRows.length,
    letters: letterRows.length,
    meetings: meetingNoRows.length,
    meetingItems: meetingRows.length,
    caseRowsIncluded: includeCaseRowsForDashboard,
    meetingRowsIncluded: includeMeetingRowsForDashboard,
    cacheHit: !(!requestMetrics || !requestMetrics.cacheHit),
    cacheHits: Number(requestMetrics && requestMetrics.cacheHits || 0),
    cacheMisses: Number(requestMetrics && requestMetrics.cacheMisses || 0),
    rowsRead: Number(requestMetrics && requestMetrics.rowsRead || 0),
    cacheKinds: requestMetrics && requestMetrics.cacheKinds || {
    }
  },
  stats.source = "dashboard-current-strict-kpi-direct",
  stats
}
function _z102(payload) {
  return _dashboardStatsDirect_(payload || {
    })
}
function _z5(stats, budgetData, caseData, cacheMeta) {
  budgetData = budgetData || {
  },
  caseData = caseData || {
    rows: [],
    totalRecords: 0,
    totalPages: 1,
    page: 1,
    limit: 0
  },
  cacheMeta = cacheMeta || {
  };
  var statsMeetingSummary =(stats = stats || {
    }).meetings && typeof stats.meetings == "object" ? stats.meetings: {
  },
  strictMeetingRows = _c30A_(stats.meetingNoRows) && stats.meetingNoRows.length ? stats.meetingNoRows: _c30A_(stats.meetingRows) ? stats.meetingRows: [],
  strictMeetingSummary = strictMeetingRows.length ? _Z(strictMeetingRows): {
    total: _x(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings),
    totalMeetings: _x(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings),
    meetingCount: _x(statsMeetingSummary.totalMeetings || statsMeetingSummary.meetingCount || statsMeetingSummary.total || stats.totalMeetings),
    recent: _x(statsMeetingSummary.recentMeetings || statsMeetingSummary.recent || stats.recentMeetings),
    recentMeetings: _x(statsMeetingSummary.recentMeetings || statsMeetingSummary.recent || stats.recentMeetings)
  },
  strictAgendaItemTotal = _x(stats.meetingItemTotal || statsMeetingSummary.totalItems || statsMeetingSummary.itemTotal || statsMeetingSummary.totalCasesDiscussed || statsMeetingSummary.subjectCount);
  stats.meetings && stats.meetings.strictKpi === !0 &&(strictAgendaItemTotal = _x(stats.meetings.totalItems || stats.meetings.itemTotal || stats.meetingItemTotal || strictAgendaItemTotal));
  var summary = {
    totalCases: Number(stats.total || 0),
    pendingCases: Number(stats.pending || 0),
    completedCases: Number(stats.completed || 0),
    overdueLetters: Number(stats.overdueLetters || 0),
    soonOverdue: Number(stats.soonOverdue || 0),
    totalMeetings: Number(strictMeetingSummary.totalMeetings || strictMeetingSummary.meetingCount || strictMeetingSummary.total || 0),
    recentMeetings: Number(strictMeetingSummary.recentMeetings || strictMeetingSummary.recent || 0),
    meetingItemTotal: Number(strictAgendaItemTotal || 0)
  },
  canonicalMeetingStats = _c30O_({
      total: summary.totalMeetings,
      totalMeetings: summary.totalMeetings,
      meetingCount: summary.totalMeetings,
      recent: summary.recentMeetings,
      recentMeetings: summary.recentMeetings,
      totalItems: summary.meetingItemTotal,
      itemTotal: summary.meetingItemTotal,
      totalCasesDiscussed: summary.meetingItemTotal,
      byResult: []
    }, stats.meetings || {
    });
  canonicalMeetingStats.total = summary.totalMeetings,
  canonicalMeetingStats.totalMeetings = summary.totalMeetings,
  canonicalMeetingStats.meetingCount = summary.totalMeetings,
  canonicalMeetingStats.recent = summary.recentMeetings,
  canonicalMeetingStats.recentMeetings = summary.recentMeetings,
  canonicalMeetingStats.totalItems = summary.meetingItemTotal,
  canonicalMeetingStats.itemTotal = summary.meetingItemTotal,
  canonicalMeetingStats.totalCasesDiscussed = summary.meetingItemTotal,
  canonicalMeetingStats.meetingRows = _c30A_(stats.meetingRows) ? stats.meetingRows.slice(0, 500): [],
  canonicalMeetingStats.meetingNoRows = _c30A_(stats.meetingNoRows) ? stats.meetingNoRows.slice(0, 500): [];
  var dto = {
    contractStamp: "dashboard-canonical-dto-production-current",
    summary,
    caseStats: {
      total: summary.totalCases,
      pending: summary.pendingCases,
      completed: summary.completedCases,
      statusRows: _c30A_(stats.statusRows) ? stats.statusRows: [],
      statusReadModelStamp: stats.statusReadModelStamp || PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
      statusCountStamp: stats.statusCountStamp || _z(),
      sourceRowCount: Number(stats.sourceRowCount || stats.statusSourceRowCount || summary.totalCases || 0),
      statusRowsTotal: Number(stats.statusRowsTotal || 0),
      rows: _c30A_(caseData.rows) ? caseData.rows: [],
      totalRecords: Number(caseData.totalRecords || summary.totalCases || 0),
      page: Number(caseData.page || 1),
      limit: Number(caseData.limit || 0)
    },
    typeStats: _c30A_(stats.byType) ? stats.byType: [],
    issueStats: _c30A_(stats.byTopic) ? stats.byTopic: [],
    trackingStats: stats.letters || {
      total: 0,
      notDue: 0,
      overdue: 0,
      received: 0,
      soonDue: 0
    },
    meetingStats: canonicalMeetingStats,
    budgetStats: budgetData,
    charts: {
      byStatus: _c30A_(stats.statusRows) ? stats.statusRows: [],
      byType: _c30A_(stats.byType) ? stats.byType: [],
      byIssue: _c30A_(stats.byTopic) ? stats.byTopic: [],
      byMeetingResult: []
    },
    meta: _c30O_({
      }, stats.meta || {
      }, cacheMeta || {
      }, {
        generatedAt: new Date().toISOString(),
        source: stats.meta && stats.meta.source || "dashboard-canonical-dto-production-current",
        statusReadModelStamp: stats.statusReadModelStamp || PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP,
        statusCountStamp: stats.statusCountStamp || _z(),
        statusSourceRowCount: Number(stats.sourceRowCount || stats.statusSourceRowCount || summary.totalCases || 0),
        noSilentEmpty: !0
      })
  };
  return dto.errorState = dto.meta.errorCode ? {
    code: dto.meta.errorCode,
    message: dto.meta.message || ""
  }
  : null,
  dto
}
function _z76(payload) {
  var defaultTtl = _appIsFnName_("_appCacheTtl_") ? _appCacheTtl_("dashboardBundle", 240, 15, 300): 240;
  return Math.max(15, Math.min(Number(payload && payload.cacheTtlSeconds || defaultTtl) || defaultTtl,
      300))
}
function _z81(payload, stats, budget, cacheTtlSeconds) {
  payload = payload || {
  };
  var includeCases = payload.includeCases === !0,
  includeMeetingRows = payload.includeMeetingRows === !0,
  scopedCaseLimit = includeCases ? Math.max(10, Math.min(Number(payload.caseLimit || 30) || 30, 120)): 0,
  caseRows = includeCases ? _c30A_(stats.caseRows) ? stats.caseRows.slice(0, scopedCaseLimit): _z2(_S2,
    {
      ttl: cacheTtlSeconds,
      failOnError: !0,
      allowEmpty: !0
    }).slice(0, scopedCaseLimit): [],
  budgetData = budget && budget.data ? budget.data: budget || {
  };
  return {
    caseData: {
      rows: caseRows,
      totalRecords: Number(stats.total || caseRows.length || 0),
      totalPages: 1,
      page: 1,
      limit: scopedCaseLimit
    },
    caseRows,
    budgetData,
    includeCases,
    includeMeetingRows
  }
}
function _z92(stats, subBundles) {
  if (stats = stats || {
    }, subBundles = subBundles || {
    }, subBundles.includeCases !== !1 && subBundles.includeMeetingRows !== !1)return stats;
  var slim = _c30O_({
    }, stats);
  return subBundles.includeCases === !1 &&(slim.caseRows = [], slim.letterRows = []),
  subBundles.includeMeetingRows === !1 &&(slim.meetingRows = [], slim.meetingNoRows = []),
  slim.meta = _c30O_({
    }, stats.meta || {
    }, {
      dashboardFastFirstPaint: !0,
      caseRowsOmitted: subBundles.includeCases === !1,
      letterRowsOmitted: subBundles.includeCases === !1,
      meetingRowsOmitted: subBundles.includeMeetingRows === !1,
      rowPayloadMode: "summary-kpi-payload-phase5",
      routerFacadeOnly: !0
    }),
  slim
}
function _z95(startedAt, cacheKey, source) {
  var bundleMetrics = typeof getRequestScopeMetrics_ == "function" ? getRequestScopeMetrics_(): {
  };
  return {
    cached: !1,
    cacheStatus: "miss",
    cacheHit: !(!bundleMetrics || !bundleMetrics.cacheHit),
    cacheHits: Number(bundleMetrics && bundleMetrics.cacheHits || 0),
    cacheMisses: Number(bundleMetrics && bundleMetrics.cacheMisses || 0),
    rowsRead: Number(bundleMetrics && bundleMetrics.rowsRead || 0),
    durationMs: Math.max(0, Date.now() - startedAt),
    cacheKey,
    source: source || "dashboard-bundle-request-scope-current"
  }
}
function _z65(stats, subBundles, bundleMeta, cacheKey) {
  subBundles = subBundles || {
  };
  var caseRows = _c30A_(subBundles.caseRows) ? subBundles.caseRows: [],
  caseData = subBundles.caseData || {
    rows: caseRows
  },
  budgetData = subBundles.budgetData || {
  },
  payloadStats = _z92(stats, subBundles),
  dashboardDto = _z5(payloadStats, budgetData, caseData, bundleMeta);
  return {
    dashboardDto,
    contractStamp: dashboardDto.contractStamp,
    caseStats: dashboardDto.caseStats,
    typeStats: dashboardDto.typeStats,
    issueStats: dashboardDto.issueStats,
    trackingStats: dashboardDto.trackingStats,
    meetingStats: dashboardDto.meetingStats,
    charts: dashboardDto.charts,
    stats: payloadStats,
    summaryStats: payloadStats,
    budget: budgetData,
    budgetStats: budgetData,
    cases: caseData,
    rows: caseRows,
    letters: payloadStats.letters || {
    },
    meetings: payloadStats.meetings || {
    },
    meetingSummary: payloadStats.meetings || {
    },
    meetingRows: _c30A_(payloadStats.meetingRows) ? payloadStats.meetingRows: [],
    meetingNoRows: _c30A_(payloadStats.meetingNoRows) ? payloadStats.meetingNoRows: [],
    summary: {
      totalCases: Number(payloadStats.total || 0),
      pendingCases: Number(payloadStats.pending || 0),
      completedCases: Number(payloadStats.completed || 0),
      overdueLetters: Number(payloadStats.overdueLetters || 0),
      soonOverdue: Number(payloadStats.soonOverdue || 0),
      totalMeetings: Number(dashboardDto.summary && dashboardDto.summary.totalMeetings || 0),
      recentMeetings: Number(dashboardDto.summary && dashboardDto.summary.recentMeetings || 0),
      meetingItemTotal: Number(dashboardDto.summary && dashboardDto.summary.meetingItemTotal || 0)
    },
    quickCounts: {
      total: Number(payloadStats.total || 0),
      byStatus: payloadStats.statusRows || [],
      byType: payloadStats.byType || [],
      byTopic: payloadStats.byTopic || [],
      generatedAt: new Date().toISOString()
    },
    generatedAt: new Date().toISOString(),
    meta: _c30O_({
      }, payloadStats.meta || {
      }, bundleMeta),
    cached: !1,
    cacheStatus: "miss",
    cacheKey
  }
}
function _y(err, stage) {
  var msg = String(err &&(err.error || err.message || err.msg) || err || "").toLowerCase(),
  st = String(stage || "dashboard").toLowerCase();
  return /ไม่พบ\s*token|missing[-\s_]*token|no\s*token|token\s*การใช้งาน/.test(msg) ? "DASHBOARD_AUTH_MISSING": /session\s*หมดอายุ|expired[-\s_]*session|session\s*expired|invalid\s*session|หมดอายุ/.test(msg) ? "DASHBOARD_SESSION_EXPIRED": /สิทธิ์ไม่เพียงพอ|permission|forbidden|unauthori[sz]ed|access\s*denied/.test(msg) ? "DASHBOARD_PERMISSION_DENIED": /cache/.test(st) || /cache/.test(msg) ? "DASHBOARD_CACHE_READ_FAILED": /budget/.test(st) ? "_r88": /sheet|spreadsheet|range|readsheet|ชีต|แผ่นงาน|ไม่พบชีต|rows|row/.test(msg) || /stats|case|letter|meeting|subbundle/.test(st) ? "DASHBOARD_SHEET_READ_FAILED": /dto|normalize|bundle|build/.test(st) ? "_r76": "DASHBOARD_BUNDLE_FAILED"
}
function _z9(code, err) {
  var raw = String(err &&(err.message || err.error || err.msg) || err || "").trim();
  return code === "DASHBOARD_AUTH_MISSING" ? "Dashboard โหลดข้อมูลไม่สำเร็จ: ไม่พบ token การใช้งาน": code === "DASHBOARD_SESSION_EXPIRED" ? "Dashboard โหลดข้อมูลไม่สำเร็จ: session หมดอายุ กรุณาเข้าสู่ระบบใหม่": code === "DASHBOARD_PERMISSION_DENIED" ? "Dashboard โหลดข้อมูลไม่สำเร็จ: สิทธิ์ไม่เพียงพอ": code === "DASHBOARD_CACHE_READ_FAILED" ? "Dashboard โหลดข้อมูลต่อจาก cache ไม่สำเร็จ ระบบจะโหลดข้อมูลใหม่": code === "_r88" ? "Dashboard โหลดข้อมูลงบประมาณไม่สำเร็จ": code === "DASHBOARD_SHEET_READ_FAILED" ? "Dashboard อ่านข้อมูลจากชีตไม่สำเร็จ": code === "_r76" ? "Dashboard สร้างชุดข้อมูลไม่สำเร็จ": raw || "Dashboard โหลดข้อมูลไม่สำเร็จ"
}
function _V(payload, code, err, stage, extra) {
  var now = new Date().toISOString(),
  message = _z9(code, err),
  stats = _z22("dash2-" + String(code || "dashboard").toLowerCase());
  stats.meta = _c30O_({
    }, stats.meta || {
    }, {
      degraded: !0,
      dashboardErrorCode: code,
      errorCode: code,
      errorStage: String(stage || "dashboard"),
      message,
      generatedAt: now,
      owner: "DASH-2:dashboard-error-code"
    }, extra || {
    });
  var data = {
    stats,
    summaryStats: stats,
    budget: _X("dash2-" + String(code || "dashboard").toLowerCase()),
    budgetStats: _X("dash2-" + String(code || "dashboard").toLowerCase()),
    cases: {
      rows: []
    },
    rows: [],
    meetings: {
    },
    meetingSummary: {
    },
    generatedAt: now,
    meta: _c30O_({
        degraded: !0,
        dashboardErrorCode: code,
        errorCode: code,
        errorStage: String(stage || "dashboard"),
        message,
        generatedAt: now,
        owner: "DASH-2:dashboard-error-code"
      }, extra || {
      })
  };
  data.dashboardDto = _z5(stats, data.budgetStats, data.cases, data.meta),
  data.dashboardDto.meta = _c30O_({
    }, data.dashboardDto.meta || {
    }, data.meta || {
    });
  var out = err_(message, data);
  return out.errorCode = code,
  out.dashboardErrorCode = code,
  out.errorStage = String(stage || "dashboard"),
  out.requestId = _s_(payload && payload.requestId),
  out
}
function _J(label, err, meta) {
  try {
    _appIsFnName_("_logApiFailure_") && _logApiFailure_(label, err, meta || {
      })
  } catch (_dash2LogErr) {
    try {
      _c30W_("dashboard.dash2.log", _dash2LogErr)
    } catch (_ignore) {
      _ignore && String(_ignore)
    }
  }
}
var DASHBOARD_BUDGET_LAZY_LOAD_STAMP_PHASEE = "dashboard-budget-lazy-owner-phase4-single-budget-domain-2026-07-04-r1";
function _dashboardBudgetFromBudgetDomainPhaseE_(payload) {
  return payload = _c30O_({
    }, payload || {
    }, {
      __phaseEDashboardBudgetHydration: !0,
      source: String(payload && payload.source || "dashboard-budget-domain-owner-phase4"),
      cacheTtlSeconds: Math.max(30, Math.min(Number(payload && payload.cacheTtlSeconds || 60) || 60,
          180))
    }),
  typeof BudgetDomain != "undefined" && BudgetDomain && typeof BudgetDomain.getDashboardSummaryForDashboard == "function" ? BudgetDomain.getDashboardSummaryForDashboard(payload): ok_(_X("phase4-budget-domain-owner-unavailable"),
    "ข้ามการโหลดงบประมาณ: BudgetDomain ยังไม่พร้อม")
}
function _z78(payload) {
  (payload = payload || {
    }).includeBudget = payload.includeBudget === !0,
  payload.includeCases = payload.includeCases !== !1,
  payload.hotPathMode = String(payload.hotPathMode || "dashboard-initial-single-bundle");
  var bundleStartedAt = Date.now(),
  sess,
  cacheTtlSeconds,
  cacheKey;
  try {
    sess = requireAuth_(payload, "viewer")
  } catch (authErr) {
    var authCode = _y(authErr, "auth");
    return _J("dashboard.bundle.auth.failure", authErr, {
        method: "apiGetDashboardBundle",
        requestId: payload && payload.requestId || "",
        errorCode: authCode
      }),
    _V(payload, authCode, authErr, "auth")
  }
  try {
    if (cacheTtlSeconds = _z76(payload), cacheKey = "dash_bundle_phaseF_status_read_model_v9_" + _dashboardBundleCacheKey_(payload,
        sess), payload.forceFresh !== !0)try {
      var cachedBundle = _cacheGetJson_(cacheKey);
      if (cachedBundle && _z49(cachedBundle.stats || cachedBundle.summaryStats || {
          }))return cachedBundle.cached = !0,
      cachedBundle.cacheStatus = "hit",
      cachedBundle.cacheKey = cacheKey,
      cachedBundle.meta = _c30O_({
        }, cachedBundle.meta || {
        }, {
          cached: !0,
          cacheStatus: "hit",
          cacheHit: !0,
          cacheKey,
          durationMs: Math.max(0, Date.now() - bundleStartedAt),
          rowsRead: 0,
          source: "dashboard-bundle-cache-current",
          dashboardErrorCode: "",
          errorCode: ""
        }),
      cachedBundle.dashboardDto ? cachedBundle.dashboardDto.meta = _c30O_({
        }, cachedBundle.dashboardDto.meta || {
        }, cachedBundle.meta || {
        }): cachedBundle.dashboardDto = _z5(cachedBundle.stats || cachedBundle.summaryStats || {
        }, cachedBundle.budgetStats || cachedBundle.budget || {
        }, cachedBundle.cases || {
          rows: cachedBundle.rows || []
        }, cachedBundle.meta),
      ok_(cachedBundle, "โหลด dashboard bundle สำเร็จ")
    } catch (cacheErr) {
      var cacheCode = _y(cacheErr, "cache-read");
      _J("dashboard.bundle.cache.read.failure", cacheErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: cacheCode,
          cacheKey
        }),
      payload._r16 = cacheCode
    }
    var stats;
    try {
      stats = _z102(payload)
    } catch (statsErr) {
      var statsCode = _y(statsErr, "stats-sheet-read");
      return _J("dashboard.bundle.stats.failure", statsErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: statsCode
        }),
      _V(payload, statsCode, statsErr, "stats-sheet-read")
    }
    var budgetResult;
    try {
      budgetResult = payload.includeBudget === !0 ? _dashboardBudgetFromBudgetDomainPhaseE_(payload): ok_({
        }, "ข้ามการโหลดงบประมาณเพื่อให้ Dashboard first paint แสดงผลเร็ว")
    } catch (budgetErr) {
      var budgetCode = _y(budgetErr, "budget-read");
      _J("dashboard.bundle.budget.failure", budgetErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: budgetCode
        }),
      budgetResult = err_(_z9(budgetCode, budgetErr), _X("dash2-budget-read-failed")),
      budgetResult.errorCode = budgetCode
    }
    var subBundles;
    try {
      subBundles = _z81(payload, stats, budgetResult, cacheTtlSeconds)
    } catch (subErr) {
      var subCode = _y(subErr, "subbundle-sheet-read");
      return _J("dashboard.bundle.subbundle.failure", subErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: subCode
        }),
      _V(payload, subCode, subErr, "subbundle-sheet-read")
    }
    var bundleMeta = _z95(bundleStartedAt, cacheKey, "dashboard-bundle-request-scope-current");
    bundleMeta.includeBudget = payload.includeBudget === !0,
    bundleMeta.includeCases = payload.includeCases === !0,
    bundleMeta.hotPathMode = payload.hotPathMode || "dashboard-initial-single-bundle",
    bundleMeta.initialSingleBundle = !0,
    bundleMeta.dataLoadingPerformance = /^phase1-dashboard/.test(_s_(payload.hotPathMode)),
    bundleMeta.phase1FirstPaint = payload.phase1FirstPaint === !0 || _s_(payload.hotPathMode) === "phase1-dashboard-first-paint-summary",
    bundleMeta.phase1LazyHydration = payload.phase1LazyHydration === !0 || _s_(payload.hotPathMode) === "phase1-dashboard-lazy-hydration",
    bundleMeta.performanceTargetMs = bundleMeta.phase1FirstPaint ? 1800: bundleMeta.phase1LazyHydration ? 6500: 3e3,
    payload._r16 &&(bundleMeta.cacheReadWarningCode = payload._r16),
    budgetResult && budgetResult.errorCode &&(bundleMeta.budgetWarningCode = budgetResult.errorCode);
    var data;
    try {
      data = _z65(stats, subBundles, bundleMeta, cacheKey)
    } catch (buildErr) {
      var buildCode = _y(buildErr, "bundle-build");
      return _J("dashboard.bundle.build.failure", buildErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: buildCode
        }),
      _V(payload, buildCode, buildErr, "bundle-build")
    }
    try {
      _cachePutJson_(cacheKey, data, cacheTtlSeconds)
    } catch (cacheWriteErr) {
      _J("dashboard.bundle.cache.write.failure", cacheWriteErr, {
          method: "apiGetDashboardBundle",
          requestId: payload && payload.requestId || "",
          errorCode: "_r87",
          cacheKey
        }),
      data.meta = _c30O_({
        }, data.meta || {
        }, {
          cacheWriteWarningCode: "_r87"
        }),
      data.dashboardDto &&(data.dashboardDto.meta = _c30O_({
          }, data.dashboardDto.meta || {
          }, data.meta || {
          }))
    }
    return ok_(data, "โหลด dashboard bundle สำเร็จ")
  } catch (e) {
    var code = _y(e, "bundle");
    return _J("dashboard.bundle.current.failure", e, {
        method: "apiGetDashboardBundle",
        requestId: payload && payload.requestId || "",
        errorCode: code
      }),
    _V(payload, code, e, "bundle")
  }
}
var _rK = "dashboard-bundle-read-model-index-v1-2026-07-01";
function _z79(res) {
  var data = res && res.data && typeof res.data == "object" ? res.data: res || {
  },
  rows = _c30A_(data.rows) ? data.rows: _c30A_(data.cases && data.cases.rows) ? data.cases.rows: _c30A_(data.items) ? data.items: [];
  return rows.length
}
function _z88(res, payload, started) {
  res = res && typeof res == "object" ? res: {
    ok: !1,
    data: {
    }
  };
  var data = res.data && typeof res.data == "object" && !_c30A_(res.data) ? res.data: res,
  rowsReturned = _z79(res),
  baseMeta = data.meta || res.meta || {
  },
  meta = _c30O_({
    }, baseMeta, {
      method: "apiGetDashboardBundle",
      readModel: _rK,
      readModelOwner: "Code_30_Domain_Cases.dashboardBundleReadModelOverlay",
      durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
      rowsRead: Number(baseMeta.rowsRead || data.rowsRead || rowsReturned || 0) || 0,
      rowsReturned,
      cacheHit: !!(baseMeta.cacheHit || data.cacheHit || res.cacheHit || data.cached || res.cached),
      cacheStatus: String(baseMeta.cacheStatus || data.cacheStatus || res.cacheStatus || "live"),
      source: "apiGetDashboardBundle.readModelOverlay"
    });
  return data.meta = meta,
  data.readModel = _rK,
  data.rowsReturned = rowsReturned,
  data.rowsRead = meta.rowsRead,
  data.cacheHit = meta.cacheHit,
  data.cacheStatus = meta.cacheStatus,
  res.meta = _c30O_({
    }, res.meta || {
    }, meta),
  res.readModel = _rK,
  res.rowsReturned = rowsReturned,
  res.rowsRead = meta.rowsRead,
  res.cacheHit = meta.cacheHit,
  res.cacheStatus = meta.cacheStatus,
  res
}
DashboardDomain.VERSION = "dashboard-domain-single-bundle-current", DashboardDomain.getBundle = function(payload) {
  var started = Date.now();
  return(payload = payload || {
    }).includeBudget = payload.includeBudget === !0,
  payload.includeCases = payload.includeCases !== !1,
  payload.hotPathMode = String(payload.hotPathMode || "dashboard-initial-single-bundle"),
  _z88(_z78(payload), payload, started)
}, DashboardDomain.status = function() {
  return _domainStatusPhaseC_(DashboardDomain, "DashboardDomain", {
      version: DashboardDomain.VERSION || "dashboard-domain-single-bundle-current",
      apiNamesPreserved: !0
    })
}, CaseDomain.SHEET_NAME = "MainData", CaseDomain.VERSION = "case-domain-production-single-owner-current",
CaseDomain.Services = CaseDomain.Services || {
  Repository: {
    source: _S2
  },
  Search: {
    source: _S2,
    dto: "CaseSearchRowDTO"
  },
  Report: {
    source: _T32
  },
  MeetingHistory: {
    source: _S0
  }
}, CaseDomain.caseText = function(value) {
  return typeof AppBackendCore != "undefined" && AppBackendCore.text ? AppBackendCore.text(value): _c30S_(value).trim()
}, CaseDomain.pick = function(row, keys, defaultValue) {
  return typeof AppBackendCore != "undefined" && AppBackendCore.pick ? AppBackendCore.pick(row, keys,
    defaultValue): row && row[keys] || defaultValue || ""
}, CaseDomain.caseNumberValue = function(value) {
  var s,
  m = CaseDomain.caseText(value).match(/^(\d+)/);
  return m ? Number(m[1]): 999999999
}, CaseDomain.toSearchRow = function(row, seq) {
  if (row = row || {
    }, typeof AppBackendCore != "undefined" && AppBackendCore.normalizeCaseSearchDto) {
    var base = AppBackendCore.normalizeCaseSearchDto(row, seq) || {
    },
    comm = CaseDomain.pick(row, [_T35,
        _T47,
        "committeeMeetings",
        _T56,
        _L7], ""),
    sub = CaseDomain.pick(row, [_S27,
        _T49,
        "subcommitteeMeetings",
        _T45,
        _L0], "");
    return comm &&(base.committeeHistory = base.committeeHistory || comm, base.committeeMeeting = base.committeeMeeting || comm,
      base.คณะกรรมาธิการ = base.คณะกรรมาธิการ || comm),
    sub &&(base.subcommitteeHistory = base.subcommitteeHistory || sub, base.subcommitteeMeeting = base.subcommitteeMeeting || sub,
      base.คณะอนุกรรมาธิการ = base.คณะอนุกรรมาธิการ || sub),
    base.reportColumns = _c30O_({
      }, base.reportColumns || {
      }, {
        committeeHistory: base.committeeHistory || "",
        subcommitteeHistory: base.subcommitteeHistory || "",
        operationOfficer: base.operationOfficer || base.opStaff || base.staffs || base.เจ้าหน้าที่ฝ่ายเลขานุการ || ""
      }),
    base.dtoOwner = "CaseDomain.toSearchRow.production",
    base
  }
  var recDate = CaseDomain.pick(row, ["recDate",
      "recDateText",
      _L15,
      "receiveDate"], ""),
  statusRaw = CaseDomain.pick(row, [_S18,
      _S17], ""),
  status = typeof AppBackendCore != "undefined" && AppBackendCore.normalizeCaseStatus ? AppBackendCore.normalizeCaseStatus(statusRaw,
    {
      defaultStatus: _L3
    }): _caseNormalizeStatusForDisplay_(statusRaw),
  loc = typeof AppBackendCore != "undefined" && AppBackendCore.location ? AppBackendCore.location(row): {
    subdistrict: CaseDomain.pick(row, ["ตำบล",
        "subdistrict"], ""),
    district: CaseDomain.pick(row, ["อำเภอ",
        "district"], ""),
    province: CaseDomain.pick(row, ["จังหวัด",
        "province"], "")
  },
  title = CaseDomain.pick(row, [_S28,
      _S20,
      _L9,
      _L19], ""),
  fullName = CaseDomain.pick(row, ["fullName",
      _S9,
      _S3,
      "ชื่อ-สกุล",
      _L1], ""),
  coOwners = CaseDomain.pick(row, ["coOwners",
      _T37,
      "ผู้ร่วมรับผิดชอบ",
      "ผู้รับผิดชอบร่วม"], ""),
  out = {
    id: CaseDomain.pick(row, ["id",
        _S12,
        "รหัส"], ""),
    caseId: CaseDomain.pick(row, [_S12,
        "id",
        "รหัส"], ""),
    seq,
    caseNo: CaseDomain.pick(row, [_S30,
        _T4,
        _L6], ""),
    caseNum: CaseDomain.pick(row, [_S30,
        _T4,
        _L6], ""),
    recNo: CaseDomain.pick(row, [_S23,
        _L4,
        _S11], ""),
    recDate,
    recDateText: typeof AppBackendCore != "undefined" && AppBackendCore.dateText ? AppBackendCore.dateText(recDate): _s_(recDate),
    title,
    subject: title,
    considerationTitle: CaseDomain.pick(row, [_S10,
        _L11,
        _L2], ""),
    petitionerName: fullName,
    petitioners: fullName,
    fullName,
    respondent: CaseDomain.pick(row, [_S32,
        _T36], ""),
    agency: CaseDomain.pick(row, ["agency",
        _S21], ""),
    assignees: CaseDomain.pick(row, [_S33,
        _T21,
        _T14], ""),
    coAssignees: coOwners,
    coOwners,
    opStaff: CaseDomain.pick(row, ["opStaff",
        _L8,
        "เจ้าหน้าที่ฝ่ายปฏิบัติการ"], ""),
    cat: CaseDomain.pick(row, ["cat",
        _T23,
        _T54], ""),
    subCat: CaseDomain.pick(row, ["subCat",
        _T15,
        _T42], ""),
    committeeHistory: CaseDomain.pick(row, [_T35,
        _T47,
        _L7], ""),
    subcommitteeHistory: CaseDomain.pick(row, [_S27,
        _T49,
        _L0], ""),
    status,
    statusRaw,
    type: "case",
    typeLabel: _L5,
    subdistrict: loc.subdistrict,
    district: loc.district,
    province: loc.province
  };
  return out.statusMeta = typeof AppBackendCore != "undefined" && AppBackendCore.statusMeta ? AppBackendCore.statusMeta(status,
    recDate): {
    status
  },
  out.reportColumns = {
    caseNo: out.caseNo,
    recNo: out.recNo,
    recDateText: out.recDateText,
    title: out.title,
    considerationTitle: out.considerationTitle,
    committeeHistory: out.committeeHistory || "",
    subcommitteeHistory: out.subcommitteeHistory || "",
    petitioners: out.petitioners,
    status: out.status
  },
  out
}, CaseDomain.toCompactSearchRow = function(row, seq) {
  var dto = CaseDomain.toSearchRow(row || {
    }, seq) || {
  },
  compact = {
    id: dto.id || dto.caseId || "",
    caseId: dto.caseId || dto.id || "",
    seq: dto.seq || seq || "",
    caseNo: dto.caseNo || dto.caseNum || "",
    caseNum: dto.caseNum || dto.caseNo || "",
    recNo: dto.recNo || dto.receiveNo || "",
    recDate: dto.recDate || dto.recDateText || "",
    recDateText: dto.recDateText || dto.recDate || "",
    offerDate: dto.offerDate || dto.offerDateText || dto.bookDate || dto.letterDate || dto.documentDate || "",
    offerDateText: dto.offerDateText || dto.offerDate || dto.bookDate || dto.letterDate || dto.documentDate || "",
    bookDate: dto.bookDate || dto.offerDate || dto.offerDateText || "",
    letterDate: dto.letterDate || dto.offerDate || dto.offerDateText || "",
    documentDate: dto.documentDate || dto.offerDate || dto.offerDateText || "",
    title: dto.title || dto.subject || "",
    considerationTitle: dto.considerationTitle || dto.caseTitle || "",
    petitioners: dto.petitioners || dto.petitionerName || "",
    respondent: dto.respondent || dto.agency || dto.agencyName || "",
    agency: dto.agency || dto.respondent || dto.agencyName || "",
    assignees: dto.assignees || "",
    coAssignees: dto.coAssignees || dto.coOwners || "",
    opStaff: dto.opStaff || dto.operationOfficer || dto.staffs || "",
    cat: dto.cat || "",
    subCat: dto.subCat || "",
    status: dto.status || _L3,
    statusRaw: dto.statusRaw || dto.status || "",
    closedReason: dto.closedReason || "",
    rejectionReason: dto.rejectionReason || "",
    pendingRemark: dto.pendingRemark || dto.pendingReason || "",
    pendingReason: dto.pendingReason || dto.pendingRemark || "",
    reason: dto.reason || dto.pendingRemark || dto.pendingReason || dto.closedReason || dto.rejectionReason || "",
    sentAgency: dto.sentAgency || "",
    committeeHistory: dto.committeeHistory || "",
    subcommitteeHistory: dto.subcommitteeHistory || "",
    type: "case",
    typeLabel: _L5
  };
  return compact.ลำดับเรื่อง = compact.caseNo,
  compact.เลขรับเรื่อง = compact.recNo,
  compact.วันที่รับเรื่อง = compact.recDateText,
  compact.ชื่อเรื่อง = compact.title,
  compact[_L2] = compact.considerationTitle,
  compact[_L1] = compact.petitioners,
  compact.สถานะ = compact.status,
  compact
}, CaseDomain.searchPageCacheKey = function(payload) {
  payload = payload || {
  };
  var scope = {
    q: _s_(payload.query || payload.q || payload.keyword).trim().toLowerCase(),
    reportType: String(payload.reportType || payload.groupType || payload.type || "all").trim().toLowerCase(),
    reportValue: _s_(payload.reportValue || payload.groupValue || payload.value).trim(),
    sortBy: String(payload.sortBy || _T4).trim(),
    sortDir: String(payload.sortDir || "asc").trim().toLowerCase(),
    page: Math.max(1, Number(payload.page || 1) || 1),
    limit: Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)),
    compact: payload.compactReadModel === !0 ? 1: 0,
    meeting: payload.includeMeetingHistory === !0 ? 1: 0,
    stamp: _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1",
    dto: "case-search-compact-server-page-v2-stable-order"
  };
  return "case_search_page_v2_" +(_appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(JSON.stringify(scope)): String(scope.page) + "_" + String(scope.limit))
}, CaseDomain.matchRow = function(row, payload) {
  payload = payload || {
  };
  var q = CaseDomain.caseText(payload.query || payload.q || payload.keyword || "").toLowerCase(),
  reportType = CaseDomain.caseText(payload.reportType || payload.groupType || payload.type || "all"),
  reportValue = CaseDomain.caseText(payload.reportValue || payload.groupValue || payload.value || ""),
  hay;
  if (q && [row.caseNo,
      row.caseNum,
      row.recNo,
      row.recDateText,
      row.title,
      row.subject,
      row.considerationTitle,
      row.caseTitle,
      row.petitionerName,
      row.petitioners,
      row.respondent,
      row.agency,
      row.agencyName,
      row.assignees,
      row.coOwners,
      row.coAssignees,
      row.opStaff,
      row.operationOfficer,
      row.staffs,
      row.status,
      row.cat,
      row.subCat].join(" ").toLowerCase().indexOf(q) < 0)return!1;
  if (reportType && reportType !== "all" && reportValue) {
    var field = reportType === "cat" ? row.cat: reportType === "sub" ? row.subCat: reportType === "comm" ? row.assignees: reportType === "status" ? row.status: "",
    fieldText = CaseDomain.caseText(field);
    if (reportType === "comm" ? fieldText.indexOf(reportValue) < 0: fieldText !== reportValue)return!1
  }
  return!0
};
var PHASE4_CASE_REPORT_INDEX_STAMP = "phase4-case-report-index-qa-gate-2026-06-30";
function _z20() {
  return {
    ok: !0,
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    owner: "Code_30_Domain_Cases.CaseReportIndexPhase4",
    sourceOfTruth: _T32,
    cachePrefix: "case_report_index_phase4_",
    ttlSeconds: {
      search: 180,
      reportOptions: 240,
      export: 90,
      max: 300
    },
    invalidatedByRoutes: ["apiSaveCase",
      "apiDeleteCase",
      "apiSaveMeetingLog",
      "apiDeleteMeetingLog",
      "apiSaveCommitteeMeetingSystem",
      "apiDeleteCommitteeMeetingSystem"],
    qaMethods: ["apiSearchCasesLite",
      "apiGetCaseReportOptions",
      "apiGetCaseReportExportRows"],
    uiDomChanged: !1,
    businessLogicChanged: !1
  }
}
function _z8(domain) {
  domain = String(domain || "case").trim().toLowerCase();
  try {
    if (_appIsFnName_("_entityCacheStamp_"))return String(_entityCacheStamp_(domain) || "1")
  } catch (_stampErr) {
    _c30W_("case.report.phase4.stamp", _stampErr, {
        domain
      })
  }
  try {
    if (_appIsFnName_("_routerEntityCacheStamp_"))return String(_routerEntityCacheStamp_(domain) || "1")
  } catch (_z104) {
    _c30W_("case.report.phase4.routerStamp", _z104, {
        domain
      })
  }
  return "1"
}
function _z26(payload) {
  payload = payload || {
  };
  var noPage = payload.noPage === !0 || payload.fullList === !0 || payload.serverPaged === !1,
  includeMeetingHistory = payload.includeMeetingHistory === !0,
  limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize ||(noPage ? payload.maxRows || 5e3: 20)) ||(noPage ? 5e3: 20),
      noPage ? 5e3: 100));
  return {
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    phase3: typeof _ri != "undefined" ? _ri: "phase3-unknown",
    q: _ra(payload.query || payload.q || payload.keyword || "").toLowerCase(),
    reportType: _ra(payload.reportType || payload.groupType || payload.type || "all").toLowerCase(),
    reportValue: _ra(payload.reportValue || payload.groupValue || payload.value || ""),
    sortBy: _ra(payload.sortBy || _T4),
    sortDir: _ra(payload.sortDir || "asc").toLowerCase(),
    page: noPage ? 1: Math.max(1, Number(payload.page || 1) || 1),
    limit,
    maxRows: Math.max(1, Math.min(Number(payload.maxRows || limit) || limit, 5e3)),
    includeMeetingHistory: includeMeetingHistory ? 1: 0,
    noPage: noPage ? 1: 0,
    exportMode: _ra(payload.exportMode || payload.mode || ""),
    compactReadModel: payload.compactReadModel === !0 ? 1: 0,
    mainStamp: _z8("maindata"),
    caseStamp: _z8("case"),
    meetingStamp: includeMeetingHistory ? _z8("meeting"): "0",
    route: _ra(payload.__route || payload.route || payload.source || "case-report-index")
  }
}
function _z83(payload) {
  var scope = _z26(payload),
  digest = _appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(JSON.stringify(scope)): String(scope.page) + "_" + String(scope.limit) + "_" + String(Date.now());
  return {
    key: "case_report_index_phase4_" + digest,
    scope
  }
}
function _z82(payload) {
  return payload = payload || {
  },
  payload.noPage === !0 || payload.fullList === !0 || payload.serverPaged === !1 ? 90: _s_(payload._r134) === "reportOptions" ? 240: Math.max(30,
    Math.min(Number(payload.cacheTtlSeconds || 180) || 180, 300))
}
function _z29(res, payload, started, cacheInfo) {
  res = res && typeof res == "object" ? res: {
    ok: !1,
    rows: [],
    data: [],
    totalRecords: 0
  },
  payload = payload || {
  };
  var rows = _c30A_(res.rows) ? res.rows: _c30A_(res.data) ? res.data: [],
  total = Math.max(0, Number(res.totalRecords || res.total || rows.length) || 0),
  ok = res.ok !== !1,
  errorCode = _s_(res.errorCode || res.code).trim(),
  empty = ok && total === 0,
  meta = _c30O_({
    }, res.meta || {
    });
  return meta.phase4Index = {
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    owner: "Code_30_Domain_Cases.CaseReportIndexPhase4",
    source: "CaseReportIndex.phase4",
    sourceOfTruth: _T32,
    cacheKey: cacheInfo && cacheInfo.key || "",
    cacheStatus: cacheInfo && cacheInfo.status || String(res.cacheStatus || "bypass"),
    cacheHit: !!(cacheInfo && cacheInfo.hit || res.cacheHit),
    scope: cacheInfo && cacheInfo.scope || _z26(payload),
    rowsRead: Number(res.rowsRead || meta.rowsRead || rows.length || 0) || 0,
    returnedRows: rows.length,
    totalRecords: total,
    includeMeetingHistory: payload.includeMeetingHistory === !0,
    meetingHistoryMatchedRows: Number(res.meetingHistoryMatchedRows || meta.meetingHistoryMatchedRows || 0) || 0,
    status: ok ? empty ? "ok-empty": "ok-data": "read-error",
    errorCode: ok ? "": errorCode || "_r77",
    emptyReason: empty ? "filter-or-dataset-empty": "",
    durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
    uiDomChanged: !1,
    businessLogicChanged: !1
  },
  res.meta = meta,
  res.indexPolicy = _z20(),
  res.readModel = PHASE4_CASE_REPORT_INDEX_STAMP,
  res.source = "CaseReportIndex.phase4",
  res.cacheStatus = meta.phase4Index.cacheStatus,
  res.cacheHit = meta.phase4Index.cacheHit,
  res.errorState = meta.phase4Index.status,
  res.durationMs = meta.phase4Index.durationMs,
  res
}
function _Y(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  allowCache = payload.forceFresh !== !0 && payload.noCache !== !0 && payload.bypassCache !== !0,
  idx = _z83(payload),
  cacheInfo = {
    key: idx.key,
    scope: idx.scope,
    status: allowCache ? "miss": "bypass",
    hit: !1
  };
  if (allowCache && _appIsFnName_("_cacheGetJson_")) {
    var hit = _cacheGetJson_(idx.key);
    if (hit && typeof hit == "object")return cacheInfo.status = "hit",
    cacheInfo.hit = !0,
    hit.cacheHit = !0,
    hit.cacheStatus = "hit",
    _z29(hit, payload, started, cacheInfo)
  }
  var res;
  try {
    res = _rX(_c30O_({
        }, payload, {
          noCache: !0,
          bypassCache: !0,
          forceFresh: !1,
          __phase4IndexOwner: PHASE4_CASE_REPORT_INDEX_STAMP
        }))
  } catch (e) {
    _c30W_("case.report.phase4.readModel", e, {
        source: _s_(payload.source)
      }),
    res = {
      ok: !1,
      rows: [],
      data: [],
      items: [],
      records: [],
      totalRecords: 0,
      total: 0,
      error: String(e && e.message || e),
      msg: "อ่านข้อมูลรายงานไม่สำเร็จ",
      errorCode: "_r77",
      meta: {
        exception: String(e && e.message || e)
      }
    }
  }
  if (res = _z29(res, payload, started, cacheInfo), allowCache && res.ok !== !1 && _appIsFnName_("_cachePutJson_"))try {
    _cachePutJson_(idx.key, res, _z82(payload))
  } catch (_putErr) {
    _c30W_("case.report.phase4.cachePut", _putErr, {
        key: idx.key
      })
  }
  return res
}
function _z17(name, ok, detail) {
  return {
    name: _s_(name),
    ok: !!ok,
    detail: detail || {
    },
    at: new Date().toISOString()
  }
}
function _z86(res) {
  return!!(res && typeof res == "object" && _c30A_(res.rows) && res.totalRecords != null && res.meta && res.meta.phase4Index)
}
function apiGetPhase4QaGate(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  checks = [],
  routeNames = [];
  try {
    _appIsFnName_("_apiRouteRegistry_") &&(routeNames = Object.keys(_apiRouteRegistry_() || {
        }))
  } catch (_routeErr) {
    checks.push(_z17("route.registry.read", !1, {
          error: String(_routeErr && _routeErr.message || _routeErr)
        }))
  }
  ["apiSearchCasesLite",
    "apiGetCaseReportOptions",
    "apiGetCaseReportExportRows",
    "apiSaveMeetingLog"].forEach(function(route) {
      checks.push(_z17("route.registered." + route, routeNames.indexOf(route) > - 1 || routeNames.length === 0,
          {
            route
          }))
    });
  var searchRes = _Y({
      page: 1,
      limit: 3,
      compactReadModel: !0,
      includeMeetingHistory: !1,
      noCache: !0,
      bypassCache: !0,
      source: "phase4-qa-search"
    });
  checks.push(_z17("readModel.search.shape", _z86(searchRes), {
        totalRecords: Number(searchRes.totalRecords || 0),
        rows: _c30A_(searchRes.rows) ? searchRes.rows.length: - 1,
        errorState: searchRes.errorState || ""
      }));
  var exportRes = CaseDomain.getReportExportRows({
      maxRows: 3,
      limit: 3,
      includeMeetingHistory: !0,
      noCache: !0,
      bypassCache: !0,
      source: "phase4-qa-export"
    });
  checks.push(_z17("readModel.export.shape", !!(exportRes && exportRes.ok !== !1 && _c30A_(exportRes.rows)),
      {
        totalRecords: Number(exportRes && exportRes.totalRecords || 0),
        rows: _c30A_(exportRes && exportRes.rows) ? exportRes.rows.length: - 1,
        source: _s_(exportRes && exportRes.source)
      }));
  var optRes = CaseDomain.getReportOptions({
      noCache: !0,
      bypassCache: !0,
      source: "phase4-qa-options"
    });
  checks.push(_z17("readModel.options.shape", !!(optRes && optRes.ok !== !1 && optRes.data && typeof optRes.data == "object"),
      {
        source: _s_(optRes && optRes.source),
        readModel: _s_(optRes && optRes.readModel)
      }));
  var ledger = _appIsFnName_("_cm") ? _cm(): null;
  checks.push(_z17("cacheLedger.available", !!(ledger && ledger.ok), {
        stamp: ledger && ledger.stamp || ""
      }));
  var passed = checks.filter(function(c) {
      return c.ok
    }).length,
  failed = checks.length - passed;
  return {
    ok: failed === 0,
    owner: "Code_30_Domain_Cases.apiGetPhase4QaGate",
    stamp: PHASE4_CASE_REPORT_INDEX_STAMP,
    policy: _z20(),
    checks,
    passed,
    failed,
    readOnly: !0,
    noDataMutation: !0,
    durationMs: Math.max(0, Date.now() - started),
    generatedAt: new Date().toISOString(),
    meta: {
      source: "Phase4QaGate",
      uiDomChanged: !1,
      businessLogicChanged: !1
    }
  }
}
var _rH = "hot-route-materialized-index-v2-2026-07-02", _rq = "case-search-materialized-index-v2-2026-07-02",
_rm = "tracking-materialized-index-v2-2026-07-02";
function _z69(seed) {
  seed = _s_(seed);
  try {
    if (_appIsFnName_("_buildDigestHex_"))return _buildDigestHex_(seed)
  } catch (_digestErr) {
    _c30W_("hotRoute.digest", _digestErr)
  }
  try {
    return Utilities.base64EncodeWebSafe(seed).substring(0, 96)
  } catch (_utilErr) {
    return seed.replace(/[^A-Za-z0-9_-]/g, "_").substring(0, 96)
  }
}
function _z44(key) {
  try {
    if (typeof AppDataService != "undefined" && AppDataService && AppDataService.cacheGet)return AppDataService.cacheGet(key)
  } catch (_adsGetErr) {
    _c30W_("hotRoute.cacheGet.appDataService", _adsGetErr, {
        key
      })
  }
  try {
    return _appIsFnName_("_cacheGetJson_") ? _cacheGetJson_(key): null
  } catch (_cacheErr) {
    _c30W_("hotRoute.cacheGet", _cacheErr, {
        key
      })
  }
  return null
}
function _z43(key, value, ttlSeconds) {
  ttlSeconds = Math.max(30, Math.min(Number(ttlSeconds || 180) || 180, 21600));
  try {
    if (typeof AppDataService != "undefined" && AppDataService && AppDataService.cachePut)return AppDataService.cachePut(key,
      value, ttlSeconds)
  } catch (_adsPutErr) {
    _c30W_("hotRoute.cachePut.appDataService", _adsPutErr, {
        key
      })
  }
  try {
    return _appIsFnName_("_cachePutJson_") ? _cachePutJson_(key, value, ttlSeconds): !1
  } catch (_cachePutErr) {
    _c30W_("hotRoute.cachePut", _cachePutErr, {
        key
      })
  }
  return!1
}
function _z90() {
  try {
    return Utilities.formatDate(new Date, Session.getScriptTimeZone() || "Asia/Bangkok", "yyyy-MM-dd")
  } catch (_e) {
    return new Date().toISOString().slice(0, 10)
  }
}
function _z21(payload) {
  return payload = payload || {
  },
  {
    stamp: _rq,
    compactReadModel: payload.compactReadModel !== !1 ? 1: 0,
    includeMeetingHistory: payload.includeMeetingHistory === !0 ? 1: 0,
    caseStamp: _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("maindata") || "1"): "1",
    meetingStamp: payload.includeMeetingHistory === !0 && _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("meeting") || _entityCacheStamp_("meetinglogs") || "1"): "0"
  }
}
function _z51(payload) {
  return "case_search_materialized_index_v2_" + _z69(JSON.stringify(_z21(payload || {
        })))
}
function _z41(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  allowCache = payload.forceFresh !== !0 && payload.noCache !== !0 && payload.bypassCache !== !0,
  key = _z51(payload),
  cached = allowCache ? _z44(key): null;
  if (cached && _c30A_(cached.rows))return cached.cacheHit = !0,
  cached.cacheStatus = String(cached.cacheStatus || "materialized-hit"),
  cached.rowsRead = 0,
  cached.durationMs = Math.max(0, Date.now() - started),
  cached;
  var maxRows = Math.max(100, Math.min(Number(payload.materializedLimit || payload.maxMaterializedRows || 5e3) || 5e3,
      5e3)),
  source = _Y(_c30O_({
      }, payload, {
        query: "",
        q: "",
        keyword: "",
        reportType: "all",
        groupType: "all",
        type: "all",
        reportValue: "",
        groupValue: "",
        value: "",
        page: 1,
        limit: maxRows,
        pageSize: maxRows,
        maxRows,
        noPage: !0,
        fullList: !0,
        serverPaged: !1,
        compactReadModel: payload.compactReadModel !== !1,
        includeMeetingHistory: payload.includeMeetingHistory === !0,
        noCache: !0,
        bypassCache: !0,
        forceFresh: !1,
        __route: "apiSearchCasesLite.materialized-index-base",
        source: "case-search-materialized-index-base"
      })),
  rows = _c30A_(source && source.rows) ? source.rows: _c30A_(source && source.data) ? source.data: [];
  rows =(_c30A_(rows) ? rows: []).filter(function(row) {
      var type = _s_(row && row.type).trim().toLowerCase(),
      label = _s_(row && row.typeLabel).trim(),
      deleted = String(row &&(row.isDeleted || row.deleted || row.deletedAt || row.ลบ) || "").trim().toLowerCase(); return deleted !== "true" && deleted !== "1" && deleted !== "deleted" && deleted !== "ลบ" && type !== "letter" && label !== "หนังสือ" && label !== "หนังสือติดตามมติ"
    });
  var model = {
    ok: !0,
    rows,
    totalRecords: rows.length,
    source: "CaseSearchMaterializedIndex.v2",
    readModel: _rq,
    cacheHit: !1,
    cacheStatus: allowCache ? "materialized-miss": "materialized-bypass",
    cacheKey: key,
    rowsRead: Number(source &&(source.rowsRead || source.totalRecords) || rows.length || 0) || 0,
    rowsReturned: rows.length,
    durationMs: Math.max(0, Date.now() - started),
    generatedAt: new Date().toISOString(),
    scope: _z21(payload),
    meta: {
      source: "CaseSearchMaterializedIndex.v2",
      readModelOwner: "Code_30_Domain_Cases.caseSearchMaterializedIndex",
      rowsRead: Number(source &&(source.rowsRead || source.totalRecords) || rows.length || 0) || 0,
      rowsReturned: rows.length,
      baseSource: String(source && source.source || "CaseReportIndex.phase4"),
      uiDomChanged: !1,
      businessLogicChanged: !1
    }
  };
  return allowCache && _z43(key, model, Math.max(300, Math.min(Number(payload.indexTtlSeconds || 21600) || 21600,
        21600))),
  model
}
function _z96(rows, payload) {
  return payload = payload || {
  },
  rows = _c30A_(rows) ? rows: [],
  rows.filter(function(row) {
      try {
        return _z37(row || {
          }, payload)
      } catch (_matchErr) {
        var query = _ra(payload.query || payload.q || payload.keyword || "").toLowerCase(); return!query || [row.caseNo,
          row.caseNum,
          row.recNo,
          row.receiveNo,
          row.title,
          row.subject,
          row.considerationTitle,
          row.caseTitle,
          row.petitioners,
          row.respondent,
          row.status,
          row.cat,
          row.subCat,
          row.assignees].join(" ").toLowerCase().indexOf(query) > - 1
      }
    })
}
function _r14(payload) {
  payload = payload || {
  };
  var started = Date.now(),
  idx = _z41(payload),
  noPage = payload.noPage === !0 || payload.fullList === !0 || payload.serverPaged === !1,
  page = Math.max(1, Number(payload.page || 1) || 1),
  limit = Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, noPage ? 5e3: 100)),
  filtered = _z96(idx.rows || [], payload);
  filtered = _z31(filtered, payload);
  var totalRecords = filtered.length,
  totalPages = noPage ? 1: Math.max(1, Math.ceil(totalRecords / limit)),
  safePage = noPage ? 1: Math.max(1, Math.min(page, totalPages)),
  start = noPage ? 0: (safePage - 1) * limit,
  outRows = noPage ? filtered.slice(0, limit): filtered.slice(start, start + limit),
  rowsRead = idx.cacheHit ? 0: Number(idx.rowsRead || idx.totalRecords || 0) || 0,
  duration = Math.max(0, Date.now() - started),
  res = {
    ok: !0,
    rows: outRows,
    data: outRows,
    items: outRows,
    records: outRows,
    totalRecords,
    total: totalRecords,
    page: safePage,
    limit,
    pageSize: limit,
    totalPages,
    columns: typeof AppBackendCore != "undefined" && AppBackendCore.reportColumns ? AppBackendCore.reportColumns(): [],
    owner: "CaseDomain.searchCases",
    source: "CaseSearchMaterializedIndex.v2.query",
    readModel: _rq,
    serverPaged: !noPage,
    serverFiltered: !0,
    rowsRead,
    returnedRows: outRows.length,
    rowsReturned: outRows.length,
    durationMs: duration,
    cacheHit: !!idx.cacheHit,
    cacheStatus: String(idx.cacheStatus || "materialized"),
    materializedIndexHit: !!idx.cacheHit,
    materializedIndexRows: Number(idx.totalRecords ||(idx.rows || []).length || 0),
    meta: {
      source: "CaseSearchMaterializedIndex.v2.query",
      sourceOfTruth: _T32,
      readModelOwner: "Code_30_Domain_Cases._r14",
      materializedIndex: _rq,
      materializedIndexHit: !!idx.cacheHit,
      materializedIndexRows: Number(idx.totalRecords ||(idx.rows || []).length || 0),
      serverPaged: !noPage,
      serverFiltered: !0,
      rowsRead,
      rowsReturned: outRows.length,
      returnedRows: outRows.length,
      totalRecords,
      durationMs: duration,
      cacheHit: !!idx.cacheHit,
      cacheStatus: String(idx.cacheStatus || "materialized"),
      uiDomChanged: !1,
      businessLogicChanged: !1
    }
  };
  return typeof AppBackendCore != "undefined" && AppBackendCore.normalizeCaseSearchResponse &&(res = AppBackendCore.normalizeCaseSearchResponse(res)),
  res
}
function _z11(payload) {
  return payload = payload || {
  },
  {
    stamp: _rm,
    dateKey: _z90(),
    lettersStamp: _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("letters") || "1"): "1",
    caseStamp: _appIsFnName_("_entityCacheStamp_") ? String(_entityCacheStamp_("maindata") || "1"): "1"
  }
}
function _z14(payload) {
  return "tracking_materialized_index_v2_" + _z69(JSON.stringify(_z11(payload || {
        })))
}
function _z36(item) {
  return item = item || {
  },
  [item.letterId,
    item.caseId,
    item.caseNum,
    item.recNo,
    item.caseTitle,
    item.title,
    item.letterNo,
    item.bookNo,
    item.agency,
    item.subject,
    item.issue,
    item.status,
    item.letterStatus,
    item.officer,
    item.opStaff,
    item.letterDate,
    item.dueDate,
    item.extendDate].join(" ").toLowerCase()
}
function _z45(item) {
  var out = {
  },
  src = item || {
  };
  return Object.keys(src).forEach(function(k) {
      String(k).substring(0, 2) !== "__" &&(out[k] = src[k])
    }),
  out
}
function _z53(payload, guardApi) {
  payload = payload || {
  };
  var started = Date.now(),
  allowCache = payload.forceFresh !== !0 && payload.noCache !== !0 && payload.bypassCache !== !0,
  key = _z14(payload),
  cached = allowCache ? _z44(key): null;
  if (cached && _c30A_(cached.rows))return cached.cacheHit = !0,
  cached.cacheStatus = String(cached.cacheStatus || "materialized-hit"),
  cached.rowsRead = 0,
  cached.durationMs = Math.max(0, Date.now() - started),
  cached;
  var trackingRepo = TrackingRepository_(),
  sourceRows = trackingRepo.listLetters(),
  caseMap = _r78(trackingRepo, guardApi && guardApi.shouldYield, guardApi && guardApi.markPartial, payload.forceFresh === !0),
  today = new Date;
  today.setHours(0, 0, 0, 0);
  var normalizedItems = _rU(sourceRows, caseMap, today, guardApi || {
    }).map(function(item) {
      return item = item || {
      },
      item.__searchText = _z36(item),
      item
    }),
  model = {
    ok: !0,
    rows: normalizedItems,
    totalRecords: normalizedItems.length,
    source: "TrackingMaterializedIndex.v2",
    readModel: _rm,
    cacheHit: !1,
    cacheStatus: allowCache ? "materialized-miss": "materialized-bypass",
    cacheKey: key,
    rowsRead: _c30A_(sourceRows) ? sourceRows.length: normalizedItems.length,
    rowsReturned: normalizedItems.length,
    durationMs: Math.max(0, Date.now() - started),
    generatedAt: new Date().toISOString(),
    scope: _z11(payload),
    meta: {
      source: "TrackingMaterializedIndex.v2",
      readModelOwner: "Code_30_Domain_Cases.trackingMaterializedIndex",
      sourceOfTruth: "Letters+MainData",
      rowsRead: _c30A_(sourceRows) ? sourceRows.length: normalizedItems.length,
      rowsReturned: normalizedItems.length,
      uiDomChanged: !1,
      businessLogicChanged: !1
    }
  };
  return allowCache && _z43(key, model, Math.max(300, Math.min(Number(payload.indexTtlSeconds || 21600) || 21600,
        21600))),
  model
}
function _z27(query, items) {
  if (query = _s_(query).trim().toLowerCase(), !query)return null;
  var tokens = query.split(/[^0-9a-zA-Zก-๙]+/).map(function(x) {
      return _s_(x).trim()
    }).filter(Boolean),
  map = {
  };
  return(_c30A_(items) ? items: []).forEach(function(item) {
      var text = String(item && item.__searchText || _z36(item)).toLowerCase(),
      hit = text.indexOf(query) > - 1; !hit && tokens.length &&(hit = tokens.every(function(t) {
            return text.indexOf(t) > - 1
          })),
      hit &&(map[_s_(item && item.letterId)] = 1)
    }),
  map
}
function _z12(payload, guardApi) {
  var opts = _r8(payload = payload || {
    }),
  idx = _z53(payload, guardApi),
  normalizedItems = _c30A_(idx.rows) ? idx.rows: [],
  matchedLetterIds = _z27(opts.query, normalizedItems),
  baseItems = _r18(normalizedItems, {
      query: opts.query,
      matchedLetterIds,
      statusFilter: opts.statusFilter,
      staffFilter: opts.staffFilter,
      agencyFilter: opts.agencyFilter,
      caseIdFilter: opts.caseIdFilter
    }),
  statusCounts = _rW(baseItems),
  items = baseItems.filter(function(item) {
      return!opts.typeFilter || opts.typeFilter === "all" || _s_(item.filterKey) === opts.typeFilter
    });
  return items = _r32(items, opts.sortBy, opts.sortDir).map(_z45),
  {
    opts,
    rows: idx.cacheHit ? []: normalizedItems,
    normalizedItems,
    baseItems,
    items,
    paged: _r13(items, payload),
    statusCounts,
    materializedIndex: idx
  }
}
function _z13(payload) {
  return payload = payload || {
  },
  {
    q: _s_(payload.query || payload.q || payload.keyword).trim().toLowerCase(),
    reportType: String(payload.reportType || payload.groupType || payload.type || "all").trim().toLowerCase(),
    reportValue: _s_(payload.reportValue || payload.groupValue || payload.value).trim(),
    filterType: String(payload.filterType || payload.statusType || "all").trim().toLowerCase(),
    status: _s_(payload.status).trim(),
    staff: _s_(payload.opStaff || payload.staff).trim(),
    agency: _s_(payload.agency || payload.agencyFilter || payload.agencyName).trim(),
    sortBy: String(payload.sortBy || _T4).trim(),
    sortDir: String(payload.sortDir || "asc").trim().toLowerCase(),
    page: Math.max(1, Number(payload.page || 1) || 1),
    limit: Math.max(1, Math.min(Number(payload.limit || payload.pageSize || 20) || 20, 100)),
    caseIndexStamp: _z21(payload).caseStamp,
    trackingIndexDate: _z90(),
    model: _rH
  }
}
function _z73(method, payload) {
  var scope = _z13(payload || {
    }),
  seed = JSON.stringify({
      method: _s_(method),
      scope
    });
  return "hot_route_query_window_v2_" + String(method || "api") + "_" + _z69(seed)
}
function _z93(res) {
  var data = res && res.data && typeof res.data == "object" ? res.data: res,
  rows = _c30A_(data && data.rows) ? data.rows: _c30A_(res && res.rows) ? res.rows: _c30A_(data && data.items) ? data.items: [];
  return rows.length
}
function _z19(res, method, payload, started, cacheInfo) {
  res = res && typeof res == "object" ? res: {
    ok: !1,
    data: {
      rows: []
    }
  };
  var data = res.data && typeof res.data == "object" && !_c30A_(res.data) ? res.data: res,
  rowsReturned = _z93(res),
  rowsRead = Number(data.rowsRead || res.rowsRead || rowsReturned || 0) || 0,
  meta = _c30O_({
    }, data.meta || res.meta || {
    }, {
      method: _s_(method),
      readModel: _rH,
      readModelOwner: "Code_30_Domain_Cases.hotRouteMaterializedReadModel",
      durationMs: Math.max(0, Date.now() - Number(started || Date.now())),
      rowsRead,
      rowsReturned,
      cacheHit: !!(cacheInfo && cacheInfo.hit),
      cacheStatus: cacheInfo && cacheInfo.status || "bypass",
      cacheKey: cacheInfo && cacheInfo.key || "",
      source: String(method || "hot-route") + ".materializedQueryWindow",
      payloadScope: _z13(payload || {
        })
    });
  return data.meta = meta,
  data.readModel = _rH,
  data.cacheHit = meta.cacheHit,
  data.cacheStatus = meta.cacheStatus,
  data.durationMs = meta.durationMs,
  data.rowsRead = rowsRead,
  data.rowsReturned = rowsReturned,
  res.meta = _c30O_({
    }, res.meta || {
    }, meta),
  res.readModel = _rH,
  res.cacheHit = meta.cacheHit,
  res.cacheStatus = meta.cacheStatus,
  res.durationMs = meta.durationMs,
  res.rowsRead = rowsRead,
  res.rowsReturned = rowsReturned,
  res
}
function _z61(method, payload, ttlSeconds, builder) {
  payload = payload || {
  };
  var started = Date.now(),
  allowCache = payload.forceFresh !== !0 && payload.noCache !== !0 && payload.bypassCache !== !0,
  key = _z73(method, payload),
  cacheInfo = {
    key,
    status: allowCache ? "query-miss": "query-bypass",
    hit: !1
  };
  if (allowCache)try {
    var hit = _z44(key);
    if (hit && typeof hit == "object")return cacheInfo.status = "query-hit",
    cacheInfo.hit = !0,
    _z19(hit, method, payload, started, cacheInfo)
  } catch (cacheErr) {
    cacheInfo.status = "query-read-error",
    _c30W_("hotRoute.query.cacheGet", cacheErr, {
        method
      })
  }
  var res = builder(payload || {
    });
  if (res = _z19(res, method, payload, started, cacheInfo), allowCache && res.ok !== !1)try {
    _z43(key, res, Math.max(60, Math.min(Number(ttlSeconds || payload.cacheTtlSeconds || 600) || 600,
          21600)))
  } catch (cachePutErr) {
    _c30W_("hotRoute.query.cachePut", cachePutErr, {
        method
      })
  }
  return res
}
function _rO(payload) {
  payload = payload || {
  };
  var guard = typeof createExecutionGuard_ == "function" ? createExecutionGuard_({
      label: "_rO",
      route: "apiGetTracking",
      maxMs: Number(payload.hardLimitMs || 28e3) || 28e3,
      warningMs: Number(payload.softLimitMs || 24e3) || 24e3
    }): null,
  guardApi = _r45(guard);
  try {
    var out = _r24(payload, _z12(payload, guardApi), _z14(payload), guard),
    idx = out && out.materializedIndex || null;
    return out.readModel = _rm,
    out.materializedIndex = _rm,
    out.materializedIndexHit = !!(idx && idx.cacheHit),
    out.rowsRead = idx && idx.cacheHit ? 0: Number(idx && idx.rowsRead || out.rowsRead || 0) || 0,
    out.rowsReturned = _c30A_(out.rows) ? out.rows.length: 0,
    out.cacheHit = !!(idx && idx.cacheHit),
    out.cacheStatus = String(idx && idx.cacheStatus || out.cacheStatus || "materialized"),
    out.meta = _c30O_({
      }, out.meta || {
      }, {
        source: "tracking-materialized-index-query",
        readModelOwner: "Code_30_Domain_Cases._rO",
        materializedIndex: _rm,
        materializedIndexHit: !!(idx && idx.cacheHit),
        rowsRead: out.rowsRead,
        rowsReturned: out.rowsReturned,
        cacheHit: out.cacheHit,
        cacheStatus: out.cacheStatus,
        uiDomChanged: !1,
        businessLogicChanged: !1
      }),
    ok_(out, "โหลดข้อมูลติดตามหนังสือสำเร็จ")
  } catch (e) {
    return _recordWarning_("tracking.materialized.error", e),
    _r110(payload)
  }
}
CaseDomain.searchCases = function(payload) {
  return payload = payload || {
  },
  _z61("apiSearchCasesLite", payload, Number(payload.cacheTtlSeconds || 600) || 600, function(p) {
      return _r14(_c30O_({
            __route: "CaseDomain.searchCases",
            compactReadModel: !0,
            serverPaged: !0
          }, p || {
          }))
    })
}, CaseDomain.saveCase = function(payload) {
  if (payload = payload || {
    }, typeof AppRepository == "undefined" || !AppRepository.writeObject)return {
    ok: !1,
    error: "CASE_REPOSITORY_WRITE_UNAVAILABLE"
  };
  var saved = AppRepository.writeObject(CaseDomain.SHEET_NAME, "id", payload, {
      domain: _T48
    }),
  invalidated;
  return {
    ok: !0,
    item: saved,
    data: {
      item: saved
    },
    owner: "CaseDomain.saveCase",
    cacheInvalidation: AppRepository.afterWrite ? AppRepository.afterWrite([_T48,
        "dashboard",
        "tracking",
        "meeting"]): []
  }
}, CaseDomain.getReportExportRows = function(payload) {
  payload = payload || {
  };
  var maxRows = Math.max(1, Math.min(Number(payload.maxRows || payload.limit || 5e3) || 5e3, 5e3)),
  res = _Y(_c30O_({
      }, payload, {
        page: 1,
        limit: maxRows,
        pageSize: maxRows,
        maxRows,
        noPage: !0,
        fullList: !0,
        serverPaged: !1,
        exportMode: String(payload.exportMode || payload.mode || "report"),
        compactReadModel: !0,
        includeMeetingHistory: payload.includeMeetingHistory !== !1,
        forceFresh: payload.forceFresh === !0,
        noCache: payload.noCache === !0,
        bypassCache: payload.bypassCache === !0,
        __route: "CaseDomain.getReportExportRows",
        source: "apiGetCaseReportExportRows.phase4"
      })),
  rows = _c30A_(res && res.rows) ? res.rows.slice(0, maxRows): [],
  total = Number(res && res.totalRecords || rows.length || 0) || 0;
  return {
    ok: !0,
    rows,
    data: rows,
    items: rows,
    totalRecords: total,
    total,
    returnedRows: rows.length,
    maxRows,
    truncated: total > rows.length,
    page: 1,
    limit: rows.length || maxRows,
    pageSize: rows.length || maxRows,
    totalPages: 1,
    serverPaged: !1,
    exportMode: String(payload.exportMode || payload.mode || "report"),
    owner: "CaseDomain.getReportExportRows",
    source: "CaseReportIndex.phase4.export",
    readModel: PHASE4_CASE_REPORT_INDEX_STAMP,
    generatedAt: new Date().toISOString(),
    meta: _c30O_({
      }, res && res.meta || {
      }, {
        includeMeetingHistory: payload.includeMeetingHistory !== !1,
        sourceOfTruth: _T32,
        reportReadModel: PHASE4_CASE_REPORT_INDEX_STAMP,
        meetingHistoryMatchedRows: Number(res && res.meetingHistoryMatchedRows || 0) || 0
      })
  }
}, CaseDomain.quickSummary = function(payload) {
  payload = payload || {
  };
  var res = CaseDomain.searchCases(_c30O_({
      }, payload, {
        noPage: !0,
        limit: 500
      })),
  rows = _c30A_(res && res.rows) ? res.rows: [],
  statusMap = {
  },
  typeMap = {
  };
  function top(map) {
    return Object.keys(map || {
      }).map(function(k) {
        return {
          label: k,
          count: Number(map[k] || 0)
        }
      }).sort(function(a, b) {
        return Number(b.count || 0) - Number(a.count || 0) || _s_(a.label).localeCompare(_s_(b.label),
          "th")
      }).slice(0, 8)
  }
  return rows.forEach(function(r) {
      var st = CaseDomain.caseText(r && r.status || "") || "ไม่ระบุสถานะ",
      ty = CaseDomain.caseText(r && r.cat || "") || "ไม่ระบุประเภท"; statusMap[st] =(statusMap[st] || 0) + 1,
      typeMap[ty] =(typeMap[ty] || 0) + 1
    }),
  {
    ok: !0,
    data: {
      total: Number(res && res.totalRecords || rows.length || 0),
      query: _s_(payload.query || payload.q || payload.keyword),
      reportType: String(payload.reportType || payload.groupType || payload.type || "all"),
      reportValue: _s_(payload.reportValue || payload.groupValue || payload.value),
      byStatus: top(statusMap),
      byType: top(typeMap),
      generatedAt: new Date().toISOString(),
      cached: !1,
      cacheStatus: "CaseDomain.quickSummary"
    },
    owner: "CaseDomain.quickSummary"
  }
}, CaseDomain.getReportOptions = function(payload) {
  payload = payload || {
  };
  var facets = _z39(payload);
  return {
    ok: !0,
    data: facets,
    owner: "CaseDomain.getReportOptions",
    source: "CaseReportFacets.phase4",
    readModel: PHASE4_CASE_REPORT_INDEX_STAMP
  }
}, CaseDomain.status = function() {
  return _domainStatusPhaseC_(CaseDomain, "CaseDomain")
};
function _z28() {
  return {
    sheets: {
      CommitteeMeetings: {
        purpose: "ข้อมูลหัวการประชุมของคณะกรรมาธิการ",
        key: _S34,
        headers: [_S34,
          "meetingNo",
          _T31,
          _S28,
          _S18,
          "note",
          _S16,
          _S5,
          _S4,
          _S6]
      },
      CommitteeMeetingAgendaItems: {
        purpose: "รายการระเบียบวาระการประชุม 1-4 แบบหลายรายการ",
        key: "itemId",
        headers: ["itemId",
          _S34,
          "agendaNo",
          "seq",
          _S28,
          "relatedMeetingNo",
          "relatedMeetingDate",
          _S12,
          _T4,
          _S23,
          _S7,
          "letterId",
          "letterNo",
          "letterSubject",
          "agencyOrPresenter",
          _S39,
          "note",
          _S16,
          _S5,
          _S4,
          _S6]
      }
    },
    sync: {
      targetSheet: _S0,
      rule: "รายการระเบียบวาระที่ 1 และ 3 ที่เชื่อม caseId จะบันทึก/อัปเดตประวัติการพิจารณาของคณะกรรมาธิการอัตโนมัติ โดยใช้ครั้งที่=meetingNo, วันประชุม=meetingDate, ผลการประชุม/มติที่ประชุม=result"
    }
  }
}
function _z52(sheetName, includeDeleted, options) {
  options = options || {};
  var forceFresh = options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0;
  var ttl = forceFresh ? 0 : Math.max(0, Math.min(Number(options.cacheTtlSeconds != null ? options.cacheTtlSeconds : 180) || 0, 600));
  try {
    ensureCanonicalHeadersForNewSheet_(sheetName);
    return _rg(sheetName, [], {
      includeDeleted: includeDeleted === !0,
      requireCanonical: !0,
      forceFresh: forceFresh,
      bypassRequestCache: forceFresh,
      ttl: ttl,
      owner: "MeetingDomain.canonicalSheetRead"
    });
  } catch (e) {
    throw new Error("ไม่สามารถอ่านชีต " + sheetName + " ได้: " + String(e && e.message || e));
  }
}
function _z3(name) {
  return getCanonicalRepository_(name)
}
function _committeeMeetingPad2_(n) {
  return((n = Number(n) || 0) < 10 ? "0": "") + String(n)
}
function _z4(v) {
  return Object.prototype.toString.call(v) === "[object Date]" && !isNaN(v.getTime())
}
function _committeeMeetingDateText_(v) {
  return _caseDateTextPhaseD2_(v, {
      preserveRaw: !0,
      context: _T47
    })
}
function _j(v) {
  return _z4(v) ? _committeeMeetingDateText_(v): _c30S_(v).trim()
}
function _caseMeetingAgendaNumberText_(v) {
  if (v == null)return "";
  var raw = _c30S_(v).trim();
  if (!raw && !_z4(v))return "";
  if (/^\d{1,6}\s*\/\s*(?:19|20|25)\d{2}$/.test(raw))return raw.replace(/\s*\/\s*/, "/");
  if (/^\d{1,6}\s*[-–—]\s*(?:19|20|25)\d{2}$/.test(raw))return raw.replace(/\s*[-–—]\s*/, "/");
  var mixed = raw.match(/^(\d{1,6})\s*\/\s*(.+)$/),
  dateLike;
  if (mixed) {
    var tail = _s_(mixed[2]).trim(),
    tailLooksDate;
    if (/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(tail) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(tail) || /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(tail) || /^\d{1,2}[\/\-]\d{1,2}[\/\-](?:19|20|25)\d{2}$/.test(tail)) {
      var tailDate = new Date(tail.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, "").trim());
      if (!isNaN(tailDate.getTime())) {
        var ty = tailDate.getFullYear();
        return ty < 2400 &&(ty += 543),
        mixed[1] + "/" + String(ty)
      }
    }
  }
  if (_z4(v) || /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i.test(raw) || /GMT[+-]\d{4}|เวลาอินโดจีน/i.test(raw) || /^\d{4}-\d{1,2}-\d{1,2}(?:[T\s]|$)/.test(raw)) {
    try {
      if (_appIsFnName_("_rP")) {
        var no = _rP(v);
        if (no)return no
      }
    } catch (_e) {
      _c30W_("ec", _e)
    }
    var dt = _committeeMeetingDateText_(v),
    dm = _s_(dt).match(/^0?(\d{1,2})\/\d{1,2}\/((?:19|20|25)\d{2})$/);
    if (dm)return dm[1] + "/" + dm[2]
  }
  return raw
}
function _z55(row) {
  row = row || {
  };
  var out = {
  };
  return Object.keys(row).forEach(function(k) {
      out[k] = row[k]
    }),
  out.meetingId = _j(row.meetingId || ""),
  out.meetingNo = _j(row.meetingNo || ""),
  out.meetingDate = _committeeMeetingDateText_(row.meetingDate || row.date || ""),
  out.title = _j(row.title || _T9),
  out.status = _j(row.status || ""),
  out.note = _j(row.note || ""),
  out
}
function _z72(row) {
  row = row || {
  };
  var out = {
  };
  return Object.keys(row).forEach(function(k) {
      out[k] = row[k]
    }),
  out.itemId = _j(row.itemId || ""),
  out.meetingId = _j(row.meetingId || ""),
  out.agendaNo = _j(row.agendaNo || ""),
  out.seq = Number(row.seq || 0) || 0,
  out.title = _j(row.title || ""),
  out.relatedMeetingNo = _j(row.relatedMeetingNo || ""),
  out.relatedMeetingDate = _committeeMeetingDateText_(row.relatedMeetingDate || ""),
  out.caseId = _j(row.caseId || ""),
  out.caseNum = _caseMeetingAgendaNumberText_(row.caseNum || ""),
  out.recNo = _caseMeetingAgendaNumberText_(row.recNo || ""),
  out.caseTitle = _j(row.caseTitle || ""),
  out.letterId = "",
  out.letterNo = "",
  out.letterSubject = "",
  out.agencyOrPresenter = _j(row.agencyOrPresenter || ""),
  out.result = _j(row.result || ""),
  out.note = _j(row.note || ""),
  out
}
function _z70(prefix) {
  return String(prefix || "CM") + "-" + Utilities.getUuid().replace(/-/g, "").slice(0, 16).toUpperCase()
}
function _z56(raw, meetingId, idx) {
  var agendaNo = _j((raw = raw || {
      }).agendaNo || raw.agenda || ""),
  itemId;
  return {
    itemId: _j(raw.itemId || "") || _z70("CMI"),
    meetingId,
    agendaNo,
    seq: Number(raw.seq || idx || 1) || 1,
    title: _j(raw.title || raw.caseTitle || raw.subject || ""),
    relatedMeetingNo: _j(raw.relatedMeetingNo || raw.certifyMeetingNo || ""),
    relatedMeetingDate: _committeeMeetingDateText_(raw.relatedMeetingDate || raw.certifyMeetingDate || ""),
    caseId: _j(raw.caseId || ""),
    caseNum: _caseMeetingAgendaNumberText_(raw.caseNum || ""),
    recNo: _caseMeetingAgendaNumberText_(raw.recNo || ""),
    caseTitle: _j(raw.caseTitle || raw.title || ""),
    letterId: "",
    letterNo: "",
    letterSubject: "",
    agencyOrPresenter: _j(raw.agencyOrPresenter || raw.agency || raw.presenter || ""),
    result: _j(raw.result || raw.resolution || raw.note || ""),
    note: _j(raw.note || ""),
    isDeleted: !1,
    deletedAt: ""
  }
}
function _z50(item) {
  return!!(_j(item.title) || _j(item.relatedMeetingNo) || _j(item.relatedMeetingDate) || _j(item.caseId) || _j(item.caseTitle) || _j(item.agencyOrPresenter) || _j(item.result) || _j(item.note))
}
function _z57(item) {
  if ((item = item || {
      }).caseId)try {
    var found = _rx({
        caseId: item.caseId,
        caseNum: item.caseNum,
        recNo: item.recNo,
        title: item.title,
        caseTitle: item.caseTitle
      }).case;
    found &&(item.caseId = _j(found.caseId || item.caseId), item.caseNum = _caseMeetingAgendaNumberText_(found.caseNum || item.caseNum),
      item.recNo = _caseMeetingAgendaNumberText_(found.recNo || item.recNo), item.caseTitle = _j(found.caseTitle || found.title || item.caseTitle || item.title),
      item.title ||(item.title = item.caseTitle))
  } catch (_e) {
    _recordWarning_("committee.meeting.case.link", _e)
  }
  return item
}
function _z18(meeting, items) {
  var synced = [];
  return(items || []).forEach(function(item) {
      var agendaNo = _s_(item.agendaNo); if ((agendaNo === "1" || agendaNo === "3" || agendaNo === "4") && _s_(item.caseId).trim()) {
        var logId = "MSYS-" + _s_(item.itemId).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40),
        res = saveMeetingLog({
            logId,
            currentLogId: logId,
            caseId: item.caseId,
            caseNum: item.caseNum,
            recNo: item.recNo,
            title: item.caseTitle || item.title,
            round: meeting.meetingNo,
            date: _committeeMeetingDateText_(meeting.meetingDate),
            note: item.result || item.note,
            result: item.result || item.note,
            summary: [_Q(item.agendaNo),
              item.agencyOrPresenter].filter(function(v) {
                return!!_j(v)
              }).join(" / "),
            meetingId: meeting.meetingId
          }); synced.push({
            itemId: item.itemId,
            caseId: item.caseId,
            logId,
            result: res && res.data ? res.data: res
          })
      }
    }),
  synced
}
function _z15(value) {
  if (_z4(value))return value.getTime();
  var raw = _s_(value).trim();
  if (!raw)return 0;
  var m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    var y = Number(m[3]);
    return y > 2400 &&(y -= 543),
    new Date(y, Number(m[2]) - 1, Number(m[1])).getTime() || 0
  }
  var iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    var y2 = Number(iso[1]);
    return y2 > 2400 &&(y2 -= 543),
    new Date(y2, Number(iso[2]) - 1, Number(iso[3])).getTime() || 0
  }
  var d = new Date(raw.replace(/\s*\(.*?\)\s*/g, " ").replace(/เวลาอินโดจีน/g, ""));
  return isNaN(d.getTime()) ? 0: d.getTime()
}
function _z34(meeting, q) {
  return!q || [(meeting = meeting || {
      }).meetingNo,
    _committeeMeetingDateText_(meeting.meetingDate),
    meeting.title,
    meeting.status,
    meeting.note].join(" ").toLowerCase().indexOf(q) > - 1;
  var hay
}
function _z77(meeting, item, q, agendaFilter) {
  if (item = item || {
    }, agendaFilter && _s_(item.agendaNo) !== String(agendaFilter))return!1;
  if (!q)return!0;
  var title = _z7(item),
  hay;
  return[meeting && meeting.meetingNo,
    meeting && _committeeMeetingDateText_(meeting.meetingDate),
    meeting && meeting.title,
    title,
    item.title,
    item.caseTitle,
    item.caseNum,
    item.recNo,
    item.agencyOrPresenter,
    item.result,
    item.note,
    _Q(item.agendaNo)].join(" ").toLowerCase().indexOf(q) > - 1
}
function _z16(meeting, items) {
  function collect(agendaNo) {
    var out = [];
    return items.forEach(function(item) {
        if (_s_(item && item.agendaNo) === String(agendaNo)) {
          var title = _j(item && item.caseTitle || item && item.title || ""); title && out.indexOf(title) < 0 && out.push(title)
        }
      }),
    out
  }
  meeting = meeting || {
  },
  items = _c30A_(items) ? items: [];
  var titles = collect("3");
  return titles.length ||(titles = collect("1")),
  titles.length > 2 ? titles.slice(0, 2).join(" / ") + " และอีก " +(titles.length - 2) + " เรื่อง": titles.join(" / ") || _j(meeting.displayTitle || meeting.summaryTitle || meeting.title || _T9)
}
function _z6(payload) {
  payload = payload || {};
  var meetingId = _j(payload.meetingId || payload.id || "");
  var q = _j(payload.query || payload.q || payload.keyword || "").toLowerCase();
  var agendaFilter = _j(payload.agendaNo || payload.agenda || "");
  var forceFresh = payload.forceFresh === !0 || payload.noCache === !0 || payload.bypassCache === !0;
  var readOptions = {
    forceFresh: forceFresh,
    noCache: forceFresh,
    bypassCache: forceFresh,
    cacheTtlSeconds: forceFresh ? 0 : Number(payload.cacheTtlSeconds != null ? payload.cacheTtlSeconds : 180) || 180
  };
  var meetingsAll = _z52(_S25, !1, readOptions);
  var itemsAll = _z52(_S8, !1, readOptions).map(_z72);
  var allGrouped = {};

  itemsAll.forEach(function(item) {
    var id = _s_(item.meetingId);
    if (!allGrouped[id]) allGrouped[id] = [];
    allGrouped[id].push(item);
  });
  Object.keys(allGrouped).forEach(function(id) {
    allGrouped[id].sort(function(a, b) {
      return Number(a.agendaNo || 0) - Number(b.agendaNo || 0) || Number(a.seq || 0) - Number(b.seq || 0);
    });
  });

  var meetings = meetingsAll.filter(function(meeting) {
    var id = _s_(meeting.meetingId);
    if (meetingId) return id === meetingId;
    if (!q && !agendaFilter) return !0;
    var rows = allGrouped[id] || [];
    var hasAgenda = !agendaFilter || rows.some(function(item) {
      return _s_(item.agendaNo) === String(agendaFilter);
    });
    if (agendaFilter && !hasAgenda) return !1;
    return q ? !!_z34(meeting, q) || rows.some(function(item) {
      return _z77(meeting, item, q, agendaFilter);
    }) : hasAgenda;
  }).sort(function(a, b) {
    var an = Number(_s_(a.meetingNo).replace(/[^0-9.\-]/g, ""));
    var bn = Number(_s_(b.meetingNo).replace(/[^0-9.\-]/g, ""));
    if (!isNaN(an) && !isNaN(bn) && an !== bn) return an - bn;
    var cmp = _s_(a.meetingNo).localeCompare(_s_(b.meetingNo), "th", {
      numeric: !0,
      sensitivity: "base"
    });
    return cmp !== 0 ? cmp : _z15(a.meetingDate) - _z15(b.meetingDate);
  }).map(_z55);

  var ids = {};
  meetings.forEach(function(meeting) {
    ids[_s_(meeting.meetingId)] = !0;
  });
  var items = itemsAll.filter(function(item) {
    return ids[_s_(item.meetingId)] === !0;
  });
  var grouped = {};
  items.forEach(function(item) {
    var id = _s_(item.meetingId);
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(item);
  });
  Object.keys(grouped).forEach(function(id) {
    grouped[id].sort(function(a, b) {
      return Number(a.agendaNo || 0) - Number(b.agendaNo || 0) || Number(a.seq || 0) - Number(b.seq || 0);
    });
  });
  meetings.forEach(function(meeting) {
    var id = _s_(meeting.meetingId);
    var displayTitle = _z16(meeting, grouped[id] || []);
    meeting.displayTitle = displayTitle;
    meeting.summaryTitle = displayTitle;
  });

  return {
    meetings: meetings,
    items: items,
    itemsByMeetingId: grouped,
    spec: _z28(),
    filters: {
      query: q,
      agendaNo: agendaFilter,
      agendaLabel: agendaFilter ? _Q(agendaFilter) : "ทุกวาระ"
    },
    meta: {
      owner: "MeetingDomain.listMeetings",
      source: forceFresh ? "canonical-sheets-live" : "canonical-sheets-cache",
      forceFresh: forceFresh,
      meetingsRead: meetingsAll.length,
      agendaItemsRead: itemsAll.length,
      meetingsReturned: meetings.length,
      agendaItemsReturned: items.length
    }
  };
}
TrackingDomain.VERSION = "tracking-domain-final-current", TrackingDomain.normalize = function(res) {
  var data = res && res.data && typeof res.data == "object" ? res.data: res;
  if (data && typeof data == "object") {
    var rows = _c30A_(data.rows) ? data.rows: _c30A_(data.data) ? data.data: _c30A_(data.items) ? data.items: [];
    data.rows = rows,
    data.data = rows,
    data.items = rows,
    data.totalRecords = Number(data.totalRecords || data.total || rows.length || 0) || 0,
    data.total = data.totalRecords,
    data.page = Number(data.page || 1) || 1,
    data.limit = Number(data.limit || data.pageSize || 20) || 20,
    data.pageSize = data.limit,
    data.owner = "TrackingDomain.getTracking",
    data.domainOwner = "TrackingDomain",
    data.serverPaged = data.serverPaged !== !1
  }
  return res
}, TrackingDomain.getTracking = function(payload) {
  return payload = payload || {
  },
  _z61("apiGetTracking", payload, Number(payload.cacheTtlSeconds || 600) || 600, function(p) {
      return TrackingDomain.normalize(_rO(p))
    })
}, TrackingDomain.status = function() {
  return _domainStatusPhaseC_(TrackingDomain, "TrackingDomain")
}, AppDomain.Repositories.CaseRepository = {
  search: function(payload) {
    return CaseDomain.searchCases(payload || {
      })
  },
  readModel: function(payload) {
    return _z97(payload || {
      })
  },
  facets: function(payload) {
    return _z89(payload || {
      })
  }
}, CaseDomain.FACADE_PHASE5 = {
  owner: "Code_30_Domain_Cases:CaseService.ProductionOwner",
  repository: AppDomain.Repositories.CaseRepository,
  search: function(payload) {
    return CaseDomain.searchCases(payload || {
      })
  },
  reportOptions: function(payload) {
    return CaseDomain.getReportOptions(payload || {
      })
  },
  reportExportRows: function(payload) {
    return CaseDomain.getReportExportRows(payload || {
      })
  },
  quickSummary: function(payload) {
    return CaseDomain.quickSummary(payload || {
      })
  },
  meetingHistory: function(payload) {
    return typeof _z35 == "function" ? _z35(payload || {
      }): payload
  },
  status: function() {
    return {
      ok: !0,
      owner: this.owner,
      uiDomChanged: !1,
      businessLogicChanged: !1
    }
  }
};
function apiGetCommitteeMeetingSystemSpec(payload) {
  return MeetingDomain.getSystemSpec(payload || {
    })
}
function apiListCommitteeMeetings(payload) {
  return MeetingDomain.listMeetings(payload || {
    })
}
function apiGetCommitteeMeetingSystem(payload) {
  return MeetingDomain.getSystem(payload || {
    })
}
function _z7(item) {
  item = item || {
  };
  var agendaNo = _s_(item.agendaNo),
  label;
  return agendaNo === "2" ? ["การประชุมครั้งที่ " + _j(item.relatedMeetingNo || ""),
    _j(item.relatedMeetingDate || "")].filter(function(v) {
      return v && v !== "การประชุมครั้งที่ "
    }).join(" / ") || _j(item.title || "รับรองบันทึกการประชุม"): _j(agendaNo === "3" || agendaNo === "4" ? item.caseTitle || item.title || "": item.title || item.caseTitle || "")
}
function _Q(agendaNo) {
  var m;
  return {
    1: "ระเบียบวาระที่ 1 เรื่องแจ้ง",
    2: "ระเบียบวาระที่ 2 รับรองบันทึกการประชุม",
    3: "ระเบียบวาระที่ 3 เรื่องพิจารณา",
    4: "ระเบียบวาระที่ 4 เรื่องอื่น ๆ"
  }
  [_s_(agendaNo)] || "ระเบียบวาระ"
}
function _z66(payload) {
  var q = _j((payload = payload || {
      }).query || payload.keyword || "").toLowerCase(),
  agendaFilter = _j(payload.agendaNo || payload.agenda || ""),
  bundle = _z6({
      query: q,
      agendaNo: agendaFilter
    }),
  overviewRows = [],
  summaryMeetings = [],
  listMeetings = [];
  return(bundle.meetings || []).forEach(function(meeting) {
      var meetingId = _s_(meeting.meetingId),
      displayTitle = _j(meeting.displayTitle || meeting.summaryTitle || meeting.title || _T9); listMeetings.push({
          meetingId,
          meetingNo: _j(meeting.meetingNo || ""),
          meetingDate: _j(meeting.meetingDate || ""),
          title: displayTitle,
          displayTitle,
          summaryTitle: displayTitle,
          note: _j(meeting.note || "")
        }); var meetingItems =(bundle.itemsByMeetingId && bundle.itemsByMeetingId[meetingId] || []).filter(function(item) {
          return!agendaFilter || _s_(item.agendaNo) === agendaFilter
        }),
      agenda13 = meetingItems.filter(function(item) {
          var agendaNo = _s_(item.agendaNo); return(agendaNo === "1" || agendaNo === "3" || agendaNo === "4") && !!_s_(item.caseId).trim()
        }).map(function(item) {
          return {
            meetingId,
            meetingNo: _j(meeting.meetingNo || ""),
            meetingDate: _j(meeting.meetingDate || ""),
            meetingTitle: displayTitle,
            displayTitle,
            agendaNo: _j(item.agendaNo || ""),
            agendaLabel: _Q(item.agendaNo),
            title: _z7(item),
            caseId: _j(item.caseId || ""),
            caseNum: _caseMeetingAgendaNumberText_(item.caseNum || ""),
            recNo: _caseMeetingAgendaNumberText_(item.recNo || ""),
            agencyOrPresenter: _j(item.agencyOrPresenter || ""),
            result: _j(item.result || item.note || "")
          }
        }); overviewRows = overviewRows.concat(agenda13),
      summaryMeetings.push({
          meetingId,
          meetingNo: _j(meeting.meetingNo || ""),
          meetingDate: _j(meeting.meetingDate || ""),
          title: displayTitle,
          displayTitle,
          note: _j(meeting.note || ""),
          items: meetingItems.map(function(item) {
              return {
                itemId: _j(item.itemId || ""),
                agendaNo: _j(item.agendaNo || ""),
                agendaLabel: _Q(item.agendaNo),
                seq: Number(item.seq || 0) || 0,
                title: _z7(item),
                relatedMeetingNo: _j(item.relatedMeetingNo || ""),
                relatedMeetingDate: _j(item.relatedMeetingDate || ""),
                caseId: _j(item.caseId || ""),
                caseNum: _caseMeetingAgendaNumberText_(item.caseNum || ""),
                recNo: _caseMeetingAgendaNumberText_(item.recNo || ""),
                agencyOrPresenter: _j(item.agencyOrPresenter || ""),
                result: _j(item.result || item.note || "")
              }
            })
        })
    }),
  {
    overviewRows,
    listMeetings,
    tableMeetings: listMeetings,
    summaryMeetings,
    filters: {
      query: q,
      agendaNo: agendaFilter,
      agendaLabel: agendaFilter ? _Q(agendaFilter): "ทุกวาระ"
    },
    generatedAt: new Date().toISOString(),
    totalOverviewRows: overviewRows.length,
    totalListMeetings: listMeetings.length,
    totalSummaryMeetings: summaryMeetings.length
  }
}
function apiGetCommitteeMeetingPrintBundle(payload) {
  return MeetingDomain.getPrintBundle(payload || {
    })
}
function apiSearchMeetingAgendaCases(payload) {
  return MeetingDomain.searchAgendaCases(payload || {
    })
}
function apiSaveCommitteeMeetingSystem(payload) {
  return writeGateway_("apiSaveCommitteeMeetingSystem", payload || {
    }, function(input) {
      return MeetingDomain.saveSystem(input || {
        })
    }, "บันทึกการประชุมสำเร็จ", "บันทึกการประชุมไม่สำเร็จ")
}
function apiDeleteCommitteeMeetingSystem(payload) {
  return writeGateway_("apiDeleteCommitteeMeetingSystem", payload || {
    }, function(input) {
      return MeetingDomain.deleteSystem(input || {
        })
    }, "ลบการประชุมสำเร็จ", "ลบการประชุมไม่สำเร็จ")
}
MeetingDomain.VERSION = "meeting-domain-final-current", MeetingDomain.status = function() {
  return _domainStatusPhaseC_(MeetingDomain, "MeetingDomain")
}, MeetingDomain.getSystemSpec = function(payload) {
  return payload = requireDomainRequest_(payload || {
    }, "viewer"),
  ok_(_z28(), "โหลดรายละเอียดชีตการประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.listMeetings = function(payload) {
  var bundle = _z6((payload = requireDomainRequest_(payload || {
        }, "viewer")) || {
    });
  return ok_(bundle, "โหลดการประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.getSystem = function(payload) {
  var bundle = _z6((payload = requireDomainRequest_(payload || {
        }, "viewer")) || {
    }),
  first = bundle.meetings && bundle.meetings[0] || null;
  return ok_({
      meeting: first,
      items: first && bundle.itemsByMeetingId[_s_(first.meetingId)] || [],
      spec: bundle.spec
    }, first ? "โหลดข้อมูลการประชุมสำเร็จ": "ไม่พบข้อมูลการประชุม")
}, MeetingDomain.getPrintBundle = function(payload) {
  return payload = requireDomainRequest_(payload || {
    }, "viewer"),
  ok_(_z66(payload || {
      }), "โหลดข้อมูลพิมพ์การประชุมคณะกรรมาธิการสำเร็จ")
}, MeetingDomain.searchAgendaCases = function(payload) {
  var q = _j((payload = requireDomainRequest_(payload || {
        }, "viewer")).query || payload.q || "").toLowerCase();
  if (q.length < 1)return ok_({
      rows: []
    }, "กรุณาระบุคำค้น");
  var limit = Number(payload.limit || 30) || 30,
  rows,
  out = _rg(_S2, [_S12,
      _T4,
      _S23,
      _S28,
      _S7,
      _S3,
      _S32,
      _S18,
      _S31,
      _S5,
      _S16,
      _S4,
      _S6], {
      includeDeleted: !1,
      requireCanonical: !0,
      ttl: 180
    }).filter(function(r) {
      return!isSoftDeletedRow_(r) && [_caseMeetingAgendaNumberText_(r.caseNum || ""),
        _caseMeetingAgendaNumberText_(r.recNo || ""),
        r.title,
        r.caseTitle,
        r.petitioners,
        r.respondent,
        r.status,
        r.agencyName].join(" ").toLowerCase().indexOf(q) > - 1
    }).slice(0, limit).map(function(r) {
      var caseNum = _caseMeetingAgendaNumberText_(r.caseNum || ""),
      recNo = _caseMeetingAgendaNumberText_(r.recNo || ""); return {
        caseId: _s_(r.caseId),
        caseNum,
        recNo,
        title: _s_(r.title),
        caseTitle: _s_(r.caseTitle || r.title),
        petitioners: _s_(r.petitioners),
        respondent: _s_(r.respondent),
        status: _s_(r.status),
        agencyName: _s_(r.agencyName)
      }
    });
  return ok_({
      rows: out,
      totalRecords: out.length
    }, "ค้นหาเรื่องพิจารณาสำเร็จ")
}, MeetingDomain.saveSystem = function(payload) {
  return payload = requireDomainRequest_(payload || {
    }, _S36),
  domainWrite_("apiSaveCommitteeMeetingSystem", payload, function(input) {
      ensureCanonicalHeadersForNewSheet_(_S25),
      ensureCanonicalHeadersForNewSheet_(_S8); var now = new Date().toISOString(),
      meetingInput = input.meeting || input || {
      },
      meetingId = _j(meetingInput.meetingId || input.meetingId || "") || _z70("CMTG"),
      meeting = {
        meetingId,
        meetingNo: _j(meetingInput.meetingNo || meetingInput.round || input.meetingNo || ""),
        meetingDate: _committeeMeetingDateText_(meetingInput.meetingDate || meetingInput.date || input.meetingDate || ""),
        title: _j(meetingInput.title || _T9),
        status: _j(meetingInput.status || "บันทึก"),
        note: _j(meetingInput.note || ""),
        isDeleted: !1,
        deletedAt: ""
      }; if (!meeting.meetingNo)throw new Error("กรุณาระบุการประชุมครั้งที่"); if (!meeting.meetingDate)throw new Error("กรุณาระบุวันเดือนปีการประชุม"); var meetingResult = _z3("committee.meetings").upsert(meetingId,
        meeting),
      incoming = []; ["agenda1",
        "agenda2",
        "agenda3",
        "agenda4"].forEach(function(k, idx) {
          var arr = input[k] || []; _c30A_(arr) ||(arr = []),
          arr.forEach(function(row, i) {
              (row = row || {
                }).agendaNo = String(idx + 1),
              row.seq = row.seq || i + 1,
              incoming.push(row)
            })
        }),
      _c30A_(input.items) &&(incoming = incoming.concat(input.items)); var repo = _z3("committee.meetingAgendaItems"),
      existing = repo.listActive().filter(function(r) {
          return _s_(r.meetingId) === meetingId
        }),
      keep = {
      },
      saved = []; incoming.forEach(function(row, i) {
          var item = _z56(row, meetingId, i + 1); if (_z50(item = _z57(item))) {
            var res = repo.upsert(item.itemId, item, {
                now
              }); keep[item.itemId] = !0,
            saved.push(res.row || item)
          }
        }),
      existing.forEach(function(row) {
          var id = _s_(row.itemId); id && !keep[id] && repo.softDelete(id, {
              deletedAt: now,
              updatedAt: now
            })
        }); var synced = _z18(meeting, saved); return _appIsFnName_("_invalidateMeetingDerivedCaches_") && _invalidateMeetingDerivedCaches_("committeeMeetingSystem"),
      typeof invalidateSheetCache_ == "function" &&(invalidateSheetCache_(_S25), invalidateSheetCache_(_S8),
        invalidateSheetCache_(_S0)),
      ok_({
          meetingId,
          mode: meetingResult.mode,
          items: saved,
          syncedMeetingLogs: synced
        }, "บันทึกการประชุมคณะกรรมาธิการสำเร็จ")
    })
}, MeetingDomain.deleteSystem = function(payload) {
  return payload = requireDomainRequest_(payload || {
    }, _S36),
  domainWrite_("apiDeleteCommitteeMeetingSystem", payload, function(input) {
      var meetingId = _j(input.meetingId || input.id || ""); if (!meetingId)throw new Error("ไม่พบรหัสการประชุม"); var now = new Date().toISOString(); return _z3("committee.meetings").softDelete(meetingId,
        {
          deletedAt: now,
          updatedAt: now
        }),
      _z3("committee.meetingAgendaItems").listActive().filter(function(r) {
          return _s_(r.meetingId) === meetingId
        }).forEach(function(r) {
          _z3("committee.meetingAgendaItems").softDelete(_s_(r.itemId), {
              deletedAt: now,
              updatedAt: now
            })
        }),
      typeof invalidateSheetCache_ == "function" &&(invalidateSheetCache_(_S25), invalidateSheetCache_(_S8)),
      ok_({
          meetingId
        }, "ลบข้อมูลการประชุมสำเร็จ")
    })
};
DashboardDomain.PHASEF_STATUS_READ_MODEL = _phaseFDashboardStatusReadModelContract_();
