# PRD — PROPIN (Prototype)
### Platform Tokenisasi Properti Syariah Berbasis Blockchain & AI
**Versi:** 1.1 — Prototype Only (No Real Backend), Local Development First
**Tanggal:** 15 Juli 2026
**Tipe Dokumen:** Product Requirements Document untuk kebutuhan prototyping frontend (React)
**Repository:** [github.com/azizbinsam/propin](https://github.com/azizbinsam/propin)
**Target Deployment:** Vercel (auto-deploy dari branch `main`)

### Changelog
| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 14 Jul 2026 | Draft awal PRD & scope prototype |
| 1.1 | 15 Jul 2026 | Menetapkan **Tailwind CSS v3** (bukan v4) sebagai styling engine, menambahkan alur kerja **local development → GitHub → Vercel**, dan memecah rencana pengerjaan menjadi **Part-based delivery** (lihat Bagian 11) agar proses build tidak berantakan dan bisa dicek satu-satu |

---

## 1. Ringkasan Produk

PROPIN adalah platform investasi properti syariah yang mengubah aset properti fisik menjadi **token digital** di atas blockchain, memungkinkan kepemilikan fraksional mulai dari nominal kecil (Rp100.000). Platform ini dilengkapi AI Assistant untuk edukasi & rekomendasi investasi, serta fitur Auto-Zakat untuk kepatuhan syariah otomatis.

**Tagline:** *"Satu Token, Satu Kepemilikan"*

### 1.1 Tujuan Dokumen
Dokumen ini mendefinisikan scope, struktur, dan spesifikasi UI/UX untuk membangun **prototype interaktif** (bukan produk produksi) menggunakan React, yang bisa didemokan di desktop maupun mobile, dengan seluruh data bersifat **dummy/mock** (tanpa backend, tanpa koneksi blockchain nyata, tanpa autentikasi nyata).

### 1.2 Tujuan Prototype
- Memvisualisasikan seluruh user journey investasi tokenisasi properti syariah dari ujung ke ujung.
- Menjadi materi pitching/demo ke calon klien, investor, atau mitra syariah (BAZNAS, dsb).
- Menjadi basis validasi UX sebelum development sistem produksi (real backend, real blockchain integration).
- Responsive penuh: tampil natural di desktop (layout dashboard/multi-kolom) dan di mobile (layout single-column ala native app, sesuai mockup asli yang berbentuk phone frame).

---

## 2. Target Pengguna (Persona)

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Investor Pemula Muslim** | Usia 25–40, ingin investasi halal, modal kecil-menengah, awam blockchain | Kemudahan, kepercayaan syariah, edukasi (AI Assistant) |
| **Investor Berpengalaman** | Sudah familiar investasi, ingin diversifikasi & transparansi return | Data performa, laporan on-chain, ROI jelas |
| **Calon Mitra/Investor Bisnis (Demo Viewer)** | Investor platform, mitra developer properti, lembaga syariah | Kredibilitas visual, kelengkapan fitur, kepatuhan syariah |

---

## 3. Lingkup Prototype (Scope)

### 3.1 In-Scope
- Seluruh 10 modul fitur di bawah ini, versi **frontend-only** dengan **mock/dummy data** (hardcoded di state React / JSON lokal).
- Navigasi penuh antar layar (routing client-side).
- Responsive layout: Mobile (phone-frame style, bottom navigation) dan Desktop (sidebar navigation + multi-panel dashboard).
- Interaksi UI dasar: klik tombol, isi form, transisi antar state (mis. "Beli Token" → animasi loading → halaman sukses/detail transaksi), tanpa validasi backend nyata.
- Chart/grafik menggunakan data statis (mock time-series).
- Landing/marketing section: Hero, Keunggulan PROPIN, Alur Investasi — untuk memperkenalkan produk sebelum masuk ke "app".

### 3.2 Out-of-Scope (Tidak Dikerjakan di Fase Prototype)
- Backend service, database, API nyata.
- Autentikasi & KYC sungguhan (verifikasi identitas hanya UI dummy/step visual).
- Integrasi blockchain nyata (wallet address, tx hash, smart contract — semua string statis/simulasi).
- Payment gateway sungguhan.
- Kalkulasi zakat & return yang dinamis secara real — cukup nilai contoh yang realistis.
- Multi-bahasa (fase 1 cukup Bahasa Indonesia, opsional toggle EN di fase depan).
- AI Assistant sungguhan (percakapan bisa scripted/preset Q&A, tidak perlu LLM call nyata — kecuali diinginkan nanti sebagai enhancement).

---

## 4. Tech Stack yang Direkomendasikan

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **React 18 (Vite)** | Ringan, cepat untuk prototype, cocok untuk artifact/demo, zero-config saat deploy ke Vercel |
| Styling | **Tailwind CSS v3.4.x** (bukan v4) | Konfigurasi `tailwind.config.js` classic (JS-based) lebih fleksibel untuk custom design token gold/hijau di `design.md`, ekosistem plugin lebih matang & stabil per Jul 2026 |
| Routing | **React Router v6** | Navigasi antar 10+ layar, mendukung nested route untuk layout Mobile/Desktop |
| State | **React Context / useState lokal** | Cukup untuk data dummy, tidak perlu Redux |
| Chart | **Recharts** | Untuk grafik kinerja portofolio & impact dashboard |
| Icon | **lucide-react** | Icon set modern, konsisten dengan gaya mockup (outline icons) |
| QR Code | **qrcode.react** | Untuk generate QR dummy di Sertifikat Kepemilikan (NFT) |
| Mock Data | **JSON lokal (`/src/data/*.json`)** | Simulasi API response, mudah diedit tanpa backend |
| Font | Lihat `design.md` | Kombinasi serif elegan (branding) + sans modern (UI), di-load via Google Fonts |
| Version Control | **Git + GitHub** (`azizbinsam/propin`) | Riwayat perubahan per Part, basis untuk auto-deploy |
| Hosting/Deploy | **Vercel** | Auto-deploy dari `main`, preview URL per branch/PR, tanpa perlu setup server |

> Catatan: karena ini prototype (bukan produk final Laravel/production), stack React murni (tanpa Laravel/Filament) sudah cukup dan paling cepat untuk keperluan demo visual.

### 4.1 Prinsip Alur Kerja Development
1. **Local dulu** — semua Part dikerjakan & ditest di `localhost` (`npm run dev`) sebelum di-push.
2. **Commit per Part** — setiap Part pada Bagian 11 menghasilkan minimal 1 commit dengan pesan jelas (mis. `feat: setup project & tailwind v3 config`), supaya riwayat repo rapi dan mudah di-rollback bila ada Part yang bermasalah.
3. **Push ke `main`** setelah satu Part selesai & sudah dicek visualnya di browser lokal — Vercel akan otomatis build & deploy ulang.
4. **Cek hasil deploy** di URL Vercel setelah tiap Part besar (minimal setelah Part 4 ke atas, saat sudah ada halaman yang bisa dilihat), untuk memastikan tidak ada perbedaan antara local dan production.

---

## 5. Struktur Informasi & Navigasi

### 5.1 Mobile (Bottom Navigation — 5 item, sesuai mockup)
`Beranda` · `Marketplace` · `Investasi` · `Wallet` · `Akun`

### 5.2 Desktop (Sidebar Navigation kiri + Topbar)
Sidebar berisi seluruh 10 modul + grup marketing (landing). Struktur:

```
Sidebar:
├── Dashboard (Beranda)
├── Marketplace Properti
├── Tokenisasi Properti (detail dibuka dari Marketplace)
├── Wallet & Kepemilikan
├── Transaksi (Smart Contract log)
├── Sertifikat Kepemilikan (NFT)
├── Auto-Zakat
├── AI Assistant
├── Dampak Investasi (Impact Dashboard)
└── Laporan & Transparansi
```

### 5.3 Peta Halaman (Sitemap)

| # | Halaman | Akses dari | Tipe |
|---|---|---|---|
| 0 | Landing Page (Hero + Keunggulan + Alur Investasi) | Entry point publik | Marketing |
| 1 | Dashboard Beranda | Login/Bottom Nav | Core |
| 2 | Marketplace Properti | Bottom Nav | Core |
| 2a | Detail Properti (pre-tokenisasi) | Klik card properti | Core |
| 3 | Detail Tokenisasi & Beli Token | Dari Detail Properti | Core |
| 4 | Wallet & Kepemilikan | Bottom Nav | Core |
| 5 | Detail Transaksi (Smart Contract) | Setelah "Beli Token" / dari riwayat | Core |
| 6 | Sertifikat Kepemilikan (NFT) | Dari Wallet → "Lihat Sertifikat NFT" | Core |
| 7 | Auto-Zakat | Dari menu / Akun | Core |
| 8 | AI Assistant | Floating button / menu | Core |
| 9 | Dampak Investasi (Impact Dashboard) | Menu | Core |
| 10 | Laporan & Transparansi | Bottom Nav "Laporan" atau menu | Core |
| 11 | Akun/Profil (implisit dari bottom nav) | Bottom Nav | Supporting |

---

## 6. Spesifikasi Fitur Detail

### 6.1 Dashboard Beranda
**Tujuan:** Ringkasan portofolio investor saat pertama membuka app.

**Komponen:**
- Header: Logo PROPIN + salam personal ("Assalamu'alaikum, Selamat datang kembali!") + ikon notifikasi.
- Card Total Portfolio: Total nilai (Rp125.750.000), Total Return (+Rp12.450.000 / 11,02%), styling card gold-gradient sebagai fokus utama.
- Quick Menu (4 ikon): Investasi, Marketplace, Wallet, Laporan.
- Ringkasan Aset (3 metric box): Jumlah Properti (3), Token Dimiliki (250), Rata-rata Return (10,25%).
- Grafik Kinerja Portofolio (line chart, mock data bulanan) dengan badge return.

**Data dummy diperlukan:** profil user, ringkasan portofolio, riwayat performa 6–12 bulan.

---

### 6.2 Marketplace Properti
**Tujuan:** Menampilkan daftar properti syariah yang bisa diinvestasikan.

**Komponen:**
- Search bar ("Cari properti atau lokasi").
- Filter tab: Semua / Apartemen / Vila / Hotel (filter client-side dari mock data).
- List card properti, tiap card berisi: foto, nama, lokasi, harga/token, minimum investasi, imbal hasil proyeksi (%/tahun), progress bar pendanaan (%).
- Klik card → ke Detail Properti / langsung ke Detail Tokenisasi.

**Data dummy:** minimal 4–6 properti (Apartemen BSD, Vila Tanjung Lesung, Hotel Jogja Syariah, dst.) dengan atribut lengkap.

---

### 6.3 Tokenisasi Properti (Detail Tokenisasi & Beli Token)
**Tujuan:** Menjelaskan aset properti yang telah ditokenisasi dan alur pembelian token.

**Komponen:**
- Badge "Verified Syariah".
- Foto properti hero.
- Informasi: Total Aset, Jumlah Token, Harga per Token, Imbal Hasil Proyeksi.
- Visual "Anda membeli X Token (Y% kepemilikan)" — kalkulasi otomatis dari input nominal (bisa dihitung real-time di frontend, murni JS, tanpa backend).
- Input nominal pembelian (slider/stepper token, atau input rupiah dengan konversi ke jumlah token).
- Tombol CTA "Beli Token" → memicu simulasi alur (loading → redirect ke Detail Transaksi/Smart Contract, langkah 6.5).

---

### 6.4 Blockchain Wallet & Kepemilikan
**Tujuan:** Menampilkan aset token yang dimiliki investor.

**Komponen:**
- Alamat wallet (format `0xBF71...3aD4B`) dengan tombol copy (bisa fungsional — copy ke clipboard, ini murni JS tanpa backend).
- Card Total Kepemilikan: Total Token & nilai Rupiah setara.
- List Aset Properti: nama properti, jumlah token, persentase kepemilikan, tombol lihat detail (chevron →).
- CTA "Lihat Sertifikat NFT" → ke halaman 6.6.

---

### 6.5 Smart Contract Transaksi (Detail Transaksi)
**Tujuan:** Simulasi transparansi eksekusi transaksi otomatis via smart contract.

**Komponen:**
- Timeline vertikal bertahap dengan checkmark hijau di tiap step:
  1. Investor — Membeli Token
  2. Smart Contract — Memverifikasi pembayaran
  3. Verified — Pembayaran berhasil diverifikasi
  4. Ownership Updated — Kepemilikan token diperbarui di blockchain
  5. Completed — Transaksi selesai
- Status Transaksi: badge "Executed" (hijau).
- Tx Hash (dummy, format `0x7d3f...97a2`).
- **Animasi:** step-step muncul progresif (delay tiap step ±400–600ms) untuk memberi kesan "proses real-time" saat user baru saja klik "Beli Token" — ini nilai jual utama prototype secara visual.

---

### 6.6 Bukti Kepemilikan (Sertifikat NFT)
**Tujuan:** Bukti kepemilikan token yang dapat diverifikasi, berbentuk sertifikat digital.

**Komponen:**
- Layout mirip sertifikat resmi/kartu premium (bisa full gold border/ornamen).
- Token ID, Nama Pemilik, Properti, Jumlah Token, Persentase Kepemilikan, Tanggal Terbit.
- Status "Verified on Blockchain" dengan checkmark.
- QR Code (bisa pakai library `qrcode.react` untuk generate QR dummy berisi link/ID).
- CTA "Verifikasi di Blockchain" (dummy link/modal "This is a prototype simulation").

---

### 6.7 Auto-Zakat (Integrasi Syariah)
**Tujuan:** Menunjukkan kepatuhan syariah otomatis — kalkulasi & penyaluran zakat maal dari hasil investasi.

**Komponen:**
- Status Zakat: badge "Wajib Zakat" / "Belum Wajib" tergantung nisab.
- Progress bar Nisab Tercapai (Rp saat ini / Rp ambang nisab).
- Estimasi Zakat (nominal & persentase 2,5%).
- Info Haul (rentang tanggal 1 tahun hijriah/masehi, jumlah hari).
- Badge mitra penyalur (BAZNAS) — logo/branding resmi, disclaimer "kerja sama simulasi" bila perlu untuk keperluan legal prototype.
- CTA "Lihat Riwayat Zakat".

---

### 6.8 AI Assistant (Asisten Investasi)
**Tujuan:** Chat interface edukatif dan rekomendasi investasi.

**Komponen:**
- Chat bubble UI standar (kiri: AI avatar + bubble abu/hijau muda, kanan: user bubble gold/hijau).
- Preset scripted conversation (tidak perlu LLM nyata untuk prototype): pertanyaan umum seperti "Properti mana yang cocok untuk pemula?" → jawaban terstruktur dengan rekomendasi.
- Input field "Ketik pertanyaan Anda..." — bisa difungsikan dengan simple keyword-matching (bukan AI sungguhan) agar tetap interaktif tanpa API call nyata.

**Catatan Enhancement (opsional, fase depan):** bisa disambungkan ke Claude API sungguhan bila prototype ingin didemokan sebagai "live AI", tapi ini di luar scope awal.

---

### 6.9 Dashboard Dampak (Impact Dashboard)
**Tujuan:** Menampilkan dampak sosial/ekonomi/lingkungan dari investasi kolektif platform.

**Komponen:**
- Grid metric: Investor Aktif, Properti Dibiayai, Dana Terkumpul, Lapangan Kerja Tercipta, CO₂ Terserap, dsb (6 metric card).
- Maqashid Syariah Impact Score: skor besar (4,9/5) + label ("Sangat Baik") + progress bar.
- Badge SDG (Sustainable Development Goals) — grid ikon bernomor sesuai standar PBB (No Poverty, Decent Work, dsb).

---

### 6.10 Laporan & Transparansi (On-Chain Report)
**Tujuan:** Laporan performa & transaksi yang bisa diunduh, meningkatkan trust.

**Komponen:**
- Tab: Kinerja / Transaksi / Distribusi.
- Ringkasan Kinerja: Total Return, Imbal Hasil Rata-rata.
- Grafik Kinerja (line chart bulanan) dengan badge % return.
- CTA "Unduh Laporan" (untuk prototype: generate PDF dummy via `window.print()` atau trigger download file statis — opsional, bisa juga cukup UI tanpa fungsi nyata & tampilkan toast "Fitur unduh laporan (simulasi)").

---

## 7. Landing / Marketing Section (Layar Pembuka)

Untuk keperluan demo/pitching, prototype disarankan punya 1 landing page sebelum masuk ke "app", terdiri dari:

1. **Hero Section** — Logo, tagline "Satu Token, Satu Kepemilikan", judul besar, 3 bullet value prop, ilustrasi rumah, CTA "Coba Prototype" → masuk ke Dashboard.
2. **Keunggulan PROPIN** (5 kartu):
   - Tokenisasi Properti Syariah — kepemilikan fraksional mulai Rp100.000
   - Blockchain Transparan — aman, immutable, dapat diverifikasi publik
   - AI Cerdas — rekomendasi personal & edukasi investasi
   - Sesuai Syariah — akad syariah, bebas riba, gharar, maysir
   - Berdampak Nyata — mendorong inklusi keuangan & kesejahteraan umat
3. **Alur Investasi di PROPIN** (7 langkah, horizontal stepper di desktop / vertical di mobile):
   Daftar & Verifikasi → Pilih Properti → Beli Token → Smart Contract → Kepemilikan Tercatat → Terima Imbal Hasil → Auto-Zakat

---

## 8. Responsive Behavior

| Aspek | Mobile (< 768px) | Desktop (≥ 1024px) |
|---|---|---|
| Layout dasar | Single column, mirip native app | Multi-kolom / dashboard grid |
| Navigasi utama | Bottom navigation bar (5 item, fixed) | Sidebar kiri (fixed, collapsible) + topbar |
| Frame konten | Full-width, mengikuti mockup phone-frame (opsional: bisa ditampilkan dalam "phone mockup frame" khusus di halaman showcase/landing) | Konten dalam container max-width dengan card-based grid (2–3 kolom untuk marketplace, dsb) |
| Chart | Full-width, ringkas | Bisa lebih besar & detail, sering berdampingan dengan panel lain |
| Modal/Detail page | Full-screen page transition | Bisa berupa modal/drawer di atas dashboard, atau tetap full page |
| AI Assistant | Full-screen chat page | Bisa berupa panel chat mengambang (floating widget) di kanan bawah |
| Font size | Basis 14–16px | Basis 16px, heading lebih besar |

**Breakpoint (Tailwind default):** `sm:640px` `md:768px` `lg:1024px` `xl:1280px`

---

## 9. Alur Investasi End-to-End (User Flow Utama)

```
Landing Page
   ↓ "Coba Prototype"
Dashboard Beranda
   ↓ klik "Marketplace"
Marketplace Properti
   ↓ pilih properti
Detail Tokenisasi
   ↓ input nominal → "Beli Token"
[Loading Simulasi ~1.5s]
   ↓
Detail Transaksi (Smart Contract) — animasi step-by-step
   ↓ selesai
Toast/Notifikasi sukses → redirect ke Wallet (token baru muncul di list)
   ↓ opsional
Sertifikat Kepemilikan (NFT)
```

Alur sekunder: Wallet ↔ Auto-Zakat (jika nisab tercapai, badge notifikasi muncul di ikon Wallet/Akun) — AI Assistant dapat diakses kapan saja via floating button.

---

## 10. Non-Functional Requirements (untuk Prototype)

- **Performance:** Load instan, tanpa network delay signifikan (semua data lokal). Simulasi delay hanya digunakan untuk efek UX (loading transaksi), bukan karena network nyata.
- **Aksesibilitas dasar:** Kontras warna teks memenuhi WCAG AA (perlu diperhatikan khusus karena gold di atas putih rawan kontras rendah — lihat `design.md`).
- **Kompatibilitas:** Chrome, Safari, Edge terbaru; mobile Safari & Chrome Android.
- **Tanpa persistensi data nyata** — refresh halaman boleh reset ke state awal (acceptable untuk prototype), kecuali diminta menyimpan state sementara di localStorage untuk keperluan demo yang lebih halus.

---

## 11. Rencana Pengerjaan (Part-Based Delivery)

Untuk menghindari proses yang berantakan, pengerjaan dipecah menjadi **8 Part berurutan**. Setiap Part = satu unit kerja yang lengkap (command + code), harus bisa dijalankan & dicek di local sebelum lanjut ke Part berikutnya, lalu di-commit ke Git.

| Part | Cakupan | Output yang Bisa Dicek di Browser |
|---|---|---|
| **1** | Inisialisasi project Vite + React, install & konfigurasi **Tailwind v3**, setup struktur folder awal, `.gitignore`, commit pertama ke repo `azizbinsam/propin` | Halaman default Vite tampil dengan Tailwind aktif (test dengan 1 class warna gold) |
| **2** | Terapkan **design token** dari `design.md` ke `tailwind.config.js` (warna gold/hijau/neutral, font, radius), install dependency (`react-router-dom`, `lucide-react`, `recharts`, `qrcode.react`), buat komponen dasar: `Button`, `Card`, `Badge`, `ProgressBar` | Halaman showcase komponen (styleguide) menampilkan seluruh warna & komponen dasar |
| **3** | Bangun **layout & routing**: `MobileLayout` (bottom nav), `DesktopLayout` (sidebar + topbar), `ResponsiveShell` yang otomatis switch berdasar breakpoint, setup seluruh route kosong (placeholder) sesuai sitemap Bagian 5.3 | Navigasi antar semua halaman (masih placeholder) berjalan di mobile & desktop |
| **4** | Bangun **Landing Page** (Hero, Keunggulan PROPIN, Alur Investasi) + **Dashboard Beranda** dengan data dummy dari `src/data/` | Landing page & dashboard tampil sesuai mockup, siap di-push & dicek di Vercel |
| **5** | Bangun **Marketplace Properti** + **Detail Tokenisasi & Beli Token** + **Detail Transaksi (Smart Contract)** — flow inti pembelian token lengkap dengan animasi step | Alur "pilih properti → beli token → smart contract" bisa didemokan end-to-end |
| **6** | Bangun **Wallet & Kepemilikan** + **Sertifikat Kepemilikan (NFT + QR)** + **Auto-Zakat** | Token hasil pembelian dari Part 5 muncul di Wallet, sertifikat & zakat bisa diakses |
| **7** | Bangun **AI Assistant** (chat scripted) + **Dampak Investasi (Impact Dashboard)** + **Laporan & Transparansi** | Seluruh 10 modul PRD sudah lengkap dan bisa dinavigasi |
| **8** | **Polish & QA**: responsive fine-tuning mobile↔desktop, motion/animasi sesuai `design.md` Bagian 8, perbandingan visual dengan mockup asli, `vercel.json` untuk SPA routing, final push & verifikasi production di Vercel | Prototype final siap didemokan dari URL Vercel |

> Part 1 dikerjakan terlebih dahulu di percakapan berikutnya, lengkap dengan seluruh command terminal dan isi file yang perlu dibuat/diedit.

---

## 12. Kriteria Sukses Prototype

- Seluruh 10 modul dapat dinavigasi tanpa error di desktop & mobile.
- Visual selaras dengan mockup asli (layout, hierarki informasi, gold+hijau branding).
- Flow inti "Beli Token → Smart Contract → Wallet" terasa hidup (ada micro-interaction/animasi), karena ini yang paling menjual saat demo.
- Dapat diakses & didemokan langsung dari browser (link artifact/deploy), tanpa setup backend apa pun oleh audiens demo.

---

## 13. Lampiran — Kebutuhan Mock Data

| File | Isi |
|---|---|
| `data/user.json` | Profil investor dummy |
| `data/properties.json` | 4–6 properti dengan atribut lengkap |
| `data/portfolio.json` | Ringkasan portofolio & histori performa |
| `data/transactions.json` | Riwayat transaksi + status smart contract |
| `data/wallet.json` | Alamat wallet & daftar token dimiliki |
| `data/zakat.json` | Status nisab, estimasi zakat, riwayat |
| `data/impact.json` | Metrik dampak sosial & SDG |
| `data/aiChat.json` | Preset Q&A untuk AI Assistant |

---

*Dokumen ini adalah dasar perencanaan sebelum development dimulai. Implementasi dilakukan secara **lokal terlebih dahulu**, mengikuti urutan Part pada Bagian 11, dengan acuan visual dari `design.md`. Setiap Part di-commit & push ke [github.com/azizbinsam/propin](https://github.com/azizbinsam/propin), lalu otomatis ter-deploy ke Vercel untuk verifikasi.*
