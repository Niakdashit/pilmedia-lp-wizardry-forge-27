
import { QuickCampaignState } from './types';
import { initialState } from './initialState';

interface Extension {
  id: string;
  enabled: boolean;
  config: any;
}

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

  // Actions pour le mode avancé
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

  // Actions pour les fonctionnalités de monétisation
  setPricingPlan: (plan: string) => 
    set((state: QuickCampaignState) => ({
      monetization: { ...state.monetization, selectedPlan: plan }
    })),

  setLeadCapture: (enabled: boolean) => 
    set((state: QuickCampaignState) => ({
      monetization: { ...state.monetization, leadCapture: enabled }
    })),

  setAnalytics: (enabled: boolean) => 
    set((state: QuickCampaignState) => ({
      monetization: { ...state.monetization, analytics: enabled }
    })),

  setSocialSharing: (enabled: boolean) => 
    set((state: QuickCampaignState) => ({
      monetization: { ...state.monetization, socialSharing: enabled }
    })),

  setEmailIntegration: (config: any) => 
    set((state: QuickCampaignState) => ({
      monetization: { ...state.monetization, emailIntegration: config }
    })),

  toggleExtension: (extensionId: string) => 
    set((state: QuickCampaignState) => {
      const extensions = state.extensions || [];
      const isEnabled = extensions.some((ext: Extension) => ext.id === extensionId && ext.enabled);
      
      if (isEnabled) {
        return {
          extensions: extensions.map((ext: Extension) => 
            ext.id === extensionId ? { ...ext, enabled: false } : ext
          )
        };
      } else {
        const existingExtension = extensions.find((ext: Extension) => ext.id === extensionId);
        if (existingExtension) {
          return {
            extensions: extensions.map((ext: Extension) => 
              ext.id === extensionId ? { ...ext, enabled: true } : ext
            )
          };
        } else {
          return {
            extensions: [...extensions, { id: extensionId, enabled: true, config: {} }]
          };
        }
      }
    }),

  setExtensionConfig: (extensionId: string, config: any) => 
    set((state: QuickCampaignState) => ({
      extensions: (state.extensions || []).map((ext: Extension) => 
        ext.id === extensionId ? { ...ext, config: { ...ext.config, ...config } } : ext
      )
    })),

  generatePreviewCampaign: () => {
    const state = get() as QuickCampaignState;
    return {
      id: 'quick-preview',
      name: state.campaignName,
      type: state.selectedGameType || 'wheel',
      design: {
        customColors: state.customColors,
        centerLogo: state.logoUrl || null,
        backgroundImage: state.backgroundImageUrl || null,
        mobileBackgroundImage: state.backgroundImageUrl || null,
        containerBackgroundColor: '#ffffff',
        borderColor: state.customColors.primary,
        borderRadius: '16px',
        buttonColor: state.customColors.accent,
        buttonTextColor: state.customColors.primary,
        textColor: state.customColors.textColor || '#000000'
      }
    };
  },

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
