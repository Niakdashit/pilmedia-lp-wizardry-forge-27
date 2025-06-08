
import { useState, useCallback, useRef } from 'react';

export const useImageElementResize = (
  containerRef: React.RefObject<HTMLDivElement>,
  deviceConfig: any,
  onUpdate: (updates: any) => void,
  aspectRatioLocked: boolean
) => {
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{
    startX: number,
    startY: number,
    startWidth: number,
    startHeight: number,
    direction: string,
    aspectRatio: number
  } | null>(null);

  const frameRef = useRef<number | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;

    const aspectRatio = deviceConfig.width / deviceConfig.height;
    
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: deviceConfig.width,
      startHeight: deviceConfig.height,
      direction,
      aspectRatio
    };
    
    setIsResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !resizeStartRef.current) return;

      const deltaX = moveEvent.clientX - resizeStartRef.current.startX;
      const deltaY = moveEvent.clientY - resizeStartRef.current.startY;

      let newWidth = resizeStartRef.current.startWidth;
      let newHeight = resizeStartRef.current.startHeight;

      // Calculate new dimensions based on resize direction
      switch (resizeStartRef.current.direction) {
        case 'se': // bottom-right
          newWidth = Math.max(20, resizeStartRef.current.startWidth + deltaX);
          if (aspectRatioLocked) {
            newHeight = newWidth / resizeStartRef.current.aspectRatio;
          } else {
            newHeight = Math.max(20, resizeStartRef.current.startHeight + deltaY);
          }
          break;
        case 'sw': // bottom-left
          newWidth = Math.max(20, resizeStartRef.current.startWidth - deltaX);
          if (aspectRatioLocked) {
            newHeight = newWidth / resizeStartRef.current.aspectRatio;
          } else {
            newHeight = Math.max(20, resizeStartRef.current.startHeight + deltaY);
          }
          break;
        case 'ne': // top-right
          newWidth = Math.max(20, resizeStartRef.current.startWidth + deltaX);
          if (aspectRatioLocked) {
            newHeight = newWidth / resizeStartRef.current.aspectRatio;
          } else {
            newHeight = Math.max(20, resizeStartRef.current.startHeight - deltaY);
          }
          break;
        case 'nw': // top-left
          newWidth = Math.max(20, resizeStartRef.current.startWidth - deltaX);
          if (aspectRatioLocked) {
            newHeight = newWidth / resizeStartRef.current.aspectRatio;
          } else {
            newHeight = Math.max(20, resizeStartRef.current.startHeight - deltaY);
          }
          break;
      }

      // Constrain to container bounds
      const containerRect = containerRef.current.getBoundingClientRect();
      newWidth = Math.min(newWidth, containerRect.width - deviceConfig.x);
      newHeight = Math.min(newHeight, containerRect.height - deviceConfig.y);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        onUpdate({ width: newWidth, height: newHeight });
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [containerRef, deviceConfig, onUpdate, aspectRatioLocked]);

  return {
    isResizing,
    handleResizeStart
  };
};
