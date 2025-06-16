
import { QuickCampaignState } from '../../types/quickCampaign';

export const initialState: QuickCampaignState = {
  currentStep: 1,
  campaignName: 'Ma Nouvelle Campagne',
  selectedGameType: null,
  launchDate: '',
  marketingGoal: '',
  logoFile: null,
  brandSiteUrl: '',
  logoUrl: null,
  fontUrl: null,
  selectedTheme: 'default',
  backgroundImage: null,
  backgroundImageUrl: null,
  segmentCount: 4,
  customColors: {
    primary: '#ffffff',
    secondary: '#E3F2FD',
    accent: '#ffffff',
    textColor: '#ffffff'
  },
  jackpotColors: {
    containerBackgroundColor: '#1f2937',
    backgroundColor: '#3B82F6',
    borderColor: '#1E40AF',
    borderWidth: 3,
    slotBorderColor: '#60A5FA',
    slotBorderWidth: 2,
    slotBackgroundColor: '#ffffff'
  }
};
