import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  Zap,
  Brain,
  LogOut,
  Factory
} from 'lucide-react';
import { Page, User } from '../App';

type SidebarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User;
  onLogout: () => void;
};

export function Sidebar({ currentPage, onNavigate, user, onLogout }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <Factory className="text-cyan-400" size={28} />
          <span className="text-white">AutoUMKM</span>
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
            onClick={() => onNavigate('dashboard')}
          />
          
          <div className="pt-4 pb-2">
            <div className="text-gray-400 text-xs px-3">ERP MODULES</div>
          </div>
          
          <NavItem 
            icon={<Package size={20} />}
            label="Inventory"
            active={currentPage === 'inventory'}
            onClick={() => onNavigate('inventory')}
          />
          <NavItem 
            icon={<ShoppingCart size={20} />}
            label="Sales"
            active={currentPage === 'sales'}
            onClick={() => onNavigate('sales')}
          />
          <NavItem 
            icon={<ShoppingBag size={20} />}
            label="Purchases"
            active={currentPage === 'purchases'}
            onClick={() => onNavigate('purchases')}
          />
          <NavItem 
            icon={<Wallet size={20} />}
            label="Finance"
            active={currentPage === 'finance'}
            onClick={() => onNavigate('finance')}
          />

          <div className="pt-4 pb-2">
            <div className="text-gray-400 text-xs px-3">AUTOMATION & AI</div>
          </div>

          <NavItem 
            icon={<Zap size={20} />}
            label="Automation"
            active={currentPage === 'automation'}
            onClick={() => onNavigate('automation')}
          />
          <NavItem 
            icon={<Brain size={20} />}
            label="AI Insights"
            active={currentPage === 'ai-insights'}
            onClick={() => onNavigate('ai-insights')}
          />


        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
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
