
import React from 'react';
import { Calendar, Clock, Link, Type, Activity } from 'lucide-react';

interface ModernGeneralTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernGeneralTab: React.FC<ModernGeneralTabProps> = ({
  campaign,
  setCampaign
}) => {
  const handleInputChange = (field: string, value: any) => {
    setCampaign((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const statusOptions = [
    { value: 'draft', label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
    { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800' },
    { value: 'paused', label: 'En pause', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Terminé', color: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration générale</h2>
        <p className="text-sm text-gray-600">Définissez les paramètres de base de votre campagne</p>
      </div>

      {/* Nom de la campagne */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-4 h-4 mr-2" />
          Nom de la campagne
        </label>
        <input
          type="text"
          value={campaign.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ma super campagne"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={campaign.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Décrivez votre campagne..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* URL de campagne */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Link className="w-4 h-4 mr-2" />
          URL de campagne
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            campagne.com/
          </span>
          <input
            type="text"
            value={campaign.url || ''}
            onChange={(e) => handleInputChange('url', e.target.value)}
            placeholder="mon-jeu"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Dates et heures */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date de début
          </label>
          <input
            type="date"
            value={campaign.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 mr-2" />
            Heure
          </label>
          <input
            type="time"
            value={campaign.startTime || '09:00'}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date de fin
          </label>
          <input
            type="date"
            value={campaign.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 mr-2" />
            Heure
          </label>
          <input
            type="time"
            value={campaign.endTime || '18:00'}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Statut */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Activity className="w-4 h-4 mr-2" />
          Statut de la campagne
        </label>
        <div className="grid grid-cols-2 gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => handleInputChange('status', status.value)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                campaign.status === status.value
                  ? 'border-[#841b60] bg-[#841b60] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernGeneralTab;
