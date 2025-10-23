# React Ink IME Bug Reproduction

This repository reproduces the IME (Input Method Editor) input bug in React Ink's TextInput component, as reported in [anthropics/claude-code#1547](https://github.com/anthropics/claude-code/issues/1547).

## Problem

When using Japanese IME (or other IME systems) with React Ink's TextInput component:
- Significant slowdown during text input
- Duplicate conversion candidate windows may appear
- Laggy and unresponsive typing experience

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

Try typing Japanese text in the first input field using your IME, and compare it with typing English text in the second field.

## Expected Behavior

The IME should work smoothly without lag or duplicate windows, similar to other terminal applications like vim or emacs.

## Actual Behavior

The TextInput component has performance issues when handling IME input, making it difficult to type Japanese text naturally.

## Investigation Results

**Root Cause Identified:** React Ink does not send Synchronized Update Mode (CSI ? 2026) escape sequences.

For detailed technical analysis, see [INVESTIGATION.md](INVESTIGATION.md).

### Quick Summary

- ❌ **Verified**: React Ink does not send `CSI ? 2026 h/l` sequences
- 🐛 **Impact**: Terminal multiplexers (Zellij, tmux) cannot detect frame boundaries
- 🎯 **Result**: IME candidate windows appear at wrong cursor positions
- ✅ **Solution**: Add CSI 2026 support to React Ink

### Verification

```bash
script -q /tmp/output.log
npm start
# Type some text and exit
grep -ao "$(printf "\x1b\[?2026")" /tmp/output.log
# Result: ❌ Not found
```