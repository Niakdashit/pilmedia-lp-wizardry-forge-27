
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Play, Pause, Edit, Trash2, Copy, Eye } from 'lucide-react';
import { campaignTypes, getCampaignTypeIcon } from '../utils/campaignTypes';

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  
  const [campaigns] = useState([
    { id: '1', name: 'Quiz Marketing Digital', type: 'quiz', status: 'active', participants: 1250, conversions: 89, createdAt: '2023-03-15' },
    { id: '2', name: 'Roue de la Fortune Noël', type: 'wheel', status: 'draft', participants: 0, conversions: 0, createdAt: '2023-03-10' },
    { id: '3', name: 'Jeu de Dés Été', type: 'dice', status: 'completed', participants: 890, conversions: 67, createdAt: '2023-02-28' },
    { id: '4', name: 'Quiz Produits Tech', type: 'quiz', status: 'paused', participants: 456, conversions: 23, createdAt: '2023-03-01' }
  ]);

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateCampaign = (type: string) => {
    navigate(`/campaigns/new?type=${type}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Actif' },
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Brouillon' },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En pause' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Terminé' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Campagnes</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </button>
          
          <div className="relative group">
            <button className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Campagne
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-3">
                <p className="text-sm font-medium text-gray-700 mb-3">Choisir un type de jeu :</p>
                <div className="space-y-2">
                  {campaignTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleCreateCampaign(type.id)}
                        className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <IconComponent className="w-5 h-5 text-[#841b60] mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Campagnes Actives</p>
              <p className="text-2xl font-bold text-gray-800">{campaigns.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-[#841b60]" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Participants</p>
              <p className="text-2xl font-bold text-gray-800">{campaigns.reduce((sum, c) => sum + c.participants, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Copy className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Conversions</p>
              <p className="text-2xl font-bold text-gray-800">{campaigns.reduce((sum, c) => sum + c.conversions, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Pause className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Taux Moyen</p>
              <p className="text-2xl font-bold text-gray-800">
                {campaigns.length > 0 
                  ? ((campaigns.reduce((sum, c) => sum + (c.participants > 0 ? (c.conversions / c.participants) * 100 : 0), 0) / campaigns.filter(c => c.participants > 0).length) || 0).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Toutes les Campagnes</h2>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une campagne..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="draft">Brouillon</option>
                <option value="paused">En pause</option>
                <option value="completed">Terminé</option>
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                {campaignTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campagne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => {
                const IconComponent = getCampaignTypeIcon(campaign.type as any);
                const conversionRate = campaign.participants > 0 ? ((campaign.conversions / campaign.participants) * 100).toFixed(1) : '0';
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#841b60] rounded-lg flex items-center justify-center text-white">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IconComponent className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {campaignTypes.find(t => t.id === campaign.type)?.name || campaign.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(campaign.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.participants.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{campaign.conversions}</div>
                      <div className="text-sm text-gray-500">{conversionRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/campaigns/${campaign.id}`)}
                          className="text-[#841b60] hover:text-[#6d164f] transition-colors duration-200"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-500 hover:text-green-700 transition-colors duration-200"
                          title={campaign.status === 'active' ? 'Mettre en pause' : 'Activer'}
                        >
                          {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          title="Dupliquer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          title="Plus d'options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
