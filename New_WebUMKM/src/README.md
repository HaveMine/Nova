# AutoUMKM - Digital Industry Automation Platform

Platform digitalisasi lengkap untuk UMKM Indonesia yang fokus membantu otomatisasi proses operasional sederhana tanpa perlu keahlian teknologi tinggi.

## 🎯 Fitur Utama

### 1. **Simple ERP**
- **Inventory Management**: CRUD produk, monitoring stok, alert stok rendah, export CSV
- **Sales & Invoice**: Pencatatan penjualan, auto-generate invoice, tracking pembayaran
- **Purchases**: Pembelian bahan, auto-update stok, HPP calculator
- **Finance**: Cashflow tracking, laporan laba rugi, visualisasi data

### 2. **No-Code Automation Builder**
- Rule editor IF-THEN sederhana
- Template automation siap pakai
- Trigger: Stok rendah, penjualan baru, jadwal
- Action: WhatsApp, Email, Invoice, Google Sheets

### 3. **AI Insights & Forecasting**
- Prediksi penjualan
- Stock forecast
- Smart recommendations
- AI Chat Assistant

### 4. **Knowledge Center**
- Tutorial lengkap
- Video edukasi
- Panduan digitalisasi UMKM

## 🚀 Cara Menggunakan

### Setup Awal
1. Buka aplikasi di browser
2. Klik "Daftar Gratis" di halaman landing
3. Isi data: Nama, Email, Nama UMKM, Password
4. Login dan mulai menggunakan

### Menambah Produk (Inventory)
1. Klik menu **Inventory** di sidebar
2. Klik tombol **"Tambah Produk"**
3. Isi form:
   - SKU (kode produk)
   - Nama Produk
   - Kategori
   - Stok Awal
   - Minimum Stok (untuk alert)
   - Unit (pcs, kg, dll)
   - Harga Jual
4. Klik **"Simpan Produk"**

### Membuat Penjualan
1. Klik menu **Sales** di sidebar
2. Klik tombol **"Buat Penjualan"**
3. Isi form:
   - Nama Customer
   - Tanggal
   - Pilih produk dari dropdown (semua produk dari Inventory)
   - Input quantity
   - Tambah item lain jika perlu
   - Pilih status pembayaran (Lunas/Pending)
4. Klik **"Simpan & Generate Invoice"**
5. ✅ Stok otomatis berkurang
6. ✅ Finance otomatis tercatat (jika lunas)

### Mencatat Pembelian
1. Klik menu **Purchases** di sidebar
2. Klik tombol **"Buat Purchase Order"**
3. Isi form:
   - Nama Vendor/Supplier
   - Tanggal
   - Pilih produk
   - Input quantity dan harga beli
   - Pilih status (Pending/Diterima)
4. Klik **"Simpan Purchase Order"**
5. ✅ Jika status "Diterima", stok otomatis bertambah
6. ✅ Finance otomatis tercatat sebagai pengeluaran

### Monitor Keuangan
1. Klik menu **Finance** di sidebar
2. Lihat dashboard:
   - Total Pemasukan
   - Total Pengeluaran
   - Laba Bersih
   - Margin
3. **Grafik Cashflow** dengan filter:
   - 1 Bulan (pilih bulan tertentu)
   - 6 Bulan terakhir
   - 1 Tahun terakhir
4. Tambah transaksi manual jika perlu (selain sales/purchase)

## 📊 Data Flow

```
┌─────────────┐
│  INVENTORY  │ ◄──── Tambah/Edit/Delete Produk
└──────┬──────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────┐    ┌──────────┐
│  SALES  │    │PURCHASES │
└────┬────┘    └─────┬────┘
     │               │
     │ (paid)        │ (received)
     │               │
     └───────┬───────┘
             │
             ▼
      ┌──────────┐
      │ FINANCE  │ ◄──── Manual Entry
      └──────────┘
```

### Sinkronisasi Data:
- **Sales → Inventory**: Stok produk berkurang otomatis
- **Sales → Finance**: Tambah pemasukan (jika status paid)
- **Purchases → Inventory**: Stok produk bertambah (jika status received)
- **Purchases → Finance**: Tambah pengeluaran (jika received)

## 💾 Penyimpanan Data

Aplikasi ini menggunakan **localStorage** browser untuk menyimpan data:
- Data tersimpan secara lokal di device Anda
- Data tidak hilang saat refresh halaman
- Data spesifik per browser (tidak sync antar device)
- Aman karena hanya Anda yang bisa akses

### Backup Data
Export data ke CSV dari masing-masing halaman:
- Inventory → Export CSV
- Sales → Export CSV
- Purchases → Export
- Finance → (otomatis dari sales/purchases)

## 🎨 UI/UX Guidelines

### Warna & Status
- 🟢 **Hijau**: Status aman, profit, stok cukup
- 🟠 **Orange**: Warning, stok rendah, pending
- 🔴 **Merah**: Error, loss, stok habis
- 🔵 **Cyan**: Primary action, aktif

### Navigasi
- **Sidebar Kiri**: Menu utama (Dashboard, ERP, Automation, AI, Knowledge)
- **Header**: Judul halaman + tombol action utama
- **Cards**: Summary/KPI di bagian atas setiap halaman

## 🔧 Fitur Lanjutan

### Automation (Future)
Template automation yang tersedia:
1. Alert Stok Kurang → WhatsApp ke supplier
2. Auto Generate Invoice → PDF saat sales
3. Sync ke Google Sheets → Data harian
4. Email Laporan Mingguan → Ke owner

### AI Insights
- Prediksi penjualan 3 bulan ke depan
- Rekomendasi reorder stok
- Deteksi anomali penjualan
- Chat dengan AI untuk tanya data bisnis

## 📱 Responsive Design

Aplikasi fully responsive:
- Desktop: Full sidebar navigation
- Tablet: Sidebar tetap visible
- Mobile: Hamburger menu (future)

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: localStorage

## ⚠️ Catatan Penting

1. **Data Lokal**: Data tersimpan di localStorage browser. Clear browser data = data hilang.
2. **Backup Rutin**: Export CSV secara berkala untuk backup.
3. **Single Browser**: Data tidak sync antar browser/device.
4. **Stock Validation**: Sistem otomatis cek ketersediaan stok sebelum sales.
5. **Auto Calculation**: HPP, margin, dan cashflow dihitung otomatis.

## 🎯 Use Cases

### UMKM Konveksi
1. Input semua produk (kaos, kemeja, dll)
2. Set minimum stock untuk alert
3. Catat penjualan harian → Stok auto update
4. Catat pembelian bahan → Stok bertambah
5. Monitor cashflow di Finance
6. Lihat produk terlaris di Dashboard

### Toko Retail Kecil
1. Import produk via CSV
2. Buat automation alert stok < 10
3. Catat sales dari customer
4. Track HPP dari purchases
5. Analisa margin per produk
6. Forecast kebutuhan stock

### Manufaktur Kecil
1. Input bahan baku sebagai produk
2. Purchase Order ke supplier
3. Production tracking (optional)
4. Quality control check
5. Sales ke distributor
6. Finance monitoring

## 📈 Roadmap

- [ ] Multi-user & role management
- [ ] Real-time sync dengan cloud
- [ ] WhatsApp Business API integration
- [ ] Barcode scanner
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Advanced reporting & analytics
- [ ] Integration marketplace (Tokopedia, Shopee, dll)

## 💬 Support

Butuh bantuan? Akses **Knowledge Center** di aplikasi untuk:
- Tutorial lengkap
- Video pembelajaran
- Panduan step-by-step
- Best practices

---

**Made with ❤️ for Indonesian SMEs**

© 2025 AutoUMKM - Digitalisasi UMKM Menuju Industry 4.0
