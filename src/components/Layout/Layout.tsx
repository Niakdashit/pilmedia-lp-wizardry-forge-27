
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useAppContext } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppContext();
  const location = useLocation();
  
  // Check if we're on the campaign editor page
  const isCampaignEditor = location.pathname.includes('/campaign/') && 
                          (location.pathname.includes('/new') || 
                           location.pathname.match(/\/campaign\/\d+$/));
  
  // For campaign editor, use full width without sidebar
  if (isCampaignEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-[#ebf4f7] overflow-hidden">
      <Sidebar />
      <main 
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
