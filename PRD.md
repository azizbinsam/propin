# PRD — PROPIN (Prototype)
### Platform Tokenisasi Properti Syariah Berbasis Blockchain & AI
**Versi:** 2.1 — Prototype Only (No Real Backend), Local Development First
**Tanggal:** 19 Juli 2026
**Tipe Dokumen:** Product Requirements Document untuk kebutuhan prototyping frontend (React)
**Repository:** [github.com/azizbinsam/propin](https://github.com/azizbinsam/propin)
**Target Deployment:** Vercel (auto-deploy dari branch `main`)
**Referensi Flow:** [halpin.vercel.app](https://halpin.vercel.app) — struktur navigasi, urutan halaman, dan pola interaksi mengikuti referensi ini; **palet warna & identitas visual gold/hijau PROPIN tetap dipertahankan** (lihat `design.md`).

### Changelog
| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 14 Jul 2026 | Draft awal PRD & scope prototype |
| 1.1 | 15 Jul 2026 | Menetapkan **Tailwind CSS v3** (bukan v4) sebagai styling engine, menambahkan alur kerja **local development → GitHub → Vercel**, dan memecah rencana pengerjaan menjadi **Part-based delivery** |
| 2.0 | 19 Jul 2026 | **Restrukturisasi total flow & sitemap mengikuti referensi HALPIN**: navigasi utama diramping jadi 5 modul inti + floating AI Assistant; Wallet & Transaksi digabung jadi satu halaman "Dompet & Transaksi"; menambahkan **Kalkulator Investasi** di landing page; AI Assistant dikembangkan menjadi chat + library video edukasi (gaya PINA); menambahkan halaman **Pengaturan**; menambahkan **mini dashboard harga emas & nisab** di Auto Zakat; menambahkan **sistem Auth (Login/Register) dua peran** dengan **Admin Panel terpisah total** (sidebar, layout, dan modul berbeda dari sisi User); modul Sertifikat NFT, Dampak Investasi, dan Laporan & Transparansi tetap dipertahankan sebagai modul tambahan di luar 5 modul inti. Rencana pengerjaan (Bagian 12) diperluas dari 8 Part menjadi 11 Part |
| 2.1 | 19 Jul 2026 | **Hardening pass** — menambahkan Data Architecture Rule/single source of truth (4.2), spesifikasi Route Guard & perilaku akses tidak sah (5.5), edge case Manajemen Properti & Investor di sisi Admin (7.2, 7.3), disclaimer legal di Landing Page (8), QA Checklist per Part (12.1), dan matriks lengkap State Kosong/Error/Edge Case per modul (15) |

---

## 1. Ringkasan Produk

PROPIN adalah platform investasi properti syariah yang mengubah aset properti fisik menjadi **token digital** di atas blockchain, memungkinkan kepemilikan fraksional mulai dari nominal kecil (Rp100.000). Platform ini dilengkapi AI Assistant untuk edukasi & rekomendasi investasi, serta fitur Auto-Zakat untuk kepatuhan syariah otomatis.

Sejak v2.0, prototype PROPIN juga mendemokan **dua sisi sistem**: sisi **Investor (User)** — pengalaman investasi end-to-end, dan sisi **Admin Platform** — pengelolaan properti, investor, transaksi, dan zakat platform-wide. Kedua sisi memakai identitas visual yang sama (gold/hijau) namun struktur navigasi & layout yang berbeda sesuai peran.

**Tagline:** *"Satu Token, Satu Kepemilikan"*

### 1.1 Tujuan Dokumen
Dokumen ini mendefinisikan scope, struktur, dan spesifikasi UI/UX untuk membangun **prototype interaktif** (bukan produk produksi) menggunakan React, yang bisa didemokan di desktop maupun mobile, dengan seluruh data bersifat **dummy/mock** (tanpa backend, tanpa koneksi blockchain nyata, tanpa autentikasi nyata).

### 1.2 Tujuan Prototype
- Memvisualisasikan seluruh user journey investasi tokenisasi properti syariah dari ujung ke ujung, **untuk kedua peran (Investor & Admin)**.
- Menjadi materi pitching/demo ke calon klien, investor, atau mitra syariah (BAZNAS, dsb).
- Menjadi basis validasi UX sebelum development sistem produksi (real backend, real blockchain integration, real auth).
- Responsive penuh: tampil natural di desktop (layout dashboard/multi-kolom) dan di mobile (layout single-column ala native app). Admin Panel diprioritaskan untuk desktop (pola kerja tipikal admin), tetap dibuat cukup responsif untuk tablet.

---

## 2. Target Pengguna (Persona)

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Investor Pemula Muslim** | Usia 25–40, ingin investasi halal, modal kecil-menengah, awam blockchain | Kemudahan, kepercayaan syariah, edukasi (AI Assistant), simulasi hasil sebelum investasi (Kalkulator) |
| **Investor Berpengalaman** | Sudah familiar investasi, ingin diversifikasi & transparansi return | Data performa, laporan on-chain, ROI jelas, riwayat transaksi rapi |
| **Admin Platform (Operator/Internal PROPIN)** | Tim internal yang mengelola listing properti, verifikasi investor (KYC), dan memantau kesehatan platform | Kontrol penuh atas data properti & investor, visibilitas transaksi & zakat platform-wide, workflow verifikasi yang cepat |
| **Calon Mitra/Investor Bisnis (Demo Viewer)** | Investor platform, mitra developer properti, lembaga syariah | Kredibilitas visual, kelengkapan fitur (termasuk sisi admin/governance), kepatuhan syariah |

---

## 3. Lingkup Prototype (Scope)

### 3.1 In-Scope
- Seluruh modul fitur sisi **User** dan sisi **Admin** di bawah ini, versi **frontend-only** dengan **mock/dummy data** (hardcoded di state React / JSON lokal).
- **Sistem Auth dua peran** (User & Admin) — simulasi login/register, tanpa backend nyata (lihat Bagian 6.1).
- Navigasi penuh antar layar (routing client-side), termasuk **route protection** sederhana berbasis role yang tersimpan di state.
- Responsive layout:
  - Sisi User: Mobile (phone-frame style, bottom navigation 5 item) dan Desktop (sidebar navigation + multi-panel dashboard).
  - Sisi Admin: Desktop-first (sidebar admin + topbar + area tabel/form), tetap dapat diakses di tablet.
- Interaksi UI dasar: klik tombol, isi form, transisi antar state (mis. "Beli Token" → animasi loading → halaman sukses/detail transaksi), tanpa validasi backend nyata.
- **Kalkulator Investasi interaktif** di Landing Page (kalkulasi murni di frontend/JS).
- **Form tambah/edit dummy** untuk Manajemen Properti & Manajemen Investor di sisi Admin (state lokal, opsional persist ke `localStorage` agar hasil demo tidak hilang saat pindah halaman).
- Chart/grafik menggunakan data statis (mock time-series), termasuk toggle periode (24H/7D/1M/1Y) pada grafik pertumbuhan saldo.
- Landing/marketing section: Hero, 3 Keunggulan PROPIN, Alur Investasi 4 langkah, Kalkulator Investasi.

### 3.2 Out-of-Scope (Tidak Dikerjakan di Fase Prototype)
- Backend service, database, API nyata.
- Autentikasi & KYC sungguhan (login/register hanya simulasi dengan 2 akun dummy preset; verifikasi identitas hanya UI dummy/step visual — lihat Bagian 6.1).
- Integrasi blockchain nyata (wallet address, tx hash, smart contract — semua string statis/simulasi).
- Payment gateway sungguhan (Top Up/Withdraw hanya UI + toast simulasi).
- Kalkulasi zakat & return yang dinamis secara real — cukup nilai contoh yang realistis, termasuk harga emas Antam (statis, bukan live feed).
- Multi-bahasa (fase 1 cukup Bahasa Indonesia, opsional toggle EN di fase depan).
- AI Assistant sungguhan (percakapan bisa scripted/preset Q&A atau simple keyword-matching, tidak perlu LLM call nyata — kecuali diinginkan nanti sebagai enhancement).
- Manajemen role/permission granular di sisi Admin (cukup 1 level "Admin", tanpa sub-role seperti Superadmin/Staff).
- Notifikasi real-time (push notification, WebSocket) — badge notifikasi cukup dummy/statis.

---

## 4. Tech Stack yang Direkomendasikan

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **React 18 (Vite)** | Ringan, cepat untuk prototype, cocok untuk artifact/demo, zero-config saat deploy ke Vercel |
| Styling | **Tailwind CSS v3.4.x** (bukan v4) | Konfigurasi `tailwind.config.js` classic (JS-based) lebih fleksibel untuk custom design token gold/hijau di `design.md`, ekosistem plugin lebih matang & stabil per Jul 2026 |
| Routing | **React Router v6** | Navigasi antar layar User & Admin, mendukung nested route untuk layout Mobile/Desktop/Admin serta route protection berbasis role |
| State & Auth (dummy) | **React Context (`AuthContext`) + `localStorage`** | Menyimpan role user aktif (`user` / `admin`) & sesi dummy agar bertahan saat refresh; cukup untuk kebutuhan prototype tanpa backend |
| Chart | **Recharts** | Untuk grafik kinerja portofolio, pertumbuhan saldo, impact dashboard, dan mini-chart harga emas |
| Icon | **lucide-react** | Icon set modern, konsisten dengan gaya referensi (outline icons) |
| QR Code | **qrcode.react** | Untuk generate QR dummy di Sertifikat Kepemilikan (NFT) |
| Tabel Admin | **Native table + Tailwind** (tanpa library tabel berat) | Cukup untuk data dummy skala kecil, menghindari overhead dependency untuk kebutuhan prototype |
| Mock Data | **JSON lokal (`/src/data/*.json`)** | Simulasi API response, mudah diedit tanpa backend |
| Font | Lihat `design.md` | Kombinasi serif elegan (branding) + sans modern (UI), di-load via Google Fonts |
| Version Control | **Git + GitHub** (`azizbinsam/propin`) | Riwayat perubahan per Part, basis untuk auto-deploy |
| Hosting/Deploy | **Vercel** | Auto-deploy dari `main`, preview URL per branch/PR, tanpa perlu setup server |

> Catatan: karena ini prototype (bukan produk final Laravel/production), stack React murni (tanpa Laravel/Filament) sudah cukup dan paling cepat untuk keperluan demo visual, termasuk untuk sisi Admin.

### 4.1 Prinsip Alur Kerja Development
1. **Local dulu** — semua Part dikerjakan & ditest di `localhost` (`npm run dev`) sebelum di-push.
2. **Commit per Part** — setiap Part pada Bagian 12 menghasilkan minimal 1 commit dengan pesan jelas (mis. `feat: setup project & tailwind v3 config`), supaya riwayat repo rapi dan mudah di-rollback bila ada Part yang bermasalah.
3. **Push ke `main`** setelah satu Part selesai & sudah dicek visualnya di browser lokal — Vercel akan otomatis build & deploy ulang.
4. **Cek hasil deploy** di URL Vercel setelah tiap Part besar, untuk memastikan tidak ada perbedaan antara local dan production.

### 4.2 Data Architecture Rule (Single Source of Truth)

Prototype ini rawan "data tidak sinkron" bila tiap modul membaca file JSON-nya sendiri secara lepas (mis. saldo di Dashboard beda dengan saldo di Dompet & Transaksi). Untuk mencegah ini, berlaku aturan wajib:

- **Satu domain data = satu Context, dibaca banyak halaman.** Jangan `fetch`/`import` ulang JSON mentah di tiap komponen halaman. Struktur yang dipakai:
  - `AuthContext` — role, profil user aktif, status login.
  - `PortfolioContext` — saldo, token dimiliki, riwayat pertumbuhan saldo, riwayat transaksi milik user aktif. **Dashboard, Dompet & Transaksi, dan Auto Zakat semuanya membaca dari context yang sama ini** — bukan 3 sumber data terpisah.
  - `PropertiesContext` — daftar properti (dipakai Marketplace, Dashboard "Segera Habis", Kalkulator Investasi, **dan** Manajemen Properti di Admin). Properti baru yang ditambahkan Admin **wajib** masuk ke context ini agar langsung muncul di Marketplace User pada sesi yang sama (lihat PRD 7.2 & 10.2).
  - `AdminDataContext` — data investor & metrik platform-wide untuk sisi Admin, terpisah dari `PortfolioContext` milik user (Admin melihat data lintas-user, bukan datanya sendiri).
- **Transaksi baru = satu titik penulisan.** Aksi "Beli Token" (6.4) hanya boleh menulis ke satu fungsi `addTransaction()` di `PortfolioContext`, yang otomatis meng-update: saldo, daftar token dimiliki, riwayat transaksi, dan status nisab zakat. Jangan duplikasi logic di beberapa tempat.
- **Konsistensi angka:** total pada Dashboard (Total Asset) harus selalu sama dengan total pada Dompet & Transaksi dan menjadi basis perhitungan nisab di Auto Zakat — karena berasal dari context yang sama, bukan angka hardcode berbeda di tiap JSON.
- Detail matriks state kosong/error/edge-case per modul ada di **Bagian 15**.

---

## 5. Struktur Informasi & Navigasi

### 5.1 Auth (Gerbang Masuk, Sebelum App)
`/login` · `/register` — halaman auth yang sama untuk kedua peran. Role terdeteksi otomatis dari **2 akun dummy preset**:

| Role | Contoh Email Dummy | Redirect Setelah Login |
|---|---|---|
| Investor (User) | `siti@propin.id` (atau email apa pun selain pola admin) | `/dashboard` (User) |
| Admin Platform | `admin@propin.id` | `/admin/dashboard` (Admin) |

Role & status login disimpan di `AuthContext` + `localStorage` agar bertahan saat refresh (khusus kebutuhan demo). Halaman/route User dan Admin dilindungi route guard sederhana — akses ke `/admin/*` tanpa role admin akan redirect balik ke `/login`.

### 5.2 Mobile — Bottom Navigation (User, 5 item, ikut referensi)
`Dashboard` · `Marketplace` · `Dompet & Transaksi` · `Auto Zakat` · `Pengaturan`
(+ Floating Action Button "AI Assistant" muncul di semua halaman User)

### 5.3 Desktop — Sidebar Navigation (User)
```
Sidebar User:
├── Dashboard
├── Marketplace Properti
├── Dompet & Transaksi
├── Auto Zakat
├── Pengaturan
└── (Floating widget AI Assistant di kanan bawah)

Modul tambahan (diakses dari dalam halaman terkait, bukan item sidebar utama):
├── Detail Properti & Tokenisasi (dari Marketplace)
├── Detail Transaksi / Smart Contract (dari Dompet & Transaksi)
├── Sertifikat Kepemilikan / NFT (dari Dompet & Transaksi → token → "Lihat Sertifikat")
├── Dampak Investasi / Impact Dashboard (dari menu "Lainnya" di Pengaturan atau topbar)
└── Laporan & Transparansi (dari menu "Lainnya" di Pengaturan, atau tombol "Unduh Laporan" di Auto Zakat)
```

### 5.4 Desktop — Sidebar Navigation (Admin, terpisah total dari User)
```
Sidebar Admin:
├── Dashboard Admin
├── Manajemen Properti
├── Manajemen Investor
├── Monitoring Transaksi
├── Monitoring Auto Zakat
└── Pengaturan Admin
```
Sidebar Admin memakai struktur, urutan menu, dan (lihat `design.md`) kepadatan layout yang **berbeda dari Sidebar User** — mencerminkan konteks kerja admin (data-dense, tabel-sentris) vs konteks konsumen (card-based, lega). Admin Panel tidak memiliki bottom navigation mobile (desktop-first); di layar sempit, sidebar admin collapse menjadi drawer/hamburger.

### 5.5 Route Guard & Perilaku Akses Tidak Sah

Karena tidak ada backend, "keamanan" di sini murni untuk mencegah navigasi tidak sengaja saat demo — tapi perilakunya tetap harus didefinisikan agar tidak ambigu saat implementasi:

| Skenario | Perilaku |
|---|---|
| Belum login, akses langsung URL `/dashboard`, `/marketplace`, dll (User) | Redirect ke `/login`, tampilkan toast singkat "Silakan masuk terlebih dahulu" |
| Belum login, akses langsung URL `/admin/*` | Redirect ke `/login` (bukan `/admin/login` — auth tetap satu pintu, lihat 5.1) |
| Login sebagai **User**, akses langsung URL `/admin/*` | Redirect ke `/dashboard` (User), toast "Halaman ini khusus Admin" — **bukan** ditampilkan halaman kosong/error 403 mentah, karena prototype harus tetap terasa "hidup" saat demo |
| Login sebagai **Admin**, akses langsung URL `/dashboard` (area User) | Diizinkan (tidak perlu diblokir) — Admin boleh melihat tampilan User untuk keperluan cek/demo, cukup tampilkan banner kecil non-intrusive "Anda login sebagai Admin, sedang melihat tampilan User" |
| Sudah login, akses `/login` atau `/register` lagi | Redirect otomatis ke dashboard sesuai role aktif (tidak menampilkan form login ulang) |
| Klik Logout | Modal konfirmasi (lihat 6.12) → clear `AuthContext` + `localStorage` → redirect ke Landing Page (`/`) |

### 5.6 Peta Halaman (Sitemap)

| # | Halaman | Peran | Akses dari | Tipe |
|---|---|---|---|---|
| 0 | Landing Page (Hero + Keunggulan + Alur Investasi + Kalkulator) | Publik | Entry point publik | Marketing |
| A1 | Login | Publik | Landing "Masuk" | Auth |
| A2 | Register | Publik | Landing "Daftar" / Login | Auth |
| U1 | Dashboard | User | Login / Bottom Nav | Core |
| U2 | Marketplace Properti | User | Bottom Nav | Core |
| U2a | Detail Properti (pre-tokenisasi) | User | Klik card properti | Core |
| U3 | Detail Tokenisasi & Beli Token | User | Dari Detail Properti | Core |
| U4 | Dompet & Transaksi (gabungan Wallet + Riwayat) | User | Bottom Nav | Core |
| U5 | Detail Transaksi (Smart Contract) | User | Setelah "Beli Token" / dari riwayat di U4 | Core |
| U6 | Sertifikat Kepemilikan (NFT) | User | Dari U4 → token → "Lihat Sertifikat NFT" | Tambahan |
| U7 | Auto-Zakat (+ mini dashboard emas/nisab) | User | Bottom Nav | Core |
| U8 | AI Assistant (chat + video edukasi) | User | Floating button | Core |
| U9 | Dampak Investasi (Impact Dashboard) | User | Menu "Lainnya" di Pengaturan | Tambahan |
| U10 | Laporan & Transparansi | User | Menu "Lainnya" di Pengaturan / tombol di U7 | Tambahan |
| U11 | Pengaturan (profil, keamanan, T&C) | User | Bottom Nav | Core |
| AD1 | Dashboard Admin | Admin | Login Admin / Sidebar Admin | Core |
| AD2 | Manajemen Properti | Admin | Sidebar Admin | Core |
| AD3 | Manajemen Investor | Admin | Sidebar Admin | Core |
| AD4 | Monitoring Transaksi | Admin | Sidebar Admin | Core |
| AD5 | Monitoring Auto Zakat | Admin | Sidebar Admin | Core |
| AD6 | Pengaturan Admin | Admin | Sidebar Admin | Core |

---

## 6. Spesifikasi Fitur Detail — Sisi User

### 6.1 Auth — Login & Register
**Tujuan:** Simulasi gerbang masuk platform dengan dua peran berbeda, tanpa backend nyata.

**Komponen:**
- **Login:** Logo PROPIN (serif wordmark), field Email & Password, tombol "Masuk", link "Belum punya akun? Daftar".
- **Register:** Field Nama Lengkap, Email, Password, Konfirmasi Password, checkbox ringkas "Saya menyetujui Syarat & Ketentuan" (detail lengkap T&C ada di Pengaturan U11), tombol "Daftar".
- Validasi form dasar (field kosong, format email, kecocokan password) dilakukan di frontend saja.
- Setelah submit valid: cek pola email → set role di `AuthContext` → redirect ke `/dashboard` (user) atau `/admin/dashboard` (admin).
- State loading singkat (~800ms) saat submit untuk kesan "memproses", diikuti toast sukses.

**Data dummy diperlukan:** `data/users.json` — minimal 1 akun user (`siti@propin.id`) dan 1 akun admin (`admin@propin.id`) dengan profil masing-masing.

---

### 6.2 Dashboard Beranda
**Tujuan:** Ringkasan portofolio investor saat pertama membuka app.

**Komponen:**
- Header: Logo PROPIN + salam personal ("Assalamu'alaikum, Selamat datang kembali, {nama}!") + ikon notifikasi + tanggal hari ini.
- 4 Metric Card (mengikuti pola referensi): **Total Asset** (nilai + % perubahan bulan ini), **Yield Berjalan** (% p.a rata-rata), **Token Dimiliki** (jumlah properti + token aktif), **Zakat** (nominal + status "Otomatis disalurkan"). Card Total Asset memakai styling gold-gradient sebagai fokus utama.
- Tombol CTA "+ Tambah Investasi" → ke Marketplace.
- **Property Performance** — list ringkas properti yang dimiliki: foto/ikon, nama, lokasi, jumlah token, progress "Terisi %", yield p.a. Link "Lihat semua" → ke Dompet & Transaksi.
- Ringkasan Auto Zakat singkat (total dipotong, disalurkan ke lembaga, haul berjalan) dengan link ke halaman Auto Zakat penuh.
- Listing **"Segera Habis"** — properti dengan token tersisa sedikit, mendorong urgensi beli, tiap card: foto, spesifikasi ringkas (kamar/kamar mandi/luas), nama, lokasi, tombol "Beli Token" langsung ke Detail Tokenisasi.

**Data dummy diperlukan:** profil user, ringkasan portofolio, riwayat performa 6–12 bulan, daftar properti "segera habis".

---

### 6.3 Marketplace Properti
**Tujuan:** Menampilkan daftar properti syariah yang bisa diinvestasikan.

**Komponen:**
- Judul halaman + subjudul ("Pilih dari 100+ Properti Pilihan yang Telah Tervalidasi Syariah" — angka dummy).
- Filter chip horizontal (scrollable di mobile): `Semua` · `Banten` · `Jakarta` · `Yogyakarta` · `Yield Tertinggi` · `Token Tersedia` — filter client-side dari mock data.
- Grid card properti (`lg:grid-cols-3` desktop, `grid-cols-1` mobile), tiap card: foto, badge "X Token tersedia", spesifikasi ringkas (🛏 kamar · 🚿 kamar mandi · 📐 luas), nama, lokasi (📍).
- Tombol "Muat lebih banyak" (pagination dummy, load batch berikutnya dari mock data).
- Klik card → Detail Properti → Detail Tokenisasi.

**Data dummy:** minimal 8–10 properti dengan atribut lengkap (lokasi, spesifikasi, harga/token, yield, token tersedia).

---

### 6.4 Detail Properti & Tokenisasi (Detail Tokenisasi & Beli Token)
**Tujuan:** Menjelaskan aset properti yang telah ditokenisasi dan alur pembelian token.

**Komponen:**
- Badge "Verified Syariah".
- Foto properti hero + galeri singkat.
- Informasi: Total Aset, Jumlah Token, Harga per Token (Rp10.000/token, konsisten dengan Kalkulator di landing), Expected Rental Yield (ERY).
- Visual "Anda membeli X Token (Y% kepemilikan)" — kalkulasi otomatis dari input nominal (murni JS frontend).
- Input nominal pembelian (slider/stepper token, atau input rupiah dengan konversi ke jumlah token).
- Tombol CTA "Beli Token" → memicu simulasi alur (loading → redirect ke Detail Transaksi/Smart Contract, Bagian 6.6).

---

### 6.5 Dompet & Transaksi (Gabungan Wallet + Riwayat Transaksi)
**Tujuan:** Satu halaman terpusat untuk saldo, aset token, rekening bank, dan seluruh riwayat transaksi — mengikuti pola referensi yang menggabungkan Wallet & Transaksi.

**Komponen:**
- Header ringkasan: **Total Asset** (Rp + estimasi USD) dan **Saldo Tersedia** (Rp + estimasi USD, "Terakhir diperbarui: Hari ini, HH.MM") — masing-masing dengan tombol aksi (`Withdraw` untuk Total Asset, `+ Top Up` untuk Saldo Tersedia). Top Up/Withdraw: form dummy → toast simulasi ("Fitur simulasi, tidak memproses dana sungguhan").
- 4 metric ringkas kedua: Total Asset, Yield Berjalan, Masuk Bulan Ini (+ nominal, sumber "distribusi sewa"), Zakat Dipotong (+ lembaga penyalur).
- **Rekening Bank** — list rekening tersimpan (nomor tersamar, nama pemilik), tombol "+ Tambah" (form dummy).
- **Token Saya** — list token/properti dimiliki dengan yield masing-masing, tombol "Jual" per item (dummy, memicu toast/modal simulasi), link "Lihat semua" ke Sertifikat NFT bila diklik detail token.
- **Grafik Pertumbuhan Saldo** — line/area chart dengan toggle periode `24H` `7D` `1M` `1Y`, sumbu waktu & nilai (mock data per periode), currency label (IDR/USD toggle opsional).
- **Riwayat Transaksi** — list dengan toggle periode yang sama, tiap item: ikon arah (↙ masuk / ↗ keluar), jenis transaksi (Distribusi sewa, Beli Token, Zakat, Top up), nominal, tanggal. Klik item transaksi "Beli Token" → ke Detail Transaksi (Smart Contract, Bagian 6.6).

**Data dummy diperlukan:** `data/wallet.json` (saldo, rekening bank, token dimiliki, riwayat pertumbuhan saldo per periode), `data/transactions.json` (riwayat transaksi + status smart contract).

---

### 6.6 Smart Contract Transaksi (Detail Transaksi)
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
- Setelah selesai: toast sukses → redirect ke Dompet & Transaksi (token baru muncul di "Token Saya").

---

### 6.7 Bukti Kepemilikan (Sertifikat NFT) — Modul Tambahan
**Tujuan:** Bukti kepemilikan token yang dapat diverifikasi, berbentuk sertifikat digital.

**Komponen:**
- Layout mirip sertifikat resmi/kartu premium (gold border/ornamen ganda).
- Token ID, Nama Pemilik, Properti, Jumlah Token, Persentase Kepemilikan, Tanggal Terbit.
- Status "Verified on Blockchain" dengan checkmark.
- QR Code (`qrcode.react`, berisi link/ID dummy).
- CTA "Verifikasi di Blockchain" (dummy modal "Ini adalah simulasi prototype").

---

### 6.8 Auto-Zakat (Integrasi Syariah)
**Tujuan:** Menunjukkan kepatuhan syariah otomatis — kalkulasi & penyaluran zakat maal dari hasil investasi, dengan konteks nisab emas yang jelas.

**Komponen:**
- Header: badge "Auto 2,5%" + judul "Zakat Mal Properti Otomatis" + deskripsi singkat mekanisme (Smart Contract memotong dari distribusi sewa, disalurkan via lembaga resmi).
- Card ringkasan besar: Total Zakat tahun berjalan, Haul Berjalan (X/12 bulan), Status Nisab (Terpenuhi/Belum), Lembaga aktif (BAZNAS). Tombol "Unduh Laporan PDF" dan "Lihat Riwayat Zakat" (→ Laporan & Transparansi, Bagian 6.10).
- 4 metric box: Status Nisab, Haul Berjalan (+ sisa bulan), Dipotong Bulan Ini (+ tanggal), Total Disalurkan (+ lembaga).
- **Progress Haul** — visual bar/timeline 12 bulan (label bulan Jun–Mei dsb.), persentase & "X/12 bulan", catatan "Zakat penuh mulai [bulan mulai haul]".
- **Zakat per Properti** — list per properti dimiliki: nama, lokasi, token, "Terisi %", nominal zakat/bulan.
- **Mini Dashboard Harga Emas & Nisab** (baru): Harga Emas Antam per gram saat ini (+ % perubahan hari ini), Nisab (85 gram, dikonversi ke Rupiah), status nisab investor pribadi (aset saat ini vs ambang nisab), mini chart tren harga emas dengan toggle periode `1B` `3B` `6B` `1T`, disclaimer "Sumber data: ilustrasi · update harian".

**Data dummy diperlukan:** `data/zakat.json` (status nisab, haul, riwayat, breakdown per properti, histori harga emas dummy per periode).

---

### 6.9 AI Assistant (Chat + Video Edukasi, gaya PINA)
**Tujuan:** Asisten edukatif interaktif untuk panduan investasi dan literasi fikih muamalah, diakses via floating button di semua halaman User.

**Komponen:**
- Header panel: avatar AI + nama asisten + status "● Online" + deskripsi singkat peran (navigator edukatif investasi & fikih muamalah).
- **Chat area:** bubble AI (kiri, avatar + background netral) dan bubble user (kanan, background gold), input field "Ketik pertanyaan Anda...", tombol kirim.
- Preset scripted conversation / simple keyword-matching (bukan LLM nyata untuk prototype): pertanyaan umum seperti "Apa itu haul dalam zakat?", "Properti mana yang cocok untuk pemula?" → jawaban terstruktur & edukatif.
- **Library Video Edukasi** (baru, di bawah chat atau tab terpisah): grid/list card video, tiap card: thumbnail, judul, sumber ("PINA AI"-style/"PROPIN Edu"), durasi, level (`Pemula` / `Menengah` / `Lanjutan`), badge status (`POPULER` / `BARU` / `SELESAI` — SELESAI menandakan video yang sudah ditonton user, dummy state).
- Klik video → modal/player placeholder (video sungguhan opsional out-of-scope, cukup UI player dummy).

**Catatan Enhancement (opsional, fase depan):** bisa disambungkan ke Claude API sungguhan bila prototype ingin didemokan sebagai "live AI", tapi ini di luar scope awal.

**Data dummy diperlukan:** `data/aiChat.json` (preset Q&A), `data/eduVideos.json` (daftar video: judul, durasi, level, badge, thumbnail).

---

### 6.10 Dampak Investasi (Impact Dashboard) — Modul Tambahan
**Tujuan:** Menampilkan dampak sosial/ekonomi/lingkungan dari investasi kolektif platform.

**Komponen:**
- Grid metric: Investor Aktif, Properti Dibiayai, Dana Terkumpul, Lapangan Kerja Tercipta, CO₂ Terserap, dsb (6 metric card).
- Maqashid Syariah Impact Score: skor besar (4,9/5) + label ("Sangat Baik") + progress bar.
- Badge SDG (Sustainable Development Goals) — grid ikon bernomor sesuai standar PBB.

---

### 6.11 Laporan & Transparansi (On-Chain Report) — Modul Tambahan
**Tujuan:** Laporan performa & transaksi yang bisa diunduh, meningkatkan trust.

**Komponen:**
- Tab: Kinerja / Transaksi / Distribusi.
- Ringkasan Kinerja: Total Return, Imbal Hasil Rata-rata.
- Grafik Kinerja (line chart bulanan) dengan badge % return.
- CTA "Unduh Laporan" (untuk prototype: `window.print()` atau toast "Fitur unduh laporan (simulasi)").

---

### 6.12 Pengaturan
**Tujuan:** Kelola profil, keamanan akun, dan persetujuan Syarat & Ketentuan.

**Komponen:**
- **Akun:** upload foto profil (preview lokal, tanpa upload sungguhan), Nama Panjang, Username, Email, Nomor Telepon (+62), tombol "Simpan Perubahan" / "Reset".
- **Login & Keamanan:** Kata Sandi Lama, Kata Sandi Baru, Konfirmasi Kata Sandi Baru, toggle Autentikasi Dua Faktor (2FA) — dummy, tanpa OTP sungguhan.
- **Syarat & Ketentuan:** checklist beberapa poin (platform tokenisasi RWA, prinsip syariah/fiqih muamalah, risiko investasi, Auto Zakat 2,5%, penyaluran via lembaga resmi, kebijakan privasi) + checkbox master "Saya setuju dengan semua syarat & ketentuan" + tombol "Batal" / "Saya Setuju".
- Menu "Lainnya" (link cepat ke modul tambahan): Dampak Investasi, Laporan & Transparansi.
- Tombol "Logout" dengan modal konfirmasi ("Apakah Anda yakin ingin keluar dari akun?").

---

## 7. Spesifikasi Fitur Detail — Sisi Admin

> Seluruh halaman Admin berada di bawah namespace route `/admin/*` dan dilindungi route guard berbasis role. Layout memakai Sidebar Admin (Bagian 5.4) yang terpisah total dari layout User — lihat `design.md` Bagian 11 untuk pola visual.

### 7.1 Dashboard Admin
**Tujuan:** Ringkasan kesehatan platform secara keseluruhan (bukan per-investor).

**Komponen:**
- 4 metric card platform-wide: **Total Investor** (+ growth bulan ini), **Total Properti Ter-tokenisasi** (+ jumlah baru bulan ini), **Total Dana Terkumpul** (Rp, seluruh platform), **Total Zakat Tersalurkan** (Rp, seluruh platform).
- Grafik pertumbuhan platform (line/bar chart bulanan: dana masuk & jumlah investor baru).
- List ringkas "Properti Perlu Perhatian" (token hampir habis / belum terisi) dan "Investor Menunggu Verifikasi KYC" (quick-link ke Manajemen Investor).

---

### 7.2 Manajemen Properti
**Tujuan:** Kelola listing properti yang tersedia untuk tokenisasi.

**Komponen:**
- Tabel properti: foto kecil, nama, lokasi, jumlah token, harga/token, status tokenisasi (Aktif/Draft/Selesai Terjual), aksi (Edit/Nonaktifkan).
- Search & filter (lokasi, status).
- Tombol "+ Tambah Properti" → **form dummy** (nama, lokasi, deskripsi, upload foto/preview lokal, jumlah token, harga/token, ERY, spesifikasi kamar/kamar mandi/luas) → simpan ke state lokal (opsional persist `localStorage`) → properti baru muncul di tabel & di Marketplace User (dalam sesi yang sama).
- Edit properti membuka form yang sama pra-terisi data existing.
- Toggle status tokenisasi (Aktif ⇄ Nonaktif) langsung dari tabel.

**Edge case yang harus ditangani:**
- Properti yang **sudah punya token terjual ke investor (>0 token terisi)** tidak boleh langsung dihapus — tombol "Hapus" berubah jadi disabled dengan tooltip "Tidak bisa dihapus, sudah ada investor. Nonaktifkan saja." Properti tanpa token terjual boleh dihapus dengan modal konfirmasi.
- Field jumlah token & harga/token wajib angka positif; submit dengan nilai kosong/negatif menampilkan error inline di bawah field (lihat design.md 11.6), tombol submit tetap disabled sampai valid.
- Properti berstatus "Nonaktif" tidak muncul di Marketplace User maupun Kalkulator Investasi, tapi tetap tampil di tabel Admin (dengan badge redup) dan tetap muncul untuk investor yang **sudah** memiliki token di properti itu.

---

### 7.3 Manajemen Investor
**Tujuan:** Kelola data investor & proses verifikasi KYC.

**Komponen:**
- Tabel investor: nama, email, status KYC (badge: `Menunggu` / `Terverifikasi` / `Ditolak`), total portofolio, tanggal daftar, aksi (Lihat Detail).
- Search & filter by status KYC.
- **Detail Investor** (drawer/modal atau halaman terpisah): data profil, dokumen KYC (placeholder), riwayat transaksi ringkas, tombol "Approve" / "Reject" untuk investor berstatus Menunggu (dummy, mengubah status di state lokal + toast konfirmasi).

**Edge case yang harus ditangani:**
- Investor berstatus `Ditolak` tidak bisa melakukan "Beli Token" di sisi User (tombol "Beli Token" disabled + badge "Verifikasi ditolak, hubungi support" bila mereka login) — mendemokan bahwa status admin **benar-benar berdampak** ke pengalaman user, bukan sekadar label kosmetik.
- Tombol "Approve"/"Reject" hanya tampil untuk status `Menunggu`; investor yang sudah `Terverifikasi`/`Ditolak` menampilkan tombol "Ubah Status" sebagai override manual (dengan modal konfirmasi tambahan, karena ini aksi yang lebih sensitif).
- Jika dokumen KYC placeholder tidak "diunggah" (data dummy kosong), tampilkan empty state di area dokumen: ikon dokumen redup + teks "Dokumen belum tersedia" — bukan area kosong tanpa penjelasan.

---

### 7.4 Monitoring Transaksi
**Tujuan:** Visibilitas seluruh transaksi platform (lintas investor), bukan hanya milik satu user seperti di sisi User.

**Komponen:**
- Tabel transaksi platform-wide: investor, jenis transaksi (Beli Token/Zakat/Distribusi Sewa/Top Up/Withdraw), properti terkait, nominal, status smart contract (badge: Pending/Executed/Failed), tanggal.
- Filter: rentang tanggal, jenis transaksi, status.
- Klik baris → detail transaksi (reuse pola timeline Smart Contract dari Bagian 6.6, versi read-only untuk admin).

---

### 7.5 Monitoring Auto Zakat
**Tujuan:** Visibilitas total zakat platform-wide & distribusinya ke lembaga.

**Komponen:**
- Ringkasan: Total Zakat Tersalurkan (seluruh platform, tahun berjalan), jumlah investor kontributor, breakdown per lembaga penyalur (mis. BAZNAS, Rumah Zakat).
- Grafik zakat tersalurkan per bulan.
- Tabel riwayat penyaluran: tanggal, lembaga, nominal, jumlah investor terkait.
- Tombol "Unduh Laporan Zakat Platform" (dummy/`window.print()`).

---

### 7.6 Pengaturan Admin
**Tujuan:** Profil & keamanan akun admin.

**Komponen:**
- Sama secara pola dengan Pengaturan User (Bagian 6.12) versi ringkas: foto profil, nama, email, ganti password, 2FA.
- Tanpa bagian Syarat & Ketentuan investor (tidak relevan untuk admin).
- Tombol "Logout" dengan modal konfirmasi yang sama.

---

## 8. Landing / Marketing Section (Layar Pembuka)

Untuk keperluan demo/pitching, prototype punya 1 landing page publik sebelum masuk ke Login/App, terdiri dari:

1. **Header** — Logo PROPIN, nav marketing (Beranda, Marketplace, AI Assistant, Tentang Kami — tautan scroll/anchor untuk prototype), tombol "Masuk" & "Daftar" (→ Bagian 6.1).
2. **Hero Section** — Tagline "Satu Token, Satu Kepemilikan", judul besar, deskripsi singkat AI Assistant + literasi fikih muamalah, ilustrasi rumah, CTA "Mulai Investasi" → Register/Login.
3. **Keunggulan PROPIN** (3 kartu, mengikuti referensi):
   - AI Assistant — navigator edukatif berbasis NLP untuk panduan investasi & edukasi fikih muamalah.
   - Auto Zakat 2,5% — purifikasi otomatis via Smart Contract saat mencapai nisab & haul.
   - Kepemilikan Aset Nyata — tokenisasi RWA yang didukung aset properti fisik produktif & halal.
4. **Cara Kerja** (4 langkah, horizontal stepper di desktop / vertical di mobile):
   Daftar & Verifikasi → Pilih Properti → Beli Token → Terima Hasil.
5. **Kalkulator Investasi** (baru) — simulasi interaktif murni frontend:
   - Pilih properti (dropdown, menampilkan ERY masing-masing).
   - Input Jumlah Investasi (Rp) → otomatis mengonversi ke jumlah token (1 token = Rp10.000).
   - Pilih Jangka Waktu (1/3/5 Tahun) — tab pill.
   - Tampilkan ERY aktif berdasarkan properti terpilih.
   - Output proyeksi (4 card hasil): Estimasi Imbal Hasil, Auto Zakat (2,5%, nominal), Pendapatan Bersih (setelah zakat), Total Aset (modal + bersih).
   - Disclaimer: "Kalkulator ini hanya untuk ilustrasi. Imbal hasil aktual dapat berbeda. 1 token = Rp10.000."
   - CTA "Mulai Investasi Sekarang" → Register/Login.
6. **CTA Penutup** — ajakan bergabung + tombol "Daftar Gratis Sekarang".
7. **Disclaimer Prototype** (wajib, footer landing) — baris kecil namun jelas terbaca: *"PROPIN adalah prototype untuk keperluan demonstrasi & pitching, bukan produk investasi final yang beroperasi. Seluruh data properti, angka return, dan mitra (termasuk BAZNAS) bersifat ilustratif."* Ini penting agar tidak disalahartikan sebagai penawaran investasi nyata saat didemokan ke calon mitra/investor sungguhan.

---

## 9. Responsive Behavior

| Aspek | Mobile (< 768px) | Desktop (≥ 1024px) |
|---|---|---|
| Layout dasar (User) | Single column, mirip native app | Multi-kolom / dashboard grid |
| Layout dasar (Admin) | Sidebar collapse jadi drawer/hamburger, tabel scroll horizontal | Sidebar tetap + area tabel/form lega (desktop-first) |
| Navigasi utama (User) | Bottom navigation bar (5 item, fixed) | Sidebar kiri (fixed, collapsible) + topbar |
| Navigasi utama (Admin) | Hamburger → drawer sidebar | Sidebar kiri fixed (struktur berbeda dari User) |
| Frame konten | Full-width, mengikuti pola phone-frame pada showcase/landing | Konten dalam container max-width dengan card-based grid |
| Chart | Full-width, ringkas | Bisa lebih besar & detail, sering berdampingan dengan panel lain |
| Modal/Detail page | Full-screen page transition | Bisa berupa modal/drawer di atas dashboard, atau tetap full page |
| AI Assistant | Full-screen chat page | Panel chat mengambang (floating widget) di kanan bawah |
| Font size | Basis 14–16px | Basis 16px, heading lebih besar |

**Breakpoint (Tailwind default):** `sm:640px` `md:768px` `lg:1024px` `xl:1280px`

---

## 10. Alur End-to-End (User Flow Utama)

### 10.1 Alur Investor (User)
```
Landing Page
   ↓ "Mulai Investasi" / "Daftar"
Register / Login (role: user)
   ↓
Dashboard
   ↓ klik "Marketplace" / "+ Tambah Investasi"
Marketplace Properti
   ↓ pilih properti
Detail Tokenisasi
   ↓ input nominal → "Beli Token"
[Loading Simulasi ~1.5s]
   ↓
Detail Transaksi (Smart Contract) — animasi step-by-step
   ↓ selesai
Toast/Notifikasi sukses → redirect ke Dompet & Transaksi (token baru muncul di "Token Saya")
   ↓ opsional
Sertifikat Kepemilikan (NFT)
```
Alur sekunder: Dompet & Transaksi ↔ Auto Zakat (badge notifikasi bila nisab tercapai) — AI Assistant dapat diakses kapan saja via floating button — Pengaturan dapat diakses kapan saja via bottom nav.

### 10.2 Alur Admin
```
Landing Page
   ↓ "Masuk"
Login (role: admin, terdeteksi dari email)
   ↓
Dashboard Admin
   ↓ klik "Manajemen Properti"
Manajemen Properti → "+ Tambah Properti" → form dummy → simpan
   ↓ (properti baru tampil di Marketplace User pada sesi yang sama)
Manajemen Investor → lihat investor "Menunggu" → buka detail → "Approve"
   ↓
Monitoring Transaksi / Monitoring Auto Zakat → cek data platform-wide
```

---

## 11. Non-Functional Requirements (untuk Prototype)

- **Performance:** Load instan, tanpa network delay signifikan (semua data lokal). Simulasi delay hanya digunakan untuk efek UX (loading transaksi, submit auth), bukan karena network nyata.
- **Aksesibilitas dasar:** Kontras warna teks memenuhi WCAG AA (perlu diperhatikan khusus karena gold di atas putih rawan kontras rendah — lihat `design.md`).
- **Kompatibilitas:** Chrome, Safari, Edge terbaru; mobile Safari & Chrome Android. Admin Panel diutamakan untuk Chrome/Edge desktop.
- **Tanpa persistensi data nyata** — refresh halaman User boleh reset ke state awal (acceptable untuk prototype), **kecuali** state Auth (role login) dan data yang diinput Admin (properti/investor baru) yang disimpan sementara di `localStorage` agar demo tetap konsisten selama sesi presentasi.
- **Keamanan (level prototype):** route guard berbasis role hanya untuk mencegah navigasi tidak sengaja saat demo — bukan pengaman keamanan sungguhan, dan tidak boleh diasumsikan aman untuk data nyata.

---

## 12. Rencana Pengerjaan (Part-Based Delivery)

Scope v2.0 lebih besar dari v1.1 (menambah Auth, Admin Panel, Kalkulator, video edukasi), sehingga rencana pengerjaan diperluas dari 8 menjadi **11 Part berurutan**. Setiap Part = satu unit kerja yang lengkap (command + code), harus bisa dijalankan & dicek di local sebelum lanjut ke Part berikutnya, lalu di-commit ke Git.

| Part | Cakupan | Output yang Bisa Dicek di Browser |
|---|---|---|
| **1** | Inisialisasi project Vite + React, install & konfigurasi **Tailwind v3**, setup struktur folder awal (termasuk pemisahan folder `user/` & `admin/` di level halaman/komponen), `.gitignore`, commit pertama ke repo `azizbinsam/propin` | Halaman default Vite tampil dengan Tailwind aktif |
| **2** | Terapkan **design token** dari `design.md` ke `tailwind.config.js`, install dependency (`react-router-dom`, `lucide-react`, `recharts`, `qrcode.react`), buat komponen dasar: `Button`, `Card`, `Badge`, `ProgressBar`, `Input`, `Select`, `Checkbox`, `Table`, `Chip/Tab Pill` | Halaman showcase komponen (styleguide) menampilkan seluruh warna & komponen dasar termasuk komponen form/tabel |
| **3** | Bangun `AuthContext` (role dummy + localStorage), halaman **Login** & **Register**, route guard sederhana; bangun layout **MobileLayout** & **DesktopLayout** (User, bottom nav / sidebar), serta **AdminLayout** (sidebar admin terpisah); setup seluruh route kosong (placeholder) sesuai sitemap Bagian 5.6 | Login dengan 2 akun dummy berhasil redirect ke layout User atau Admin yang berbeda; navigasi antar semua halaman placeholder berjalan |
| **4** | Bangun **Landing Page** (Hero, Keunggulan, Cara Kerja) + **Kalkulator Investasi** interaktif dengan data dummy dari `src/data/` | Landing page tampil lengkap, kalkulator menghitung proyeksi secara real-time, siap di-push & dicek di Vercel |
| **5** | Bangun **Dashboard User** + **Marketplace Properti** + **Detail Properti & Tokenisasi (Beli Token)** | Alur "lihat dashboard → pilih properti → isi nominal beli" bisa didemokan |
| **6** | Bangun **Detail Transaksi (Smart Contract)** dengan animasi step + **Dompet & Transaksi** (gabungan wallet, chart pertumbuhan saldo, riwayat transaksi) | Alur "beli token → smart contract → muncul di Dompet & Transaksi" bisa didemokan end-to-end |
| **7** | Bangun **Auto Zakat** (+ mini dashboard emas/nisab) + **Sertifikat Kepemilikan (NFT + QR)** | Token hasil pembelian dari Part 6 terhubung ke sertifikat & data zakat |
| **8** | Bangun **AI Assistant** (chat + library video edukasi) + **Dampak Investasi (Impact Dashboard)** + **Laporan & Transparansi** + **Pengaturan User** | Seluruh modul sisi User (10 modul + Auth) sudah lengkap dan bisa dinavigasi |
| **9** | Bangun **Dashboard Admin** + **Manajemen Properti** (tabel + form tambah/edit dummy) + **Manajemen Investor** (tabel + approve/reject KYC dummy) | Admin bisa login, melihat metrik platform, menambah properti baru (muncul di Marketplace User), dan approve investor |
| **10** | Bangun **Monitoring Transaksi** + **Monitoring Auto Zakat** + **Pengaturan Admin** | Seluruh modul sisi Admin lengkap dan bisa dinavigasi |
| **11** | **Polish & QA**: responsive fine-tuning mobile↔desktop↔admin, motion/animasi sesuai `design.md`, perbandingan visual dengan referensi HALPIN, `vercel.json` untuk SPA routing, final push & verifikasi production di Vercel | Prototype final (User + Admin) siap didemokan dari URL Vercel |

> Part 1 dikerjakan terlebih dahulu di percakapan berikutnya, lengkap dengan seluruh command terminal dan isi file yang perlu dibuat/diedit.

### 12.1 QA Checklist per Part

Setiap Part dianggap **selesai** hanya jika seluruh poin checklist berikut terpenuhi di browser lokal, sebelum commit & push:

| Part | Checklist |
|---|---|
| **1–2** | ☐ Tailwind aktif dengan token warna custom (bukan warna default Tailwind) ☐ Semua komponen dasar (Button, Card, Badge, ProgressBar, Input, Select, Checkbox, Table, Chip) tampil benar di halaman showcase ☐ Tidak ada warning console terkait Tailwind config |
| **3** | ☐ Login dengan `admin@propin.id` → masuk ke layout Admin ☐ Login dengan email lain → masuk ke layout User ☐ Refresh halaman tetap login (localStorage bekerja) ☐ Akses `/admin/*` tanpa login → redirect ke `/login` (5.5) ☐ Akses `/admin/*` sebagai User → redirect + toast sesuai 5.5 |
| **4** | ☐ Kalkulator menghitung ulang otomatis saat ganti properti/nominal/jangka waktu ☐ Input nominal kosong/0 tidak menyebabkan NaN tampil di hasil (fallback ke 0 atau disabled) ☐ Disclaimer & CTA tervalidasi terlihat di semua breakpoint |
| **5** | ☐ Data properti di Marketplace, Dashboard "Segera Habis", dan Kalkulator berasal dari `PropertiesContext` yang sama (ubah 1 data, konsisten di 3 tempat) ☐ Filter chip Marketplace berfungsi client-side ☐ Filter tanpa hasil menampilkan empty state (lihat Bagian 15) |
| **6** | ☐ Setelah "Beli Token", saldo & token di Dompet & Transaksi ter-update otomatis dari transaksi baru (bukan reload manual) ☐ Toggle periode chart (24H/7D/1M/1Y) mengubah data yang ditampilkan ☐ Riwayat transaksi kosong (user baru) menampilkan empty state |
| **7** | ☐ Status nisab di Auto Zakat konsisten dengan Total Asset di Dashboard/Dompet (sumber data sama, lihat 4.2) ☐ QR Code sertifikat ter-generate tanpa error ☐ Sertifikat hanya bisa diakses untuk token yang benar-benar dimiliki user aktif |
| **8** | ☐ AI chat merespons minimal 5 keyword berbeda tanpa error ☐ Pertanyaan di luar preset menampilkan fallback response yang sopan (bukan blank/error) ☐ Video edukasi menampilkan badge level & status dengan benar |
| **9** | ☐ Properti baru dari Admin langsung muncul di Marketplace User pada sesi yang sama ☐ Approve/Reject KYC mengubah pengalaman User terkait (lihat edge case 7.3) ☐ Properti dengan token terjual tidak bisa dihapus (lihat edge case 7.2) |
| **10** | ☐ Data Monitoring Transaksi & Zakat bersifat platform-wide (lintas semua user dummy), bukan cuma 1 user ☐ Filter tanggal/status berfungsi ☐ Unduh laporan (dummy) tidak menyebabkan error/crash |
| **11** | ☐ Dibandingkan langsung dengan referensi HALPIN, tidak ada modul inti yang hilang ☐ Semua halaman dicek di lebar mobile (375px), tablet (768px), desktop (1280px) ☐ Deploy Vercel production diakses dari device asli (bukan cuma localhost) tanpa error |

---

## 13. Kriteria Sukses Prototype

- Seluruh modul User & Admin dapat dinavigasi tanpa error di desktop & mobile (Admin diutamakan desktop).
- Login dengan 2 akun dummy berhasil mengarahkan ke pengalaman yang benar-benar berbeda (layout, menu, isi halaman) antara User dan Admin.
- Visual selaras dengan flow referensi HALPIN (struktur, hierarki informasi) namun tetap memakai branding gold+hijau PROPIN.
- Flow inti "Beli Token → Smart Contract → Dompet & Transaksi" terasa hidup (ada micro-interaction/animasi), karena ini yang paling menjual saat demo.
- Flow admin "Tambah Properti → muncul di Marketplace User" dan "Approve Investor" bisa didemokan sebagai bukti sistem dua-sisi yang saling terhubung.
- Dapat diakses & didemokan langsung dari browser (link deploy Vercel), tanpa setup backend apa pun oleh audiens demo.

---

## 14. Lampiran — Kebutuhan Mock Data

| File | Isi |
|---|---|
| `data/users.json` | Akun dummy (min. 1 user, 1 admin) dengan profil & role |
| `data/properties.json` | 8–10 properti dengan atribut lengkap (lokasi, spesifikasi, harga/token, ERY, token tersedia, status tokenisasi) |
| `data/portfolio.json` | Ringkasan portofolio & histori performa per investor |
| `data/transactions.json` | Riwayat transaksi (per-user & platform-wide) + status smart contract |
| `data/wallet.json` | Saldo, rekening bank, token dimiliki, histori pertumbuhan saldo per periode (24H/7D/1M/1Y) |
| `data/zakat.json` | Status nisab, haul, riwayat zakat per investor, breakdown per properti, histori harga emas per periode |
| `data/impact.json` | Metrik dampak sosial & SDG |
| `data/aiChat.json` | Preset Q&A untuk AI Assistant |
| `data/eduVideos.json` | Daftar video edukasi (judul, durasi, level, badge status, thumbnail) |
| `data/adminStats.json` | Metrik platform-wide untuk Dashboard Admin (total investor, dana terkumpul, dsb.) |
| `data/investorsAdmin.json` | Daftar investor untuk Manajemen Investor (status KYC, dsb.) |

---

## 15. State Kosong, Error & Edge Case — Matrix per Modul

Prototype yang meyakinkan bukan hanya yang "jalan saat happy path" — tapi juga tidak canggung saat data kosong/gagal saat didemokan langsung (klik-klik improvisasi di depan klien). Tabel ini melengkapi spesifikasi di Bagian 6–7 dengan state yang wajib disiapkan. Pola visual untuk empty/error state ada di `design.md` Bagian 11.11.

| Modul | Skenario | Perilaku yang Diharapkan |
|---|---|---|
| Login/Register | Email/password salah format atau kosong | Error inline di bawah field, tombol submit disabled sampai valid (5.5, design.md 11.2) |
| Login/Register | Email tidak cocok pola dummy manapun | Tetap diproses sebagai role User (default), bukan error — supaya siapa pun bisa coba demo tanpa harus tahu email persis |
| Dashboard | User baru belum punya token/properti | Card metric tetap tampil dengan nilai Rp0, section "Property Performance" diganti empty state "Belum ada properti dimiliki" + CTA "Mulai Investasi" ke Marketplace |
| Marketplace | Filter chip menghasilkan 0 properti | Empty state di tengah grid: ikon rumah outline redup + teks "Tidak ada properti untuk filter ini" + tombol "Reset Filter" |
| Marketplace | "Muat lebih banyak" sudah mencapai akhir data dummy | Tombol berubah jadi teks statis "Semua properti telah ditampilkan", bukan hilang tiba-tiba |
| Detail Tokenisasi | Input nominal melebihi token tersedia | Error inline "Melebihi token tersedia (maks. X token)", tombol "Beli Token" disabled |
| Detail Tokenisasi | Input nominal di bawah minimum (Rp100.000) | Error inline "Minimum investasi Rp100.000" |
| Dompet & Transaksi | User baru, belum ada transaksi | Chart pertumbuhan saldo tampil garis datar di Rp0 (bukan chart kosong/blank), riwayat transaksi menampilkan empty state "Belum ada transaksi" |
| Dompet & Transaksi | Klik "Withdraw" saldo tersedia Rp0 | Tombol disabled dengan tooltip "Saldo tidak mencukupi" |
| Auto Zakat | Nisab belum tercapai | Badge status berubah jadi netral "Belum Wajib Zakat" (bukan hijau "Terpenuhi"), progress bar menuju nisab tetap ditampilkan agar user paham berapa lagi yang dibutuhkan |
| AI Assistant | Pertanyaan tidak match keyword preset manapun | Fallback response ramah: "Maaf, saya belum punya jawaban untuk itu. Coba tanyakan soal properti, zakat, atau yield ya!" — bukan blank/silent |
| Sertifikat NFT | Diakses untuk token yang tidak dimiliki user (mis. lewat manipulasi URL) | Redirect ke Dompet & Transaksi + toast "Sertifikat tidak ditemukan" |
| Admin — Manajemen Properti | Tabel properti kosong (baru instalasi ulang dummy) | Empty state tabel: ilustrasi kecil + "Belum ada properti, mulai dengan menambahkan properti pertama" + tombol "+ Tambah Properti" |
| Admin — Manajemen Investor | Tidak ada investor dengan status "Menunggu" | Section "Investor Menunggu Verifikasi" di Dashboard Admin disembunyikan/diganti "Semua investor sudah diverifikasi ✓" (bukan card kosong) |
| Admin — Semua form | Submit form dengan field wajib kosong | Scroll otomatis ke field pertama yang error, border merah muted (`#C0392B`), tidak submit ke state |
| Admin — Semua tabel | Loading data (simulasi delay) | Skeleton row (bukan spinner penuh layar) — lihat design.md 11.11, supaya struktur tabel tetap terlihat saat memuat |
| Umum (semua modul) | Aksi dummy yang belum diimplementasi penuh (mis. Top Up, Withdraw, Unduh Laporan) | Selalu diakhiri toast informatif menyebutkan itu simulasi — **jangan pernah** tombol yang diklik tidak memberi respons visual apa pun |

---

*Dokumen ini adalah dasar perencanaan sebelum development dimulai. Implementasi dilakukan secara **lokal terlebih dahulu**, mengikuti urutan Part pada Bagian 12, dengan acuan visual dari `design.md`. Setiap Part di-commit & push ke [github.com/azizbinsam/propin](https://github.com/azizbinsam/propin), lalu otomatis ter-deploy ke Vercel untuk verifikasi.*
