
import React from 'react';
import { Calendar, Globe, Tag, ToggleLeft, ToggleRight } from 'lucide-react';

interface GeneralTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const generateUrl = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    handleInputChange('name', name);
    if (!campaign.url || campaign.url === generateUrl(campaign.name)) {
      handleInputChange('url', generateUrl(name));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations générales</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Titre de la campagne */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Titre de la campagne
            </label>
            <input
              type="text"
              value={campaign.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Ex: Jeu concours été 2024"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={campaign.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Décrivez votre campagne..."
            />
          </div>

          {/* URL de la campagne */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              URL de la campagne
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                votre-domaine.com/
              </span>
              <input
                type="text"
                value={campaign.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="url-de-la-campagne"
              />
            </div>
          </div>

          {/* Dates et horaires */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date de début
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={campaign.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <input
                  type="time"
                  value={campaign.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={campaign.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <input
                  type="time"
                  value={campaign.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Statut de la campagne
            </label>
            <button
              onClick={() => handleInputChange('status', campaign.status === 'active' ? 'draft' : 'active')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
                campaign.status === 'active'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-gray-50 text-gray-700'
              }`}
            >
              {campaign.status === 'active' ? (
                <ToggleRight className="w-6 h-6 text-green-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              )}
              <div className="text-left">
                <div className="font-medium">
                  {campaign.status === 'active' ? 'Campagne active' : 'Brouillon'}
                </div>
                <div className="text-sm opacity-75">
                  {campaign.status === 'active'
                    ? 'Visible par les utilisateurs'
                    : 'Visible uniquement par vous'
                  }
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
