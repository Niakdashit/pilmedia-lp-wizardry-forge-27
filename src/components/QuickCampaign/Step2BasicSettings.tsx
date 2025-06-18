
import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import LogoUploader from '../LogoUploader';

const Step2BasicSettings: React.FC = () => {
  const {
    campaignName,
    setCampaignName,
    launchDate,
    setLaunchDate,
    marketingGoal,
    setMarketingGoal,
    logoFile,
    setLogoFile,
    brandSiteUrl,
    setBrandSiteUrl,
    setCurrentStep,
    backgroundImageUrl,
    setBackgroundImage,
    setBackgroundImageUrl
  } = useQuickCampaignStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
      
      const url = URL.createObjectURL(file);
      setBackgroundImage(file);
      setBackgroundImageUrl(url);
    }
  };

  const removeBackgroundImage = () => {
    if (backgroundImageUrl) {
      URL.revokeObjectURL(backgroundImageUrl);
    }
    setBackgroundImage(null);
    setBackgroundImageUrl(null);
  };

  useEffect(() => {
    return () => {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
    };
  }, [backgroundImageUrl]);

  const canProceed = campaignName.trim() !== '';

  return (
    <div className="min-h-screen bg-[#ebf4f7] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Paramètres de base
          </h1>
          <p className="text-gray-600">
            Configurez les informations essentielles de votre campagne
          </p>
        </div>

        <div className="space-y-6">
          {/* Nom de la campagne */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la campagne *
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ma super campagne quiz"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date de lancement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de lancement
            </label>
            <input
              type="date"
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Objectif marketing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objectif marketing
            </label>
            <select
              value={marketingGoal}
              onChange={(e) => setMarketingGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un objectif</option>
              <option value="awareness">Notoriété de marque</option>
              <option value="leads">Génération de leads</option>
              <option value="engagement">Engagement client</option>
              <option value="sales">Conversion/Ventes</option>
              <option value="retention">Fidélisation</option>
            </select>
          </div>

          {/* Logo de la marque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo de la marque
            </label>
            <LogoUploader
              onLogoUpload={setLogoFile}
              currentLogo={logoFile}
            />
          </div>

          {/* URL du site de la marque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL du site web de la marque
            </label>
            <input
              type="url"
              value={brandSiteUrl}
              onChange={(e) => setBrandSiteUrl(e.target.value)}
              placeholder="https://monsite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Image de fond */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image de fond (optionnel)
            </label>
            {!backgroundImageUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="background-upload"
                />
                <label htmlFor="background-upload" className="cursor-pointer">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">
                    Cliquez pour ajouter une image de fond
                  </span>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={backgroundImageUrl}
                  alt="Aperçu de l'image de fond"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={removeBackgroundImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            disabled={!canProceed}
            className={`flex items-center px-6 py-3 rounded-xl transition-colors ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuer
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2BasicSettings;
