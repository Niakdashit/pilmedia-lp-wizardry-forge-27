
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface TestimonialModuleProps {
  module: ModuleData;
}

export const TestimonialModule: React.FC<TestimonialModuleProps> = ({ module }) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <blockquote className="text-lg italic text-gray-700 mb-4">
          "{module.content || 'Un témoignage client fantastique...'}"
        </blockquote>
        <cite className="text-sm font-semibold text-gray-600">
          - {module.settings?.author || 'Nom du client'}
        </cite>
      </div>
    </div>
  );
};
