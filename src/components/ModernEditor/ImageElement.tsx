
import React, { useState, useRef, useCallback } from 'react';
import { Trash2, RotateCw, Target, Lock, Unlock } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [tempTransform, setTempTransform] = useState<{x?: number, y?: number, width?: number, height?: number} | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();

    if (!containerRef.current || !elementRef.current) return;

    if (action === 'drag') {
      const elementRect = elementRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const offsetX = e.clientX - elementRect.left;
      const offsetY = e.clientY - elementRect.top;
      
      setIsDragging(true);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        
        let newX = moveEvent.clientX - containerRect.left - offsetX;
        let newY = moveEvent.clientY - containerRect.top - offsetY;
        
        // Constrain to container bounds
        newX = Math.max(0, Math.min(newX, containerRect.width - (tempTransform?.width || element.width)));
        newY = Math.max(0, Math.min(newY, containerRect.height - (tempTransform?.height || element.height)));
        
        setTempTransform(prev => ({ ...prev, x: newX, y: newY }));
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        if (tempTransform && (tempTransform.x !== undefined || tempTransform.y !== undefined)) {
          onUpdate({ 
            x: tempTransform.x ?? element.x, 
            y: tempTransform.y ?? element.y 
          });
        }
        setTempTransform(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else if (action === 'resize') {
      setIsResizing(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = tempTransform?.width || element.width;
      const startHeight = tempTransform?.height || element.height;
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
        const maxWidth = Math.min(containerRect.width - (tempTransform?.x || element.x), 1080);
        const maxHeight = Math.min(containerRect.height - (tempTransform?.y || element.y), 1920);
        
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
        
        setTempTransform(prev => ({ 
          ...prev, 
          width: newWidth, 
          height: newHeight 
        }));
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        if (tempTransform && (tempTransform.width !== undefined || tempTransform.height !== undefined)) {
          onUpdate({ 
            width: tempTransform.width ?? element.width, 
            height: tempTransform.height ?? element.height 
          });
        }
        setTempTransform(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [onSelect, onUpdate, containerRef, element, aspectRatioLocked, tempTransform]);

  const handleCenterElement = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const currentWidth = tempTransform?.width || element.width;
    const currentHeight = tempTransform?.height || element.height;
    
    const centerX = (containerRect.width - currentWidth) / 2;
    const centerY = (containerRect.height - currentHeight) / 2;
    
    onUpdate({ x: centerX, y: centerY });
  }, [onUpdate, containerRef, element, tempTransform]);

  const toggleAspectRatio = useCallback(() => {
    setAspectRatioLocked(!aspectRatioLocked);
  }, [aspectRatioLocked]);

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

  // Use temp transform for immediate feedback, fallback to element values
  const currentTransform = {
    x: tempTransform?.x ?? element.x,
    y: tempTransform?.y ?? element.y,
    width: tempTransform?.width ?? element.width,
    height: tempTransform?.height ?? element.height
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
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
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
          {/* Controls */}
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
                toggleAspectRatio();
              }}
              className={`p-1 rounded ${aspectRatioLocked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title={aspectRatioLocked ? "Déverrouiller les proportions" : "Verrouiller les proportions"}
            >
              {aspectRatioLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ rotation: (element.rotation || 0) + 15 });
              }}
              className="p-1 hover:bg-gray-100 rounded"
              title="Rotation"
            >
              <RotateCw className="w-3 h-3" />
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

          {/* Resize handles */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded cursor-se-resize hover:bg-blue-600 flex items-center justify-center"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          >
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          
          {/* Corner resize handles for better UX */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded cursor-ne-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-sw-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-nw-resize hover:bg-blue-600"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
            title="Redimensionner"
          />
        </>
      )}
    </div>
  );
};

export default ImageElement;
