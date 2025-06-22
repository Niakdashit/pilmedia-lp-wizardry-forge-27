import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  return;
};
export default Sidebar;