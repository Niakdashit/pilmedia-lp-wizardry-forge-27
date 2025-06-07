
import { useState, useCallback } from 'react';

export const useCanvasElements = (campaign: any, setCampaign: (updater: (prev: any) => any) => void) => {
  const [selectedElement, setSelectedElement] = useState<{type: 'text' | 'image', id: number} | null>(null);

  const customTexts = campaign.design?.customTexts || [];
  const customImages = campaign.design?.customImages || [];

  const updateTextElement = useCallback((id: number, updates: any) => {
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      design: {
        ...prevCampaign.design,
        customTexts: customTexts.map((text: any) => 
          text.id === id ? { ...text, ...updates } : text
        )
      }
    }));
  }, [setCampaign, customTexts]);

  const updateImageElement = useCallback((id: number, updates: any) => {
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      design: {
        ...prevCampaign.design,
        customImages: customImages.map((img: any) => 
          img.id === id ? { ...img, ...updates } : img
        )
      }
    }));
  }, [setCampaign, customImages]);

  const deleteTextElement = useCallback((id: number) => {
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      design: {
        ...prevCampaign.design,
        customTexts: customTexts.filter((text: any) => text.id !== id)
      }
    }));
    setSelectedElement(null);
  }, [setCampaign, customTexts]);

  const deleteImageElement = useCallback((id: number) => {
    setCampaign((prevCampaign: any) => ({
      ...prevCampaign,
      design: {
        ...prevCampaign.design,
        customImages: customImages.filter((img: any) => img.id !== id)
      }
    }));
    setSelectedElement(null);
  }, [setCampaign, customImages]);

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
