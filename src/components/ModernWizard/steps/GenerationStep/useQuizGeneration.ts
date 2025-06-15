
import { useState } from 'react';
import { WizardData } from '../../ModernWizard';

interface UseQuizGenerationProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
}

export const useQuizGeneration = ({ wizardData, updateWizardData, nextStep }: UseQuizGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  const quizEndpoint = import.meta.env.VITE_QUIZ_ENDPOINT || 'https://cknwowuaqymprfaylwti.supabase.co/functions/v1/quiz';

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

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress(10);
    setDebugInfo('Initialisation...');

    try {
      console.log('🚀 Configuration endpoint:', {
        endpoint: quizEndpoint,
        envVariable: import.meta.env.VITE_QUIZ_ENDPOINT,
        fallback: !import.meta.env.VITE_QUIZ_ENDPOINT ? 'Utilisant le fallback' : 'Variable configurée'
      });
      
      setDebugInfo(`Endpoint: ${quizEndpoint} ${!import.meta.env.VITE_QUIZ_ENDPOINT ? '(fallback)' : '(env)'}`);

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 500);

      setDebugInfo('Envoi de la requête à Supabase...');

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
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'Lovable-Quiz-Generator/1.0'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearInterval(progressInterval);
      clearTimeout(timeoutId);

      console.log('📥 Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
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
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Erreur de connexion réseau';
        debugMessage = 'Impossible de contacter le serveur Supabase';
      } else if (error.message.startsWith('API_ERROR')) {
        errorMessage = 'Erreur de l\'API Supabase';
        debugMessage = error.message;
      } else {
        errorMessage = 'Erreur réseau';
        debugMessage = error.message;
      }
      
      setDebugInfo(debugMessage);
      
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

  return {
    isGenerating,
    error,
    progress,
    debugInfo,
    quizEndpoint,
    handleGenerate
  };
};
