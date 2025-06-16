
export interface CustomColors {
  primary: string;
  secondary: string;
  accent: string;
  textColor?: string;
}

export interface JackpotColors {
  containerBackgroundColor: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  slotBorderColor: string;
  slotBorderWidth: number;
  slotBackgroundColor: string;
}

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
  customColors: CustomColors;
  jackpotColors: JackpotColors;
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
  setCustomColors: (colors: CustomColors) => void;
  setJackpotColors: (colors: JackpotColors) => void;
  generatePreviewCampaign: () => any;
  reset: () => void;
}
