
import React from 'react';
import { Calendar, Clock, Globe, Type } from 'lucide-react';

interface SetupStepProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  onNext?: () => void;
}

const SetupStep: React.FC<SetupStepProps> = ({
  campaign,
  setCampaign,
  onNext
}) => {
  const updateCampaign = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Type className="w-6 h-6 mr-2 text-[#841b60]" />
            Configuration générale
          </h2>
          <p className="text-gray-600">Définissez les informations de base de votre campagne</p>
        </div>

        {/* Informations générales */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nom de la campagne</label>
              <input
                type="text"
                value={campaign.name || ''}
                onChange={(e) => updateCampaign('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="Ma nouvelle campagne"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">URL de la campagne</label>
              <input
                type="text"
                value={campaign.url || ''}
                onChange={(e) => updateCampaign('url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="https://mon-site.com/campagne"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={campaign.description || ''}
              onChange={(e) => updateCampaign('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent resize-none"
              placeholder="Décrivez votre campagne..."
            />
          </div>
        </div>

        {/* Planification */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#841b60]" />
            Planification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Début de la campagne</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Date</label>
                  <input
                    type="date"
                    value={campaign.startDate || ''}
                    onChange={(e) => updateCampaign('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Heure</label>
                  <input
                    type="time"
                    value={campaign.startTime || '09:00'}
                    onChange={(e) => updateCampaign('startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Fin de la campagne</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Date</label>
                  <input
                    type="date"
                    value={campaign.endDate || ''}
                    onChange={(e) => updateCampaign('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Heure</label>
                  <input
                    type="time"
                    value={campaign.endTime || '18:00'}
                    onChange={(e) => updateCampaign('endTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
