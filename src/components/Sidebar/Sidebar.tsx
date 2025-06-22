
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Target, Gamepad2, Mail, BarChart3, Users, Database, Share2, BookOpen, UserCircle, LogOut, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import logo from '@/assets/logo.png';
import logoIcon from '@/assets/logo2.png';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    sidebarCollapsed,
    toggleSidebar
  } = useAppContext();

  const navItems = [{
    name: 'Tableau de bord',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  }, {
    name: 'Campagnes',
    path: '/campaigns',
    icon: <Target className="w-5 h-5" />
  }, {
    name: 'Gamification',
    path: '/gamification',
    icon: <Gamepad2 className="w-5 h-5" />
  }, {
    name: 'Newsletter',
    path: '/newsletter',
    icon: <Mail className="w-5 h-5" />
  }, {
    name: 'Statistiques',
    path: '/statistics',
    icon: <BarChart3 className="w-5 h-5" />
  }, {
    name: 'Contacts',
    path: '/contacts',
    icon: <Users className="w-5 h-5" />
  }, {
    name: 'Données',
    path: '/data',
    icon: <Database className="w-5 h-5" />
  }, {
    name: 'Réseaux sociaux',
    path: '/social',
    icon: <Share2 className="w-5 h-5" />
  }, {
    name: 'Études',
    path: '/studies',
    icon: <BookOpen className="w-5 h-5" />
  }, {
    name: 'Compte',
    path: '/account',
    icon: <UserCircle className="w-5 h-5" />
  }];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 transition-transform duration-300 ${
      sidebarCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
    } ${sidebarCollapsed ? 'md:w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <img src={logo} alt="Leadya Logo" className="h-8 w-auto" />
        )}
        {sidebarCollapsed && (
          <img src={logoIcon} alt="Leadya" className="h-8 w-8 mx-auto" />
        )}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#841b60] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className={`flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full ${
          sidebarCollapsed ? 'justify-center' : ''
        }`}>
          <LogOut className="w-5 h-5" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
