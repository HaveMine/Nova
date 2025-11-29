import { Factory, Zap, BarChart3, Brain, CheckCircle2, ArrowRight, Users, TrendingUp, Shield } from 'lucide-react';
import { Page } from '../App';

type LandingPageProps = {
  onNavigate: (page: Page) => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="104" height="38" viewBox="0 0 104 38" fill="none">
<path d="M67.4304 11.4545V26H64.7741L58.446 16.8452H58.3395V26H55.2642V11.4545H57.9631L64.2415 20.6023H64.3693V11.4545H67.4304ZM74.8434 26.2131C73.7402 26.2131 72.7861 25.9787 71.9812 25.5099C71.181 25.0365 70.5631 24.3783 70.1275 23.5355C69.6919 22.688 69.4741 21.7055 69.4741 20.5881C69.4741 19.4612 69.6919 18.4763 70.1275 17.6335C70.5631 16.786 71.181 16.1278 71.9812 15.6591C72.7861 15.1856 73.7402 14.9489 74.8434 14.9489C75.9466 14.9489 76.8983 15.1856 77.6985 15.6591C78.5034 16.1278 79.1237 16.786 79.5593 17.6335C79.9949 18.4763 80.2127 19.4612 80.2127 20.5881C80.2127 21.7055 79.9949 22.688 79.5593 23.5355C79.1237 24.3783 78.5034 25.0365 77.6985 25.5099C76.8983 25.9787 75.9466 26.2131 74.8434 26.2131ZM74.8576 23.8693C75.3595 23.8693 75.7785 23.7273 76.1147 23.4432C76.4509 23.1544 76.7042 22.7614 76.8746 22.2642C77.0498 21.767 77.1374 21.2012 77.1374 20.5668C77.1374 19.9323 77.0498 19.3665 76.8746 18.8693C76.7042 18.3722 76.4509 17.9792 76.1147 17.6903C75.7785 17.4015 75.3595 17.2571 74.8576 17.2571C74.351 17.2571 73.9248 17.4015 73.5792 17.6903C73.2383 17.9792 72.9802 18.3722 72.805 18.8693C72.6346 19.3665 72.5494 19.9323 72.5494 20.5668C72.5494 21.2012 72.6346 21.767 72.805 22.2642C72.9802 22.7614 73.2383 23.1544 73.5792 23.4432C73.9248 23.7273 74.351 23.8693 74.8576 23.8693ZM91.9989 15.0909L88.185 26H84.7759L80.962 15.0909H84.158L86.4237 22.8963H86.5373L88.7958 15.0909H91.9989ZM96.3651 26.206C95.669 26.206 95.0488 26.0852 94.5043 25.8438C93.9598 25.5975 93.5289 25.2353 93.2116 24.7571C92.8991 24.2741 92.7429 23.6728 92.7429 22.9531C92.7429 22.3471 92.8542 21.8381 93.0767 21.4261C93.2992 21.0142 93.6023 20.6828 93.9858 20.4318C94.3693 20.1809 94.8049 19.9915 95.2926 19.8636C95.785 19.7358 96.3011 19.6458 96.8409 19.5938C97.4754 19.5275 97.9867 19.4659 98.375 19.4091C98.7633 19.3475 99.045 19.2576 99.2202 19.1392C99.3954 19.0208 99.483 18.8456 99.483 18.6136V18.571C99.483 18.1212 99.3409 17.7732 99.0568 17.527C98.7775 17.2808 98.3797 17.1577 97.8636 17.1577C97.3191 17.1577 96.8859 17.2784 96.5639 17.5199C96.242 17.7566 96.0289 18.0549 95.9247 18.4148L93.1264 18.1875C93.2685 17.5246 93.5478 16.9517 93.9645 16.4688C94.3812 15.9811 94.9186 15.607 95.5767 15.3466C96.2396 15.0814 97.0066 14.9489 97.8778 14.9489C98.4839 14.9489 99.0639 15.0199 99.6179 15.1619C100.177 15.304 100.671 15.5241 101.102 15.8224C101.538 16.1207 101.881 16.5043 102.132 16.973C102.383 17.437 102.509 17.9934 102.509 18.642V26H99.6392V24.4872H99.554C99.3788 24.8281 99.1444 25.1288 98.8509 25.3892C98.5573 25.6449 98.2045 25.8461 97.7926 25.9929C97.3807 26.1349 96.9048 26.206 96.3651 26.206ZM97.2315 24.1179C97.6766 24.1179 98.0696 24.0303 98.4105 23.8551C98.7514 23.6752 99.0189 23.4337 99.2131 23.1307C99.4072 22.8277 99.5043 22.4844 99.5043 22.1009V20.9432C99.4096 21.0047 99.2794 21.0616 99.1136 21.1136C98.9527 21.161 98.7704 21.206 98.5668 21.2486C98.3632 21.2865 98.1596 21.322 97.956 21.3551C97.7524 21.3835 97.5677 21.4096 97.402 21.4332C97.0469 21.4853 96.7367 21.5682 96.4716 21.6818C96.2064 21.7955 96.0005 21.9493 95.8537 22.1435C95.7069 22.3329 95.6335 22.5696 95.6335 22.8537C95.6335 23.2656 95.7827 23.5805 96.081 23.7983C96.384 24.0114 96.7675 24.1179 97.2315 24.1179Z" fill="#00BCD4"></path>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(-0.869984 -0.49308 -0.49308 0.869984 48.5254 6.98407)" fill="url(#paint0_linear_1052_10)"></rect>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(0.869984 0.49308 0.49308 -0.869984 0 31.0159)" fill="url(#paint1_linear_1052_10)"></rect>
<rect x="9.93469" y="7.60089" width="14.1642" height="33.5443" rx="7.0821" transform="rotate(-29.5432 9.93469 7.60089)" fill="#215C5C"></rect>
<defs>
<linearGradient id="paint0_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="0.595" stop-color="#215C5C"></stop>
</linearGradient>
<linearGradient id="paint1_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="1" stop-color="#215C5C"></stop>
</linearGradient>
</defs>
</svg>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('login')}
              className="px-6 py-2 text-white hover:text-cyan-400 transition-colors"
            >
              Masuk
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="text-cyan-400">Industry 4.0 untuk UMKM Indonesia</span>
              </div>
              <h1 className="text-white mb-6">
                Otomatisasi Digital untuk UMKM Tanpa Ribet
              </h1>
              <p className="text-gray-300 mb-8 text-lg">
                Kelola inventory, produksi, dan keuangan UMKM Anda dengan sistem ERP sederhana. 
                Dilengkapi AI insights dan automation tanpa perlu keahlian coding.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => onNavigate('register')}
                  className="px-8 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                >
                  Mulai Gratis <ArrowRight size={20} />
                </button>
                
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-cyan-400">5.000+</div>
                  <div className="text-gray-400 text-sm">UMKM Terdaftar</div>
                </div>
                <div>
                  <div className="text-cyan-400">95%</div>
                  <div className="text-gray-400 text-sm">Kepuasan User</div>
                </div>
                <div>
                  <div className="text-cyan-400">40%</div>
                  <div className="text-gray-400 text-sm">Efisiensi Meningkat</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30">
                <div className="bg-slate-800 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="text-cyan-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm">Penjualan Bulan Ini</div>
                      <div className="text-white">Rp 45.750.000</div>
                    </div>
                    <TrendingUp className="text-green-400" size={20} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Factory className="text-orange-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm">Stok Produk</div>
                      <div className="text-white">127 items</div>
                    </div>
                    <span className="text-orange-400 text-sm">3 alert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="text-purple-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm">Automation Aktif</div>
                      <div className="text-white">8 workflows</div>
                    </div>
                    <CheckCircle2 className="text-green-400" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Masalah yang Sering Dialami UMKM</h2>
            <p className="text-gray-300">Proses manual yang memakan waktu dan rawan error</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-400">📝</span>
              </div>
              <h3 className="text-white mb-2">Pencatatan Manual</h3>
              <p className="text-gray-400">Inventory dan keuangan masih dicatat di buku atau Excel yang berantakan</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-400">⚠️</span>
              </div>
              <h3 className="text-white mb-2">Stok Tidak Terkontrol</h3>
              <p className="text-gray-400">Sering kehabisan stok atau justru over-stock karena tidak ada monitoring</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-400">💰</span>
              </div>
              <h3 className="text-white mb-2">Laporan Keuangan Rumit</h3>
              <p className="text-gray-400">Sulit menghitung laba rugi dan HPP secara akurat dan cepat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Fitur Lengkap untuk Digitalisasi UMKM</h2>
            <p className="text-gray-300">Semua yang Anda butuhkan dalam satu platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Factory className="text-cyan-400" size={28} />}
              title="Simple ERP"
              description="Kelola inventory, penjualan, pembelian, dan produksi dalam satu sistem terintegrasi"
              features={['Inventory Management', 'Sales & Invoice', 'Purchase & HPP', 'Finance Tracking']}
            />
            <FeatureCard 
              icon={<Zap className="text-cyan-400" size={28} />}
              title="No-Code Automation"
              description="Buat automation tanpa coding: IF stok < 10 THEN kirim WhatsApp ke supplier"
              features={['Rule Builder IF-THEN', 'WhatsApp Integration', 'Auto Invoice', 'Template Siap Pakai']}
            />
            <FeatureCard 
              icon={<Brain className="text-cyan-400" size={28} />}
              title="AI Insights & Forecast"
              description="Prediksi penjualan, saran reorder stok, dan deteksi anomali otomatis"
              features={['Sales Forecasting', 'Stock Prediction', 'AI Chat Assistant', 'Smart Recommendations']}
            />
            <FeatureCard 
              icon={<BarChart3 className="text-cyan-400" size={28} />}
              title="Dashboard & Reports"
              description="Visualisasi data real-time dengan chart interaktif dan laporan otomatis"
              features={['KPI Dashboard', 'Interactive Charts', 'Export PDF/Excel', 'Custom Reports']}
            />
            <FeatureCard 
              icon={<Users className="text-cyan-400" size={28} />}
              title="Integration Hub"
              description="Integrasi mudah dengan WhatsApp, Google Sheets, dan tools lainnya"
              features={['WhatsApp API', 'Google Sheets Sync', 'Webhook Support', 'CSV Import/Export']}
            />
            
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Mudah Digunakan dalam 5 Langkah</h2>
            <p className="text-gray-300">Setup cepat tanpa perlu keahlian teknis</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            <StepCard number="1" title="Daftar Gratis" description="Buat akun dalam 2 menit" />
            <StepCard number="2" title="Import Data" description="Upload produk via CSV atau input manual" />
            <StepCard number="3" title="Setup Automation" description="Pilih template automation yang sesuai" />
            <StepCard number="4" title="Monitor Dashboard" description="Lihat insight dan rekomendasi AI" />
            <StepCard number="5" title="Scale Up" description="Tambah fitur sesuai kebutuhan bisnis" />
          </div>
        </div>
      </section>

     

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Dipercaya oleh UMKM di Seluruh Indonesia</h2>
            <p className="text-gray-300">Testimoni dari pengguna yang sudah merasakan manfaatnya</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Ibu Siti"
              company="Konveksi Berkah"
              text="Sebelumnya saya catat stok di buku, sering lupa dan salah hitung. Sekarang semua otomatis, bahkan ada notifikasi WhatsApp kalau stok mau habis!"
              rating={5}
            />
            <TestimonialCard 
              name="Pak Joko"
              company="UD Maju Makmur"
              text="AI-nya kasih saran kapan harus order bahan baku. Jadi nggak over-stock lagi. Hemat biaya 30% dalam 3 bulan!"
              rating={5}
            />
            <TestimonialCard 
              name="Mbak Rina"
              company="Toko Kue Laris"
              text="Invoice otomatis jadi, laporan keuangan langsung keluar. Waktu saya lebih banyak buat fokus jualan!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4">Siap Mulai Digitalisasi UMKM Anda?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Bergabung dengan ribuan UMKM yang sudah bertransformasi digital
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="px-10 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-lg"
          >
            Daftar Gratis Sekarang
          </button>
          <p className="text-gray-400 mt-4">Gratis selamanya • Tanpa kartu kredit • Setup 5 menit</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="104" height="38" viewBox="0 0 104 38" fill="none">
<path d="M67.4304 11.4545V26H64.7741L58.446 16.8452H58.3395V26H55.2642V11.4545H57.9631L64.2415 20.6023H64.3693V11.4545H67.4304ZM74.8434 26.2131C73.7402 26.2131 72.7861 25.9787 71.9812 25.5099C71.181 25.0365 70.5631 24.3783 70.1275 23.5355C69.6919 22.688 69.4741 21.7055 69.4741 20.5881C69.4741 19.4612 69.6919 18.4763 70.1275 17.6335C70.5631 16.786 71.181 16.1278 71.9812 15.6591C72.7861 15.1856 73.7402 14.9489 74.8434 14.9489C75.9466 14.9489 76.8983 15.1856 77.6985 15.6591C78.5034 16.1278 79.1237 16.786 79.5593 17.6335C79.9949 18.4763 80.2127 19.4612 80.2127 20.5881C80.2127 21.7055 79.9949 22.688 79.5593 23.5355C79.1237 24.3783 78.5034 25.0365 77.6985 25.5099C76.8983 25.9787 75.9466 26.2131 74.8434 26.2131ZM74.8576 23.8693C75.3595 23.8693 75.7785 23.7273 76.1147 23.4432C76.4509 23.1544 76.7042 22.7614 76.8746 22.2642C77.0498 21.767 77.1374 21.2012 77.1374 20.5668C77.1374 19.9323 77.0498 19.3665 76.8746 18.8693C76.7042 18.3722 76.4509 17.9792 76.1147 17.6903C75.7785 17.4015 75.3595 17.2571 74.8576 17.2571C74.351 17.2571 73.9248 17.4015 73.5792 17.6903C73.2383 17.9792 72.9802 18.3722 72.805 18.8693C72.6346 19.3665 72.5494 19.9323 72.5494 20.5668C72.5494 21.2012 72.6346 21.767 72.805 22.2642C72.9802 22.7614 73.2383 23.1544 73.5792 23.4432C73.9248 23.7273 74.351 23.8693 74.8576 23.8693ZM91.9989 15.0909L88.185 26H84.7759L80.962 15.0909H84.158L86.4237 22.8963H86.5373L88.7958 15.0909H91.9989ZM96.3651 26.206C95.669 26.206 95.0488 26.0852 94.5043 25.8438C93.9598 25.5975 93.5289 25.2353 93.2116 24.7571C92.8991 24.2741 92.7429 23.6728 92.7429 22.9531C92.7429 22.3471 92.8542 21.8381 93.0767 21.4261C93.2992 21.0142 93.6023 20.6828 93.9858 20.4318C94.3693 20.1809 94.8049 19.9915 95.2926 19.8636C95.785 19.7358 96.3011 19.6458 96.8409 19.5938C97.4754 19.5275 97.9867 19.4659 98.375 19.4091C98.7633 19.3475 99.045 19.2576 99.2202 19.1392C99.3954 19.0208 99.483 18.8456 99.483 18.6136V18.571C99.483 18.1212 99.3409 17.7732 99.0568 17.527C98.7775 17.2808 98.3797 17.1577 97.8636 17.1577C97.3191 17.1577 96.8859 17.2784 96.5639 17.5199C96.242 17.7566 96.0289 18.0549 95.9247 18.4148L93.1264 18.1875C93.2685 17.5246 93.5478 16.9517 93.9645 16.4688C94.3812 15.9811 94.9186 15.607 95.5767 15.3466C96.2396 15.0814 97.0066 14.9489 97.8778 14.9489C98.4839 14.9489 99.0639 15.0199 99.6179 15.1619C100.177 15.304 100.671 15.5241 101.102 15.8224C101.538 16.1207 101.881 16.5043 102.132 16.973C102.383 17.437 102.509 17.9934 102.509 18.642V26H99.6392V24.4872H99.554C99.3788 24.8281 99.1444 25.1288 98.8509 25.3892C98.5573 25.6449 98.2045 25.8461 97.7926 25.9929C97.3807 26.1349 96.9048 26.206 96.3651 26.206ZM97.2315 24.1179C97.6766 24.1179 98.0696 24.0303 98.4105 23.8551C98.7514 23.6752 99.0189 23.4337 99.2131 23.1307C99.4072 22.8277 99.5043 22.4844 99.5043 22.1009V20.9432C99.4096 21.0047 99.2794 21.0616 99.1136 21.1136C98.9527 21.161 98.7704 21.206 98.5668 21.2486C98.3632 21.2865 98.1596 21.322 97.956 21.3551C97.7524 21.3835 97.5677 21.4096 97.402 21.4332C97.0469 21.4853 96.7367 21.5682 96.4716 21.6818C96.2064 21.7955 96.0005 21.9493 95.8537 22.1435C95.7069 22.3329 95.6335 22.5696 95.6335 22.8537C95.6335 23.2656 95.7827 23.5805 96.081 23.7983C96.384 24.0114 96.7675 24.1179 97.2315 24.1179Z" fill="#00BCD4"></path>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(-0.869984 -0.49308 -0.49308 0.869984 48.5254 6.98407)" fill="url(#paint0_linear_1052_10)"></rect>
<rect width="14.1642" height="33.5443" rx="7.0821" transform="matrix(0.869984 0.49308 0.49308 -0.869984 0 31.0159)" fill="url(#paint1_linear_1052_10)"></rect>
<rect x="9.93469" y="7.60089" width="14.1642" height="33.5443" rx="7.0821" transform="rotate(-29.5432 9.93469 7.60089)" fill="#215C5C"></rect>
<defs>
<linearGradient id="paint0_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="0.595" stop-color="#215C5C"></stop>
</linearGradient>
<linearGradient id="paint1_linear_1052_10" x1="7.0821" y1="0" x2="7.0821" y2="33.5443" gradientUnits="userSpaceOnUse">
<stop stop-color="#215C5C" stop-opacity="0"></stop>
<stop offset="1" stop-color="#215C5C"></stop>
</linearGradient>
</defs>
</svg>
              </div>
              <p className="text-gray-400 text-sm">
                Platform digitalisasi untuk UMKM Indonesia menuju Industry 4.0
              </p>
            </div>
            <div>
              <div className="text-white mb-4">Produk</div>
              <div className="space-y-2 text-gray-400 text-sm">
                <div>Simple ERP</div>
                <div>Automation</div>
                <div>AI Insights</div>
                <div>Integrations</div>
              </div>
            </div>
            <div>
              <div className="text-white mb-4">Perusahaan</div>
              <div className="space-y-2 text-gray-400 text-sm">
                <div>Tentang Kami</div>
                <div>Blog</div>
                <div>Karir</div>
                <div>Kontak</div>
              </div>
            </div>
            <div>
              <div className="text-white mb-4">Support</div>
              <div className="space-y-2 text-gray-400 text-sm">
                <div>Help Center</div>
                <div>Tutorial</div>
                <div>API Docs</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Nova. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, features }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  features: string[];
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
      <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="text-cyan-400" size={16} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function PricingCard({ 
  name, 
  price, 
  period, 
  features, 
  buttonText,
  highlighted = false 
}: { 
  name: string; 
  price: string; 
  period: string; 
  features: string[]; 
  buttonText: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`p-8 rounded-xl border ${
      highlighted 
        ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500' 
        : 'bg-slate-800 border-slate-700'
    }`}>
      {highlighted && (
        <div className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm rounded-full mb-4">
          Paling Populer
        </div>
      )}
      <div className="text-white mb-2">{name}</div>
      <div className="mb-6">
        <span className="text-white">{price}</span>
        <span className="text-gray-400">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="text-cyan-400" size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg transition-colors ${
        highlighted 
          ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
          : 'border border-slate-600 text-white hover:border-cyan-500'
      }`}>
        {buttonText}
      </button>
    </div>
  );
}

function TestimonialCard({ name, company, text, rating }: { 
  name: string; 
  company: string; 
  text: string; 
  rating: number;
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
      </div>
      <p className="text-gray-300 mb-4">"{text}"</p>
      <div>
        <div className="text-white">{name}</div>
        <div className="text-gray-400 text-sm">{company}</div>
      </div>
    </div>
  );
}
