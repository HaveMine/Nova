import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Wallet, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, Page } from '../App';
import { useData } from '../lib/dataContext';

type DashboardProps = {
  user: User;
  onNavigate: (page: Page) => void;
};

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const { products, sales, finances, automations } = useData();

  const lowStockProducts = products.filter(p => p.stock < p.minimumStock);
  const activeAutomations = automations.filter(a => a.active);
  const stockLowAutomationActive = automations.some(a => a.name === 'Alert Stok Kurang' && a.active);
  
  // Calculate real KPIs
  const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalIncome = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
  const netProfit = totalIncome - totalExpense;

  // Generate sales chart data for last 6 months
  const salesChartData = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = date.toLocaleDateString('id-ID', { month: 'short' });
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      const monthSales = sales.filter(s => s.date.startsWith(yearMonth));
      const total = monthSales.reduce((sum, s) => sum + s.totalAmount, 0);
      
      data.push({ month: monthStr, sales: total });
    }
    return data;
  }, [sales]);

  // Get top products
  const topProductsData = useMemo(() => {
    const productSales: Record<string, { name: string; sales: number; revenue: number }> = {};
    
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { name: item.productName, sales: 0, revenue: 0 };
        }
        productSales[item.productId].sales += item.qty;
        productSales[item.productId].revenue += item.qty * item.price;
      });
    });

    return Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [sales]);

  // Calculate category distribution
  const categoryDistribution = useMemo(() => {
    const categories: Record<string, number> = {};
    products.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    const total = products.length;
    return Object.entries(categories).map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100)
    }));
  }, [products]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang kembali, {user.name}! Berikut ringkasan bisnis Anda.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Penjualan"
          value={`Rp ${totalSales.toLocaleString('id-ID')}`}
          subtitle={`${sales.length} transaksi`}
          trend="up"
          icon={<ShoppingCart className="text-cyan-500" size={24} />}
        />
        <KPICard 
          title="Total Produk"
          value={products.length.toString()}
          subtitle={`${lowStockProducts.length} stok rendah`}
          trend={lowStockProducts.length > 0 ? "warning" : "neutral"}
          icon={<Package className="text-orange-500" size={24} />}
        />
        <KPICard 
          title="Laba Bersih"
          value={`Rp ${netProfit.toLocaleString('id-ID')}`}
          subtitle={netProfit >= 0 ? 'Profit' : 'Loss'}
          trend={netProfit >= 0 ? "up" : "down"}
          icon={<Wallet className="text-purple-500" size={24} />}
        />
        <KPICard 
          title="Automation Aktif"
          value={activeAutomations.length.toString()}
          subtitle={`${automations.length} workflows`}
          trend="neutral"
          icon={<Zap className="text-green-500" size={24} />}
        />
      </div>

      {/* Alerts */}
      {lowStockProducts.length > 0 && stockLowAutomationActive && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-orange-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Peringatan Stok Rendah</h3>
              <p className="text-gray-600 mb-3">
                {lowStockProducts.length} produk memiliki stok di bawah minimum. Segera lakukan reorder.
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockProducts.map(product => (
                  <span key={product.id} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">
                    {product.name}: {product.stock} {product.unit}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              Lihat Detail <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-600">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 mb-2">AI Insights & Rekomendasi</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">•</span>
                <p>Prediksi penjualan bulan depan: <strong>Rp 5.2 juta</strong> (+10%). Siapkan stok Kaos Cotton dan Sepatu Sneakers.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">•</span>
                <p>Produk "Sabuk Kulit Asli" akan habis dalam <strong>5 hari</strong>. Rekomendasi order: 20 pcs (lead time 7 hari).</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">•</span>
                <p>Cashflow negatif bulan ini karena pembelian besar. Pertimbangkan perpanjang kredit supplier atau percepat collection.</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('ai-insights')}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
          >
            Lihat Semua <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-slate-900 mb-4">Tren Penjualan 6 Bulan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
              />
              <Line type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-slate-900 mb-4">Produk Terlaris</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => `${value.toLocaleString('id-ID')} pcs`}
              />
              <Bar dataKey="sales" fill="#06b6d4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-slate-900 mb-4">Distribusi Kategori</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#06b6d4', '#f97316', '#8b5cf6'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-slate-900 mb-4">Statistik Cepat</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <StatItem label="Rata-rata Penjualan Harian" value="Rp 156.000" />
            <StatItem label="Total Produk Terjual Bulan Ini" value="412 pcs" />
            <StatItem label="Nilai Inventory Saat Ini" value="Rp 12.450.000" />
            <StatItem label="Customer Repeat Order" value="23 customer" />
            <StatItem label="Automation Runs (30 hari)" value={`${automations.filter(a => a.active).length * 10} executions`} />
            <StatItem label="Waktu Hemat (estimasi)" value="~18 jam/bulan" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ 
  title, 
  value, 
  change, 
  subtitle,
  trend, 
  icon 
}: { 
  title: string; 
  value: string; 
  change?: string;
  subtitle?: string;
  trend: 'up' | 'down' | 'warning' | 'neutral'; 
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-600 text-sm">{title}</div>
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-slate-900 mb-2">{value}</div>
      {change && (
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {trend === 'up' && <TrendingUp size={16} />}
          {trend === 'down' && <TrendingDown size={16} />}
          <span>{change}</span>
        </div>
      )}
      {subtitle && (
        <div className={`text-sm ${trend === 'warning' ? 'text-orange-600' : 'text-gray-600'}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="text-gray-600 text-sm mb-1">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}
