import { useState } from 'react';
import { Plus, Search, Download, Upload, Edit2, Trash2, AlertCircle, Package, X, MessageCircle } from 'lucide-react';
import { useData } from '../lib/dataContext';
import { Product } from '../lib/mockData';

export function InventoryPage() {
  const { products, automations, addProduct, updateProduct, deleteProduct } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Apparel',
    stock: 0,
    minimumStock: 0,
    unit: 'pcs',
    price: 0,
    supplierPhone: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = products.filter(p => p.stock < p.minimumStock).length;
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);
  const stockLowAutomationActive = automations?.some(a => a.trigger.type === 'stock_low' && a.active) || false;

  const kirimPesanWA = (phone: string, productName: string, stock: number, unit: string) => {
    const pesan = `Halo, stok ${productName} tinggal ${stock} ${unit}. Mohon segera restock.`;
    const pesanEncoded = encodeURIComponent(pesan);
    const url = `https://wa.me/${phone}?text=${pesanEncoded}`;
    window.open(url, '_blank');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      sku: '',
      name: '',
      category: 'Apparel',
      stock: 0,
      minimumStock: 0,
      unit: 'pcs',
      price: 0,
      supplierPhone: ''
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku,
      name: product.name,
      category: product.category,
      stock: product.stock,
      minimumStock: product.minimumStock,
      unit: product.unit,
      price: product.price,
      supplierPhone: product.supplierPhone || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      updateProduct(editingProduct.id, formData);
    } else {
      // Add new product
      addProduct(formData);
    }
    
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
    }
  };

  const handleExportCSV = () => {
    const headers = ['SKU', 'Nama', 'Kategori', 'Stok', 'Min Stok', 'Unit', 'Harga'];
    const rows = products.map(p => [p.sku, p.name, p.category, p.stock, p.minimumStock, p.unit, p.price]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-slate-900 mb-2">Inventory Management</h1>
            <p className="text-gray-600">Kelola stok produk dan monitoring inventory</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportCSV}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button 
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2"
            >
              <Plus size={20} />
              Tambah Produk
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Total Produk</div>
            <div className="text-slate-900">{products.length} items</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Nilai Inventory</div>
            <div className="text-slate-900">Rp {totalValue.toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-gray-600 text-sm mb-1">Stok Rendah</div>
            <div className="flex items-center gap-2">
              <div className="text-slate-900">{lowStockCount} produk</div>
              {lowStockCount > 0 && <AlertCircle className="text-orange-500" size={18} />}
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
            placeholder="Cari produk (nama atau SKU)..."
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Nama Produk</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Min. Stok</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="text-gray-400" size={20} />
                      </div>
                      <div className="text-sm text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${product.stock < product.minimumStock ? 'text-orange-600' : 'text-gray-900'}`}>
                      {product.stock} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.minimumStock} {product.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Rp {product.price.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    {product.stock < product.minimumStock ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Stok Rendah
                      </span>
                    ) : product.stock < product.minimumStock * 1.5 ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        Perlu Reorder
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Aman
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {product.supplierPhone && stockLowAutomationActive && (
                        <a
                          href={`https://wa.me/${product.supplierPhone}?text=${encodeURIComponent(`Halo, stok ${product.name} tinggal ${product.stock} ${product.unit}. Mohon segera restock.`)}`}
                          target="_blank"
                          className="p-1 hover:bg-green-100 rounded"
                          title="Pesan Supplier"
                        >
                          <MessageCircle className="text-green-600" size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit2 className="text-gray-600" size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="text-red-600" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-slate-900">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="PRD-001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Nama Produk</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="Nama produk"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option>Apparel</option>
                    <option>Footwear</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Stok Awal</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Min. Stok</label>
                    <input
                      type="number"
                      value={formData.minimumStock}
                      onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Unit</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="pcs"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Harga Jual</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nomor WhatsApp Supplier</label>
                  <input
                    type="text"
                    value={formData.supplierPhone}
                    onChange={(e) => setFormData({ ...formData, supplierPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                    placeholder="+628123456789"
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
                    {editingProduct ? 'Update Produk' : 'Simpan Produk'}
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
