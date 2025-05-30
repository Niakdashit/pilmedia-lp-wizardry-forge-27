
import React from 'react';
import { Calendar, Link as LinkIcon, Clock, Info, Globe, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignGeneralProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignGeneral: React.FC<CampaignGeneralProps> = ({
  campaign,
  setCampaign
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaign((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase().replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    setCampaign((prev: any) => ({
      ...prev,
      url: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#841b60] to-[#a855f7] text-white px-6 py-3 rounded-2xl shadow-lg mb-6">
            <Settings className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Configuration Générale</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Configurez les paramètres essentiels de votre campagne marketing
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Information importante</h3>
              <p className="text-blue-700 leading-relaxed">
                Remplissez les informations générales de votre campagne. Le nom et l'URL seront utilisés pour identifier et accéder à votre campagne.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de base */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Informations de base</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Nom de la campagne
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={campaign.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  placeholder="Ex: Quiz Marketing Digital"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={campaign.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200 resize-none"
                  placeholder="Décrivez brièvement votre campagne"
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3">
                  URL de la campagne
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-12 pointer-events-none text-gray-500 font-medium">
                    leadya.com/c/
                  </div>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={campaign.url}
                    onChange={handleUrlChange}
                    className="w-full pl-32 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                    placeholder="votre-campagne"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Cette URL sera utilisée pour accéder à votre campagne.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Configuration</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                    Statut
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={campaign.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="scheduled">Programmé</option>
                    <option value="active">Actif</option>
                    <option value="ended">Terminé</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-3">
                    Type de campagne
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={campaign.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  >
                    <option value="quiz">Quiz</option>
                    <option value="survey">Sondage</option>
                    <option value="contest">Concours</option>
                    <option value="wheel">Roue de la fortune</option>
                    <option value="scratch">Carte à gratter</option>
                    <option value="memory">Jeu de mémoire</option>
                    <option value="form">Formulaire dynamique</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="dice">Dés chanceux</option>
                    <option value="jackpot">Jackpot</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Planning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Planning de diffusion</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-3">
                  Date de début
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={campaign.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700 mb-3">
                  Heure de début
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={campaign.startTime}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-3">
                  Date de fin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={campaign.endDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-semibold text-gray-700 mb-3">
                  Heure de fin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={campaign.endTime}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#841b60]/20 focus:border-[#841b60] transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignGeneral;
