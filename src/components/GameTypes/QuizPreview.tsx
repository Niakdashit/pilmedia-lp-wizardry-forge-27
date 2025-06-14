
import React from 'react';
import QuizGame from './QuizGame';
import { createSynchronizedQuizCampaign } from '../../utils/quizConfigSync';

interface QuizPreviewProps {
  question?: any;
  config?: any;
  design?: any;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ question, config, design }) => {
  // Créer une campagne temporaire pour utiliser le système de synchronisation
  const tempCampaign = {
    design: design || {},
    gameConfig: { quiz: config || {} }
  };

  const synchronizedCampaign = createSynchronizedQuizCampaign(tempCampaign);

  // Si on a une question spécifique, on crée une config temporaire
  if (question) {
    const tempConfig = {
      questions: [question],
      ...config
    };
    
    return (
      <QuizGame
        config={tempConfig}
        design={synchronizedCampaign.design}
        onGameComplete={() => {}}
      />
    );
  }

  // Si on n'a pas de question mais une config, on l'utilise directement
  if (config?.questions?.length > 0) {
    return (
      <QuizGame
        config={config}
        design={synchronizedCampaign.design}
        onGameComplete={() => {}}
      />
    );
  }

  // Fallback pour le cas où il n'y a pas de données
  return (
    <div className="flex items-center justify-center text-gray-500 text-sm p-8 border border-gray-200 rounded-lg h-full min-h-[400px]">
      <div className="text-center space-y-3">
        <div className="text-lg font-medium">Quiz non configuré</div>
        <div className="text-sm">Ajoutez des questions dans l'onglet "Jeu" pour commencer</div>
      </div>
    </div>
  );
};

export default QuizPreview;
