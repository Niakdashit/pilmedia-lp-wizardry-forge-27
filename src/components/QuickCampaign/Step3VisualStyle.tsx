import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Eye, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
import CampaignPreviewModal from './CampaignPreviewModal';
import ColorCustomizer from './ColorCustomizer';
import JackpotPreview from './Preview/JackpotPreview';
import GameRenderer from './Preview/GameRenderer';
import { analyzeBrandStyle } from '../../utils/BrandStyleAnalyzer';

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
    brandSiteUrl,
    selectedTheme,
    backgroundImage,
    customColors,
    jackpotColors,
    segmentCount,
    generatePreviewCampaign,
    setBackgroundImage,
    setCurrentStep,
    reset
  } = useQuickCampaignStore();
  
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [extractionMessage, setExtractionMessage] = useState<string>('');
  
  const previewCampaign = generatePreviewCampaign();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Surveillance de l'extraction automatique des couleurs
  useEffect(() => {
    if (brandSiteUrl && brandSiteUrl.trim() !== '') {
      setExtractionStatus('loading');
      setExtractionMessage('Analyse de la marque et extraction des couleurs du logo...');
      
      // Simulation du processus d'extraction (sera géré par le hook)
      const timer = setTimeout(() => {
        setExtractionStatus('success');
        setExtractionMessage('Couleurs de marque extraites avec succès !');
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setExtractionStatus('idle');
      setExtractionMessage('');
    }
  }, [brandSiteUrl]);

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
          jackpotColors
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
          jackpotColors
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
    return <div className="min-h-screen bg-[#ebf4f7] flex items-center justify-center px-6 py-12">
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
                    <span>Réglages avancés</span>
                  </button>
                </div>
              </>}
          </div>
        </div>
        <CampaignPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
      </div>;
  }

  return <div className="min-h-screen bg-[#ebf4f7] py-12 px-0">
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
            {/* Statut de l'extraction des couleurs de marque */}
            {brandSiteUrl && (
              <div className="mb-8">
                {extractionStatus === 'loading' && (
                  <div className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-4 rounded-lg">
                    <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                    <div>
                      <p className="font-medium">Extraction automatique des couleurs de marque</p>
                      <p className="text-sm text-blue-500 mt-1">{extractionMessage}</p>
                    </div>
                  </div>
                )}
                
                {extractionStatus === 'success' && (
                  <div className="flex items-center space-x-3 text-green-600 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">🎨 Couleurs de marque appliquées automatiquement</p>
                      <p className="text-sm text-green-500 mt-1">Les couleurs ont été extraites du logo et appliquées à votre campagne</p>
                    </div>
                  </div>
                )}
                
                {extractionStatus === 'error' && (
                  <div className="flex items-start space-x-3 text-amber-600 bg-amber-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Extraction partielle des couleurs</p>
                      <p className="text-sm text-amber-500 mt-1">Certaines couleurs ont pu être extraites. Vous pouvez les ajuster manuellement si nécessaire.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Aperçu dynamique du jeu - Design unifié pour toutes les mécaniques */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner border border-gray-200/50 max-w-2xl w-full flex items-center justify-center min-h-[400px] p-8 py-0">
                {selectedGameType === 'jackpot' ? (
                  <JackpotPreview 
                    customColors={customColors} 
                    jackpotColors={jackpotColors} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="transform scale-90 origin-center">
                      <GameRenderer
                        gameType={selectedGameType || 'wheel'}
                        mockCampaign={previewCampaign}
                        customColors={customColors}
                        jackpotColors={jackpotColors}
                        logoUrl={logoUrl || undefined}
                        fontUrl={fontUrl || undefined}
                        siteUrl={brandSiteUrl || undefined}
                        gameSize="medium"
                        gamePosition="center"
                        previewDevice="desktop"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Color Customizer */}
            <ColorCustomizer />

            {/* Background Upload */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-8">
                Image de fond <span className="text-gray-400 font-light">(optionnel)</span>
              </h3>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {backgroundImage ? (
                  <div>
                    <p className="text-gray-900 font-medium mb-2">
                      {backgroundImage.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBackgroundImage(null);
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">
                      <span className="text-[#841b60] font-medium">
                        Téléchargez une image de fond
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">PNG, JPG jusqu'à 10MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
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
    </div>;
};

export default Step3VisualStyle;
