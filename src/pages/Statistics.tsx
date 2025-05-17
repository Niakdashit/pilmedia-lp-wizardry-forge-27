import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, Calendar, ChevronDown, Download } from 'lucide-react';

const Statistics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [campaignFilter, setCampaignFilter] = useState('all');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
          <p className="text-gray-600 mt-1">Analysez les performances de vos campagnes</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">Cette année</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          >
            <option value="all">Toutes les campagnes</option>
            <option value="quiz">Quiz</option>
            <option value="survey">Sondages</option>
            <option value="contest">Concours</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[#841b60]" />
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">Participants totaux</h3>
          <p className="text-2xl font-bold">24,521</p>
          <p className="text-sm text-gray-500 mt-2">+2,145 cette semaine</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-[#841b60]" />
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">Taux de conversion</h3>
          <p className="text-2xl font-bold">42.8%</p>
          <p className="text-sm text-gray-500 mt-2">+5.2% vs mois dernier</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#841b60]" />
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+15.3%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">Campagnes actives</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-gray-500 mt-2">+3 ce mois-ci</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#841b60]" />
            </div>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+18.7%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">Taux d'engagement</h3>
          <p className="text-2xl font-bold">67.2%</p>
          <p className="text-sm text-gray-500 mt-2">+12.3% vs mois dernier</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Participation par type de campagne</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between px-2">
            <div className="w-1/4 flex flex-col items-center">
              <div className="w-full bg-[#841b60] rounded-t-lg" style={{ height: '65%' }}></div>
              <p className="text-sm text-gray-600 mt-2">Quiz</p>
              <p className="text-xs text-gray-500">65%</p>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <div className="w-full bg-[#841b60] bg-opacity-75 rounded-t-lg" style={{ height: '40%' }}></div>
              <p className="text-sm text-gray-600 mt-2">Sondages</p>
              <p className="text-xs text-gray-500">40%</p>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <div className="w-full bg-[#841b60] bg-opacity-50 rounded-t-lg" style={{ height: '25%' }}></div>
              <p className="text-sm text-gray-600 mt-2">Concours</p>
              <p className="text-xs text-gray-500">25%</p>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <div className="w-full bg-[#841b60] bg-opacity-25 rounded-t-lg" style={{ height: '15%' }}></div>
              <p className="text-sm text-gray-600 mt-2">Autres</p>
              <p className="text-xs text-gray-500">15%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Meilleures campagnes</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700">Voir tout</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Quiz Été 2023', type: 'Quiz', participants: 2451, conversion: 68 },
              { name: 'Satisfaction Client', type: 'Sondage', participants: 1842, conversion: 45 },
              { name: 'Concours Photo', type: 'Concours', participants: 1654, conversion: 52 },
              { name: 'Quiz Produits', type: 'Quiz', participants: 1245, conversion: 63 },
            ].map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-gray-500">{campaign.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{campaign.participants.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{campaign.conversion}% conv.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;