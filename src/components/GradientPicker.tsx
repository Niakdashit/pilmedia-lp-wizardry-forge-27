
import React, { useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

const GradientPicker = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const [active, setActive] = useState('start');
  const [start, setStart] = useState('#ff5858');
  const [end, setEnd] = useState('#f857a6');
  const [direction, setDirection] = useState('to right');
  const [preview, setPreview] = useState(value || 'linear-gradient(to right, #ff5858, #f857a6)');

  const handleStartChange = (color: string) => {
    setStart(color);
    const newGradient = `linear-gradient(${direction}, ${color}, ${end})`;
    setPreview(newGradient);
    onChange(newGradient);
  };

  const handleEndChange = (color: string) => {
    setEnd(color);
    const newGradient = `linear-gradient(${direction}, ${start}, ${color})`;
    setPreview(newGradient);
    onChange(newGradient);
  };

  const handleDirectionChange = (dir: string) => {
    setDirection(dir);
    const newGradient = `linear-gradient(${dir}, ${start}, ${end})`;
    setPreview(newGradient);
    onChange(newGradient);
  };

  const presets = [
    'linear-gradient(to right, #ff5858, #f857a6)',
    'linear-gradient(to right, #43cea2, #185a9d)',
    'linear-gradient(to right, #ffafbd, #ffc3a0)',
    'linear-gradient(to right, #2193b0, #6dd5ed)',
    'linear-gradient(to right, #834d9b, #d04ed6)',
    'linear-gradient(to right, #4568dc, #b06ab3)'
  ];

  return (
    <div className="space-y-4">
      <div 
        className="h-20 w-full rounded-md border"
        style={{ background: preview }}
      />
      
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded text-sm ${active === 'start' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActive('start')}
        >
          Couleur début
        </button>
        <button
          className={`px-3 py-1 rounded text-sm ${active === 'end' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActive('end')}
        >
          Couleur fin
        </button>
      </div>
      
      {active === 'start' ? (
        <>
          <HexColorPicker color={start} onChange={handleStartChange} />
          <HexColorInput color={start} onChange={handleStartChange} prefixed className="w-full p-2 border rounded mt-2" />
        </>
      ) : (
        <>
          <HexColorPicker color={end} onChange={handleEndChange} />
          <HexColorInput color={end} onChange={handleEndChange} prefixed className="w-full p-2 border rounded mt-2" />
        </>
      )}
      
      <div>
        <label className="block mb-2 text-sm font-medium">Direction</label>
        <div className="grid grid-cols-4 gap-2">
          <button
            className={`p-2 border rounded ${direction === 'to top' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to top')}
          >
            ↑
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to right top' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to right top')}
          >
            ↗
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to right' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to right')}
          >
            →
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to right bottom' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to right bottom')}
          >
            ↘
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to bottom' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to bottom')}
          >
            ↓
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to left bottom' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to left bottom')}
          >
            ↙
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to left' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to left')}
          >
            ←
          </button>
          <button
            className={`p-2 border rounded ${direction === 'to left top' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => handleDirectionChange('to left top')}
          >
            ↖
          </button>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium">Gradients prédéfinis</label>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              className="h-8 rounded border"
              style={{ background: preset }}
              onClick={() => {
                setPreview(preset);
                onChange(preset);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientPicker;
