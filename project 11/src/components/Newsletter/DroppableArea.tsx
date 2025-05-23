import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef}
      className="min-h-[200px] bg-white rounded-lg border-2 border-dashed border-gray-300 p-4"
    >
      {children}
    </div>
  );
};