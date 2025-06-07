
import { useState, useCallback } from 'react';

export const useCanvasElements = (campaign: any) => {
  const [selectedElement, setSelectedElement] = useState<{type: 'text' | 'image', id: number} | null>(null);

  const customTexts = campaign.design?.customTexts || [];
  const customImages = campaign.design?.customImages || [];

  const updateTextElement = useCallback((id: number, updates: any) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customTexts: customTexts.map((text: any) => 
          text.id === id ? { ...text, ...updates } : text
        )
      }
    };
    Object.assign(campaign, updatedCampaign);
  }, [campaign, customTexts]);

  const updateImageElement = useCallback((id: number, updates: any) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customImages: customImages.map((img: any) => 
          img.id === id ? { ...img, ...updates } : img
        )
      }
    };
    Object.assign(campaign, updatedCampaign);
  }, [campaign, customImages]);

  const deleteTextElement = useCallback((id: number) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customTexts: customTexts.filter((text: any) => text.id !== id)
      }
    };
    Object.assign(campaign, updatedCampaign);
    setSelectedElement(null);
  }, [campaign, customTexts]);

  const deleteImageElement = useCallback((id: number) => {
    const updatedCampaign = {
      ...campaign,
      design: {
        ...campaign.design,
        customImages: customImages.filter((img: any) => img.id !== id)
      }
    };
    Object.assign(campaign, updatedCampaign);
    setSelectedElement(null);
  }, [campaign, customImages]);

  return {
    selectedElement,
    setSelectedElement,
    customTexts,
    customImages,
    updateTextElement,
    updateImageElement,
    deleteTextElement,
    deleteImageElement
  };
};
