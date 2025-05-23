
import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Move, Edit } from 'lucide-react';
import { useNewsletterStore } from '@/stores/newsletterStore';

interface DraggableModuleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const DraggableModule: React.FC<DraggableModuleProps> = ({ 
  id, 
  children, 
  className,
  onDelete,
  onEdit
}) => {
  const [showControls, setShowControls] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const { selectModule } = useNewsletterStore();

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleClick = () => {
    selectModule(id);
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Overlay pour l'état hover */}
      <div className={`absolute inset-0 border-2 rounded pointer-events-none transition-opacity ${
        showControls ? 'border-[#841b60] opacity-100' : 'border-transparent opacity-0'
      }`}></div>
      
      {/* Barre d'outils */}
      <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md flex items-center transition-all duration-200 z-10 ${
        showControls ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      }`}>
        <button 
          {...attributes} 
          {...listeners}
          className="p-1.5 hover:bg-gray-100 text-gray-700 rounded-l-md"
          title="Déplacer"
        >
          <Move className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200"></div>
        <button 
          className="p-1.5 hover:bg-gray-100 text-gray-700"
          title="Éditer"
          onClick={handleClick}
        >
          <Edit className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200"></div>
        <button 
          className="p-1.5 hover:bg-gray-100 text-red-500 rounded-r-md"
          title="Supprimer"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {/* Contenu du module */}
      {children}
    </div>
  );
};
