// App.tsx
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  // AI State Management
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | number | null>(null);
  const [radarData, setRadarData] = useState<RadarData>({ hasData: false });

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
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
