var __APP_GLOBAL__ = (typeof __APP_GLOBAL__ !== 'undefined' && __APP_GLOBAL__) || (typeof globalThis !== 'undefined' && globalThis) || this || {};
var AppDomain = __APP_GLOBAL__.AppDomain = __APP_GLOBAL__.AppDomain || {};
var AppDataService = __APP_GLOBAL__.AppDataService = __APP_GLOBAL__.AppDataService || {};
function getSpreadsheet_() {
  return _resolveSpreadsheetHandle_().ss
}
function getSheet_(name) {
  var sh = getSpreadsheet_().getSheetByName(name);
  if(! sh)throw new Error("ไม่พบชีต: " + name);
  return sh
}
function _i3WritePathPolicy_(sheetName, operation, opts) {
  opts = opts || {
  };
  var mode = String(_scriptProp_("APP_WRITE_FLUSH_POLICY", "AUTO") || "AUTO").trim().toUpperCase(), force =! 0 === opts.flush || "Y" === String(opts.flush || "").toUpperCase(), never =! 1 === opts.flush || "NONE" === mode || "OFF" === mode, op = String(operation || "write"), critical = /repair|canonical|schema|security|password|admin/i.test(op) || /Users|SystemSettings|Config/i.test(String(sheetName || "")), beforeRead =! 0 === opts.beforeReadAfterWrite ||! 0 === opts.readAfterWrite, flush = force &&! never ||! never && ("ALWAYS" === mode || "STRICT" === mode || "AUTO" === mode && (critical || beforeRead));
  return {
    stamp: "write-path-policy-current", sheetName: String(sheetName || ""), operation: op, mode: mode, flush: !! flush, reason: flush ? force ? "forced": critical ? "critical-write": "read-after-write": "deferred"
  }
}
function _i3FlushAfterWrite_(sheetName, operation, opts) {
  var policy = _i3WritePathPolicy_(sheetName, operation, opts || {
  });
  if(! policy.flush)return {
    flushed: ! 1, policy: policy
  };
  try {
    return"undefined" != typeof AppRepository && AppRepository.flush && AppRepository.flush(), {
      flushed: ! 0, policy: policy
    }
  }
  catch(e) {
    return _recordWarning_("i3.write.flush.failed", e, {
      sheetName: sheetName, operation: operation
    }), {
      flushed: ! 1, policy: policy, error: String(e && e.message || e)
    }
  }
}
function _i3InvalidateReadModelsForSheet_(sheetName, reason) {
  return AppDataService.invalidateReadModelsForSheet(sheetName, reason)
}
function _afterSheetWrite_(sheetName, context) {
  context = context || {
  };
  var operation = String(context.operation || "write"), invalidated = null;
  try {
    invalidated = invalidateSheetCache_(sheetName)
  }
  catch(e) {
    _recordWarning_("i3.afterWrite.invalidate.failed", e, {
      sheetName: sheetName, operation: operation
    })
  }
  var flush = _i3FlushAfterWrite_(sheetName, operation, context);
  return {
    stamp: "write-path-current", sheetName: String(sheetName || ""), operation: operation, cacheInvalidation: invalidated || null, flush: flush
  }
}
function _i3SheetRowIndexRequestKey_(sheetName, keyField, stamp, lastRow) {
  return JSON.stringify({
    s: String(sheetName || ""), k: String(keyField || ""), v: String(stamp || "1"), r: Math.max(1, Number(lastRow || 1) || 1)
  })
}
function _i3AdaptiveReadBatchRows_(totalRows, width, opts) {
  opts = opts || {};
  totalRows = Math.max(0, Number(totalRows || 0) || 0), width = Math.max(1, Number(width || 1) || 1);
  var explicit = Number(opts.readBatchRows || opts.serviceBatchRows || 0) || 0;
  if(explicit > 0)return Math.max(100, Math.min(explicit, 1e4, Math.max(totalRows, 100)));
  var targetCells = Math.max(2e4, Math.min(Number(opts.targetCellsPerRead || 1e5) || 1e5, 25e4)), byCells = Math.floor(targetCells / width), rows = Math.max(250, Math.min(byCells || 250, 5e3));
  return totalRows > 0 ? Math.min(totalRows, rows): rows
}
function _i3SheetRowIndexCacheKey_(sheetName, keyField, stamp, lastRow) {
  var seed = _i3SheetRowIndexRequestKey_(sheetName, keyField, stamp, lastRow), digest = _appIsFnName_("_hashPassword_") ? _hashPassword_(seed).substring(0, 32): seed;
  return "sheet_row_index_current_" + String(digest || "").replace(/[^A-Za-z0-9:_-]/g, "_").substring(0, 120)
}
function _i3SheetRowIndexCacheGet_(cacheKey) {
  try {
    var cache = _AppScriptCache_(), raw = cache && cache.get(_AppCacheKey_(cacheKey));
    if(raw) {
      var parsed = JSON.parse(raw);
      if(parsed && Array.isArray(parsed.rows))return parsed
    }
    var partitioned = _AppCacheGetPartitionedRows_(cacheKey);
    if(partitioned && Array.isArray(partitioned.rows))return {
      rows: partitioned.rows, meta: partitioned.manifest && partitioned.manifest.meta || {}, partitioned: !0
    }
  }
  catch(e) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("i3.rowIndex.cacheGet", e, { cacheKey: cacheKey })
  }
  return null
}
function _i3SheetRowIndexCachePut_(cacheKey, idxMap, ttl, meta) {
  try {
    var rows = Object.keys(idxMap || {}).map(function(key) {
      return[key, Number(idxMap[key] || 0)]
    }), envelope = { rows: rows, meta: meta || {} }, text = JSON.stringify(envelope), cache = _AppScriptCache_();
    if(!cache)return !1;
    if(_cacheByteLength_(text) <= _cacheSoftLimitBytes_())return safeCachePut_(cache, _AppCacheKey_(cacheKey), text, ttl);
    return _AppCachePutPartitionedRows_(cacheKey, rows, ttl, Object.assign({ owner: "i3-sheet-row-index-current" }, meta || {}))
  }
  catch(e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("i3.rowIndex.cachePut", e, { cacheKey: cacheKey }), !1
  }
}
function _i3SheetRowIndexByKey_(sheetName, keyField, keyIndex, opts) {
  opts = opts || {};
  var bypassRequestCache = opts.bypassRequestCache === true || opts.forceFresh === true, sh = getSheet_(sheetName), lastRow = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 1), stamp = "1";
  try {
    _appIsFnName_("_entityCacheStamp_") && (stamp = _entityCacheStamp_(String(sheetName || "").toLowerCase()))
  }
  catch(_e) {
    _appIgnore_(_e, "c.s")
  }
  var reqKey = _i3SheetRowIndexRequestKey_(sheetName, keyField, stamp, lastRow), cacheKey = _i3SheetRowIndexCacheKey_(sheetName, keyField, stamp, lastRow);
  if(!bypassRequestCache) {
    var hit = _requestScopeGet_("i3SheetRowIndex", reqKey);
    if(hit && hit.map)return hit
  }
  var headers = opts.headers || _sheetHeaders_(sheetName), map = opts.headerMap || _canonicalHeaderIndexMap_(sheetName, headers);
  if((null == keyIndex || keyIndex < 0) && void 0 === (keyIndex = map[keyField]) && (keyIndex = map[_normalizedHeaderKey_(keyField)]), null == keyIndex || keyIndex < 0) {
    var missingKeyResult = {
      ok: !1, map: {}, keyIndex: -1, reason: "key field not found", cacheBypassed: bypassRequestCache
    };
    return bypassRequestCache ? missingKeyResult: _requestScopePut_("i3SheetRowIndex", reqKey, missingKeyResult)
  }
  if(!bypassRequestCache && !1 !== opts.allowScriptCache) {
    var cached = _i3SheetRowIndexCacheGet_(cacheKey);
    if(cached && Array.isArray(cached.rows)) {
      var cachedMap = {};
      cached.rows.forEach(function(pair) {
        if(Array.isArray(pair) && pair.length > 1 && String(pair[0] || ""))cachedMap[String(pair[0])] = Number(pair[1] || 0)
      });
      _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_(cached.partitioned ? "sheetRowIndexPartition": "sheetRowIndex", !0, 1);
      return _requestScopePut_("i3SheetRowIndex", reqKey, {
        ok: !0, sheetName: String(sheetName || ""), keyField: String(keyField || ""), keyIndex: Number(keyIndex), map: cachedMap, rowCount: Math.max(0, lastRow - 1), stamp: stamp, mode: cached.partitioned ? "script-cache-partition-index": "script-cache-index", cacheBypassed: !1, cacheHit: !0, serviceReads: 0
      })
    }
    _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_("sheetRowIndex", !1, 1)
  }
  for(var totalRows = Math.max(0, lastRow - 1), batchSize = _i3AdaptiveReadBatchRows_(totalRows, 1, opts), idxMap = {}, rowsRead = 0, serviceReads = 0, row = 2;
  row <= lastRow;
  row += batchSize) {
    var take = Math.min(batchSize, lastRow - row + 1);
    if(take <= 0)break;
    var values = sh.getRange(row, Number(keyIndex) + 1, take, 1).getValues() || [];
    serviceReads ++, rowsRead += values.length;
    for(var i = 0; i < values.length; i ++ ) {
      var key = String(null == values[i][0] ? "": values[i][0]);
      "" === key || Object.prototype.hasOwnProperty.call(idxMap, key) || (idxMap[key] = row + i)
    }
  }
  try {
    _requestScopeNoteRowsRead_(sheetName, rowsRead)
  }
  catch(_n) {
    _appIgnore_(_n, "c.s")
  }
  var result = {
    ok: !0, sheetName: String(sheetName || ""), keyField: String(keyField || ""), keyIndex: Number(keyIndex), map: idxMap, rowCount: rowsRead, stamp: stamp, mode: bypassRequestCache ? "key-column-direct-fresh-index": "key-column-adaptive-index", cacheBypassed: bypassRequestCache, cacheHit: !1, serviceReads: serviceReads, readBatchRows: batchSize
  };
  if(!bypassRequestCache && !1 !== opts.allowScriptCache)_i3SheetRowIndexCachePut_(cacheKey, idxMap, Math.max(30, Math.min(Number(opts.cacheTtlSeconds || 180) || 180, 600)), {
    sheetName: String(sheetName || ""), keyField: String(keyField || ""), stamp: stamp, lastRow: lastRow, rowCount: rowsRead
  });
  return bypassRequestCache ? result: _requestScopePut_("i3SheetRowIndex", reqKey, result)
}

function _i3FindRowNumberByKey_(sheetName, keyField, keyValue, keyIndex, opts) {
  var idx = _i3SheetRowIndexByKey_(sheetName, keyField, keyIndex, opts || {
  });
  if(! idx ||! idx.ok)return 0;
  var key = String(null == keyValue ? "": keyValue);
  return Number(idx.map[key] || 0) || 0
}
function ensureHeaderColumn_(sheetName, headerName) {
  var sh = getSheet_(sheetName), headerRow = sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0] || [], idx = headerRow.indexOf(headerName);
  if(- 1 !== idx)return idx + 1;
  var nextCol = Math.max(1, headerRow.length) + 1;
  return sh.getRange(1, nextCol).setValue(headerName), invalidateSheetCache_(sheetName), nextCol
}
function deleteRowById_(sheetName, id, idColumnIndex) {
  ensureCanonicalHeadersForNewSheet_(sheetName);
  var audit = getCanonicalHeaderAudit_(sheetName);
  if(audit.missing.length && "Users" !== sheetName)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var sh = getSheet_(sheetName), headers = _sheetHeaders_(sheetName), col = Number(idColumnIndex || 0), keyField = headers[col] || "id";
  if(- 1 !== headers.indexOf("isDeleted"))return softDeleteSheetObjectByKey_(sheetName, keyField, id);
  var activeCol = headers.indexOf("active"), updatedAtCol = headers.indexOf("updatedAt");
  - 1 === activeCol && (activeCol = ensureHeaderColumn_(sheetName, "active") - 1, headers = _sheetHeaders_(sheetName)), - 1 === updatedAtCol && (updatedAtCol = ensureHeaderColumn_(sheetName, "updatedAt") - 1, headers = _sheetHeaders_(sheetName));
  var rowNumber = _i3FindRowNumberByKey_(sheetName, keyField, id, col, {
    headers: headers, forceFresh: !0
  });
  if(! rowNumber)return ! 1;
  var width = Math.max(headers.length, Number(sh.getLastColumn && sh.getLastColumn()) || headers.length || 1), row = sh.getRange(rowNumber, 1, 1, width).getValues()[0] || [];
  return row[activeCol] = "N", row[updatedAtCol] = new Date, sh.getRange(rowNumber, 1, 1, width).setValues([row.slice(0, width)]), _afterSheetWrite_(sheetName, {
    operation: "deleteRowById_", rows: 1
  }), ! 0
}
function sheetToObjects_(sh) {
  var rows = "function" == typeof getSheetMatrixCached_ ? getSheetMatrixCached_(sh): getSheetMatrix_(sh);
  if(rows.length < 2)return[];
  var headers = rows[0];
  return rows.slice(1).map(function(row) {
    var obj = {
    };
    return headers.forEach(function(h, i) {
      obj[String(h).trim()] = row[i]
    }), obj
  })
}
function _isMeaningfulCellValue_(value) {
  return null != value && ("string" != typeof value || "" !== String(value).trim())
}
function _trimMatrixTail_(matrix, minCols) {
  if(! (matrix = Array.isArray(matrix) ? matrix: []).length)return[];
  for(var lastRow = matrix.length - 1;
  lastRow > 0;
  ) {
    for(var row = matrix[lastRow] || [], rowHasValue =! 1, i = 0;
    i < row.length;
    i ++ )if(_isMeaningfulCellValue_(row[i])) {
      rowHasValue =! 0;
      break
    }
    if(rowHasValue)break;
    lastRow --
  }
  var trimmed = matrix.slice(0, lastRow + 1).map(function(row) {
    return Array.isArray(row) ? row.slice(): []
  }), lastCol = Math.max(Number(minCols) || 0, 1);
  return trimmed.forEach(function(row) {
    for(var c = row.length - 1;
    c >= 0;
    c -- )if(_isMeaningfulCellValue_(row[c])) {
      c + 1 > lastCol && (lastCol = c + 1);
      break
    }
  }), trimmed.map(function(row) {
    for(;
    row.length < lastCol;
    )row.push("");
    return row.slice(0, lastCol)
  })
}
function _readSheetMatrixBodyPartitioned_(sh, startRow, width, opts) {
  opts = opts || {
  };
  var out = [];
  if(! sh ||! sh.getRange)return out;
  var lastRow = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 1);
  if(startRow = Math.max(2, Number(startRow || 2) || 2), width = Math.max(1, Number(width || 1) || 1), lastRow < startRow)return out;
  for(var batchSize = Math.max(50, Math.min(Number(opts.batchSize || opts.partitionBatchSize || 300) || 300, 1e3)), maxRows = Number(opts.maxRows || opts.maxScanRows || 0) || 0, scanned = 0, row = startRow;
  row <= lastRow;
  row += batchSize) {
    var take = Math.min(batchSize, lastRow - row + 1);
    if(maxRows > 0 && (take = Math.min(take, maxRows - scanned)), take <= 0)break;
    for(var chunk = sh.getRange(row, 1, take, width).getValues() || [], i = 0;
    i < chunk.length;
    i ++ )out.push(chunk[i]);
    if(scanned += chunk.length, maxRows > 0 && scanned >= maxRows)break
  }
  try {
    _appIsFnName_("_requestScopeNoteRowsRead_") && _requestScopeNoteRowsRead_(sh.getName ? sh.getName(): "sheet", scanned)
  }
  catch(_n) {
    _appIgnore_(_n, "c.s")
  }
  return out
}
function getSheetMatrix_(sh, minCols, opts) {
  if(! sh)return[];
  opts = opts || {
  };
  var lr = Math.max(Number(sh.getLastRow()) || 0, 1), raw = Math.max(Number(sh.getLastColumn()) || 0, Number(minCols) || 0, 1), schema = [];
  try {
    schema = SHEET_SCHEMAS[String(sh.getName() || "")] || []
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
  for(var header = sh.getRange(1, 1, 1, raw).getValues()[0] || [], w =! 0 === opts.allowFullMatrix ? raw: Math.max(Number(minCols) || 0, schema.length, 1), c = header.length - 1;
  c >= 0;
  c -- )if(_isMeaningfulCellValue_(header[c])) {
    w = Math.max(w, c + 1);
    break
  }
  w = Math.max(1, Math.min(w, raw));
  var values = [header.slice(0, w)];
  if(lr > 1)for(var body = _readSheetMatrixBodyPartitioned_(sh, 2, w, opts), r = 0;
  r < body.length;
  r ++ )values.push(body[r]);
  return _trimMatrixTail_(values, minCols)
}
function filterDeleted_(rows) {
  return rows = Array.isArray(rows) ? rows: [], _appIsFnName_("_isDeletedCanonical_") ? rows.filter(function(r) {
    return ! _isDeletedCanonical_(r)
  }): rows.filter(function(r) {
    var v = r && r.isDeleted;
    return ! 0 !== v && ("string" != typeof v || "TRUE" !== v.trim().toUpperCase())
  })
}
var BUDGET_IMPORT_SCHEMA = ["id", "fy", "entryType", "committeeType", "startDate", "endDate", "activityDate", "seminarDate", "committeeName", "roundNo", "topic", "visitLocations", "seminarLocations", "countriesText", "meetingAllowance", "snackCost", "lunchCost", "travelCost", "receptionCost", "seminarCost", "foreignTripCost", "foreignGuestCost", "amount", "committeeResponsible", "staffResponsible", "note", "createdAt", "updatedAt", "refundStatus", "refundDate", "reportStatus", "reportDate", "visitLocationsJson", "seminarLocationsJson", "countriesJson", "totalAmount", "payloadJson", "category", "item", "supportCost", "visitLocationsText", "seminarLocationsText", "isDeleted", "deletedAt"], BUDGET_IMPORT_HEADER_ALIASES = {
  payloadjson: "payloadJson", payload_json: "payloadJson", visitlocationsjson: "visitLocationsJson", seminarlocationsjson: "seminarLocationsJson", countriesjson: "countriesJson", returndate: "refundDate", refunddate: "refundDate", reportdate: "reportDate", "ปีงบประมาณ": "fy", "ปีงบ": "fy", fiscalyear: "fy", budgetfy: "fy", year: "fy", "ประเภท": "entryType", "ประเภทรายการ": "entryType", "ประเภทรายการงบประมาณ": "entryType", category: "category", entrytype: "entryType", itemtype: "entryType", "รายการ": "item", "ชื่อรายการ": "item", "รายการงบประมาณ": "item", itemname: "item", topic: "topic", "เรื่อง": "topic", "วันที่": "activityDate", "วันเดือนปี": "activityDate", "วันที่ดำเนินการ": "activityDate", activitydate: "activityDate", startdate: "startDate", enddate: "endDate", seminardate: "seminarDate", "จำนวนเงิน": "amount", "ยอดรวม": "amount", "รวมเป็นเงิน": "amount", totalamount: "totalAmount", spent: "amount", "ค่าเบี้ยประชุมกรรมาธิการ": "meetingAllowance", meetingallowance: "meetingAllowance", "ค่าอาหารว่าง": "snackCost", snackcost: "snackCost", "ค่าอาหารกลางวัน": "lunchCost", lunchcost: "lunchCost", "ค่าเบี้ยเลี้ยงค่าเช่าที่พักค่าพาหนะ": "travelCost", "ค่าเบี้ยเลี้ยง/ค่าเช่าที่พัก/ค่าพาหนะ": "travelCost", travelcost: "travelCost", "ค่าใช้จ่ายในการส่งเสริมและสนับสนุนการทำงานของคณะกรรมาธิการ": "supportCost", supportcost: "supportCost", "ค่าใช้จ่ายในการจัดสัมมนาของคณะกรรมาธิการสามัญ": "seminarCost", seminarcost: "seminarCost", "ค่าใช้จ่ายเพื่อรับรองแขกต่างประเทศของคณะกรรมาธิการ": "foreignGuestCost", foreignguestcost: "foreignGuestCost", foreigntripcost: "foreignTripCost", "สถานะการคืนเงิน": "refundStatus", refundstatus: "refundStatus", "วันที่คืนเงิน": "refundDate", "สถานะรายงาน": "reportStatus", "สถานะรายงานค่าใช้จ่าย": "reportStatus", reportstatus: "reportStatus", "วันที่รายงาน": "reportDate", isdeleted: "isDeleted", deleted: "isDeleted", deletedat: "deletedAt"
}, SHEET_SCHEMAS = {
  Users: ["username", "name", "role", "email", "passwordHash", "active", "lastLoginAt", "updatedAt"], AuditLog: ["timestamp", "action", "user", "detail"], MainData: ["caseId", "cat", "subCat", "recNo", "offerDate", "recDate", "title", "petitioners", "status", "assignees", "staffs", "respondent", "coAssignees", "caseNum", "remark", "caseTitle", "agencyName", "closedReason", "rejectionReason", "petitionerPhone", "subject", "caseType", "topic", "subcommittee", "owner", "dueDate", "createdAt", "updatedAt", "meetingStatus", "isDeleted", "deletedAt", "keySummary"], Letters: ["letterId", "caseId", "letterNo", "letterDate", "agency", "subject", "issue", "dueDate", "extendDate", "remark", "letterStatus", "repliesJSON", "opStaff", "bookNo", "officer", "createdAt", "updatedAt", "isDeleted", "deletedAt"], MeetingLogs: ["caseId", "round", "date", "note", "logId", "meetingId", "meetingDate", "title", "location", "attendees", "summary", "result", "committeeType", "subcommitteeId", "subcommitteeName", "meetingGroup", "createdAt", "updatedAt", "isDeleted", "deletedAt"], CommitteeMeetings: ["meetingId", "meetingNo", "meetingDate", "title", "status", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"], CommitteeMeetingAgendaItems: ["itemId", "meetingId", "agendaNo", "seq", "title", "relatedMeetingNo", "relatedMeetingDate", "caseId", "caseNum", "recNo", "caseTitle", "letterId", "letterNo", "letterSubject", "agencyOrPresenter", "result", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"], Petitioners: ["petId", "name", "phone", "addressLine", "subDistrict", "district", "province", "postalCode", "address", "petitionerId", "idCard", "caseId", "remark", "createdAt", "updatedAt", "isDeleted", "deletedAt"], Personnel_Comm: ["id", "sortOrder", "name", "position", "phone", "startDate", "endDate", "status", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"], Personnel_Op: ["id", "name", "position", "phone", "startDate", "endDate", "status", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"], Personnel_Staff: ["id", "name", "position", "personnelType", "phone", "proposedBy", "startDate", "endDate", "status", "orderRef", "remark", "createdAt", "updatedAt", "isGov", "commandRef", "isDeleted", "deletedAt"], Personnel_Subcommittees: ["id", "sortOrder", "personId", "name", "subcommitteeId", "subcommitteeName", "position", "phone", "startDate", "endDate", "status", "appointmentDate", "note", "createdAt", "updatedAt", "isDeleted", "deletedAt"], Subcommittees: ["id", "name", "status", "appointmentDate", "dutyStartDate", "endDate", "activeDays", "dueDays", "dueDate", "extensionDays", "totalExtensionDays", "extendedDueDate", "extensionHistory", "remark", "updatedAt", "isDeleted", "deletedAt"], SalarySettings: ["fy", "Key", "Value", "UpdatedAt", "isDeleted", "deletedAt"], SalaryPayments: ["id", "fy", "personId", "personName", "position", "monthlyRate", "months", "amount", "createdAt", "updatedAt", "isDeleted", "deletedAt"], BudgetYearSettingsItems: ["fy", "category", "item", "budget", "remark", "active", "planGroup", "sortNo", "updatedAt", "isDeleted", "deletedAt"], BudgetYearSettings: ["fy", "category", "item", "budget", "remark", "active", "planGroup", "sortNo", "updatedAt"], BudgetImports: BUDGET_IMPORT_SCHEMA.slice(), BudgetSummary: ["id", "fy", "planGroup", "item", "budget", "spent", "remain", "updatedAt"], SystemSettings: ["key", "value", "updatedAt", "isDeleted", "deletedAt"], Config: ["key", "value", "updatedAt"], ThailandLocations: ["province", "district", "subDistrict", "zip"]
}, SHEET_HEADER_ALIASES = Object.assign({
  Users: {
    passwordhash: "passwordHash", updatedat: "updatedAt", lastloginat: "lastLoginAt"
  }, BudgetImports: Object.assign({
  }, BUDGET_IMPORT_HEADER_ALIASES), MainData: {
    "เลขรับเรื่อง": "recNo", "เลขรับ": "recNo", "เลขที่รับเรื่อง": "recNo", "เลขที่รับ": "recNo", "รับเรื่องเลขที่": "recNo", "เลขรับเรื่องพิจารณา": "recNo", "เลขรับที่": "recNo", "เลขรับคำร้อง": "recNo", "เลขรับหนังสือ": "recNo", "เลขทะเบียนรับ": "recNo", "ทะเบียนรับ": "recNo", "ทะเบียนหนังสือรับ": "recNo", "เลขหนังสือรับ": "recNo", "รับเลขที่": "recNo", "รับที่": "recNo", receiveno: "recNo", receivedno: "recNo", receive_no: "recNo", recno: "recNo", casereceiveno: "recNo", caserecno: "recNo", receiptno: "recNo", receivenumber: "recNo", registrationno: "recNo", registrationnumber: "recNo", receiveregistrationno: "recNo", receivecode: "recNo", receivebookno: "recNo", bookreceiveno: "recNo", petitionreceiveno: "recNo", complaintreceiveno: "recNo", documentreceiveno: "recNo", "ลำดับเรื่อง": "caseNum", "ลำดับ": "caseNum", "ลำดับที่": "caseNum", caseno: "caseNum", casenum: "caseNum", casenumber: "caseNum", runningno: "caseNum", sequence: "caseNum", seq: "caseNum", "วันที่รับเรื่อง": "recDate", "วันที่รับ": "recDate", "วันรับเรื่อง": "recDate", "วันรับ": "recDate", "รับเรื่องวันที่": "recDate", "วันที่ลงรับ": "recDate", "วันที่ลงทะเบียนรับ": "recDate", "วันที่รับคำร้อง": "recDate", "วันที่รับหนังสือ": "recDate", "วันเดือนปีที่รับ": "recDate", "วันเดือนปีรับ": "recDate", "รับวันที่": "recDate", "วันที่รับเรื่องร้องเรียน": "recDate", receivedate: "recDate", receiveddate: "recDate", recdate: "recDate", receive_date: "recDate", received_date: "recDate", dateReceived: "recDate", datereceived: "recDate", date_received: "recDate", receiptdate: "recDate", registrationdate: "recDate", casereceivedate: "recDate", caserecdate: "recDate", petitionreceivedate: "recDate", complaintreceivedate: "recDate", documentreceivedate: "recDate", "วันที่เสนอ": "offerDate", "วันเสนอ": "offerDate", "วันที่ยื่น": "offerDate", "วันที่หนังสือ": "offerDate", offerdate: "offerDate", proposeddate: "offerDate", submitteddate: "offerDate", "เรื่อง": "title", "ชื่อเรื่อง": "title", subject: "title", "เรื่องพิจารณา": "caseTitle", "ชื่อเรื่องพิจารณา": "caseTitle", casetitle: "caseTitle", considerationtitle: "caseTitle", "ประเภท": "cat", category: "cat", "ประเภทรื่อง": "cat", "ประเภทเรื่อง": "cat", "ประเด็นพิจารณา": "subCat", "ประเด็น": "subCat", "หัวข้อประเด็น": "subCat", subcategory: "subCat", subcat: "subCat", issue: "subCat", topic: "subCat", "ผู้ร้อง": "petitioners", "ผู้ร้องเรียน": "petitioners", "ผู้เสนอ": "petitioners", petitioner: "petitioners", petitioners: "petitioners", proposer: "petitioners", proposedby: "petitioners", "หน่วยงาน": "respondent", "ผู้ถูกร้อง": "respondent", respondent: "respondent", agency: "respondent", agencyname: "agencyName", "ผู้รับผิดชอบ": "assignees", "ผู้รับผิดชอบหลัก": "assignees", "กมธ.รับผิดชอบ": "assignees", "กมธรับผิดชอบ": "assignees", "กรรมาธิการรับผิดชอบ": "assignees", "คณะกรรมาธิการรับผิดชอบ": "assignees", responsiblecommissioners: "assignees", responsiblecomm: "assignees", owner: "assignees", assignee: "assignees", assignees: "assignees", "ผู้รับผิดชอบร่วม": "coAssignees", coassignee: "coAssignees", coassignees: "coAssignees", "เจ้าหน้าที่ฝ่ายเลขานุการ": "staffs", "เจ้าหน้าที่ฝ่ายเลขานุการ": "staffs", operationofficer: "staffs", secretariatofficer: "staffs", staffs: "staffs", staff: "staffs", officer: "staffs", "สถานะ": "status", "สถานะเรื่อง": "status", "สถานะเรื่องพิจารณา": "status", casestatus: "status", processstatus: "status", meetingstatus: "meetingStatus", "เหตุผล (ไม่รับเรื่อง)": "rejectionReason", "เหตุผลไม่รับเรื่อง": "rejectionReason", rejectionreason: "rejectionReason", rejectreason: "rejectionReason", notacceptedreason: "rejectionReason", updatedat: "updatedAt", createdat: "createdAt", deletedat: "deletedAt", isdeleted: "isDeleted"
  }, Petitioners: {
    fullname: "name", name: "name", "ชื่อสกุล": "name", "ชื่อ-สกุล": "name", "ชื่อ": "name", tel: "phone", telephone: "phone", mobile: "phone", "เบอร์โทร": "phone", "เบอร์โทรศัพท์": "phone", "โทรศัพท์": "phone", location: "addressLine", addressline: "addressLine", line1: "addressLine", "สถานที่": "addressLine", "บ้านเลขที่ถนนหมู่บ้าน": "addressLine", subdistrict: "subDistrict", subdistrictname: "subDistrict", tambon: "subDistrict", "ตำบล": "subDistrict", "แขวง": "subDistrict", district: "district", amphoe: "district", amphur: "district", "อำเภอ": "district", "เขต": "district", province: "province", changwat: "province", "จังหวัด": "province", postalcode: "postalCode", postcode: "postalCode", zipcode: "postalCode", zip: "postalCode", "รหัสไปรษณีย์": "postalCode", address: "address", fulladdress: "address", "ที่อยู่": "address", petitionerid: "petitionerId", idcard: "idCard", citizenid: "idCard", nationalid: "idCard", caseid: "caseId", updatedat: "updatedAt", createdat: "createdAt", deletedat: "deletedAt"
  }, MeetingLogs: {
    "ครั้งที่": "round", "ครั้งประชุม": "round", "รอบ": "round", round: "round", "วันที่": "date", "วันที่ประชุม": "date", "วันที่ (พ.ศ.)": "date", meetingdate: "meetingDate", "การประชุม": "meetingGroup", "ชื่อการประชุม": "meetingGroup", "คณะ": "committeeType", "ประเภทการประชุม": "committeeType", committeetype: "committeeType", meetinggroup: "meetingGroup", "คณะกรรมาธิการ/คณะอนุกรรมาธิการ": "meetingGroup", "คณะกรรมาธิการ": "committeeType", "คณะอนุกรรมาธิการ": "subcommitteeName", "ชื่อคณะอนุกรรมาธิการ": "subcommitteeName", subcommittee: "subcommitteeName", subcommitteename: "subcommitteeName", subcommitteeid: "subcommitteeId", "มติสรุปผล": "note", "ผลการประชุม / มติที่ประชุม": "note", "ผลการประชุม": "result", "มติที่ประชุม": "note", note: "note", summary: "summary", result: "result", logid: "logId", meetinglogid: "logId", rowid: "logId", id: "logId"
  }, Personnel_Subcommittees: {
    personnelsubcommitteeid: "id", membershipid: "id", recordid: "id", personid: "personId", personnelid: "personId", "รหัสบุคคล": "personId", name: "name", fullname: "name", "ชื่อสกุล": "name", "ชื่อ-สกุล": "name", "ชื่อ": "name", subcommitteeid: "subcommitteeId", "รหัสคณะอนุกรรมาธิการ": "subcommitteeId", subcommitteename: "subcommitteeName", subcommittee: "subcommitteeName", "คณะอนุกรรมาธิการ": "subcommitteeName", "ชื่อคณะอนุกรรมาธิการ": "subcommitteeName", position: "position", role: "position", "ตำแหน่ง": "position", phone: "phone", tel: "phone", mobile: "phone", "เบอร์โทร": "phone", "เบอร์โทรศัพท์": "phone", startdate: "startDate", "วันเริ่ม": "startDate", "วันที่เริ่ม": "startDate", enddate: "endDate", "วันสิ้นสุด": "endDate", "วันที่สิ้นสุด": "endDate", status: "status", "สถานะ": "status", appointmentdate: "appointmentDate", appointeddate: "appointmentDate", "วันแต่งตั้ง": "appointmentDate", "วันที่แต่งตั้ง": "appointmentDate", note: "note", remark: "note", "หมายเหตุ": "note", createdat: "createdAt", updatedat: "updatedAt", isdeleted: "isDeleted", deletedat: "deletedAt"
  }, Subcommittees: {
    subcommitteeid: "id", name: "name", active: "status", status: "status", "สถานะ": "status", appointmentdate: "appointmentDate", appointeddate: "appointmentDate", "วันแต่งตั้ง": "appointmentDate", "วันที่แต่งตั้ง": "appointmentDate", startdate: "dutyStartDate", dutystartdate: "dutyStartDate", startworkingdate: "dutyStartDate", effectivedate: "dutyStartDate", "วันเริ่มทำหน้าที่": "dutyStartDate", "วันที่เริ่มทำหน้าที่": "dutyStartDate", enddate: "endDate", finishdate: "endDate", expiredate: "endDate", "วันสิ้นสุด": "endDate", "วันที่สิ้นสุด": "endDate", activedays: "activeDays", daycount: "activeDays", "จำนวนวัน": "activeDays", duedays: "dueDays", due_day_count: "dueDays", "จำนวนวันครบกำหนด": "dueDays", "วันครบกำหนด(จำนวนวัน)": "dueDays", duedate: "dueDate", deadline: "dueDate", deadlinedate: "dueDate", "วันครบกำหนด": "dueDate", "วันที่ครบกำหนด": "dueDate", extensiondays: "extensionDays", extenddays: "extensionDays", extension_day_count: "extensionDays", "ขยายระยะเวลา": "extensionDays", "จำนวนวันขยาย": "extensionDays", totalextensiondays: "totalExtensionDays", totalextenddays: "totalExtensionDays", "รวมวันขยาย": "totalExtensionDays", extendedduedate: "extendedDueDate", finalduedate: "extendedDueDate", latestduedate: "extendedDueDate", "วันครบกำหนดหลังขยาย": "extendedDueDate", "วันที่ครบกำหนดหลังขยาย": "extendedDueDate", extensionhistory: "extensionHistory", "ประวัติการขยายเวลา": "extensionHistory", sortno: "remark", remark: "remark", "หมายเหตุ": "remark", updatedat: "updatedAt"
  }
});
function _normFieldKey_(value) {
  return String(null == value ? "": value).replace(/[\u200B-\u200D\uFEFF]/g, "").trim().toLowerCase().replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\\.]+/g, "")
}
function _appCanonicalOwn_(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj || {
  }, key)
}
function _appCanonicalFreeze_(obj) {
  try {
    return Object.freeze(obj)
  }
  catch(_e) {
    return obj
  }
}
function _appCanonicalAliasMapFrom_(source, schema) {
  var out = {
  };
  function addAliasKey_(rawKey, canonicalValue) {
    var raw = String(null == rawKey ? "": rawKey).trim();
    if(raw) {
      var canonical = String(null == canonicalValue ? raw: canonicalValue).trim() || raw;
      _appCanonicalOwn_(out, raw) || (out[raw] = canonical);
      var headerKey = "";
      try {
        headerKey = _normalizedHeaderKey_(raw)
      }
      catch(_e) {
        headerKey = raw.toLowerCase().replace(/\s/g, "")
      }
      headerKey &&! _appCanonicalOwn_(out, headerKey) && (out[headerKey] = canonical);
      var normalized = _normFieldKey_(raw);
      normalized &&! _appCanonicalOwn_(out, normalized) && (out[normalized] = canonical)
    }
  }
  return Object.keys(source || {
  }).forEach(function(k) {
    addAliasKey_(k, source[k])
  }), (Array.isArray(schema) ? schema: []).forEach(function(field) {
    addAliasKey_(field, field)
  }), _appCanonicalFreeze_(out)
}
function _appBuildFieldAliases_() {
  var aliasSource = "object" == typeof SHEET_HEADER_ALIASES && SHEET_HEADER_ALIASES ? SHEET_HEADER_ALIASES: {
  }, schemas = "object" == typeof SHEET_SCHEMAS && SHEET_SCHEMAS ? SHEET_SCHEMAS: {
  }, out = {
  };
  function appBuildFieldAliasPut_(name, sheetName) {
    var canonicalName = String(name || "").trim(), sheet = String(sheetName || name || "").trim();
    canonicalName && (out[canonicalName] = _appCanonicalAliasMapFrom_(aliasSource[sheet] || {
    }, schemas[sheet] || []))
  }
  function mergeAliases(sheet, extra) {
    out[sheet] = _appCanonicalAliasMapFrom_(Object.assign({
    }, out[sheet] || {
    }, extra || {
    }), [])
  }
  ["Users", "MainData", "MeetingLogs", "Letters", "Petitioners", "Personnel_Comm", "Personnel_Op", "Personnel_Staff", "Personnel_Subcommittees", "Subcommittees", "SalarySettings", "SalaryPayments", "BudgetYearSettingsItems", "BudgetYearSettings", "BudgetImports", "BudgetSummary", "CommitteeMeetings", "CommitteeMeetingAgendaItems", "SystemSettings", "Config", "ThailandLocations"].forEach(function(sheet) {
    appBuildFieldAliasPut_(sheet, sheet)
  });
  var peopleCommonAliases = {
    name: "name", fullname: "name", "ชื่อสกุล": "name", "ชื่อ-สกุล": "name", "ชื่อ - สกุล": "name", "ชื่อ-นามสกุล": "name", "ชื่อ": "name", "ชื่อบุคลากร": "name", "ชื่อและสกุล": "name", position: "position", role: "position", "ตำแหน่ง": "position", "ตำแหน่งในคณะ": "position", "ตำแหน่งงาน": "position", phone: "phone", tel: "phone", mobile: "phone", "เบอร์โทร": "phone", "เบอร์โทรศัพท์": "phone", "โทรศัพท์": "phone", "หมายเลขโทรศัพท์": "phone", startdate: "startDate", "วันที่เริ่ม": "startDate", "วันเริ่ม": "startDate", "วันเริ่มต้น": "startDate", "วันเริ่มดำรงตำแหน่ง": "startDate", "วันที่แต่งตั้ง": "startDate", enddate: "endDate", "วันที่สิ้นสุด": "endDate", "วันสิ้นสุด": "endDate", "วันสิ้นสุดตำแหน่ง": "endDate", "วันที่พ้นตำแหน่ง": "endDate", status: "status", "สถานะ": "status", "สถานะการดำรงตำแหน่ง": "status", note: "note", remark: "remark", "หมายเหตุ": "remark", createdat: "createdAt", "วันที่สร้าง": "createdAt", updatedat: "updatedAt", "วันที่แก้ไข": "updatedAt", isdeleted: "isDeleted", deleted: "isDeleted", "ลบแล้ว": "isDeleted", deletedat: "deletedAt", "วันที่ลบ": "deletedAt"
  };
  return mergeAliases("Personnel_Comm", Object.assign({
    sortorder: "sortOrder", "ลำดับ": "sortOrder", "ลำดับที่": "sortOrder"
  }, peopleCommonAliases)), mergeAliases("Personnel_Op", peopleCommonAliases), mergeAliases("Personnel_Staff", Object.assign({
    personneltype: "personnelType", "ประเภทบุคลากร": "personnelType", "ประเภท": "personnelType", proposedby: "proposedBy", "ผู้เสนอ": "proposedBy", "กรรมาธิการผู้เสนอ": "proposedBy", "ผู้เสนอชื่อ": "proposedBy", orderref: "orderRef", "คำสั่ง": "orderRef", "เลขที่คำสั่ง": "orderRef", isgov: "isGov", "ข้าราชการ": "isGov", commandref: "commandRef", commandfileurl: "commandRef", "ไฟล์คำสั่ง": "commandRef", "ลิงก์คำสั่ง": "commandRef"
  }, peopleCommonAliases)), out.cases = out.MainData, out.mainData = out.MainData, out.letters = out.Letters, out.petitioners = out.Petitioners, out.budget = out.BudgetImports, out.budgetImports = out.BudgetImports, out["budget.imports"] = out.BudgetImports, out.budgetSummary = out.BudgetSummary, out["budget.summary"] = out.BudgetSummary, out.people = out.Personnel_Staff, out.peopleStaff = out.Personnel_Staff, out["people.staff"] = out.Personnel_Staff, out.peopleComm = out.Personnel_Comm, out["people.comm"] = out.Personnel_Comm, out.peopleOp = out.Personnel_Op, out["people.op"] = out.Personnel_Op, out.peopleSubcommittees = out.Personnel_Subcommittees, out["people.subcommittees"] = out.Personnel_Subcommittees, out.subcommittees = out.Subcommittees, _appCanonicalFreeze_(out)
}
var APP_FIELD_ALIASES = "object" == typeof APP_FIELD_ALIASES && APP_FIELD_ALIASES ? APP_FIELD_ALIASES: _appBuildFieldAliases_();
function getAppFieldAliases_(domain, field) {
  var aliases = "object" == typeof APP_FIELD_ALIASES && APP_FIELD_ALIASES ? APP_FIELD_ALIASES: {
  }, rawDomain = String(null == domain ? "": domain).trim(), domainKey = rawDomain, map = aliases[domainKey] || aliases[_normFieldKey_(domainKey)] || aliases[rawDomain.toLowerCase()] || {
  };
  if(void 0 === field)return Object.assign({
  }, map);
  var raw = String(null == field ? "": field).trim();
  if(! raw)return"";
  var headerKey = "";
  try {
    headerKey = _normalizedHeaderKey_(raw)
  }
  catch(_e) {
    headerKey = raw.toLowerCase().replace(/\s/g, "")
  }
  return map[raw] || map[headerKey] || map[_normFieldKey_(raw)] || raw
}
function _isDeletedFlagValue_(value) {
  if(! 0 === value)return ! 0;
  if(! 1 === value || null == value)return ! 1;
  if("[object Date]" === Object.prototype.toString.call(value))return ! isNaN(value.getTime());
  var raw = String(value).trim();
  if(! raw)return ! 1;
  var lower = raw.toLowerCase(), norm = _normFieldKey_(raw), falseTokens = {
    false: ! 0, 0: ! 0, n: ! 0, no: ! 0, none: ! 0, active: ! 0, normal: ! 0, "ไม่": ! 0, "ไม่ลบ": ! 0, "ยังไม่ลบ": ! 0, "ปกติ": ! 0, "ใช้งาน": ! 0, "คงไว้": ! 0
  };
  if(falseTokens[lower] || falseTokens[norm])return ! 1;
  var trueTokens = {
    true: ! 0, 1: ! 0, y: ! 0, yes: ! 0, delete: ! 0, deleted: ! 0, remove: ! 0, removed: ! 0, "ลบ": ! 0, "ลบแล้ว": ! 0, "ถูกลบ": ! 0, "ใช่": ! 0, deletedrow: ! 0, softdeleted: ! 0
  };
  return ! (! trueTokens[lower] &&! trueTokens[norm])
}
function _isDeletedCanonical_(row) {
  if(! row)return ! 1;
  if("object" != typeof row)return _isDeletedFlagValue_(row);
  var normalizedIndex = null;
  function valueFor(key) {
    if(_appCanonicalOwn_(row, key))return {
      found: ! 0, value: row[key]
    };
    normalizedIndex || (normalizedIndex = {
    }, Object.keys(row || {
    }).forEach(function(k) {
      var nk = _normFieldKey_(k);
      nk &&! _appCanonicalOwn_(normalizedIndex, nk) && (normalizedIndex[nk] = row[k])
    }));
    var target = _normFieldKey_(key);
    return target && _appCanonicalOwn_(normalizedIndex, target) ? {
      found: ! 0, value: normalizedIndex[target]
    }
    : {
      found: ! 1, value: null
    }
  }
  for(var flagKeys = ["isDeleted", "deleted", "deleteFlag", "deletedFlag", "is_deleted", "removed", "ลบ", "ลบแล้ว", "สถานะลบ", "สถานะการลบ"], i = 0;
  i < flagKeys.length;
  i ++ ) {
    var flag = valueFor(flagKeys[i]);
    if(flag.found && _isDeletedFlagValue_(flag.value))return ! 0
  }
  for(var dateKeys = ["deletedAt", "deleted_at", "deletedDate", "removedAt", "วันที่ลบ", "วันลบ"], d = 0;
  d < dateKeys.length;
  d ++ ) {
    var date = valueFor(dateKeys[d]);
    if(date.found) {
      if(_isDeletedFlagValue_(date.value))return ! 0;
      if(null !== date.value && void 0 !== date.value && "" !== String(date.value).trim()) {
        var norm = _normFieldKey_(date.value);
        if(norm && "false" !== norm && "0" !== norm && "no" !== norm && "ไม่ลบ" !== norm)return ! 0
      }
    }
  }
  return ! 1
}
function _headerMap_(headers) {
  var map = {
  };
  return(headers || []).forEach(function(h, i) {
    null !== h && "" !== h && (map[String(h).trim()] = i)
  }), map
}
function _normalizedHeaderKey_(value) {
  return _appIsFnName_("_normFieldKey_") ? _normFieldKey_(value): String(null == value ? "": value).replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").trim().toLowerCase().replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g, "")
}
function _canonicalHeaderNameForSheet_(sheetName, header) {
  var raw = String(null == header ? "": header).trim(), aliasMap;
  return raw ? "function" == typeof getAppFieldAliases_ ? getAppFieldAliases_(sheetName, raw) || raw: (SHEET_HEADER_ALIASES[String(sheetName || "")] || {
  })[_normalizedHeaderKey_(raw)] || raw: ""
}
function _canonicalHeaderIndexMap_(sheetName, headers) {
  var map = {
  };
  return(headers || []).forEach(function(h, i) {
    var raw = String(null == h ? "": h).trim();
    if(raw) {
      var canonical = _canonicalHeaderNameForSheet_(sheetName, raw);
      Object.prototype.hasOwnProperty.call(map, raw) || (map[raw] = i), canonical &&! Object.prototype.hasOwnProperty.call(map, canonical) && (map[canonical] = i);
      var normalized = _normalizedHeaderKey_(raw);
      normalized &&! Object.prototype.hasOwnProperty.call(map, normalized) && (map[normalized] = i)
    }
  }), map
}
function _sheetHeaders_(sheetName, opts) {
  opts = opts || {};
  var sh = getSheet_(sheetName), width = Math.max(sh.getLastColumn(), (SHEET_SCHEMAS[sheetName] || []).length, 1), cacheKey = String(sheetName || "") + "|" + width, cached = !0 === opts.forceFresh ? null: _requestScopeGet_("sheetHeaders", cacheKey), headers;
  if(cached && Array.isArray(cached))headers = cached.slice();
  else {
    headers = (sh.getRange(1, 1, 1, width).getValues()[0] || []).map(function(v) {
      return String(v || "").trim()
    }), _requestScopePut_("sheetHeaders", cacheKey, headers.slice())
  }
  return opts.includeMeta ? {
    rawHeaders: headers.slice(), normalizedHeaders: headers.map(function(v) {
      return String(v || "").trim()
    }), widthUsed: width
  }: headers
}
function getCanonicalHeaderAudit_(sheetName) {
  var expected = (SHEET_SCHEMAS[sheetName] || []).slice(), aliasMap = SHEET_HEADER_ALIASES[sheetName] || {
  }, info = _sheetHeaders_(sheetName, {
    includeMeta: ! 0
  }), headers = info && info.rawHeaders || [], normalizedMap = {
  }, duplicateHeaders = [];
  headers.forEach(function(h, i) {
    var key = String(h || "").trim().toLowerCase().replace(/\s/g, "");
    key && (Object.prototype.hasOwnProperty.call(normalizedMap, key) && duplicateHeaders.push(String(h || "").trim()), Object.prototype.hasOwnProperty.call(normalizedMap, key) || (normalizedMap[key] = i))
  });
  var missing = [], aliasesDetected = [];
  expected.forEach(function(h) {
    if(! (headers.indexOf(h) >- 1)) {
      var key = String(h || "").trim().toLowerCase().replace(/\s/g, "");
      if(Object.prototype.hasOwnProperty.call(normalizedMap, key))return aliasesDetected.push({
        expected: h, actual: headers[normalizedMap[key]]
      }), void 0;
      var aliasKey = Object.keys(aliasMap).filter(function(k) {
        return aliasMap[k] === h && Object.prototype.hasOwnProperty.call(normalizedMap, k)
      })[0];
      if(aliasKey)return aliasesDetected.push({
        expected: h, actual: headers[normalizedMap[aliasKey]]
      }), void 0;
      missing.push(h)
    }
  });
  var unexpected = headers.filter(function(h) {
    if(! h ||- 1 !== expected.indexOf(h))return ! 1;
    var aliasKey = String(h || "").trim().toLowerCase().replace(/\s/g, "");
    return ! (aliasMap[aliasKey] &&- 1 !== expected.indexOf(aliasMap[aliasKey]))
  }), orderDrift = [];
  expected.forEach(function(h, expectedIndex) {
    var actualIndex = headers.indexOf(h);
    actualIndex >- 1 && actualIndex !== expectedIndex && orderDrift.push({
      header: h, expectedIndex: expectedIndex + 1, actualIndex: actualIndex + 1
    })
  });
  var dangerousFindings = [];
  "Users" === String(sheetName) && headers.forEach(function(h, i) {
    var key;
    "password" === String(h || "").trim().toLowerCase().replace(/\s/g, "") && dangerousFindings.push({
      severity: "critical", header: h, column: i + 1, issue: "Users.password ต้องไม่มี plaintext และห้ามใช้สำหรับ login"
    })
  });
  var securityCritical = dangerousFindings.some(function(item) {
    return"critical" === String(item.severity || "")
  });
  return {
    sheetName: sheetName, headers: headers, expected: expected, missing: missing, unexpected: unexpected, duplicateHeaders: duplicateHeaders, orderDrift: orderDrift, dangerousFindings: dangerousFindings, securityCritical: securityCritical, aliasesDetected: aliasesDetected, ok: 0 === missing.length && 0 === unexpected.length && 0 === duplicateHeaders.length && 0 === orderDrift.length &&! securityCritical
  }
}
function ensureCanonicalHeadersForNewSheet_(sheetName) {
  var sh = getSheet_(sheetName), expected = SHEET_SCHEMAS[sheetName] || [], headers;
  return expected.length ? (_sheetHeaders_(sheetName)[0] || (sh.getRange(1, 1, 1, expected.length).setValues([expected]), sh.setFrozenRows(1)), sh): sh
}
function readSheetObjects_(sheetName, opts) {
  opts = opts || {
  };
  var sh = getSheet_(sheetName);
  if(! 0 === opts.requireCanonical) {
    var audit = getCanonicalHeaderAudit_(sheetName);
    if(audit.missing.length)throw new Error("ชีต " + sheetName + " ขาดหัวตารางสำคัญ: " + audit.missing.join(", "))
  }
  var data = "function" == typeof getSheetMatrixCached_ ? getSheetMatrixCached_(sh): getSheetMatrix_(sh);
  if(data.length <= 1)return[];
  var aliasMap = SHEET_HEADER_ALIASES[sheetName] || {
  }, appAliasMap = "function" == typeof getAppFieldAliases_ ? getAppFieldAliases_(sheetName): aliasMap, headers = data[0].map(function(v) {
    return String(v || "").trim()
  }).map(function(h) {
    var key = _appIsFnName_("_normFieldKey_") ? _normFieldKey_(h): String(h || "").trim().toLowerCase().replace(/\s/g, "");
    return appAliasMap && (appAliasMap[h] || appAliasMap[key]) || aliasMap[key] || h
  }), rows = data.slice(1).map(function(row) {
    var obj = {
    };
    return headers.forEach(function(h, i) {
      h && (obj[h] = row[i])
    }), "Subcommittees" === sheetName && (obj.id = obj.id || obj.SubcommitteeId || row[0] || "", obj.name = obj.name || obj.Name || row[1] || "", obj.status = obj.status || ("Y" === String(obj.Active || row[2] || "").trim() ? "ใช้งาน": obj.Active || row[2] || "ใช้งาน"), obj.appointmentDate = obj.appointmentDate || obj.appointedDate || obj["วันแต่งตั้ง"] || obj["วันที่แต่งตั้ง"] || "", obj.dutyStartDate = obj.dutyStartDate || obj.startDate || obj.startWorkingDate || obj.effectiveDate || obj["วันเริ่มทำหน้าที่"] || obj["วันที่เริ่มทำหน้าที่"] || obj.appointmentDate || "", obj.startDate = obj.startDate || obj.dutyStartDate || "", obj.endDate = obj.endDate || obj.finishDate || obj.expireDate || obj["วันสิ้นสุด"] || obj["วันที่สิ้นสุด"] || "", obj.activeDays = obj.activeDays || obj.dayCount || obj["จำนวนวัน"] || "", obj.remark = obj.remark || obj.SortNo || row[3] || "", obj.updatedAt = obj.updatedAt || obj.UpdatedAt || row[4] || ""), "BudgetImports" === sheetName && (obj.payloadJson = obj.payloadJson || obj.payloadJSON || "", obj.payloadJSON = obj.payloadJSON || obj.payloadJson || "", obj.visitLocationsJson = obj.visitLocationsJson || obj.visitLocationsJSON || "", obj.visitLocationsJSON = obj.visitLocationsJSON || obj.visitLocationsJson || "", obj.seminarLocationsJson = obj.seminarLocationsJson || obj.seminarLocationsJSON || "", obj.seminarLocationsJSON = obj.seminarLocationsJSON || obj.seminarLocationsJson || "", obj.countriesJson = obj.countriesJson || obj.countriesJSON || "", obj.countriesJSON = obj.countriesJSON || obj.countriesJson || ""), obj
  });
  return opts.includeDeleted ? rows: filterDeleted_(rows)
}
function buildIndexMap_(rows, keyFieldOrFn, opts) {
  rows = Array.isArray(rows) ? rows: [], opts = opts || {
  };
  var map = {
  };
  return rows.forEach(function(row) {
    if(row) {
      var key = "";
      try {
        key = "function" == typeof keyFieldOrFn ? keyFieldOrFn(row): row[String(keyFieldOrFn || "")]
      }
      catch(_eKey) {
        _recordWarning_("ec", _eKey), key = ""
      }
      if(key = String(null == key ? "": key).trim())return opts.allowMultiple ? (Array.isArray(map[key]) || (map[key] = []), map[key].push(row), void 0): (Object.prototype.hasOwnProperty.call(map, key) &&! 0 !== opts.override || (map[key] = row), void 0)
    }
  }), map
}
function groupRowsBy_(rows, keyFieldOrFn) {
  return buildIndexMap_(rows, keyFieldOrFn, {
    allowMultiple: ! 0
  })
}
function findSheetObjectByKey_(sheetName, keyField, keyValue, opts) {
  opts = opts || {};
  var target = String(null == keyValue ? "": keyValue).trim();
  if(! target)return null;
  if(! 0 === opts.requireCanonical) {
    var audit = getCanonicalHeaderAudit_(sheetName);
    if(audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "))
  }
  var sh = getSheet_(sheetName), headers = _sheetHeaders_(sheetName), map = _canonicalHeaderIndexMap_(sheetName, headers), keyIndex = void 0 !== map[keyField] ? map[keyField]: map[_normalizedHeaderKey_(keyField)];
  if(void 0 === keyIndex)return null;
  var rowNumber = _i3FindRowNumberByKey_(sheetName, keyField, target, keyIndex, {
    headers: headers,
    headerMap: map,
    partitionBatchSize: Number(opts.partitionBatchSize || 500) || 500,
    bypassRequestCache: opts.bypassRequestCache === true,
    forceFresh: opts.forceFresh === true
  });
  if(! rowNumber)return null;
  var width = Math.max(headers.length, Number(sh.getLastColumn && sh.getLastColumn()) || headers.length || 1), row = sh.getRange(rowNumber, 1, 1, width).getValues()[0] || [], obj = {};
  return headers.forEach(function(h, i) {
    h && (obj[String(h).trim()] = row[i])
  }), ! 0 !== opts.includeDeleted && _isDeletedCanonical_(obj) ? null: (obj._rowNumber = rowNumber, opts.bypassRequestCache === true && (obj._readSource = "direct-fresh-key-index"), obj)
}

function makeSheetRepository_(sheetName, keyField, opts) {
  opts = opts || {
  };
  var createdAtField = Object.prototype.hasOwnProperty.call(opts, "createdAtField") ? String(opts.createdAtField || ""): "createdAt", updatedAtField = Object.prototype.hasOwnProperty.call(opts, "updatedAtField") ? String(opts.updatedAtField || ""): "updatedAt";
  function _list_(override) {
    return readSheetObjectsCached_(sheetName, {
      includeDeleted: ! 0 === (override = override || {
      }).includeDeleted, requireCanonical: ! 0 === override.requireCanonical ||! 0 === opts.requireCanonical
    })
  }
  function _findByKey_(key, override) {
    return findSheetObjectByKey_(sheetName, keyField, key, {
      includeDeleted: ! (! override ||! override.includeDeleted), requireCanonical: ! (! override ||! override.requireCanonical)
    })
  }
  function _upsert_(key, patch, override) {
    var now = (override = override || {
    }).now || (new Date).toISOString(), resolvedKey = String(null == key ? "": key).trim() || String((patch || {
    })[keyField] || "").trim();
    if(! resolvedKey)throw new Error("ไม่พบค่า key ของ " + String(keyField || "id"));
    var existing = _findByKey_(resolvedKey, {
      includeDeleted: ! 0, requireCanonical: ! 0
    }), merged = Object.assign({
    }, existing || {
    }, patch || {
    });
    return merged[keyField] = resolvedKey, createdAtField && (existing && Object.prototype.hasOwnProperty.call(existing, createdAtField) ? merged[createdAtField] = existing[createdAtField] || merged[createdAtField] || now: Object.prototype.hasOwnProperty.call(merged, createdAtField) && merged[createdAtField] || (merged[createdAtField] = now)), updatedAtField &&! 1 !== override.autoUpdatedAt && (merged[updatedAtField] = now), existing ? (updateSheetObjectByKey_(sheetName, keyField, resolvedKey, merged), {
      mode: "update", key: resolvedKey, row: merged, previous: existing
    }): (appendSheetObject_(sheetName, merged), {
      mode: "create", key: resolvedKey, row: merged, previous: null
    })
  }
  function _softDelete_(key, patch) {
    var resolvedKey = String(null == key ? "": key).trim();
    return !! resolvedKey && softDeleteSheetObjectByKey_(sheetName, keyField, resolvedKey, patch || {
    })
  }
  return {
    sheetName: sheetName, keyField: keyField, list: function(override) {
      return _list_(override || {
      })
    }, listAll: function() {
      return _list_({
        includeDeleted: ! 0
      })
    }, listActive: function() {
      return _list_({
        includeDeleted: ! 1
      })
    }, findByKey: _findByKey_, indexBy: function(keyFieldOrFn, override) {
      return buildIndexMap_(_list_(override || {
      }), keyFieldOrFn || keyField, {
        override: ! 0
      })
    }, groupBy: function(keyFieldOrFn, override) {
      return groupRowsBy_(_list_(override || {
      }), keyFieldOrFn || keyField)
    }, upsert: _upsert_, upsertMany: function(rows, override) {
      return upsertSheetObjectsByKey_(sheetName, keyField, rows || [], override || {
      })
    }, appendMany: function(rows, override) {
      return appendSheetObjects_(sheetName, rows || [], override || {
      })
    }, softDelete: _softDelete_
  }
}
function _canonicalRepositorySpecs_() {
  return AppInfra && AppInfra._canonicalRepositorySpecs || (AppInfra._canonicalRepositorySpecs = {
    "cases.mainData": {
      sheetName: "MainData", keyField: "caseId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "cases"
    }, "meeting.logs": {
      sheetName: "MeetingLogs", keyField: "logId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "meeting"
    }, "committee.meetings": {
      sheetName: "CommitteeMeetings", keyField: "meetingId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "meeting"
    }, "committee.meetingAgendaItems": {
      sheetName: "CommitteeMeetingAgendaItems", keyField: "itemId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "meeting"
    }, "letters.main": {
      sheetName: "Letters", keyField: "letterId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "letters"
    }, "budget.imports": {
      sheetName: "BudgetImports", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "budget"
    }, "budget.summary": {
      sheetName: "BudgetSummary", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "budget"
    }, "budget.yearSettingsItems": {
      sheetName: "BudgetYearSettingsItems", keyField: "fy", createdAtField: "", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "budget", compositeKeyFields: ["fy", "category", "item"]
    }, "budget.salarySettings": {
      sheetName: "SalarySettings", keyField: "Key", createdAtField: "", updatedAtField: "UpdatedAt", requireCanonical: ! 1, domain: "budget", compositeKeyFields: ["fy", "Key"]
    }, "people.personnelComm": {
      sheetName: "Personnel_Comm", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }, "people.personnelOp": {
      sheetName: "Personnel_Op", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }, "people.personnelStaff": {
      sheetName: "Personnel_Staff", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }, "people.personnelSubcommittees": {
      sheetName: "Personnel_Subcommittees", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }, "people.subcommittees": {
      sheetName: "Subcommittees", keyField: "id", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }, "people.petitioners": {
      sheetName: "Petitioners", keyField: "petId", createdAtField: "createdAt", updatedAtField: "updatedAt", requireCanonical: ! 0, domain: "people"
    }
  }), AppInfra._canonicalRepositorySpecs
}
function _canonicalRepositoryAliases_() {
  return {
    MainData: "cases.mainData", MeetingLogs: "meeting.logs", CommitteeMeetings: "committee.meetings", CommitteeMeetingAgendaItems: "committee.meetingAgendaItems", Letters: "letters.main", BudgetImports: "budget.imports", BudgetSummary: "budget.summary", BudgetYearSettingsItems: "budget.yearSettingsItems", SalarySettings: "budget.salarySettings", Personnel_Comm: "people.personnelComm", Personnel_Op: "people.personnelOp", Personnel_Staff: "people.personnelStaff", Personnel_Subcommittees: "people.personnelSubcommittees", Subcommittees: "people.subcommittees", Petitioners: "people.petitioners"
  }
}
function _resolveCanonicalRepositoryName_(nameOrAlias) {
  var raw = String(nameOrAlias || "").trim();
  if(! raw)return"";
  var specs = _canonicalRepositorySpecs_(), aliases;
  return Object.prototype.hasOwnProperty.call(specs, raw) ? raw: _canonicalRepositoryAliases_()[raw] || raw
}
function _getCanonicalRepositorySpec_(nameOrAlias) {
  var key = _resolveCanonicalRepositoryName_(nameOrAlias), specs;
  return _canonicalRepositorySpecs_()[key] || null
}
function getCanonicalRepository_(nameOrAlias) {
  var key, spec = _getCanonicalRepositorySpec_(_resolveCanonicalRepositoryName_(nameOrAlias));
  if(! spec)throw new Error("ไม่พบ canonical repository: " + String(nameOrAlias || ""));
  return makeSheetRepository_(spec.sheetName, spec.keyField, {
    createdAtField: spec.createdAtField, updatedAtField: spec.updatedAtField, requireCanonical: ! 0 === spec.requireCanonical
  })
}
function appendSheetObject_(sheetName, obj) {
  var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
  if(audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var headers = _sheetHeaders_(sheetName), source = obj || {
  }, row = headers.map(function(h) {
    var canonical = _canonicalHeaderNameForSheet_(sheetName, h);
    return Object.prototype.hasOwnProperty.call(source, h) ? source[h]: canonical && Object.prototype.hasOwnProperty.call(source, canonical) ? source[canonical]: ""
  }), nextRow = Math.max(sh.getLastRow(), 1) + 1;
  return sh.getRange(nextRow, 1, 1, row.length).setValues([row]), _afterSheetWrite_(sheetName, {
    operation: "appendSheetObject_", rows: 1
  }), row
}
function _asBooleanDeleted_(value) {
  if(! 0 === value)return ! 0;
  var s = String(value || "").trim().toLowerCase();
  return"true" === s || "y" === s || "yes" === s || "1" === s
}
function _ensureTimestampValue_(value) {
  return value || new Date
}
function _canonicalizeSubcommitteeRecord_(row) {
  row = row || {
  };
  var rawStatus = String(row.status || row.Active || row.active || "").trim(), status = rawStatus;
  status || (status = String(row.isDeleted || "").trim() ? "ยกเลิก": "ใช้งาน"), /^(y|yes|true|1)$/i.test(rawStatus) && (status = "ใช้งาน"), /^(n|no|false|0)$/i.test(rawStatus) && (status = "ยกเลิก");
  var appointmentDate = row.appointmentDate || row.appointedDate || row["วันแต่งตั้ง"] || row["วันที่แต่งตั้ง"] || "", startDate = row.dutyStartDate || row.startDate || row.startWorkingDate || row.effectiveDate || row["วันเริ่มทำหน้าที่"] || row["วันที่เริ่มทำหน้าที่"] || appointmentDate || "", endDate = row.endDate || row.finishDate || row.expireDate || row["วันสิ้นสุด"] || row["วันที่สิ้นสุด"] || "", activeDays = _appIsFnName_("_subcommitteeActiveDays_") ? _subcommitteeActiveDays_(startDate, endDate): Number(row.activeDays || 0) || 0;
  return sanitizeRow_({
    id: row.id || row.SubcommitteeId || row.subcommitteeId || "", name: row.name || row.Name || "", status: status, appointmentDate: appointmentDate || startDate, dutyStartDate: startDate, startDate: startDate, endDate: endDate, activeDays: activeDays, dueDays: row.dueDays || row["จำนวนวันครบกำหนด"] || "", dueDate: row.dueDate || row.deadline || row["วันครบกำหนด"] || "", extensionDays: row.extensionDays || row.extendDays || row["ขยายระยะเวลา"] || "", totalExtensionDays: row.totalExtensionDays || row.totalExtendDays || row["รวมวันขยาย"] || "", extendedDueDate: row.extendedDueDate || row.finalDueDate || row.latestDueDate || row["วันครบกำหนดหลังขยาย"] || "", extensionHistory: row.extensionHistory || row["ประวัติการขยายเวลา"] || "", remark: row.remark || row.SortNo || row.sortNo || "", updatedAt: _ensureTimestampValue_(row.updatedAt || row.UpdatedAt), isDeleted: _asBooleanDeleted_(row.isDeleted) || "ยกเลิก" === status, deletedAt: row.deletedAt || (_asBooleanDeleted_(row.isDeleted) || "ยกเลิก" === status ? _ensureTimestampValue_(row.deletedAt): "")
  })
}
function _canonicalizeBudgetImportRecord_(row) {
  var payloadJson = (row = row || {
  }).payloadJson || row.payloadJSON || "", visitJson = row.visitLocationsJson || row.visitLocationsJSON || "", seminarJson = row.seminarLocationsJson || row.seminarLocationsJSON || "", countriesJson = row.countriesJson || row.countriesJSON || "";
  return sanitizeRow_(Object.assign({
  }, row, {
    id: row.id || row.budgetImportId || "", payloadJson: payloadJson, payloadJSON: payloadJson, visitLocationsJson: visitJson, visitLocationsJSON: visitJson, seminarLocationsJson: seminarJson, seminarLocationsJSON: seminarJson, countriesJson: countriesJson, countriesJSON: countriesJson, category: row.category || "", item: row.item || "", supportCost: row.supportCost || "", visitLocationsText: row.visitLocationsText || row.visitLocations || "", seminarLocationsText: row.seminarLocationsText || row.seminarLocations || "", createdAt: row.createdAt || new Date, updatedAt: _ensureTimestampValue_(row.updatedAt), isDeleted: _asBooleanDeleted_(row.isDeleted), deletedAt: row.deletedAt || (_asBooleanDeleted_(row.isDeleted) ? _ensureTimestampValue_(row.deletedAt): "")
  }))
}
function _canonicalizeMainDataRecord_(row) {
  row = row || {
  };
  var pick = AppBackendCore && AppBackendCore.makePickNormalized ? AppBackendCore.makePickNormalized(row, ""): function() {
    return""
  }, receiveDate = pick(["recDate", "receiveDate", "receivedDate", "dateReceived", "dateReceive", "receiptDate", "registrationDate", "caseReceiveDate", "caseRecDate", "petitionReceiveDate", "complaintReceiveDate", "documentReceiveDate", "MainData.recDate", "MainData/recDate", "MainData_recDate", "mainData.recDate", "mainData/recDate", "mainData_recDate", "วันที่รับเรื่อง", "วันที่รับ", "วันรับเรื่อง", "วันรับ", "รับเรื่องวันที่", "วันที่ลงรับ", "วันที่ลงทะเบียนรับ", "วันที่รับคำร้อง", "วันที่รับหนังสือ", "วันเดือนปีที่รับ", "วันเดือนปีรับ", "รับวันที่", "วันที่รับเรื่องร้องเรียน"]), title = String(pick(["title", "caseTitle", "subject", "เรื่อง", "ชื่อเรื่อง"]) || "").trim(), cat = String(pick(["cat", "caseType", "category", "ประเภทเรื่อง", "ประเภท"]) || "").trim(), subCat = String(pick(["subCat", "subCategory", "issue", "topic", "topicName", "considerIssue", "caseIssue", "ประเด็นพิจารณา", "ประเด็น"]) || "").trim(), respondent = String(pick(["respondent", "agencyName", "accusedAgency", "accused", "agency", "หน่วยงาน / ผู้ถูกร้อง", "หน่วยงาน/ผู้ถูกร้อง", "ผู้ถูกร้อง", "หน่วยงาน"]) || "").trim(), assignees = String(pick(["assignees", "owner", "responsibleCommissioners", "responsibleComm", "committeeOwner", "responsibleCommittee", "กมธ.รับผิดชอบ", "กมธ. รับผิดชอบ", "กรรมาธิการรับผิดชอบ", "คณะกรรมาธิการรับผิดชอบ", "ผู้รับผิดชอบ", "ผู้รับผิดชอบหลัก"]) || "").trim(), coAssignees = String(pick(["coAssignees", "coAssignee", "coOwners", "coResponsible", "ผู้รับผิดชอบร่วม", "ผู้ร่วมรับผิดชอบ"]) || "").trim(), staffs = String(pick(["staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "เจ้าหน้าที่ฝ่ายเลขานุการ", "เจ้าหน้าที่ฝ่ายเลขานุการ"]) || "").trim();
  return sanitizeRow_(Object.assign({
  }, row, {
    caseId: row.caseId || row.id || "", createdAt: row.createdAt || new Date, updatedAt: _ensureTimestampValue_(row.updatedAt), meetingStatus: row.meetingStatus || "", isDeleted: _asBooleanDeleted_(row.isDeleted), deletedAt: row.deletedAt || (_asBooleanDeleted_(row.isDeleted) ? _ensureTimestampValue_(row.deletedAt): ""), keySummary: row.keySummary || "", recDate: row.recDate || receiveDate || "", receiveDate: row.receiveDate || receiveDate || "", receivedDate: row.receivedDate || receiveDate || "", dateReceived: row.dateReceived || receiveDate || "", owner: assignees || row.owner || "", responsibleCommissioners: assignees || row.responsibleCommissioners || "", subcommittee: row.subcommittee || "", dueDate: row.dueDate || "", title: title, caseTitle: row.caseTitle || title, subject: row.subject || title, cat: cat, caseType: row.caseType || cat, subCat: subCat, subCategory: row.subCategory || subCat, issue: row.issue || subCat, topic: subCat, respondent: respondent, agencyName: row.agencyName || respondent, accusedAgency: row.accusedAgency || respondent, assignees: assignees, coAssignees: coAssignees, staffs: staffs, secretariatOfficer: row.secretariatOfficer || staffs, operationOfficer: row.operationOfficer || staffs
  }))
}
function _canonicalizeSheetRecord_(sheetName, row) {
  return"Subcommittees" === sheetName ? _canonicalizeSubcommitteeRecord_(row): "BudgetImports" === sheetName ? _canonicalizeBudgetImportRecord_(row): "MainData" === sheetName ? _canonicalizeMainDataRecord_(row): sanitizeRow_(row || {
  })
}
function _normalizedText_(value) {
  return String(null == value ? "": value).replace(/[​-‍﻿]/g, "").replace(/\s+/g, " ").trim().toLowerCase()
}
function _caseIdentityKey_(row) {
  return row = row || {
  }, [String(row.caseId || row.id || "").trim(), String(row.caseNum || "").trim(), String(row.recNo || "").trim(), _normalizedText_(row.title || row.caseTitle || ""), _normalizedText_(row.petitioners || row.petitionerName || "")].join("|")
}
function _meetingLogIdentityKey_(row) {
  return row = row || {
  }, [String(row.logId || row.meetingId || "").trim(), String(row.caseId || "").trim(), String(row.round || "").trim(), normalizeDateOutput_(row.date || row.meetingDate || ""), _normalizedText_(row.note || row.summary || "")].join("|")
}
function _letterIdentityKey_(row) {
  return row = row || {
  }, [String(row.letterId || "").trim(), String(row.caseId || "").trim(), String(row.letterNo || row.bookNo || "").trim(), normalizeDateOutput_(row.letterDate || ""), _normalizedText_(row.subject || row.issue || "")].join("|")
}
function _rowFreshnessScore_(row) {
  return row = row || {
  }, [String(row.updatedAt || row.modifiedAt || row.timestamp || "").trim(), String(row.createdAt || row.date || row.meetingDate || row.letterDate || "").trim(), String(row.caseId || row.logId || row.letterId || row.id || "").trim()].join("|")
}
function _dedupeLatestRowsBy_(rows, keyFn) {
  rows = Array.isArray(rows) ? rows.slice(): [];
  var map = {
  };
  return rows.forEach(function(row) {
    if(row &&! isSoftDeletedRow_(row)) {
      var key = "";
      try {
        key = String(("function" == typeof keyFn ? keyFn(row): "") || "").trim()
      }
      catch(_eKey) {
        _recordWarning_("ec", _eKey), key = ""
      }
      key || (key = String(row.caseId || row.logId || row.letterId || row.id || JSON.stringify(row)));
      var current = map[key], rowScore, curScore;
      if(! current)return map[key] = row, void 0;
      _rowFreshnessScore_(row) >= _rowFreshnessScore_(current) && (map[key] = row)
    }
  }), Object.keys(map).map(function(key) {
    return map[key]
  })
}
function _caseIdentityProjectedFields_() {
  return["caseId", "id", "caseNum", "caseNo", "runningNo", "recNo", "receiveNo", "title", "caseTitle", "subject", "petitioners", "petitionerName", "petitioner", "cat", "caseType", "subCat", "subCategory", "issue", "topic", "respondent", "agencyName", "accusedAgency", "accused", "agency", "assignees", "owner", "responsibleCommissioners", "responsibleComm", "committeeOwner", "responsibleCommittee", "coAssignees", "coAssignee", "coOwners", "coResponsible", "staffs", "secretariatOfficer", "operationOfficer", "opStaff", "operator", "responsibleOfficer", "operationStaff", "staff", "officer", "petitionerPhone", "offerDate", "recDate", "keySummary", "remark", "status", "caseStatus", "processStatus", "currentStatus", "statusText", "สถานะ", "สถานะเรื่อง", "สถานะเรื่องพิจารณา", "meetingStatus", "closedReason", "rejectionReason", "เหตุผล (ไม่รับเรื่อง)", "sentAgency", "sendToAgency", "dueDate", "createdAt", "updatedAt", "isDeleted", "deletedAt"]
}
function _caseIdentityRows_() {
  var cached = _requestScopeGet_("caseIdentityRows", "MainData:active:current");
  if(cached && Array.isArray(cached))return cached;
  var rows = [];
  try {
    rows = "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_("MainData", _caseIdentityProjectedFields_(), {
      includeDeleted: ! 1, requireCanonical: ! 1, ttl: 180
    }) || []: readSheetObjectsCached_("MainData", {
      includeDeleted: ! 1, requireCanonical: ! 1
    }) || []
  }
  catch(_projectedErr) {
    _recordWarning_("ec", _projectedErr);
    try {
      rows = readSheetObjectsCached_("MainData", {
        includeDeleted: ! 1, requireCanonical: ! 1
      }) || []
    }
    catch(_rawErr) {
      _recordWarning_("ec", _rawErr), rows = []
    }
  }
  return(rows = _dedupeLatestRowsBy_(rows, _caseIdentityKey_)).sort(function(a, b) {
    return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
  }), _requestScopePut_("caseIdentityRows", "MainData:active:current", rows)
}
function _caseIdentityIndexScope_() {
  var stamp = _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1";
  return {
    sheet: "MainData", stamp: String(stamp || "1"), fields: "identity-current"
  }
}
function _caseIdentityIndex_() {
  var requestKey = JSON.stringify(_caseIdentityIndexScope_()), cached = _requestScopeGet_("caseIdentityIndex", requestKey);
  if(cached && cached.byCaseId && cached.rows)return cached;
  var materialized = null;
  try {
    materialized = _materializedGet_("caseIdentityIndex:current", _caseIdentityIndexScope_())
  }
  catch(_matGetErr) {
    _recordWarning_("ec", _matGetErr), materialized = null
  }
  if(materialized && materialized.value && materialized.value.byCaseId && materialized.value.rows)return _requestScopePut_("caseIdentityIndex", requestKey, materialized.value);
  var rows = _caseIdentityRows_(), index = {
    rows: rows, byCaseId: {
    }, byCaseNum: {
    }, byRecNo: {
    }, byTitlePetitioner: {
    }
  };
  rows.forEach(function(row) {
    if(row &&! isSoftDeletedRow_(row)) {
      var caseId = String(row.caseId || row.id || "").trim(), caseNum = _normalizedText_(row.caseNum || ""), recNo = _normalizedText_(row.recNo || ""), title = _normalizedText_(row.title || row.caseTitle || row.subject || ""), petitioners = _normalizedText_(row.petitioners || row.petitionerName || row.petitioner || "");
      if(caseId &&! index.byCaseId[caseId] && (index.byCaseId[caseId] = row), caseNum && (index.byCaseNum[caseNum] = index.byCaseNum[caseNum] || [], index.byCaseNum[caseNum].push(row)), recNo && (index.byRecNo[recNo] = index.byRecNo[recNo] || [], index.byRecNo[recNo].push(row)), title || petitioners) {
        var pairKey = title + "||" + petitioners;
        index.byTitlePetitioner[pairKey] = index.byTitlePetitioner[pairKey] || [], index.byTitlePetitioner[pairKey].push(row)
      }
    }
  });
  try {
    _materializedPut_("caseIdentityIndex:current", _caseIdentityIndexScope_(), index, 300)
  }
  catch(_matPutErr) {
    _recordWarning_("ec", _matPutErr)
  }
  return _requestScopePut_("caseIdentityIndex", requestKey, index)
}
function _caseIdentityBestRow_(rows) {
  return(rows = (Array.isArray(rows) ? rows: []).filter(function(row) {
    return row &&! isSoftDeletedRow_(row)
  })).length ? (rows.sort(function(a, b) {
    return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
  }), rows[0] || null): null
}
function _findCaseByIdentity_(payload) {
  payload = payload || {
  };
  var cacheKey = JSON.stringify({
    caseId: String(payload.caseId || payload.id || "").trim(), caseNum: String(payload.caseNum || "").trim(), recNo: String(payload.recNo || "").trim(), title: _normalizedText_(payload.title || payload.caseTitle || payload.subject || ""), petitioners: _normalizedText_(payload.petitioners || payload.petitionerName || payload.petitioner || "")
  }), cached = _requestScopeGet_("caseIdentityLookup", cacheKey);
  if(cached && "object" == typeof cached)return cached;
  var index = _caseIdentityIndex_(), caseId = String(payload.caseId || payload.id || "").trim(), caseNum = _normalizedText_(payload.caseNum || ""), recNo = _normalizedText_(payload.recNo || ""), title = _normalizedText_(payload.title || payload.caseTitle || payload.subject || ""), petitioners = _normalizedText_(payload.petitioners || payload.petitionerName || payload.petitioner || "");
  if(caseId && index.byCaseId[caseId])return _requestScopePut_("caseIdentityLookup", cacheKey, index.byCaseId[caseId]);
  if(caseNum) {
    var byCaseNum = _caseIdentityBestRow_(index.byCaseNum[caseNum]);
    if(byCaseNum)return _requestScopePut_("caseIdentityLookup", cacheKey, byCaseNum)
  }
  if(recNo) {
    var byRecNo = _caseIdentityBestRow_(index.byRecNo[recNo]);
    if(byRecNo)return _requestScopePut_("caseIdentityLookup", cacheKey, byRecNo)
  }
  var exactPair = title || petitioners ? _caseIdentityBestRow_(index.byTitlePetitioner[title + "||" + petitioners]): null, rows, matches;
  return _requestScopePut_("caseIdentityLookup", cacheKey, exactPair || _caseIdentityBestRow_((index.rows || []).filter(function(row) {
    if(! row || isSoftDeletedRow_(row))return ! 1;
    var rowTitle = _normalizedText_(row.title || row.caseTitle || row.subject || ""), rowPetitioners = _normalizedText_(row.petitioners || row.petitionerName || row.petitioner || "");
    return !! (title && rowTitle && (rowTitle.indexOf(title) >- 1 || title.indexOf(rowTitle) >- 1)) ||!! (petitioners && rowPetitioners && (rowPetitioners.indexOf(petitioners) >- 1 || petitioners.indexOf(rowPetitioners) >- 1))
  })))
}
function _resolveCaseIdentityAliases_(payload) {
  var seed = _findCaseByIdentity_(payload = payload || {
  }) || null, index = _caseIdentityIndex_(), rows = index.rows || [], ids = [];
  function addId(value) {
    (value = String(value || "").trim()) &&- 1 === ids.indexOf(value) && ids.push(value)
  }
  addId(payload.caseId || payload.id || ""), seed && addId(seed.caseId || seed.id || "");
  var caseNum = _normalizedText_(seed && seed.caseNum || payload.caseNum || ""), recNo = _normalizedText_(seed && seed.recNo || payload.recNo || ""), title = _normalizedText_(seed && (seed.title || seed.caseTitle || seed.subject) || payload.title || payload.caseTitle || payload.subject || ""), petitioners = _normalizedText_(seed && (seed.petitioners || seed.petitionerName || seed.petitioner) || payload.petitioners || payload.petitionerName || payload.petitioner || ""), relatedMap = {
  };
  function addRow(row) {
    if(row &&! isSoftDeletedRow_(row)) {
      var key = String(row.caseId || row.id || _caseIdentityKey_(row) || "").trim();
      key &&! relatedMap[key] && (relatedMap[key] = row, addId(row.caseId || row.id || ""))
    }
  }
  seed && addRow(seed), ids.forEach(function(id) {
    addRow(index.byCaseId[String(id || "").trim()])
  }), caseNum && (index.byCaseNum[caseNum] || []).forEach(addRow), recNo && (index.byRecNo[recNo] || []).forEach(addRow), (title || petitioners) && (index.byTitlePetitioner[title + "||" + petitioners] || []).forEach(addRow), (title || petitioners) && rows.some(function(row) {
    if(! row || isSoftDeletedRow_(row))return ! 1;
    var rowTitle = _normalizedText_(row.title || row.caseTitle || row.subject || ""), rowPetitioners = _normalizedText_(row.petitioners || row.petitionerName || row.petitioner || "");
    return(title && rowTitle && (rowTitle.indexOf(title) >- 1 || title.indexOf(rowTitle) >- 1) || petitioners && rowPetitioners && (rowPetitioners.indexOf(petitioners) >- 1 || petitioners.indexOf(rowPetitioners) >- 1)) && addRow(row), Object.keys(relatedMap).length >= 50
  });
  var relatedRows = Object.keys(relatedMap).map(function(key) {
    return relatedMap[key]
  });
  return relatedRows.sort(function(a, b) {
    return _rowFreshnessScore_(b).localeCompare(_rowFreshnessScore_(a))
  }), {
    ids: ids, case: seed || relatedRows[0] || null, rows: relatedRows
  }
}
function _assertCaseExists_(payloadOrCaseId, sourceName) {
  var payload = payloadOrCaseId && "object" == typeof payloadOrCaseId ? payloadOrCaseId: {
    caseId: payloadOrCaseId
  }, found = _findCaseByIdentity_(payload);
  if(! found) {
    var requestedId = String(payload.caseId || payload.id || "").trim(), detail, err = new Error("ไม่พบข้อมูลเรื่องพิจารณา" + (requestedId ? " (caseId=" + requestedId + ")": "") + (sourceName ? " ใน " + String(sourceName): ""));
    throw err.code = requestedId ? "CASE_NOT_FOUND": "CASE_ID_REQUIRED", err
  }
  return found
}
function rewriteSheetObjectsCanonical_(sheetName, rows) {
  var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
  if(audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var headers = _sheetHeaders_(sheetName), lastRow = sh.getLastRow();
  lastRow > 1 && sh.getRange(2, 1, lastRow - 1, headers.length).clearContent();
  var sourceRows, normalized = (rows || readSheetObjects_(sheetName, {
    includeDeleted: ! 0
  })).map(function(row) {
    var obj = _canonicalizeSheetRecord_(sheetName, row || {
    });
    return headers.map(function(h) {
      return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h]: ""
    })
  });
  return normalized.length && sh.getRange(2, 1, normalized.length, headers.length).setValues(normalized), _afterSheetWrite_(sheetName, {
    operation: "rewriteSheetObjectsCanonical_", rows: normalized.length, flush: ! 0
  }), normalized.length
}
function _systemDateParseMetaForAudit_(value) {
  if(null == value || "" === value)return {
    valid: ! 0, empty: ! 0, date: null, reason: "empty"
  };
  if("[object Date]" === Object.prototype.toString.call(value) &&! isNaN(value.getTime()))return {
    valid: ! 0, date: value, reason: "date-object"
  };
  if("number" == typeof value && isFinite(value))return value > 3e4 && value < 7e4 ? {
    valid: ! 0, date: new Date(Math.round(86400 * (value - 25569) * 1e3)), reason: "excel-serial"
  }
  : {
    valid: ! 1, date: null, reason: "numeric-date-out-of-range"
  };
  var raw = String(value || "").trim();
  if(! raw)return {
    valid: ! 0, empty: ! 0, date: null, reason: "empty"
  };
  if(/^\d+(?:\.\d+)?$/.test(raw)) {
    var numeric = Number(raw);
    return numeric > 3e4 && numeric < 7e4 ? {
      valid: ! 0, date: new Date(Math.round(86400 * (numeric - 25569) * 1e3)), reason: "excel-serial-string"
    }
    : {
      valid: ! 1, date: null, reason: "numeric-date-out-of-range"
    }
  }
  var iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(iso) {
    var y = Number(iso[1]);
    y > 2400 && (y -= 543);
    var dIso = new Date(y, Number(iso[2]) - 1, Number(iso[3]));
    return isNaN(dIso.getTime()) ? {
      valid: ! 1, date: null, reason: "invalid-iso"
    }
    : {
      valid: ! 0, date: dIso, reason: "iso"
    }
  }
  var dmy = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if(dmy) {
    var yy = Number(dmy[3]);
    yy < 100 && (yy += 2500), yy > 2400 && (yy -= 543);
    var dDmy = new Date(yy, Number(dmy[2]) - 1, Number(dmy[1]));
    return isNaN(dDmy.getTime()) ? {
      valid: ! 1, date: null, reason: "invalid-dmy"
    }
    : {
      valid: ! 0, date: dDmy, reason: "dmy"
    }
  }
  var parsed = new Date(raw);
  return isNaN(parsed.getTime()) ? {
    valid: ! 1, date: null, reason: "unparseable"
  }
  : {
    valid: ! 0, date: parsed, reason: "date-parse"
  }
}
function updateSheetObjectByKey_(sheetName, keyField, keyValue, patchObj) {
  var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
  if(audit.missing.length)throw new Error("ชีต " + sheetName + " ยังไม่เป็น canonical: " + audit.missing.join(", "));
  var headers = _sheetHeaders_(sheetName);
  if(! headers.length)return ! 1;
  var map = _canonicalHeaderIndexMap_(sheetName, headers), keyIndex = void 0 !== map[keyField] ? map[keyField]: map[_normalizedHeaderKey_(keyField)];
  if(void 0 === keyIndex)return ! 1;
  var rowNumber = _i3FindRowNumberByKey_(sheetName, keyField, keyValue, keyIndex, {
    headers: headers, headerMap: map, forceFresh: !0
  });
  if(! rowNumber)return ! 1;
  var width = Math.max(headers.length, Number(sh.getLastColumn && sh.getLastColumn()) || headers.length || 1), row = sh.getRange(rowNumber, 1, 1, width).getValues()[0] || [];
  return Object.keys(patchObj || {
  }).forEach(function(k) {
    var idx = map[k];
    void 0 === idx && (idx = map[_normalizedHeaderKey_(k)]), void 0 !== idx && idx < width && (row[idx] = patchObj[k])
  }), sh.getRange(rowNumber, 1, 1, width).setValues([row.slice(0, width)]), _afterSheetWrite_(sheetName, {
    operation: "updateSheetObjectByKey_", rows: 1
  }), ! 0
}
function softDeleteSheetObjectByKey_(sheetName, keyField, keyValue, patchObj) {
  var basePatch = {
    isDeleted: ! 0, deletedAt: (new Date).toISOString(), updatedAt: (new Date).toISOString()
  };
  return updateSheetObjectByKey_(sheetName, keyField, keyValue, Object.assign(basePatch, patchObj || {
  }))
}
AppDomain.Repositories = AppDomain.Repositories || {
}, AppDomain.Repositories.listSpecs = AppDomain.Repositories.listSpecs || function() {
  var specs = _canonicalRepositorySpecs_();
  return Object.keys(specs).map(function(key) {
    var spec = specs[key] || {
    };
    return {
      name: key, domain: spec.domain || "", sheetName: spec.sheetName || "", keyField: spec.keyField || "", createdAtField: Object.prototype.hasOwnProperty.call(spec, "createdAtField") ? spec.createdAtField: "createdAt", updatedAtField: Object.prototype.hasOwnProperty.call(spec, "updatedAtField") ? spec.updatedAtField: "updatedAt", requireCanonical: ! 0 === spec.requireCanonical
    }
  })
}, AppDomain.Repositories.get = AppDomain.Repositories.get || function(nameOrAlias) {
  return getCanonicalRepository_(nameOrAlias)
}, AppDomain.Repositories.getSpec = AppDomain.Repositories.getSpec || function(nameOrAlias) {
  return _getCanonicalRepositorySpec_(nameOrAlias)
};
var _CACHE_TTL_DATA_ = 300, _CACHE_TTL_GEMINI_ = 900;
function getSheetRepositoryPerformancePolicy_() {
  return {
    stamp: "sheet-repository-performance-current", owner: "C00/readRepositoryRows_", defaultTtlSeconds: 240, maxTtlSeconds: 600, requestScopeCache: ! 0, scriptCache: ! 0, projectedColumns: ! 0, fullMatrixDefault: ! 1, metrics: ["rowsRead", "cacheHit", "durationMs", "sheetName", "fieldCount"]
  }
}
function _repositoryNormalizeFieldList_(fields) {
  var seen = {
  };
  return(Array.isArray(fields) ? fields: []).map(function(f) {
    return String(f || "").trim()
  }).filter(function(f) {
    return ! (! f || seen[f]) && (seen[f] =! 0, ! 0)
  })
}
function _repositoryAttachMeta_(rows, meta) {
  rows = Array.isArray(rows) ? rows: [];
  try {
    rows.__repositoryMeta = meta || {
    }
  }
  catch(_e) {
    _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
      error: String(_e && _e.message || _e)
    }): void _e
  }
  return rows
}
function readRepositoryRows_(sheetName, fields, opts) {
  opts = opts || {
  };
  var started = Date.now();
  sheetName = String(sheetName || "").trim(), fields = _repositoryNormalizeFieldList_(fields);
  var policy = getSheetRepositoryPerformancePolicy_(), ttl =! 0 === opts.forceFresh ? 0: Math.max(0, Math.min(Number(null != opts.ttl ? opts.ttl: policy.defaultTtlSeconds) || 0, Number(policy.maxTtlSeconds) || 600)), before = {
  };
  try {
    before = "function" == typeof getRequestScopeMetrics_ ? getRequestScopeMetrics_(): {
    }
  }
  catch(_m0) {
    before = {
    }
  }
  var rows = [];
  rows = fields.length && "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_(sheetName, fields, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical, ttl: ttl
  }) || []: "function" == typeof readSheetObjectsCached_ ? readSheetObjectsCached_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || []: readSheetObjects_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || [];
  var after = {
  }, meta;
  try {
    after = "function" == typeof getRequestScopeMetrics_ ? getRequestScopeMetrics_(): {
    }
  }
  catch(_m1) {
    after = {
    }
  }
  return _repositoryAttachMeta_(rows, {
    stamp: policy.stamp, sheetName: sheetName, owner: String(opts.owner || "repository"), projected: !! fields.length, fieldCount: fields.length, ttlSeconds: ttl, rowsReturned: rows.length, rowsReadDelta: Math.max(0, Number(after.rowsRead || 0) - Number(before.rowsRead || 0)), cacheHitDelta: Math.max(0, Number(after.cacheHits || 0) - Number(before.cacheHits || 0)), cacheMissDelta: Math.max(0, Number(after.cacheMisses || 0) - Number(before.cacheMisses || 0)), durationMs: Math.max(0, Date.now() - started)
  })
}
function _appCacheTtlPolicy_() {
  return {
    dashboardBundle: 240, dashboardStats: 180, caseList: 180, caseReportOptions: 180, trackingList: 180, peopleBundle: 300, budgetSummary: 300, budgetTypeSummary: 600, lookupBundle: 600, session: 21600
  }
}
function _appCacheTtl_(name, defaultValue, minValue, maxValue) {
  var policy = _appIsFnName_("_appCacheTtlPolicy_") ? _appCacheTtlPolicy_(): {
  }, n = Number(policy[String(name || "")] || defaultValue || _CACHE_TTL_DATA_ || 300) || 300;
  return null != minValue && (n = Math.max(Number(minValue) || 0, n)), null != maxValue && (n = Math.min(Number(maxValue) || n, n)), n
}
AppDataService.VERSION = AppDataService.VERSION || "app-data-service-production-owner-current", AppDataService.owner = AppDataService.owner || "Code_01_Platform_SheetRepo:AppDataService", AppDataService.readModelTargetsForSheet = AppDataService.readModelTargetsForSheet || function(sheetName) {
  var key, targets;
  return {
    MainData: ["CaseSearchIndex_R4", "CaseSearchMaterializedIndex", "TrackingMaterializedIndex", "DashboardSummarySnapshot"],
    MeetingLogs: ["CaseSearchMaterializedIndex", "DashboardSummarySnapshot"],
    Letters: ["TrackingMaterializedIndex", "DashboardSummarySnapshot"],
    BudgetImports: ["BudgetTypeSummary_R4", "BudgetSummary", "BudgetSummarySnapshot", "DashboardSummarySnapshot"],
    BudgetSummary: ["BudgetTypeSummary_R4", "BudgetSummarySnapshot", "DashboardSummarySnapshot"],
    Personnel_Comm: ["PeopleDirectory_R4"], Personnel_Op: ["PeopleDirectory_R4"], Personnel_Staff: ["PeopleDirectory_R4"], Personnel_Subcommittees: ["PeopleDirectory_R4"], Subcommittees: ["PeopleDirectory_R4"]
  }
  [String(sheetName || "").trim()] || []
}, AppDataService.cacheGet = AppDataService.cacheGet || function(key) {
  try {
    return _appDataServiceCacheRead_(key)
  }
  catch(e) {
    return _appWarn_("AppDataService.cacheGet", e, {
      key: key
    }), null
  }
}, AppDataService.cachePut = AppDataService.cachePut || function(key, value, ttl) {
  try {
    return _appDataServiceCacheWrite_(key, value, ttl || 300)
  }
  catch(e) {
    return _appWarn_("AppDataService.cachePut", e, {
      key: key
    }), ! 1
  }
}, AppDataService.cacheRemove = AppDataService.cacheRemove || function(key) {
  try {
    return _AppScriptCache_().remove(String(key || "")), ! 0
  }
  catch(e) {
    return _appWarn_("AppDataService.cacheRemove", e, {
      key: key
    }), ! 1
  }
}, AppDataService.invalidateReadModelsForSheet = AppDataService.invalidateReadModelsForSheet || function(sheetName, reason) {
  for(var targets = AppDataService.readModelTargetsForSheet(sheetName), out = [], i = 0;
  i < targets.length;
  i ++ ) {
    var target = targets[i];
    AppDataService.cacheRemove("sheet_current_" + target);
    try {
      _appIsFnName_("_bumpEntityCacheStamp_") && _bumpEntityCacheStamp_(String(target || "").toLowerCase())
    }
    catch(e2) {
      _appWarn_("AppDataService.readModel.stamp.bump", e2, {
        source: sheetName, target: target
      })
    }
    try {
      _appIsFnName_("_requestScopeReset_") && _requestScopeReset_()
    }
    catch(e3) {
      _appWarn_("AppDataService.requestScopeReset", e3, {
        source: sheetName, target: target
      })
    }
    try {
      _appIsFnName_("_serverLog_") && _serverLog_("info", "AppDataService.readModel.invalidated", {
        sourceSheet: String(sheetName || ""), targetSheet: target, reason: String(reason || "write")
      })
    }
    catch(e4) {
      _appWarn_("AppDataService.serverLog", e4, {
        source: sheetName, target: target
      })
    }
    out.push(target)
  }
  var snapshotRefresh = null;
  try {
    if(AppDataService.refreshSummarySnapshotsAfterInvalidation)snapshotRefresh = AppDataService.refreshSummarySnapshotsAfterInvalidation(sheetName, reason || "write")
  }
  catch(_summaryRefreshErr) {
    _appWarn_("AppDataService.summarySnapshot.refreshAfterInvalidation", _summaryRefreshErr, { sourceSheet: sheetName, reason: reason })
  }
  return {
    invalidated: out.length > 0, targets: out, reason: String(reason || "write"), owner: AppDataService.owner, summarySnapshots: snapshotRefresh
  }
}, AppDataService.invalidate = AppDataService.invalidate || function(sheetName, reason) {
  var result = {
    sheetName: String(sheetName || ""), sheetCache: ! 1, readModels: null, owner: AppDataService.owner
  };
  try {
    result.sheetCache = AppDataService.cacheRemove("sheet_current_" + String(sheetName || ""))
  }
  catch(e) {
    _appWarn_("AppDataService.invalidate.sheetCache", e, {
      sheetName: sheetName
    })
  }
  return result.readModels = AppDataService.invalidateReadModelsForSheet(sheetName, reason || "invalidate"), result
}, AppDataService.readSheetModel = AppDataService.readSheetModel || function(sheetName, options) {
  options = options || {
  };
  var key = String(options.cacheKey || "sheet_model:" + sheetName + ":" + String(options.version || "current"));
  if(! 0 !== options.forceFresh) {
    var cached = AppDataService.cacheGet(key);
    if(cached)return Object.assign({
      ok: ! 0, cacheHit: ! 0, cacheKey: key, owner: AppDataService.owner
    }, cached)
  }
  var rows = [];
  try {
    rows = _appIsFnName_("cachedSheetObjects_") ? cachedSheetObjects_(sheetName, options): []
  }
  catch(e) {
    return _appFail_("APP_DATA_SERVICE_READ_FAILED", e, {
      sheetName: sheetName
    })
  }
  var model = {
    ok: ! 0, rows: Array.isArray(rows) ? rows: [], totalRecords: Array.isArray(rows) ? rows.length: 0, cacheHit: ! 1, cacheKey: key, owner: AppDataService.owner, generatedAt: (new Date).toISOString()
  };
  return AppDataService.cachePut(key, model, Number(options.ttlSeconds || options.ttl || 300) || 300), model
}, AppDataService.status = AppDataService.status || function() {
  return {
    ok: ! 0, owner: AppDataService.owner, version: AppDataService.VERSION, ownerMap: _appProductionOwnerMap_()
  }
}, AppDataService.productionReadModel = function(domain, payload) {
  domain = String(domain || "").toLowerCase(), payload = payload || {
  };
  var started = Date.now(), result;
  return(result = "cases" === domain || "search" === domain || "reporttrack" === domain ? AppDataService.readCaseSearchModel(payload): "snapshot" === domain || "dashboard" === domain || "budget" === domain || "people" === domain || "petitioner" === domain || "tracking" === domain ? AppDataService.getReadModelSnapshot(Object.assign({
  }, payload, {
    domain: domain
  })): AppDataService.readSheetModel(domain || String(payload.sheetName || ""), payload)) && "object" == typeof result && (result.productionReadModelOwner = "AppDataService.productionReadModel", result.productionReadModelDomain = domain, result.elapsedMs = Number(result.elapsedMs || 0) || Math.max(0, Date.now() - started)), result
}, AppDataService.productionReadModelStatus = function() {
  return {
    ok: ! 0, owner: AppDataService.owner, facade: "AppDataService.productionReadModel", caseSearch: !! AppDataService.readCaseSearchModel, snapshots: !! AppDataService.getReadModelSnapshot, readSheetModel: !! AppDataService.readSheetModel, uiDomChanged: ! 1, businessLogicChanged: ! 1
  }
}, AppDataService.readCaseSearchModel = AppDataService.readCaseSearchModel || function(payload) {
  payload = payload || {
  };
  var started = Date.now(), allowCache =! 0 !== payload.forceFresh &&! 0 !== payload.noCache &&! 0 !== payload.bypassCache, cacheTtlSeconds = allowCache ? Math.max(60, Math.min(Number(payload.cacheTtlSeconds || 180) || 180, 300)): 0, cacheKey = "case_search_read_model_recdate_v5_" + (_appIsFnName_("_buildDigestHex_") ? _buildDigestHex_(JSON.stringify({
    q: _appIsFnName_("_normalizeSearchText_") ? _normalizeSearchText_(payload.query || payload.q || payload.keyword || ""): String(payload.query || payload.q || payload.keyword || ""), reportType: String(payload.reportType || payload.groupType || payload.type || "all").toLowerCase().trim(), reportValue: String(payload.reportValue || payload.groupValue || payload.value || "").trim(), sortBy: String(payload.sortBy || "caseNum").trim(), sortDir: String(payload.sortDir || "asc").trim().toLowerCase(), compactReadModel: !0 === payload.compactReadModel ? 1: 0, includeMeetingHistory: !0 === payload.includeMeetingHistory ? 1: 0, stamp: _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("maindata"): "1", meetingStamp: !0 === payload.includeMeetingHistory && _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_("meeting"): "none"
  })): String(Date.now()));
  if(allowCache && _appIsFnName_("_requestScopeGet_")) {
    var scoped = _requestScopeGet_("AppDataService.caseSearchReadModel", cacheKey);
    if(scoped && Array.isArray(scoped.rows))return scoped.cacheHit =! 0, scoped.cacheStatus = "request-hit", scoped.durationMs = Math.max(0, Date.now() - started), scoped.owner = AppDataService.owner, scoped
  }
  if(allowCache)try {
    var cached = AppDataService.cacheGet(cacheKey);
    if(cached && Array.isArray(cached.rows))return cached.cacheHit =! 0, cached.cacheStatus = "hit", cached.durationMs = Math.max(0, Date.now() - started), cached.rowsRead = 0, cached.owner = AppDataService.owner, _appIsFnName_("_requestScopePut_") && _requestScopePut_("AppDataService.caseSearchReadModel", cacheKey, cached), cached
  }
  catch(_readModelCacheErr) {
    _appWarn_("AppDataService.caseSearch.cacheGet", _readModelCacheErr, {
      cacheKey: cacheKey
    })
  }
  var rows = _appIsFnName_("_caseReportMatchRows_") ? _caseReportMatchRows_(Object.assign({
  }, payload, {
    forceFresh: ! allowCache, noCache: ! allowCache, bypassCache: ! allowCache, cacheTtlSeconds: cacheTtlSeconds
  })): [];
  rows = (rows = Array.isArray(rows) ? rows: []).map(function(row) {
    return row = row || {
    }, _appIsFnName_("_caseSearchEnsureReceiveNo_") && (row = _caseSearchEnsureReceiveNo_(row)), _appIsFnName_("sanitizeRow_") && (row = sanitizeRow_(row)), row
  }).filter(function(row) {
    var type = String(row && row.type || "").trim().toLowerCase(), label = String(row && row.typeLabel || "").trim(), deleted = String(row && (row.isDeleted || row.deleted || row.deletedAt || row["ลบ"]) || "").trim().toLowerCase();
    return"true" !== deleted && "1" !== deleted && "deleted" !== deleted && "ลบ" !== deleted && "letter" !== type && "หนังสือ" !== label && "หนังสือติดตามมติ" !== label
  }), _appIsFnName_("_caseSortRowsForSearch_") && (rows = _caseSortRowsForSearch_(rows, payload));
  var model = {
    ok: ! 0, rows: rows, totalRecords: rows.length, query: String(payload.query || payload.q || payload.keyword || ""), reportType: String(payload.reportType || payload.groupType || payload.type || "all"), reportValue: String(payload.reportValue || payload.groupValue || payload.value || ""), source: "AppDataService.MainData.caseSearch.cacheFirst", cacheHit: ! 1, cacheStatus: allowCache ? "miss": "bypass", rowsRead: rows.length, durationMs: Math.max(0, Date.now() - started), compactReadModel: !0 === payload.compactReadModel, includeMeetingHistory: !0 === payload.includeMeetingHistory, searchIndexSummary: _appIsFnName_("_caseBuildSearchIndexSummary_") ? _caseBuildSearchIndexSummary_(rows): null, generatedAt: (new Date).toISOString(), owner: AppDataService.owner
  };
  if(_appIsFnName_("_requestScopePut_") && _requestScopePut_("AppDataService.caseSearchReadModel", cacheKey, model), allowCache)try {
    AppDataService.cachePut(cacheKey, model, cacheTtlSeconds)
  }
  catch(_readModelCachePutErr) {
    _appWarn_("AppDataService.caseSearch.cachePut", _readModelCachePutErr, {
      cacheKey: cacheKey
    })
  }
  return model
}, AppDataService.budgetReadModelPartitionKey = AppDataService.budgetReadModelPartitionKey || function(payload) {
  var fy;
  return payload = payload || {
  }, String(payload.fy || payload.fiscalYear || payload.year || "all").replace(/[^0-9a-zA-Z_-]/g, "") || "all"
}, AppDataService.budgetReadModelHeader = AppDataService.budgetReadModelHeader || function() {
  return["partition", "fy", "type", "records", "totalAmount", "source", "updatedAt"]
}, AppDataService.refreshBudgetTypeSummary = AppDataService.refreshBudgetTypeSummary || function(payload) {
  payload = payload || {
  };
  var fy = String(payload.fy || payload.fiscalYear || payload.year || "").replace(/[^0-9]/g, ""), rows = _appIsFnName_("_budgetNoWaitTypeRows_") ? _budgetNoWaitTypeRows_(Object.assign({
  }, payload, {
    fy: fy, forceFresh: ! 0 === payload.forceFresh
  })): [], totals = _appIsFnName_("_budgetAggregateTypeSummaryRows_") ? _budgetAggregateTypeSummaryRows_(rows): {
    byTypeRows: []
  }, now = (new Date).toISOString(), key = AppDataService.budgetReadModelPartitionKey(payload), header = AppDataService.budgetReadModelHeader(), values = (totals.byTypeRows || []).map(function(r) {
    return[key, fy, String(r && r.type || "อื่น ๆ"), Number(r && r.records || 0), Number(r && r.totalAmount || 0), "BudgetImports", now]
  });
  try {
    AppDataService.cachePut("budget:type-summary:fy:" + fy, {
      rows: values, header: header, fy: fy, source: "BudgetImports/cache-only/AppDataService", updatedAt: now, owner: AppDataService.owner
    }, 21600)
  }
  catch(e) {
    _appWarn_("AppDataService.budget.typeSummary.cachePut", e, {
      fy: fy
    })
  }
  var clear = _appIsFnName_("_budgetClearTypeSummaryDirty_") ? _budgetClearTypeSummaryDirty_(fy): null;
  return {
    ok: ! 0, fy: fy, rowsWritten: 0, cacheRows: values.length, source: "BudgetImports/cache-only/AppDataService", updatedAt: now, dirtyMarkerStateCleared: clear, owner: AppDataService.owner
  }
}, AppDataService.readModelNow = AppDataService.readModelNow || function() {
  return(new Date).toISOString()
}, AppDataService.readModelTargetKey = AppDataService.readModelTargetKey || function(payload) {
  return payload = payload || {
  }, String(payload.targetKey || payload.fy || payload.fiscalYear || payload.budgetFy || "default")
}, AppDataService.readModelSnapshotDomainMap = AppDataService.readModelSnapshotDomainMap || function() {
  return {
    dashboard: "dashboard", budget: "budgetsummary", budgetsummary: "budgetsummary", budgettypesummary: "budgettypesummary", people: "people", personnel: "people", tracking: "tracking", track: "tracking", cases: "cases", search: "cases", petitioner: "petitioners", petitioners: "petitioners", lookups: "lookups"
  }
}, AppDataService.readModelCanonicalDomain = AppDataService.readModelCanonicalDomain || function(domain) {
  return domain = String(domain || "dashboard").toLowerCase(), AppDataService.readModelSnapshotDomainMap()[domain] || domain
}, AppDataService.buildReadModelPayload = AppDataService.buildReadModelPayload || function(domain, targetKey, payload) {
  var auth = {
    token: (payload = payload || {
    }).token || payload._token || "", _token: payload._token || payload.token || "", csrfToken: payload.csrfToken || payload.csrf || "", actionToken: payload.actionToken || ""
  }, base = Object.assign({
  }, payload, auth, {
    targetKey: targetKey, fy: payload.fy || payload.fiscalYear || targetKey
  });
  return"dashboard" === (domain = AppDataService.readModelCanonicalDomain(domain)) ? Object.assign(base, {
    includeSchema: ! 1, includeHealth: ! 1, includeReportOptions: ! 1, includeBudget: ! 0 === payload.includeBudget, includeCases: ! 0 === payload.includeCases, caseLimit: Number(payload.caseLimit || 20)
  }): "budgettypesummary" === domain ? Object.assign(base, {
    page: 1, limit: Math.max(50, Math.min(Number(payload.limit || 200) || 200, 200)), allowLiveDirectRead: ! 0 === payload.allowLiveDirectRead
  }): "tracking" === domain ? Object.assign(base, {
    page: 1, limit: Math.min(Number(payload.limit || 25) || 25, 25), sortBy: "dueDate", sortDir: "asc"
  }): "cases" === domain ? Object.assign(base, {
    page: 1, limit: Math.max(25, Math.min(Number(payload.limit || 100) || 100, 200))
  }): "people" === domain ? Object.assign(base, {
    lite: ! 1 !== payload.lite
  }): base
}, AppDataService.buildReadModel = AppDataService.buildReadModel || function(domain, targetKey, payload) {
  domain = AppDataService.readModelCanonicalDomain(domain);
  var p = AppDataService.buildReadModelPayload(domain, targetKey, payload || {
  });
  if("dashboard" === domain && _appIsFnName_("apiGetDashboardBundle"))return apiGetDashboardBundle(p);
  if("budgetsummary" === domain && _appIsFnName_("apiBudgetGetSummary"))return apiBudgetGetSummary(p);
  if("budgettypesummary" === domain && _appIsFnName_("apiBudgetGetTypeSummaryByFY"))return apiBudgetGetTypeSummaryByFY(p);
  if("people" === domain && _appIsFnName_("apiGetPeoplePageBundle"))return apiGetPeoplePageBundle(p);
  if("tracking" === domain && _appIsFnName_("apiGetTracking"))return apiGetTracking(p);
  if("cases" === domain && _appIsFnName_("apiSearchCasesLite"))return apiSearchCasesLite(p);
  if("petitioners" === domain && _appIsFnName_("apiGetPetitioners"))return apiGetPetitioners(p);
  if("lookups" === domain && _appIsFnName_("apiGetThailandLocations"))return apiGetThailandLocations(p);
  throw new Error("READ_MODEL_DOMAIN_UNSUPPORTED: " + domain)
}, AppDataService.unwrapReadModelResult = AppDataService.unwrapReadModelResult || function(result) {
  if(result &&! 1 === result.ok)throw new Error(String(result.error || result.msg || "READ_MODEL_API_FAILED"));
  return result && void 0 !== result.data ? result.data: result || {
  }
}, AppDataService.readModelGet = AppDataService.readModelGet || function(domain, targetKey, payload) {
  domain = AppDataService.readModelCanonicalDomain(domain), targetKey = String(targetKey || "default");
  var snap = null;
  if(_appIsFnName_("_performanceReadSnapshot_") && (! payload ||! 0 !== payload.forceFresh))try {
    snap = _performanceReadSnapshot_(domain, targetKey)
  }
  catch(_snapErr) {
    snap = null
  }
  if(snap && snap.ok)return {
    ok: ! 0, domain: domain, targetKey: targetKey, bundle: snap.data, snapshot: snap.meta || {
    }, cacheHit: !! snap.cacheHit, source: "AppDataService.materialized-snapshot-hit", generatedAt: AppDataService.readModelNow(), owner: AppDataService.owner
  };
  var built = AppDataService.unwrapReadModelResult(AppDataService.buildReadModel(domain, targetKey, payload || {
  })), write = null;
  if(_appIsFnName_("_performanceWriteSnapshot_"))try {
    write = _performanceWriteSnapshot_(domain, targetKey, built, {
      source: "AppDataService.read-model-refresh", ttlSeconds: Number(payload && payload.ttlSeconds || 21600) || 21600, readModelStamp: "app-data-service-read-model-current"
    })
  }
  catch(_writeErr) {
    write = {
      ok: ! 1, error: String(_writeErr && _writeErr.message || _writeErr)
    }
  }
  return {
    ok: ! 0, domain: domain, targetKey: targetKey, bundle: built, snapshot: write, cacheHit: ! 1, source: "AppDataService.materialized-refresh-on-miss", generatedAt: AppDataService.readModelNow(), owner: AppDataService.owner
  }
}, AppDataService.getReadModelSnapshot = AppDataService.getReadModelSnapshot || function(payload) {
  payload = payload || {
  };
  var domain = AppDataService.readModelCanonicalDomain(payload.domain || payload.page || "dashboard"), targetKey = AppDataService.readModelTargetKey(payload);
  return AppDataService.readModelGet(domain, targetKey, payload)
};
function _performanceSnapshotKey_(domain, targetKey) {
  domain = AppDataService.readModelCanonicalDomain(domain || "dashboard"), targetKey = String(targetKey || "default");
  var seed = JSON.stringify({ domain: domain, targetKey: targetKey, stamp: "summary-snapshot-v2-2026-07-02" });
  var digest = "";
  try {
    digest = _appIsFnName_("_hashPassword_") ? _hashPassword_(seed).substring(0, 32) : seed.replace(/[^A-Za-z0-9_-]/g, "_").substring(0, 80)
  }
  catch(_digestErr) {
    digest = String(Date.now())
  }
  return "summary_snapshot_v2_" + domain + "_" + digest
}
function _performanceReadSnapshot_(domain, targetKey) {
  var key = _performanceSnapshotKey_(domain, targetKey), snap = null;
  try {
    snap = AppDataService.cacheGet(key)
  }
  catch(_readErr) {
    _appWarn_("AppDataService.summarySnapshot.read", _readErr, { domain: domain, targetKey: targetKey })
  }
  if(!snap || !snap.bundle)return null;
  return { ok: !0, data: snap.bundle, meta: Object.assign({}, snap.meta || {}, { cacheKey: key, readAt: AppDataService.readModelNow() }), cacheHit: !0, source: "AppDataService.summarySnapshot.cache" }
}
function _performanceWriteSnapshot_(domain, targetKey, bundle, meta) {
  var key = _performanceSnapshotKey_(domain, targetKey), now = AppDataService.readModelNow(), envelope = {
    ok: !0,
    domain: AppDataService.readModelCanonicalDomain(domain || "dashboard"),
    targetKey: String(targetKey || "default"),
    bundle: bundle || {},
    meta: Object.assign({}, meta || {}, { cacheKey: key, writtenAt: now, owner: "AppDataService.summarySnapshot", snapshotStamp: "summary-snapshot-v2-2026-07-02" }),
    generatedAt: now,
    owner: AppDataService.owner
  };
  var stored = !1;
  try {
    stored = AppDataService.cachePut(key, envelope, Number(meta && meta.ttlSeconds || 21600) || 21600)
  }
  catch(_writeErr) {
    _appWarn_("AppDataService.summarySnapshot.write", _writeErr, { domain: domain, targetKey: targetKey })
  }
  return { ok: !!stored, domain: envelope.domain, targetKey: envelope.targetKey, cacheKey: key, stored: !!stored, generatedAt: now, owner: "AppDataService.summarySnapshot" }
}
AppDataService.summarySnapshotTargetsForSheet = AppDataService.summarySnapshotTargetsForSheet || function(sheetName) {
  var map = {
    MainData: ["dashboard"],
    MeetingLogs: ["dashboard"],
    Letters: ["dashboard"],
    BudgetImports: ["budgetsummary", "dashboard"],
    BudgetSummary: ["budgetsummary", "dashboard"]
  };
  return map[String(sheetName || "").trim()] || []
}, AppDataService.summarySnapshotTargetKey = AppDataService.summarySnapshotTargetKey || function(domain, sheetName, payload) {
  payload = payload || {}, domain = AppDataService.readModelCanonicalDomain(domain || "dashboard");
  if("budgetsummary" === domain) {
    var fy = String(payload.fy || payload.fiscalYear || payload.year || "").replace(/[^0-9]/g, "");
    if(!fy && _appIsFnName_("_resolveBudgetDefaultFiscalYear_"))try { fy = String(_resolveBudgetDefaultFiscalYear_() || "").replace(/[^0-9]/g, "") } catch(_fyErr) { fy = "" }
    return fy || "default"
  }
  return "default"
}, AppDataService.refreshSummarySnapshotsAfterInvalidation = AppDataService.refreshSummarySnapshotsAfterInvalidation || function(sheetName, reason, payload) {
  payload = payload || {};
  var enabled = !1 !== payload.refreshSnapshots && "N" !== String(_appIsFnName_("_scriptProp_") ? _scriptProp_("SUMMARY_SNAPSHOT_REFRESH_ON_WRITE", "Y") : "Y").trim().toUpperCase();
  var targets = AppDataService.summarySnapshotTargetsForSheet(sheetName), out = [];
  if(!enabled || !targets.length)return { refreshed: !1, skipped: !0, reason: enabled ? "no-summary-target" : "disabled", targets: targets, owner: AppDataService.owner };
  targets.forEach(function(domain) {
    var targetKey = AppDataService.summarySnapshotTargetKey(domain, sheetName, payload), item = { domain: AppDataService.readModelCanonicalDomain(domain), targetKey: targetKey, ok: !1 };
    try {
      var refreshPayload = Object.assign({}, payload, {
        domain: domain,
        targetKey: targetKey,
        forceFresh: !0,
        noCache: !0,
        bypassCache: !0,
        __snapshotRefreshAfterInvalidation: !0,
        __sourceSheet: String(sheetName || ""),
        __reason: String(reason || "write"),
        ttlSeconds: Number(payload.ttlSeconds || 21600) || 21600
      });
      if("dashboard" === AppDataService.readModelCanonicalDomain(domain)) {
        refreshPayload.includeBudget = !0;
        refreshPayload.includeCases = !1;
        refreshPayload.includeMeetingRows = !1;
        refreshPayload.snapshotRefreshMode = "dashboard-budget-safe-after-invalidation";
      }
      var res = AppDataService.readModelGet(domain, targetKey, refreshPayload);
      item.ok = !!(res && res.ok);
      item.source = String(res && res.source || "");
      item.snapshot = res && res.snapshot || null
    }
    catch(e) {
      item.ok = !1;
      item.error = String(e && e.message || e);
      _appWarn_("AppDataService.summarySnapshot.refreshTarget", e, { domain: domain, sheetName: sheetName })
    }
    out.push(item)
  });
  return { refreshed: out.some(function(x) { return x.ok }), targets: out, sourceSheet: String(sheetName || ""), reason: String(reason || "write"), owner: AppDataService.owner, snapshotStamp: "summary-snapshot-v2-2026-07-02" }
};
var _CACHE_SOFT_LIMIT_BYTES_ = 92160;
function _cacheSoftLimitBytes_() {
  var raw = Number(_scriptProp_("CACHE_SOFT_LIMIT_BYTES", _CACHE_SOFT_LIMIT_BYTES_));
  return isFinite(raw) && raw > 0 ? raw: _CACHE_SOFT_LIMIT_BYTES_
}
function _cacheByteLength_(value) {
  try {
    var text = "string" == typeof value ? value: JSON.stringify(value);
    return Utilities.newBlob(String(text || "")).getBytes().length
  }
  catch(_e) {
    return _recordWarning_("ec", _e), String(value || "").length
  }
}
function _AppScriptCache_() {
  try {
    return CacheService.getScriptCache()
  }
  catch(e) {
    return _serverLog_("warn", "cache.script.unavailable", {
      error: String(e && e.message || e)
    }), null
  }
}
function _AppCacheKey_(key) {
  return(key = String(key || "")).length > 230 ? key.slice(0, 80) + ":" + _hashPassword_(key).slice(0, 48): key
}
function _AppCacheGetJson_(key) {
  try {
    var cache = _AppScriptCache_();
    if(! cache ||! key)return null;
    var raw = cache.get(_AppCacheKey_(key));
    return raw ? JSON.parse(raw): null
  }
  catch(_e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _e, {
      file: "C00"
    }), null
  }
}
function _AppCachePutJson_(key, value, ttl) {
  try {
    var cache = _AppScriptCache_();
    return ! (! cache ||! key) && safeCachePut_(cache, _AppCacheKey_(key), value, Math.max(30, Number(ttl || 120)))
  }
  catch(_e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _e, {
      file: "C00"
    }), ! 1
  }
}
function _entityCacheStamp_(entityName) {
  var key = "cache_ver_" + (entityName = String(entityName || "").trim().toLowerCase() || "default");
  try {
    var cached = _appIsFnName_("_runtimeStateGet_") ? _runtimeStateGet_(key, ""): "";
    return String(cached ? cached || "1": _scriptProp_(key, "1") || "1")
  }
  catch(_e) {
    return"1"
  }
}
function _bumpEntityCacheStamp_(entityName) {
  entityName = String(entityName || "").trim().toLowerCase() || "default";
  var key = "cache_ver_" + entityName;
  try {
    if(_appIsFnName_("_cacheLedgerIsFlushingPhase4_") && _cacheLedgerIsFlushingPhase4_() && _appIsFnName_("_cacheLedgerMarkStampPhase4_") && !_cacheLedgerMarkStampPhase4_(entityName))return _entityCacheStamp_(entityName);
    var n = String((Number(_entityCacheStamp_(entityName)) || 1) + 1);
    return _appIsFnName_("_runtimeStateSet_") && _runtimeStateSet_(key, n, 21600), n
  }
  catch(_e) {
    return String(Date.now())
  }
}
function _AppCacheInvalidateDomain_(domain) {
  domain = String(domain || "default").toLowerCase();
  try {
    if(_appIsFnName_("_cacheLedgerShouldDeferPhase4_") && _cacheLedgerShouldDeferPhase4_())return _cacheLedgerQueueDomainPhase4_(domain, "_AppCacheInvalidateDomain_", "domain-stamp-request");
    return _bumpEntityCacheStamp_(domain)
  }
  catch(_e) {
    return _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _e, {
      file: "C00"
    }), ! 1
  }
}
function _sessionCacheTtlSeconds_() {
  var raw = "function" == typeof _scriptProp_ ? _scriptProp_("SESSION_CACHE_TTL_SECONDS", 21600): 21600, n = Number(raw);
  return Math.max(300, Math.min(isFinite(n) ? n: 21600, 21600))
}
function _sessionResumeTtlDefaultSeconds_() {
  var raw = "function" == typeof _scriptProp_ ? _scriptProp_("SESSION_RESUME_TTL_SECONDS", 86400): 86400, n = Number(raw);
  return Math.max(300, Math.min(isFinite(n) ? n: 86400, 86400))
}
function _sessionDurableTtlSeconds_() {
  var raw = "function" == typeof _scriptProp_ ? _scriptProp_("SESSION_DURABLE_TTL_SECONDS", 86400): 86400, n = Number(raw);
  return Math.max(3600, Math.min(isFinite(n) ? n: 86400, 604800))
}
function _sessionExpiryDisabled_() {
  try {
    if(_appIsFnName_("_authSecurityProfile_"))return ! 0 === _authSecurityProfile_().sessionExpiryDisabled
  }
  catch(e) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("security.session.profileUnavailable", e)
  }
  var v = String(_scriptProp_("SESSION_EXPIRY_DISABLED", "N") || "N").trim().toUpperCase();
  return"Y" === v || "YES" === v || "TRUE" === v || "1" === v
}
function _sessionPersistentUntilIso_() {
  var now = Date.now(), maxSeconds = _appIsFnName_("_sessionDurableTtlSeconds_") ? _sessionDurableTtlSeconds_(): 86400, maxMs = now + 1e3 * Math.max(3600, Math.min(Number(maxSeconds || 86400) || 86400, 604800)), iso = String(_scriptProp_("SESSION_PERSIST_UNTIL_ISO", "") || "").trim(), configuredMs = Date.parse(iso), resolvedMs = isFinite(configuredMs) && configuredMs > now ? Math.min(configuredMs, maxMs): maxMs;
  return new Date(resolvedMs).toISOString()
}
function _sheetEntityCacheKeys_(sheetName) {
  var map, keys = {
    MainData: ["maindata", "dashboard", "cases", "reportoptions"], Letters: ["letters", "dashboard", "tracking", "reportoptions"], MeetingLogs: ["meetinglogs", "dashboard", "meetings"], BudgetImports: ["budgetimports", "budgetsummary", "budget", "dashboard", "adminreports"], BudgetSummary: ["budgetsummary", "dashboard", "adminreports"], BudgetYearSettingsItems: ["budgetsettings", "budgetsummary", "dashboard", "adminreports"], BudgetYearSettings: ["budgetsettings", "budgetsummary", "dashboard", "adminreports"], SalarySettings: ["budgetsettings", "budgetsummary", "dashboard", "personnel"], SalaryPayments: ["budgetsettings", "budgetsummary", "dashboard", "personnel"], Personnel_Comm: ["personnel_comm", "personnel", "meetinglookup", "dashboard"], Personnel_Op: ["personnel_op", "personnel", "meetinglookup", "dashboard"], Personnel_Staff: ["personnel_staff", "personnel", "meetinglookup", "budgetsummary", "dashboard"], Petitioners: ["petitioners", "meetinglookup", "dashboard", "cases"], Personnel_Subcommittees: ["personnel_subcommittees", "personnel", "meetinglookup", "dashboard"], Subcommittees: ["subcommittees", "meetinglookup", "budgetsettings", "dashboard"], ThailandLocations: ["thailandlocations", "lookups"], Users: ["users", "adminreports"], SystemSettings: ["systemsettings", "adminreports"], Config: ["config", "adminreports"], AuditLog: ["auditlog", "adminreports"]
  }
  [sheetName = String(sheetName || "").trim()] || [sheetName.toLowerCase()], seen = {
  };
  return keys.filter(function(k) {
    return ! (! (k = String(k || "").trim().toLowerCase()) || seen[k]) && (seen[k] = 1, ! 0)
  })
}
function _requestScopeKey_(kind, key) {
  return String(kind || "") + "::" + String(key || "")
}
function _requestScopeBump_(kind, field, amount) {
  try {
    __APP_REQUEST_SCOPE_METRICS__ = __APP_REQUEST_SCOPE_METRICS__ || {
      hits: 0, misses: 0, rowsRead: 0, warnings: 0, errors: 0, sheetsRead: {
      }, cacheKinds: {
      }, warnLabels: {
      }, errorLabels: {
      }
    }, __APP_REQUEST_SCOPE_METRICS__[field] = Number(__APP_REQUEST_SCOPE_METRICS__[field] || 0) + Number(amount || 1), kind && (__APP_REQUEST_SCOPE_METRICS__.cacheKinds[kind] = __APP_REQUEST_SCOPE_METRICS__.cacheKinds[kind] || {
      hits: 0, misses: 0
    }, __APP_REQUEST_SCOPE_METRICS__.cacheKinds[kind][field] = Number(__APP_REQUEST_SCOPE_METRICS__.cacheKinds[kind][field] || 0) + Number(amount || 1))
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
}
function _requestScopeNoteCacheAccess_(kind, hit, amount) {
  return _requestScopeBump_(String(kind || "cache"), hit ? "hits": "misses", amount || 1)
}
function _requestScopeGet_(kind, key) {
  var cacheKey = _requestScopeKey_(kind, key), found = Object.prototype.hasOwnProperty.call(__APP_REQUEST_SCOPE_CACHE__, cacheKey);
  return _requestScopeBump_(kind, found ? "hits": "misses", 1), found ? __APP_REQUEST_SCOPE_CACHE__[cacheKey]: null
}
function _requestScopePut_(kind, key, value) {
  return __APP_REQUEST_SCOPE_CACHE__[_requestScopeKey_(kind, key)] = value, value
}
function _requestScopeReset_() {
  return __APP_REQUEST_SCOPE_CACHE__ = {
  }, __APP_REQUEST_SCOPE_METRICS__ = {
    hits: 0, misses: 0, rowsRead: 0, warnings: 0, errors: 0, sheetsRead: {
    }, cacheKinds: {
    }, warnLabels: {
    }, errorLabels: {
    }
  }, ! 0
}
function _requestScopeNoteRowsRead_(sheetName, count) {
  try {
    var n = Math.max(0, Number(count || 0));
    __APP_REQUEST_SCOPE_METRICS__.rowsRead = Number(__APP_REQUEST_SCOPE_METRICS__.rowsRead || 0) + n, sheetName = String(sheetName || "unknown"), __APP_REQUEST_SCOPE_METRICS__.sheetsRead[sheetName] = Number(__APP_REQUEST_SCOPE_METRICS__.sheetsRead[sheetName] || 0) + n
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
}
function getRequestScopeMetrics_() {
  var m = __APP_REQUEST_SCOPE_METRICS__ || {
  };
  return {
    cacheHit: Number(m.hits || 0) > 0, cacheHits: Number(m.hits || 0), cacheMisses: Number(m.misses || 0), rowsRead: Number(m.rowsRead || 0), warnings: Number(m.warnings || 0), errors: Number(m.errors || 0), sheetsRead: Object.assign({
    }, m.sheetsRead || {
    }), cacheKinds: Object.assign({
    }, m.cacheKinds || {
    }), warnLabels: Object.assign({
    }, m.warnLabels || {
    }), errorLabels: Object.assign({
    }, m.errorLabels || {
    })
  }
}
function getSheetMatrixCached_(sh, minCols, opts) {
  if(! sh)return[];
  opts = opts || {
  };
  var name = "";
  try {
    name = String(sh.getName() || "")
  }
  catch(_e) {
    _recordWarning_("ec", _e), name = ""
  }
  var lastRow = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 1), lastCol = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0, Number(minCols) || 0, 1), readMode =! 0 === opts.allowFullMatrix ? "full": "schema", cacheKey = [name, lastRow, lastCol, Number(minCols) || 0, readMode].join("|"), cached = _requestScopeGet_("sheetMatrix", cacheKey);
  if(cached && Array.isArray(cached))return cached;
  var data = getSheetMatrix_(sh, minCols, opts);
  return _requestScopeNoteRowsRead_(name, Math.max(0, data.length - 1)), _requestScopePut_("sheetMatrix", cacheKey, data)
}
function readSheetObjectsCached_(sheetName, opts) {
  opts = opts || {
  };
  var k = JSON.stringify({
    sheetName: String(sheetName || ""), includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }), hit = _requestScopeGet_("sheetObjects", k);
  return hit && Array.isArray(hit) ? hit: _requestScopePut_("sheetObjects", k, readSheetObjects_(sheetName, opts))
}
function readSheetProjectedObjectsCached_(sheetName, fields, opts) {
  opts = opts || {
  }, sheetName = String(sheetName || "").trim(), fields = (Array.isArray(fields) ? fields: []).map(function(f) {
    return String(f || "").trim()
  }).filter(Boolean);
  var seen = {
  }, requested = (fields = fields.filter(function(f) {
    return ! seen[f] && (seen[f] = 1, ! 0)
  })).slice();
  ! 0 !== opts.includeDeleted && requested.indexOf("isDeleted") < 0 && requested.push("isDeleted");
  var ver = "1";
  try {
    _appIsFnName_("_entityCacheStamp_") && (ver = _entityCacheStamp_(sheetName.toLowerCase()))
  }
  catch(_e) {
    _recordWarning_("ec", _e)
  }
  var seed = JSON.stringify({
    s: sheetName, f: requested, d: ! 0 === opts.includeDeleted, c: ! 0 === opts.requireCanonical, v: ver
  }), key = _appIsFnName_("_hashPassword_") ? _hashPassword_(seed).substring(0, 32): seed, hit = _requestScopeGet_("sheetProjectedObjects", key);
  if(hit && Array.isArray(hit))return hit;
  var ttl = Math.max(0, Math.min(Number(opts.ttl || 0) || 0, 600)), ck = "sheet_projected_current_" + key;
  if(ttl)try {
    var raw = _AppScriptCache_().get(ck);
    if(raw) {
      var parsed = JSON.parse(raw);
      if(parsed && Array.isArray(parsed.rows))return _requestScopeNoteCacheAccess_("scriptCache", ! 0, 1), _requestScopePut_("sheetProjectedObjects", key, parsed.rows)
    }
    var partitioned = _AppCacheGetPartitionedRows_(ck);
    if(partitioned && Array.isArray(partitioned.rows))return _requestScopeNoteCacheAccess_("scriptCachePartition", ! 0, 1), _requestScopePut_("sheetProjectedObjects", key, partitioned.rows);
    _requestScopeNoteCacheAccess_("scriptCache", ! 1, 1)
  }
  catch(_cacheReadErr) {
    _requestScopeNoteCacheAccess_("scriptCache", ! 1, 1)
  }
  if(! 0 === opts.requireCanonical) {
    var audit = getCanonicalHeaderAudit_(sheetName);
    if(audit.missing.length)throw new Error("ชีต " + sheetName + " ขาดหัวตารางสำคัญ: " + audit.missing.join(", "))
  }
  var sh = getSheet_(sheetName), lastRow = Math.max(Number(sh.getLastRow && sh.getLastRow()) || 0, 1), width = Math.max(Number(sh.getLastColumn && sh.getLastColumn()) || 0, (SHEET_SCHEMAS[sheetName] || []).length, 1), schema = SHEET_SCHEMAS[sheetName] || [], aliases = SHEET_HEADER_ALIASES[sheetName] || {
  }, appAliases = "function" == typeof getAppFieldAliases_ ? getAppFieldAliases_(sheetName): aliases, rawHeaders;
  function normalizeProjectedHeaderKey_(v) {
    return _appIsFnName_("_normFieldKey_") ? _normFieldKey_(v): String(v || "").replace(/[\u00A0\u200B-\u200D\uFEFF]/g, "").trim().toLowerCase().replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g, "")
  }
  function canonicalProjectedHeader_(raw, defaultHeader) {
    var k = normalizeProjectedHeaderKey_(raw = String(null == raw ? "": raw).trim());
    return appAliases && (appAliases[raw] || appAliases[k]) || aliases && (aliases[raw] || aliases[k]) || raw || defaultHeader || ""
  }
  var headers = (sh.getRange(1, 1, 1, width).getValues()[0] || []).map(function(h, i) {
    return canonicalProjectedHeader_(h, schema[i] || "col" + (i + 1))
  });
  fields.length || (requested = headers.filter(Boolean), ! 0 !== opts.includeDeleted && requested.indexOf("isDeleted") < 0 && requested.push("isDeleted"));
  var colByName = {
  };
  headers.forEach(function(h, i) {
    h && (colByName[h] = i, colByName[normalizeProjectedHeaderKey_(h)] = i)
  }), schema.forEach(function(h, i) {
    h &&! Object.prototype.hasOwnProperty.call(colByName, h) && (colByName[h] = i, colByName[normalizeProjectedHeaderKey_(h)] = i)
  });
  var found = requested.map(function(f) {
    var k = Object.prototype.hasOwnProperty.call(colByName, f) ? colByName[f]: colByName[normalizeProjectedHeaderKey_(f)];
    return 0 === k || k > 0 ? Number(k): - 1
  }).filter(function(i) {
    return i >= 0 && i < width
  });
  if(lastRow < 2 ||! found.length)return _requestScopePut_("sheetProjectedObjects", key, []);
  for(var minCol = Math.min.apply(null, found), maxCol = Math.max.apply(null, found), values = [], projectedWidth = maxCol - minCol + 1, batchSize = _i3AdaptiveReadBatchRows_(Math.max(0, lastRow - 1), projectedWidth, opts), serviceReads = 0, startRow = 2;
  startRow <= lastRow;
  startRow += batchSize) {
    var take = Math.min(batchSize, lastRow - startRow + 1), chunk = sh.getRange(startRow, minCol + 1, take, projectedWidth).getValues() || [];
    serviceReads ++;
    for(var cr = 0; cr < chunk.length; cr ++ )values.push(chunk[cr])
  }
  _requestScopeNoteRowsRead_(sheetName, values.length);
  var rows = values.map(function(row) {
    var obj = {
    };
    return requested.forEach(function(f) {
      var idx = Object.prototype.hasOwnProperty.call(colByName, f) ? colByName[f]: colByName[normalizeProjectedHeaderKey_(f)];
      obj[f] = (0 === idx || idx > 0) && idx >= minCol && idx <= maxCol ? row[idx - minCol]: ""
    }), obj
  });
  if(! 0 !== opts.includeDeleted && (rows = rows.filter(function(r) {
    return"true" !== String(r && r.isDeleted || "").trim().toLowerCase()
  })), fields.length && requested.length !== fields.length && (rows = rows.map(function(r) {
    var o = {
    };
    return fields.forEach(function(f) {
      o[f] = Object.prototype.hasOwnProperty.call(r, f) ? r[f]: ""
    }), o
  })), ttl)try {
    var projectedEnvelope = {
      rows: rows
    }, projectedText = JSON.stringify(projectedEnvelope), projectedStored = _cacheByteLength_(projectedText) <= _cacheSoftLimitBytes_() ? safeCachePut_(_AppScriptCache_(), ck, projectedText, ttl): ! 1;
    projectedStored || _AppCachePutPartitionedRows_(ck, rows, ttl, {
      sheetName: sheetName, projected: !0, fieldCount: fields.length, entityStamp: ver, serviceReads: serviceReads, readBatchRows: batchSize
    })
  }
  catch(_cacheWriteErr) {
    _recordWarning_("ec", _cacheWriteErr)
  }
  return _requestScopePut_("sheetProjectedObjects", key, rows)
}
function _appDataServicePartitionKey_(sheetName, fields, opts) {
  opts = opts || {
  };
  var ver = "1";
  try {
    _appIsFnName_("_entityCacheStamp_") && (ver = _entityCacheStamp_(String(sheetName || "").toLowerCase()))
  }
  catch(_e) {
    _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
      error: String(_e && _e.message || _e)
    }): void _e
  }
  var seed = JSON.stringify({
    sheet: String(sheetName || "").trim(), fields: _repositoryNormalizeFieldList_(fields), includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical, owner: String(opts.owner || "shared"), stamp: ver
  });
  try {
    return _appIsFnName_("_hashPassword_") ? _hashPassword_(seed).substring(0, 32): seed
  }
  catch(_e) {
    return seed
  }
}
function _appDataServiceCacheRead_(key) {
  try {
    if(! key ||! _appIsFnName_("_AppScriptCache_"))return null;
    var raw = _AppScriptCache_().get(String(key));
    if(raw)return _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_("appDataService", ! 0, 1), JSON.parse(raw);
    var partitioned = _AppCacheGetPartitionedRows_(String(key));
    if(partitioned && Array.isArray(partitioned.rows)) {
      var envelope = partitioned.manifest && partitioned.manifest.meta && partitioned.manifest.meta.envelope || {
      };
      return _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_("appDataServicePartition", ! 0, 1), Object.assign({
      }, envelope, {
        rows: partitioned.rows, cacheHit: ! 0, cacheStatus: "partition-hit"
      })
    }
    return null
  }
  catch(_e) {
    try {
      _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_("appDataService", ! 1, 1)
    }
    catch(_ignore) {
      _appIgnore_(_ignore, "c.s")
    }
    return null
  }
}
function _appDataServiceCacheWrite_(key, value, ttl) {
  try {
    if(! key ||! _appIsFnName_("_AppScriptCache_") || "function" != typeof safeCachePut_)return ! 1;
    ttl = Math.max(10, Math.min(Number(ttl || 120) || 120, 21600));
    var text = JSON.stringify(value), cache = _AppScriptCache_();
    if(_cacheByteLength_(text) <= _cacheSoftLimitBytes_())return safeCachePut_(cache, String(key), text, ttl);
    if(value && Array.isArray(value.rows)) {
      var envelope = Object.assign({
      }, value);
      return delete envelope.rows, _AppCachePutPartitionedRows_(String(key), value.rows, ttl, {
        envelope: envelope, owner: "AppDataService.partitioned-envelope-v1"
      })
    }
    return ! 1
  }
  catch(_e) {
    try {
      _appIsFnName_("_recordWarning_") && _recordWarning_("app.dataService.cacheWrite.failed", _e, {
        key: key
      })
    }
    catch(_ignore) {
      _appIgnore_(_ignore, "c.s")
    }
    return ! 1
  }
}
function _appDataServiceRead_(sheetName, fields, opts) {
  if(opts = opts || {
  }, sheetName = String(sheetName || "").trim(), fields = _repositoryNormalizeFieldList_(fields), ! sheetName)return[];
  var owner = String(opts.owner || "shared-data-service"), ttl =! 0 === opts.forceFresh ? 0: Math.max(0, Math.min(Number(null != opts.ttl ? opts.ttl: 120) || 0, 600)), cacheKey = ttl ? "app_data_service_current_" + _appDataServicePartitionKey_(sheetName, fields, opts): "";
  if(cacheKey) {
    var cached = _appDataServiceCacheRead_(cacheKey);
    if(cached && Array.isArray(cached.rows)) {
      try {
        cached.rows.__repositoryMeta = Object.assign({
        }, cached.meta || {
        }, {
          cacheStatus: "hit", owner: owner
        })
      }
      catch(_m) {
        _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _m): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
          error: String(_m && _m.message || _m)
        }): void _m
      }
      return cached.rows
    }
  }
  var rows = [];
  rows = "function" == typeof readRepositoryRows_ ? readRepositoryRows_(sheetName, fields, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical, ttl: ttl, forceFresh: ! 0 === opts.forceFresh, owner: owner
  }) || []: fields.length && "function" == typeof readSheetProjectedObjectsCached_ ? readSheetProjectedObjectsCached_(sheetName, fields, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical, ttl: ttl
  }) || []: "function" == typeof readSheetObjectsCached_ ? readSheetObjectsCached_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || []: readSheetObjects_(sheetName, {
    includeDeleted: ! 0 === opts.includeDeleted, requireCanonical: ! 0 === opts.requireCanonical
  }) || [], rows = Array.isArray(rows) ? rows: [];
  var meta = {
    stamp: "app-data-service-current", owner: owner, sheetName: sheetName, projected: !! fields.length, fieldCount: fields.length, ttlSeconds: ttl, rowsReturned: rows.length, cacheStatus: "miss"
  };
  try {
    rows.__repositoryMeta = Object.assign({
    }, rows.__repositoryMeta || {
    }, meta)
  }
  catch(_e) {
    _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
      error: String(_e && _e.message || _e)
    }): void _e
  }
  return cacheKey && _appDataServiceCacheWrite_(cacheKey, {
    rows: rows, meta: meta
  }, ttl), rows
}
function safeCachePut_(cache, key, value, ttl) {
  try {
    if(! cache ||! key)return ! 1;
    var text = "string" == typeof value ? value: JSON.stringify(value), softLimit = _cacheSoftLimitBytes_();
    if(_cacheByteLength_(text) > softLimit) {
      try {
        logAudit_("cache.skip.oversize", {
          key: String(key), bytes: _cacheByteLength_(text), limit: softLimit
        })
      }
      catch(_auditErr) {
        _recordWarning_("cache.skip.oversize.audit.failed", _auditErr)
      }
      return ! 1
    }
    return cache.put(String(key), text, Math.max(30, Number(ttl || 60))), ! 0
  }
  catch(_e) {
    return _recordWarning_("cache.put.failed", _e, {
      key: key
    }), ! 1
  }
}
function _cachePartitionManifestKey_(baseKey) {
  return String(baseKey || "") + ":manifest"
}
function _cachePartitionChunkKey_(baseKey, index) {
  return String(baseKey || "") + ":part:" + String(Math.max(0, Number(index || 0) || 0))
}
function _cacheBuildRowPartitions_(rows, maxBytes, maxParts) {
  rows = Array.isArray(rows) ? rows: [], maxBytes = Math.max(12e3, Math.min(Number(maxBytes || 72e3) || 72e3, _cacheSoftLimitBytes_() - 4096)), maxParts = Math.max(1, Math.min(Number(maxParts || 80) || 80, 120));
  for(var parts = [], current = [], currentBytes = 2, i = 0;
  i < rows.length;
  i ++ ) {
    var row = rows[i], rowText;
    try {
      rowText = JSON.stringify(row)
    }
    catch(_rowJsonErr) {
      _recordWarning_("cache.partition.row.stringify", _rowJsonErr), rowText = "{}", row = {
      }
    }
    var rowBytes = _cacheByteLength_(rowText) + (current.length ? 1: 0);
    if(current.length && currentBytes + rowBytes > maxBytes) {
      parts.push(current), current = [], currentBytes = 2;
      if(parts.length >= maxParts)return null
    }
    current.push(row), currentBytes += rowBytes
  }
  return current.length && parts.push(current), parts
}
function _AppCachePutPartitionedRows_(baseKey, rows, ttl, meta) {
  try {
    var cache = _AppScriptCache_();
    if(! cache ||! baseKey ||! Array.isArray(rows))return ! 1;
    var parts = _cacheBuildRowPartitions_(rows, 72e3, 80);
    if(! parts ||! parts.length)return ! 1;
    for(var i = 0;
    i < parts.length;
    i ++ )if(! safeCachePut_(cache, _cachePartitionChunkKey_(baseKey, i), {
      rows: parts[i]
    }, ttl))return ! 1;
    return safeCachePut_(cache, _cachePartitionManifestKey_(baseKey), {
      version: "partitioned-rows-v1", partCount: parts.length, rowCount: rows.length, meta: meta || {
      }, generatedAt: (new Date).toISOString()
    }, ttl)
  }
  catch(_partitionPutErr) {
    return _recordWarning_("cache.partition.put.failed", _partitionPutErr, {
      baseKey: String(baseKey || "")
    }), ! 1
  }
}
function _AppCacheGetPartitionedRows_(baseKey) {
  try {
    var cache = _AppScriptCache_();
    if(! cache ||! baseKey)return null;
    var rawManifest = cache.get(_cachePartitionManifestKey_(baseKey));
    if(! rawManifest)return null;
    var manifest = JSON.parse(rawManifest), count = Math.max(0, Number(manifest && manifest.partCount || 0) || 0);
    if(! count || count > 120)return null;
    for(var keys = [], i = 0;
    i < count;
    i ++ )keys.push(_cachePartitionChunkKey_(baseKey, i));
    var values = "function" == typeof cache.getAll ? cache.getAll(keys): null, rows = [];
    for(var j = 0;
    j < keys.length;
    j ++ ) {
      var raw = values ? values[keys[j]]: cache.get(keys[j]);
      if(! raw)return null;
      var part = JSON.parse(raw);
      if(! part ||! Array.isArray(part.rows))return null;
      rows = rows.concat(part.rows)
    }
    if(Number(manifest.rowCount || rows.length) !== rows.length)return null;
    return {
      rows: rows, manifest: manifest, cacheHit: ! 0, cacheStatus: "partition-hit"
    }
  }
  catch(_partitionGetErr) {
    return _recordWarning_("cache.partition.get.failed", _partitionGetErr, {
      baseKey: String(baseKey || "")
    }), null
  }
}
function cachedSheetObjects_(sheetName, ttl) {
  ttl = ttl || _CACHE_TTL_DATA_;
  var key = "sheet_current_" + sheetName, cache = _AppScriptCache_(), hit = null;
  try {
    hit = cache.get(key)
  }
  catch(e) {
    _recordWarning_("ec", e)
  }
  if(hit)try {
    return JSON.parse(hit)
  }
  catch(e) {
    _recordWarning_("ec", e)
  }
  var data = sheetToObjects_(getSheet_(sheetName));
  try {
    safeCachePut_(cache, key, data, ttl)
  }
  catch(e) {
    _recordWarning_("ec", e)
  }
  return data
}
function invalidateSheetCache_(sheetName) {
  if(_appIsFnName_("_cacheLedgerShouldDeferPhase4_") && _cacheLedgerShouldDeferPhase4_())return _cacheLedgerQueueSheetPhase4_(sheetName, "invalidateSheetCache_", "sheet-cache-request");
  var result = {
    sheetName: String(sheetName || ""), sheetCache: ! 1, entityStamps: [], readModels: null
  };
  try {
    _AppScriptCache_().remove("sheet_current_" + sheetName), result.sheetCache =! 0
  }
  catch(e) {
    _recordWarning_("ec", e)
  }
  try {
    _appIsFnName_("_bumpEntityCacheStamp_") && _sheetEntityCacheKeys_(sheetName).forEach(function(entityKey) {
      _bumpEntityCacheStamp_(entityKey), result.entityStamps.push(entityKey)
    })
  }
  catch(stampErr) {
    try {
      _logWarn_("cache.invalidate.entityStamp", {
        sheetName: sheetName, error: String(stampErr && stampErr.message || stampErr)
      })
    }
    catch(_eWarn) {
      _recordWarning_("ec", _eWarn)
    }
  }
  try {
    _appIsFnName_("_i3InvalidateReadModelsForSheet_") && (result.readModels = _i3InvalidateReadModelsForSheet_(sheetName, "invalidateSheetCache_"))
  }
  catch(readModelErr) {
    _recordWarning_("i3.invalidate.readModel.failed", readModelErr, {
      sheetName: sheetName
    })
  }
  return result
}
function cachedGeminiCall_(cacheKey, requestFn, ttl) {
  ttl = ttl || _CACHE_TTL_GEMINI_;
  var key = "gem_" + cacheKey, cache = _AppScriptCache_();
  try {
    var hit = cache.get(key);
    if(hit)return JSON.parse(hit)
  }
  catch(e) {
    _recordWarning_("ec", e)
  }
  var lock = null;
  try {
    if(! (lock = LockService.getScriptLock()).tryLock(500))return requestFn();
    var lockedHit = cache.get(key);
    if(lockedHit)return JSON.parse(lockedHit);
    var result = requestFn();
    try {
      safeCachePut_(cache, key, result, ttl)
    }
    catch(e2) {
      _recordWarning_("ec", e2)
    }
    return result
  }
  finally {
    try {
      lock && lock.releaseLock()
    }
    catch(_e) {
      _recordWarning_("ec", _e)
    }
  }
}
var _SESSION_TTL_ = _sessionCacheTtlSeconds_(), _SESSION_TOUCH_PERSIST_INTERVAL_ = 300, PERFORMANCE_ENGINE_VERSION = "phase5-performance-gate-paging-envelope-v2";
function _performanceNow_() {
  return(new Date).toISOString()
}
function _performanceJsonStringify_(v) {
  try {
    return JSON.stringify(null == v ? null: v)
  }
  catch(_e) {
    return JSON.stringify({
      error: "JSON_STRINGIFY_FAILED", text: String(v)
    })
  }
}
function _performanceHash_(text) {
  try {
    return(_appIsFnName_("_hashPassword_") ? _hashPassword_(String(text || "")): Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text || ""), Utilities.Charset.UTF_8))).substring(0, 48)
  }
  catch(_e) {
    return String(Date.now())
  }
}
function _performanceMarkDirtyDomains_(domains, reason) {
  return ! 0
}
function _recordPerformanceSample_(sample) {
  try {
    sample = sample || {};
    if(! sample.method)return !1;
    var profile = _appIsFnName_("_appPerformanceProfile_") ? _appPerformanceProfile_(sample.method): null, gate = _appIsFnName_("_appPerformanceEvaluate_") ? _appPerformanceEvaluate_(sample.method, sample): null;
    if(! profile && ! sample.errorCode && !1 !== sample.ok)return !1;
    var key = "APP_PERFORMANCE_GATE_SAMPLES_PHASE5", cache = _AppScriptCache_();
    if(! cache)return !1;
    var rows = [];
    try { rows = JSON.parse(String(cache.get(key) || "[]")) } catch(_parseErr) { rows = [] }
    Array.isArray(rows) || (rows = []);
    var requestId = String(sample.requestId || ""), method = String(sample.method || "");
    requestId && (rows = rows.filter(function(row) {
      return !(String(row && row.requestId || "") === requestId && String(row && row.method || "") === method)
    }));
    rows.unshift({
      at: String(sample.at || _performanceNow_()), requestId: requestId, method: method, group: String(sample.group || "general"), ok: !1 !== sample.ok, durationMs: Math.max(0, Number(sample.durationMs || 0)), rowsRead: Math.max(0, Number(sample.rowsRead || 0)), payloadBytes: Math.max(0, Number(sample.payloadBytes || 0)), cacheHit: !! sample.cacheHit, source: String(sample.source || "live"), errorCode: String(sample.errorCode || ""), gateStatus: String(gate && gate.status || "not-profiled"), violations: gate && gate.violations || []
    });
    return safeCachePut_(cache, key, rows.slice(0, 80), 21600)
  }
  catch(_perfSampleErr) {
    _appIsFnName_("_recordWarning_") && _recordWarning_("performance.sample.record", _perfSampleErr);
    return !1
  }
}
function _performancePercentile_(values, percentile) {
  values = (Array.isArray(values) ? values: []).map(Number).filter(function(v) {
    return isFinite(v) && v >= 0
  }).sort(function(a, b) {
    return a - b
  });
  if(! values.length)return 0;
  var rank = Math.max(0, Math.min(values.length - 1, Math.ceil((Number(percentile || 0) / 100) * values.length) - 1));
  return Number(values[rank] || 0)
}
function getPerformancePercentiles_(method) {
  try {
    var cache = _AppScriptCache_(), rows = cache ? JSON.parse(String(cache.get("APP_PERFORMANCE_GATE_SAMPLES_PHASE5") || "[]")): [];
    rows = (Array.isArray(rows) ? rows: []).filter(function(row) {
      return ! method || String(row && row.method || "") === String(method || "")
    });
    var durations = rows.map(function(row) {
      return Number(row && row.durationMs || 0)
    });
    return {
      ok: ! 0, method: String(method || "all"), sampleCount: durations.length, p50Ms: _performancePercentile_(durations, 50), p95Ms: _performancePercentile_(durations, 95), p99Ms: _performancePercentile_(durations, 99), generatedAt: (new Date).toISOString(), owner: "Code_01_Platform_SheetRepo.performance-percentiles"
    }
  }
  catch(_percentileErr) {
    return {
      ok: ! 1, method: String(method || "all"), sampleCount: 0, p50Ms: 0, p95Ms: 0, p99Ms: 0, error: String(_percentileErr && _percentileErr.message || _percentileErr), owner: "Code_01_Platform_SheetRepo.performance-percentiles"
    }
  }
}
function getPerformancePercentilesSnapshot_(methods) {
  try {
    var cache = _AppScriptCache_(), rows = cache ? JSON.parse(String(cache.get("APP_PERFORMANCE_GATE_SAMPLES_PHASE5") || "[]")): [], requested = Array.isArray(methods) ? methods.map(function(name) {
      return String(name || "").trim()
    }).filter(Boolean): [], grouped = {
    };
    (Array.isArray(rows) ? rows: []).forEach(function(row) {
      var method = String(row && row.method || "");
      if(method && (! requested.length || requested.indexOf(method) >= 0))(grouped[method] = grouped[method] || []).push(Number(row && row.durationMs || 0))
    });
    var out = {
    };
    return(requested.length ? requested: Object.keys(grouped)).forEach(function(method) {
      var values = grouped[method] || [];
      out[method] = {
        sampleCount: values.length, p50Ms: _performancePercentile_(values, 50), p95Ms: _performancePercentile_(values, 95), p99Ms: _performancePercentile_(values, 99)
      }
    }), {
      ok: ! 0, methods: out, sampleCount: (Array.isArray(rows) ? rows: []).length, generatedAt: (new Date).toISOString(), owner: "Code_01_Platform_SheetRepo.performance-percentiles-snapshot"
    }
  }
  catch(_snapshotErr) {
    return {
      ok: ! 1, methods: {
      }, sampleCount: 0, error: String(_snapshotErr && _snapshotErr.message || _snapshotErr), owner: "Code_01_Platform_SheetRepo.performance-percentiles-snapshot"
    }
  }
}
function _performanceCleanPayloadForCache_(payload) {
  payload = payload && "object" == typeof payload &&! Array.isArray(payload) ? payload: {
  };
  var out = {
  };
  return Object.keys(payload).sort().forEach(function(k) {
    if(! /^(token|_token|csrfToken|nextToken|password|_securityContext|requestId)$/i.test(k) &&! /^actionToken$/i.test(k)) {
      var v = payload[k];
      "function" != typeof v && (out[k] = v)
    }
  }), out
}
function _performanceDomainOwnedCacheRoute_(method) {
  return !! { apiGetDashboardBundle: 1 }[String(method || "")]
}
function _performanceRouteCacheableTtl_(method, meta) {
  method = String(method || "");
  if(_performanceDomainOwnedCacheRoute_(method))return 0;
  var ttlMap = {
    apiBudgetGetSummary: 600, apiBudgetGetTypeSummaryByFY: 900, apiBudgetGetFiscalYears: 900, apiBudgetGetSubcommitteeOptions: 900, apiGetPeoplePageBundle: 600, apiGetPersonnelDirectoryBundle: 600, apiListCommitteeMeetings: 600, apiGetCommitteeMeetingSystem: 600, apiGetMeetingLookupOptions: 900, apiGetTracking: 600, apiSearchCasesLite: 600, apiGetCases: 300, apiGetPetitioners: 600, apiGetThailandLocations: 21600, apiSearchLookup: 3600, apiGetRouteContract: 900, apiGetClientDataContract: 900, apiGetAppTerminology: 21600
  };
  return ttlMap[method] ? ttlMap[method]: (meta && meta.write, 0)
}
function _performanceStampSeedForRoute_(method, meta) {
  var group = String(meta && (meta.group || meta.domain || "") || "").toLowerCase(), methodText = String(method || "").toLowerCase(), entities = [];
  return(entities = /dashboard/.test(group + methodText) ? ["dashboard", "maindata", "budgetimports", "budgetsummary", "budgettypesummary", "personnel", "letters", "meetinglogs"]: /budget/.test(group + methodText) ? ["budgetimports", "budgetsummary", "budgettypesummary", "budgetsettings", "budget"]: /people|personnel/.test(group + methodText) ? ["personnel", "personnel_comm", "personnel_staff", "personnel_op", "budgetsettings"]: /tracking|letter/.test(group + methodText) ? ["tracking", "letters", "maindata"]: /case|search|report/.test(group + methodText) ? ["maindata", "cases", "letters", "meetinglogs"]: /petitioner/.test(group + methodText) ? ["petitioners", "maindata"]: /lookup|thailand/.test(group + methodText) ? ["thailandlocations", "lookups"]: [group || "general"]).map(function(e) {
    var v = "1";
    try {
      v = _appIsFnName_("_entityCacheStamp_") ? _entityCacheStamp_(e): "1"
    }
    catch(_e) {
      _appIsFnName_("_recordWarning_") ? _recordWarning_("ec", _e): _appIsFnName_("_logWarn_") ? _logWarn_("ec", {
        error: String(_e && _e.message || _e)
      }): void _e
    }
    return e + "=" + v
  }).join("|")
}
function _performanceRouterReadCacheKey_(method, payload, meta, sess) {
  var clean = _performanceCleanPayloadForCache_(payload || {
  }), role = sess && sess.role ? String(sess.role || ""): String(payload && payload.role || "viewer"), seed = {
    method: String(method || ""), role: role || "viewer", stampSeed: _performanceStampSeedForRoute_(method, meta), payload: clean, app: PERFORMANCE_ENGINE_VERSION
  };
  return"performance:route:" + String(method || "") + ":" + _performanceHash_(_performanceJsonStringify_(seed))
}
function _performanceRouterReadCacheGet_(method, payload, meta, sess) {
  try {
    if(! method ||! meta || meta.write || meta.public)return null;
    if(payload && (! 0 === payload.forceFresh ||! 0 === payload.noCache ||! 0 === payload.bypassCache))return null;
    if(! _performanceRouteCacheableTtl_(method, meta))return null;
    var hit = _AppCacheGetJson_(_performanceRouterReadCacheKey_(method, payload, meta, sess)), found = !! (hit && hit.result);
    _appIsFnName_("_requestScopeNoteCacheAccess_") && _requestScopeNoteCacheAccess_("routerReadCache", found, 1);
    if(found)return hit.result.cacheHit =! 0, hit.result.cacheSource = "performance-router-read-cache", hit.result
  }
  catch(e) {
    try { _recordWarning_("performance.router.cache.get.failed", e) } catch(_ignored) { _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _ignored) }
  }
  return null
}
function _performanceRouterReadCachePut_(method, payload, meta, sess, normalized) {
  try {
    if(! method ||! meta || meta.write || meta.public ||! normalized ||! 1 === normalized.ok)return ! 1;
    if(payload && (! 0 === payload.forceFresh ||! 0 === payload.noCache ||! 0 === payload.bypassCache || 0 === payload.cacheTtlSeconds))return ! 1;
    var ttl = _performanceRouteCacheableTtl_(method, meta);
    if(! ttl)return ! 1;
    var cachedResult = {};
    Object.keys(normalized).forEach(function(key) {
      "rows" !== key && "items" !== key && "records" !== key && "perf" !== key && "requestId" !== key && "latencyMs" !== key && "token" !== key && "nextToken" !== key && "csrfToken" !== key && "nextCsrfToken" !== key && (cachedResult[key] = normalized[key])
    }), cachedResult.ok = !0, cachedResult.data = normalized.data, cachedResult.msg = normalized.msg || "", cachedResult.error = "", cachedResult.method = method, cachedResult.cacheStoredAt = _performanceNow_(), cachedResult.cacheContract = "router-read-envelope-paging-v2";
    return _AppCachePutJson_(_performanceRouterReadCacheKey_(method, payload, meta, sess), {
      result: cachedResult
    }, ttl)
  }
  catch(e) {
    try {
      _recordWarning_("performance.router.cache.put.failed", e)
    }
    catch(_ignored) {
      _appIsFnName_("_recordWarning_") && _recordWarning_("ec", _ignored)
    }
    return ! 1
  }
}
var SHEET_REPO_BATCH_CONTRACT_STAMP = 'sheetrepo-batch-owner-safety-gate-2026-06-19';
var AppSheetBatch = __APP_GLOBAL__.AppSheetBatch = __APP_GLOBAL__.AppSheetBatch || {
};
AppSheetBatch.objectToRow = function(sheetName, headers, obj) {
  obj = obj || {
  };
  headers = Array.isArray(headers) ? headers: [];
  return headers.map(function(h) {
    var canonical = typeof _canonicalHeaderNameForSheet_ === 'function' ? _canonicalHeaderNameForSheet_(sheetName, h): h;
    return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h]: canonical && Object.prototype.hasOwnProperty.call(obj, canonical) ? obj[canonical]: '';
  });
};
AppSheetBatch._mergePatchIntoRow = function(row, patch, map, width) {
  row = Array.isArray(row) ? row: [];
  Object.keys(patch || {
  }).forEach(function(k) {
    var i = map[k];
    if(void 0 === i)i = map[_normalizedHeaderKey_(k)];
    if(void 0 !== i && i < width)row[i] = patch[k]
  });
  return row.slice(0, width)
};
AppSheetBatch._contiguousSegments = function(rowNumbers, maxRowsPerSegment) {
  var rows = (Array.isArray(rowNumbers) ? rowNumbers: []).map(function(n) {
    return Number(n || 0) || 0
  }).filter(function(n) {
    return n > 1
  }).sort(function(a, b) {
    return a - b
  }), unique = [], segments = [], maxRows = Math.max(1, Math.min(Number(maxRowsPerSegment || 500) || 500, 1000));
  rows.forEach(function(n) {
    (! unique.length || unique[unique.length - 1] !== n) && unique.push(n)
  });
  unique.forEach(function(n) {
    var current = segments.length ? segments[segments.length - 1]: null;
    ! current || n !== current.endRow + 1 || current.endRow - current.startRow + 1 >= maxRows ? segments.push({
      startRow: n, endRow: n, rowNumbers: [n]
    }): (current.endRow = n, current.rowNumbers.push(n))
  });
  return segments
};
AppSheetBatch.appendObjects = function(sheetName, objects, opts) {
  objects = Array.isArray(objects) ? objects: [];
  opts = opts || {
  };
  if(! objects.length)return {
    ok: true, rows: 0, mode: 'append', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceWrites: 0
  };
  return withWriteLock_('sheetBatch.append:' + String(sheetName || ''), function() {
    var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
    if(audit.missing.length)throw new Error('ชีต ' + sheetName + ' ยังไม่เป็น canonical: ' + audit.missing.join(', '));
    var headers = _sheetHeaders_(sheetName), matrix = objects.map(function(o) {
      return AppSheetBatch.objectToRow(sheetName, headers, o || {
      })
    }), startRow = Math.max(sh.getLastRow(), 1) + 1;
    sh.getRange(startRow, 1, matrix.length, headers.length).setValues(matrix);
    ! opts.deferAfterWrite && _afterSheetWrite_(sheetName, {
      operation: 'AppSheetBatch.appendObjects', rows: matrix.length, flush: !! opts.flush
    });
    return {
      ok: true, rows: matrix.length, startRow: startRow, mode: 'append', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceWrites: 1
    }
  }, Number(opts.lockTimeoutMs || 3e4) || 3e4)
};
AppSheetBatch.updateObjectsByKey = function(sheetName, keyField, objects, opts) {
  objects = Array.isArray(objects) ? objects: [];
  opts = opts || {};
  if(! objects.length)return {
    ok: true, rows: 0, mode: 'update', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceReads: 0, serviceWrites: 0, batchRanges: 0, indexReused: !1
  };
  return withWriteLock_('sheetBatch.update:' + String(sheetName || ''), function() {
    var sh = getSheet_(sheetName), audit = getCanonicalHeaderAudit_(sheetName);
    if(audit.missing.length)throw new Error('ชีต ' + sheetName + ' ยังไม่เป็น canonical: ' + audit.missing.join(', '));
    var headers = Array.isArray(opts.headers) ? opts.headers.slice(): _sheetHeaders_(sheetName), map = opts.headerMap && 'object' == typeof opts.headerMap ? opts.headerMap: _canonicalHeaderIndexMap_(sheetName, headers), keyIndex = map[keyField];
    if(void 0 === keyIndex)keyIndex = map[_normalizedHeaderKey_(keyField)];
    if(void 0 === keyIndex)throw new Error('ไม่พบ key field: ' + keyField);
    var width = Math.max(headers.length, Number(sh.getLastColumn && sh.getLastColumn()) || headers.length || 1), suppliedIndex = opts.rowIndex && opts.rowIndex.map ? opts.rowIndex: null, idx = suppliedIndex || _i3SheetRowIndexByKey_(sheetName, keyField, keyIndex, {
      headers: headers, headerMap: map, forceFresh: !0, readBatchRows: opts.indexReadBatchRows || 0
    }), patchesByRow = {}, rowNumbers = [], missingKeys = [];
    objects.forEach(function(patch) {
      var key = String(patch && patch[keyField] || '').trim();
      if(! key)return;
      var rowNumber = Number(idx && idx.map && idx.map[key] || 0) || 0;
      if(! rowNumber)return missingKeys.push(key);
      patchesByRow[rowNumber] = Object.assign(patchesByRow[rowNumber] || {}, patch || {}), rowNumbers.push(rowNumber)
    });
    var segments = AppSheetBatch._contiguousSegments(rowNumbers, opts.maxRowsPerSegment || 500), touched = 0, serviceReads = 0, serviceWrites = 0;
    segments.forEach(function(segment) {
      var range = sh.getRange(segment.startRow, 1, segment.endRow - segment.startRow + 1, width), values = range.getValues();
      serviceReads ++;
      segment.rowNumbers.forEach(function(rowNumber) {
        var offset = rowNumber - segment.startRow, patch = patchesByRow[rowNumber];
        values[offset] = AppSheetBatch._mergePatchIntoRow(values[offset] || [], patch, map, width), touched ++
      });
      range.setValues(values), serviceWrites ++
    });
    touched &&! opts.deferAfterWrite && _afterSheetWrite_(sheetName, {
      operation: 'AppSheetBatch.updateObjectsByKey', rows: touched, flush: !! opts.flush, batchRanges: segments.length
    });
    return {
      ok: true, rows: touched, missing: missingKeys.length, missingKeys: missingKeys, mode: 'update', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceReads: serviceReads + (suppliedIndex ? 0: Number(idx && idx.serviceReads || 0)), serviceWrites: serviceWrites, batchRanges: segments.length, indexReused: !! suppliedIndex
    }
  }, Number(opts.lockTimeoutMs || 3e4) || 3e4)
};
AppSheetBatch.upsertObjects = function(sheetName, keyField, objects, opts) {
  objects = Array.isArray(objects) ? objects: [];
  opts = opts || {};
  if(! objects.length)return {
    ok: true, created: 0, updated: 0, rows: 0, mode: 'upsert', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceReads: 0, serviceWrites: 0, indexReused: !1
  };
  return withWriteLock_('sheetBatch.upsert:' + String(sheetName || ''), function() {
    var headers = _sheetHeaders_(sheetName), map = _canonicalHeaderIndexMap_(sheetName, headers), keyIndex = map[keyField];
    if(void 0 === keyIndex)keyIndex = map[_normalizedHeaderKey_(keyField)];
    if(void 0 === keyIndex)throw new Error('ไม่พบ key field: ' + keyField);
    var idx = _i3SheetRowIndexByKey_(sheetName, keyField, keyIndex, {
      headers: headers, headerMap: map, forceFresh: !0, readBatchRows: opts.indexReadBatchRows || 0
    }), creates = [], updates = [];
    objects.forEach(function(o) {
      var key = String(o && o[keyField] || '').trim();
      if(! key)return;
      (idx && idx.map && idx.map[key] ? updates: creates).push(o)
    });
    var u = updates.length ? AppSheetBatch.updateObjectsByKey(sheetName, keyField, updates, {
      flush: false, deferAfterWrite: !0, maxRowsPerSegment: opts.maxRowsPerSegment || 500, headers: headers, headerMap: map, rowIndex: idx
    }): {
      rows: 0, serviceReads: 0, serviceWrites: 0, batchRanges: 0, indexReused: !0
    }, c = creates.length ? AppSheetBatch.appendObjects(sheetName, creates, {
      flush: false, deferAfterWrite: !0
    }): {
      rows: 0, serviceWrites: 0
    }, totalRows = (u.rows || 0) + (c.rows || 0);
    totalRows && _afterSheetWrite_(sheetName, {
      operation: 'AppSheetBatch.upsertObjects', rows: totalRows, flush: !! opts.flush, batchRanges: Number(u.batchRanges || 0) + (c.rows ? 1: 0)
    });
    return {
      ok: true, created: c.rows || 0, updated: u.rows || 0, rows: totalRows, mode: 'upsert', sheetName: String(sheetName || ''), stamp: SHEET_REPO_BATCH_CONTRACT_STAMP, serviceReads: Number(idx && idx.serviceReads || 0) + Number(u.serviceReads || 0), serviceWrites: Number(u.serviceWrites || 0) + Number(c.serviceWrites || 0), batchRanges: Number(u.batchRanges || 0) + (c.rows ? 1: 0), indexReused: !0
    }
  }, Number(opts.lockTimeoutMs || 3e4) || 3e4)
};
function appendSheetObjects_(sheetName, objects, opts) {
  return AppSheetBatch.appendObjects(sheetName, objects, opts || {
  })
}
function updateSheetObjectsByKey_(sheetName, keyField, objects, opts) {
  return AppSheetBatch.updateObjectsByKey(sheetName, keyField, objects, opts || {
  })
}
function upsertSheetObjectsByKey_(sheetName, keyField, objects, opts) {
  return AppSheetBatch.upsertObjects(sheetName, keyField, objects, opts || {
  })
}
