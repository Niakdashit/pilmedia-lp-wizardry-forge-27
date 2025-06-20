export interface PrizeData {
  label: string;
  image: string | null;
}

export interface CampaignSkin {
  id: string;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    textColor?: string;
    buttonStyle?: string;
  };
  pointerImageUrl: string | null;
  borderRadius: number;
}

export interface PrizeData {
  label: string;
  image: string | null;
}

export interface CampaignSkin {
  id: string;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    textColor?: string;
    buttonStyle?: string;
  };
  pointerImageUrl: string | null;
  borderRadius: number;
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
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  advancedMode: boolean;
  pointerImage: File | null;
  pointerImageUrl: string | null;
  borderRadius: number;
  segmentPrizes: PrizeData[];
  stats: {
    spins: number;
    wins: number;
    clicks: number;
  };
  skins: CampaignSkin[];
  activeSkinIndex: number;
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
  setAdvancedMode: (mode: boolean) => void;
  setPointerImage: (file: File | null) => void;
  setPointerImageUrl: (url: string | null) => void;
  setBorderRadius: (radius: number) => void;
  setPrize: (index: number, prize: PrizeData) => void;
  addSkin: (skin: CampaignSkin) => void;
  setActiveSkinIndex: (index: number) => void;
  recordClick: () => void;
  recordSpin: () => void;
  recordWin: () => void;
  simulateWins: (trials: number, winProbability: number) => { wins: number; losses: number };
  setQuizQuestions: (questions: any[]) => void;
  generatePreviewCampaign: () => any;
  reset: () => void;
}

export type QuickCampaignStore = QuickCampaignState & QuickCampaignActions;
