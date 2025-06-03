
import React, { useState } from 'react';
import { ArrowLeft, Upload, Eye, Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import CampaignPreviewModal from './CampaignPreviewModal';
import ColorCustomizer from './ColorCustomizer';

// Template imports
import Tjackpot1 from '../../assets/templates/Tjackpot1.svg';
import Tjackpot2 from '../../assets/templates/Tjackpot2.svg';
import Tjackpot3 from '../../assets/templates/Tjackpot3.svg';
import Tjackpot4 from '../../assets/templates/Tjackpot4.svg';
import Tjackpot5 from '../../assets/templates/Tjackpot5.svg';

const templatesByMechanic: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  colors?: {
    primary: string;
    secondary: string;
    background: string;
  };
  preview?: string;
  image?: string;
}>> = {
  jackpot: [{
    id: 'Tjackpot1',
    name: 'Classic',
    description: 'Élégant et intemporel',
    image: Tjackpot1
  }, {
    id: 'Tjackpot2',
    name: 'Vegas',
    description: 'Ambiance néon éclatante',
    image: Tjackpot2
  }, {
    id: 'Tjackpot3',
    name: 'Luxe',
    description: 'Premium et sophistiqué',
    image: Tjackpot3
  }, {
    id: 'Tjackpot4',
    name: 'Fun',
    description: 'Coloré et familial',
    image: Tjackpot4
  }, {
    id: 'Tjackpot5',
    name: 'Minimal',
    description: 'Épuré et moderne',
    image: Tjackpot5
  }],
  quiz: [{
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et interactif',
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      background: '#f0f9ff'
    },
    preview: 'bg-gradient-to-br from-purple-500 to-cyan-400'
  }, {
    id: 'educ',
    name: 'Éducatif',
    description: 'Apprentissage et couleurs douces',
    colors: {
      primary: '#f59e42',
      secondary: '#34d399',
      background: '#fff9e6'
    },
    preview: 'bg-gradient-to-br from-orange-300 to-green-200'
  }]
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
    setBackgroundImage,
    setCurrentStep,
    reset
  } = useQuickCampaignStore();
  
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  
  const currentTemplates = templatesByMechanic[selectedGameType || 'quiz'] || templatesByMechanic['quiz'];

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
      const selectedTemplate = currentTemplates.find(tpl => tpl.id === selectedTheme) || currentTemplates[0];
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
              segments: Array.from({
                length: segmentCount
              }).map((_, i) => ({
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
      const selectedTemplate = currentTemplates.find(tpl => tpl.id === selectedTheme) || currentTemplates[0];
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
              segments: Array.from({
                length: segmentCount
              }).map((_, i) => ({
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
      <div className="min-h-screen bg-[#ebf4f7] flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">
            <div className="mb-8">
              {creationSuccess ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              ) : (
                <div className="w-16 h-16 bg-[#841b60]/10 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#841b60]" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-6">
              {creationSuccess ? 'Campagne créée avec succès !' : 'Votre campagne est prête !'}
            </h1>
            {creationSuccess ? (
              <p className="text-xl text-gray-600 font-light">
                Redirection vers vos campagnes...
              </p>
            ) : (
              <>
                <p className="text-lg text-gray-600 font-light mb-12">
                  Vous pouvez maintenant la tester ou la personnaliser davantage.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handlePreview}
                    className="w-full py-4 bg-gray-50 text-gray-900 font-medium rounded-2xl 
                               border border-gray-200 hover:bg-gray-100 transition-all 
                               flex items-center justify-center space-x-3"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Voir un aperçu</span>
                  </button>
                  <button
                    onClick={handleCreateCampaign}
                    disabled={isCreating}
                    className="w-full py-4 bg-[#841b60] text-white font-medium rounded-2xl 
                               hover:bg-[#841b60]/90 transition-all disabled:opacity-50"
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
                    className="w-full py-4 bg-gray-50 text-gray-900 font-medium rounded-2xl 
                               border border-gray-200 hover:bg-gray-100 transition-all 
                               flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Réglages avancés</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <CampaignPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebf4f7] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Style visuel
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Personnalisez l'apparence de votre expérience
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Templates */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-8">Thèmes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedTheme === template.id
                        ? 'border-[#841b60] bg-[#841b60]/5'
                        : 'border-gray-200 hover:border-[#841b60]/30 bg-gray-50'
                    }`}
                    onClick={() => useQuickCampaignStore.getState().setSelectedTheme(template.id)}
                  >
                    {template.image ? (
                      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`aspect-video mb-4 rounded-lg ${template.preview || 'bg-gray-100'}`} />
                    )}
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {template.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Customizer */}
            <ColorCustomizer />

            {/* Background Upload */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-8">
                Image de fond <span className="text-gray-400 font-light">(optionnel)</span>
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {backgroundImage ? (
                  <div>
                    <p className="text-gray-900 font-medium mb-2">
                      {backgroundImage.name}
                    </p>
                    <button
                      onClick={() => setBackgroundImage(null)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">
                      <label className="text-[#841b60] cursor-pointer hover:text-[#841b60]/80 transition-colors">
                        Téléchargez une image de fond
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
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 
                         transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <button
              onClick={handleFinish}
              disabled={!selectedTheme}
              className={`
                px-8 py-4 rounded-2xl font-medium transition-all
                ${selectedTheme 
                  ? 'bg-[#841b60] text-white hover:bg-[#841b60]/90 shadow-lg' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Finaliser
            </button>
          </div>

          {/* Progress */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-1 bg-[#841b60] rounded-full"></div>
              <div className="w-8 h-1 bg-[#841b60] rounded-full"></div>
              <div className="w-8 h-1 bg-[#841b60] rounded-full"></div>
            </div>
            <p className="text-gray-500 font-light">Étape 3 sur 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
