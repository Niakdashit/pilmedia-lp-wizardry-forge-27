import React from 'react';

interface DraggableComponentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, children, className }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={className}
    >
      {children}
    </div>
  );
};