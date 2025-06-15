
import React from 'react';
import { DndContext, DragEndEvent, DragOverEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNewsletterStore } from '@/stores/newsletterStore';
import ModuleRenderer from './ModuleRenderer';

interface DragDropProviderProps {
  children: React.ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({ children }) => {
  const { modules, addModule, reorderModules } = useNewsletterStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Si c'est un nouveau module depuis la liste
    if (over.id === 'editor' && !modules.find(m => m.id === active.id)) {
      const moduleType = active.id as string;
      addModule({
        id: `module-${Date.now()}`,
        type: moduleType as any,
        content: getDefaultContent(moduleType),
        settings: {}
      });
      return;
    }

    // Si c'est une réorganisation de modules existants
    if (active.id !== over.id) {
      const oldIndex = modules.findIndex(m => m.id === active.id);
      const newIndex = modules.findIndex(m => m.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderModules(oldIndex, newIndex);
      }
    }
  };

  const getDefaultContent = (moduleType: string) => {
    switch (moduleType) {
      case 'text':
        return 'Votre texte ici...';
      case 'header':
        return 'En-tête de newsletter';
      case 'button':
        return 'Cliquez ici';
      case 'image':
        return '';
      default:
        return '';
    }
  };

  const activeModule = modules.find(m => m.id === activeId);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      
      <DragOverlay>
        {activeModule ? (
          <div className="opacity-80 transform rotate-3 scale-95">
            <ModuleRenderer module={activeModule} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
