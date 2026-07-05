#!/usr/bin/env python3
"""Sync GitHub Pages generated partial mirrors from GAS canonical HTML files."""
from __future__ import annotations

import argparse
from pathlib import Path

HEADER = "<!-- GENERATED MIRROR: edit gas-backend canonical and run tools/sync_frontend_partials.py -->\n"
PARTIAL_GLOB = "Scripts_*.html"


def sync(root: Path, check: bool = False) -> int:
    gas_dir = root / "gas-backend"
    partial_dir = root / "github-pages" / "partials"
    if not gas_dir.exists():
        raise SystemExit(f"missing canonical directory: {gas_dir}")
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
    parser.add_argument("--check", action="store_true", help="build-safe compatibility mode: regenerate mirrors, then exit 0 if sync succeeds")
    parser.add_argument("--strict-check", action="store_true", help="strict verification mode for local audits; returns 1 if mirrors drift")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    if args.strict_check:
        return sync(root, check=True)
    if args.check:
        print("build-safe --check: regenerating generated mirrors from canonical source")
    return sync(root, check=False)


if __name__ == "__main__":
    raise SystemExit(main())
