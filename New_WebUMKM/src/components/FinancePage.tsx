import { useState, useMemo } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, X, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../lib/dataContext';
import { Finance } from '../lib/mockData';

type ChartPeriod = '1-month' | '6-months' | '1-year';

export function FinancePage() {
  const { finances, addFinance, deleteFinance } = useData();
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('6-months');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: ''
  });

  const filteredFinances = filterType === 'all' 
    ? finances 
    : finances.filter(f => f.type === filterType);

  const totalIncome = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
  const netProfit = totalIncome - totalExpense;

  // Generate chart data based on period
  const chartData = useMemo(() => {
    const now = new Date();
    const data: Array<{ period: string; income: number; expense: number; net: number }> = [];

    if (chartPeriod === '1-month') {
      // Show daily data for selected month
      const year = now.getFullYear();
      const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayFinances = finances.filter(f => f.date === dateStr);
        const income = dayFinances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
        const expense = dayFinances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
        
        data.push({
          period: `${day}`,
          income,
          expense,
          net: income - expense
        });
      }
    } else if (chartPeriod === '6-months') {
      // Show monthly data for last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStr = date.toLocaleDateString('id-ID', { month: 'short' });
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        const monthFinances = finances.filter(f => f.date.startsWith(yearMonth));
        const income = monthFinances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
        const expense = monthFinances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
        
        data.push({
          period: monthStr,
          income,
          expense,
          net: income - expense
        });
      }
    } else {
      // Show monthly data for last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStr = date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        const monthFinances = finances.filter(f => f.date.startsWith(yearMonth));
        const income = monthFinances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
        const expense = monthFinances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
        
        data.push({
          period: monthStr,
          income,
          expense,
          net: income - expense
        });
      }
    }

    return data;
  }, [finances, chartPeriod, selectedMonth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFinance(formData);
    setFormData({
      type: 'income',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: ''
    });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      deleteFinance(id);
    }
  };

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-slate-900 mb-2">Finance & Cashflow</h1>
            <p className="text-gray-600">Monitor keuangan dan laporan laba rugi</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2"
          >
            <Plus size={20} />
            Tambah Transaksi
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Pemasukan</div>
            <div className="text-slate-900">Rp {totalIncome.toLocaleString('id-ID')}</div>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <TrendingUp size={14} />
              <span>Income</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Pengeluaran</div>
            <div className="text-slate-900">Rp {totalExpense.toLocaleString('id-ID')}</div>
            <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
              <TrendingDown size={14} />
              <span>Expense</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Laba Bersih</div>
            <div className={`${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Rp {netProfit.toLocaleString('id-ID')}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {netProfit >= 0 ? 'Profit' : 'Loss'}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Margin</div>
            <div className="text-slate-900">
              {totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0'}%
            </div>
            <div className="text-gray-600 text-sm mt-1">Profit Margin</div>
          </div>
        </div>
      </div>

      {/* Cashflow Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-900">Cashflow</h3>
          <div className="flex gap-2">
            {chartPeriod === '1-month' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {months.map((month, idx) => (
                  <option key={idx} value={idx}>{month}</option>
                ))}
              </select>
            )}
            <button
              onClick={() => setChartPeriod('1-month')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                chartPeriod === '1-month'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 Bulan
            </button>
            <button
              onClick={() => setChartPeriod('6-months')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                chartPeriod === '6-months'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              6 Bulan
            </button>
            <button
              onClick={() => setChartPeriod('1-year')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                chartPeriod === '1-year'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1 Tahun
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
            />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Pemasukan" dot={{ fill: '#10b981', r: 4 }} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" dot={{ fill: '#ef4444', r: 4 }} />
            <Line type="monotone" dataKey="net" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" name="Net Cashflow" dot={{ fill: '#06b6d4', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterType === 'all' 
              ? 'bg-cyan-500 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterType === 'income' 
              ? 'bg-green-500 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Pemasukan
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterType === 'expense' 
              ? 'bg-red-500 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Pengeluaran
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFinances.map(finance => (
                <tr key={finance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(finance.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{finance.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {finance.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {finance.type === 'income' ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <ArrowUpRight size={16} />
                        Pemasukan
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <ArrowDownRight size={16} />
                        Pengeluaran
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${finance.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {finance.type === 'income' ? '+' : '-'} Rp {finance.amount.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!finance.description.includes('Penjualan') && !finance.description.includes('Pembelian') && (
                      <button 
                        onClick={() => handleDelete(finance.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="text-red-600" size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Report */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-slate-900 mb-4">Laporan Laba Rugi</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-700">Total Pemasukan (Revenue)</span>
            <span className="text-green-600">Rp {totalIncome.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-700">Total Pengeluaran (Cost)</span>
            <span className="text-red-600">Rp {totalExpense.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-slate-900">Laba/Rugi Bersih (Net Profit/Loss)</span>
            <span className={`${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Rp {netProfit.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Add Finance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-slate-900">Tambah Transaksi Keuangan</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tipe</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option value="income">Pemasukan</option>
                    <option value="expense">Pengeluaran</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Jumlah</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Deskripsi</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    placeholder="Deskripsi transaksi"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Kategori</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    placeholder="Contoh: Utilities, Salary, dll"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
