import React, { useState } from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const handleProfileClick = () => {
    navigate('/dashboard/account');
    setShowUserMenu(false);
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/account');
    setShowUserMenu(false);
    localStorage.setItem('accountActiveTab', 'security');
  };

  const handleLogout = () => {
    navigate('/login');
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 p-1 hover:bg-gray-100 rounded-lg"
              onClick={onMenuClick}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5C13.954 5 5 13.954 5 25C5 36.046 13.954 45 25 45C36.046 45 45 36.046 45 25C45 13.954 36.046 5 25 5Z" fill="#841b60"></path>
                <path d="M15 20H22V35H15V20Z" fill="white"></path>
                <path d="M25 15H32V35H25V15Z" fill="white"></path>
                <path d="M35 25H42V35H35V25Z" fill="white"></path>
              </svg>
              <span className="ml-3 text-lg md:text-xl font-bold text-gray-800">Pil<span className="primary-text">media</span> <span className="hidden md:inline text-sm font-normal ml-2">Gestionnaire de Campagnes</span></span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <button 
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={toggleNotifications}
              >
                <Bell className="w-6 h-6 text-gray-600" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-700">Nouvelle campagne créée</p>
                      <p className="text-xs text-gray-500">Il y a 2 heures</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-700">15 nouveaux participants</p>
                      <p className="text-xs text-gray-500">Hier à 14:30</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={toggleUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-[#841b60] flex items-center justify-center text-white font-bold">A</div>
                <span className="ml-2 text-gray-700 hidden md:inline">Admin</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500 hidden md:inline" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon profil
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Paramètres
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;