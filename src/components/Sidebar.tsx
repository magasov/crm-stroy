import { HardHat } from 'lucide-react';
import { NavItem } from '../App';

type SidebarProps = {
  navItems: NavItem[];
  activeView: string;
  onNavigate: (view: string) => void;
};

export function Sidebar({ navItems, activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col">
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2">
            <HardHat className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-xl">СтройCRM</h1>
            <p className="text-blue-200 text-sm">Управление проектами</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === item.id
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-500">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span>АИ</span>
          </div>
          <div>
            <p className="font-medium">Администратор</p>
            <p className="text-sm text-blue-200">admin@stroycrm.ru</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
