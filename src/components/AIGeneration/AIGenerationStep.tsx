
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import AIGenerationProgress from './AIGenerationProgress';
import GenerationPhaseDisplay from './GenerationPhaseDisplay';
import GamePreviewGenerator from './GamePreviewGenerator';
import ContentSuggestions from './ContentSuggestions';

interface AIGenerationStepProps {
  gameType: string;
  onNext: (generatedData: any) => void;
  onBack: () => void;
}

const AIGenerationStep: React.FC<AIGenerationStepProps> = ({
  gameType,
  onNext,
  onBack
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>({});
  const [isComplete, setIsComplete] = useState(false);

  const phases = [
    {
      id: 0,
      name: 'Brand Analysis',
      description: 'Analyzing your brand colors, logo, and style preferences',
      duration: 2000
    },
    {
      id: 1,
      name: 'Content Generation',
      description: 'Creating engaging texts, messages, and game elements',
      duration: 3000
    },
    {
      id: 2,
      name: 'UX Optimization',
      description: 'Optimizing user experience and visual design',
      duration: 2500
    },
    {
      id: 3,
      name: 'Final Configuration',
      description: 'Assembling your personalized game',
      duration: 1500
    }
  ];

  useEffect(() => {
    // Auto-start generation when component mounts
    const timer = setTimeout(() => {
      startGeneration();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const startGeneration = async () => {
    setIsGenerating(true);
    
    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(i);
      
      // Simulate AI processing for each phase
      await new Promise(resolve => setTimeout(resolve, phases[i].duration));
      
      // Generate content for each phase
      const phaseContent = await generatePhaseContent(i);
      setGeneratedContent((prev: any) => ({
        ...prev,
        [phases[i].name.toLowerCase().replace(' ', '_')]: phaseContent
      }));
    }
    
    setIsGenerating(false);
    setIsComplete(true);
  };

  const generatePhaseContent = async (phaseIndex: number) => {
    // Get existing configuration data
    const existingConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
    const brandData = existingConfig.brandCustomization || {};
    
    switch (phaseIndex) {
      case 0: // Brand Analysis
        return {
          dominantColors: brandData.extractedColors || {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            accent: '#F59E0B'
          },
          brandStyle: 'modern',
          logoAnalysis: brandData.logoUrl ? 'Professional logo detected' : 'Text-based branding'
        };
        
      case 1: // Content Generation
        return generateGameContent(gameType);
        
      case 2: // UX Optimization
        return {
          layoutOptimizations: ['Responsive design', 'Accessibility improvements', 'Mobile-first approach'],
          colorAdjustments: 'Contrast optimized for better visibility',
          animations: 'Smooth transitions and micro-interactions'
        };
        
      case 3: // Final Configuration
        return {
          gameConfiguration: generateGameConfig(gameType),
          ready: true
        };
        
      default:
        return {};
    }
  };

  const generateGameContent = (type: string) => {
    const contentMap = {
      wheel: {
        title: 'Spin & Win!',
        subtitle: 'Try your luck and win amazing prizes',
        callToAction: 'Spin the Wheel',
        prizes: ['10% Discount', '20% Discount', 'Free Shipping', 'Mystery Gift', 'VIP Access', 'Try Again'],
        winMessage: 'Congratulations! You won:',
        loseMessage: 'Better luck next time!'
      },
      scratch: {
        title: 'Scratch to Reveal',
        subtitle: 'Scratch the card to discover your prize',
        callToAction: 'Start Scratching',
        prizes: ['€5 Off', '€10 Off', '€15 Off', 'Free Gift'],
        winMessage: 'Amazing! You revealed:',
        loseMessage: 'Keep trying!'
      },
      quiz: {
        title: 'Knowledge Challenge',
        subtitle: 'Test your knowledge and win prizes',
        callToAction: 'Start Quiz',
        questions: generateQuizQuestions(),
        winMessage: 'Perfect score! You earned:',
        loseMessage: 'Good try! Study more and come back!'
      }
    };

    return contentMap[type as keyof typeof contentMap] || contentMap.wheel;
  };

  const generateQuizQuestions = () => [
    {
      question: 'What is the key to successful marketing?',
      options: ['Understanding your audience', 'Having a big budget', 'Using all channels', 'Being everywhere'],
      correct: 0
    },
    {
      question: 'Which metric is most important for engagement?',
      options: ['Views', 'Clicks', 'Time spent', 'Shares'],
      correct: 2
    }
  ];

  const generateGameConfig = (type: string) => {
    // Get existing configuration data
    const existingConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
    const brandData = existingConfig.brandCustomization || {};
    
    return {
      type,
      theme: brandData.selectedBackground || 'gradient-1',
      colors: brandData.extractedColors,
      font: brandData.selectedFont || 'Inter',
      animations: true,
      sound: false,
      autoPlay: false
    };
  };

  const handleRegenerate = () => {
    setCurrentPhase(0);
    setGeneratedContent({});
    setIsComplete(false);
    startGeneration();
  };

  const handleContinue = () => {
    onNext({
      phases: generatedContent,
      gameConfig: generatedContent.final_configuration?.gameConfiguration,
      content: generatedContent.content_generation
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            AI Game Generation
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Our AI is creating your personalized {gameType} game
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Progress & Phases */}
        <div className="space-y-6">
          <AIGenerationProgress
            phases={phases}
            currentPhase={currentPhase}
            isGenerating={isGenerating}
            isComplete={isComplete}
          />
          
          <GenerationPhaseDisplay
            phases={phases}
            currentPhase={currentPhase}
            generatedContent={generatedContent}
            isGenerating={isGenerating}
          />
        </div>

        {/* Preview & Content */}
        <div className="space-y-6">
          <GamePreviewGenerator
            gameType={gameType}
            generatedContent={generatedContent}
            isComplete={isComplete}
          />
          
          {isComplete && (
            <ContentSuggestions
              content={generatedContent.content_generation}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Brand Customization</span>
        </motion.button>

        <motion.button
          onClick={handleContinue}
          disabled={!isComplete}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={isComplete ? { scale: 1.05 } : {}}
          whileTap={isComplete ? { scale: 0.95 } : {}}
        >
          <span>Continue to Editor</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default AIGenerationStep;
