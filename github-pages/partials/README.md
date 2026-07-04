# Vercel static frontend + Google Apps Script backend

แพ็กเกจนี้พร้อม deploy frontend บน **Vercel** โดยยังใช้ Google Apps Script เป็น API หลังบ้านเดิม

## วิธี deploy บน Vercel

1. นำไฟล์ในโฟลเดอร์ `gas-backend` ไปอัปเดตใน Apps Script project เดิม แล้ว Deploy เป็น Web app
   - Execute as: Me / User deploying
   - Who has access: Anyone
2. คัดลอก Web app URL ที่ลงท้ายด้วย `/exec`
3. ตั้งค่า Vercel Environment Variable:

   ```bash
   NEXT_PUBLIC_GAS_WEB_APP_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   NEXT_PUBLIC_APP_LOGO_URL=
   ```

4. ตั้งค่า Vercel project จาก package root นี้ โดยใช้ค่าจาก `vercel.json`
   - Build Command: `python3 tools/generate_vercel_env.py && python3 tools/sync_frontend_partials.py --check && python3 tools/phaseN_legacy_transport_gate.py`
   - Output Directory: `github-pages`
5. Deploy
6. เปิด `/diagnostic.html` บน Vercel เพื่อตรวจ release stamp, public config, iframe bridge และ Phase G security

## ก่อน deploy ทุกครั้ง

รันจาก package root:

```bash
python3 tools/generate_vercel_env.py
python3 tools/sync_frontend_partials.py --check
python3 tools/phaseG_security_gate.py
python3 tools/phaseN_legacy_transport_gate.py
```

## สิ่งที่ Phase L ทำ

- เพิ่ม Vercel static hosting foundation
- โหลด `vercel-env.generated.js` ก่อน `app-config.js`
- ใช้ env public สำหรับ `gasWebAppUrl` โดยไม่ต้องแก้ไฟล์ JS ด้วยมือ
- คง Phase G security hardening: login POST only, no fast-login JSONP, require bridge ready message
- คง Phase K write schema unification
- ยังไม่เปิด Vercel proxy-only transport

## Transport policy ปัจจุบัน

- Public read เฉพาะ contract method ใน allow-list ใช้ JSONP
- Authenticated read ใช้ hidden iframe bridge + postMessage และต้องรอ ready message จริง
- Write/mutation ใช้ hidden iframe bridge + postMessage และต้องผ่าน write schema preflight
- Login ใช้ login POST iframe เท่านั้น
- ไม่ส่ง token/csrf ผ่าน JSONP URL

## การทดสอบเร็ว

เปิดหน้า Vercel แล้วเพิ่ม query string ครั้งแรกได้ เช่น

```text
?gas=https://script.google.com/macros/s/XXXXXXXX/exec
```

ระบบจะบันทึก URL ลง localStorage ของ browser เครื่องนั้น หรือใช้ค่า `NEXT_PUBLIC_GAS_WEB_APP_URL` จาก Vercel build ก็ได้

## Phase N ต่อไป

Phase N ควรเพิ่ม Vercel proxy-only transport เพื่อแทน iframe/JSONP transport ใน authenticated flow แต่ **Phase L ยังไม่เพิ่ม proxy** เพื่อให้การย้าย hosting ตรวจง่ายและย้อนกลับง่าย

## Phase N — Vercel proxy-only transport

Phase N routes login/read/write through same-origin Vercel API endpoints instead of iframe bridge/JSONP during normal Vercel deployment:

```text
/api/login          -> GAS doPost apiLogin
/api/gas            -> GAS doPost apiRouter(method,payload)
/api/public-config  -> GAS __githubPublicConfig
```

Required Vercel environment variable:

```bash
GAS_WEB_APP_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Build/gate:

```bash
python3 tools/generate_vercel_env.py
python3 tools/sync_frontend_partials.py --check
python3 tools/phaseN_legacy_transport_gate.py
```
