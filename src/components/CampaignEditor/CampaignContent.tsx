
import React, { useState } from 'react';
import { Quiz, Wheel, Scratch, Swiper } from '../GameTypes';
import { Palette, Type, Square, Box } from 'lucide-react';
import { Campaign, SwiperCard, WheelSegment } from '../../types/campaign';

interface CampaignContentProps {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
}

const CampaignContent: React.FC<CampaignContentProps> = ({ campaign, setCampaign }) => {
  const [activeSection, setActiveSection] = useState<'game' | 'style'>('game');

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Raleway', value: 'Raleway, sans-serif' },
    { name: 'Nunito', value: 'Nunito, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' }
  ];

  const updateStyle = (key: string, value: string) => {
    setCampaign((prev: Campaign) => ({
      ...prev,
      design: {
        ...prev.design,
        [key]: value
      }
    }));
  };

  const getContentEditor = () => {
    switch (campaign.type) {
      case 'quiz':
        return (
          <Quiz 
            config={campaign.gameConfig.quiz} 
            onConfigChange={(config) => {
              setCampaign((prev: Campaign) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  quiz: config
                }
              }));
            }} 
          />
        );
      case 'wheel': {
        // Convert the segments to string[] for the Wheel component
        const segmentTexts = Array.isArray(campaign.gameConfig.wheel.segments) 
          ? campaign.gameConfig.wheel.segments.map(segment => 
              typeof segment === 'string' ? segment : segment.text
            )
          : [];
        
        const wheelColors = campaign.gameConfig.wheel.colors;
        
        return (
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu de la roue</h3>
              <Wheel 
                segments={segmentTexts}
                colors={wheelColors}
                onSpinComplete={(segment: string) => {
                  console.log("Wheel stopped at:", segment);
                }}
                config={{
                  segments: segmentTexts,
                  colors: wheelColors
                }}
                onConfigChange={(config) => {
                  // Convert string[] to WheelSegment[] 
                  const updatedSegments: WheelSegment[] = config.segments.map(text => ({
                    text,
                    isWinning: text !== 'Réessayez' // Default logic for determining winning segments
                  }));
                  
                  setCampaign((prev: Campaign) => ({
                    ...prev,
                    gameConfig: {
                      ...prev.gameConfig,
                      wheel: {
                        ...prev.gameConfig.wheel,
                        segments: updatedSegments,
                        colors: config.colors
                      }
                    }
                  }));
                }} 
              />
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurer les segments</h3>
              <div className="space-y-4">
                {segmentTexts.map((text, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="color"
                      value={wheelColors[index % wheelColors.length] || '#E57373'}
                      onChange={(e) => {
                        const newColors = [...wheelColors];
                        newColors[index] = e.target.value;
                        
                        setCampaign((prev: Campaign) => ({
                          ...prev,
                          gameConfig: {
                            ...prev.gameConfig,
                            wheel: {
                              ...prev.gameConfig.wheel,
                              colors: newColors
                            }
                          }
                        }));
                      }}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                          const newSegments = [...segmentTexts];
                          newSegments[index] = e.target.value;
                          
                          // Convert string[] to WheelSegment[]
                          const updatedSegments: WheelSegment[] = newSegments.map(segText => ({
                            text: segText,
                            isWinning: segText !== 'Réessayez'
                          }));
                          
                          setCampaign((prev: Campaign) => ({
                            ...prev,
                            gameConfig: {
                              ...prev.gameConfig,
                              wheel: {
                                ...prev.gameConfig.wheel,
                                segments: updatedSegments
                              }
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Texte du segment"
                      />
                    </div>
                    
                    <button
                      onClick={() => {
                        const newSegments = segmentTexts.filter((_, i) => i !== index);
                        const newColors = wheelColors.filter((_, i) => i !== index);
                        
                        // Convert string[] to WheelSegment[]
                        const updatedSegments: WheelSegment[] = newSegments.map(segText => ({
                          text: segText,
                          isWinning: segText !== 'Réessayez'
                        }));
                        
                        setCampaign((prev: Campaign) => ({
                          ...prev,
                          gameConfig: {
                            ...prev.gameConfig,
                            wheel: {
                              ...prev.gameConfig.wheel,
                              segments: updatedSegments,
                              colors: newColors
                            }
                          }
                        }));
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Supprimer ce segment"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    // Add a new segment
                    const newSegment: WheelSegment = { 
                      text: `Prix ${segmentTexts.length + 1}`,
                      isWinning: true
                    };
                    
                    const defaultColors = ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#BA68C8', '#4FC3F7', '#FFB74D', '#AED581'];
                    const newColor = defaultColors[segmentTexts.length % defaultColors.length];
                    
                    setCampaign((prev: Campaign) => ({
                      ...prev,
                      gameConfig: {
                        ...prev.gameConfig,
                        wheel: {
                          ...prev.gameConfig.wheel,
                          segments: [...(prev.gameConfig.wheel.segments as WheelSegment[]), newSegment],
                          colors: [...prev.gameConfig.wheel.colors, newColor]
                        }
                      }
                    }));
                  }}
                  className="w-full py-2 bg-[#f9f0f5] text-[#841b60] border border-[#e9d0e5] rounded-lg hover:bg-[#f0e0eb] transition-colors duration-200"
                >
                  + Ajouter un segment
                </button>
              </div>
            </div>
          </div>
        );
      }
      case 'scratch':
        const defaultScratchImage = 'https://placehold.co/600x400/e9d0e5/841b60?text=Prix+Gagné!';
        return (
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu de la carte à gratter</h3>
              <Scratch 
                image={campaign.gameConfig.scratch.image || defaultScratchImage}
                onReveal={() => {
                  console.log("Scratch revealed");
                }}
                config={campaign.gameConfig.scratch} 
                onConfigChange={(config: { image: string; revealPercentage: number }) => {
                  setCampaign((prev: Campaign) => ({
                    ...prev,
                    gameConfig: {
                      ...prev.gameConfig,
                      scratch: config
                    }
                  }));
                }} 
              />
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurer la carte à gratter</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image à révéler
                  </label>
                  <input
                    type="text"
                    value={campaign.gameConfig.scratch.image || defaultScratchImage}
                    onChange={(e) => {
                      setCampaign((prev: Campaign) => ({
                        ...prev,
                        gameConfig: {
                          ...prev.gameConfig,
                          scratch: {
                            ...prev.gameConfig.scratch,
                            image: e.target.value
                          }
                        }
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="URL de l'image"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pourcentage de révélation ({campaign.gameConfig.scratch.revealPercentage}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={campaign.gameConfig.scratch.revealPercentage}
                    onChange={(e) => {
                      setCampaign((prev: Campaign) => ({
                        ...prev,
                        gameConfig: {
                          ...prev.gameConfig,
                          scratch: {
                            ...prev.gameConfig.scratch,
                            revealPercentage: parseInt(e.target.value)
                          }
                        }
                      }));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'swiper':
        return (
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu du swiper</h3>
              <Swiper 
                config={campaign.gameConfig.swiper} 
                onConfigChange={(config: { cards: SwiperCard[]; swipeThreshold: number }) => {
                  setCampaign((prev: Campaign) => ({
                    ...prev,
                    gameConfig: {
                      ...prev.gameConfig,
                      swiper: config
                    }
                  }));
                }} 
              />
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurer les cartes</h3>
              <div className="space-y-4">
                {(campaign.gameConfig.swiper.cards || []).map((card, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Carte {index + 1}</h4>
                      <button
                        onClick={() => {
                          setCampaign((prev: Campaign) => ({
                            ...prev,
                            gameConfig: {
                              ...prev.gameConfig,
                              swiper: {
                                ...prev.gameConfig.swiper,
                                cards: prev.gameConfig.swiper.cards.filter((_, i) => i !== index)
                              }
                            }
                          }));
                        }}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        Supprimer
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image
                        </label>
                        <input
                          type="text"
                          value={card.image}
                          onChange={(e) => {
                            const updatedCards = [...campaign.gameConfig.swiper.cards];
                            updatedCards[index] = { ...updatedCards[index], image: e.target.value };
                            
                            setCampaign((prev: Campaign) => ({
                              ...prev,
                              gameConfig: {
                                ...prev.gameConfig,
                                swiper: {
                                  ...prev.gameConfig.swiper,
                                  cards: updatedCards
                                }
                              }
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          placeholder="URL de l'image"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Texte
                        </label>
                        <input
                          type="text"
                          value={card.text}
                          onChange={(e) => {
                            const updatedCards = [...campaign.gameConfig.swiper.cards];
                            updatedCards[index] = { ...updatedCards[index], text: e.target.value };
                            
                            setCampaign((prev: Campaign) => ({
                              ...prev,
                              gameConfig: {
                                ...prev.gameConfig,
                                swiper: {
                                  ...prev.gameConfig.swiper,
                                  cards: updatedCards
                                }
                              }
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          placeholder="Texte de la carte"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`winning-${index}`}
                          checked={card.isWinning}
                          onChange={(e) => {
                            const updatedCards = [...campaign.gameConfig.swiper.cards];
                            updatedCards[index] = { ...updatedCards[index], isWinning: e.target.checked };
                            
                            setCampaign((prev: Campaign) => ({
                              ...prev,
                              gameConfig: {
                                ...prev.gameConfig,
                                swiper: {
                                  ...prev.gameConfig.swiper,
                                  cards: updatedCards
                                }
                              }
                            }));
                          }}
                          className="rounded border-gray-300 text-[#841b60]"
                        />
                        <label htmlFor={`winning-${index}`} className="ml-2 text-sm text-gray-700">
                          Carte gagnante
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const defaultCard = {
                      image: `https://placehold.co/600x400/e9d0e5/841b60?text=Carte${campaign.gameConfig.swiper.cards.length + 1}`,
                      text: `Offre ${campaign.gameConfig.swiper.cards.length + 1}`,
                      isWinning: campaign.gameConfig.swiper.cards.length === 0
                    };
                    
                    setCampaign((prev: Campaign) => ({
                      ...prev,
                      gameConfig: {
                        ...prev.gameConfig,
                        swiper: {
                          ...prev.gameConfig.swiper,
                          cards: [...prev.gameConfig.swiper.cards, defaultCard]
                        }
                      }
                    }));
                  }}
                  className="w-full py-2 bg-[#f9f0f5] text-[#841b60] border border-[#e9d0e5] rounded-lg hover:bg-[#f0e0eb] transition-colors duration-200"
                >
                  + Ajouter une carte
                </button>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seuil de balayage ({campaign.gameConfig.swiper.swipeThreshold}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={campaign.gameConfig.swiper.swipeThreshold}
                    onChange={(e) => {
                      setCampaign((prev: Campaign) => ({
                        ...prev,
                        gameConfig: {
                          ...prev.gameConfig,
                          swiper: {
                            ...prev.gameConfig.swiper,
                            swipeThreshold: parseInt(e.target.value)
                          }
                        }
                      }));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500">
              Éditeur de contenu pour le type "{campaign.type}" en cours de développement.
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Configurez le contenu et les paramètres de votre {campaign.type}.
        </p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('game')}
          className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeSection === 'game'
              ? 'border-[#841b60] text-[#841b60]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Mécanique de jeu
        </button>
        <button
          onClick={() => setActiveSection('style')}
          className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeSection === 'style'
              ? 'border-[#841b60] text-[#841b60]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Style visuel
        </button>
      </div>

      {activeSection === 'game' ? (
        getContentEditor()
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Couleurs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Couleur des titres
                </label>
                <input
                  type="color"
                  value={campaign.design.titleColor || '#000000'}
                  onChange={(e) => updateStyle('titleColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Couleur des boutons
                </label>
                <input
                  type="color"
                  value={campaign.design.buttonColor || '#841b60'}
                  onChange={(e) => updateStyle('buttonColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Couleur des blocs
                </label>
                <input
                  type="color"
                  value={campaign.design.blockColor || '#FFFFFF'}
                  onChange={(e) => updateStyle('blockColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Couleur des bordures
                </label>
                <input
                  type="color"
                  value={campaign.design.borderColor || '#E5E7EB'}
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Square className="w-5 h-5 mr-2" />
              Coins arrondis
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => updateStyle('borderRadius', '0')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '0'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200" />
              </button>
              <button
                onClick={() => updateStyle('borderRadius', '0.5rem')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '0.5rem'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </button>
              <button
                onClick={() => updateStyle('borderRadius', '9999px')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.borderRadius === '9999px'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Box className="w-5 h-5 mr-2" />
              Ombres
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => updateStyle('shadow', 'none')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'none'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded" />
              </button>
              <button
                onClick={() => updateStyle('shadow', 'shadow-md')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'shadow-md'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded shadow-md" />
              </button>
              <button
                onClick={() => updateStyle('shadow', 'shadow-xl')}
                className={`p-4 border rounded flex items-center justify-center ${
                  campaign.design.shadow === 'shadow-xl'
                    ? 'border-[#841b60] bg-[#f8f0f5]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded shadow-xl" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Typographie
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Police des titres
                </label>
                <select
                  value={campaign.design.titleFont || fonts[0].value}
                  onChange={(e) => updateStyle('titleFont', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  {fonts.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Police du texte
                </label>
                <select
                  value={campaign.design.textFont || fonts[0].value}
                  onChange={(e) => updateStyle('textFont', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  {fonts.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Taille du texte
                </label>
                <select
                  value={campaign.design.fontSize || 'normal'}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="small">Petit</option>
                  <option value="normal">Normal</option>
                  <option value="large">Grand</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Graisse du texte
                </label>
                <select
                  value={campaign.design.fontWeight || 'normal'}
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                >
                  <option value="light">Light</option>
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignContent;
