
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';
import { WizardData } from '../ModernWizard';

interface BrandAssetsProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BrandAssets: React.FC<BrandAssetsProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  const [productName, setProductName] = useState(wizardData.productName || '');

  const handleFileUpload = (type: 'logo' | 'desktopVisual' | 'mobileVisual', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateWizardData({ [type]: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleProductNameChange = (value: string) => {
    setProductName(value);
    updateWizardData({ productName: value });
  };

  const canProceed = wizardData.logo && wizardData.desktopVisual && productName.trim();

  const handleNext = () => {
    if (canProceed) {
      nextStep();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-4">
            Vos éléments de marque
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Importez vos visuels pour créer une expérience sur-mesure
          </p>
        </div>

        {/* Upload sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Logo upload */}
          <UploadZone
            title="Logo"
            description="Format PNG ou SVG recommandé"
            isUploaded={!!wizardData.logo}
            onUpload={(file) => handleFileUpload('logo', file)}
            preview={wizardData.logo}
            required
          />

          {/* Desktop visual upload */}
          <UploadZone
            title="Visuel desktop"
            description="Image principale de votre campagne"
            isUploaded={!!wizardData.desktopVisual}
            onUpload={(file) => handleFileUpload('desktopVisual', file)}
            preview={wizardData.desktopVisual}
            required
          />

          {/* Mobile visual upload */}
          <UploadZone
            title="Visuel mobile"
            description="Optionnel - le visuel desktop sera utilisé par défaut"
            isUploaded={!!wizardData.mobileVisual}
            onUpload={(file) => handleFileUpload('mobileVisual', file)}
            preview={wizardData.mobileVisual}
            required={false}
          />

          {/* Product name */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Nom du produit <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Le nom complet de votre offre ou produit
              </p>
              <input
                type="text"
                value={productName}
                onChange={(e) => handleProductNameChange(e.target.value)}
                placeholder="Ex: Formation Marketing Digital Premium"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#841b60]/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
          >
            Retour
          </motion.button>

          <motion.button
            whileHover={{ scale: canProceed ? 1.05 : 1 }}
            whileTap={{ scale: canProceed ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              canProceed
                ? 'bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuer
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

interface UploadZoneProps {
  title: string;
  description: string;
  isUploaded: boolean;
  onUpload: (file: File) => void;
  preview?: string;
  required: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({
  title,
  description,
  isUploaded,
  onUpload,
  preview,
  required
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`
        relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border-2 border-dashed transition-all duration-300 cursor-pointer group
        ${isUploaded 
          ? 'border-green-300 bg-green-50/50' 
          : 'border-gray-300 hover:border-[#841b60]/50 hover:bg-white/80'
        }
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {preview ? (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-4 rounded-xl overflow-hidden bg-white shadow-md">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center text-green-600 mb-2">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-medium">Importé</span>
          </div>
          <p className="text-sm text-gray-600 text-center">Cliquez pour changer</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-gradient-to-br from-[#841b60]/20 to-[#6554c0]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-[#841b60]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {title} {required && <span className="text-red-500">*</span>}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-xs text-gray-500">Glissez-déposez ou cliquez</p>
        </div>
      )}
    </motion.div>
  );
};

export default BrandAssets;
