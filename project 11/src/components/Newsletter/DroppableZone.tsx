import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Mail, Image as ImageIcon, Link as LinkIcon, Minus, Share2, Code } from 'lucide-react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface DroppableZoneProps {
  id: string;
  type: 'header' | 'content' | 'footer';
  children?: React.ReactNode;
  items?: string[];
  onSplit?: (moduleId: string) => void;
  onMerge?: (moduleId: string) => void;
}

const DroppableZone: React.FC<DroppableZoneProps> = ({ id, type, children, items = [], onSplit, onMerge }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${type}-${id}`
  });

  const getZoneTitle = () => {
    switch (type) {
      case 'header':
        return 'Zone d\'en-tête';
      case 'content':
        return 'Zone de contenu principal';
      case 'footer':
        return 'Zone de pied de page';
      default:
        return '';
    }
  };

  const getZoneIcon = () => {
    switch (type) {
      case 'header':
        return <ImageIcon className="w-6 h-6 text-gray-400" />;
      case 'content':
        return <Mail className="w-6 h-6 text-gray-400" />;
      case 'footer':
        return <Share2 className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[120px] border-2 ${
        isOver ? 'border-[#841b60] bg-[#f8f0f5]' : 'border-dashed border-gray-300'
      } rounded-lg transition-colors duration-200 ${children ? 'p-4' : 'p-8'}`}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {!children && (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            {getZoneIcon()}
            <p className="text-sm text-gray-500 font-medium">{getZoneTitle()}</p>
            <p className="text-xs text-gray-400">Glissez et déposez des modules ici</p>
          </div>
        )}
        {children}
      </SortableContext>
    </div>
  );
};

export default DroppableZone;