
import { CustomColors, JackpotColors } from '../../types/quickCampaign';

export const createActions = (set: any) => ({
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
  setCustomColors: (colors: CustomColors) => set({ customColors: colors }),
  setJackpotColors: (colors: JackpotColors) => set({ jackpotColors: colors })
});
