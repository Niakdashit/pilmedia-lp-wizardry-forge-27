
import React, { useState } from 'react';
import { Rocket, Globe, Share, Download, Copy, Check } from 'lucide-react';

interface PublishStepProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  onPrev?: () => void;
  onPublish?: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({
  campaign,
  setCampaign,
  onPrev,
  onPublish
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const campaignUrl = `https://leadya.app/campaign/${campaign.id || 'preview'}`;
  const embedCode = `<iframe src="${campaignUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (onPublish) {
        await onPublish();
      }
      setIsPublished(true);
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'url' | 'embed') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Rocket className="w-6 h-6 mr-2 text-[#841b60]" />
            Publication
          </h2>
          <p className="text-gray-600">Publiez votre campagne et partagez-la avec votre audience</p>
        </div>

        {!isPublished ? (
          <>
            {/* Pre-publish checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vérifications avant publication</h3>
              <div className="space-y-3">
                {[
                  { label: 'Configuration générale complétée', checked: campaign.name && campaign.description },
                  { label: 'Design personnalisé', checked: campaign.design },
                  { label: 'Jeu configuré', checked: campaign.gameConfig },
                  { label: 'Textes définis', checked: campaign.screens }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.checked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {item.checked && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publish options */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Options de publication</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Publication publique</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Votre campagne sera accessible via un lien public
                  </p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="publishType"
                      defaultChecked
                      className="text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span className="text-sm">Recommandé</span>
                  </label>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Share className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Intégration</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Intégrez la campagne dans votre site web
                  </p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="publishType"
                      className="text-[#841b60] focus:ring-[#841b60]"
                    />
                    <span className="text-sm">Code d'intégration</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Publish button */}
            <div className="flex justify-center">
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-12 py-4 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-lg disabled:opacity-50"
              >
                {isPublishing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publication en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Publier la campagne</span>
                  </div>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success message */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Campagne publiée avec succès !</h3>
              <p className="text-gray-600">Votre campagne est maintenant en ligne et prête à être partagée.</p>
            </div>

            {/* Sharing options */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Lien de la campagne</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={campaignUrl}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                  <button
                    onClick={() => copyToClipboard(campaignUrl, 'url')}
                    className="px-4 py-3 bg-[#841b60] text-white rounded-xl hover:bg-[#6d164f] transition-colors"
                  >
                    {copiedUrl ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Code d'intégration</label>
                <div className="flex space-x-2">
                  <textarea
                    value={embedCode}
                    readOnly
                    rows={3}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 text-sm resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(embedCode, 'embed')}
                    className="px-4 py-3 bg-[#841b60] text-white rounded-xl hover:bg-[#6d164f] transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-blue-600">Vues</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-green-600">Participations</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0%</div>
                <div className="text-sm text-purple-600">Taux de conversion</div>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Précédent
          </button>
          {isPublished && (
            <button
              onClick={() => window.open(campaignUrl, '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
            >
              Voir la campagne
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
