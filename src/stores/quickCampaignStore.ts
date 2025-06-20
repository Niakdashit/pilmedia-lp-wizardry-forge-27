import { create } from 'zustand';
import { QuickCampaignStore } from './types';
import { initialState } from './initialState';

export const useQuickCampaignStore = create<QuickCampaignStore>((set, get) => ({
  ...initialState,

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
  setCustomColors: (colors) => set({ customColors: colors }),
  setJackpotColors: (colors) => set({ jackpotColors: colors }),
  setAdvancedMode: (mode: boolean) => set({ advancedMode: mode }),
  setPointerImage: (file: File | null) => set({ pointerImage: file }),
  setPointerImageUrl: (url: string | null) => set({ pointerImageUrl: url }),
  setBorderRadius: (radius: number) => set({ borderRadius: radius }),
  setQuizQuestions: (questions: any[]) => set({ quizQuestions: questions }),

  generatePreviewCampaign: () => {
    const state = get();
    return {
      design: {
        pointerImage: state.pointerImageUrl,
        borderRadius: `${state.borderRadius}px`,
        colors: state.customColors,
        logoUrl: state.logoUrl,
        backgroundImageUrl: state.backgroundImageUrl
      },
      config: {
        type: state.selectedGameType,
        roulette: {
          segments: Array.from({ length: state.segmentCount }, (_, i) => ({
            id: i + 1,
            label: `Segment ${i + 1}`
          }))
        }
      }
    };
  },

  reset: () => {
    const state = get();
    if (state.backgroundImageUrl) {
      URL.revokeObjectURL(state.backgroundImageUrl);
    }
    if (state.pointerImageUrl) {
      URL.revokeObjectURL(state.pointerImageUrl);
    }
    set(initialState);
  }
}));
