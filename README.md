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