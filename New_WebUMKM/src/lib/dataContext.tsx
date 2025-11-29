import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Sale, Purchase, Finance, Automation, mockAutomations, mockSales, mockPurchases, mockFinances } from './mockData';

type DataContextType = {
  products: Product[];
  sales: Sale[];
  purchases: Purchase[];
  finances: Finance[];
  automations: Automation[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  addPurchase: (purchase: Omit<Purchase, 'id'>) => void;
  updatePurchase: (id: string, purchase: Partial<Purchase>) => void;
  deletePurchase: (id: string) => void;
  addFinance: (finance: Omit<Finance, 'id'>) => void;
  updateFinance: (id: string, finance: Partial<Finance>) => void;
  deleteFinance: (id: string) => void;
  addAutomation: (automation: Omit<Automation, 'id'>) => void;
  updateAutomation: (id: string, automation: Partial<Automation>) => void;
  deleteAutomation: (id: string) => void;
  toggleAutomation: (id: string) => void;
  executeAutomations: (triggerType: string, data?: any) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedSales = localStorage.getItem('sales');
    const savedPurchases = localStorage.getItem('purchases');
    const savedFinances = localStorage.getItem('finances');
    const savedAutomations = localStorage.getItem('automations');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
    if (savedFinances) setFinances(JSON.parse(savedFinances));
    if (savedAutomations) setAutomations(JSON.parse(savedAutomations));

    // If no data, initialize with mock data
    if (!savedProducts) {
      const mockProducts: Product[] = [
        { id: '1', sku: 'PRD-001', name: 'Kaos Cotton Premium', stock: 45, minimumStock: 20, price: 85000, unit: 'pcs', category: 'Apparel' },
        { id: '2', sku: 'PRD-002', name: 'Celana Jeans Slim Fit', stock: 8, minimumStock: 15, price: 250000, unit: 'pcs', category: 'Apparel' },
        { id: '3', sku: 'PRD-003', name: 'Kemeja Batik Modern', stock: 32, minimumStock: 10, price: 150000, unit: 'pcs', category: 'Apparel' },
        { id: '4', sku: 'PRD-004', name: 'Sepatu Sneakers Canvas', stock: 18, minimumStock: 12, price: 320000, unit: 'pasang', category: 'Footwear' },
        { id: '5', sku: 'PRD-005', name: 'Tas Ransel Laptop', stock: 5, minimumStock: 8, price: 180000, unit: 'pcs', category: 'Accessories' },
        { id: '6', sku: 'PRD-006', name: 'Topi Baseball Cap', stock: 56, minimumStock: 25, price: 65000, unit: 'pcs', category: 'Accessories' },
        { id: '7', sku: 'PRD-007', name: 'Jaket Hoodie Premium', stock: 12, minimumStock: 10, price: 280000, unit: 'pcs', category: 'Apparel' },
        { id: '8', sku: 'PRD-008', name: 'Kaos Kaki Sport', stock: 120, minimumStock: 50, price: 25000, unit: 'pasang', category: 'Accessories' },
        { id: '9', sku: 'PRD-009', name: 'Sabuk Kulit Asli', stock: 3, minimumStock: 10, price: 120000, unit: 'pcs', category: 'Accessories' },
        { id: '10', sku: 'PRD-010', name: 'Dompet Kulit Premium', stock: 28, minimumStock: 15, price: 95000, unit: 'pcs', category: 'Accessories' },
      ];
      setProducts(mockProducts);
      localStorage.setItem('products', JSON.stringify(mockProducts));
    }

    if (!savedSales) {
      setSales(mockSales);
      localStorage.setItem('sales', JSON.stringify(mockSales));
    }

    if (!savedPurchases) {
      setPurchases(mockPurchases);
      localStorage.setItem('purchases', JSON.stringify(mockPurchases));
    }

    if (!savedFinances) {
      setFinances(mockFinances);
      localStorage.setItem('finances', JSON.stringify(mockFinances));
    }

    // Always initialize with updated mock automations
    setAutomations(mockAutomations);
    localStorage.setItem('automations', JSON.stringify(mockAutomations));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('finances', JSON.stringify(finances));
  }, [finances]);

  useEffect(() => {
    localStorage.setItem('automations', JSON.stringify(automations));
  }, [automations]);

  // Product CRUD
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  // Check for low stock automations
  const checkLowStockAutomations = (updatedProducts: Product[]) => {
    updatedProducts.forEach(product => {
      if (product.stock < product.minimumStock) {
        executeAutomations('stock_low', { product });
      }
    });
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Sale CRUD
  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: `S${Date.now()}` };
    setSales([...sales, newSale]);

    // Update stock for sold items
    const updatedProducts = [...products];
    sale.items.forEach(item => {
      const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
      if (productIndex !== -1) {
        updatedProducts[productIndex].stock -= item.qty;
      }
    });
    setProducts(updatedProducts);

    // Add finance record if paid
    if (sale.status === 'paid') {
      const newFinance: Finance = {
        id: `F${Date.now()}`,
        type: 'income',
        amount: sale.totalAmount,
        description: `Penjualan ${sale.invoiceNo}`,
        date: sale.date,
        category: 'Sales'
      };
      setFinances([...finances, newFinance]);
    }

    // Execute sale_created automations
    executeAutomations('sale_created', { sale: newSale });
  };

  const updateSale = (id: string, updatedSale: Partial<Sale>) => {
    const oldSale = sales.find(s => s.id === id);
    const newSale = { ...oldSale!, ...updatedSale };

    // If status changed from pending to paid, add finance record
    if (oldSale?.status !== 'paid' && newSale.status === 'paid') {
      const newFinance: Finance = {
        id: `F${Date.now()}`,
        type: 'income',
        amount: newSale.totalAmount,
        description: `Penjualan ${newSale.invoiceNo}`,
        date: newSale.date,
        category: 'Sales'
      };
      setFinances([...finances, newFinance]);
    }

    setSales(sales.map(s => s.id === id ? newSale : s));
  };

  const deleteSale = (id: string) => {
    const sale = sales.find(s => s.id === id);
    if (sale) {
      // Restore stock
      const updatedProducts = [...products];
      sale.items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
          updatedProducts[productIndex].stock += item.qty;
        }
      });
      setProducts(updatedProducts);
      // Skip stock low automations during delete to prevent unwanted WhatsApp sends

      // Remove finance record
      setFinances(finances.filter(f => !f.description.includes(sale.invoiceNo)));
    }
    setSales(sales.filter(s => s.id !== id));
  };

  // Purchase CRUD
  const addPurchase = (purchase: Omit<Purchase, 'id'>) => {
    const newPurchase = { ...purchase, id: `P${Date.now()}` };
    setPurchases([...purchases, newPurchase]);

    // Update stock for received items
    if (purchase.status === 'received') {
      const updatedProducts = [...products];
      purchase.items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
          updatedProducts[productIndex].stock += item.qty;
        }
      });
      setProducts(updatedProducts);
      checkLowStockAutomations(updatedProducts);

      // Add finance record
      const newFinance: Finance = {
        id: `F${Date.now()}`,
        type: 'expense',
        amount: purchase.totalCost,
        description: `Pembelian bahan ${purchase.purchaseNo}`,
        date: purchase.date,
        category: 'Purchase'
      };
      setFinances([...finances, newFinance]);
    }
  };

  const updatePurchase = (id: string, updatedPurchase: Partial<Purchase>) => {
    const oldPurchase = purchases.find(p => p.id === id);
    const newPurchase = { ...oldPurchase!, ...updatedPurchase };

    // If status changed to received, update stock and add finance
    if (oldPurchase?.status !== 'received' && newPurchase.status === 'received') {
      const updatedProducts = [...products];
      newPurchase.items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
          updatedProducts[productIndex].stock += item.qty;
        }
      });
      setProducts(updatedProducts);

      const newFinance: Finance = {
        id: `F${Date.now()}`,
        type: 'expense',
        amount: newPurchase.totalCost,
        description: `Pembelian bahan ${newPurchase.purchaseNo}`,
        date: newPurchase.date,
        category: 'Purchase'
      };
      setFinances([...finances, newFinance]);
    }

    setPurchases(purchases.map(p => p.id === id ? newPurchase : p));
  };

  const deletePurchase = (id: string) => {
    const purchase = purchases.find(p => p.id === id);
    if (purchase && purchase.status === 'received') {
      // Restore stock
      const updatedProducts = [...products];
      purchase.items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
          updatedProducts[productIndex].stock -= item.qty;
        }
      });
      setProducts(updatedProducts);
      checkLowStockAutomations(updatedProducts);

      // Remove finance record
      setFinances(finances.filter(f => !f.description.includes(purchase.purchaseNo)));
    }
    setPurchases(purchases.filter(p => p.id !== id));
  };

  // Finance CRUD
  const addFinance = (finance: Omit<Finance, 'id'>) => {
    const newFinance = { ...finance, id: `F${Date.now()}` };
    setFinances([...finances, newFinance]);
  };

  const updateFinance = (id: string, updatedFinance: Partial<Finance>) => {
    setFinances(finances.map(f => f.id === id ? { ...f, ...updatedFinance } : f));
  };

  const deleteFinance = (id: string) => {
    setFinances(finances.filter(f => f.id !== id));
  };

  // Automation CRUD
  const addAutomation = (automation: Omit<Automation, 'id'>) => {
    const newAutomation = { ...automation, id: `A${Date.now()}` };
    setAutomations([...automations, newAutomation]);
  };

  const updateAutomation = (id: string, updatedAutomation: Partial<Automation>) => {
    setAutomations(automations.map(a => a.id === id ? { ...a, ...updatedAutomation } : a));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id));
  };

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };



  // Execute automations based on triggers
  const executeAutomations = (triggerType: string, data?: any) => {
    const activeAutomations = automations.filter(a => a.active && a.trigger.type === triggerType);

    activeAutomations.forEach(automation => {
      if (automation.action.type === 'send_whatsapp') {
        // Execute WhatsApp action
        const config = automation.action.config;
        let message = config.message || '';

        // Replace placeholders
        if (data && data.product) {
          message = message.replace('{{product_name}}', data.product.name);
          message = message.replace('{{stock}}', data.product.stock);
          message = message.replace('{{unit}}', data.product.unit);
        }

        const pesanEncoded = encodeURIComponent(message);
        const url = `dashboard.whatsapp.com/send?phone=${config.phoneNumber}&text=${pesanEncoded}`;
        

        // Update last run
        updateAutomation(automation.id, { lastRun: new Date().toISOString() });
      }
    });
  };

  return (
    <DataContext.Provider
      value={{
        products,
        sales,
        purchases,
        finances,
        automations,
        addProduct,
        updateProduct,
        deleteProduct,
        addSale,
        updateSale,
        deleteSale,
        addPurchase,
        updatePurchase,
        deletePurchase,
        addFinance,
        updateFinance,
        deleteFinance,
        addAutomation,
        updateAutomation,
        deleteAutomation,
        toggleAutomation,
        executeAutomations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
