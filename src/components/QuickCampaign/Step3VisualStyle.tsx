
import React, { useState } from 'react';
import { ArrowLeft, Upload, Eye, Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import CampaignPreviewModal from './CampaignPreviewModal';
import ColorCustomizer from './ColorCustomizer';

// IMPORTS SVG
import Tjackpot1 from '../../assets/templates/Tjackpot1.svg';
import Tjackpot2 from '../../assets/templates/Tjackpot2.svg';
import Tjackpot3 from '../../assets/templates/Tjackpot3.svg';
import Tjackpot4 from '../../assets/templates/Tjackpot4.svg';
import Tjackpot5 from '../../assets/templates/Tjackpot5.svg';

const templatesByMechanic: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  colors?: { primary: string; secondary: string; background: string };
  preview?: string;
  borderColor: string;
  glowColor: string;
  image?: string;
}>> = {
  jackpot: [
    {
      id: 'Tjackpot1',
      name: 'Jackpot Classic',
      description: 'Template classique de machine à sous.',
      image: Tjackpot1,
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
    },
    {
      id: 'Tjackpot2',
      name: 'Jackpot Vegas',
      description: 'Ambiance Vegas, couleurs néon.',
      image: Tjackpot2,
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
    },
    {
      id: 'Tjackpot3',
      name: 'Jackpot Luxe',
      description: 'Version haut de gamme, effet doré.',
      image: Tjackpot3,
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
    },
    {
      id: 'Tjackpot4',
      name: 'Jackpot Fun',
      description: 'Style cartoon, parfait pour les familles.',
      image: Tjackpot4,
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
    },
    {
      id: 'Tjackpot5',
      name: 'Jackpot Minimal',
      description: 'Design minimaliste et épuré.',
      image: Tjackpot5,
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
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
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
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
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
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
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
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
      borderColor: 'border-blue-500',
      glowColor: 'shadow-blue-500/20'
    }
  ]
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
    customColors,
    segmentCount,
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
          hasBackgroundImage: !!backgroundImage,
          customColors,
          ...(selectedGameType === 'roue' && {
            segmentCount,
            roulette: {
              segments: Array.from({ length: segmentCount }).map((_, i) => ({
                label: `Segment ${i + 1}`,
                color: [customColors.primary, customColors.secondary, customColors.accent || '#10b981'][i % 3],
                chance: Math.floor(100 / segmentCount)
              })),
              theme: selectedTheme,
              borderColor: customColors.primary
            }
          }),
          [selectedGameType || 'quiz']: {
            ...(selectedGameType === 'jackpot' && {
              template: selectedTheme
            })
          }
        },
        design: {
          theme: selectedTheme,
          colors: {
            ...selectedTemplate?.colors,
            primary: customColors.primary,
            secondary: customColors.secondary,
            accent: customColors.accent
          },
          template: selectedTheme,
          customColors
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
          hasBackgroundImage: !!backgroundImage,
          customColors,
          ...(selectedGameType === 'roue' && {
            segmentCount,
            roulette: {
              segments: Array.from({ length: segmentCount }).map((_, i) => ({
                label: `Segment ${i + 1}`,
                color: [customColors.primary, customColors.secondary, customColors.accent || '#10b981'][i % 3],
                chance: Math.floor(100 / segmentCount)
              })),
              theme: selectedTheme,
              borderColor: customColors.primary
            }
          }),
          [selectedGameType || 'quiz']: {
            ...(selectedGameType === 'jackpot' && {
              template: selectedTheme
            })
          }
        },
        design: {
          theme: selectedTheme,
          colors: {
            ...selectedTemplate?.colors,
            primary: customColors.primary,
            secondary: customColors.secondary,
            accent: customColors.accent
          },
          template: selectedTheme,
          customColors
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
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-3xl shadow-sm p-12 border border-gray-100">
            <div className="mb-8">
              {creationSuccess ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              ) : (
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              {creationSuccess
                ? 'Campagne créée avec succès !'
                : 'Votre campagne est prête !'}
            </h1>
            {creationSuccess ? (
              <p className="text-lg text-gray-600 mb-8">
                Redirection vers vos campagnes...
              </p>
            ) : (
              <p className="text-lg text-gray-600 mb-8">
                Vous pouvez maintenant la tester ou la personnaliser davantage.
              </p>
            )}
            {!creationSuccess && (
              <div className="space-y-3">
                <button
                  onClick={handlePreview}
                  className="w-full py-3 bg-gray-100 text-gray-900 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>Voir un aperçu</span>
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={isCreating}
                  className="w-full py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isCreating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Création...</span>
                    </div>
                  ) : (
                    'Créer la campagne'
                  )}
                </button>
                <button
                  onClick={handleAdvancedSettings}
                  disabled={isCreating}
                  className="w-full py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Settings className="w-5 h-5" />
                  <span>Réglages avancés</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <CampaignPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Choisissez un thème
          </h1>
          <p className="text-xl text-gray-600">
            Sélectionnez le style visuel de votre campagne
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm p-8 space-y-10 border border-gray-100">
          {/* Templates */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Thèmes disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTheme(template.id)}
                  className={`
                    p-6 rounded-2xl border-2 transition-all text-left bg-white
                    ${
                      selectedTheme === template.id
                        ? 'border-blue-500 shadow-lg ring-4 ring-blue-500/10'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                >
                  {template.image ? (
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-48 object-contain rounded-xl mb-4 bg-gray-50"
                    />
                  ) : (
                    <div
                      className={`w-full h-32 rounded-xl mb-4 ${template.preview}`}
                    />
                  )}
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">
                    {template.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Couleurs */}
          <ColorCustomizer />

          {/* Image de fond */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Image de fond (optionnel)
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {backgroundImage ? (
                <div>
                  <p className="text-green-600 font-medium mb-2">
                    {backgroundImage.name}
                  </p>
                  <button
                    onClick={() => setBackgroundImage(null)}
                    className="text-gray-500 hover:text-red-500 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">
                    <label className="text-blue-500 cursor-pointer hover:text-blue-600 font-medium">
                      Téléchargez une image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-gray-400 text-sm">PNG, JPG jusqu'à 10MB</p>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-xl hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <button
              onClick={handleFinish}
              disabled={!selectedTheme}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all
                ${
                  selectedTheme
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Continuer
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <p className="text-lg font-medium text-gray-600">Étape 3 sur 3</p>
        </div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
