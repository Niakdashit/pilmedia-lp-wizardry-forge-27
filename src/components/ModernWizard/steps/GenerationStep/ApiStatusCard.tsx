
import React from 'react';

interface ApiStatusCardProps {
  error: string | null;
  quizEndpoint: string;
}

const ApiStatusCard: React.FC<ApiStatusCardProps> = ({ error, quizEndpoint }) => {
  const isDemo = error && error.includes('Mode démonstration');
  const isDegraded = error && !isDemo;
  const isWorking = !error;

  const getStatusInfo = () => {
    if (isDemo) {
      return {
        bgColor: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-900',
        iconColor: 'bg-blue-100',
        icon: '🎯',
        title: 'Mode Démonstration',
        status: 'Environnement de test détecté'
      };
    }
    if (isDegraded) {
      return {
        bgColor: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-900',
        iconColor: 'bg-orange-100',
        icon: '⚠️',
        title: 'Mode Dégradé',
        status: 'API non accessible - Fallback activé'
      };
    }
    return {
      bgColor: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-900',
      iconColor: 'bg-emerald-100',
      icon: '✅',
      title: 'API Fonctionnelle',
      status: 'Connexion établie avec succès'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`${statusInfo.bgColor} border rounded-2xl p-6`}>
      <div className="flex items-start gap-4">
        <div className={`${statusInfo.iconColor} rounded-full p-3 text-2xl`}>
          {statusInfo.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-2 ${statusInfo.textColor}`}>
            {statusInfo.title}
          </h3>
          <p className={`text-sm ${statusInfo.textColor} mb-4`}>
            {statusInfo.status}
          </p>
          
          <div className={`space-y-3 text-sm ${statusInfo.textColor}`}>
            <div>
              <strong>Endpoint :</strong>
              <div className={`mt-2 ${statusInfo.iconColor} rounded p-3 font-mono text-xs break-all`}>
                {quizEndpoint}
              </div>
            </div>
            
            {isDemo && (
              <div className="space-y-2">
                <div><strong>Environnement :</strong> Lovable Preview</div>
                <div><strong>Données :</strong> Quiz de démonstration</div>
                <div><strong>Fonctionnalités :</strong> Interface complète disponible</div>
              </div>
            )}
            
            {isDegraded && (
              <div className="space-y-2">
                <div><strong>Cause :</strong> Erreur CORS ou configuration manquante</div>
                <div><strong>Solution :</strong> Déployer sur Vercel avec VITE_QUIZ_ENDPOINT</div>
                <div><strong>Alternative :</strong> Fonctionnement normal avec données de test</div>
              </div>
            )}
            
            {isWorking && (
              <div className="space-y-2">
                <div><strong>Fonction Edge :</strong> quiz déployée</div>
                <div><strong>Clé OpenAI :</strong> Configurée dans Supabase</div>
                <div><strong>CORS :</strong> Correctement configuré</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusCard;
