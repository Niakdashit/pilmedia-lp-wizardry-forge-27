
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const marketingGoals = [
  { id: 'acquisition', label: 'Acquisition de prospects', description: 'Générer des leads qualifiés' },
  { id: 'notoriete', label: 'Notoriété de marque', description: 'Faire connaître votre marque' },
  { id: 'engagement', label: 'Engagement communauté', description: 'Fidéliser votre audience' },
  { id: 'autre', label: 'Autre objectif', description: 'Objectif personnalisé' }
];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Paramétrez votre campagne en quelques secondes
          </h1>
          <p className="text-xl text-gray-600">
            Vos réglages sont personnalisables à tout moment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-8"
        >
          {/* Nom de la campagne */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Nom de votre campagne *
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ex: Jeu de Noël 2024"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Date de lancement */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Date de lancement *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
                className="px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                onClick={() => setLaunchDate(new Date().toISOString().split('T')[0])}
                className="px-6 py-4 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition-colors"
              >
                Commencer maintenant
              </button>
            </div>
          </div>

          {/* Objectif marketing */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Objectif marketing *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketingGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setMarketingGoal(goal.id)}
                  className={`p-4 text-left rounded-xl border-2 transition-all ${
                    marketingGoal === goal.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{goal.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{goal.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload logo */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Logo (optionnel)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {logoFile ? (
                <div>
                  <p className="text-green-600 font-semibold">{logoFile.name}</p>
                  <button
                    onClick={() => setLogoFile(null)}
                    className="text-sm text-gray-500 hover:text-red-500 mt-2"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">
                    Glissez votre logo ici ou{' '}
                    <label className="text-blue-500 cursor-pointer hover:underline">
                      parcourez
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">PNG, JPG jusqu'à 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              disabled={!canProceed}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                canProceed
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuer
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Étape 2 sur 3</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Step2BasicSettings;
