import { useState } from 'react';
import { BookOpen, Video, FileText, Search, ExternalLink, Clock, Tag } from 'lucide-react';

export function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'guides'>('articles');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="text-cyan-500" size={32} />
          <h1 className="text-slate-900">Knowledge Center</h1>
        </div>
        <p className="text-gray-600">Tutorial, best practices, dan panduan lengkap untuk digitalisasi UMKM</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tutorial, artikel, atau panduan..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'articles'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <span>Artikel & Tutorial</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'videos'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Video size={18} />
            <span>Video Tutorial</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'guides'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>Panduan Lengkap</span>
          </div>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'articles' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard
            title="Cara Setup Automation Pertama Kali"
            description="Panduan langkah demi langkah membuat automation pertama untuk alert stok rendah via WhatsApp."
            category="Getting Started"
            readTime="5 menit"
            tags={['Automation', 'WhatsApp', 'Beginner']}
          />
          <ArticleCard
            title="Menghitung HPP dengan Benar"
            description="Tutorial menghitung Harga Pokok Penjualan (HPP) yang akurat untuk menentukan margin profit optimal."
            category="Finance"
            readTime="8 menit"
            tags={['HPP', 'Finance', 'Pricing']}
          />
          <ArticleCard
            title="Import Data dari Excel ke System"
            description="Cara mudah import data produk, penjualan, dan pembelian dari file Excel atau CSV ke platform."
            category="Data Management"
            readTime="6 menit"
            tags={['Import', 'Excel', 'CSV']}
          />
          <ArticleCard
            title="Membaca AI Insights untuk Keputusan Bisnis"
            description="Cara memahami dan menggunakan AI insights, forecasting, dan rekomendasi untuk mengambil keputusan."
            category="AI & Analytics"
            readTime="10 menit"
            tags={['AI', 'Analytics', 'Decision Making']}
          />
          <ArticleCard
            title="Best Practice Inventory Management"
            description="Tips dan trik mengelola inventory: safety stock, reorder point, ABC analysis untuk UMKM."
            category="Inventory"
            readTime="12 menit"
            tags={['Inventory', 'Best Practice', 'Management']}
          />
          <ArticleCard
            title="Integrasi WhatsApp Business API"
            description="Setup dan konfigurasi WhatsApp Business API untuk notifikasi otomatis ke supplier dan customer."
            category="Integration"
            readTime="7 menit"
            tags={['WhatsApp', 'Integration', 'API']}
          />
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VideoCard
            title="Setup Awal dalam 5 Menit"
            duration="5:32"
            thumbnail="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
            views="1.2k"
          />
          <VideoCard
            title="Demo Automation Builder"
            duration="8:45"
            thumbnail="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
            views="890"
          />
          <VideoCard
            title="Cara Baca Dashboard & KPI"
            duration="6:18"
            thumbnail="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
            views="750"
          />
          <VideoCard
            title="Generate Invoice Otomatis"
            duration="4:22"
            thumbnail="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80"
            views="620"
          />
          <VideoCard
            title="AI Forecasting untuk Stok"
            duration="10:15"
            thumbnail="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80"
            views="1.5k"
          />
          <VideoCard
            title="Tips Optimasi Cashflow UMKM"
            duration="12:30"
            thumbnail="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80"
            views="980"
          />
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="space-y-6">
          <GuideCard
            title="Panduan Lengkap: Digitalisasi UMKM dari Nol"
            description="Roadmap lengkap transformasi dari sistem manual ke digital, mulai dari mindset, proses, hingga implementasi teknologi."
            chapters={[
              'Mengapa UMKM Perlu Digital?',
              'Pemetaan Proses Bisnis Manual',
              'Memilih Tools yang Tepat',
              'Implementasi Bertahap',
              'Training Tim & Change Management',
              'Monitoring & Continuous Improvement'
            ]}
            difficulty="Beginner"
          />
          <GuideCard
            title="Complete ERP Implementation Guide"
            description="Step-by-step implementasi modul ERP: Inventory, Sales, Purchases, Finance untuk UMKM manufaktur."
            chapters={[
              'Setup Master Data (Produk, Supplier, Customer)',
              'Konfigurasi Inventory & Stock Management',
              'Sales Order & Invoice Automation',
              'Purchase Order & Vendor Management',
              'Finance Recording & Reporting',
              'Integration dengan Bank & Payment Gateway'
            ]}
            difficulty="Intermediate"
          />
          <GuideCard
            title="Advanced Automation Strategies"
            description="Strategi automation lanjutan untuk scale up bisnis: multi-channel, advanced workflows, custom integrations."
            chapters={[
              'Multi-channel Inventory Sync (Marketplace)',
              'Custom Workflow dengan Webhook',
              'Advanced Conditional Logic',
              'Integration dengan IoT Devices',
              'Custom API Development',
              'Scaling Automation Infrastructure'
            ]}
            difficulty="Advanced"
          />
        </div>
      )}

      {/* Popular Topics */}
      <div className="mt-12 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
        <h3 className="text-slate-900 mb-4">Topik Populer</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Automation',
            'Inventory Management',
            'AI Forecasting',
            'WhatsApp Integration',
            'HPP Calculator',
            'Cashflow Management',
            'Invoice Automation',
            'Google Sheets Sync',
            'Stock Alert',
            'Best Practices'
          ].map(topic => (
            <button 
              key={topic}
              className="px-4 py-2 bg-white border border-cyan-200 rounded-full text-sm text-gray-700 hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Help CTA */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h3 className="text-slate-900 mb-2">Butuh Bantuan Lebih Lanjut?</h3>
        <p className="text-gray-600 mb-6">Tim support kami siap membantu Anda 24/7</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            Chat dengan Support
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Jadwalkan Demo 1-on-1
          </button>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ 
  title, 
  description, 
  category, 
  readTime, 
  tags 
}: { 
  title: string; 
  description: string; 
  category: string; 
  readTime: string; 
  tags: string[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cyan-300 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">{category}</span>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock size={14} />
          <span>{readTime}</span>
        </div>
      </div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 text-gray-500 text-xs">
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>
      <button className="text-cyan-600 hover:text-cyan-700 text-sm flex items-center gap-1">
        Baca Artikel <ExternalLink size={14} />
      </button>
    </div>
  );
}

function VideoCard({ 
  title, 
  duration, 
  thumbnail, 
  views 
}: { 
  title: string; 
  duration: string; 
  thumbnail: string; 
  views: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-cyan-300 transition-colors cursor-pointer">
      <div className="relative h-48 bg-gray-200">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Video className="text-cyan-600 ml-1" size={32} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-2">{title}</h3>
        <div className="text-gray-500 text-sm">{views} views</div>
      </div>
    </div>
  );
}

function GuideCard({ 
  title, 
  description, 
  chapters, 
  difficulty 
}: { 
  title: string; 
  description: string; 
  chapters: string[]; 
  difficulty: string;
}) {
  const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-700',
    'Intermediate': 'bg-orange-100 text-orange-700',
    'Advanced': 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-gray-900">{title}</h3>
            <span className={`px-2 py-1 ${difficultyColors[difficulty]} text-xs rounded-full`}>
              {difficulty}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-sm text-gray-700 mb-2">Daftar Isi:</div>
        <div className="space-y-2">
          {chapters.map((chapter, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-cyan-500">{idx + 1}.</span>
              <span>{chapter}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
        Mulai Belajar
      </button>
    </div>
  );
}
