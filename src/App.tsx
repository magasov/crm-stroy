import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Clients } from './components/Clients';
import { Chat } from './components/Chat';
import { AdminPanel } from './components/AdminPanel';
import { Sidebar } from './components/Sidebar';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquare, 
  Settings 
} from 'lucide-react';

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'projects', label: 'Проекты', icon: <Building2 className="w-5 h-5" /> },
  { id: 'clients', label: 'Клиенты', icon: <Users className="w-5 h-5" /> },
  { id: 'chat', label: 'Чат', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'admin', label: 'Админ панель', icon: <Settings className="w-5 h-5" /> },
];

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'clients':
        return <Clients />;
      case 'chat':
        return <Chat />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        navItems={navItems} 
        activeView={activeView} 
        onNavigate={setActiveView} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}
