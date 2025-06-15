
import React from 'react';

interface ApiStatusCardProps {
  error: string | null;
  quizEndpoint: string;
}

const ApiStatusCard: React.FC<ApiStatusCardProps> = ({ error, quizEndpoint }) => {
  return (
    <div className={`${error ? 'bg-orange-50 border-orange-200' : 'bg-emerald-50 border-emerald-200'} border rounded-2xl p-6`}>
      <h3 className={`font-semibold mb-4 ${error ? 'text-orange-900' : 'text-emerald-900'}`}>
        {error ? '⚠️ Configuration API' : '✅ Configuration API'}
      </h3>
      <div className={`space-y-3 text-sm ${error ? 'text-orange-800' : 'text-emerald-800'}`}>
        <div>
          <strong>Endpoint utilisé :</strong>
          <div className={`mt-2 ${error ? 'bg-orange-100' : 'bg-emerald-100'} rounded p-3 font-mono text-xs`}>
            {quizEndpoint}
          </div>
          {!import.meta.env.VITE_QUIZ_ENDPOINT && (
            <div className="mt-2 text-orange-600 text-sm">
              ⚠️ Variable VITE_QUIZ_ENDPOINT non configurée dans Vercel
            </div>
          )}
        </div>
        <div>
          <strong>Fonction Edge déployée :</strong> quiz
        </div>
        <div>
          <strong>Clé OpenAI :</strong> Configurée dans Supabase Secrets
        </div>
      </div>
    </div>
  );
};

export default ApiStatusCard;
