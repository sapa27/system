#!/usr/bin/env python3
"""Compatibility wrapper: Phase N legacy-transport removal gate supersedes this gate."""
from pathlib import Path
import runpy
ROOT = Path(__file__).resolve().parents[1]
runpy.run_path(str(ROOT / 'tools' / 'phaseN_legacy_transport_gate.py'), run_name='__main__')
