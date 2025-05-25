
import { HelpCircle, Dice1, Calendar, Gift, Brain, FileText, Puzzle } from 'lucide-react';

export type CampaignType = 'quiz' | 'wheel' | 'scratch' | 'memory' | 'contest' | 'survey' | 'form' | 'puzzle' | 'dice';

export const getDefaultGameConfig = (type: CampaignType) => {
  switch (type) {
    case 'quiz':
      return {
        questions: [
          {
            id: 1,
            question: "Quelle est la capitale de la France ?",
            answers: ["Paris", "Lyon", "Marseille", "Nice"],
            correctAnswer: 0
          }
        ]
      };
    case 'wheel':
      return {
        segments: [
          { label: "10€", probability: 20, color: "#FF6B6B" },
          { label: "5€", probability: 30, color: "#4ECDC4" },
          { label: "Perdu", probability: 50, color: "#95E1D3" }
        ]
      };
    default:
      return {};
  }
};

export const getCampaignTypeIcon = (type: CampaignType) => {
  const iconMap = {
    quiz: HelpCircle,
    wheel: Dice1,
    scratch: Gift,
    memory: Brain,
    contest: Calendar,
    survey: FileText,
    form: FileText,
    puzzle: Puzzle,
    dice: Dice1
  };
  return iconMap[type] || HelpCircle;
};

export const getCampaignTypeText = (type: CampaignType) => {
  const textMap = {
    quiz: 'Quiz',
    wheel: 'Roue de la fortune',
    scratch: 'Carte à gratter',
    memory: 'Jeu de mémoire',
    contest: 'Concours',
    survey: 'Sondage',
    form: 'Formulaire',
    puzzle: 'Puzzle',
    dice: 'Dés chanceux'
  };
  return textMap[type] || 'Quiz';
};
