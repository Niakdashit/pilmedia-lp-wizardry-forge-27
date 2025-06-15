
import React from 'react';
import { useNewsletterStore } from '@/stores/newsletterStore';
import { ModuleContent } from './components/ModuleContent';
import { ModuleControls } from './components/ModuleControls';

interface ModuleRendererProps {
  module: any;
}

export const ModuleRenderer: React.FC<ModuleRendererProps> = ({ module }) => {
  const { selectModule } = useNewsletterStore();

  return (
    <div 
      className="relative p-4 border border-gray-200 rounded-lg mb-4 group hover:border-[#841b60] transition-colors duration-200"
      onClick={() => selectModule(module.id)}
    >
      <ModuleControls module={module} />
      
      <div className="pl-6 pr-24">
        <ModuleContent module={module} />
      </div>
    </div>
  );
};

export default ModuleRenderer;
