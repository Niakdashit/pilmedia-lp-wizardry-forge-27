
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Palette, Upload } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import { useNavigate } from 'react-router-dom';

const predefinedThemes = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Design professionnel et élégant',
    preview: 'from-blue-600 to-blue-800',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      background: '#f8fafc'
    }
  },
  {
    id: 'festive',
    name: 'Festif',
    description: 'Couleurs vives et joyeuses',
    preview: 'from-purple-600 to-pink-600',
    colors: {
      primary: '#9333ea',
      secondary: '#ec4899',
      background: '#fdf4ff'
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Tons verts et naturels',
    preview: 'from-green-600 to-emerald-600',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      background: '#f0fdf4'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Design épuré et moderne',
    preview: 'from-gray-600 to-gray-800',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      background: '#ffffff'
    }
  }
];

const Step3VisualStyle: React.FC = () => {
  const navigate = useNavigate();
  const { saveCampaign } = useCampaigns();
  const [isCreating, setIsCreating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const {
    selectedGameType,
    campaignName,
    launchDate,
    marketingGoal,
    logoFile,
    selectedTheme,
    backgroundImage,
    setSelectedTheme,
    setBackgroundImage,
    setCurrentStep
  } = useQuickCampaignStore();

  const handleImageUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const createCampaign = async () => {
    setIsCreating(true);
    
    try {
      const selectedThemeData = predefinedThemes.find(t => t.id === selectedTheme);
      
      // Convertir le logo en base64 si présent
      let logoBase64 = null;
      if (logoFile) {
        const reader = new FileReader();
        logoBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(logoFile);
        });
      }

      // Convertir l'image de fond en base64 si présente
      let backgroundBase64 = null;
      if (backgroundImage) {
        const reader = new FileReader();
        backgroundBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(backgroundImage);
        });
      }

      const campaignData = {
        name: campaignName,
        type: selectedGameType,
        status: 'draft' as const,
        description: `Campagne ${selectedGameType} créée via Quick Campaign`,
        design: {
          theme: selectedTheme,
          colors: selectedThemeData?.colors,
          logo: logoBase64,
          backgroundImage: backgroundBase64,
          background: selectedThemeData?.colors.background
        },
        gameConfig: {
          [selectedGameType]: {
            // Configuration par défaut selon le type de jeu
          }
        },
        marketingGoal,
        startDate: launchDate
      };

      const result = await saveCampaign(campaignData);
      
      if (result) {
        // Rediriger vers l'éditeur moderne avec la nouvelle campagne
        navigate(`/modern-campaign/${result.id}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 text-white">
            Personnalisez l'apparence
          </h1>
          <p className="text-2xl text-white">
            Choisissez un thème et ajoutez vos éléments visuels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl p-10 space-y-10 border border-white/20"
        >
          {/* Thèmes prédéfinis */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Thème visuel
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {predefinedThemes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all text-left
                    bg-white/60 backdrop-blur-sm shadow-lg
                    ${selectedTheme === theme.id 
                      ? 'border-[#841b60] bg-[#841b60]/10 shadow-xl' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                    }
                  `}
                >
                  <div className={`w-full h-20 rounded-xl bg-gradient-to-r ${theme.preview} mb-4`}></div>
                  <div className="font-bold text-gray-900 text-lg mb-2">{theme.name}</div>
                  <div className="text-gray-600 text-sm">{theme.description}</div>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#841b60] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Image de fond personnalisée */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Image de fond (optionnel)
              </label>
            </div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              className={`
                border-2 border-dashed rounded-3xl p-10 text-center transition-all
                bg-white/40 backdrop-blur-sm
                ${dragActive ? 'border-[#841b60] bg-[#841b60]/10' : 'border-gray-300'}
              `}
            >
              {backgroundImage ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(backgroundImage)} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-green-600 font-bold text-lg">{backgroundImage.name}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setBackgroundImage(null)}
                    className="text-gray-500 hover:text-red-500 font-medium"
                  >
                    Supprimer
                  </motion.button>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <p className="text-gray-600 mb-3 text-lg">
                    Glissez votre image de fond ici ou{' '}
                    <label className="text-[#841b60] cursor-pointer hover:underline font-medium">
                      parcourez
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-gray-400">PNG, JPG jusqu'à 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(2)}
              className="flex items-center space-x-3 px-8 py-4 text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-2xl hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Retour</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createCampaign}
              disabled={isCreating}
              className={`
                px-12 py-4 rounded-2xl font-bold text-lg transition-all
                ${isCreating 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#841b60] to-pink-500 text-white hover:shadow-xl'
                }
              `}
            >
              {isCreating ? 'Création...' : 'Créer ma campagne'}
            </motion.button>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-2 bg-gradient-to-r from-[#841b60] to-pink-500 rounded-full"></div>
          </div>
          <p className="text-lg font-medium text-white">Étape 3 sur 3</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
