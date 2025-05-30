import React, { useState, useRef, useEffect } from 'react';
import { Move, RotateCcw } from 'lucide-react';

interface ResizableGameContainerProps {
  children: React.ReactNode;
  initialSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  onSizeChange?: (size: { width: number; height: number }) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  className?: string;
  lockAspectRatio?: boolean;
}

const ResizableGameContainer: React.FC<ResizableGameContainerProps> = ({
  children,
  initialSize = { width: 400, height: 400 },
  minSize = { width: 200, height: 200 },
  maxSize = { width: 800, height: 800 },
  onSizeChange,
  onPositionChange,
  className = "",
  lockAspectRatio = true
}) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    setDragStart({ x: e.clientX, y: e.clientY });
    
    if (action === 'drag') {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const newPosition = {
        x: position.x + deltaX,
        y: position.y + deltaY
      };
      setPosition(newPosition);
      setDragStart({ x: e.clientX, y: e.clientY });
      onPositionChange?.(newPosition);
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let newWidth = Math.max(minSize.width, Math.min(maxSize.width, size.width + deltaX));
      let newHeight = Math.max(minSize.height, Math.min(maxSize.height, size.height + deltaY));
      
      if (lockAspectRatio) {
        const aspectRatio = initialSize.width / initialSize.height;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }
      
      const newSize = { width: newWidth, height: newHeight };
      setSize(newSize);
      setDragStart({ x: e.clientX, y: e.clientY });
      onSizeChange?.(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    onPositionChange?.({ x: 0, y: 0 });
  };

  const resetSize = () => {
    setSize(initialSize);
    onSizeChange?.(initialSize);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, position, size]);

  return (
    <div className="relative">
      {/* Contrôles */}
      <div className="absolute -top-12 left-0 flex items-center space-x-2 bg-white rounded-lg shadow-md px-3 py-2 z-50">
        <button
          onClick={resetPosition}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Réinitialiser la position"
        >
          <Move className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={resetSize}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Réinitialiser la taille"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-xs text-gray-500">
          {Math.round(size.width)}×{Math.round(size.height)}
        </span>
      </div>

      {/* Conteneur redimensionnable */}
      <div
        ref={containerRef}
        className={`relative border-2 border-dashed border-gray-300 hover:border-[#841b60] transition-colors ${className}`}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        {/* Contenu du jeu */}
        <div className="w-full h-full overflow-hidden rounded-lg">
          {children}
        </div>

        {/* Handle de redimensionnement */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-[#841b60] cursor-se-resize rounded-tl-lg"
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e, 'resize');
          }}
        >
          <div className="absolute bottom-1 right-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Indicateurs visuels */}
        {(isDragging || isResizing) && (
          <div className="absolute inset-0 bg-[#841b60] bg-opacity-10 border-2 border-[#841b60] rounded-lg pointer-events-none">
            <div className="absolute top-2 left-2 bg-[#841b60] text-white text-xs px-2 py-1 rounded">
              {isDragging ? 'Déplacement...' : 'Redimensionnement...'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResizableGameContainer;
