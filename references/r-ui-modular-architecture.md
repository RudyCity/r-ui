# r-ui: Modular Component Architecture & Consistency Engine

Panduan tata kelola arsitektur komponen modular (*Atomic & Compound Component System*) untuk menjamin konsistensi visual dan interaksi 100% di seluruh fitur dan halaman aplikasi.

---

## 1. The 5-Tier Modular Atomic Hierarchy

Setiap elemen antarmuka dalam ekosistem `r-ui` dikelompokkan ke dalam 5 tingkatan terstruktur:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      r-ui MODULAR ATOMIC HIERARCHY                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Layer 1: DESIGN TOKENS   ──► r-ui-tokens.css (--r-ui-* variables)          │
│  Layer 2: ATOMS           ──► Button, Input, Badge, Avatar, IconBox, Text   │
│  Layer 3: MOLECULES       ──► FieldGroup, SearchBar, StatCard, ToastItem    │
│  Layer 4: ORGANISMS       ──► Navbar, BentoGrid, AdaptiveModal, DataSheet   │
│  Layer 5: TEMPLATES/VIEWS ──► DashboardView, OnboardingFlow, SettingsPage   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Aturan Tingkatan:
1. **Layer 1: Design Tokens**: Fondasi variabel murni (Warna, Spasi 4pt/8pt, Radius, Tipografi, Easing). Dilarang menulis nilai CSS tanpa merujuk ke token ini.
2. **Layer 2: Atoms**: Komponen murni terkecil yang tidak dapat dipecah lagi tanpa kehilangan fungsinya. Tidak memiliki ketergantungan logika bisnis (*state-agnostic*).
3. **Layer 3: Molecules**: Kombinasi dari 2 atau lebih Atom yang bekerja bersama (contoh: Label + Input + ErrorMessage = `FieldGroup`).
4. **Layer 4: Organisms**: Blok antarmuka mandiri yang kompleks (contoh: Header navigasi lengkap dengan logo, menu items, profil avatar, dan command trigger).
5. **Layer 5: Templates/Views**: Halaman utuh yang menyusun Organisms menjadi alur pengalaman pengguna yang lengkap.

---

## 2. The 4 Iron Laws of Component Consistency

Untuk mencegah fragmentasi desain saat proyek dikembangkan secara berkelanjutan:

### Hukum 1: Zero Magic Numbers (Larangan Nilai Acak)
- ❌ **Dilarang**: Menulis `padding: 13px`, `margin: 27px`, `color: #4a5b6c`, atau `transition: 0.25s ease`.
- ✅ **Wajib**: Menggunakan token terdaftar: `padding: var(--r-ui-space-3)`, `color: var(--r-ui-color-text-secondary)`, `transition: var(--r-ui-duration-fast) var(--r-ui-ease-spring)`.

### Hukum 2: Uniform Prop Signatures (Kontrak Properti Seragam)
Semua komponen yang berstatus Atom maupun Molecule wajib mematuhi standar nama prop yang identik:
- **`variant`**: Menentukan hierarki visual (`primary`, `secondary`, `ghost`, `destructive`, `outline`).
- **`size`**: Menentukan skala dimensi (`sm`, `md`, `lg`).
- **`intent`**: Menentukan pesan semantik (`default`, `info`, `success`, `warning`, `error`).
- **`state`**: Menentukan kondisi interaktivitas (`idle`, `loading`, `disabled`).

### Hukum 3: Composition Over Boolean Props Explosion
Hindari membuat satu komponen raksasa dengan puluhan boolean prop (`hasIcon`, `isLeftIcon`, `isSearch`, `withBorder`).
- Gunakan pola **Slot** atau **Compound Components**:
  ```tsx
  // ✅ Pola Modular yang Dianjurkan
  <FieldGroup>
    <FieldGroup.Label>Email</FieldGroup.Label>
    <FieldGroup.Input type="email" placeholder="nama@perusahaan.com" />
    <FieldGroup.Hint>Kami tidak akan membagikan email Anda.</FieldGroup.Hint>
  </FieldGroup>
  ```

### Hukum 4: Headless Logic & Presentation Separation
Pisahkan state interaksi (seperti terbuka/tertutupnya modal, navigasi tab, atau pencarian) dari styling visual, sehingga komponen dapat digunakan ulang (*reusable*) di web, desktop, maupun mobile tanpa menulis ulang logika.

---

## 3. Reusable Component Checklist

Sebelum sebuah komponen dideklarasikan siap pakai dalam pustaka tim:
- [ ] 1. **Token Compliance**: 100% properti CSS merujuk pada token `--r-ui-*`.
- [ ] 2. **Theme Agnostic**: Tampilan otomatis beradaptasi saat tema diganti via `[data-r-ui-theme]`.
- [ ] 3. **Accessibility**: Memiliki atribut ARIA yang tepat (`aria-expanded`, `aria-selected`, `aria-invalid`).
- [ ] 4. **Keyboard & D-Pad Friendly**: Dapat diakses dengan tombol `Tab`, `Enter`, `Space`, dan tombol panah.
- [ ] 5. **Touch Ergonomics**: Hit-box sentuh di mobile minimal 44px–48px.
- [ ] 6. **Reduced Motion**: Mematikan animasi jika pengguna mengaktifkan `prefers-reduced-motion`.
