
import React from 'react';

export const VideoModule: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            ▶
          </div>
          <span>Vidéo - URL à configurer</span>
        </div>
      </div>
    </div>
  );
};
