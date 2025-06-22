
import React from 'react';

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
};

export default EditorLayout;
