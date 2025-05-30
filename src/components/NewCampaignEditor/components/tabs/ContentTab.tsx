
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import WheelContentEditor from '../content/WheelContentEditor';
import JackpotContentEditor from '../content/JackpotContentEditor';
import ScratchContentEditor from '../content/ScratchContentEditor';
import QuizContentEditor from '../content/QuizContentEditor';
import FormContentEditor from '../content/FormContentEditor';

interface ContentTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ContentTab: React.FC<ContentTabProps> = ({ campaign, setCampaign }) => {
  const getGameTypeLabel = (type: string) => {
    const labels = {
      wheel: 'Roue de la Fortune',
      jackpot: 'Machine à Sous',
      scratch: 'Carte à Gratter',
      memory: 'Jeu de Mémoire',
      puzzle: 'Puzzle',
      dice: 'Dé Magique',
      quiz: 'Quiz'
    };
    return labels[type as keyof typeof labels] || 'Jeu';
  };

  const renderGameEditor = () => {
    switch (campaign.type) {
      case 'wheel':
        return <WheelContentEditor campaign={campaign} setCampaign={setCampaign} />;
      case 'jackpot':
        return <JackpotContentEditor campaign={campaign} setCampaign={setCampaign} />;
      case 'scratch':
        return <ScratchContentEditor campaign={campaign} setCampaign={setCampaign} />;
      case 'quiz':
        return <QuizContentEditor campaign={campaign} setCampaign={setCampaign} />;
      default:
        return <FormContentEditor campaign={campaign} setCampaign={setCampaign} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
          <Gamepad2 className="w-6 h-6 mr-2 text-indigo-600" />
          Configuration {getGameTypeLabel(campaign.type)}
        </h2>
        <p className="text-gray-600 mb-6">
          Personnalisez les paramètres spécifiques à votre jeu
        </p>
        
        {renderGameEditor()}
      </div>
    </div>
  );
};

export default ContentTab;
