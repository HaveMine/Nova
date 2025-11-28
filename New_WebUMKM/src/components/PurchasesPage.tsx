import { useState } from 'react';
import { Plus, Search, ShoppingBag, CheckCircle, Clock, X, Trash2 } from 'lucide-react';
import { useData } from '../lib/dataContext';
import { Purchase } from '../lib/mockData';

export function PurchasesPage() {
  const { purchases, products, addPurchase, updatePurchase, deletePurchase } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state
  const [vendor, setVendor] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'received' | 'pending'>('pending');
  const [items, setItems] = useState<Array<{ productId: string; qty: number; cost: number }>>([
    { productId: '', qty: 1, cost: 0 }
  ]);

  const filteredPurchases = purchases.filter(p => 
    p.purchaseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPurchases = purchases.reduce((sum, p) => sum + p.totalCost, 0);
  const receivedPurchases = purchases.filter(p => p.status === 'received').length;

  const handleAddItem = () => {
    setItems([...items, { productId: '', qty: 1, cost: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: 'productId' | 'qty' | 'cost', value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.cost * item.qty), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validItems = items.filter(item => item.productId && item.qty > 0 && item.cost > 0);
    if (validItems.length === 0) {

      return;
    }

    const purchaseNo = `PO-${new Date().getFullYear()}-${(purchases.length + 1).toString().padStart(3, '0')}`;
    
    const purchaseItems = validItems.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        productId: product.id,
        productName: product.name,
        qty: item.qty,
        cost: item.cost
      };
    });

    const newPurchase: Omit<Purchase, 'id'> = {
      purchaseNo,
      date: purchaseDate,
      vendor,
      totalCost: calculateTotal(),
      status,
      items: purchaseItems
    };

    addPurchase(newPurchase);
    
    // Reset form
    setVendor('');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    setStatus('pending');
    setItems([{ productId: '', qty: 1, cost: 0 }]);
    setShowCreateModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pembelian ini?')) {
      deletePurchase(id);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'received' | 'pending' | 'cancelled') => {
    updatePurchase(id, { status: newStatus });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-slate-900 mb-2">Purchases & HPP</h1>
            <p className="text-gray-600">Kelola pembelian bahan dan hitung HPP otomatis</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2"
            >
              <Plus size={20} />
              Buat Purchase Order
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Pembelian</div>
            <div className="text-slate-900">Rp {totalPurchases.toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total PO</div>
            <div className="text-slate-900">{purchases.length} orders</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Diterima</div>
            <div className="flex items-center gap-2">
              <div className="text-slate-900">{receivedPurchases} PO</div>
              <CheckCircle className="text-green-500" size={18} />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Pending</div>
            <div className="flex items-center gap-2">
              <div className="text-slate-900">{purchases.length - receivedPurchases} PO</div>
              <Clock className="text-orange-500" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari PO atau vendor..."
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">No. PO</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPurchases.map(purchase => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="text-gray-400" size={18} />
                      <span className="text-sm text-gray-900">{purchase.purchaseNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(purchase.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{purchase.vendor}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{purchase.items.length} item</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Rp {purchase.totalCost.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <select
                      value={purchase.status}
                      onChange={(e) => handleUpdateStatus(purchase.id, e.target.value as any)}
                      className={`px-2 py-1 text-xs rounded-full border-0 cursor-pointer ${
                        purchase.status === 'received' ? 'bg-green-100 text-green-700' :
                        purchase.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="received">Diterima</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Batal</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleDelete(purchase.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="text-red-600" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Purchase Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-slate-900">Buat Purchase Order Baru</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Nama Vendor</label>
                    <input
                      type="text"
                      value={vendor}
                      onChange={(e) => setVendor(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="Nama supplier/vendor"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Tanggal</label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Items Pembelian</label>
                  <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3">
                        <div className="col-span-5">
                          <select 
                            value={item.productId}
                            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            required
                          >
                            <option value="">Pilih produk</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Qty"
                            min="1"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={item.cost}
                            onChange={(e) => handleItemChange(index, 'cost', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Harga"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                            Rp {(item.cost * item.qty).toLocaleString('id-ID')}
                          </div>
                        </div>
                        <div className="col-span-1 flex items-center">
                          {items.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-cyan-600 hover:text-cyan-700 text-sm flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Tambah Item
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total Cost</span>
                    <span className="text-slate-900">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'received' | 'pending')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option value="pending">Pending (Belum Diterima)</option>
                    <option value="received">Diterima (Stok akan bertambah)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                  >
                    Simpan Purchase Order
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
