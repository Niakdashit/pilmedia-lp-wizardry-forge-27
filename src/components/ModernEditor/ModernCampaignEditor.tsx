
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Save, Wand2, Upload, Palette, Type, Layout, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModernCampaignEditorProps {
  campaignId?: string;
  isNew?: boolean;
}

const ModernCampaignEditor: React.FC<ModernCampaignEditorProps> = ({ 
  campaignId, 
  isNew = false 
}) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('setup');
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    type: 'wheel',
    brandAssets: {
      logo: null,
      primaryColor: '#841b60',
      secondaryColor: '#ffffff',
      fontFamily: 'Inter'
    },
    content: {},
    settings: {}
  });
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { id: 'setup', label: 'Configuration', icon: Settings },
    { id: 'content', label: 'Contenu', icon: Type },
    { id: 'game', label: 'Jeu', icon: Layout },
    { id: 'wording', label: 'Textes', icon: Wand2 },
    { id: 'preview', label: 'Aperçu', icon: Eye },
    { id: 'publish', label: 'Publication', icon: Sparkles }
  ];

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
  };

  const handleAIGenerate = async (prompt: string) => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#ebf4f7] to-[#f1f5f9]">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/gamification')}
                className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isNew ? 'Nouvelle Campagne' : campaign.name || 'Campagne'}
                </h1>
                <p className="text-sm text-gray-500">Créez une expérience unique pour vos utilisateurs</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Assistant IA</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
                <Eye className="w-4 h-4" />
                <span>Aperçu</span>
              </button>
              
              <button className="flex items-center space-x-2 px-6 py-2 bg-[#841b60] hover:bg-[#6d164f] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center space-x-2 mt-6 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = steps.findIndex(s => s.id === activeStep) > index;
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepChange(step.id)}
                  className={`relative flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white shadow-lg' 
                      : isCompleted
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{step.label}</span>
                  
                  {isCompleted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#841b60] to-[#6d164f] rounded-full"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Editor Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep === 'setup' && (
                  <SetupStep campaign={campaign} setCampaign={setCampaign} />
                )}
                {activeStep === 'content' && (
                  <ContentStep campaign={campaign} setCampaign={setCampaign} />
                )}
                {activeStep === 'game' && (
                  <GameStep campaign={campaign} setCampaign={setCampaign} />
                )}
                {activeStep === 'wording' && (
                  <WordingStep campaign={campaign} setCampaign={setCampaign} />
                )}
                {activeStep === 'preview' && (
                  <PreviewStep campaign={campaign} />
                )}
                {activeStep === 'publish' && (
                  <PublishStep campaign={campaign} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI Assistant Sidebar */}
          <AnimatePresence>
            {showAIAssistant && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className="w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 h-fit sticky top-24"
              >
                <AIAssistant 
                  campaign={campaign}
                  setCampaign={setCampaign}
                  isGenerating={isGenerating}
                  onGenerate={handleAIGenerate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Step Components
const SetupStep: React.FC<any> = ({ campaign, setCampaign }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
          Configuration de base
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la campagne
              </label>
              <input
                type="text"
                value={campaign.name}
                onChange={(e) => setCampaign(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all"
                placeholder="Ma super campagne..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={campaign.description}
                onChange={(e) => setCampaign(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all resize-none"
                placeholder="Décrivez l'objectif de votre campagne..."
              />
            </div>
          </div>
          
          <BrandAssetsCard campaign={campaign} setCampaign={setCampaign} />
        </div>
      </div>
    </div>
  );
};

const ContentStep: React.FC<any> = ({ campaign, setCampaign }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Contenu de la campagne
      </h2>
      <p className="text-gray-600">Configuration du contenu en cours de développement...</p>
    </div>
  );
};

const GameStep: React.FC<any> = ({ campaign, setCampaign }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Configuration du jeu
      </h2>
      <p className="text-gray-600">Configuration du jeu en cours de développement...</p>
    </div>
  );
};

const WordingStep: React.FC<any> = ({ campaign, setCampaign }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Textes et messages
      </h2>
      <p className="text-gray-600">Configuration des textes en cours de développement...</p>
    </div>
  );
};

const PreviewStep: React.FC<any> = ({ campaign }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Aperçu de la campagne
      </h2>
      <p className="text-gray-600">Aperçu en cours de développement...</p>
    </div>
  );
};

const PublishStep: React.FC<any> = ({ campaign }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
        Publication
      </h2>
      <p className="text-gray-600">Options de publication en cours de développement...</p>
    </div>
  );
};

const BrandAssetsCard: React.FC<any> = ({ campaign, setCampaign }) => {
  return (
    <div className="bg-gradient-to-br from-[#841b60]/5 to-[#6d164f]/5 rounded-xl p-6 border border-[#841b60]/10">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-[#841b60]" />
        Identité de marque
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#841b60] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Glissez votre logo ici</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.brandAssets.primaryColor}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, primaryColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={campaign.brandAssets.primaryColor}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, primaryColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 bg-white/50 border-0 rounded-lg focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.brandAssets.secondaryColor}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, secondaryColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={campaign.brandAssets.secondaryColor}
                onChange={(e) => setCampaign(prev => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, secondaryColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 bg-white/50 border-0 rounded-lg focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAssistant: React.FC<any> = ({ campaign, setCampaign, isGenerating, onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-6 h-6 text-[#841b60]" />
        <h3 className="text-lg font-semibold text-gray-900">Assistant IA</h3>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Décrivez votre campagne idéale..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] resize-none"
        />
        
        <button
          onClick={() => onGenerate(prompt)}
          disabled={!prompt.trim() || isGenerating}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Génération...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Générer avec l'IA</span>
            </>
          )}
        </button>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Suggestions rapides</h4>
        <div className="space-y-2">
          {[
            "Roue de la fortune pour nouveaux clients",
            "Quiz interactif sur les produits",
            "Jeu de grattage avec récompenses"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setPrompt(suggestion)}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-[#841b60]/5 rounded-lg text-sm text-gray-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernCampaignEditor;
