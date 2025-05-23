import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

const Social: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for social campaigns
  const socialCampaigns = [
    {
      id: 1,
      name: 'Campagne Instagram Été',
      platform: 'Instagram',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      budget: 1500,
      engagement: 3240,
      clicks: 1876,
      conversions: 342
    },
    {
      id: 2,
      name: 'Promotion Facebook Rentrée',
      platform: 'Facebook',
      status: 'scheduled',
      startDate: '2023-09-01',
      endDate: '2023-09-30',
      budget: 2000,
      engagement: 0,
      clicks: 0,
      conversions: 0
    },
    {
      id: 3,
      name: 'Campagne LinkedIn B2B',
      platform: 'LinkedIn',
      status: 'ended',
      startDate: '2023-03-15',
      endDate: '2023-05-15',
      budget: 3000,
      engagement: 1560,
      clicks: 876,
      conversions: 124
    },
    {
      id: 4,
      name: 'Campagne Twitter Événement',
      platform: 'Twitter',
      status: 'draft',
      startDate: '',
      endDate: '',
      budget: 1000,
      engagement: 0,
      clicks: 0,
      conversions: 0
    }
  ];

  // Filter campaigns based on search term and status
  const filteredCampaigns = socialCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'fab fa-facebook text-blue-600';
      case 'instagram': return 'fab fa-instagram text-pink-600';
      case 'twitter': return 'fab fa-twitter text-blue-400';
      case 'linkedin': return 'fab fa-linkedin text-blue-800';
      default: return 'fas fa-globe text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Campagnes Social Media</h1>
        <button className="bg-[#841b60] text-white px-4 py-2 rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
          Nouvelle Campagne
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher une campagne..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select 
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="draft">Brouillon</option>
                <option value="scheduled">Programmé</option>
                <option value="ended">Terminé</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 w-5 h-5" />
              <select 
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              >
                <option value="all">Toutes les périodes</option>
                <option value="current">En cours</option>
                <option value="upcoming">À venir</option>
                <option value="past">Passées</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plateforme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campagne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr 
                  key={campaign.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <i className={`${getPlatformIcon(campaign.platform)} text-xl mr-2`}></i>
                      <span>{campaign.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.startDate && campaign.endDate ? 
                      `${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}` : 
                      'Non définie'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.budget.toLocaleString()} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.status === 'active' || campaign.status === 'ended' ? (
                      <div className="flex space-x-4">
                        <div>
                          <div className="text-xs text-gray-500">Engagement</div>
                          <div className="font-medium">{campaign.engagement.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Clics</div>
                          <div className="font-medium">{campaign.clicks.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Conversions</div>
                          <div className="font-medium">{campaign.conversions.toLocaleString()}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Pas de données</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucune campagne ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Engagement Total</h3>
          <p className="text-3xl font-bold text-[#841b60]">4,800</p>
          <p className="text-sm text-gray-500">+12% par rapport au mois dernier</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Clics</h3>
          <p className="text-3xl font-bold text-[#841b60]">2,752</p>
          <p className="text-sm text-gray-500">+8% par rapport au mois dernier</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Conversions</h3>
          <p className="text-3xl font-bold text-[#841b60]">466</p>
          <p className="text-sm text-gray-500">+15% par rapport au mois dernier</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">ROI</h3>
          <p className="text-3xl font-bold text-[#841b60]">324%</p>
          <p className="text-sm text-gray-500">+5% par rapport au mois dernier</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
