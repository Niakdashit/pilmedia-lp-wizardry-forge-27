
import { Quiz, Wheel, Dice, Calendar, Gift, Brain, FileText, Puzzle } from 'lucide-react';

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
    quiz: Quiz,
    wheel: Wheel,
    scratch: Gift,
    memory: Brain,
    contest: Calendar,
    survey: FileText,
    form: FileText,
    puzzle: Puzzle,
    dice: Dice
  };
  return iconMap[type] || Quiz;
};
