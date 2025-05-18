
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
        isCollapsed={sidebarCollapsed} 
        onCollapse={toggleCollapse}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} />

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
