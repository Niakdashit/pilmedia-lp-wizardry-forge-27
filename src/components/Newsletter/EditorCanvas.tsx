
import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useNewsletterStore } from '@/stores/newsletterStore';
import { ModuleRenderer } from './ModuleRenderer';

export const EditorCanvas: React.FC = () => {
  const { modules, generatedHTML, setFromGeneratedHTML, selectModule } = useNewsletterStore();
  const { setNodeRef, isOver } = useDroppable({ id: 'editor' });

  useEffect(() => {
    if (generatedHTML) {
      setFromGeneratedHTML(generatedHTML);
    }
  }, [generatedHTML, setFromGeneratedHTML]);

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objet de l'email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Saisissez l'objet de votre newsletter..."
            />
          </div>

          <div
            ref={setNodeRef}
            className={`min-h-[600px] p-6 transition-colors duration-200 ${
              isOver ? 'bg-[#f8f0f5]' : 'bg-white'
            }`}
          >
            {modules.length === 0 ? (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <p className="mb-2">Glissez et déposez des modules ici</p>
                  <p className="text-sm">pour créer votre newsletter</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module) => (
                  <div 
                    key={module.id} 
                    onClick={() => selectModule(module.id)}
                  >
                    <ModuleRenderer module={module} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
