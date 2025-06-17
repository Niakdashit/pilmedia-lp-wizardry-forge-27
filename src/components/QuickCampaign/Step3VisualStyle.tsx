import React, { useState } from 'react';
import { ArrowLeft, Eye, Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import CampaignPreviewModal from './CampaignPreviewModal';
import ColorCustomizer from './ColorCustomizer';
import JackpotPreview from './Preview/JackpotPreview';
import GameRenderer from './Preview/GameRenderer';
import GamePositionSelector from '../configurators/GamePositionSelector';

const Step3VisualStyle: React.FC = () => {
  const navigate = useNavigate();
  const {
    saveCampaign
  } = useCampaigns();
  const {
    selectedGameType,
    campaignName,
    launchDate,
    marketingGoal,
    logoFile,
    logoUrl,
    fontUrl,
    selectedTheme,
    backgroundImage,
    backgroundImageUrl,
    customColors,
    jackpotColors,
    segmentCount,
    gamePosition,
    generatePreviewCampaign,
    setCurrentStep,
    setGamePosition,
    reset
  } = useQuickCampaignStore();
  
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  
  const previewCampaign = generatePreviewCampaign();

  const handleFinish = () => {
    setShowFinalStep(true);
  };
  const handlePreview = () => {
    setShowPreview(true);
  };
  const handleCreateCampaign = async () => {
    setIsCreating(true);
    try {
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme || 'default',
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage,
          customColors,
          jackpotColors,
          gamePosition,
          ...(selectedGameType === 'wheel' && {
            segmentCount,
            roulette: {
              segments: Array.from({
                length: segmentCount
              }).map((_, i) => ({
                label: `Segment ${i + 1}`,
                color: [customColors.primary, customColors.secondary, customColors.accent || '#10b981'][i % 3],
                chance: Math.floor(100 / segmentCount)
              })),
              theme: selectedTheme || 'default',
              borderColor: customColors.primary
            }
          }),
          [selectedGameType || 'quiz']: {
            ...(selectedGameType === 'jackpot' && {
              template: selectedTheme || 'default',
              ...jackpotColors
            })
          }
        },
        design: {
          theme: selectedTheme || 'default',
          colors: {
            primary: customColors.primary,
            secondary: customColors.secondary,
            accent: customColors.accent
          },
          template: selectedTheme || 'default',
          customColors,
          jackpotColors,
          backgroundImage: backgroundImageUrl,
          mobileBackgroundImage: backgroundImageUrl
        },
        mobileConfig: {
          gamePosition
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
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme || 'default',
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage,
          customColors,
          jackpotColors,
          gamePosition,
          ...(selectedGameType === 'wheel' && {
            segmentCount,
            roulette: {
              segments: Array.from({
                length: segmentCount
              }).map((_, i) => ({
                label: `Segment ${i + 1}`,
                color: [customColors.primary, customColors.secondary, customColors.accent || '#10b981'][i % 3],
                chance: Math.floor(100 / segmentCount)
              })),
              theme: selectedTheme || 'default',
              borderColor: customColors.primary
            }
          }),
          [selectedGameType || 'quiz']: {
            ...(selectedGameType === 'jackpot' && {
              template: selectedTheme || 'default',
              ...jackpotColors
            })
          }
        },
        design: {
          theme: selectedTheme || 'default',
          colors: {
            primary: customColors.primary,
            secondary: customColors.secondary,
            accent: customColors.accent
          },
          template: selectedTheme || 'default',
          customColors,
          jackpotColors,
          backgroundImage: backgroundImageUrl,
          mobileBackgroundImage: backgroundImageUrl
        },
        mobileConfig: {
          gamePosition
        },
        status: 'draft' as const
      };
      const result = await saveCampaign(campaignData);
      if (result) {
        reset();
        navigate(`/modern-campaign/${result.id}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getPreviewContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '24px',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid rgba(0,0,0,0.05)',
      maxWidth: '800px',
      width: '100%',
      minHeight: '500px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: getAlignItems(),
      justifyContent: getJustifyContent(),
      padding: '40px'
    };

    if (backgroundImageUrl) {
      return {
        ...baseStyle,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return baseStyle;
  };

  const getAlignItems = () => {
    switch (gamePosition) {
      case 'top': return 'flex-start';
      case 'bottom': return 'flex-end';
      default: return 'center';
    }
  };

  const getJustifyContent = () => {
    switch (gamePosition) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      default: return 'center';
    }
  };

  if (showFinalStep) {
    return (
      <div className="min-h-screen bg-[#ebf4f7] flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">
            <div className="mb-8">
              {creationSuccess ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto" /> : <div className="w-16 h-16 bg-[#841b60]/10 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#841b60]" />
                </div>}
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-6">
              {creationSuccess ? 'Campagne créée avec succès !' : 'Votre campagne est prête !'}
            </h1>
            {creationSuccess ? <p className="text-xl text-gray-600 font-light">
                Redirection vers vos campagnes...
              </p> : <>
                <p className="text-lg text-gray-600 font-light mb-12">
                  Vous pouvez maintenant la tester ou la personnaliser davantage.
                </p>
                <div className="space-y-4">
                  <button onClick={handlePreview} className="w-full py-4 bg-gray-50 text-gray-900 font-medium rounded-2xl
                               border border-gray-200 hover:bg-gray-100 transition-all
                               flex items-center justify-center space-x-3">
                    <Eye className="w-5 h-5" />
                    <span>Voir un aperçu</span>
                  </button>
                  <button onClick={handleCreateCampaign} disabled={isCreating} className="w-full py-4 bg-[#841b60] text-white font-medium rounded-2xl
                               hover:bg-[#841b60]/90 transition-all disabled:opacity-50">
                    {isCreating ? <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Création...</span>
                      </div> : 'Créer la campagne'}
                  </button>
                  <button onClick={handleAdvancedSettings} disabled={isCreating} className="w-full py-4 bg-gray-50 text-gray-900 font-medium rounded-2xl
                               border border-gray-200 hover:bg-gray-100 transition-all
                               flex items-center justify-center space-x-3 disabled:opacity-50">
                    <Settings className="w-5 h-5" />
                    <span>Éditeur avancé</span>
                  </button>
                </div>
              </>}
          </div>
        </div>
        <CampaignPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebf4f7] py-12 px-0">
      <div className="max-w-6xl mx-auto">
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

          <div className="space-y-16">

            {/* Aperçu dynamique du jeu avec position personnalisable */}
            <div className="flex justify-center">
              <div style={getPreviewContainerStyle()}>
                {/* Overlay pour améliorer la lisibilité si image de fond */}
                {backgroundImageUrl && (
                  <div
                    className="absolute inset-0 bg-black/10 rounded-3xl"
                    style={{ zIndex: 1 }}
                  />
                )}
                
                <div className="relative z-10">
                  {selectedGameType === 'jackpot' ? (
                    <JackpotPreview 
                      customColors={customColors} 
                      jackpotColors={jackpotColors} 
                    />
                  ) : (
                    <div className="transform scale-90 origin-center">
                      <GameRenderer
                        gameType={selectedGameType || 'wheel'}
                        mockCampaign={previewCampaign}
                        customColors={customColors}
                        jackpotColors={jackpotColors}
                        logoUrl={logoUrl || undefined}
                        fontUrl={fontUrl || undefined}
                        gameSize="medium"
                        gamePosition={gamePosition}
                        previewDevice="desktop"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sélecteur de position du jeu */}
            <div className="max-w-md mx-auto">
              <GamePositionSelector
                selectedPosition={gamePosition}
                onPositionChange={setGamePosition}
                className="text-center"
              />
            </div>

            {/* Color Customizer */}
            <ColorCustomizer />

          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16">
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
              className="px-8 py-4 rounded-2xl transition-all bg-[#841b60] text-white hover:bg-[#841b60]/90 shadow-lg font-medium"
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
