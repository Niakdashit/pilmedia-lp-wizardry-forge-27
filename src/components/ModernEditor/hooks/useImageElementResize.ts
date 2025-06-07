
import { useState, useCallback, useRef } from 'react';

export const useImageElementResize = (
  containerRef: React.RefObject<HTMLDivElement>,
  element: any,
  onUpdate: (updates: any) => void,
  aspectRatioLocked: boolean
) => {
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{startX: number, startY: number, startWidth: number, startHeight: number, aspectRatio: number} | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;
    const aspectRatio = startWidth / startHeight;

    resizeStartRef.current = { startX, startY, startWidth, startHeight, aspectRatio };
    setIsResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !resizeStartRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const { startX, startY, startWidth, startHeight, aspectRatio } = resizeStartRef.current;
      
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newWidth = Math.max(20, startWidth + deltaX);
      let newHeight = Math.max(20, startHeight + deltaY);
      
      // Apply aspect ratio lock if enabled
      if (aspectRatioLocked) {
        const avgDelta = (deltaX + deltaY) / 2;
        newWidth = Math.max(20, startWidth + avgDelta);
        newHeight = newWidth / aspectRatio;
      }
      
      // Constrain to container bounds
      const maxWidth = Math.min(containerRect.width - element.x, 1080);
      const maxHeight = Math.min(containerRect.height - element.y, 1920);
      
      newWidth = Math.min(newWidth, maxWidth);
      newHeight = Math.min(newHeight, maxHeight);
      
      // Re-apply aspect ratio if constrained
      if (aspectRatioLocked) {
        if (newWidth / aspectRatio > newHeight) {
          newWidth = newHeight * aspectRatio;
        } else {
          newHeight = newWidth / aspectRatio;
        }
      }
      
      // Update immediately for real-time feedback
      onUpdate({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [containerRef, element, onUpdate, aspectRatioLocked]);

  return {
    isResizing,
    handleResizeStart
  };
};
