
import React, { useState } from 'react';
import { Image, Upload, Palette, Check, Sparkles } from 'lucide-react';

interface BackgroundGalleryProps {
  selectedBackground: string;
  backgroundType: string;
  onBackgroundChange: (background: string) => void;
  onTypeChange: (type: string) => void;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const BackgroundGallery: React.FC<BackgroundGalleryProps> = ({
  selectedBackground,
  backgroundType,
  onBackgroundChange,
  onTypeChange,
  brandColors
}) => {
  const [activeTab, setActiveTab] = useState<'gradients' | 'images' | 'custom'>('gradients');

  const gradients = [
    {
      id: 'gradient-1',
      name: 'Ocean Breeze',
      style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'gradient-2',
      name: 'Sunset Glow',
      style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'gradient-3',
      name: 'Forest Mist',
      style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'gradient-4',
      name: 'Purple Dream',
      style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 'gradient-5',
      name: 'Golden Hour',
      style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      id: 'gradient-6',
      name: 'Arctic Aurora',
      style: 'linear-gradient(135deg, #e3ffe7 0%, #d9e7ff 100%)'
    }
  ];

  const backgroundImages = [
    {
      id: 'bg-1',
      name: 'Abstract Waves',
      url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    },
    {
      id: 'bg-2',
      name: 'Geometric Pattern',
      url: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    },
    {
      id: 'bg-3',
      name: 'Digital Art',
      url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    },
    {
      id: 'bg-4',
      name: 'Particle Effect',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    },
    {
      id: 'bg-5',
      name: 'Light Rays',
      url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    },
    {
      id: 'bg-6',
      name: 'Colorful Abstract',
      url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&h=800&fit=crop&crop=entropy&auto=format'
    }
  ];

  const generateBrandGradient = () => {
    return `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onBackgroundChange(reader.result as string);
        onTypeChange('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Image className="w-6 h-6 mr-2" />
          Background Selection
        </h2>
        <p className="text-gray-600">
          Choose a beautiful background that complements your brand
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'gradients', label: 'Gradients', icon: Palette },
          { id: 'images', label: 'Images', icon: Image },
          { id: 'custom', label: 'Custom', icon: Upload }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'gradients' | 'images' | 'custom')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Gradients Tab */}
      {activeTab === 'gradients' && (
        <div className="space-y-6">
          {/* Brand-based Gradient */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Brand Colors Gradient</h3>
            </div>
            <button
              onClick={() => {
                onBackgroundChange(generateBrandGradient());
                onTypeChange('brand-gradient');
              }}
              className={`relative w-full h-32 rounded-xl border-4 transition-all duration-300 overflow-hidden ${
                backgroundType === 'brand-gradient'
                  ? 'border-purple-600 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ background: generateBrandGradient() }}
            >
              {backgroundType === 'brand-gradient' && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                Your Brand Colors
              </div>
            </button>
          </div>

          {/* Preset Gradients */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preset Gradients</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gradients.map((gradient) => (
                <button
                  key={gradient.id}
                  onClick={() => {
                    onBackgroundChange(gradient.style);
                    onTypeChange('gradient');
                  }}
                  className={`relative h-24 rounded-lg border-2 transition-all duration-300 ${
                    selectedBackground === gradient.style
                      ? 'border-purple-600 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ background: gradient.style }}
                >
                  {selectedBackground === gradient.style && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-purple-600" />
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs">
                    {gradient.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Background Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {backgroundImages.map((bg) => (
              <button
                key={bg.id}
                onClick={() => {
                  onBackgroundChange(bg.url);
                  onTypeChange('image');
                }}
                className={`relative h-32 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                  selectedBackground === bg.url
                    ? 'border-purple-600 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={bg.url}
                  alt={bg.name}
                  className="w-full h-full object-cover"
                />
                {selectedBackground === bg.url && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                )}
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs">
                  {bg.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Tab */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Custom Background</h3>
            <p className="text-gray-600 mb-4">
              Upload your own background image (JPG, PNG up to 10MB)
            </p>
            <label className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          
          {selectedBackground && backgroundType === 'custom' && (
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Background Preview</h3>
              <div className="relative h-48 rounded-lg overflow-hidden border-2 border-purple-600">
                <img
                  src={selectedBackground}
                  alt="Custom background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Preview</h3>
        <div
          className="w-full h-48 rounded-lg border border-gray-200 flex items-center justify-center"
          style={{
            background: selectedBackground.startsWith('http') 
              ? `url(${selectedBackground})` 
              : selectedBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="bg-black bg-opacity-20 text-white px-4 py-2 rounded-lg text-center">
            <h4 className="font-bold text-lg">Your Game Title</h4>
            <p>This is how your background will look</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGallery;
