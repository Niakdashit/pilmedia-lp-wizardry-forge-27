import React, { useState } from 'react';
import { Download, Filter, RefreshCw } from 'lucide-react';
const Data: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  return <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-3">Données</h1>
          <select value={selectedCampaign} onChange={e => setSelectedCampaign(e.target.value)} className="w-64 bg-white/90 backdrop-blur-sm border-0 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 mb-3">
            <option value="">Sélectionner une campagne</option>
            <option value="1">Quiz Marketing Digital</option>
            <option value="2">Roue de la fortune Soldes</option>
            <option value="3">Carte à gratter</option>
          </select>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Tirage au sort</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pool de participants
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]">
                  <option>Tous les participants</option>
                  <option>Participants du jour</option>
                  <option>Participants de la semaine</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
                  Lancer le tirage
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Exports</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <span>Exporter les participations</span>
                <Download className="w-5 h-5" />
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <span>Exporter les opt-ins</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Tableau de bord interactif</h2>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-[#841b60] rounded-lg hover:bg-gray-100">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-[#841b60] rounded-lg hover:bg-gray-100">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Top 10 réponses</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                  <span className="text-gray-400">Graphique</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Répartition H/F</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                  <span className="text-gray-400">Graphique</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Âges</h3>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                  <span className="text-gray-400">Graphique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Data;