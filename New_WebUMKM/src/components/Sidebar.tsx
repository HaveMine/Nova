// Sidebar.tsx
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  Zap,
  Brain,
  LogOut,
  Factory,
  Menu,
  X
} from 'lucide-react';
import { Page, User } from '../App';

type SidebarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User;
  onLogout: () => void;
};

export function Sidebar({ currentPage, onNavigate, user, onLogout }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false); // Close sidebar when switching to desktop
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close sidebar when navigating on mobile
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarContent = (
    <aside className="h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Factory className="text-cyan-400" size={28} />
            <span className="text-white">AutoUMKM</span>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <div className="text-sm">
          <div className="text-white">{user.name}</div>
          <div className="text-gray-400 text-xs truncate">{user.companyName}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => handleNavigate('dashboard')}
          />
          
          <div className="pt-4 pb-2">
            <div className="text-gray-400 text-xs px-3">ERP MODULES</div>
          </div>
          
          <NavItem 
            icon={<Package size={20} />}
            label="Inventory"
            active={currentPage === 'inventory'}
            onClick={() => handleNavigate('inventory')}
          />
          <NavItem 
            icon={<ShoppingCart size={20} />}
            label="Sales"
            active={currentPage === 'sales'}
            onClick={() => handleNavigate('sales')}
          />
          <NavItem 
            icon={<ShoppingBag size={20} />}
            label="Purchases"
            active={currentPage === 'purchases'}
            onClick={() => handleNavigate('purchases')}
          />
          <NavItem 
            icon={<Wallet size={20} />}
            label="Finance"
            active={currentPage === 'finance'}
            onClick={() => handleNavigate('finance')}
          />

          <div className="pt-4 pb-2">
            <div className="text-gray-400 text-xs px-3">AUTOMATION & AI</div>
          </div>

          <NavItem 
            icon={<Zap size={20} />}
            label="Automation"
            active={currentPage === 'automation'}
            onClick={() => handleNavigate('automation')}
          />
          <NavItem 
            icon={<Brain size={20} />}
            label="AI Insights"
            active={currentPage === 'ai-insights'}
            onClick={() => handleNavigate('ai-insights')}
          />
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => {
            onLogout();
            if (isMobile) setIsSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg md:hidden"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      {isMobile ? (
        <>
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          {/* Mobile sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            {sidebarContent}
          </div>
        </>
      ) : (
        /* Desktop sidebar */
        <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-30">
          {sidebarContent}
        </div>
      )}
    </>
  );
}

function NavItem({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-cyan-500/10 text-cyan-400' 
          : 'text-gray-300 hover:bg-slate-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
