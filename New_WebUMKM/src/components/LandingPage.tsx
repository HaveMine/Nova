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
            <Factory className="text-cyan-400" size={32} />
            <span className="text-white">Nova</span>
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
                <Factory className="text-cyan-400" size={28} />
                <span className="text-white">AutoUMKM</span>
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
            © 2025 AutoUMKM. All rights reserved. Made with ❤️ for Indonesian SMEs
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
