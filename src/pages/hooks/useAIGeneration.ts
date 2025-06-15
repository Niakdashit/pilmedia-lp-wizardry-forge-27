
import { useState, useEffect } from 'react';
import { CampaignType } from '../../utils/campaignTypes';

export const useAIGeneration = (
  isNewCampaign: boolean,
  campaignType: CampaignType,
  setCampaign: React.Dispatch<React.SetStateAction<any>>
) => {
  const [isLoadingAIData, setIsLoadingAIData] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  const loadAIGeneratedData = async () => {
    setIsLoadingAIData(true);
    
    try {
      const gameConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
      const aiGeneration = gameConfig.aiGeneration;
      
      if (aiGeneration && aiGeneration.content) {
        console.log('Loading AI-generated data:', aiGeneration);
        
        // Apply AI-generated content and styling
        const aiContent = aiGeneration.content;
        const brandCustomization = gameConfig.brandCustomization || {};
        
        setCampaign((prev: any) => ({
          ...prev,
          name: aiContent.title || prev.name,
          description: aiContent.subtitle || prev.description,
          type: aiGeneration.gameConfig?.type || campaignType,
          design: {
            ...prev.design,
            primaryColor: brandCustomization.extractedColors?.primary || '#841b60',
            secondaryColor: brandCustomization.extractedColors?.secondary || '#ffffff',
            background: brandCustomization.selectedBackground || prev.design.background,
            fontFamily: brandCustomization.selectedFont || 'Inter',
            textStyles: {
              ...prev.design.textStyles,
              title: {
                ...prev.design.textStyles.title,
                color: brandCustomization.extractedColors?.primary || '#000000'
              }
            }
          },
          gameConfig: {
            ...prev.gameConfig,
            ...aiGeneration.gameConfig,
            [campaignType]: {
              ...prev.gameConfig[campaignType],
              title: aiContent.title,
              subtitle: aiContent.subtitle,
              callToAction: aiContent.callToAction,
              prizes: aiContent.prizes,
              winMessage: aiContent.winMessage,
              loseMessage: aiContent.loseMessage
            }
          },
          screens: {
            ...prev.screens,
            1: {
              ...prev.screens[1],
              title: aiContent.title || prev.screens[1].title,
              description: aiContent.subtitle || prev.screens[1].description,
              buttonText: aiContent.callToAction || prev.screens[1].buttonText
            },
            3: {
              ...prev.screens[3],
              title: aiContent.winMessage || prev.screens[3].title
            }
          }
        }));
        
        setAiGenerated(true);
        
        // Clear the stored data after loading
        localStorage.removeItem('gameConfig');
      }
    } catch (error) {
      console.error('Error loading AI-generated data:', error);
    }
    
    setIsLoadingAIData(false);
  };

  useEffect(() => {
    if (isNewCampaign) {
      loadAIGeneratedData();
    }
  }, [isNewCampaign]);

  return {
    isLoadingAIData,
    aiGenerated,
    setAiGenerated
  };
};
