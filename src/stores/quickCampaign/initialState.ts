
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
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#93C5FD',
    textColor: '#ffffff',
    buttonStyle: 'primary'
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
  ],
  // Nouvelles propriétés pour le mode avancé
  advancedMode: false,
  wheelCustomization: {
    borderRadius: 50,
    shadowIntensity: 20,
    shadowColor: '#000000',
    bevelEffect: false,
    glowEffect: false,
    glowColor: '#3B82F6',
    // Nouvelles propriétés pour les effets avancés
    texture: 'metallic',
    pulseAnimation: false,
    particleEffect: false,
    continuousRotation: false,
    depth3D: 0,
    perspective: 0
  },
  customPointer: {
    enabled: false,
    file: null,
    url: null,
    type: 'default'
  },
  wheelCenter: {
    enabled: false,
    type: 'logo',
    file: null,
    url: null,
    size: 80
  },
  segmentOverlays: {
    enabled: false,
    overlays: []
  },
  // New properties for monetization and extensions
  monetization: {
    selectedPlan: 'basic',
    leadCapture: false,
    analytics: false,
    socialSharing: false,
    emailIntegration: {}
  },
  extensions: []
};
