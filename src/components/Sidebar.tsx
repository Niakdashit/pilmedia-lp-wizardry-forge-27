
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Edit3, BarChart2, Settings, LogOut, Gamepad2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const mainNavItems: NavItem[] = [
    { path: '/dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard/campaigns', label: 'Campagnes', icon: <Edit3 className="w-5 h-5" /> },
    { path: '/dashboard/gamification', label: 'Gamification', icon: <Gamepad2 className="w-5 h-5" /> },
    { path: '/dashboard/statistics', label: 'Statistiques', icon: <BarChart2 className="w-5 h-5" /> },
  ];

  const settingsNavItems: NavItem[] = [
    { path: '/dashboard/account', label: 'Compte', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-md z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'} lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center lg:hidden mb-4">
            <div className="flex items-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5C13.954 5 5 13.954 5 25C5 36.046 13.954 45 25 45C36.046 45 45 36.046 45 25C45 13.954 36.046 5 25 5Z" fill="#841b60"/>
                <path d="M15 20H22V35H15V20Z" fill="white"/>
                <path d="M25 15H32V35H25V15Z" fill="white"/>
                <path d="M35 25H42V35H35V25Z" fill="white"/>
              </svg>
              {!isCollapsed && <span className="ml-2 text-lg font-semibold">Pilmedia</span>}
            </div>
            <button onClick={onClose} className="p-2">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Collapse button - visible only on desktop */}
          <button
            onClick={() => onCollapse(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white rounded-full shadow-md items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>

          <div className="mb-8">
            <h3 className={`text-xs uppercase text-gray-500 font-semibold mb-4 ${isCollapsed ? 'text-center' : ''}`}>
              {!isCollapsed && 'Menu principal'}
            </h3>
            <ul>
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center py-2 px-3 rounded-md ${
                      location.pathname === item.path
                        ? 'sidebar-item active bg-opacity-20 border-l-4 border-[#841b60] text-[#841b60]'
                        : 'sidebar-item text-gray-600 hover:bg-gray-100'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className={isCollapsed ? '' : 'mr-3'}>
                      {item.icon}
                    </div>
                    {!isCollapsed && item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`text-xs uppercase text-gray-500 font-semibold mb-4 ${isCollapsed ? 'text-center' : ''}`}>
              {!isCollapsed && 'Paramètres'}
            </h3>
            <ul>
              {settingsNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center py-2 px-3 rounded-md ${
                      location.pathname === item.path
                        ? 'sidebar-item active bg-opacity-20 border-l-4 border-[#841b60] text-[#841b60]'
                        : 'sidebar-item text-gray-600 hover:bg-gray-100'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className={isCollapsed ? '' : 'mr-3'}>
                      {item.icon}
                    </div>
                    {!isCollapsed && item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center py-2 px-3 rounded-md text-gray-600 hover:bg-gray-100 ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  title={isCollapsed ? 'Déconnexion' : undefined}
                >
                  <LogOut className={`text-gray-600 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && 'Déconnexion'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
