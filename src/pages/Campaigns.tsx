import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import { getCampaignTypeIcon, CampaignType } from '../utils/campaignTypes';
import { useNavigate } from 'react-router-dom';

const Campaigns: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const campaigns = [
    {
      id: 1,
      name: 'Quiz Marketing Digital',
      type: 'quiz' as CampaignType,
      status: 'active',
      startDate: '2025-03-15',
      endDate: '2025-04-15',
      participants: 1250,
      conversionRate: 12.5,
      url: 'quiz-marketing-digital'
    },
    {
      id: 2,
      name: 'Roue de la Fortune Promo',
      type: 'wheel' as CampaignType,
      status: 'draft',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      participants: 0,
      conversionRate: 0,
      url: 'roue-promo-avril'
    },
    {
      id: 3,
      name: 'Jeu de Dés Lucky',
      type: 'dice' as CampaignType,
      status: 'active',
      startDate: '2025-02-20',
      endDate: '2025-03-20',
      participants: 850,
      conversionRate: 8.2,
      url: 'des-lucky-mars'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Brouillon';
      case 'paused': return 'En pause';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteCampaign = (campaign: any) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting campaign:', campaignToDelete);
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  const handleCreateCampaign = (type: CampaignType) => {
    navigate(`/campaigns/new?type=${type}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campagnes</h1>
          <p className="text-gray-500">Gérez vos campagnes de gamification</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
          
          <div className="relative group">
            <button className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Campagne
            </button>
            
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                <button
                  onClick={() => handleCreateCampaign('quiz')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">❓</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Quiz</div>
                    <div className="text-xs text-gray-500">Créez un quiz interactif</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleCreateCampaign('wheel')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">🎯</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Roue de la Fortune</div>
                    <div className="text-xs text-gray-500">Roue de la fortune personnalisable</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleCreateCampaign('dice')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-lg">🎲</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Dés</div>
                    <div className="text-xs text-gray-500">Jeu de dés amusant</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom de la campagne..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="draft">Brouillon</option>
                <option value="paused">En pause</option>
                <option value="completed">Terminée</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="quiz">Quiz</option>
                <option value="wheel">Roue de la Fortune</option>
                <option value="dice">Dés</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campagne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => {
                const IconComponent = getCampaignTypeIcon(campaign.type);
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#841b60] bg-opacity-10 rounded-lg flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-[#841b60]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">leadya.com/c/{campaign.url}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{campaign.startDate}</div>
                      <div className="text-gray-500">{campaign.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{campaign.participants} participants</div>
                      <div className="text-gray-500">{campaign.conversionRate}% conversion</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/campaigns/${campaign.id}`)}
                          className="p-2 text-gray-400 hover:text-[#841b60] transition-colors duration-200"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          title="Copier l'URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                          title="Voir en ligne"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(campaign)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Supprimer la campagne</h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la campagne "{campaignToDelete?.name}" ? 
              Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
