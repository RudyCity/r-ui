# r-ui: Component Anatomy & Interaction Specifications (v1.8.0)

Spesifikasi komponen modular berskala produksi. **Visual-first**, bebas dari penjelasan berlebih, bebas dari shadow keruh pekat, dan bebas dari efek neon/glow. 100% menggunakan token `--r-ui-*`.

---

## 1. Action Button System

Tombol interaktif dengan respons fisik pegas alami (*tactile spring physics*), state aksesibel, dan zero-neon.

```css
.r-ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--r-ui-space-2);
  padding: var(--r-ui-space-2) var(--r-ui-space-4);
  min-height: 44px; /* Standar aksesibilitas sentuh */
  font-family: inherit;
  font-size: var(--r-ui-font-body);
  font-weight: 500;
  line-height: 1;
  border-radius: var(--r-ui-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              background-color var(--r-ui-duration-fast) ease,
              border-color var(--r-ui-duration-fast) ease,
              box-shadow var(--r-ui-duration-fast) ease;
}

/* Crisp focus ring tanpa blur neon */
.r-ui-btn:focus-visible {
  outline: var(--r-ui-focus-outline);
  outline-offset: var(--r-ui-focus-offset);
}

.r-ui-btn:active {
  transform: scale(0.97); /* Tactile tap-down */
}

/* Primary Button */
.r-ui-btn-primary {
  background-color: var(--r-ui-color-accent-primary);
  color: var(--r-ui-color-text-inverse);
  box-shadow: var(--r-ui-shadow-xs);
}

@media (hover: hover) and (pointer: fine) {
  .r-ui-btn-primary:hover {
    background-color: var(--r-ui-color-accent-primary-hover);
    box-shadow: var(--r-ui-shadow-sm); /* Subtle ambient elevation, NO neon glow */
  }
}

/* Secondary Button */
.r-ui-btn-secondary {
  background-color: var(--r-ui-color-surface-elevated);
  border-color: var(--r-ui-color-border-standard);
  color: var(--r-ui-color-text-primary);
}

@media (hover: hover) and (pointer: fine) {
  .r-ui-btn-secondary:hover {
    border-color: var(--r-ui-color-border-strong);
    background-color: var(--r-ui-color-surface-overlay);
  }
}
```

---

## 2. Accessible Form Input Field

Input teks dengan kontras tinggi, state validasi visual yang jelas, dan outline fokus presisi.

```css
.r-ui-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--r-ui-space-1);
}

.r-ui-label {
  font-size: var(--r-ui-font-small);
  font-weight: 500;
  color: var(--r-ui-color-text-secondary);
}

.r-ui-input {
  width: 100%;
  min-height: 44px;
  padding: var(--r-ui-space-2) var(--r-ui-space-3);
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-sm);
  color: var(--r-ui-color-text-primary);
  font-size: var(--r-ui-font-body);
  transition: border-color var(--r-ui-duration-fast) ease,
              outline var(--r-ui-duration-fast) ease;
}

/* Crisp focus outline tanpa glow blur */
.r-ui-input:focus {
  outline: var(--r-ui-focus-outline);
  outline-offset: 1px;
  border-color: var(--r-ui-color-accent-primary);
}

.r-ui-input[aria-invalid="true"] {
  border-color: var(--r-ui-color-error);
  outline-color: var(--r-ui-color-error);
}

.r-ui-error-message {
  font-size: var(--r-ui-font-micro);
  color: var(--r-ui-color-error);
  display: flex;
  align-items: center;
  gap: var(--r-ui-space-1);
}
```

---

## 3. Asymmetric Bento Feature Card

Blok fitur modern dengan ritme asimetris, garis 1px halus, dan ambient elevation lembut.

```css
.r-ui-bento-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--r-ui-space-4);
  container-type: inline-size;
}

@container (min-width: 640px) {
  .r-ui-bento-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .r-ui-bento-hero-card {
    grid-column: span 2; /* Bobot asimetris visual */
  }
}

.r-ui-card {
  position: relative;
  background-color: var(--r-ui-color-surface);
  border: 1px solid var(--r-ui-color-border-subtle);
  border-radius: var(--r-ui-radius-lg);
  padding: var(--r-ui-space-6);
  box-shadow: var(--r-ui-shadow-xs);
  transition: border-color var(--r-ui-duration-fast) ease,
              transform var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              box-shadow var(--r-ui-duration-fast) ease;
}

@media (hover: hover) and (pointer: fine) {
  .r-ui-card:hover {
    border-color: var(--r-ui-color-border-strong);
    transform: translateY(-2px);
    box-shadow: var(--r-ui-shadow-sm); /* Subtle depth, no murky black shadow */
  }
}
```

---

## 4. Adaptive Dialog (Desktop Modal vs Mobile Bottom Sheet)

Dialog yang secara otomatis beradaptasi menjadi bottom sheet di layar ponsel.

```css
.r-ui-overlay-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(9, 10, 15, 0.6);
  backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: flex-end; /* Mobile: bottom sheet */
  justify-content: center;
}

.r-ui-modal-surface {
  width: 100%;
  max-height: 85dvh;
  background-color: var(--r-ui-color-surface-elevated);
  border-top: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-xl) var(--r-ui-radius-xl) 0 0;
  padding: var(--r-ui-space-6);
  padding-bottom: max(var(--r-ui-space-6), env(safe-area-inset-bottom));
  overflow-y: auto;
  box-shadow: var(--r-ui-shadow-md);
}

@media (min-width: 768px) {
  .r-ui-overlay-backdrop {
    align-items: center;
    padding: var(--r-ui-space-6);
  }

  .r-ui-modal-surface {
    max-width: 520px;
    border: 1px solid var(--r-ui-color-border-standard);
    border-radius: var(--r-ui-radius-lg);
    box-shadow: var(--r-ui-shadow-lg); /* Ambient subtle elevation */
    padding-bottom: var(--r-ui-space-6);
  }
}
```

---

## 5. Smart TV 10-Foot UI Spatial Card

Elemen fokus D-Pad TV: pembesaran visual 1.08x dengan outline kontras tinggi tanpa glow neon.

```css
.r-ui-tv-card {
  background-color: var(--r-ui-color-surface-elevated);
  border: 1px solid var(--r-ui-color-border-standard);
  border-radius: var(--r-ui-radius-md);
  padding: var(--r-ui-space-6);
  outline: none;
  transition: transform var(--r-ui-duration-fast) var(--r-ui-ease-spring),
              border-color var(--r-ui-duration-fast) ease,
              box-shadow var(--r-ui-duration-fast) ease;
}

.r-ui-tv-card:focus-visible,
.r-ui-tv-card.is-focused {
  transform: scale(1.08);
  border-color: var(--r-ui-color-accent-primary);
  outline: 3px solid var(--r-ui-color-focus-ring);
  outline-offset: 3px;
  box-shadow: var(--r-ui-shadow-lg);
  z-index: 10;
}
```
