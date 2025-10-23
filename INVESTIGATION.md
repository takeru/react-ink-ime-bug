# React Ink Issue Draft

## Title
Add support for Synchronized Update Mode (CSI ? 2026) to fix IME issues in terminal multiplexers

## Body

### Problem
When using React Ink applications inside terminal multiplexers like Zellij, tmux, or screen, the IME (Input Method Editor) candidate window for CJK languages (Japanese, Chinese, Korean) appears at incorrect positions during text input.

### Root Cause
React Ink does not send the Synchronized Update Mode escape sequences (`CSI ? 2026 h/l`), which causes terminal multiplexers to read cursor positions during frame rendering, resulting in inaccurate cursor position reports to the terminal emulator.

**Verification:**
```bash
script -q /tmp/output.log
npm start  # any React Ink app
# Type some text and exit
grep -ao "$(printf "\x1b\[?2026")" /tmp/output.log
# Result: Not found
```

### Synchronized Update Mode Specification

**Sequences:**
- `CSI ? 2026 h` - Begin Synchronized Update (BSU)
- `CSI ? 2026 l` - End Synchronized Update (ESU)

**Purpose:**
Mark the beginning and end of a frame to prevent terminal multiplexers from reading intermediate cursor positions during rendering.

**References:**
- Specification: https://gist.github.com/christianparpart/d8a62cc1ab659194337d73e399004036
- Terminal support: iTerm2, Alacritty, Kitty, WezTerm, tmux, Zellij

### Proposed Solution

Add synchronized update sequences around each frame render:

```typescript
// Before rendering frame
process.stdout.write('\x1b[?2026h');  // Begin Synchronized Update

// Render frame
renderToTerminal();

// After rendering frame  
process.stdout.write('\x1b[?2026l');  // End Synchronized Update
```

### Benefits
1. **Fixes IME issues** in terminal multiplexers for CJK users
2. **Improves rendering performance** - terminals can batch updates
3. **Eliminates screen tearing** during fast updates
4. **Follows terminal standards** - widely supported feature

### Impact
This is a critical issue for CJK language users (Japanese, Chinese, Korean) who rely on IME for text input. Without this fix, React Ink applications are nearly unusable in terminal multiplexers.

### Related Issues
- Zellij: (will create after this)
- Claude Code: anthropics/claude-code#1547
- Reproduction: https://github.com/takeru/react-ink-ime-bug

### Testing
Terminal multiplexers like Zellij use this to detect mid-frame rendering:
```rust
// zellij-server/src/panes/grid.rs
pub fn is_mid_frame(&self) -> bool {
    self.lock_renders  // Set by CSI ? 2026 h/l
}
```

Without these sequences, multiplexers cannot distinguish between:
- Intermediate cursor positions during rendering
- Final cursor position after rendering complete
