import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Gamepad2,
  Mail,
  BarChart3,
  Users,
  Database, 
  Share2, 
  BookOpen,
  UserCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useAppContext();
  
  const navItems = [
    { name: 'Tableau de bord', path: '/', icon: <LayoutDashboard className="w-6 h-6" /> },
    { name: 'Campagnes', path: '/campaigns', icon: <Target className="w-6 h-6" /> },
    { name: 'Gamification', path: '/gamification', icon: <Gamepad2 className="w-6 h-6" /> },
    { name: 'Newsletter', path: '/newsletter', icon: <Mail className="w-6 h-6" /> },
    { name: 'Statistiques', path: '/statistics', icon: <BarChart3 className="w-6 h-6" /> },
    { name: 'Contacts', path: '/contacts', icon: <Users className="w-6 h-6" /> },
    { name: 'Données', path: '/data', icon: <Database className="w-6 h-6" /> },
    { name: 'Réseaux sociaux', path: '/social', icon: <Share2 className="w-6 h-6" /> },
    { name: 'Études', path: '/studies', icon: <BookOpen className="w-6 h-6" /> },
    { name: 'Compte', path: '/account', icon: <UserCircle className="w-6 h-6" /> },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-10 flex flex-col bg-white/80 backdrop-blur-sm border-r border-gray-200/50 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200/50">
        {!sidebarCollapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-2xl bg-[#841b60] flex items-center justify-center">
              <span className="text-white font-medium text-xl">L</span>
            </div>
            <h1 className="ml-3 text-2xl font-medium text-[#841b60]">Leadya</h1>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-10 h-10 mx-auto rounded-2xl bg-[#841b60] flex items-center justify-center">
            <span className="text-white font-medium text-xl">L</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-[#841b60] focus:outline-none transition-colors duration-200"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <nav className="flex flex-col flex-1 pt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link mx-3 my-1 ${
              location.pathname === item.path ? 'active' : ''
            } ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pb-6">
        <Link
          to="/logout"
          className={`nav-link mx-3 mb-3 ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-6 h-6" />
          {!sidebarCollapsed && <span className="ml-3">Déconnexion</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;