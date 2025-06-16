
/**
 * Utilitaire pour synchroniser et normaliser les configurations de quiz
 * Évite la duplication de logique entre les différents composants
 */

interface QuizDesignConfig {
  containerBackgroundColor?: string;
  background?: string;
  borderColor?: string;
  borderRadius?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  titleColor?: string;
  secondaryTextColor?: string;
  fontFamily?: string;
  questionFontSize?: string;
  questionFontWeight?: string;
  optionBackgroundColor?: string;
  optionBorderColor?: string;
  buttonTextColor?: string;
  buttonColor?: string;
  progressBackgroundColor?: string;
  enableShadow?: boolean;
  enableGradient?: boolean;
}

interface QuizGameConfig {
  buttonLabel?: string;
  buttonColor?: string;
  containerBackgroundColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  textColor?: string;
  questionBackgroundColor?: string;
  optionBackgroundColor?: string;
  optionBorderColor?: string;
  correctOptionColor?: string;
  incorrectOptionColor?: string;
}

export const createEnhancedQuizDesign = (campaign: any): QuizDesignConfig => {
  const design = campaign.design || {};
  
  return {
    containerBackgroundColor: design.containerBackgroundColor || design.blockColor || '#ffffff',
    background: design.background || '#f8fafc',
    borderColor: design.borderColor || '#e5e7eb',
    borderRadius: design.borderRadius || '16px',
    primaryColor: design.primaryColor || design.buttonColor || '#841b60',
    secondaryColor: design.secondaryColor || '#1e40af',
    textColor: design.textColor || design.titleColor || '#1f2937',
    titleColor: design.titleColor || '#000000',
    secondaryTextColor: design.secondaryTextColor || '#6b7280',
    fontFamily: design.fontFamily || 'Inter, sans-serif',
    questionFontSize: design.questionFontSize || '1.5rem',
    questionFontWeight: design.questionFontWeight || '600',
    optionBackgroundColor: design.optionBackgroundColor || design.blockColor || '#ffffff',
    optionBorderColor: design.optionBorderColor || design.borderColor || '#e5e7eb',
    buttonTextColor: design.buttonTextColor || '#ffffff',
    buttonColor: design.buttonColor || design.primaryColor || '#841b60',
    progressBackgroundColor: design.progressBackgroundColor || '#f3f4f6',
    enableShadow: design.enableShadow !== false,
    enableGradient: design.enableGradient !== false
  };
};

export const createEnhancedQuizGameConfig = (campaign: any): QuizGameConfig => {
  const design = campaign.design || {};
  const gameConfig = campaign.gameConfig?.quiz || {};
  
  return {
    buttonLabel: campaign.buttonConfig?.text || gameConfig.buttonLabel || 'Suivant',
    buttonColor: design.buttonColor || campaign.buttonConfig?.color || gameConfig.buttonColor || '#841b60',
    containerBackgroundColor: design.blockColor || gameConfig.containerBackgroundColor || '#ffffff',
    backgroundColor: design.blockColor || gameConfig.backgroundColor || '#ffffff',
    borderColor: design.borderColor || gameConfig.borderColor || '#e5e7eb',
    borderRadius: design.borderRadius || gameConfig.borderRadius || '16px',
    textColor: design.titleColor || gameConfig.textColor || '#000000',
    questionBackgroundColor: design.blockColor || gameConfig.questionBackgroundColor || '#ffffff',
    optionBackgroundColor: design.blockColor || gameConfig.optionBackgroundColor || '#ffffff',
    optionBorderColor: design.borderColor || gameConfig.optionBorderColor || '#e5e7eb',
    correctOptionColor: design.buttonColor || gameConfig.correctOptionColor || '#841b60',
    incorrectOptionColor: gameConfig.incorrectOptionColor || '#ef4444'
  };
};

export const createSynchronizedQuizCampaign = (campaign: any) => {
  const enhancedDesign = createEnhancedQuizDesign(campaign);
  const enhancedGameConfig = createEnhancedQuizGameConfig(campaign);
  
  return {
    ...campaign,
    design: {
      ...campaign.design,
      ...enhancedDesign
    },
    gameConfig: {
      ...campaign.gameConfig,
      quiz: {
        ...campaign.gameConfig?.quiz,
        ...enhancedGameConfig
      }
    }
  };
};
