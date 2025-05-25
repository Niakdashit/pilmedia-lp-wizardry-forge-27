
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
      return { 
        quiz: {
          questions: [
            {
              id: Date.now(),
              text: 'Question exemple',
              type: 'multiple',
              image: '',
              options: [
                { id: Date.now() + 1, text: 'Option 1', isCorrect: true },
                { id: Date.now() + 2, text: 'Option 2', isCorrect: false }
              ],
              feedback: {
                correct: 'Bonne réponse !',
                incorrect: 'Mauvaise réponse.'
              },
              timeLimit: 0
            }
          ],
          timeLimit: 30, 
          showCorrectAnswers: true 
        }
      };
    case 'wheel':
      return { 
        wheel: {
          segments: [], 
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] 
        }
      };
    case 'scratch':
      return {
        scratch: {
          scratchArea: 70,
          revealMessage: 'Félicitations !',
          backgroundImage: ''
        }
      };
    case 'memory':
      return {
        memory: {
          cards: [],
          difficulty: 'easy',
          backgroundImage: ''
        }
      };
    case 'puzzle':
      return {
        puzzle: {
          pieces: 9,
          image: '',
          backgroundImage: ''
        }
      };
    case 'dice':
      return { 
        dice: {
          sides: 6, 
          count: 2,
          backgroundImage: ''
        }
      };
    case 'jackpot':
      return {
        jackpot: {
          symbols: ['🍒', '🍋', '🍊'],
          reels: 3,
          winMessage: 'JACKPOT ! Vous avez gagné !',
          loseMessage: 'Dommage, pas de jackpot !',
          backgroundImage: '',
          instantWin: {
            enabled: false,
            winProbability: 0.05,
            maxWinners: undefined,
          }
        }
      };
    default:
      return {};
  }
};
