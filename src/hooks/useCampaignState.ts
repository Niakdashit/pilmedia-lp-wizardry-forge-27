
import { useState, useCallback } from 'react';

export const useCampaignState = (initialCampaign: any) => {
  const [campaign, setCampaign] = useState(initialCampaign);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateCampaign = useCallback((updater: any) => {
    setCampaign((prev: any) => {
      const newCampaign = typeof updater === 'function' ? updater(prev) : updater;
      setHasUnsavedChanges(true);
      return newCampaign;
    });
  }, []);

  const updateCampaignField = useCallback((field: string, value: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      [field]: value
    }));
  }, [updateCampaign]);

  const updateDesign = useCallback((designUpdates: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        ...designUpdates
      }
    }));
  }, [updateCampaign]);

  const updateGameConfig = useCallback((gameConfigUpdates: any) => {
    updateCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        ...gameConfigUpdates
      }
    }));
  }, [updateCampaign]);

  const resetUnsavedChanges = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  return {
    campaign,
    setCampaign: updateCampaign,
    updateCampaignField,
    updateDesign,
    updateGameConfig,
    hasUnsavedChanges,
    resetUnsavedChanges
  };
};
