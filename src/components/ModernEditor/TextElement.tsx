
import React, { useState, useRef } from 'react';
import { Trash2, Move, Type } from 'lucide-react';

interface TextElementProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  sizeMap: Record<string, string>;
}

const TextElement: React.FC<TextElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  containerRef,
  sizeMap
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    setIsDragging(true);

    const startX = e.clientX - element.x;
    const startY = e.clientY - element.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !elementRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      
      const newX = Math.max(0, Math.min(
        moveEvent.clientX - containerRect.left - startX,
        containerRect.width - elementRect.width
      ));
      const newY = Math.max(0, Math.min(
        moveEvent.clientY - containerRect.top - startY,
        containerRect.height - elementRect.height
      ));
      
      onUpdate({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getTextStyles = (): React.CSSProperties => ({
    color: element.color || '#000000',
    fontSize: sizeMap[element.size || 'base'] || '14px',
    fontWeight: element.bold ? 'bold' : 'normal',
    fontStyle: element.italic ? 'italic' : 'normal',
    textDecoration: element.underline ? 'underline' : 'none',
    fontFamily: element.fontFamily || 'Inter, sans-serif',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    ...(element.showFrame
      ? {
          backgroundColor: element.frameColor || '#ffffff',
          border: `1px solid ${element.frameBorderColor || '#e5e7eb'}`,
          padding: '4px 8px',
          borderRadius: '4px'
        }
      : {})
  });

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        zIndex: isSelected ? 30 : 20,
        ...getTextStyles()
      }}
      onMouseDown={handleMouseDown}
      className={`${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : 'hover:ring-2 hover:ring-gray-300'
      } transition-all duration-200 ${
        isDragging ? 'scale-105' : ''
      }`}
    >
      {element.text}
      
      {isSelected && (
        <div className="absolute -top-8 left-0 flex space-x-1 bg-white rounded shadow-lg px-2 py-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="Supprimer"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextElement;
