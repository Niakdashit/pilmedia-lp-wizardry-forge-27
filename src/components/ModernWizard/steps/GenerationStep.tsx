
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
  const quizEndpoint = import.meta.env.VITE_QUIZ_ENDPOINT || '/api/quiz';

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

    try {
      console.log('🚀 Démarrage génération quiz avec endpoint:', quizEndpoint);
      
      // Simulation de progression
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 500);

      // Timeout pour éviter l'attente infinie
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 15000); // 15 secondes timeout

      const response = await fetch(quizEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoUrl: wizardData.logo,
          desktopVisualUrl: wizardData.desktopVisual,
          mobileVisualUrl: wizardData.mobileVisual,
          websiteUrl: wizardData.websiteUrl,
          productName: wizardData.productName
        }),
        signal: controller.signal
      });

      clearInterval(progressInterval);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Échec génération: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Quiz généré avec succès:', data);
      
      setProgress(100);
      updateWizardData({ generatedQuiz: data });
      
    } catch (error) {
      console.error('❌ Erreur génération quiz:', error);
      
      // En cas d'erreur, utiliser les données mockées
      console.log('🔄 Utilisation des données de fallback');
      const mockData = getMockQuizData();
      updateWizardData({ generatedQuiz: mockData });
      
      setError('Génération AI indisponible, utilisation du mode dégradé');
      setProgress(100);
      
    } finally {
      setIsGenerating(false);
      setTimeout(() => nextStep(), 1000);
    }
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
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center mb-8">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-[#951b6d]/10 rounded-full flex items-center justify-center mx-auto">
              {error ? (
                <AlertCircle className="w-8 h-8 text-orange-500" />
              ) : (
                <Loader className="w-8 h-8 text-[#951b6d] animate-spin" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-[#141e29] mb-2">
                {error ? 'Mode dégradé activé' : 'Génération en cours...'}
              </h3>
              <p className="text-gray-600">
                {error || 'Configuration des paramètres et personnalisation'}
              </p>
              {error && (
                <p className="text-sm text-orange-600 mt-2">
                  Votre campagne sera créée avec des données par défaut
                </p>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  error ? 'bg-orange-500' : 'bg-[#951b6d]'
                }`}
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
    </div>
  );
};

export default GenerationStep;
