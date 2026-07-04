# Phase N Source Size Reduction Patch

วันที่: 2026-07-04

## เป้าหมาย

- ลดขนาดไฟล์โดยไม่เพิ่ม API ใหม่
- รักษา route owner และ write schema owner เดิม
- ใช้ minify แบบไม่ mangle identifier เพื่อลดความเสี่ยงต่อ global function / GAS handler
- ปรับ gate ให้รองรับ source ที่ผ่าน minify เช่น true/false เป็น !0/!1 และ object key แบบไม่ใส่ quote

## ผลลดขนาดไฟล์หลัก

| ไฟล์ | ก่อน | หลัง | ลดลง |
|---|---:|---:|---:|
| `gas-backend/Scripts_Core_Runtime.html` | 441,726 | 410,034 | 31,692 |
| `gas-backend/Scripts_Critical_Login_Runtime.html` | 92,531 | 85,328 | 7,203 |
| `gas-backend/Index.html` | 294,128 | 273,741 | 20,387 |
| `github-pages/github-gas-transport.js` | 30,098 | 26,353 | 3,745 |
| `github-pages/critical-login-runtime.js` | 103,454 | 97,743 | 5,711 |
| `github-pages/app-index-bootstrap.js` | 54,852 | 50,915 | 3,937 |
| `github-pages/app-index-foundation-pre-vue.js` | 22,213 | 19,148 | 3,065 |
| `github-pages/app-config.js` | 14,223 | 12,788 | 1,435 |
| `api/_gasProxyCommon.js` | 7,692 | 6,479 | 1,213 |
| `gas-backend/Code_00_PlatformCore.gs` | 228,733 | 220,154 | 8,579 |
| `gas-backend/Code_01_Platform_SheetRepo.gs` | 163,031 | 150,483 | 12,548 |
| `gas-backend/Code_10_Security_Auth.gs` | 82,819 | 76,346 | 6,473 |
| `gas-backend/Code_20_Router.gs` | 117,581 | 109,614 | 7,967 |
| `gas-backend/Code_32_Domain_Budget.gs` | 275,502 | 267,804 | 7,698 |
| `gas-backend/Code_30_Domain_Cases.gs` | 387,273 | 381,329 | 5,944 |

รวม source package ก่อน: **5,344,039 bytes**
รวม source package หลัง: **5,184,840 bytes**
ลดลงสุทธิ: **159,199 bytes**

## สิ่งที่ไม่เปลี่ยน

- ไม่เพิ่ม API route
- ไม่เพิ่ม API owner
- ไม่ย้าย write schema owner
- ไม่เปลี่ยน business logic ของ save/add/delete
- Generated partial mirrors ยัง sync จาก `gas-backend/Scripts_*.html` ด้วย `tools/sync_frontend_partials.py`

## Gate ที่ปรับให้รองรับ source แบบ minified

- `tools/phaseN_legacy_transport_gate.py` เพิ่ม compact/contains_code และ brace scanner สำหรับ router function body
- `tools/phaseG_security_gate.py` รองรับ boolean literal ทั้ง `true/false` และ `!0/!1`

## ผลทดสอบ

- HTML/GAS script syntax: ผ่าน
- `npm run check:api`: ผ่าน
- `python3 tools/phaseG_security_gate.py`: ผ่าน
- `python3 tools/phaseK_write_schema_gate.py`: ผ่าน
- `npm run build`: ผ่าน
- write route/schema: 27/27
