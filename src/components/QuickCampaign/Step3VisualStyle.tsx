import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Eye, Settings, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { useCampaigns } from '../../hooks/useCampaigns';
const themes = [{
  id: 'festif',
  name: 'Festif',
  description: 'Couleurs vives et atmosphère joyeuse',
  colors: {
    primary: '#ec4899',
    secondary: '#f59e0b',
    background: '#fef3c7'
  },
  preview: 'bg-gradient-to-br from-pink-500 to-yellow-400'
}, {
  id: 'corporate',
  name: 'Corporate',
  description: 'Élégant et professionnel',
  colors: {
    primary: '#1f2937',
    secondary: '#3b82f6',
    background: '#f8fafc'
  },
  preview: 'bg-gradient-to-br from-gray-700 to-blue-600'
}, {
  id: 'creatif',
  name: 'Créatif',
  description: 'Moderne et artistique',
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    background: '#f0f9ff'
  },
  preview: 'bg-gradient-to-br from-purple-500 to-cyan-400'
}];
const Step3VisualStyle: React.FC = () => {
  const navigate = useNavigate();
  const {
    saveCampaign
  } = useCampaigns();
  const {
    selectedGameType,
    campaignName,
    launchDate,
    marketingGoal,
    logoFile,
    selectedTheme,
    backgroundImage,
    setSelectedTheme,
    setBackgroundImage,
    setCurrentStep,
    reset
  } = useQuickCampaignStore();
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setBackgroundImage(files[0]);
    }
  };
  const handleFinish = () => {
    setShowFinalStep(true);
  };
  const handleCreateCampaign = async () => {
    setIsCreating(true);
    try {
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme,
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage
        },
        design: {
          theme: selectedTheme,
          colors: themes.find(t => t.id === selectedTheme)?.colors
        },
        status: 'draft' as const
      };
      const result = await saveCampaign(campaignData);
      if (result) {
        reset();
        navigate('/campaigns');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };
  const handleAdvancedSettings = async () => {
    setIsCreating(true);
    try {
      const campaignData = {
        name: campaignName,
        description: `Campagne ${selectedGameType} - ${marketingGoal}`,
        type: selectedGameType || 'quiz',
        game_config: {
          theme: selectedTheme,
          launchDate,
          marketingGoal,
          hasLogo: !!logoFile,
          hasBackgroundImage: !!backgroundImage
        },
        design: {
          theme: selectedTheme,
          colors: themes.find(t => t.id === selectedTheme)?.colors
        },
        status: 'draft' as const
      };
      const result = await saveCampaign(campaignData);
      if (result) {
        reset();
        navigate(`/campaign/${result.id}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };
  if (showFinalStep) {
    return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#faf6fa] via-[#f6eff7] to-[#841b60]/5 p-6\\n">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.6
      }} className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.2,
            type: "spring"
          }}>
              <Sparkles className="w-16 h-16 text-green-500 mx-auto mb-6" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Votre campagne est prête !
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Vous pouvez maintenant la tester ou la personnaliser davantage.
            </p>

            <div className="space-y-4">
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => navigate('/campaigns')} className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Voir un aperçu</span>
              </motion.button>

              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={handleCreateCampaign} disabled={isCreating} className="w-full py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50">
                {isCreating ? 'Création...' : 'Créer la campagne'}
              </motion.button>

              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={handleAdvancedSettings} disabled={isCreating} className="w-full py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50">
                <Settings className="w-5 h-5" />
                <span>Réglages avancés</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#faf6fa] via-[#f6eff7] to-[#841b60]/5 p-6\n">
      <div className="max-w-5xl w-full">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[#841b60]">
            Choisissez un thème pour votre campagne
          </h1>
          <p className="text-xl text-gray-600">
            Donnez vie à votre expérience avec un style visuel adapté.
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {/* Choix des thèmes */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Thèmes prédéfinis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themes.map(theme => <motion.button key={theme.id} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => setSelectedTheme(theme.id)} className={`p-6 rounded-2xl border-2 transition-all text-left ${selectedTheme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className={`w-full h-24 rounded-xl mb-4 ${theme.preview}`} />
                  <h4 className="font-semibold text-gray-900 mb-2">{theme.name}</h4>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </motion.button>)}
            </div>
          </div>

          {/* Upload d'image de fond */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Image de fond personnalisée (optionnel)
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {backgroundImage ? <div>
                  <p className="text-green-600 font-semibold">{backgroundImage.name}</p>
                  <button onClick={() => setBackgroundImage(null)} className="text-sm text-gray-500 hover:text-red-500 mt-2">
                    Supprimer
                  </button>
                </div> : <>
                  <p className="text-gray-600 mb-2">
                    <label className="text-blue-500 cursor-pointer hover:underline">
                      Téléchargez une image de fond
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files)} className="hidden" />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">PNG, JPG jusqu'à 10MB</p>
                </>}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button onClick={() => setCurrentStep(2)} className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <button onClick={handleFinish} disabled={!selectedTheme} className={`px-8 py-4 rounded-xl font-semibold transition-all ${selectedTheme ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Finaliser
            </button>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Étape 3 sur 3</p>
        </motion.div>
      </div>
    </div>;
};
export default Step3VisualStyle;