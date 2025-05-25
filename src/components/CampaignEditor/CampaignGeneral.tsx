
import React from 'react';

interface CampaignGeneralProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const CampaignGeneral: React.FC<CampaignGeneralProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (field: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom de la campagne
        </label>
        <input
          type="text"
          value={campaign.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="Nom de votre campagne"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={campaign.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="Description de votre campagne"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL de la campagne
        </label>
        <input
          type="text"
          value={campaign.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="url-de-votre-campagne"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de début
          </label>
          <input
            type="date"
            value={campaign.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure de début
          </label>
          <input
            type="time"
            value={campaign.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin
          </label>
          <input
            type="date"
            value={campaign.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure de fin
          </label>
          <input
            type="time"
            value={campaign.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Statut
        </label>
        <select
          value={campaign.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="draft">Brouillon</option>
          <option value="active">Actif</option>
          <option value="paused">En pause</option>
          <option value="completed">Terminé</option>
        </select>
      </div>
    </div>
  );
};

export default CampaignGeneral;
