# Design System — PROPIN
### Tema: Gold Dominan, Hijau sebagai Secondary
**Versi:** 1.0 — Pendamping `PRD.md`

> Catatan konteks: Mockup asli PROPIN menggunakan hijau tua sebagai warna dominan dengan gold sebagai aksen. Sesuai permintaan, sistem desain ini **membalik hierarki warna**: gold menjadi warna dominan/brand utama, hijau menjadi secondary (dipakai untuk elemen "sukses", "syariah/halal", dan status positif) — tanpa mengubah struktur informasi & layout yang sudah ada di mockup.

---

## 1. Filosofi Desain

- **Premium & Terpercaya** — gold merepresentasikan nilai aset properti (properti = emas/investasi bernilai), sekaligus kesan eksklusif ala sertifikat/kepemilikan.
- **Islami tanpa berlebihan** — nuansa syariah ditampilkan lewat elemen hijau (identik dengan Islam & pertumbuhan/growth), pola geometris halus, bukan lewat ornamen berat.
- **Transparan & Modern** — banyak white space, card berbayang lembut, data (angka Rupiah, %, token) ditampilkan besar dan jelas — ini aplikasi finansial, kepercayaan datang dari kejelasan angka.
- **Konsisten Mobile-First lalu diperluas ke Desktop** — komponen dirancang dari phone-frame mockup asli, lalu di-scale ke layout dashboard desktop.

---

## 2. Palet Warna

### 2.1 Primary — Gold
| Token | Hex | Penggunaan |
|---|---|---|
| `gold-50` | `#FBF6E9` | Background halus/section alternate |
| `gold-100` | `#F5E8C8` | Hover state ringan, badge background |
| `gold-200` | `#EAD49B` | Border dekoratif, divider aksen |
| `gold-300` | `#DDBD6E` | Icon secondary, ilustrasi |
| `gold-400` | `#CDA347` | Hover pada tombol gold |
| `gold-500` | `#C0972F` | — |
| **`gold-600`** | **`#B08A2E`** | **Primary brand — logo, CTA utama, header aktif** |
| `gold-700` | `#8E6E22` | Text di atas background terang, active state |
| `gold-800` | `#6B531A` | Teks penekanan di atas gold muda |
| `gold-900` | `#493812` | Teks gelap kontras tinggi (jarang dipakai) |

> Gunakan `gold-600` sebagai warna brand utama (setara peran hijau tua di mockup asli): header/topbar, tombol CTA primer ("Beli Token", logo PROPIN, active nav icon).

### 2.2 Secondary — Hijau (Syariah / Success / Growth)
| Token | Hex | Penggunaan |
|---|---|---|
| `green-50` | `#EAF6EF` | Background badge "Verified Syariah" |
| `green-100` | `#CDEBD9` | Progress bar track terisi (lembut) |
| `green-300` | `#7FC79E` | Icon outline sukses |
| **`green-600`** | **`#1F8A55`** | **Secondary utama — checkmark, badge "Verified", status "Executed", progress bar aktif, tombol sekunder** |
| `green-700` | `#166B41` | Hover pada elemen hijau |
| `green-800` | `#0F4D2E` | Teks pada badge hijau muda |

### 2.3 Netral
| Token | Hex | Penggunaan |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Background utama card/page |
| `neutral-50` | `#FAF9F6` | Background app (warm off-white, selaras gold) |
| `neutral-100` | `#F1EFE9` | Card alternate, input background |
| `neutral-200` | `#E4E0D6` | Border default |
| `neutral-400` | `#9C9587` | Placeholder text, icon inactive |
| `neutral-600` | `#635C4E` | Body text secondary |
| `neutral-800` | `#332F26` | Heading / body text utama |
| `neutral-900` | `#1E1B15` | Teks paling gelap (jarang, untuk kontras maksimal) |

### 2.4 Warna Semantik
| Status | Warna | Catatan |
|---|---|---|
| Success / Executed / Verified | `green-600` | Sesuai peran syariah/kepercayaan |
| Warning / Wajib Zakat | `gold-600` atau `#C67C1E` (amber) | Selaras keluarga gold, tidak pakai merah agar tetap premium |
| Error / Gagal | `#C0392B` (merah bata muted) | Dipakai sangat jarang, hanya untuk error state |
| Info | `#2E6F9E` (biru muted) | Untuk tooltip/info non-transaksional saja |

### 2.5 Gradasi (untuk Hero Card / Portfolio Card)
- **Gold Premium Gradient:** `linear-gradient(135deg, #C0972F 0%, #8E6E22 100%)` — dipakai pada card "Total Portfolio" di Dashboard, dan Sertifikat Kepemilikan.
- **Hijau Soft Gradient (opsional untuk Impact Dashboard):** `linear-gradient(135deg, #1F8A55 0%, #0F4D2E 100%)` — dipakai terbatas, misalnya pada badge skor Maqashid Impact.

### 2.6 Aturan Rasio Penggunaan (60-30-10 disesuaikan)
- **60% Netral** (`neutral-50`, `neutral-0`, `neutral-800` untuk teks) — dasar layout, card, teks body.
- **30% Gold** — elemen brand: header, CTA utama, active nav, ikon utama, border aksen premium.
- **10% Hijau** — status, checkmark, badge syariah, progress bar sukses. Hijau **tidak** dipakai sebagai warna dominan layout, hanya sebagai penanda makna (semantic), agar identitas gold tetap terasa kuat.

> ⚠️ Perhatian kontras: gold-600 di atas putih memiliki rasio kontras cukup, tapi untuk teks kecil sebaiknya gunakan `gold-700`/`gold-800` agar tetap WCAG AA compliant. Jangan gunakan `gold-300`/`gold-400` untuk teks pada background putih.

---

## 3. Tipografi

| Elemen | Font | Berat | Ukuran (Mobile / Desktop) |
|---|---|---|---|
| Brand / Logo wordmark | `Playfair Display` (serif elegan) atau `Fraunces` | 700 | 20px / 28px |
| Heading H1 (Landing) | `Plus Jakarta Sans` / `Inter` | 700 | 28px / 44px |
| Heading H2 (Section title) | sama | 700 | 20px / 28px |
| Heading H3 (Card title) | sama | 600 | 16px / 18px |
| Body text | `Inter` | 400–500 | 14px / 16px |
| Angka besar (nilai Rupiah, %) | `Inter` / `IBM Plex Mono` (opsional utk kesan "data") | 700 | 22–28px / 32–40px |
| Caption/label kecil | `Inter` | 500 | 11–12px / 12–13px |

**Prinsip:** gunakan font serif **hanya** untuk logo/wordmark "PROPIN" (kesan heritage/trust, mirip identitas bank/emas), sisanya sans-serif modern agar tetap mudah dibaca di layar kecil.

---

## 4. Spacing & Grid

- **Base unit:** 4px (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`).
- **Card padding:** 16px (mobile), 24px (desktop).
- **Border radius:**
  - Card: `16px` (rounded-2xl)
  - Button: `12px` (rounded-xl)
  - Badge/pill: `9999px` (full round)
  - Input field: `12px`
- **Grid Desktop:**
  - Marketplace/Property list: 3 kolom (`lg:grid-cols-3`), 2 kolom di tablet.
  - Dashboard: sidebar 240px fixed + content area max-width 1200px.
- **Grid Mobile:** single column, max-width mengikuti viewport, horizontal padding 16px.

---

## 5. Komponen UI

### 5.1 Button
| Varian | Style |
|---|---|
| Primary | Background `gold-600`, teks putih, hover `gold-700`, shadow lembut gold (`shadow: 0 4px 12px rgba(176,138,46,0.25)`) |
| Secondary (aksi hijau, mis. "Verifikasi") | Background `green-600`, teks putih, hover `green-700` |
| Outline | Border `gold-600` 1.5px, teks `gold-700`, background transparan |
| Ghost/Text | Teks `neutral-600`, hover teks `gold-600` |
| Disabled | Background `neutral-200`, teks `neutral-400` |

### 5.2 Card
- Background `neutral-0`, border `1px solid neutral-200`, radius `16px`, shadow: `0 2px 8px rgba(30,27,21,0.06)`.
- Card highlight/premium (Total Portfolio, Sertifikat): pakai Gold Gradient background + teks putih.

### 5.3 Badge / Status Pill
| Badge | Background | Teks |
|---|---|---|
| Verified Syariah | `green-50` | `green-700` + icon check hijau |
| Executed / Completed | `green-50` | `green-700` |
| Wajib Zakat | `gold-100` | `gold-800` |
| Risiko Rendah/Sedang | `neutral-100` | `neutral-600` |

### 5.4 Progress Bar
- Track: `neutral-200`
- Fill (pendanaan properti, nisab zakat, dsb.): `green-600`
- Fill (skor impact/kinerja khusus gold): boleh gunakan `gold-600` bila konteksnya "milik investor" bukan status syariah — jaga konsistensi: **hijau = status/kepatuhan, gold = nilai finansial investor.**

### 5.5 Bottom Navigation (Mobile)
- Background `neutral-0`, border-top `1px neutral-200`, height 64px, fixed bottom, shadow ke atas tipis.
- Icon inactive: `neutral-400`. Icon + label active: `gold-600`, dengan indikator dot/underline gold kecil di atas icon.

### 5.6 Sidebar (Desktop)
- Background `neutral-0` atau `neutral-50`, lebar 240px, border-right `1px neutral-200`.
- Item aktif: background `gold-50`, teks & icon `gold-700`, left-border accent 3px `gold-600`.
- Logo PROPIN di atas sidebar, font serif + icon rumah gold.

### 5.7 Chart (Recharts)
- Line kinerja portofolio: stroke `gold-600`, area fill gradient gold opacity rendah (`gold-600` → transparent).
- Bar/metric chart di Impact Dashboard: gunakan `green-600` untuk metrik "positif/dampak", `gold-600` untuk metrik finansial.

### 5.8 Chat Bubble (AI Assistant)
- Bubble AI: background `neutral-100`, teks `neutral-800`, avatar bulat gold-outline dengan icon AI.
- Bubble user: background `gold-600`, teks putih, rata kanan.

### 5.9 Timeline (Smart Contract Detail)
- Titik/step: lingkaran kecil, terisi `green-600` dengan checkmark putih saat selesai, outline `neutral-300` saat belum aktif.
- Garis penghubung vertikal: `neutral-200`, berubah `green-600` progresif seiring animasi step selesai.

### 5.10 Sertifikat/NFT Card
- Border ornamen ganda tipis warna gold (`gold-300` luar, `gold-600` dalam), background `neutral-0` dengan watermark logo PROPIN transparan tipis di tengah.
- QR Code area: dibingkai kotak gold-50 dengan border gold-200.

---

## 6. Ikonografi

- Gunakan **outline icon style** (bukan filled) konsisten seperti pada mockup asli — misal set `lucide-react`.
- Warna icon default: `neutral-600` (inactive), `gold-600` (active/brand), `green-600` (status sukses).
- Ikon kategori properti (Apartemen/Vila/Hotel) bisa pakai badge bulat kecil background `gold-50` dengan icon `gold-600` di dalamnya.

---

## 7. Layout Pattern

### 7.1 Mobile
- Struktur meniru phone-frame mockup asli: status bar dekoratif opsional (untuk keperluan showcase), header app di atas, konten scrollable, bottom nav fixed.
- Satu fokus per layar — hindari multi-panel.

### 7.2 Desktop
- Layout dashboard klasik: Sidebar (kiri) + Topbar (search/profile) + Content area.
- Content area dapat memakai **grid 2–3 kolom** untuk card-card ringkasan (mis. Dashboard: Portfolio card besar di kiri, ringkasan aset & chart di kanan).
- Untuk halaman yang di mobile berbentuk "full-screen flow" (Detail Transaksi, AI Assistant), di desktop bisa ditampilkan sebagai **panel/modal di atas dashboard** agar konteks sidebar tetap terlihat — memberi kesan aplikasi web penuh, bukan sekadar phone mockup yang di-stretch.

### 7.3 Landing Page (Marketing)
- Hero: 2 kolom di desktop (teks kiri, ilustrasi rumah kanan — sesuai mockup asli), stack vertikal di mobile.
- Section "Keunggulan PROPIN": grid 5 kartu → `lg:grid-cols-5` desktop, `grid-cols-1` mobile (atau 2 kolom di tablet).
- Section "Alur Investasi": stepper horizontal dengan connector line gold-dotted di desktop, vertical stepper di mobile.

---

## 8. Motion & Interaksi

- **Transisi halaman:** fade + slide-up halus (200–250ms, ease-out).
- **Step animasi Smart Contract:** tiap step timeline muncul berurutan (stagger 400–500ms), disertai checkmark "pop" scale-in kecil.
- **Loading transaksi:** spinner/skeleton gold-tone (bukan generic gray) selama ~1.2–1.8 detik sebelum menampilkan hasil.
- **Hover card (desktop):** translateY(-2px) + shadow membesar halus.
- **Micro-interaction angka:** count-up animation untuk nilai Rupiah besar di Dashboard/Portfolio saat pertama render (opsional, menambah kesan "hidup").

---

## 9. Aksesibilitas & Kontras

- Body text di atas `neutral-50`/`neutral-0`: gunakan `neutral-800` (kontras tinggi).
- Teks di atas `gold-600`: gunakan putih (`#FFFFFF`), bukan neutral-800.
- Teks di atas `green-600`: gunakan putih.
- Jangan pernah menempatkan teks gold-400/500 di atas background putih untuk teks berukuran kecil (<14px) — hanya untuk elemen dekoratif besar.
- Target ukuran tap area minimum 44x44px untuk semua tombol/nav item mobile.

---

## 10. Tailwind Config Reference (siap pakai)

```js
// tailwind.config.js (potongan theme.extend.colors)
colors: {
  gold: {
    50: '#FBF6E9',
    100: '#F5E8C8',
    200: '#EAD49B',
    300: '#DDBD6E',
    400: '#CDA347',
    500: '#C0972F',
    600: '#B08A2E', // primary
    700: '#8E6E22',
    800: '#6B531A',
    900: '#493812',
  },
  green: {
    50: '#EAF6EF',
    100: '#CDEBD9',
    300: '#7FC79E',
    600: '#1F8A55', // secondary
    700: '#166B41',
    800: '#0F4D2E',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FAF9F6',
    100: '#F1EFE9',
    200: '#E4E0D6',
    400: '#9C9587',
    600: '#635C4E',
    800: '#332F26',
    900: '#1E1B15',
  },
}
```

---

*Dokumen ini digunakan bersama `PRD.md` sebagai acuan sebelum implementasi komponen React dimulai.*
