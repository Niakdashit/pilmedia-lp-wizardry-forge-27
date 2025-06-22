
import React from 'react';

const PreviewStep: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Aperçu de la campagne
      </h2>
      <p className="text-gray-600">Aperçu en cours de développement...</p>
    </div>
  );
};

export default PreviewStep;
