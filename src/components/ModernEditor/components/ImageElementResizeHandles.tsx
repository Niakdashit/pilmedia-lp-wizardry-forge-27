
import React from 'react';

interface ImageElementResizeHandlesProps {
  onResizeStart: (e: React.MouseEvent) => void;
}

const ImageElementResizeHandles: React.FC<ImageElementResizeHandlesProps> = ({
  onResizeStart
}) => {
  return (
    <>
      {/* Main resize handle */}
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded cursor-se-resize hover:bg-blue-600 flex items-center justify-center"
        onMouseDown={onResizeStart}
        title="Redimensionner"
      >
        <div className="w-2 h-2 bg-white rounded-sm"></div>
      </div>
      
      {/* Corner resize handles for better UX */}
      <div
        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded cursor-ne-resize hover:bg-blue-600"
        onMouseDown={onResizeStart}
        title="Redimensionner"
      />
      <div
        className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-sw-resize hover:bg-blue-600"
        onMouseDown={onResizeStart}
        title="Redimensionner"
      />
      <div
        className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded cursor-nw-resize hover:bg-blue-600"
        onMouseDown={onResizeStart}
        title="Redimensionner"
      />
    </>
  );
};

export default ImageElementResizeHandles;
