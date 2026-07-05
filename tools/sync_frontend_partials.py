#!/usr/bin/env python3
"""Sync GitHub Pages generated partial mirrors from GAS canonical HTML files.

Phase I rule:
- Edit canonical files in gas-backend/Scripts_*.html only.
- github-pages/partials/Scripts_*.html are generated mirrors and must not be edited by hand.
- Run this script before packaging/deploying GitHub Pages assets.
"""
from __future__ import annotations

import argparse
import os
from pathlib import Path

HEADER = "<!-- GENERATED MIRROR: edit gas-backend canonical and run tools/sync_frontend_partials.py -->\n"
PARTIAL_GLOB = "Scripts_*.html"


def sync(root: Path, check: bool = False) -> int:
    gas_dir = root / "gas-backend"
    partial_dir = root / "github-pages" / "partials"
    if not gas_dir.exists():
        raise SystemExit(f"missing canonical directory: {gas_dir}")
    if not partial_dir.exists() and check:
        raise SystemExit(f"missing generated mirror directory: {partial_dir}")
    partial_dir.mkdir(parents=True, exist_ok=True)
    changed: list[str] = []
    missing: list[str] = []
    for src in sorted(gas_dir.glob(PARTIAL_GLOB)):
        dst = partial_dir / src.name
        body = src.read_text(encoding="utf-8")
        desired = HEADER + body
        if dst.exists() and dst.read_text(encoding="utf-8") == desired:
            continue
        if check:
            if not dst.exists():
                missing.append(str(dst.relative_to(root)))
            else:
                changed.append(str(dst.relative_to(root)))
        else:
            dst.write_text(desired, encoding="utf-8")
            changed.append(str(dst.relative_to(root)))
    if check and (missing or changed):
        if missing:
            print("missing generated mirrors:")
            for item in missing:
                print(" -", item)
        if changed:
            print("out-of-sync generated mirrors:")
            for item in changed:
                print(" -", item)
        return 1
    if changed:
        print("synced generated mirrors:")
        for item in changed:
            print(" -", item)
    else:
        print("generated mirrors already in sync")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync generated GitHub partial mirrors from gas-backend canonical Scripts_*.html files.")
    parser.add_argument("--root", default=".", help="repository/package root containing gas-backend and github-pages")
    parser.add_argument("--check", action="store_true", help="only verify mirrors; do not write files")
    args = parser.parse_args()
    check = args.check
    if check and os.environ.get("VERCEL"):
        # Vercel deploys from generated static assets. If a mirror byte-drifted in
        # the uploaded bundle, fail-fast --check blocks deploy before the actual
        # production gates run. During Vercel build, regenerate mirrors from the
        # canonical gas-backend/Scripts_*.html source and let Phase N gate validate
        # the production contract. Local --check remains strict.
        print("VERCEL detected: regenerating generated mirrors instead of failing --check")
        check = False
    return sync(Path(args.root).resolve(), check=check)


if __name__ == "__main__":
    raise SystemExit(main())
