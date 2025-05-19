
import React, { useState, useEffect } from 'react';

interface SpacingControlsProps {
  padding: string;
  onChange: (padding: string) => void;
  label: string;
}

const SpacingControls: React.FC<SpacingControlsProps> = ({ padding, onChange, label }) => {
  const [uniform, setUniform] = useState(true);
  const [top, setTop] = useState('20');
  const [right, setRight] = useState('20');
  const [bottom, setBottom] = useState('20');
  const [left, setLeft] = useState('20');
  
  useEffect(() => {
    // Parse the current padding value
    const parts = padding.split(' ').map(part => parseInt(part));
    
    if (parts.length === 1) {
      const value = parseInt(parts[0]);
      setTop(value.toString());
      setRight(value.toString());
      setBottom(value.toString());
      setLeft(value.toString());
      setUniform(true);
    } else if (parts.length === 4) {
      setTop(parts[0].toString());
      setRight(parts[1].toString());
      setBottom(parts[2].toString());
      setLeft(parts[3].toString());
      setUniform(false);
    } else if (parts.length === 2) {
      setTop(parts[0].toString());
      setBottom(parts[0].toString());
      setRight(parts[1].toString());
      setLeft(parts[1].toString());
      setUniform(false);
    }
  }, [padding]);
  
  const handleUniformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTop(value);
    if (uniform) {
      setRight(value);
      setBottom(value);
      setLeft(value);
      onChange(`${value}px`);
    } else {
      onChange(`${value}px ${right}px ${bottom}px ${left}px`);
    }
  };
  
  const handleChange = (side: 'top' | 'right' | 'bottom' | 'left', value: string) => {
    switch(side) {
      case 'top':
        setTop(value);
        break;
      case 'right':
        setRight(value);
        break;
      case 'bottom':
        setBottom(value);
        break;
      case 'left':
        setLeft(value);
        break;
    }
    
    onChange(`${side === 'top' ? value : top}px ${side === 'right' ? value : right}px ${side === 'bottom' ? value : bottom}px ${side === 'left' ? value : left}px`);
  };
  
  const toggleUniform = () => {
    if (!uniform) {
      const value = top;
      setRight(value);
      setBottom(value);
      setLeft(value);
      onChange(`${value}px`);
    } else {
      onChange(`${top}px ${right}px ${bottom}px ${left}px`);
    }
    setUniform(!uniform);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button 
          onClick={toggleUniform} 
          type="button"
          className="text-xs text-[#841b60] hover:underline"
        >
          {uniform ? 'Personnaliser les côtés' : 'Uniforme'}
        </button>
      </div>
      
      {uniform ? (
        <div>
          <label className="block text-xs text-gray-600 mb-1">Padding</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={top}
              onChange={handleUniformChange}
              className="w-full mr-3"
            />
            <span className="text-sm text-gray-700 w-10">{top}px</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Haut</label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={top}
                onChange={(e) => handleChange('top', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-sm text-gray-700 w-10">{top}px</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Droite</label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={right}
                onChange={(e) => handleChange('right', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-sm text-gray-700 w-10">{right}px</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Bas</label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={bottom}
                onChange={(e) => handleChange('bottom', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-sm text-gray-700 w-10">{bottom}px</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gauche</label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={left}
                onChange={(e) => handleChange('left', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-sm text-gray-700 w-10">{left}px</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 p-3 border border-gray-200 rounded-md">
        <div 
          className="w-full h-20 bg-[#841b60] bg-opacity-20 rounded flex items-center justify-center"
          style={{ 
            padding: uniform ? `${top}px` : `${top}px ${right}px ${bottom}px ${left}px` 
          }}
        >
          <div className="bg-white p-2 text-xs text-gray-600 rounded">
            Contenu
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacingControls;
