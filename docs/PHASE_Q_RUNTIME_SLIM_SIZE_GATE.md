# Phase Q — Runtime Slimming & Size Gate

Release: `commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1`

## เป้าหมาย

- คง owner registry ชุดเดียว: `OWNER_REGISTRY.json`
- คง release gate ชุดเดียว: `tools/release_gate.py`
- ไม่เพิ่ม API ใหม่
- ถอด backend compatibility สำหรับ browser fallback transport ออกจาก active routing
- เพิ่ม size gate เพื่อกัน runtime/page script โตกลับ

## เส้นทางที่เหลือ

- Browser login: `/api/login`
- Browser read/write: `/api/gas`
- Public config: `/api/public-config`
- GAS backend: `doPost` JSON envelope -> `apiRouter`

## Size gate

เกณฑ์ถูกเก็บใน `OWNER_REGISTRY.json.sizeGate.maxBytes` และตรวจโดย `tools/release_gate.py` ระหว่าง build.
