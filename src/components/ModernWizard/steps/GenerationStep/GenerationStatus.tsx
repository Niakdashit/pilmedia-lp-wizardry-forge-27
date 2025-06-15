
import React from 'react';
import { Loader, AlertCircle } from 'lucide-react';

interface GenerationStatusProps {
  isGenerating: boolean;
  error: string | null;
  progress: number;
  debugInfo: string;
}

const GenerationStatus: React.FC<GenerationStatusProps> = ({
  isGenerating,
  error,
  progress,
  debugInfo
}) => {
  const getStatusColor = () => {
    if (error) return 'text-orange-600';
    if (progress === 100) return 'text-emerald-600';
    return 'text-[#951b6d]';
  };

  const getProgressColor = () => {
    if (error) return 'bg-orange-500';
    if (progress === 100) return 'bg-emerald-500';
    return 'bg-[#951b6d]';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-8">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-[#951b6d]/10 rounded-full flex items-center justify-center mx-auto">
          {error ? (
            <AlertCircle className="w-8 h-8 text-orange-500" />
          ) : (
            <Loader className="w-8 h-8 text-[#951b6d] animate-spin" />
          )}
        </div>
        <div>
          <h3 className={`font-semibold mb-2 ${getStatusColor()}`}>
            {error ? 'Mode dégradé activé' : 
             progress === 100 ? 'Génération terminée' : 'Génération en cours...'}
          </h3>
          <p className="text-gray-600 mb-2">
            {error || (progress === 100 ? 'Votre campagne est prête !' : 'Configuration des paramètres et personnalisation')}
          </p>
          {debugInfo && (
            <p className="text-xs text-gray-500 font-mono bg-gray-50 rounded px-2 py-1">
              {debugInfo}
            </p>
          )}
          {error && (
            <p className="text-sm text-orange-600 mt-2">
              Votre campagne sera créée avec des données par défaut
            </p>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GenerationStatus;
