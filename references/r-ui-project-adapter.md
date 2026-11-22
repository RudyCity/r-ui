# r-ui: Project DNA Adaptation & Flexibility Engine (v2.4.0)

An adaptive, **anti-rigid** system engineered to precisely tailor components to unique project requirements. Focused directly on **visual-first** presentation, free from wall-of-text copy, free from murky heavy shadows, and free from neon/cyberpunk clichés.

---

## 1. Visual Calibration: 4 Adaptive Dials

| Dial | Minimum Value (1) | Maximum Value (10) | Visual Impact |
|:---|:---|:---|:---|
| **1. DENSITY** | Spacious / Luxury (`p-8`, `gap-6`) | Dense / Cockpit (`p-2`, `gap-2`) | Sets information throughput per viewport |
| **2. RADIUS** | Sharp / Brutalist (`rounded-none`) | Soft / Pill (`rounded-full`) | Governs formality vs friendliness |
| **3. MOTION** | Static / Zero-Motion (`duration-0`) | Dynamic Springs (`cubic-bezier`) | Governs tactile responsiveness & micro-interactions |
| **4. CONTRAST** | Calm / Low-Contrast Editorial | Strict / High-Contrast WCAG AAA | Establishes visual hierarchy & boundary separation |

---

## 2. 5 Core Project Archetypes

| Project Archetype | Density | Radius | Motion | Visual Standards & Engineering Guide |
|:---|:---:|:---:|:---:|:---|
| **1. High-Density B2B Cockpit** *(Trading, ERP, CRM, Analytics)* | **8–9** | `4px` | **1–2** | Compact padding (`8-12px`), 13–14px body text, dense data grids, space efficiency without decorative clutter. |
| **2. Consumer Playful / Lifestyle** *(E-Commerce, Social, EdTech)* | **4–5** | `12-16px` | **7–8** | Generous whitespace (`24-32px`), cards with subtle micro-borders, tactile spring physics on touch. |
| **3. Minimalist Swiss / Editorial** *(Portfolio, Agency, Publishing)* | **3–4** | `0–2px` | **2–3** | Expansive negative space, crisp 1px borders, high-contrast display typography, elegant asymmetric layouts. |
| **4. Minimalist Precision Dark Tech** *(DevTools, AI Workbenches, Cloud)* | **7–8** | `4–6px` | **3–4** | Mature dark canvas (`#0b0f19`), crisp text (`#f9fafb`), 1px subtle borders, monospace tabular data, **zero-neon**. |
| **5. Regulated & Public Sector** *(Government, Healthcare, Legal)* | **5–6** | `6–8px` | **1–2** | High-contrast WCAG AAA, min 48px touch targets, zero-transparency, uncompromising legibility. |

---

## 3. Brand Token Override (Without Compromising Core Foundations)

Override `--r-ui-*` tokens at the project level to integrate custom brand palettes and densities:

```css
/* src/styles/project-brand-override.css */
:root {
  /* 1. Custom Brand Colors (Mature & Calibrated) */
  --r-ui-color-accent-primary: #0284c7;
  --r-ui-color-accent-primary-hover: #0369a1;
  --r-ui-color-focus-ring: #0284c7;

  /* 2. Brand Typography */
  --font-family-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-body: system-ui, -apple-system, sans-serif;

  /* 3. Project Radius & Density */
  --r-ui-radius-sm: 4px;
  --r-ui-radius-md: 8px;
  --r-ui-radius-lg: 12px;
  --r-ui-space-4: 0.75rem; /* 12px for higher density */
}
```

---

## 4. Headless & Unstyled Mode (`unstyled?: boolean`)

Strip default component styling for 100% Tailwind control without CSS class collisions:

```tsx
<Card unstyled className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
  <Card.Title className="text-xl font-bold text-slate-100">
    Precision Workbench Card
  </Card.Title>
  <Card.Body className="text-slate-400 mt-2 text-sm leading-relaxed">
    Components flex to adapt to your project's design system without rigidity.
  </Card.Body>
</Card>
```
