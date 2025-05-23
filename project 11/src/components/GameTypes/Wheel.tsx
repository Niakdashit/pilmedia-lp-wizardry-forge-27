import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Type, Clock, Upload } from 'lucide-react';

interface WheelProps {
  config: any;
  onConfigChange: (config: any) => void;
}

const Wheel: React.FC<WheelProps> = ({ config, onConfigChange }) => {
  const updateConfig = (field: string, value: any) => {
    const newConfig = {
      ...config,
      [field]: value
    };
    onConfigChange(newConfig);
  };

  const addSegment = () => {
    if (!config.segments) {
      config.segments = [];
    }
    
    if (config.segments.length < 12) {
      const newSegments = [
        ...config.segments,
        {
          id: Date.now(),
          text: `Segment ${config.segments.length + 1}`,
          color: '#' + Math.floor(Math.random()*16777215).toString(16),
          image: '',
          isWinning: false
        }
      ];
      updateConfig('segments', newSegments);
    }
  };

  const removeSegment = (index: number) => {
    const newSegments = [...config.segments];
    newSegments.splice(index, 1);
    updateConfig('segments', newSegments);
  };

  const updateSegment = (index: number, field: string, value: any) => {
    const newSegments = [...config.segments];
    newSegments[index] = {
      ...newSegments[index],
      [field]: value
    };
    updateConfig('segments', newSegments);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('centerLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSegmentImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSegment(index, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texte du centre
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={config.centerText || ''}
              onChange={(e) => updateConfig('centerText', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              placeholder="Tournez la roue !"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo du centre
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
              id="center-logo"
            />
            <label
              htmlFor="center-logo"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">Choisir un logo</span>
            </label>
            {config.centerLogo && (
              <div className="mt-2">
                <img
                  src={config.centerLogo}
                  alt="Logo central"
                  className="w-16 h-16 object-contain mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Segments de la roue ({(config.segments || []).length}/12)
          </label>
          <button
            onClick={addSegment}
            disabled={(config.segments || []).length >= 12}
            className="text-sm text-[#841b60] hover:text-[#6d164f] font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-1" />
            Ajouter un segment
          </button>
        </div>

        <div className="space-y-4">
          {(config.segments || []).map((segment: any, index: number) => (
            <div key={segment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <input
                    type="color"
                    value={segment.color}
                    onChange={(e) => updateSegment(index, 'color', e.target.value)}
                    className="w-full h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div className="col-span-4">
                  <input
                    type="text"
                    value={segment.text}
                    onChange={(e) => updateSegment(index, 'text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    placeholder={`Segment ${index + 1}`}
                  />
                </div>

                <div className="col-span-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSegmentImageChange(index, e)}
                    className="hidden"
                    id={`segment-image-${index}`}
                  />
                  <label
                    htmlFor={`segment-image-${index}`}
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Image</span>
                  </label>
                </div>

                <div className="col-span-2 flex items-center">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={segment.isWinning}
                      onChange={(e) => updateSegment(index, 'isWinning', e.target.checked)}
                      className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span className="text-sm text-gray-600">Gagnant</span>
                  </label>
                </div>

                <div className="col-span-1 flex items-center justify-end">
                  <button
                    onClick={() => removeSegment(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    disabled={(config.segments || []).length <= 4}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {segment.image && (
                <div className="mt-2">
                  <img
                    src={segment.image}
                    alt={`Image segment ${index + 1}`}
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée de rotation (secondes)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="1"
              max="10"
              value={config.spinDuration || 5}
              onChange={(e) => updateConfig('spinDuration', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de tours
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={config.spinCount || 3}
            onChange={(e) => updateConfig('spinCount', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
      </div>
    </div>
  );
};

export default Wheel;