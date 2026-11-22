# r-ui Interactive Showcase & Playground (v2.4.0)

Self-contained zero-dependency interactive playground for evaluating the visual design and engineering capabilities of `r-ui`.

---

## Getting Started

Requires zero Node.js setup, dev server, or build step. Open the file directly in any modern browser:

```text
references/examples/r-ui-showcase.html
```

---

## Interactive Visual-First Features

1. **Dual-Layer Theme Switcher**:
   - Choose canvas themes (Dark Nebula, Clean Light, Slate Obsidian, Warm Sepia, High Contrast) via top-right dropdown.
   - Choose accent color palettes (8 calibrated tones) via circular swatches.
   - Smooth, flicker-free CSS variable transitions (*anti-flicker*).
2. **Adaptive Modal vs Mobile Bottom-Sheet**:
   - Click the **"Open Adaptive Modal"** button.
   - On desktop: modal is centered with crisp micro-elevation.
   - On mobile viewports (< 768px): dialog automatically converts to a native-feel bottom-sheet with safe-area insets.
3. **Smart TV Spatial Navigation (10-Foot UI)**:
   - Focus any tile within the **Smart TV Spatial Navigation** section.
   - Use keyboard navigation (**Arrow Right, Left, Up, Down**).
   - Crisp 1.08x focus magnification with high-contrast outlines and zero blur glow.
4. **Input Modality Detection**:
   - Automatically detects active pointer modality (Precision Mouse/Trackpad vs Coarse Touchscreen).
5. **Toggle Unstyled Mode**:
   - Click the **"Toggle Unstyled Mode"** button to witness headless component flexibility without styling lock-in.
