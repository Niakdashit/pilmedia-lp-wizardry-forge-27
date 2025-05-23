
import { Gamepad2, Target, Share2, FlipHorizontal2, FormInput, Grid3X3, Dices } from 'lucide-react';

export const getCampaignTypeIcon = (type: string) => {
  switch (type) {
    case 'wheel':
      return <Gamepad2 className="w-4 h-4" />;
    case 'quiz':
      return <Target className="w-4 h-4" />;
    case 'social':
      return <Share2 className="w-4 h-4" />;
    case 'memory':
      return <FlipHorizontal2 className="w-4 h-4" />;
    case 'form':
      return <FormInput className="w-4 h-4" />;
    case 'puzzle':
      return <Grid3X3 className="w-4 h-4" />;
    case 'dice':
      return <Dices className="w-4 h-4" />;
    default:
      return <Target className="w-4 h-4" />;
  }
};

export const getCampaignTypeText = (type: string) => {
  switch (type) {
    case 'wheel': return 'Roue de la fortune';
    case 'quiz': return 'Quiz';
    case 'scratch': return 'Carte à gratter';
    case 'social': return 'Réseaux sociaux';
    case 'memory': return 'Jeu de mémoire';
    case 'form': return 'Formulaire';
    case 'puzzle': return 'Puzzle';
    case 'dice': return 'Dés chanceux';
    default: return type;
  }
};
