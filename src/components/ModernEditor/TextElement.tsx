
import React, { useState, useRef, useCallback } from 'react';
import { Trash2, Target } from 'lucide-react';

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
  const [tempPosition, setTempPosition] = useState<{x: number, y: number} | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    
    if (!containerRef.current || !elementRef.current) return;
    
    const elementRect = elementRef.current.getBoundingClientRect();
    
    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;
    
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementWidth = elementRef.current?.offsetWidth || 0;
      const elementHeight = elementRef.current?.offsetHeight || 0;
      
      let newX = moveEvent.clientX - containerRect.left - offsetX;
      let newY = moveEvent.clientY - containerRect.top - offsetY;
      
      // Constrain to container bounds
      newX = Math.max(0, Math.min(newX, containerRect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, containerRect.height - elementHeight));
      
      // Update temp position for immediate visual feedback
      setTempPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (tempPosition) {
        onUpdate(tempPosition);
        setTempPosition(null);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onSelect, onUpdate, containerRef, tempPosition]);

  const handleCenterElement = useCallback(() => {
    if (!containerRef.current || !elementRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementWidth = elementRef.current.offsetWidth;
    const elementHeight = elementRef.current.offsetHeight;
    
    const centerX = (containerRect.width - elementWidth) / 2;
    const centerY = (containerRect.height - elementHeight) / 2;
    
    onUpdate({ x: centerX, y: centerY });
  }, [onUpdate, containerRef]);

  const getTextStyles = useCallback((): React.CSSProperties => ({
    color: element.color || '#000000',
    fontSize: sizeMap[element.size || 'base'] || '14px',
    fontWeight: element.bold ? 'bold' : 'normal',
    fontStyle: element.italic ? 'italic' : 'normal',
    textDecoration: element.underline ? 'underline' : 'none',
    fontFamily: element.fontFamily || 'Inter, sans-serif',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    willChange: isDragging ? 'transform' : 'auto',
    ...(element.showFrame
      ? {
          backgroundColor: element.frameColor || '#ffffff',
          border: `1px solid ${element.frameBorderColor || '#e5e7eb'}`,
          padding: '4px 8px',
          borderRadius: '4px'
        }
      : {})
  }), [element, sizeMap, isDragging]);

  // Use temp position for immediate feedback, fallback to element position
  const currentPosition = tempPosition || { x: element.x, y: element.y };

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        transform: `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`,
        zIndex: isSelected ? 30 : 20,
        ...getTextStyles()
      }}
      onMouseDown={handleMouseDown}
      className={`${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : 'hover:ring-2 hover:ring-gray-300'
      } transition-shadow duration-100`}
    >
      {element.text}
      
      {isSelected && (
        <div className="absolute -top-10 left-0 flex space-x-1 bg-white rounded shadow-lg px-2 py-1 border">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCenterElement();
            }}
            className="p-1 hover:bg-blue-100 text-blue-600 rounded"
            title="Centrer l'élément"
          >
            <Target className="w-3 h-3" />
          </button>
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
