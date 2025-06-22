
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface ColumnsModuleProps {
  module: ModuleData;
}

export const ColumnsModule: React.FC<ColumnsModuleProps> = ({ module }) => {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${module.settings?.columns || 2}, 1fr)` }}>
      {Array.from({ length: module.settings?.columns || 2 }).map((_, index) => {
        let columnContent = '';
        try {
          const parsedContent = JSON.parse(module.content || '[]');
          columnContent = Array.isArray(parsedContent) ? (parsedContent[index] || `Contenu colonne ${index + 1}`) : `Contenu colonne ${index + 1}`;
        } catch {
          columnContent = index === 0 ? (module.content || `Contenu colonne ${index + 1}`) : `Contenu colonne ${index + 1}`;
        }
        
        return (
          <div key={index} className="border border-gray-200 rounded p-4 bg-white">
            <div className="min-h-[80px]">
              {columnContent}
            </div>
          </div>
        );
      })}
    </div>
  );
};
