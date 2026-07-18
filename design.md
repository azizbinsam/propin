# Design System — PROPIN
### Tema: Gold Dominan, Hijau sebagai Secondary
**Versi:** 2.1 — Pendamping `PRD.md`

> Catatan konteks: Mockup asli PROPIN menggunakan hijau tua sebagai warna dominan dengan gold sebagai aksen. Sesuai permintaan, sistem desain ini **membalik hierarki warna**: gold menjadi warna dominan/brand utama, hijau menjadi secondary (dipakai untuk elemen "sukses", "syariah/halal", dan status positif) — tanpa mengubah struktur informasi & layout yang sudah ada di mockup.

> **Update v2.0:** Struktur layout & alur halaman kini mengacu ke referensi [halpin.vercel.app](https://halpin.vercel.app) (lihat `PRD.md` v2.0) — termasuk halaman Auth, Kalkulator Investasi, Dompet & Transaksi gabungan, AI Assistant + video edukasi, Pengaturan, dan **Admin Panel terpisah**. **Palet warna gold/hijau di Bagian 2 tidak berubah** dan berlaku untuk kedua sisi (User & Admin). Komponen & pola layout baru didokumentasikan di **Bagian 11** (baru) di akhir dokumen ini — baca Bagian 1–10 sebagai fondasi yang tetap berlaku, lalu Bagian 11 sebagai tambahan/perluasan untuk kebutuhan v2.0.

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

---

## 11. Komponen & Pola Layout Tambahan (v2.0)

Bagian ini mendokumentasikan komponen baru yang muncul akibat restrukturisasi flow mengikuti referensi HALPIN (Auth, Kalkulator Investasi, Dompet & Transaksi gabungan, AI Assistant + video edukasi, Pengaturan) dan **Admin Panel**. Semua komponen di bawah tetap memakai token warna, tipografi, spacing, dan radius dari Bagian 2–4 — tidak ada palet baru.

### 11.1 Prinsip Admin vs User

| Aspek | Sisi User | Sisi Admin |
|---|---|---|
| Kepadatan layout | Lega, card-based, banyak white space | Data-dense, tabel-sentris, padding lebih ringkas |
| Sidebar | `neutral-0`/`neutral-50`, item aktif background `gold-50` + left-border `gold-600` (lihat 5.6) | Background `neutral-900`-tint gelap **atau** tetap `neutral-0` dengan header sidebar bar solid `gold-600` (pilih salah satu saat implementasi, tapi harus konsisten) — struktur menu & urutan **berbeda total** dari sidebar User, lihat PRD 5.4 |
| Komponen utama | Card, progress bar, chart besar | Tabel, form, badge status, filter bar |
| Warna aksen | 30% gold / 10% hijau (aturan 60-30-10, lihat 2.6) | Aturan rasio sama, tapi gold dipakai lebih hemat (mis. hanya header, tombol primer, badge aktif) agar tabel data tetap mudah dipindai (scannable) |
| Navigasi mobile | Bottom nav 5 item | Tidak ada bottom nav — hamburger → drawer sidebar (desktop-first) |

> Tujuan pemisahan ini bukan membuat dua "brand" berbeda, melainkan dua *mode kerja* dari brand yang sama — seperti cockpit vs cabin pada pesawat yang sama.

### 11.2 Halaman Auth (Login/Register)

- Layout: card tunggal terpusat (max-width ±400px) di atas background `neutral-50`, opsional dengan aksen dekoratif gold-gradient di sisi kiri pada layar desktop lebar (split-screen 40/60).
- Logo PROPIN (serif wordmark) di atas form.
- Input field: border `neutral-200`, radius `12px`, focus state border `gold-600` + ring tipis `gold-100`.
- Tombol submit primer: penuh lebar, style Button Primary (Bagian 5.1).
- Link sekunder ("Belum punya akun? Daftar"): teks `gold-700`, underline on hover.
- Toast sukses login: background `green-50`, teks `green-700`, ikon check.
- Error validasi field: border input jadi `#C0392B` (error, Bagian 2.4), teks bantuan kecil di bawah field warna sama.

### 11.3 Kalkulator Investasi (Landing Page)

- Container: Card besar (Bagian 5.2) dengan sedikit elevasi lebih tinggi dari card biasa (`shadow: 0 4px 16px rgba(30,27,21,0.08)`) agar terasa sebagai "tool" interaktif, bukan sekadar info.
- Layout 2 kolom di desktop (kiri: form input, kanan: hasil proyeksi), stack vertikal di mobile.
- Dropdown "Pilih Properti": style Select standar (11.6), menampilkan nama + ERY di tiap opsi.
- Input nominal: input besar dengan prefix "Rp", font angka `IBM Plex Mono`/`Inter` 700 sesuai Bagian 3, live-update label "= X.XXX Token" di bawahnya dalam warna `gold-700`.
- Tab pill jangka waktu (1/3/5 Tahun): pill radius `9999px`, state aktif background `gold-600` teks putih, inactive background `neutral-100` teks `neutral-600`.
- 4 card hasil proyeksi (grid 2×2 mobile, 4 kolom desktop): tiap card icon bulat kecil (background `gold-50` atau `green-50` tergantung makna — Estimasi Imbal Hasil & Total Aset pakai aksen gold, Auto Zakat & Pendapatan Bersih pakai aksen hijau sesuai aturan "hijau = status/kepatuhan, gold = nilai finansial" di 5.4), label kecil di atas, nominal besar di bawah, sub-caption tipis.
- Disclaimer di bawah kalkulator: teks `neutral-400`, ukuran caption (11–12px), ikon ⚠️ kecil.

### 11.4 Dompet & Transaksi — Komponen Khusus

- **Chart Pertumbuhan Saldo:** Recharts area/line chart, stroke `gold-600`, area fill gradient gold opacity rendah (selaras Bagian 5.7). Toggle periode (`24H` `7D` `1M` `1Y`) sebagai tab pill kecil di kanan atas chart, gaya sama seperti tab pill Kalkulator.
- **Riwayat Transaksi — item list:** ikon arah dalam lingkaran kecil (masuk: background `green-50` icon `green-600` panah ↙; keluar: background `gold-50` icon `gold-700` panah ↗), judul transaksi + sub-label (properti/lembaga terkait) di kiri, nominal + tanggal rata kanan.
- **Rekening Bank card:** card kecil horizontal, icon bank dalam kotak radius `12px` background `neutral-100`, nomor rekening tersamar (`****5678`) + nama pemilik.

### 11.5 Auto Zakat — Mini Dashboard Emas & Nisab

- Card terpisah di bawah breakdown zakat per properti.
- Header dengan icon 🥇 dalam badge bulat `gold-100`.
- 3 metric ringkas berjajar: Harga Saat Ini (+ indikator naik/turun kecil, hijau untuk naik/positif secara nilai, merah-muted `#C0392B` hanya jika turun — dipakai sangat jarang sesuai Bagian 2.4), Nisab (85gr), Status Nisab Anda (badge hijau "Terpenuhi ✓" atau badge netral "Belum Terpenuhi").
- Mini chart tren harga emas: line chart tipis, stroke `gold-500`, tanpa area fill (biar ringan secara visual, membedakan dari chart utama saldo), toggle periode `1B` `3B` `6B` `1T` sama seperti pola tab pill lainnya.
- Disclaimer sumber data: caption kecil `neutral-400`.

### 11.6 Form Components (Pengaturan, Auth, Form Admin)

| Komponen | Style |
|---|---|
| Input text | Height 44px, padding 12px, border `neutral-200` 1px, radius `12px`, placeholder `neutral-400`, focus border `gold-600` + ring `gold-100` 3px |
| Select/Dropdown | Sama seperti Input, chevron icon `neutral-600` di kanan, opsi terpilih highlight background `gold-50` |
| Textarea | Sama seperti Input, min-height 96px |
| Checkbox | 18×18px, radius `4px`, unchecked border `neutral-300`, checked background `gold-600` dengan check putih |
| Toggle/Switch (mis. 2FA) | Track `neutral-200` (off) / `green-600` (on), thumb putih, transisi 150ms |
| Upload foto profil | Lingkaran/kotak radius `16px` dengan border dashed `neutral-300`, icon kamera `neutral-400`, preview menggantikan placeholder setelah upload lokal |
| Label field | `neutral-600`, 12–13px, medium weight, margin-bottom 6px |
| Helper/error text | 11–12px, `neutral-400` (helper) atau `#C0392B` (error) |

### 11.7 Filter Chip / Tab Pill (Marketplace, Kalkulator, Toggle Periode)

- Radius penuh (`9999px`), padding horizontal 14–16px, height ±36px.
- State default: background `neutral-100`, teks `neutral-600`.
- State aktif: background `gold-600`, teks putih, sedikit shadow gold lembut.
- Scroll horizontal di mobile tanpa scrollbar terlihat (`overflow-x-auto` + hide scrollbar), spacing antar chip 8px.

### 11.8 AI Assistant — Video Edukasi Card

- Card kecil horizontal atau grid 2 kolom (mobile) / list (desktop panel chat sempit).
- Thumbnail radius `12px` dengan overlay ikon play (lingkaran putih semi-transparan, icon `▶` gold di tengah saat hover/desktop).
- Badge status pojok kiri-atas thumbnail: `POPULER` (background `gold-600`), `BARU` (background `green-600`), `SELESAI` (background `neutral-400`) — teks putih, ukuran mini (10px), radius `6px`.
- Judul video 2 baris max (truncate), sub-caption: sumber · durasi · level (badge kecil outline sesuai level: Pemula `green-300` outline, Menengah `gold-300` outline, Lanjutan `neutral-400` outline).

### 11.9 Admin Panel — Tabel Data

- Header tabel: background `neutral-50`, teks `neutral-600` uppercase kecil (11px), letter-spacing sedikit lebar.
- Baris: border-bottom `neutral-200` 1px, hover background `gold-50` tipis (opacity rendah) untuk menandakan baris interaktif.
- Sel status: pakai Badge/Status Pill (Bagian 5.3) — mis. KYC `Menunggu` (background `gold-100`, teks `gold-800`), `Terverifikasi` (background `green-50`, teks `green-700`), `Ditolak` (background `neutral-100`, teks `#C0392B`).
- Aksi per-baris: ikon outline kecil (`neutral-600`, hover `gold-600`) — Edit (pensil), Lihat (mata), Nonaktifkan (toggle).
- Pagination bawah tabel: teks `neutral-600`, halaman aktif `gold-600` bold.
- Toolbar tabel (search + filter + tombol "+ Tambah"): search input style 11.6, tombol "+ Tambah" = Button Primary.

### 11.10 Admin Panel — Sidebar

- Struktur berbeda total dari sidebar User (lihat PRD Bagian 5.4): 6 item (Dashboard Admin, Manajemen Properti, Manajemen Investor, Monitoring Transaksi, Monitoring Auto Zakat, Pengaturan Admin), tanpa grup marketing/landing.
- Header sidebar: logo PROPIN + label kecil "Admin Panel" (badge `gold-100` teks `gold-800`) untuk membedakan tegas dari sisi User saat screenshot/demo berdampingan.
- Item aktif: sama polanya dengan sidebar User (background `gold-50`, left-border `gold-600`) — konsistensi brand tetap dijaga meski struktur menu berbeda.
- Lebar 240px sama seperti sidebar User, agar komponen `Sidebar` dasar bisa direuse dengan config data menu berbeda (bukan komponen terpisah dari nol).

### 11.11 Empty State, Error State, & Skeleton Loading

Dirujuk dari `PRD.md` Bagian 15 (Matriks State Kosong/Error/Edge Case). Pola visual berikut wajib dipakai konsisten di seluruh modul agar prototype tidak terasa "kosong tanpa penjelasan" saat didemokan.

**Empty State (generik):**
- Container center-aligned, padding vertikal besar (48–64px) di dalam Card/tabel.
- Ikon outline besar (48–64px) warna `neutral-300` — bukan warna brand, agar tidak terkesan seperti elemen aktif.
- Judul singkat `neutral-600` (14–16px, medium), sub-caption opsional `neutral-400` (12–13px).
- CTA opsional di bawahnya: Button Outline (bukan Primary) — empty state bukan aksi utama halaman, jadi tidak boleh terlalu menonjol.

**Error State (inline, per-field):**
- Border input berubah ke warna Error (`#C0392B`, Bagian 2.4), tanpa mengubah radius/ukuran.
- Teks error 11–12px warna sama, muncul tepat di bawah field dengan margin-top 4px.
- Ikon kecil (!) opsional di kanan input.
- **Jangan** memakai warna merah untuk apa pun selain error sungguhan — konsisten dengan aturan "Error dipakai sangat jarang" di Bagian 2.4.

**Error State (level halaman/aksi, mis. sertifikat tidak ditemukan):**
- Toast singkat (bukan full-page error) — background `neutral-800`, teks putih, radius `12px`, muncul dari atas atau bawah tergantung platform, auto-dismiss ±3 detik.
- Disertai redirect otomatis ke halaman aman terdekat (lihat PRD 5.5 & 15 untuk daftar redirect per skenario).

**Skeleton Loading (tabel Admin, chart, list panjang):**
- Bentuk skeleton mengikuti bentuk asli konten (baris tabel, card, baris chart) — bukan spinner generik penuh layar.
- Warna: `neutral-100` sebagai base, animasi shimmer halus ke `neutral-200` (durasi ±1.2s, loop, ease-in-out) — selaras catatan "loading transaksi gold-tone" di Bagian 8, tapi skeleton tabel/list memakai nuansa netral (bukan gold) agar tidak bersaing secara visual dengan elemen brand.
- Durasi tampil skeleton mengikuti simulasi delay yang relevan (mis. ~800ms untuk submit auth, ~1.2–1.8s untuk transaksi sesuai Bagian 8).

**Toast Konfirmasi Aksi Dummy (Top Up, Withdraw, Unduh Laporan, dsb.):**
- Style sama dengan toast sukses (background `green-50`, teks `green-700`, ikon check) tapi copy eksplisit menyebut simulasi, mis. "Fitur simulasi — tidak memproses dana sungguhan." Tidak menggunakan warna error/warning untuk ini, karena bukan kegagalan, hanya batasan prototype.

### 11.12 Motion Tambahan

- **Kalkulator:** count-up animation pada 4 angka hasil setiap input berubah (durasi singkat ±300ms, ease-out), agar terasa "hidup" tanpa mengganggu saat user mengetik cepat (debounce ±200ms sebelum animasi jalan).
- **Toggle periode chart** (24H/7D/1M/1Y, 1B/3B/6B/1T): transisi data chart pakai fade+redraw halus (Recharts default animation, ~300ms), bukan reload instan.
- **Approve/Reject KYC (Admin):** badge status berubah dengan micro-transition warna (150ms) + toast konfirmasi slide-in dari kanan atas.

---

*Dokumen ini digunakan bersama `PRD.md` sebagai acuan sebelum implementasi komponen React dimulai.*
