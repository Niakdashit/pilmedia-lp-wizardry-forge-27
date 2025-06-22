
export interface QuickCampaignState {
  currentStep: number;
  campaignName: string;
  selectedGameType: string | null;
  launchDate: string;
  marketingGoal: string;
  logoFile: File | null;
  brandSiteUrl: string;
  logoUrl: string | null;
  fontUrl: string | null;
  selectedTheme: string;
  backgroundImage: File | null;
  backgroundImageUrl: string | null;
  segmentCount: number;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    textColor?: string;
    buttonStyle?: string;
  };
  jackpotColors: {
    containerBackgroundColor: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    slotBorderColor: string;
    slotBorderWidth: number;
    slotBackgroundColor: string;
  };
  quizQuestions: any[];
  // Nouvelles propriétés pour le mode avancé
  advancedMode: boolean;
  wheelCustomization: {
    borderRadius: number;
    shadowIntensity: number;
    shadowColor: string;
    bevelEffect: boolean;
    glowEffect: boolean;
    glowColor: string;
    // Nouvelles propriétés pour les effets avancés
    texture?: 'metallic' | 'glass' | 'neon' | 'wood';
    pulseAnimation?: boolean;
    particleEffect?: boolean;
    continuousRotation?: boolean;
    depth3D?: number;
    perspective?: number;
  };
  customPointer: {
    enabled: boolean;
    file: File | null;
    url: string | null;
    type: 'default' | 'custom';
  };
  wheelCenter: {
    enabled: boolean;
    type: 'logo' | 'image' | 'animation';
    file: File | null;
    url: string | null;
    size: number;
  };
  segmentOverlays: {
    enabled: boolean;
    overlays: Array<{
      id: string;
      segmentIndex: number;
      type: 'sticker' | 'pattern' | 'image';
      file: File | null;
      url: string | null;
      position: { x: number; y: number };
      size: number;
    }>;
  };
  // New properties for monetization and extensions
  monetization: {
    selectedPlan: string;
    leadCapture: boolean;
    analytics: boolean;
    socialSharing: boolean;
    emailIntegration: any;
  };
  extensions: Array<{
    id: string;
    enabled: boolean;
    config: any;
  }>;
}

export interface QuickCampaignActions {
  setCurrentStep: (step: number) => void;
  setCampaignName: (name: string) => void;
  setSelectedGameType: (type: string) => void;
  setLaunchDate: (date: string) => void;
  setMarketingGoal: (goal: string) => void;
  setLogoFile: (file: File | null) => void;
  setBrandSiteUrl: (url: string) => void;
  setLogoUrl: (url: string | null) => void;
  setFontUrl: (url: string | null) => void;
  setSelectedTheme: (theme: string) => void;
  setBackgroundImage: (file: File | null) => void;
  setBackgroundImageUrl: (url: string | null) => void;
  setSegmentCount: (count: number) => void;
  setGamePosition: (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => void;
  setCustomColors: (colors: { primary: string; secondary: string; accent: string; textColor?: string; buttonStyle?: string }) => void;
  setJackpotColors: (colors: any) => void;
  setQuizQuestions: (questions: any[]) => void;
  // Nouvelles actions pour le mode avancé
  setAdvancedMode: (enabled: boolean) => void;
  setWheelCustomization: (customization: Partial<QuickCampaignState['wheelCustomization']>) => void;
  setCustomPointer: (pointer: Partial<QuickCampaignState['customPointer']>) => void;
  setWheelCenter: (center: Partial<QuickCampaignState['wheelCenter']>) => void;
  setSegmentOverlays: (overlays: Partial<QuickCampaignState['segmentOverlays']>) => void;
  // Actions pour les fonctionnalités de monétisation
  setPricingPlan: (plan: string) => void;
  setLeadCapture: (enabled: boolean) => void;
  setAnalytics: (enabled: boolean) => void;
  setSocialSharing: (enabled: boolean) => void;
  setEmailIntegration: (config: any) => void;
  toggleExtension: (extensionId: string) => void;
  setExtensionConfig: (extensionId: string, config: any) => void;
  generatePreviewCampaign: () => any;
  reset: () => void;
}

export type QuickCampaignStore = QuickCampaignState & QuickCampaignActions;
