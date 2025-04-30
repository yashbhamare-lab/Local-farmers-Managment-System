import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wheat, 
  Droplet,
  CalendarDays, 
  DollarSign, 
  BarChart2, 
  Settings,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/farmers', icon: <Users size={20} />, label: 'Farmers' },
    { path: '/crops', icon: <Wheat size={20} />, label: 'Crops' },
    { path: '/livestock', icon: <Droplet size={20} />, label: 'Livestock' },
    { path: '/finances', icon: <DollarSign size={20} />, label: 'Finances' },
    { path: '/calendar', icon: <CalendarDays size={20} />, label: 'Calendar' },
    { path: '/reports', icon: <BarChart2 size={20} />, label: 'Reports' },
    { divider: true },
    { path: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { path: '/help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  return (
    <aside className="w-64 bg-green-800 text-white h-screen fixed left-0 top-0 pt-16 hidden md:block">
      <div className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => 
            item.divider ? (
              <li key={`divider-${index}`} className="border-t border-green-700 my-4"></li>
            ) : (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-green-700 text-white'
                      : 'text-green-100 hover:bg-green-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-2"
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="User"
          />
          <div>
            <div className="text-sm font-medium text-white">Admin User</div>
            <div className="text-xs text-green-200">admin@farmtrack.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;