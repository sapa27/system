# Phase G Security Hardening

ขอบเขต Phase G คือปิดช่องเสี่ยงของ transport/login โดยไม่เพิ่ม API และไม่เปลี่ยน business logic เดิม

## สิ่งที่บังคับใช้

1. `fast-login JSONP` ถูกปิดถาวร
   - frontend ไม่สร้าง URL `__githubFastLogin=1`
   - backend endpoint `_githubRenderFastLogin_` คืน `FAST_LOGIN_JSONP_DISABLED`
   - `_githubFastLoginIssueSession_` ไม่เรียก `_issueLoginSession_`

2. Login ใช้ `login POST iframe` เท่านั้น
   - ต้องมี username/password ใน POST payload
   - ไม่มี fallback ที่ออก session จาก username อย่างเดียว

3. Authenticated read/write ต้องใช้ bridge ที่พร้อมจริง
   - ต้องได้รับ `GAS_IFRAME_TRANSPORT_READY` หรือ `GAS_BRIDGE_READY`
   - `iframe load` ไม่ถูกนับเป็น bridge ready
   - `assumedReady` ถูกปิด

4. Public JSONP ยังคงใช้ได้เฉพาะ contract/public read allow-list เท่านั้น

## ตรวจก่อน deploy

```bash
python tools/phaseG_security_gate.py
```


## Phase I note

Phase I keeps this security hardening active and enforces it through `tools/phaseG_security_gate.py` and `tools/phaseI_contract_gate.py`. Current package release: `commission-v1.1-phaseN-remove-legacy-transport-2026-07-02-r1`.
