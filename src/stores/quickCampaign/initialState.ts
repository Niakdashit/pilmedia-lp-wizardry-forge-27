
import { QuickCampaignState } from './types';

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
  gamePosition: 'center',
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
  },
  quizQuestions: [
    {
      id: 1,
      text: 'Quelle est votre couleur préférée ?',
      type: 'multiple',
      options: [
        { id: 1, text: 'Rouge', isCorrect: false },
        { id: 2, text: 'Bleu', isCorrect: true },
        { id: 3, text: 'Vert', isCorrect: false },
        { id: 4, text: 'Jaune', isCorrect: false }
      ],
      feedback: {
        correct: 'Excellent choix !',
        incorrect: 'Dommage, essayez encore !'
      }
    }
  ]
};
