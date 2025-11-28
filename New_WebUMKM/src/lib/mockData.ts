// Mock data untuk demo aplikasi

export type Product = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  minimumStock: number;
  price: number;
  unit: string;
  category: string;
  supplierPhone?: string;
};

export type Sale = {
  id: string;
  invoiceNo: string;
  date: string;
  customerName: string;
  totalAmount: number;
  status: 'paid' | 'pending' | 'cancelled';
  items: { productId: string; productName: string; qty: number; price: number }[];
};

export type Purchase = {
  id: string;
  purchaseNo: string;
  date: string;
  vendor: string;
  totalCost: number;
  status: 'received' | 'pending' | 'cancelled';
  items: { productId: string; productName: string; qty: number; cost: number }[];
};

export type Finance = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
};

export type Automation = {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'stock_low' | 'sale_created' | 'purchase_received' | 'scheduled';
    config: any;
  };
  action: {
    type: 'send_whatsapp' | 'send_email' | 'update_stock' | 'send_to_sheets';
    config: any;
  };
  active: boolean;
  lastRun?: string;
};

export const mockProducts: Product[] = [
  { id: '1', sku: 'PRD-001', name: 'Kaos Cotton Premium', stock: 45, minimumStock: 20, price: 85000, unit: 'pcs', category: 'Apparel', supplierPhone: '+628123456789' },
  { id: '2', sku: 'PRD-002', name: 'Celana Jeans Slim Fit', stock: 8, minimumStock: 15, price: 250000, unit: 'pcs', category: 'Apparel', supplierPhone: '+628987654321' },
  { id: '3', sku: 'PRD-003', name: 'Kemeja Batik Modern', stock: 32, minimumStock: 10, price: 150000, unit: 'pcs', category: 'Apparel', supplierPhone: '+628123456789' },
  { id: '4', sku: 'PRD-004', name: 'Sepatu Sneakers Canvas', stock: 18, minimumStock: 12, price: 320000, unit: 'pasang', category: 'Footwear', supplierPhone: '+628555666777' },
  { id: '5', sku: 'PRD-005', name: 'Tas Ransel Laptop', stock: 5, minimumStock: 8, price: 180000, unit: 'pcs', category: 'Accessories', supplierPhone: '+628111222333' },
  { id: '6', sku: 'PRD-006', name: 'Topi Baseball Cap', stock: 56, minimumStock: 25, price: 65000, unit: 'pcs', category: 'Accessories', supplierPhone: '+628444555666' },
  { id: '7', sku: 'PRD-007', name: 'Jaket Hoodie Premium', stock: 12, minimumStock: 10, price: 280000, unit: 'pcs', category: 'Apparel', supplierPhone: '+628777888999' },
  { id: '8', sku: 'PRD-008', name: 'Kaos Kaki Sport', stock: 120, minimumStock: 50, price: 25000, unit: 'pasang', category: 'Accessories', supplierPhone: '+628000111222' },
  { id: '9', sku: 'PRD-009', name: 'Sabuk Kulit Asli', stock: 3, minimumStock: 10, price: 120000, unit: 'pcs', category: 'Accessories', supplierPhone: '+628333444555' },
  { id: '10', sku: 'PRD-010', name: 'Dompet Kulit Premium', stock: 28, minimumStock: 15, price: 95000, unit: 'pcs', category: 'Accessories', supplierPhone: '+628333444555' },
];

export const mockSales: Sale[] = [
  {
    id: 'S001',
    invoiceNo: 'INV-2025-001',
    date: '2025-01-15',
    customerName: 'Toko Maju Jaya',
    totalAmount: 1200000,
    status: 'paid',
    items: [
      { productId: '1', productName: 'Kaos Cotton Premium', qty: 10, price: 85000 },
      { productId: '3', productName: 'Kemeja Batik Modern', qty: 2, price: 150000 },
    ]
  },
  {
    id: 'S002',
    invoiceNo: 'INV-2025-002',
    date: '2025-01-16',
    customerName: 'CV Berkah Mandiri',
    totalAmount: 960000,
    status: 'paid',
    items: [
      { productId: '4', productName: 'Sepatu Sneakers Canvas', qty: 3, price: 320000 },
    ]
  },
  {
    id: 'S003',
    invoiceNo: 'INV-2025-003',
    date: '2025-01-17',
    customerName: 'UD Sumber Rezeki',
    totalAmount: 540000,
    status: 'pending',
    items: [
      { productId: '5', productName: 'Tas Ransel Laptop', qty: 3, price: 180000 },
    ]
  },
  {
    id: 'S004',
    invoiceNo: 'INV-2025-004',
    date: '2025-01-18',
    customerName: 'Toko Sejahtera',
    totalAmount: 1550000,
    status: 'paid',
    items: [
      { productId: '3', productName: 'Kemeja Batik Modern', qty: 5, price: 150000 },
      { productId: '7', productName: 'Jaket Hoodie Premium', qty: 3, price: 280000 },
    ]
  },
];

export const mockPurchases: Purchase[] = [
  {
    id: 'P001',
    purchaseNo: 'PO-2025-001',
    date: '2025-01-10',
    vendor: 'PT Tekstil Nusantara',
    totalCost: 3500000,
    status: 'received',
    items: [
      { productId: '1', productName: 'Kaos Cotton Premium', qty: 100, cost: 50000 },
      { productId: '3', productName: 'Kemeja Batik Modern', qty: 50, cost: 90000 },
    ]
  },
  {
    id: 'P002',
    purchaseNo: 'PO-2025-002',
    date: '2025-01-12',
    vendor: 'CV Footwear Indonesia',
    totalCost: 4800000,
    status: 'received',
    items: [
      { productId: '4', productName: 'Sepatu Sneakers Canvas', qty: 20, cost: 240000 },
    ]
  },
  {
    id: 'P003',
    purchaseNo: 'PO-2025-003',
    date: '2025-01-20',
    vendor: 'UD Kulit Jaya',
    totalCost: 2400000,
    status: 'pending',
    items: [
      { productId: '9', productName: 'Sabuk Kulit Asli', qty: 30, cost: 80000 },
    ]
  },
];

export const mockFinances: Finance[] = [
  { id: 'F001', type: 'income', amount: 1200000, description: 'Penjualan INV-2025-001', date: '2025-01-15', category: 'Sales' },
  { id: 'F002', type: 'expense', amount: 3500000, description: 'Pembelian bahan PO-2025-001', date: '2025-01-10', category: 'Purchase' },
  { id: 'F003', type: 'expense', amount: 500000, description: 'Biaya listrik dan air', date: '2025-01-12', category: 'Utilities' },
  { id: 'F004', type: 'income', amount: 960000, description: 'Penjualan INV-2025-002', date: '2025-01-16', category: 'Sales' },
  { id: 'F005', type: 'expense', amount: 2000000, description: 'Gaji karyawan', date: '2025-01-01', category: 'Salary' },
  { id: 'F006', type: 'expense', amount: 4800000, description: 'Pembelian bahan PO-2025-002', date: '2025-01-12', category: 'Purchase' },
  { id: 'F007', type: 'income', amount: 1550000, description: 'Penjualan INV-2025-004', date: '2025-01-18', category: 'Sales' },
  { id: 'F008', type: 'expense', amount: 300000, description: 'Biaya packaging', date: '2025-01-14', category: 'Operational' },
];

export const mockAutomations: Automation[] = [
  {
    id: 'A001',
    name: 'Alert Stok Kurang',
    description: 'Kirim WhatsApp ke supplier ketika stok produk di bawah minimum',
    trigger: {
      type: 'stock_low',
      config: { threshold: 'minimum_stock' }
    },
    action: {
      type: 'send_whatsapp',
      config: {
        recipient: '+628123456789',
        message: 'Stok {{product_name}} tinggal {{stock}} {{unit}}. Mohon segera restock.'
      }
    },
    active: true,
    lastRun: '2025-01-20T10:30:00'
  },

];

// Data untuk charts
export const salesChartData = [
  { month: 'Jul', sales: 3200000 },
  { month: 'Agu', sales: 4100000 },
  { month: 'Sep', sales: 3800000 },
  { month: 'Okt', sales: 4500000 },
  { month: 'Nov', sales: 5200000 },
  { month: 'Des', sales: 6800000 },
  { month: 'Jan', sales: 4710000 },
];

export const topProductsData = [
  { name: 'Kaos Cotton', sales: 156, revenue: 13260000 },
  { name: 'Sepatu Sneakers', sales: 48, revenue: 15360000 },
  { name: 'Kemeja Batik', sales: 89, revenue: 13350000 },
  { name: 'Jaket Hoodie', sales: 52, revenue: 14560000 },
  { name: 'Tas Ransel', sales: 67, revenue: 12060000 },
];

export const categoryDistribution = [
  { name: 'Apparel', value: 65 },
  { name: 'Footwear', value: 15 },
  { name: 'Accessories', value: 20 },
];

export const cashflowData = [
  { month: 'Jul', income: 3200000, expense: 2100000 },
  { month: 'Agu', income: 4100000, expense: 2800000 },
  { month: 'Sep', income: 3800000, expense: 2500000 },
  { month: 'Okt', income: 4500000, expense: 3000000 },
  { month: 'Nov', income: 5200000, expense: 3200000 },
  { month: 'Des', income: 6800000, expense: 4500000 },
  { month: 'Jan', income: 4710000, expense: 10300000 },
];

export const stockForecastData = [
  { date: '2025-01-20', actual: 45, forecast: null },
  { date: '2025-01-21', actual: 42, forecast: null },
  { date: '2025-01-22', actual: 38, forecast: null },
  { date: '2025-01-23', actual: 35, forecast: null },
  { date: '2025-01-24', actual: null, forecast: 32 },
  { date: '2025-01-25', actual: null, forecast: 28 },
  { date: '2025-01-26', actual: null, forecast: 25 },
  { date: '2025-01-27', actual: null, forecast: 21 },
];
