
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, Link, Download, Share2, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';

interface FinalizePublishProps {
  campaignData: CampaignData;
  onBack: () => void;
}

const FinalizePublish: React.FC<FinalizePublishProps> = ({
  campaignData,
  onBack
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [campaignUrl, setCampaignUrl] = useState('');
  const [publishSettings, setPublishSettings] = useState({
    domain: 'custom',
    customDomain: '',
    analytics: true,
    socialSharing: true,
    embedCode: true
  });

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate campaign URL
    const generatedUrl = publishSettings.domain === 'custom' && publishSettings.customDomain
      ? `https://${publishSettings.customDomain}/campaign`
      : `https://campaigns.lovable.app/${Date.now()}`;
    
    setCampaignUrl(generatedUrl);
    setIsPublished(true);
    setIsPublishing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const embedCode = `<iframe src="${campaignUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Finalize & Publish
        </h1>
        <p className="text-lg text-gray-600">
          Your campaign is ready to go live and engage your audience!
        </p>
      </motion.div>

      {!isPublished ? (
        <>
          {/* Campaign Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Campaign Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Game Type:</span>
                  <span className="font-medium capitalize">{campaignData.gameType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Audience:</span>
                  <span className="font-medium">{campaignData.targetAudience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign Goal:</span>
                  <span className="font-medium">{campaignData.campaignGoal}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: campaignData.mainColor }}
                    />
                    <span className="font-medium">{campaignData.mainColor}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Logo:</span>
                  <span className="font-medium">{campaignData.logo ? 'Uploaded' : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Content:</span>
                  <span className="font-medium">{campaignData.generatedContent ? 'Generated' : 'None'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Publishing Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-[#841b60]" />
              Publishing Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Domain</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="domain"
                      value="lovable"
                      checked={publishSettings.domain === 'lovable'}
                      onChange={(e) => setPublishSettings({...publishSettings, domain: e.target.value})}
                      className="mr-3"
                    />
                    <span>Use Lovable subdomain (campaigns.lovable.app)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="domain"
                      value="custom"
                      checked={publishSettings.domain === 'custom'}
                      onChange={(e) => setPublishSettings({...publishSettings, domain: e.target.value})}
                      className="mr-3"
                    />
                    <span>Custom domain</span>
                  </label>
                </div>
                
                {publishSettings.domain === 'custom' && (
                  <input
                    type="text"
                    placeholder="yourdomain.com"
                    value={publishSettings.customDomain}
                    onChange={(e) => setPublishSettings({...publishSettings, customDomain: e.target.value})}
                    className="mt-2 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={publishSettings.analytics}
                    onChange={(e) => setPublishSettings({...publishSettings, analytics: e.target.checked})}
                    className="mr-3"
                  />
                  <span>Enable Analytics</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={publishSettings.socialSharing}
                    onChange={(e) => setPublishSettings({...publishSettings, socialSharing: e.target.checked})}
                    className="mr-3"
                  />
                  <span>Social Sharing</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Publish Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
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
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-6 h-6" />
                  <span>🎉 Publish Campaign</span>
                </>
              )}
            </button>
          </motion.div>
        </>
      ) : (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Campaign Published Successfully! 🎉</h2>
            <p className="text-emerald-100">Your interactive campaign is now live and ready to engage your audience.</p>
          </div>

          {/* Campaign URL */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Link className="w-5 h-5 mr-2 text-[#841b60]" />
              Campaign URL
            </h3>
            
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
              <input
                type="text"
                value={campaignUrl}
                readOnly
                className="flex-1 bg-transparent border-none outline-none"
              />
              <button
                onClick={() => copyToClipboard(campaignUrl)}
                className="p-2 text-[#841b60] hover:bg-gray-200 rounded-lg transition-colors"
                title="Copy URL"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a
                href={campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#841b60] hover:bg-gray-200 rounded-lg transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => copyToClipboard(campaignUrl)}
              className="flex items-center justify-center space-x-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all"
            >
              <Share2 className="w-5 h-5 text-[#841b60]" />
              <span>Share Campaign</span>
            </button>
            
            <button
              onClick={() => copyToClipboard(embedCode)}
              className="flex items-center justify-center space-x-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5 text-[#841b60]" />
              <span>Get Embed Code</span>
            </button>
            
            <a
              href="/campaigns"
              className="flex items-center justify-center space-x-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all"
            >
              <Globe className="w-5 h-5 text-[#841b60]" />
              <span>View Analytics</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      {!isPublished && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalizePublish;
