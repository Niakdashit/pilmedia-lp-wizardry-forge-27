
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface HTMLModuleProps {
  module: ModuleData;
}

export const HTMLModule: React.FC<HTMLModuleProps> = ({ module }) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div
        className="bg-gray-50 p-4 border rounded min-h-[60px]"
        dangerouslySetInnerHTML={{ __html: String(module.content || '<p>Code HTML personnalisé</p>') }}
      />
    </div>
  );
};
