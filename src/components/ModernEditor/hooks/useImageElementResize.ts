
import { useState, useCallback } from 'react';

interface ResizeState {
  width?: number;
  height?: number;
}

export const useImageElementResize = (
  containerRef: React.RefObject<HTMLDivElement>,
  element: any,
  onUpdate: (updates: any) => void,
  aspectRatioLocked: boolean,
  tempPosition: any
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [tempResize, setTempResize] = useState<ResizeState | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = tempResize?.width || element.width;
    const startHeight = tempResize?.height || element.height;
    const aspectRatio = startWidth / startHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
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
      
      // Constrain to container bounds (1080x1920 safe zone)
      const maxWidth = Math.min(containerRect.width - (tempPosition?.x || element.x), 1080);
      const maxHeight = Math.min(containerRect.height - (tempPosition?.y || element.y), 1920);
      
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
      
      setTempResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      if (tempResize && (tempResize.width !== undefined || tempResize.height !== undefined)) {
        onUpdate({ 
          width: tempResize.width ?? element.width, 
          height: tempResize.height ?? element.height 
        });
      }
      setTempResize(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [containerRef, element, onUpdate, aspectRatioLocked, tempPosition, tempResize]);

  return {
    isResizing,
    tempResize,
    handleResizeStart
  };
};
