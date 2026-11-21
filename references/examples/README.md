# r-ui Interactive Showcase & Playground (v1.8.0)

Playground interaktif mandiri (*zero-dependency playground*) untuk menguji kapabilitas desain dan rekayasa antarmuka pengguna `r-ui`.

---

## Cara Menjalankan

Tidak memerlukan Node.js, server, atau proses kompilasi. Buka file secara langsung di peramban:

```text
references/examples/r-ui-showcase.html
```

---

## Fitur Interaktif Visual-First

1. **Dual-Layer Theme Switcher**:
   - Pilih tema kanvas (Dark Nebula, Clean Light, Slate Obsidian, Warm Sepia, High Contrast) via dropdown pojok kanan atas.
   - Pilih palet warna aksen (8 warna terkalibrasi) via swatch lingkaran.
   - Transisi warna halus bebas kedipan (*anti-flicker*).
2. **Adaptive Modal vs Mobile Bottom-Sheet**:
   - Klik tombol **"Buka Adaptive Modal"**.
   - Pada desktop: modal berada di tengah layar dengan micro-elevation.
   - Pada layar mobile (< 768px): dialog otomatis bergeser menjadi bottom-sheet dengan safe area.
3. **Smart TV Spatial Navigation (10-Foot UI)**:
   - Arahkan fokus ke salah satu kotak di area **Smart TV Spatial Navigation**.
   - Gunakan tombol keyboard (**Panah Kanan, Panah Kiri, Panah Atas, Panah Bawah**).
   - Efek perbesaran visual 1.08x dengan outline kontras tinggi tanpa glow blur.
4. **Input Modality Detection**:
   - Mendeteksi pointer secara otomatis (Mouse/Trackpad vs Layar Sentuh).
5. **Toggle Unstyled Mode**:
   - Klik tombol **"Toggle Unstyled Mode"** untuk melihat fleksibilitas komponen headless tanpa ikatan styling kaku.
