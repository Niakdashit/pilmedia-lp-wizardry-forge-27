
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
  
  // Détection d'environnement et configuration de l'endpoint
  const isLovableEnvironment = window.location.hostname.includes('lovableproject.com');
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
      console.log('🚀 Configuration:', {
        endpoint: quizEndpoint,
        environment: isLovableEnvironment ? 'Lovable' : 'Production',
        envVariable: import.meta.env.VITE_QUIZ_ENDPOINT ? 'Configurée' : 'Non configurée'
      });
      
      setDebugInfo(`Environnement: ${isLovableEnvironment ? 'Lovable (mode test)' : 'Production'}`);

      // En environnement Lovable, utiliser directement le fallback avec un message explicatif
      if (isLovableEnvironment && !import.meta.env.VITE_QUIZ_ENDPOINT) {
        setProgress(50);
        setDebugInfo('Mode test Lovable détecté - Utilisation des données de démonstration');
        
        // Simulation d'une génération pour l'UX
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockData = getMockQuizData();
        updateWizardData({ generatedQuiz: mockData });
        
        setProgress(100);
        setDebugInfo('Quiz de démonstration généré avec succès !');
        setError('Mode démonstration - Quiz généré avec des données de test');
        
        setTimeout(() => nextStep(), 2000);
        return;
      }

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 80));
      }, 500);

      setDebugInfo('Connexion à l\'API Supabase...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000); // Timeout réduit à 10s

      const payload = {
        logoUrl: wizardData.logo,
        desktopVisualUrl: wizardData.desktopVisual,
        mobileVisualUrl: wizardData.mobileVisual,
        websiteUrl: wizardData.websiteUrl,
        productName: wizardData.productName
      };

      console.log('📤 Tentative d\'appel API:', payload);

      const response = await fetch(quizEndpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'Lovable-Quiz-Generator/1.0',
          'Origin': window.location.origin
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        mode: 'cors'
      });

      clearInterval(progressInterval);
      clearTimeout(timeoutId);

      console.log('📥 Réponse API:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur API:', errorText);
        throw new Error(`API_ERROR: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Quiz généré avec succès:', data);
      
      setProgress(100);
      setDebugInfo('Quiz généré avec succès via l\'API !');
      updateWizardData({ generatedQuiz: data });
      
    } catch (error: any) {
      console.error('❌ Erreur génération:', error);
      
      let errorMessage = 'Erreur inconnue';
      let debugMessage = '';
      let shouldUseFallback = true;
      
      // Gestion spécifique des erreurs CORS
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        if (isLovableEnvironment) {
          errorMessage = 'Limitation CORS en environnement Lovable';
          debugMessage = 'Mode test activé - Les données de démonstration sont utilisées';
        } else {
          errorMessage = 'Erreur de connexion réseau';
          debugMessage = 'Vérifiez votre connexion et la configuration CORS';
        }
      } else if (error.name === 'AbortError') {
        errorMessage = 'Timeout de la requête';
        debugMessage = 'La génération a pris trop de temps (>10s)';
      } else if (error.message.startsWith('API_ERROR')) {
        errorMessage = 'Erreur de l\'API Supabase';
        debugMessage = error.message;
      } else {
        errorMessage = 'Erreur de génération';
        debugMessage = error.message;
      }
      
      setDebugInfo(debugMessage);
      
      if (shouldUseFallback) {
        console.log('🔄 Activation du mode dégradé');
        const mockData = getMockQuizData();
        updateWizardData({ generatedQuiz: mockData });
        
        setError(`${errorMessage} - Mode dégradé activé`);
        setProgress(100);
      } else {
        setError(errorMessage);
      }
      
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
