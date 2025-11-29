import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Import Icon Menu & Close
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { InventoryPage } from './components/InventoryPage';
import { SalesPage } from './components/SalesPage';
import { PurchasesPage } from './components/PurchasesPage';
import { FinancePage } from './components/FinancePage';
import { AutomationBuilder } from './components/AutomationBuilder';
import { AIInsightsDashboard } from './components/AIInsightsDashboard';
import { KnowledgeCenter } from './components/KnowledgeCenter';
import { Sidebar } from './components/Sidebar';
import { DataProvider, useData } from './lib/dataContext';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  companyName: string;
};

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'dashboard'
  | 'inventory'
  | 'sales'
  | 'purchases'
  | 'finance'
  | 'automation'
  | 'ai-insights'
  | 'knowledge';

type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string | null;
  timestamp: number;
};

type ChatSession = {
  id: string | number;
  title: string;
  messages: ChatMessage[];
};

type InventoryItem = {
  id: string | number;
  name: string;
  stock: number;
  price: number;
};

type RadarData = {
  hasData: boolean;
  totalRevenue?: number;
  totalProfit?: number;
  topProduct?: string;
  dailySales?: any[];
  rawData?: any[];
};

function AppContent() {
  const { products, sales, purchases, finances } = useData();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State untuk Sidebar Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // AI State Management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | number | null>(null);
  const [radarData, setRadarData] = useState<RadarData>({ hasData: false });

  // Convert products to InventoryItem format for AI
  const inventoryData: InventoryItem[] = products.map(p => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    price: p.price
  }));

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('umkm_sessions_v1');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        setSessions([]);
      }
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('umkm_sessions_v1', JSON.stringify(sessions));
  }, [sessions]);

  // Initialize first chat session if none exist
  useEffect(() => {
    if (sessions.length === 0) {
      createNewChat();
    } else if (!currentSessionId) {
      setCurrentSessionId(sessions[0].id);
    }
  }, []);

  const createNewChat = (customMessage?: string) => {
    const newId = Date.now();
    const defaultMsg = 'Halo! Saya siap menganalisa bisnis & profit Anda.';
    const msgText = customMessage || defaultMsg;
    const newSession: ChatSession = {
      id: newId,
      title: "Chat Baru " + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      messages: [{ id: String(Date.now()), sender: 'bot', text: msgText, timestamp: Date.now() }]
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
  };

  const handleSendMessage = (text: string, sender: 'user' | 'bot', image?: string | null) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              title: sender === 'user' && session.messages.length <= 2
                ? text.substring(0, 20)
                : session.title,
              messages: [
                ...session.messages,
                {
                  id: String(Date.now()),
                  sender,
                  text,
                  image: image || null,
                  timestamp: Date.now()
                }
              ]
            }
          : session
      )
    );
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Budi Santoso',
      email: email,
      role: 'user',
      companyName: 'UMKM Makmur Jaya'
    };
    setCurrentUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleRegister = (name: string, email: string, companyName: string, password: string) => {
    // Mock register
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      role: 'user',
      companyName: companyName
    };
    setCurrentUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  // Render auth pages or landing
  if (!currentUser) {
    if (currentPage === 'landing') {
      return <LandingPage onNavigate={setCurrentPage} />;
    }
    return <AuthPage page={currentPage} onNavigate={setCurrentPage} onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const currentSession = sessions.find(s => s.id === currentSessionId) || null;

  // Render main app with sidebar
  return (
    // Menggunakan h-screen dan overflow-hidden untuk layout aplikasi penuh
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* 1. OVERLAY (Hanya Mobile) - Klik untuk tutup sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR WRAPPER */}
      {/* Di Mobile: Fixed position, geser masuk/keluar. Di Desktop: Static, selalu muncul */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Tombol Close Tambahan untuk Mobile (Opsional, di dalam sidebar) */}
        <div className="absolute top-2 right-2 md:hidden z-50">
           <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-white">
             <X size={20} />
           </button>
        </div>

        {/* Komponen Sidebar Asli */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setIsSidebarOpen(false); // Tutup sidebar otomatis saat menu diklik (UX Mobile)
          }}
          user={currentUser}
          onLogout={handleLogout}
        />
      </div>

      {/* 3. MAIN CONTENT AREA */}
      {/* flex-1 agar mengisi sisa ruang, hapus ml-64 agar responsif */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* HEADER MOBILE (Hanya muncul di HP) */}
        <div className="md:hidden bg-white border-b p-4 flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-slate-700"
          >
            <Menu size={24} />
          </button>
          <span className="font-semibold text-slate-900 capitalize">
            {currentPage.replace('-', ' ')}
          </span>
        </div>

        {/* CONTENT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard user={currentUser} onNavigate={setCurrentPage} />}
          {currentPage === 'inventory' && <InventoryPage />}
          {currentPage === 'sales' && <SalesPage />}
          {currentPage === 'purchases' && <PurchasesPage />}
          {currentPage === 'finance' && <FinancePage />}
          {currentPage === 'automation' && <AutomationBuilder />}
          {currentPage === 'ai-insights' && (
            <AIInsightsDashboard
              inventoryData={inventoryData}
              radarData={radarData}
              sales={sales}
              purchases={purchases}
              finances={finances}
              currentSession={currentSession}
              onSendMessage={handleSendMessage}
              sessions={sessions}
            />
          )}
          {currentPage === 'knowledge' && <KnowledgeCenter />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
