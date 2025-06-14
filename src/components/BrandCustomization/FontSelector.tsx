
import React from 'react';
import { Type, Check } from 'lucide-react';

interface FontSelectorProps {
  selectedFont: string;
  onChange: (font: string) => void;
  gameType: string;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onChange,
  gameType
}) => {
  const fonts = [
    { name: 'Inter', category: 'Modern & Clean', preview: 'The quick brown fox jumps' },
    { name: 'Poppins', category: 'Friendly & Rounded', preview: 'The quick brown fox jumps' },
    { name: 'Roboto', category: 'Google Standard', preview: 'The quick brown fox jumps' },
    { name: 'Montserrat', category: 'Bold & Strong', preview: 'The quick brown fox jumps' },
    { name: 'Open Sans', category: 'Highly Readable', preview: 'The quick brown fox jumps' },
    { name: 'Lato', category: 'Elegant & Professional', preview: 'The quick brown fox jumps' },
    { name: 'Nunito', category: 'Soft & Rounded', preview: 'The quick brown fox jumps' },
    { name: 'Source Sans Pro', category: 'Technical & Clean', preview: 'The quick brown fox jumps' }
  ];

  const gameTypeRecommendations = {
    wheel: ['Poppins', 'Montserrat', 'Nunito'],
    jackpot: ['Montserrat', 'Roboto', 'Open Sans'],
    scratch: ['Inter', 'Poppins', 'Lato'],
    quiz: ['Open Sans', 'Source Sans Pro', 'Roboto']
  };

  const recommendedFonts = gameTypeRecommendations[gameType as keyof typeof gameTypeRecommendations] || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Type className="w-6 h-6 mr-2" />
          Typography Selection
        </h2>
        <p className="text-gray-600">
          Choose the perfect font family for your {gameType} campaign
        </p>
      </div>

      {/* Recommended Fonts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recommended for {gameType.charAt(0).toUpperCase() + gameType.slice(1)} Games
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fonts
            .filter(font => recommendedFonts.includes(font.name))
            .map((font) => (
              <button
                key={font.name}
                onClick={() => onChange(font.name)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedFont === font.name
                    ? 'border-purple-600 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg" style={{ fontFamily: font.name }}>
                    {font.name}
                  </h4>
                  {selectedFont === font.name && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{font.category}</p>
                <p 
                  className="text-gray-900 text-base"
                  style={{ fontFamily: font.name }}
                >
                  {font.preview}
                </p>
              </button>
            ))}
        </div>
      </div>

      {/* All Fonts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">All Available Fonts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fonts.map((font) => (
            <button
              key={font.name}
              onClick={() => onChange(font.name)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedFont === font.name
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold" style={{ fontFamily: font.name }}>
                  {font.name}
                </h4>
                {selectedFont === font.name && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <p className="text-xs text-gray-500 mb-2">{font.category}</p>
              <p 
                className="text-gray-800 text-sm"
                style={{ fontFamily: font.name }}
              >
                {font.preview}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Preview</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Heading (24px)</p>
            <h2 
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: selectedFont }}
            >
              Spin the Wheel and Win Amazing Prizes!
            </h2>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Body Text (16px)</p>
            <p 
              className="text-base text-gray-700"
              style={{ fontFamily: selectedFont }}
            >
              Try your luck with our exciting {gameType} game. Enter your email to participate and win exclusive rewards designed just for you.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Text (14px)</p>
            <button 
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium"
              style={{ fontFamily: selectedFont }}
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
