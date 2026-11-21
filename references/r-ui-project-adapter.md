# r-ui: Project DNA Adaptation & Flexibility Engine (v1.8.0)

Sistem adaptif **anti-kaku (*anti-rigid*)** yang menyesuaikan komponen secara presisi dengan kebutuhan unik proyek. Berfokus langsung pada visual (*visual-first*), bebas dari dinding teks berlebih, bebas dari shadow keruh/tebal, dan bebas dari klise neon/cyberpunk.

---

## 1. Visual Calibration: 4 Adaptive Dials

| Dial | Nilai Minimal (1) | Nilai Maksimal (10) | Dampak Visual |
|:---|:---|:---|:---|
| **1. DENSITY** | Renggang / Luxury (`p-8`, `gap-6`) | Padat / Cockpit (`p-2`, `gap-2`) | Menentukan kepadatan data per layar |
| **2. RADIUS** | Sharp / Brutalist (`rounded-none`) | Soft / Pill (`rounded-full`) | Menentukan formalitas vs keramahan |
| **3. MOTION** | Statis / Zero-Motion (`duration-0`) | Pegas Dinamis (`cubic-bezier`) | Responsivitas haptic & micro-interaction |
| **4. CONTRAST** | Tenang / Low-Contrast Editorial | Tegas / High-Contrast WCAG AAA | Hierarki visual teks & batas elemen |

---

## 2. 5 Core Project Archetypes

| Arketipe Proyek | Density | Radius | Motion | Standar Visual & Panduan Rekayasa |
|:---|:---:|:---:|:---:|:---|
| **1. High-Density B2B Cockpit** *(Trading, ERP, CRM, Analytics)* | **8–9** | `4px` | **1–2** | Padding ringkas (`8-12px`), font 13–14px, tabel data padat, fokus pada efisiensi ruang tanpa dekorasi berlebih. |
| **2. Consumer Playful / Lifestyle** *(E-Commerce, Social, EdTech)* | **4–5** | `12-16px` | **7–8** | Spasi lega (`24-32px`), kartu dengan micro-border halus, mikro-interaksi pegas saat disentuh. |
| **3. Minimalist Swiss / Editorial** *(Portfolio, Agency, Publishing)* | **3–4** | `0–2px` | **2–3** | Ruang negatif luas, border 1px tegas, kontras tipografi display tinggi, layout asimetris elegan. |
| **4. Minimalist Precision Dark Tech** *(DevTools, AI Workbenches, Cloud)* | **7–8** | `4–6px` | **3–4** | Kanvas gelap matang (`#0b0f19`), teks tajam (`#f9fafb`), border 1px halus, tipografi monospaced presisi untuk data, **zero-neon**. |
| **5. Regulated & Public Sector** *(Layanan Publik, Medis, Legal)* | **5–6** | `6–8px` | **1–2** | Kontras tinggi WCAG AAA, target sentuh min 48px, zero-transparency, keterbacaan mutlak. |

---

## 3. Brand Token Override (Tanpa Merusak Inti)

Override token `--r-ui-*` di tingkat proyek untuk menyesuaikan palet merek dan densitas:

```css
/* src/styles/project-brand-override.css */
:root {
  /* 1. Warna Brand Kustom (Matang & Calibrated) */
  --r-ui-color-accent-primary: #0284c7;
  --r-ui-color-accent-primary-hover: #0369a1;
  --r-ui-color-focus-ring: #0284c7;

  /* 2. Tipografi Merek */
  --font-family-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-body: system-ui, -apple-system, sans-serif;

  /* 3. Radius & Densitas Proyek */
  --r-ui-radius-sm: 4px;
  --r-ui-radius-md: 8px;
  --r-ui-radius-lg: 12px;
  --r-ui-space-4: 0.75rem; /* 12px untuk densitas lebih tinggi */
}
```

---

## 4. Headless & Unstyled Mode (`unstyled?: boolean`)

Lepas gaya bawaan komponen untuk kontrol styling 100% menggunakan Tailwind tanpa bentrok kelas CSS:

```tsx
<Card unstyled className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
  <Card.Title className="text-xl font-bold text-slate-100">
    Precision Workbench Card
  </Card.Title>
  <Card.Body className="text-slate-400 mt-2 text-sm leading-relaxed">
    Komponen fleksibel mengikuti sistem styling proyek Anda tanpa terasa kaku.
  </Card.Body>
</Card>
```
