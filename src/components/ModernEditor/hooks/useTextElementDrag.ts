
import { useState, useCallback, useRef } from 'react';

export const useTextElementDrag = (
  elementRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  deviceConfig: any,
  onUpdate: (updates: any) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const frameRef = useRef<number | null>(null);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current || !elementRef.current) return;

    const elementRect = elementRef.current.getBoundingClientRect();
    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;
    
    dragStartRef.current = { offsetX, offsetY };
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !dragStartRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elementWidth = elementRef.current?.offsetWidth || 0;
      const elementHeight = elementRef.current?.offsetHeight || 0;

      let newX = moveEvent.clientX - containerRect.left - dragStartRef.current.offsetX;
      let newY = moveEvent.clientY - containerRect.top - dragStartRef.current.offsetY;

      // Constrain to container bounds
      newX = Math.max(0, Math.min(newX, containerRect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, containerRect.height - elementHeight));

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        onUpdate({ x: newX, y: newY });
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [containerRef, deviceConfig, onUpdate]);

  return {
    isDragging,
    handleDragStart
  };
};
