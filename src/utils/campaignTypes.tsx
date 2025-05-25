
import React from 'react';
import { HelpCircle, Settings, Dices } from 'lucide-react';

export type CampaignType = 'quiz' | 'wheel' | 'scratch' | 'memory' | 'puzzle' | 'dice' | 'swiper' | 'jackpot';

export const campaignTypes: Array<{
  id: CampaignType;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}> = [
  { id: 'quiz', name: 'Quiz', icon: HelpCircle, description: 'Créez un quiz interactif' },
  { id: 'wheel', name: 'Roue de la Fortune', icon: Settings, description: 'Roue de la fortune personnalisable' },
  { id: 'dice', name: 'Dés', icon: Dices, description: 'Jeu de dés amusant' },
];

export const getCampaignTypeText = (type: CampaignType): string => {
  const campaignType = campaignTypes.find(ct => ct.id === type);
  return campaignType ? campaignType.name : type;
};

export const getCampaignTypeIcon = (type: CampaignType) => {
  const campaignType = campaignTypes.find(ct => ct.id === type);
  return campaignType ? campaignType.icon : HelpCircle;
};

export const getDefaultGameConfig = (type: CampaignType) => {
  switch (type) {
    case 'quiz':
      return { questions: [], timeLimit: 30, showCorrectAnswers: true };
    case 'wheel':
      return { segments: [], colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] };
    case 'dice':
      return { sides: 6, count: 2 };
    default:
      return {};
  }
};
