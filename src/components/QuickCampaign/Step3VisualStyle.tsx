
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Eye, Settings, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import CampaignPreviewModal from './CampaignPreviewModal';

// ----------- MAPPING CORRIGÉ : Jackpot a des images réelles ----------- //
const templatesByMechanic: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  colors?: { primary: string; secondary: string; background: string };
  preview?: string;
  borderColor: string;
  glowColor: string;
  image?: string; // <-- Ajout pour afficher le mockup réel
}>> = {
  jackpot: [
    {
      id: 'Tjackpot1',
      name: 'Jackpot Casino',
      description: 'Effet machine à sous casino, ambiance festive.',
      image: require('../../assets/templates/Tjackpot1.svg').default,
      borderColor: 'border-yellow-400',
      glowColor: 'shadow-yellow-400/30'
    },
    {
      id: 'Tjackpot2',
      name: 'Jackpot Vegas',
      description: 'Look Vegas, couleurs néon, lumière.',
      image: require('../../assets/templates/Tjackpot2.svg').default,
      borderColor: 'border-pink-400',
      glowColor: 'shadow-pink-400/30'
    }
  ],
  quiz: [
    {
      id: 'modern',
      name: 'Quiz Moderne',
      description: 'Design épuré pour du contenu interactif.',
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        background: '#f0f9ff'
      },
      preview: 'bg-gradient-to-br from-purple-500 to-cyan-400',
      borderColor: 'border-purple-400',
      glowColor: 'shadow-purple-500/30'
    },
    {
      id: 'educ',
      name: 'Éducatif Fun',
      description: 'Ambiance apprentissage, couleurs douces.',
      colors: {
        primary: '#f59e42',
        secondary: '#34d399',
        background: '#fff9e6'
      },
      preview: 'bg-gradient-to-br from-orange-300 to-green-200',
      borderColor: 'border-orange-300',
      glowColor: 'shadow-orange-300/30'
    }
  ],
  corporate: [
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Élégant et professionnel',
      colors: {
        primary: '#1f2937',
        secondary: '#3b82f6',
        background: '#f8fafc'
      },
      preview: 'bg-gradient-to-br from-gray-700 to-blue-600',
      borderColor: 'border-blue-400',
      glowColor: 'shadow-blue-500/30'
    }
  ],
  roue: [
    {
      id: 'color',
      name: 'Chance Colorée',
      description: 'Roue multicolore, dynamique et festive.',
      colors: {
        primary: '#f472b6',
        secondary: '#3b82f6',
        background: '#fff0f6'
      },
      preview: 'bg-gradient-to-br from-pink-300 to-blue-200',
      borderColor: 'border-blue-400',
      glowColor: 'shadow-blue-300/30'
    }
  ],
  // ...autres mécaniques à compléter
};

const Step3VisualStyle: React.FC = () => {
  const navigate = useNavigate();
  const { saveCampaign } = useCampaigns();
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
    setCurrentStep,
    reset
  } = useQuickCampaignStore();

  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  const currentTemplates =
    templatesByMechanic[selectedGameType || 'quiz'] ||
    templatesByMechanic['quiz'];

  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setBackgroundImage(files[0]);
    }
  };
  const handleFinish = () => {
    setShowFinalStep(true);
  };
  const handlePreview = () => {
    setShowPreview(true);
  };
  const handleCreateCampaign = async () => {
    setIsCreating(true);
    try {
      const selectedTemplate =
        currentTemplates.find((tpl) => tpl.id === selectedTheme) ||
        currentTemplates[0];
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme,
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage
        },
        design: {
          theme: selectedTheme,
          colors: selectedTemplate?.colors
        },
        status: 'draft' as const
      };
      const result = await saveCampaign(campaignData);
      if (result) {
        setCreationSuccess(true);
        setTimeout(() => {
          reset();
          navigate('/campaigns');
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };
  const handleAdvancedSettings = async () => {
    setIsCreating(true);
    try {
      const selectedTemplate =
        currentTemplates.find((tpl) => tpl.id === selectedTheme) ||
        currentTemplates[0];
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme,
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage
        },
        design: {
          theme: selectedTheme,
          colors: selectedTemplate?.colors
        },
        status: 'draft' as const
      };
      const result = await saveCampaign(campaignData);
      if (result) {
        reset();
        navigate(`/campaign/${result.id}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (showFinalStep) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl p-12 border border-white/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              {creationSuccess ? (
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              ) : (
                <Sparkles className="w-20 h-20 text-[#841b60] mx-auto" />
              )}
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {creationSuccess
                ? 'Campagne créée avec succès !'
                : 'Votre campagne est prête !'}
            </h1>
            {creationSuccess ? (
              <p className="text-xl text-gray-600 mb-8">
                Redirection vers vos campagnes...
              </p>
            ) : (
              <p className="text-xl text-gray-600 mb-8">
                Vous pouvez maintenant la tester ou la personnaliser davantage.
              </p>
            )}
            {!creationSuccess && (
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePreview}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all flex items-center justify-center space-x-3"
                >
                  <Eye className="w-6 h-6" />
                  <span>Voir un aperçu</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateCampaign}
                  disabled={isCreating}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isCreating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Création...</span>
                    </div>
                  ) : (
                    'Créer la campagne'
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdvancedSettings}
                  disabled={isCreating}
                  className="w-full py-4 bg-white/80 text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  <Settings className="w-6 h-6" />
                  <span>Réglages avancés</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
        <CampaignPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      </div>
    );
  }

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
            Choisissez un thème pour votre campagne
          </h1>
          <p className="text-2xl text-white">
            Donnez vie à votre expérience avec un style visuel adapté.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl p-10 space-y-10 border border-white/20"
        >
          {/* Choix des templates dynamiques par mécanique */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Thèmes prédéfinis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentTemplates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTheme(template.id)}
                  className={`
                    p-8 rounded-3xl border-2 transition-all text-left
                    bg-white/60 backdrop-blur-sm shadow-lg
                    ${
                      selectedTheme === template.id
                        ? `${template.borderColor} border-4 ${template.glowColor} shadow-xl`
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                    }
                  `}
                >
                  {template.image ? (
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-32 object-contain rounded-2xl mb-6 shadow-lg bg-white"
                    />
                  ) : (
                    <div
                      className={`w-full h-32 rounded-2xl mb-6 ${template.preview} shadow-lg`}
                    />
                  )}
                  <h4 className="font-bold text-xl text-gray-900 mb-3">
                    {template.name}
                  </h4>
                  <p className="text-gray-600">{template.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
          {/* Upload d'image de fond */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Image de fond personnalisée (optionnel)
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center bg-white/40 backdrop-blur-sm">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              {backgroundImage ? (
                <div>
                  <p className="text-green-600 font-bold text-lg">
                    {backgroundImage.name}
                  </p>
                  <button
                    onClick={() => setBackgroundImage(null)}
                    className="text-gray-500 hover:text-red-500 mt-3 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-3 text-lg">
                    <label className="text-blue-500 cursor-pointer hover:underline font-medium">
                      Téléchargez une image de fond
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-gray-400">PNG, JPG jusqu'à 10MB</p>
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
              onClick={handleFinish}
              disabled={!selectedTheme}
              className={`
                px-12 py-4 rounded-2xl font-bold text-lg transition-all
                ${
                  selectedTheme
                    ? 'bg-gradient-to-r from-[#841b60] to-pink-500 text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Finaliser
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
