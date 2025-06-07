import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useAppContext } from '../../context/AppContext';
import { Menu } from 'lucide-react';
import logo from '@/assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed, toggleSidebar } = useAppContext();

  return (
    <div className="flex min-h-screen bg-[#ebf4f7] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <button onClick={toggleSidebar} className="text-gray-500">
            <Menu className="w-6 h-6" />
          </button>
          <img src={logo} alt="Leadya Logo" className="h-8 w-auto" />
        </header>
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ml-0 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
