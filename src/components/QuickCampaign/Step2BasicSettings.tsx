
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Target, FileText, Image } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';

const marketingGoals = [
  {
    id: 'acquisition',
    label: 'Acquisition de prospects',
    description: 'Générer des leads qualifiés',
    icon: '🎯'
  },
  {
    id: 'notoriete',
    label: 'Notoriété de marque',
    description: 'Faire connaître votre marque',
    icon: '📢'
  },
  {
    id: 'engagement',
    label: 'Engagement communauté',
    description: 'Fidéliser votre audience',
    icon: '❤️'
  },
  {
    id: 'autre',
    label: 'Autre objectif',
    description: 'Objectif personnalisé',
    icon: '⚡'
  }
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
    <div className="min-h-screen w-full flex items-center justify-center px-8 py-16">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
            Paramétrez votre campagne
          </h1>
          <p className="text-xl text-white/80 font-light">
            Vos réglages sont personnalisables à tout moment.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 space-y-12">
          {/* Campaign Name */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-white/70" />
              <label className="text-lg font-medium text-white">
                Nom de votre campagne
              </label>
            </div>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ex: Jeu de Noël 2024"
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl 
                       text-white placeholder-white/50 focus:outline-none focus:border-white/40
                       transition-colors font-light text-lg backdrop-blur-sm"
            />
          </div>

          {/* Launch Date */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-white/70" />
              <label className="text-lg font-medium text-white">
                Date de lancement
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
                className="px-6 py-4 bg-white/10 border border-white/20 rounded-2xl 
                         text-white focus:outline-none focus:border-white/40
                         transition-colors font-light backdrop-blur-sm"
              />
              <button
                onClick={() => setLaunchDate(new Date().toISOString().split('T')[0])}
                className="px-6 py-4 bg-blue-500 text-white font-medium rounded-2xl 
                         hover:bg-blue-600 transition-colors"
              >
                Commencer maintenant
              </button>
            </div>
          </div>

          {/* Marketing Goal */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-white/70" />
              <label className="text-lg font-medium text-white">
                Objectif marketing
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketingGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setMarketingGoal(goal.id)}
                  className={`
                    p-6 text-left rounded-2xl border transition-all
                    ${marketingGoal === goal.id 
                      ? 'bg-white/20 border-white/40' 
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                    }
                  `}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                      {goal.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">
                        {goal.label}
                      </div>
                      <div className="text-white/70 text-sm">
                        {goal.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image className="w-6 h-6 text-white/70" />
              <label className="text-lg font-medium text-white">
                Logo <span className="text-white/50 font-light">(optionnel)</span>
              </label>
            </div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              className={`
                border-2 border-dashed rounded-2xl p-8 text-center transition-all
                ${dragActive ? 'border-white/40 bg-white/10' : 'border-white/20 bg-white/5'}
              `}
            >
              {logoFile ? (
                <div>
                  <p className="text-white font-medium mb-2">
                    {logoFile.name}
                  </p>
                  <button
                    onClick={() => setLogoFile(null)}
                    className="text-white/60 hover:text-red-400 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Image className="w-6 h-6 text-white/60" />
                  </div>
                  <p className="text-white/70 mb-2">
                    Glissez votre logo ici ou{' '}
                    <label className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
                      parcourez
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-white/50 text-sm">PNG, JPG jusqu'à 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center space-x-2 px-6 py-3 text-white/70 hover:text-white 
                     transition-colors font-light"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            disabled={!canProceed}
            className={`
              px-8 py-4 rounded-2xl font-medium transition-all
              ${canProceed 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            Continuer
          </button>
        </div>

        {/* Progress */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          </div>
          <p className="text-white/60 font-light">Étape 2 sur 3</p>
        </div>
      </div>
    </div>
  );
};

export default Step2BasicSettings;
