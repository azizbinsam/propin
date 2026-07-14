import React, { useState } from 'react';

export default function ImpactReport() {
  // Mock data dampak sosial agregat dari portofolio investasi
  const impactMetrics = [
    { id: 1, label: "Tenaga Kerja Terserap", value: "142", unit: "Orang", icon: "👷‍♂️", desc: "Pekerja lokal yang diberdayakan dalam proyek konstruksi & pengelolaan." },
    { id: 2, label: "Fasilitas Umum Dibangun", value: "6", unit: "Unit", icon: "🕌", desc: "Renovasi masjid, pembangunan taman bermain, dan sarana air bersih." },
    { id: 3, label: "Pemberdayaan UMKM", value: "24", unit: "Mitra", icon: "🏪", desc: "Pelaku usaha lokal yang mendapat ruang usaha terintegrasi di area properti." },
    { id: 4, label: "Penerima Manfaat Zakat", value: "1,200+", unit: "Jiwa", icon: "🤝", desc: "Masyarakat prasejahtera sekitar proyek yang disalurkan zakat mal." }
  ];

  // Mock data detail kontribusi per properti
  const [propertyImpacts] = useState([
    {
      id: 1,
      name: "Ruko Premium Sudirman - Blok A",
      location: "Jakarta Pusat",
      localLabor: 45,
      umkmSupported: 8,
      communityProgram: "Pelatihan Wirausaha Digital RT/RW",
      status: "Aktif"
    },
    {
      id: 2,
      name: "Cluster Perumahan Halal As-Salam",
      location: "Bogor, Jawa Barat",
      localLabor: 72,
      umkmSupported: 12,
      communityProgram: "Pembangunan Sumur Bor & Balai Warga",
      status: "Aktif"
    },
    {
      id: 3,
      name: "Gudang Logistik Syariah Cikarang",
      location: "Bekasi, Jawa Barat",
      localLabor: 25,
      umkmSupported: 4,
      communityProgram: "Beasiswa Anak Yatim Lingkungan Sekitar",
      status: "Berjalan"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Laporan Dampak Sosial</h1>
        <p className="text-sm text-neutral-600">Pantau bagaimana kontribusi modal Anda melahirkan nilai manfaat yang berkelanjutan bagi masyarakat luas.</p>
      </div>

      <hr className="border-neutral-200" />

      {/* Grid Metrik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-3 shadow-sm hover:border-gold-300 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-2xl">{metric.icon}</span>
              <span className="inline-flex items-center text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-neutral-800 font-mono">{metric.value}</span>
                <span className="text-xs font-semibold text-neutral-500">{metric.unit}</span>
              </div>
              <p className="text-xs font-bold text-neutral-700 mt-0.5">{metric.label}</p>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{metric.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Laporan Proyek */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-800">Distribusi Manfaat per Proyek Investasi</h3>
          <p className="text-xs text-neutral-500">Transparansi data serapan sosial dari aset properti yang sedang berjalan di platform.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200/60">
                <th className="py-3.5 px-5">Nama Properti</th>
                <th className="py-3.5 px-4">Tenaga Kerja</th>
                <th className="py-3.5 px-4">Mitra UMKM</th>
                <th className="py-3.5 px-4">Program Pemberdayaan Komunitas</th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-neutral-100 text-neutral-700">
              {propertyImpacts.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-neutral-800">{item.name}</div>
                    <div className="text-[10px] text-neutral-500">{item.location}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium">{item.localLabor} Orang</td>
                  <td className="py-4 px-4 font-mono font-medium">{item.umkmSupported} Lapak</td>
                  <td className="py-4 px-4 text-neutral-600 font-medium">{item.communityProgram}</td>
                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200/60">
                      <span className="w-1 h-1 rounded-full bg-green-600"></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filosofi & Kutipan Syariah */}
      <div className="bg-neutral-800 text-white rounded-2xl p-5 border border-neutral-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 max-w-2xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Prinsip Fikih Muamalah</h4>
          <p className="text-sm font-light italic leading-relaxed text-neutral-200">
            "Investasi dalam Islam tidak melulu mencari return finansial belaka, tetapi wajib melahirkan kemaslahatan bersama (Maslahah Mursalah) dan mencegah mudarat di lingkungan sekitar."
          </p>
        </div>
        <div className="bg-neutral-700 px-4 py-2 rounded-xl text-center self-stretch md:self-auto flex flex-col justify-center border border-neutral-600">
          <span className="text-[10px] text-neutral-400 font-medium">Nilai Keberkahan</span>
          <span className="text-base font-bold text-gold-400 font-brand">100% Berdampak</span>
        </div>
      </div>
    </div>
  );
}