
import { useState, useCallback } from 'react';

export const useCampaignState = (initialCampaign: any) => {
  const [campaign, setCampaign] = useState(initialCampaign);

  const updateCampaign = useCallback((updates: any) => {
    setCampaign((prev: any) => {
      const newCampaign = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      console.log('Campaign updated:', newCampaign);
      return newCampaign;
    });
  }, []);

  const updateMobileConfig = useCallback((key: string, value: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      mobileConfig: { 
        ...prev.mobileConfig, 
        [key]: value 
      }
    }));
  }, [updateCampaign]);

  const updateGameConfig = useCallback((gameType: string, config: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        [gameType]: config
      }
    }));
  }, [updateCampaign]);

  const updateScreen = useCallback((screenIndex: number, updates: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      screens: {
        ...prev.screens,
        [screenIndex]: {
          ...prev.screens[screenIndex],
          ...updates
        }
      }
    }));
  }, [updateCampaign]);

  return {
    campaign,
    setCampaign,
    updateCampaign,
    updateMobileConfig,
    updateGameConfig,
    updateScreen
  };
};
