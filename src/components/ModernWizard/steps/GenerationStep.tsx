
import React, { useState, useEffect } from 'react';
import { WizardData } from '../ModernWizard';
import { Loader, AlertCircle } from 'lucide-react';

interface GenerationStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GenerationStep: React.FC<GenerationStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Configuration de l'endpoint Supabase
  const quizEndpoint = 'https://cknwowuaqymprfaylwti.supabase.co/functions/v1/quiz';

  // Données de fallback pour le mode dégradé
  const getMockQuizData = () => ({
    intro: "Testez vos connaissances sur notre produit !",
    cta: "Commencer le quiz",
    questions: [
      {
        question: "Quelle est la principale caractéristique de notre produit ?",
        choices: ["Innovation", "Qualité", "Prix", "Design"],
        answer: "Innovation"
      },
      {
        question: "Dans quel domaine excellons-nous le plus ?",
        choices: ["Service client", "Technologie", "Marketing", "Logistique"],
        answer: "Service client"
      },
      {
        question: "Que recherchent nos clients avant tout ?",
        choices: ["Rapidité", "Fiabilité", "Économies", "Simplicité"],
        answer: "Fiabilité"
      }
    ],
    errorText: "Oops ! Mauvaise réponse. Essayez encore !",
    successText: "Bravo ! Vous connaissez bien notre produit !"
  });

  useEffect(() => {
    if (!isGenerating) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress(10);
    setDebugInfo('Initialisation...');

    try {
      console.log('🚀 Configuration endpoint:', {
        endpoint: quizEndpoint
      });
      
      setDebugInfo(`Endpoint: ${quizEndpoint}`);

      // Simulation de progression
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 500);

      setDebugInfo('Envoi de la requête à Supabase...');

      // Timeout pour éviter l'attente infinie
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 15000);

      const payload = {
        logoUrl: wizardData.logo,
        desktopVisualUrl: wizardData.desktopVisual,
        mobileVisualUrl: wizardData.mobileVisual,
        websiteUrl: wizardData.websiteUrl,
        productName: wizardData.productName
      };

      console.log('📤 Payload envoyé:', payload);

      const response = await fetch(quizEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearInterval(progressInterval);
      clearTimeout(timeoutId);

      console.log('📥 Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur réponse:', errorText);
        throw new Error(`API_ERROR: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Quiz généré avec succès:', data);
      
      setProgress(100);
      setDebugInfo('Quiz généré avec succès !');
      updateWizardData({ generatedQuiz: data });
      
    } catch (error: any) {
      console.error('❌ Erreur génération quiz:', error);
      
      let errorMessage = 'Erreur inconnue';
      let debugMessage = '';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Timeout de la requête';
        debugMessage = 'La génération a pris trop de temps (>15s)';
      } else if (error.message.startsWith('API_ERROR')) {
        errorMessage = 'Erreur de l\'API Supabase';
        debugMessage = error.message;
      } else {
        errorMessage = 'Erreur réseau';
        debugMessage = error.message;
      }
      
      setDebugInfo(debugMessage);
      
      // En cas d'erreur, utiliser les données mockées
      console.log('🔄 Utilisation des données de fallback');
      const mockData = getMockQuizData();
      updateWizardData({ generatedQuiz: mockData });
      
      setError(`${errorMessage} - Mode dégradé activé`);
      setProgress(100);
      
    } finally {
      setIsGenerating(false);
      setTimeout(() => nextStep(), 2000);
    }
  };

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
    <div className="space-y-6">
      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100/50">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Génération de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Notre IA configure automatiquement votre campagne en fonction de vos choix et éléments de marque.
          </p>
        </div>

        {/* Generation Status */}
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

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <div className="px-8 py-3 bg-gray-100 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
            {isGenerating ? 'Génération en cours...' : 'Génération terminée'}
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-4">✅ Configuration API</h3>
        <div className="space-y-3 text-sm text-emerald-800">
          <div>
            <strong>Endpoint Supabase configuré :</strong>
            <div className="mt-2 bg-emerald-100 rounded p-3 font-mono text-xs">
              {quizEndpoint}
            </div>
          </div>
          <div>
            <strong>Fonction Edge déployée :</strong> quiz
          </div>
          <div>
            <strong>Clé OpenAI :</strong> Configurée dans Supabase Secrets
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationStep;
