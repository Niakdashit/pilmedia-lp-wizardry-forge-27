
import { QuickCampaignState } from './types';
import { initialState } from './initialState';

export const createActions = (set: any, get: any) => ({
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setCampaignName: (name: string) => set({ campaignName: name }),
  setSelectedGameType: (type: string) => set({ selectedGameType: type }),
  setLaunchDate: (date: string) => set({ launchDate: date }),
  setMarketingGoal: (goal: string) => set({ marketingGoal: goal }),
  setLogoFile: (file: File | null) => set({ logoFile: file }),
  setBrandSiteUrl: (url: string) => set({ brandSiteUrl: url }),
  setLogoUrl: (url: string | null) => set({ logoUrl: url }),
  setFontUrl: (url: string | null) => set({ fontUrl: url }),
  setSelectedTheme: (theme: string) => set({ selectedTheme: theme }),
  setBackgroundImage: (file: File | null) => set({ backgroundImage: file }),
  setBackgroundImageUrl: (url: string | null) => set({ backgroundImageUrl: url }),
  setSegmentCount: (count: number) => set({ segmentCount: count }),
  setGamePosition: (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => set({ gamePosition: position }),
  setCustomColors: (colors: { primary: string; secondary: string; accent: string; textColor?: string; buttonStyle?: string }) => set({ customColors: colors }),
  setJackpotColors: (colors: any) => set({ jackpotColors: colors }),
  setQuizQuestions: (questions: any[]) => set({ quizQuestions: questions }),

  // Nouvelles actions pour le mode avancé
  setAdvancedMode: (enabled: boolean) => set({ advancedMode: enabled }),
  
  setWheelCustomization: (customization: Partial<QuickCampaignState['wheelCustomization']>) => 
    set((state: QuickCampaignState) => ({
      wheelCustomization: { ...state.wheelCustomization, ...customization }
    })),
  
  setCustomPointer: (pointer: Partial<QuickCampaignState['customPointer']>) => 
    set((state: QuickCampaignState) => ({
      customPointer: { ...state.customPointer, ...pointer }
    })),
  
  setWheelCenter: (center: Partial<QuickCampaignState['wheelCenter']>) => 
    set((state: QuickCampaignState) => ({
      wheelCenter: { ...state.wheelCenter, ...center }
    })),
  
  setSegmentOverlays: (overlays: Partial<QuickCampaignState['segmentOverlays']>) => 
    set((state: QuickCampaignState) => ({
      segmentOverlays: { ...state.segmentOverlays, ...overlays }
    })),

  reset: () => {
    const state = get() as QuickCampaignState;
    const url = state.backgroundImageUrl;
    const pointerUrl = state.customPointer.url;
    const centerUrl = state.wheelCenter.url;
    
    if (url) {
      URL.revokeObjectURL(url);
    }
    if (pointerUrl) {
      URL.revokeObjectURL(pointerUrl);
    }
    if (centerUrl) {
      URL.revokeObjectURL(centerUrl);
    }
    
    set(initialState);
  }
});
