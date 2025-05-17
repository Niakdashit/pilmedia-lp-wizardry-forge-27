import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="pt-16 flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onCollapse={setIsCollapsed}
        />
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;