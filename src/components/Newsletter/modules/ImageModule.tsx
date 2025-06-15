
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface ImageModuleProps {
  module: ModuleData;
}

export const ImageModule: React.FC<ImageModuleProps> = ({ module }) => {
  return (
    <div className="space-y-2">
      {module.content ? (
        <img
          src={module.content}
          alt=""
          className="max-w-full h-auto rounded border"
        />
      ) : (
        <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
          <span className="text-gray-500">Image - URL à configurer</span>
        </div>
      )}
    </div>
  );
};
