
import { useState, useCallback } from 'react';

interface DragState {
  x?: number;
  y?: number;
}

export const useImageElementDrag = (
  elementRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  element: any,
  onUpdate: (updates: any) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tempPosition, setTempPosition] = useState<DragState | null>(null);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current || !elementRef.current) return;

    const elementRect = elementRef.current.getBoundingClientRect();
    
    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;
    
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      
      let newX = moveEvent.clientX - containerRect.left - offsetX;
      let newY = moveEvent.clientY - containerRect.top - offsetY;
      
      // Constrain to container bounds using current element dimensions
      newX = Math.max(0, Math.min(newX, containerRect.width - element.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - element.height));
      
      setTempPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (tempPosition && (tempPosition.x !== undefined || tempPosition.y !== undefined)) {
        onUpdate({ 
          x: tempPosition.x ?? element.x, 
          y: tempPosition.y ?? element.y 
        });
      }
      setTempPosition(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [containerRef, element, onUpdate]);

  return {
    isDragging,
    tempPosition,
    handleDragStart
  };
};
