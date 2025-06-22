
import React, { useState } from 'react';
import { Quiz, Scratch, Memory, Puzzle, Dice } from '../GameTypes';
import TabRoulette from '@/components/configurators/TabRoulette';
import TabJackpot from '@/components/configurators/TabJackpot';
import JackpotAppearance from '@/components/configurators/JackpotAppearance';
import ImageUpload from '../common/ImageUpload';
import GameCanvasPreview from './GameCanvasPreview';
import { Settings, Eye, Palette, Gamepad2 } from 'lucide-react';

interface CampaignContentProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignContent: React.FC<CampaignContentProps> = ({
  campaign,
  setCampaign,
}) => {
  const [activeSection, setActiveSection] = useState<'game' | 'visual'>('game');
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [previewQuestion, setPreviewQuestion] = useState<any>(
    campaign.gameConfig?.quiz?.questions?.[0]
  );

  const updateGameConfig = (gameType: string, config: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [gameType]: config,
      },
    }));
  };

  const getContentEditor = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz
            config={campaign.gameConfig?.quiz}
            onConfigChange={(config) => updateGameConfig('quiz', config)}
            activeQuestion={activeQuizQuestion}
            onActiveQuestionChange={setActiveQuizQuestion}
            onQuestionChange={setPreviewQuestion}
          />
        );
      case 'wheel':
        return <TabRoulette campaign={campaign} setCampaign={setCampaign} />;
      case 'scratch':
        return (
          <Scratch
            config={campaign.gameConfig?.scratch}
            onConfigChange={(config) => updateGameConfig('scratch', config)}
          />
        );
      case 'memory':
        return (
          <Memory
            config={campaign.gameConfig?.memory}
            onConfigChange={(config) => updateGameConfig('memory', config)}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            config={campaign.gameConfig?.puzzle}
            onConfigChange={(config) => updateGameConfig('puzzle', config)}
          />
        );
      case 'dice':
        return (
          <Dice
            config={campaign.gameConfig?.dice}
            onConfigChange={(config) => updateGameConfig('dice', config)}
          />
        );
      case 'jackpot':
        return <TabJackpot campaign={campaign} setCampaign={setCampaign} />;
      default:
        return (
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F8E9F0] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-[#951B6D]" />
              </div>
              <h4 className="text-lg font-bold text-[#141E29] mb-2">Configuration en développement</h4>
              <p className="text-[#64748B]">
                L'éditeur de contenu pour le type "{campaign.type}" sera bientôt disponible.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Personnalisez votre
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> contenu</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Configurez le contenu et l'apparence de votre {campaign.type} pour créer 
              une expérience unique et captivante.
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm mb-8">
          <div className="flex border-b border-[#EDF3F7]">
            <button
              onClick={() => setActiveSection('game')}
              className={`flex items-center space-x-3 px-8 py-4 font-bold transition-all duration-300 ${
                activeSection === 'game'
                  ? 'bg-[#951B6D] text-white rounded-tl-xl'
                  : 'text-[#64748B] hover:text-[#951B6D] hover:bg-[#F8FAFC]'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Configuration du jeu</span>
            </button>
            <button
              onClick={() => setActiveSection('visual')}
              className={`flex items-center space-x-3 px-8 py-4 font-bold transition-all duration-300 ${
                activeSection === 'visual'
                  ? 'bg-[#951B6D] text-white'
                  : 'text-[#64748B] hover:text-[#951B6D] hover:bg-[#F8FAFC]'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span>Apparence visuelle</span>
            </button>
          </div>
        </div>

        {activeSection === 'game' ? (
          <div className="space-y-8">
            {/* Preview Card */}
            <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#951B6D]" />
                </div>
                <h3 className="text-xl font-bold text-[#141E29]">Aperçu du jeu</h3>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <GameCanvasPreview
                  campaign={{ ...campaign, activeQuizQuestion, previewQuestion }}
                  gameSize={campaign.gameSize || 'large'}
                />
              </div>
            </div>

            {/* Configuration Card */}
            <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-[#951B6D]" />
                </div>
                <h3 className="text-xl font-bold text-[#141E29]">Paramètres du jeu</h3>
              </div>
              {getContentEditor()}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {campaign.type === 'jackpot' ? (
              <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                    <Palette className="w-6 h-6 text-[#951B6D]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#141E29]">Apparence du jackpot</h3>
                </div>
                <JackpotAppearance campaign={campaign} setCampaign={setCampaign} />
              </div>
            ) : (
              <>
                {/* Preview Card */}
                <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-[#951B6D]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#141E29]">Aperçu du jeu</h3>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                    <GameCanvasPreview
                      campaign={{ ...campaign, activeQuizQuestion, previewQuestion }}
                      gameSize={campaign.gameSize || 'large'}
                    />
                  </div>
                </div>

                {/* Visual Configuration Card */}
                <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-[#951B6D]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#141E29]">Image de fond du jeu</h3>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                    <ImageUpload
                      value={campaign.gameConfig?.[campaign.type]?.backgroundImage || campaign.design.backgroundImage}
                      onChange={(value) => {
                        setCampaign((prev: any) => ({
                          ...prev,
                          gameConfig: {
                            ...prev.gameConfig,
                            [campaign.type]: {
                              ...prev.gameConfig?.[campaign.type],
                              backgroundImage: value,
                            },
                          },
                        }));
                      }}
                      label="Téléchargez ou sélectionnez une image de fond pour votre jeu"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignContent;
