
import React from 'react';
import QuizGame from './QuizGame';
import CustomQuizGame from './Quiz/CustomQuizGame';
import { createSynchronizedQuizCampaign } from '../../utils/quizConfigSync';

interface QuizPreviewProps {
  question?: any;
  config?: any;
  design?: any;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  useCustomLayout?: boolean;
  logoUrl?: string;
  backgroundUrl?: string;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ 
  question, 
  config, 
  design, 
  gameSize = 'medium',
  className = "",
  useCustomLayout = true,
  logoUrl,
  backgroundUrl
}) => {
  // Créer une campagne temporaire pour utiliser le système de synchronisation
  const tempCampaign = {
    design: design || {},
    gameConfig: { quiz: config || {} }
  };

  const synchronizedCampaign = createSynchronizedQuizCampaign(tempCampaign);

  // Si on utilise le layout personnalisé, utiliser CustomQuizGame
  if (useCustomLayout) {
    // Si on a une question spécifique, on crée une config temporaire
    if (question) {
      const tempConfig = {
        questions: [question],
        ...config
      };
      
      return (
        <div className={className} style={{ width: '100%', height: '100%' }}>
          <CustomQuizGame
            config={tempConfig}
            design={synchronizedCampaign.design}
            onGameComplete={() => {}}
            logoUrl={logoUrl}
            backgroundUrl={backgroundUrl}
          />
        </div>
      );
    }

    // Si on n'a pas de question mais une config, on l'utilise directement
    if (config?.questions?.length > 0) {
      return (
        <div className={className} style={{ width: '100%', height: '100%' }}>
          <CustomQuizGame
            config={config}
            design={synchronizedCampaign.design}
            onGameComplete={() => {}}
            logoUrl={logoUrl}
            backgroundUrl={backgroundUrl}
          />
        </div>
      );
    }

    // Fallback pour le cas où il n'y a pas de données
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/90 rounded-3xl shadow-xl max-w-md w-full mx-4 px-8 py-8 text-center">
          <div className="text-lg font-medium text-[#815194] mb-2">Quiz non configuré</div>
          <div className="text-sm text-[#ae8ac3]">Ajoutez des questions dans l'onglet "Jeu" pour commencer</div>
        </div>
      </div>
    );
  }

  // Fallback vers l'ancien système si useCustomLayout = false
  const getSizeStyles = () => {
    switch (gameSize) {
      case 'small':
        return { maxWidth: '300px', padding: '24px' };
      case 'large':
        return { maxWidth: '700px', padding: '32px' };
      case 'xlarge':
        return { maxWidth: '900px', padding: '40px' };
      default:
        return { maxWidth: '600px', padding: '32px' };
    }
  };

  const containerStyle = {
    width: '100%',
    backgroundColor: synchronizedCampaign.design.containerBackgroundColor || '#ffffff',
    borderColor: synchronizedCampaign.design.borderColor || '#e5e7eb',
    borderRadius: synchronizedCampaign.design.borderRadius || '16px',
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: synchronizedCampaign.design.enableShadow !== false 
      ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' 
      : 'none',
    ...getSizeStyles()
  };

  // Si on a une question spécifique, on crée une config temporaire
  if (question) {
    const tempConfig = {
      questions: [question],
      ...config
    };
    
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div style={containerStyle}>
          <QuizGame
            config={tempConfig}
            design={synchronizedCampaign.design}
            onGameComplete={() => {}}
          />
        </div>
      </div>
    );
  }

  // Si on n'a pas de question mais une config, on l'utilise directement
  if (config?.questions?.length > 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div style={containerStyle}>
          <QuizGame
            config={config}
            design={synchronizedCampaign.design}
            onGameComplete={() => {}}
          />
        </div>
      </div>
    );
  }

  // Fallback pour le cas où il n'y a pas de données
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div style={containerStyle}>
        <div className="text-center space-y-3 p-8">
          <div className="text-lg font-medium text-gray-500">Quiz non configuré</div>
          <div className="text-sm text-gray-400">Ajoutez des questions dans l'onglet "Jeu" pour commencer</div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
