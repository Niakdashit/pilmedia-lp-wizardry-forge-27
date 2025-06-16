
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface TextModuleProps {
  module: ModuleData;
}

export const TextModule: React.FC<TextModuleProps> = ({ module }) => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded bg-white">
      <div 
        className="min-h-[60px] whitespace-pre-wrap"
        style={{ fontSize: '14px', lineHeight: '1.5' }}
      >
        {module.content || 'Cliquez pour modifier ce texte...'}
      </div>
    </div>
  );
};
