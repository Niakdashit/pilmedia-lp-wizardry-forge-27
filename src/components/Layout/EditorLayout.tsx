
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useAppContext } from '../../context/AppContext';

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  const { sidebarCollapsed, dispatch } = useAppContext();
  
  // Force sidebar to be collapsed by default in editor
  React.useEffect(() => {
    if (!sidebarCollapsed) {
      dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: true });
    }
  }, [sidebarCollapsed, dispatch]);

  return (
    <div className="min-h-screen bg-[#ebf4f7] flex w-full">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

export default EditorLayout;
