
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
  setAdvancedMode: (mode: boolean) => set({ advancedMode: mode }),
  setPointerImage: (file: File | null) => set({ pointerImage: file }),
  setPointerImageUrl: (url: string | null) => set({ pointerImageUrl: url }),
  setQuizQuestions: (questions: any[]) => set({ quizQuestions: questions }),

  reset: () => {
    const state = get() as QuickCampaignState;
    const url = state.backgroundImageUrl;
    if (url) {
      URL.revokeObjectURL(url);
    }
    set(initialState);
  }
});
