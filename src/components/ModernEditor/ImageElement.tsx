
import React, { useState, useRef, useCallback } from 'react';
import { useImageElementDrag } from './hooks/useImageElementDrag';
import { useImageElementResize } from './hooks/useImageElementResize';
import ImageElementControls from './components/ImageElementControls';
import ImageElementResizeHandles from './components/ImageElementResizeHandles';

interface ImageElementProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageElement: React.FC<ImageElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  containerRef
}) => {
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  const { isDragging, tempPosition, handleDragStart } = useImageElementDrag(
    elementRef,
    containerRef,
    element,
    onUpdate
  );

  const { isResizing, tempResize, handleResizeStart } = useImageElementResize(
    containerRef,
    element,
    onUpdate,
    aspectRatioLocked,
    tempPosition
  );

  const handleCenterElement = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const currentWidth = tempResize?.width || tempPosition?.width || element.width;
    const currentHeight = tempResize?.height || tempPosition?.height || element.height;
    
    const centerX = (containerRect.width - currentWidth) / 2;
    const centerY = (containerRect.height - currentHeight) / 2;
    
    onUpdate({ x: centerX, y: centerY });
  }, [onUpdate, containerRef, element, tempPosition, tempResize]);

  const toggleAspectRatio = useCallback(() => {
    setAspectRatioLocked(!aspectRatioLocked);
  }, [aspectRatioLocked]);

  const handleRotate = useCallback(() => {
    onUpdate({ rotation: (element.rotation || 0) + 15 });
  }, [onUpdate, element.rotation]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    onSelect();
    handleDragStart(e);
  }, [onSelect, handleDragStart]);

  if (!element.src) {
    return (
      <div
        style={{
          position: 'absolute',
          transform: `translate3d(${element.x}px, ${element.y}px, 0)`,
          width: element.width,
          height: element.height,
          border: '2px dashed #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '12px',
          zIndex: isSelected ? 30 : 20
        }}
        onClick={onSelect}
        className="bg-gray-50 rounded"
      >
        Image vide
      </div>
    );
  }

  // Combine all transform states for immediate feedback
  const currentTransform = {
    x: tempPosition?.x ?? element.x,
    y: tempPosition?.y ?? element.y,
    width: tempResize?.width ?? element.width,
    height: tempResize?.height ?? element.height
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        transform: `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) rotate(${element.rotation || 0}deg)`,
        width: currentTransform.width,
        height: currentTransform.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 30 : 20,
        willChange: isDragging || isResizing ? 'transform' : 'auto'
      }}
      onMouseDown={handleMouseDown}
      className={`${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'} transition-shadow duration-100`}
    >
      <img
        src={element.src}
        alt="Custom element"
        className="w-full h-full object-cover rounded"
        draggable={false}
      />
      
      {isSelected && (
        <>
          <ImageElementControls
            aspectRatioLocked={aspectRatioLocked}
            onCenter={handleCenterElement}
            onToggleAspectRatio={toggleAspectRatio}
            onRotate={handleRotate}
            onDelete={onDelete}
          />
          <ImageElementResizeHandles onResizeStart={handleResizeStart} />
        </>
      )}
    </div>
  );
};

export default ImageElement;
