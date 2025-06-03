import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useAppContext } from '../../context/AppContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    sidebarCollapsed
  } = useAppContext();
  return <div className="flex min-h-screen bg-[#ebf4f7] overflow-hidden">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>;
};
export default Layout;