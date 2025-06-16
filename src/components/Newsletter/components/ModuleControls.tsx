
import React from 'react';
import { Trash2, GripVertical, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import { useNewsletterStore, ModuleData } from '@/stores/newsletterStore';

interface ModuleControlsProps {
  module: ModuleData;
}

export const ModuleControls: React.FC<ModuleControlsProps> = ({ module }) => {
  const { removeModule, modules } = useNewsletterStore();

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = modules.findIndex(m => m.id === module.id);
    if (currentIndex > 0) {
      const newModules = [...modules];
      [newModules[currentIndex], newModules[currentIndex - 1]] = [newModules[currentIndex - 1], newModules[currentIndex]];
      // Réorganiser via le store
    }
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = modules.findIndex(m => m.id === module.id);
    if (currentIndex < modules.length - 1) {
      const newModules = [...modules];
      [newModules[currentIndex], newModules[currentIndex + 1]] = [newModules[currentIndex + 1], newModules[currentIndex]];
      // Réorganiser via le store
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { addModule } = useNewsletterStore.getState();
    addModule({
      id: `module-${Date.now()}`,
      type: module.type,
      content: module.content,
      settings: { ...module.settings }
    });
  };

  return (
    <>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
        <button
          onClick={handleMoveUp}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleMoveDown}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <button
          onClick={handleDuplicate}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeModule(module.id);
          }}
          className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
