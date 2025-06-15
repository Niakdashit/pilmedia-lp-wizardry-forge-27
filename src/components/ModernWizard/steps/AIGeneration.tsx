
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';

interface AIGenerationProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const generationSteps = [
  { id: 1, name: 'Analyzing Your Brand', description: 'Processing brand assets and identity' },
  { id: 2, name: 'Generating Content', description: 'Creating personalized game content' },
  { id: 3, name: 'Optimizing Experience', description: 'Fine-tuning user experience' },
  { id: 4, name: 'Finalizing Campaign', description: 'Preparing your campaign for launch' }
];

const AIGeneration: React.FC<AIGenerationProps> = ({
  campaignData,
  updateCampaignData,
  onNext,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const startGeneration = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Generate content based on campaign data
    const generated = {
      gameTitle: `${campaignData.slogan || 'Brand'} ${campaignData.gameType === 'wheel' ? 'Wheel' : 'Game'}`,
      description: `Experience the excitement of our ${campaignData.gameType} game and win amazing prizes!`,
      welcomeMessage: `Welcome to ${campaignData.slogan || 'our amazing campaign'}!`,
      winMessages: [
        'Congratulations! You won!',
        'Amazing! You are a winner!',
        'Fantastic! Claim your prize!'
      ],
      loseMessages: [
        'Better luck next time!',
        'Thanks for playing!',
        'Try again soon!'
      ],
      buttonTexts: {
        play: `Play ${campaignData.gameType === 'wheel' ? 'Wheel' : 'Game'}`,
        tryAgain: 'Try Again',
        claim: 'Claim Prize'
      },
      prizes: campaignData.gameType === 'wheel' ? [
        '10% Discount',
        '20% Discount',
        'Free Shipping',
        'Buy 1 Get 1 Free',
        'Try Again',
        '5% Discount',
        'Free Gift',
        'Exclusive Access'
      ] : [
        'Grand Prize',
        'Second Prize',
        'Third Prize'
      ]
    };

    setGeneratedContent(generated);
    updateCampaignData({ generatedContent: generated });
    setIsComplete(true);
    setIsGenerating(false);
  };

  useEffect(() => {
    // Auto-start generation when component mounts
    if (!campaignData.generatedContent && !isGenerating && !isComplete) {
      setTimeout(startGeneration, 1000);
    } else if (campaignData.generatedContent) {
      setGeneratedContent(campaignData.generatedContent);
      setIsComplete(true);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Generation
        </h1>
        <p className="text-lg text-gray-600">
          AI is creating your personalized campaign content
        </p>
      </motion.div>

      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#841b60] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI is Working Its Magic
            </h3>
            <p className="text-gray-600">
              Creating content tailored to your brand and audience
            </p>
          </div>

          <div className="space-y-4">
            {generationSteps.map((step, index) => {
              const isActive = index === currentStep && isGenerating;
              const isCompleted = index < currentStep || isComplete;
              const isPending = index > currentStep && !isComplete;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-4 rounded-xl transition-all ${
                    isActive ? 'bg-gradient-to-r from-[#841b60]/10 to-purple-600/10 border border-[#841b60]/20' :
                    isCompleted ? 'bg-green-50 border border-green-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    isActive ? 'bg-gradient-to-r from-[#841b60] to-purple-600' :
                    isCompleted ? 'bg-green-500' :
                    'bg-gray-300'
                  }`}>
                    {isActive ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">{step.id}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${isActive ? 'text-[#841b60]' : isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                      {step.name}
                    </h4>
                    <p className={`text-sm ${isActive ? 'text-[#841b60]/70' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.description}
                    </p>
                  </div>

                  {isActive && (
                    <Sparkles className="w-5 h-5 text-[#841b60] animate-pulse" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isComplete && generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Content Generated Successfully!
              </h3>
              <p className="text-gray-600">
                Your campaign is ready with AI-powered content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Game Title</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {generatedContent.gameTitle}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Welcome Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {generatedContent.welcomeMessage}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Generated Prizes</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {generatedContent.prizes.slice(0, 4).map((prize: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600 py-1">
                        • {prize}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`px-8 py-3 rounded-xl font-medium transition-all ${
            isComplete
              ? 'bg-gradient-to-r from-[#841b60] to-purple-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Preview Live →
        </button>
      </div>
    </div>
  );
};

export default AIGeneration;
