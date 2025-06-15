
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, Link, Share2, Copy, CheckCircle, Download, BarChart3 } from 'lucide-react';

const PublishStep: React.FC = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [campaignUrl, setCampaignUrl] = useState('');
  const [publishSettings, setPublishSettings] = useState({
    domain: 'lovable',
    customDomain: '',
    analytics: true,
    socialSharing: true,
    seoOptimization: true
  });

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulation du processus de publication
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const url = publishSettings.domain === 'custom' && publishSettings.customDomain
      ? `https://${publishSettings.customDomain}`
      : `https://campaigns.lovable.app/${Date.now()}`;
    
    setCampaignUrl(url);
    setIsPublished(true);
    setIsPublishing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const embedCode = `<iframe src="${campaignUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2 flex items-center">
          <Rocket className="w-6 h-6 mr-2 text-[#841b60]" />
          Publication
        </h2>

        {!isPublished ? (
          <div className="space-y-8">
            {/* Paramètres de publication */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-[#841b60]" />
                Paramètres de publication
              </h3>
              
              <div className="space-y-6">
                {/* Domaine */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Domaine</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="domain"
                        value="lovable"
                        checked={publishSettings.domain === 'lovable'}
                        onChange={(e) => setPublishSettings({...publishSettings, domain: e.target.value})}
                        className="mr-3 text-[#841b60] focus:ring-[#841b60]"
                      />
                      <span>Utiliser un sous-domaine Lovable (campaigns.lovable.app)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="domain"
                        value="custom"
                        checked={publishSettings.domain === 'custom'}
                        onChange={(e) => setPublishSettings({...publishSettings, domain: e.target.value})}
                        className="mr-3 text-[#841b60] focus:ring-[#841b60]"
                      />
                      <span>Domaine personnalisé</span>
                    </label>
                  </div>
                  
                  {publishSettings.domain === 'custom' && (
                    <input
                      type="text"
                      placeholder="mondomaine.com"
                      value={publishSettings.customDomain}
                      onChange={(e) => setPublishSettings({...publishSettings, customDomain: e.target.value})}
                      className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    />
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={publishSettings.analytics}
                      onChange={(e) => setPublishSettings({...publishSettings, analytics: e.target.checked})}
                      className="text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span>Analytics activés</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={publishSettings.socialSharing}
                      onChange={(e) => setPublishSettings({...publishSettings, socialSharing: e.target.checked})}
                      className="text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span>Partage social</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={publishSettings.seoOptimization}
                      onChange={(e) => setPublishSettings({...publishSettings, seoOptimization: e.target.checked})}
                      className="text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span>Optimisation SEO</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bouton de publication */}
            <div className="text-center">
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all flex items-center space-x-3 mx-auto ${
                  isPublishing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:scale-105 text-white'
                }`}
              >
                {isPublishing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Rocket className="w-6 h-6" />
                    </motion.div>
                    <span>Publication en cours...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    <span>🚀 Publier la campagne</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* État publié */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Campagne publiée avec succès ! 🎉</h3>
              <p className="text-emerald-100">Votre campagne interactive est maintenant en ligne et prête à engager votre audience.</p>
            </div>

            {/* URL de la campagne */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Link className="w-5 h-5 mr-2 text-[#841b60]" />
                URL de la campagne
              </h4>
              
              <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border">
                <input
                  type="text"
                  value={campaignUrl}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none"
                />
                <button
                  onClick={() => copyToClipboard(campaignUrl)}
                  className="p-2 text-[#841b60] hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copier l'URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => copyToClipboard(campaignUrl)}
                className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all"
              >
                <Share2 className="w-5 h-5 text-[#841b60]" />
                <span>Partager</span>
              </button>
              
              <button
                onClick={() => copyToClipboard(embedCode)}
                className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5 text-[#841b60]" />
                <span>Code d'intégration</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all">
                <BarChart3 className="w-5 h-5 text-[#841b60]" />
                <span>Voir les statistiques</span>
              </button>
            </div>

            {/* Code d'intégration */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Code d'intégration</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Copiez ce code pour intégrer votre campagne sur votre site web.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PublishStep;
