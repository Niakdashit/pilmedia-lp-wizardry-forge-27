import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft, Calendar, Target, FileText, Image } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
const marketingGoals = [{
  id: 'acquisition',
  label: 'Acquisition de prospects',
  description: 'Générer des leads qualifiés',
  icon: '🎯',
  gradient: 'from-blue-500 to-cyan-500'
}, {
  id: 'notoriete',
  label: 'Notoriété de marque',
  description: 'Faire connaître votre marque',
  icon: '📢',
  gradient: 'from-purple-500 to-pink-500'
}, {
  id: 'engagement',
  label: 'Engagement communauté',
  description: 'Fidéliser votre audience',
  icon: '❤️',
  gradient: 'from-red-500 to-orange-500'
}, {
  id: 'autre',
  label: 'Autre objectif',
  description: 'Objectif personnalisé',
  icon: '⚡',
  gradient: 'from-green-500 to-teal-500'
}];
const Step2BasicSettings: React.FC = () => {
  const {
    campaignName,
    launchDate,
    marketingGoal,
    logoFile,
    setCampaignName,
    setLaunchDate,
    setMarketingGoal,
    setLogoFile,
    setCurrentStep
  } = useQuickCampaignStore();
  const [dragActive, setDragActive] = useState(false);
  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      setLogoFile(files[0]);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };
  const canProceed = campaignName.trim() && launchDate && marketingGoal;
  return <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h1 className="font-bold mb-6 text-white text-2xl">
            Paramétrez votre campagne en quelques secondes
          </h1>
          <p className="text-white font-normal text-xl">
            Vos réglages sont personnalisables à tout moment.
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
      }} className="bg-white/80 backdrop-blur-lg rounded-[32px] shadow-2xl p-10 space-y-10 border border-white/20">
          {/* Nom de la campagne */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Nom de votre campagne *
              </label>
            </div>
            <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="Ex: Jeu de Noël 2024" className="w-full px-8 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:border-[#841b60] focus:outline-none transition-all bg-white/80 backdrop-blur-sm" />
          </div>

          {/* Date de lancement */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Date de lancement *
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="date" value={launchDate} onChange={e => setLaunchDate(e.target.value)} className="px-8 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:border-[#841b60] focus:outline-none transition-all bg-white/80 backdrop-blur-sm" />
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setLaunchDate(new Date().toISOString().split('T')[0])} className="px-8 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all">
                Commencer maintenant
              </motion.button>
            </div>
          </div>

          {/* Objectif marketing */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Objectif marketing *
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketingGoals.map(goal => <motion.button key={goal.id} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setMarketingGoal(goal.id)} className={`
                    p-6 text-left rounded-2xl border-2 transition-all
                    bg-white/60 backdrop-blur-sm shadow-lg
                    ${marketingGoal === goal.id ? 'border-[#841b60] bg-[#841b60]/10 shadow-xl' : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'}
                  `}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${goal.gradient} text-white text-2xl`}>
                      {goal.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-2">{goal.label}</div>
                      <div className="text-gray-600">{goal.description}</div>
                    </div>
                  </div>
                </motion.button>)}
            </div>
          </div>

          {/* Upload logo */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Image className="w-8 h-8 text-[#841b60]" />
              <label className="block text-2xl font-bold text-gray-900">
                Logo (optionnel)
              </label>
            </div>
            <div onDrop={handleDrop} onDragOver={e => {
            e.preventDefault();
            setDragActive(true);
          }} onDragLeave={() => setDragActive(false)} className={`
                border-2 border-dashed rounded-3xl p-10 text-center transition-all
                bg-white/40 backdrop-blur-sm
                ${dragActive ? 'border-[#841b60] bg-[#841b60]/10' : 'border-gray-300'}
              `}>
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              {logoFile ? <div>
                  <p className="text-green-600 font-bold text-lg">{logoFile.name}</p>
                  <motion.button whileHover={{
                scale: 1.05
              }} onClick={() => setLogoFile(null)} className="text-gray-500 hover:text-red-500 mt-3 font-medium">
                    Supprimer
                  </motion.button>
                </div> : <>
                  <p className="text-gray-600 mb-3 text-lg">
                    Glissez votre logo ici ou{' '}
                    <label className="text-[#841b60] cursor-pointer hover:underline font-medium">
                      parcourez
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files)} className="hidden" />
                    </label>
                  </p>
                  <p className="text-gray-400">PNG, JPG jusqu'à 5MB</p>
                </>}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setCurrentStep(1)} className="flex items-center space-x-3 px-8 py-4 text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-2xl hover:bg-gray-100">
              <ArrowLeft className="w-6 h-6" />
              <span>Retour</span>
            </motion.button>

            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setCurrentStep(3)} disabled={!canProceed} className={`
                px-12 py-4 rounded-2xl font-bold text-lg transition-all
                ${canProceed ? 'bg-gradient-to-r from-[#841b60] to-pink-500 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}>
              Continuer
            </motion.button>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="text-center mt-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-2 bg-gradient-to-r from-[#841b60] to-pink-500 rounded-full"></div>
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-500 font-medium">Étape 2 sur 3</p>
        </motion.div>
      </div>
    </div>;
};
export default Step2BasicSettings;