
import React from 'react';

const ProgressIndicator: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-600">Étape 1</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-600">Étape 2</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-blue-600">Étape 3</span>
        </div>
      </div>
      <p className="text-gray-500 font-light">Finalisation de votre campagne</p>
    </div>
  );
};

export default ProgressIndicator;
