
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Palette } from 'lucide-react';

interface BrandAssetUploadProps {
  logo?: File | string;
  onLogoChange: (logo: File | string) => void;
}

const BrandAssetUpload: React.FC<BrandAssetUploadProps> = ({
  logo,
  onLogoChange
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    onLogoChange(file);
    
    // Simulate color extraction
    setTimeout(() => {
      setExtractedColors(['#841b60', '#6d164f', '#a855f7']);
    }, 1000);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Logo Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive 
            ? 'border-[#841b60] bg-[#841b60]/5' 
            : 'border-gray-300 hover:border-[#841b60]/50 hover:bg-gray-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('logo-upload')?.click()}
      >
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {logo ? (
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Image className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-sm text-gray-600">Click to change logo</p>
          </div>
        ) : (
          <div className="space-y-4">
            <motion.div
              animate={{ y: dragActive ? -5 : 0 }}
              className="w-16 h-16 mx-auto bg-[#841b60]/10 rounded-xl flex items-center justify-center"
            >
              <Upload className="w-8 h-8 text-[#841b60]" />
            </motion.div>
            <div>
              <p className="text-gray-700 font-medium">Drop your logo here</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, SVG up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Colors */}
      {extractedColors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50/50 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="w-4 h-4 text-[#841b60]" />
            <span className="text-sm font-medium text-gray-700">Extracted Colors</span>
          </div>
          <div className="flex space-x-2">
            {extractedColors.map((color, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BrandAssetUpload;
