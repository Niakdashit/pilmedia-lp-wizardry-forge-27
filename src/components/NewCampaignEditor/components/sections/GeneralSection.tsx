
import React from 'react';
import { Calendar, Link as LinkIcon, Clock, Tag } from 'lucide-react';
import { campaignTypes } from '../../../../utils/campaignTypes';

interface GeneralSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaign((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    
    setCampaign((prev: any) => ({ ...prev, url: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Informations générales</h2>
            <p className="text-gray-600">Configurez les paramètres de base de votre campagne</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nom de la campagne */}
          <div className="lg:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la campagne
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={campaign.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Ex: Quiz Marketing Digital"
            />
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={campaign.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Décrivez brièvement votre campagne"
            />
          </div>

          {/* URL */}
          <div className="lg:col-span-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL de la campagne
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <LinkIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-12 pointer-events-none text-gray-500">
                leadya.com/c/
              </div>
              <input
                type="text"
                id="url"
                name="url"
                value={campaign.url}
                onChange={handleUrlChange}
                className="w-full pl-[8.5rem] pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="votre-campagne"
              />
            </div>
          </div>

          {/* Type de campagne */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type de jeu
            </label>
            <select
              id="type"
              name="type"
              value={campaign.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {campaignTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Statut */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              id="status"
              name="status"
              value={campaign.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="draft">Brouillon</option>
              <option value="scheduled">Programmé</option>
              <option value="active">Actif</option>
              <option value="ended">Terminé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dates et horaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Planification</h3>
            <p className="text-gray-600">Définissez la période d'activité de votre campagne</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date de début */}
          <div className="space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date de début
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={campaign.startDate}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                Heure de début
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={campaign.startTime}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Date de fin */}
          <div className="space-y-4">
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={campaign.endDate}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                Heure de fin
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={campaign.endTime}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
