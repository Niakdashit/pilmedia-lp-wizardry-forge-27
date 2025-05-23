
import React from 'react';
import { X } from 'lucide-react';
import { ModuleRenderer } from './ModuleRenderer';
import { NewsletterModule } from '@/types/newsletter';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: NewsletterModule[];
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, modules }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full flex items-start justify-center">
      <div className="bg-white rounded-xl m-6 max-w-4xl w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Aperçu de la newsletter</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex p-4">
          <div className="flex-1 border-r pr-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <h4 className="font-semibold mb-2">Aperçu sur ordinateur</h4>
              <div className="bg-white p-4 rounded shadow-sm">
                {modules.map((module) => (
                  <div key={module.id}>
                    <ModuleRenderer module={module} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 pl-4 max-w-[375px]">
            <div className="bg-gray-100 p-3 rounded-lg">
              <h4 className="font-semibold mb-2">Aperçu sur mobile</h4>
              <div className="bg-white p-3 rounded shadow-sm max-w-[320px] mx-auto">
                {modules.map((module) => (
                  <div key={module.id}>
                    <ModuleRenderer module={module} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
