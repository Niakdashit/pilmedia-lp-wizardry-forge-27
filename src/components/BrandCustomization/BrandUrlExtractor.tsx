
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Palette, Wand2, Upload, CheckCircle } from 'lucide-react';
import { generateBrandThemeFromUrl } from '../../utils/BrandStyleAnalyzer';

interface BrandUrlExtractorProps {
  data: any;
  onChange: (colors: any) => void;
  onLogoChange: (logoUrl: string) => void;
  onWebsiteChange: (websiteUrl: string) => void;
}

const BrandUrlExtractor: React.FC<BrandUrlExtractorProps> = ({
  data,
  onChange,
  onLogoChange,
  onWebsiteChange
}) => {
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl || '');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionComplete, setExtractionComplete] = useState(false);

  const handleExtractColors = async () => {
    if (!websiteUrl.trim()) return;

    setIsExtracting(true);
    setExtractionComplete(false);

    try {
      const brandTheme = await generateBrandThemeFromUrl(websiteUrl);
      
      onChange({
        primary: brandTheme.customColors.primary,
        secondary: brandTheme.customColors.secondary,
        accent: brandTheme.customColors.accent
      });

      if (brandTheme.logoUrl) {
        onLogoChange(brandTheme.logoUrl);
      }

      onWebsiteChange(websiteUrl);
      setExtractionComplete(true);
    } catch (error) {
      console.error('Error extracting brand colors:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const ColorPreview = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center space-x-3">
      <div
        className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
        style={{ backgroundColor: color }}
      ></div>
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500 font-mono">{color}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Palette className="w-6 h-6 mr-2" />
          Automatic Brand Color Extraction
        </h2>
        <p className="text-gray-600">
          Enter your website URL to automatically extract your brand colors and logo
        </p>
      </div>

      {/* URL Input */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Website URL
        </label>
        <div className="flex space-x-4">
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
          <button
            onClick={handleExtractColors}
            disabled={!websiteUrl.trim() || isExtracting}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
              !websiteUrl.trim() || isExtracting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
            }`}
          >
            {isExtracting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting...</span>
              </>
            ) : extractionComplete ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Re-extract</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Extract Colors</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Colors */}
      {(data.extractedColors.primary !== '#3B82F6' || extractionComplete) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">Extracted Brand Colors</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorPreview color={data.extractedColors.primary} label="Primary Color" />
            <ColorPreview color={data.extractedColors.secondary} label="Secondary Color" />
            <ColorPreview color={data.extractedColors.accent} label="Accent Color" />
          </div>
        </motion.div>
      )}

      {/* Manual Color Override */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Manual Color Override (Optional)
        </h3>
        <p className="text-gray-600 mb-6">
          You can manually adjust the extracted colors if needed
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['primary', 'secondary', 'accent'].map((colorType) => (
            <div key={colorType} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {colorType} Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={data.extractedColors[colorType]}
                  onChange={(e) => onChange({
                    ...data.extractedColors,
                    [colorType]: e.target.value
                  })}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={data.extractedColors[colorType]}
                  onChange={(e) => onChange({
                    ...data.extractedColors,
                    [colorType]: e.target.value
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandUrlExtractor;
