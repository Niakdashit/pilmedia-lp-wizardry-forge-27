
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

  const { isDragging, handleDragStart } = useImageElementDrag(
    elementRef,
    containerRef,
    element,
    onUpdate
  );

  const { isResizing, handleResizeStart } = useImageElementResize(
    containerRef,
    element,
    onUpdate,
    aspectRatioLocked
  );

  const handleCenterElement = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = (containerRect.width - element.width) / 2;
    const centerY = (containerRect.height - element.height) / 2;
    
    onUpdate({ x: centerX, y: centerY });
  }, [onUpdate, containerRef, element]);

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

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        transform: `translate3d(${element.x}px, ${element.y}px, 0) rotate(${element.rotation || 0}deg)`,
        width: element.width,
        height: element.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 30 : 20,
        willChange: isDragging || isResizing ? 'transform' : 'auto',
        transition: isDragging || isResizing ? 'none' : 'box-shadow 0.1s ease'
      }}
      onMouseDown={handleMouseDown}
      className={`${isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}`}
    >
      <img
        src={element.src}
        alt="Custom element"
        className="w-full h-full object-cover rounded"
        draggable={false}
        style={{ pointerEvents: 'none' }}
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
