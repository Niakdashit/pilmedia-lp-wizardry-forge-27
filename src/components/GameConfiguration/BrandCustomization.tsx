
import React, { useState, useCallback } from 'react';
import { Upload, Palette } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface BrandCustomizationProps {
  config: {
    logo: string;
    mainColor: string;
    slogan: string;
    companyName: string;
  };
  onChange: (data: any) => void;
}

const BrandCustomization: React.FC<BrandCustomizationProps> = ({
  config,
  onChange
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ logo: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ logo: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Setup</h2>
        <p className="text-gray-600">Upload your logo and set your brand colors</p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Company Logo
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {config.logo ? (
            <div className="space-y-4">
              <img
                src={config.logo}
                alt="Uploaded logo"
                className="mx-auto max-h-32 object-contain"
              />
              <button
                onClick={() => onChange({ logo: '' })}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove logo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Drag & drop your logo here, or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG, SVG up to 10MB
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Company Name *
        </label>
        <input
          type="text"
          value={config.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="Enter your company name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Slogan */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Slogan or Tagline
        </label>
        <input
          type="text"
          value={config.slogan}
          onChange={(e) => handleInputChange('slogan', e.target.value)}
          placeholder="Your brand's slogan (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Brand Color *
        </label>
        <ColorPicker
          color={config.mainColor}
          onChange={(color) => handleInputChange('mainColor', color)}
        />
      </div>
    </div>
  );
};

export default BrandCustomization;
