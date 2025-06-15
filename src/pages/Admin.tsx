
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Eye, Copy, Archive, Trash2, ChevronDown, BarChart2, ExternalLink, MoreVertical, Users, Target, Calendar, Activity } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';
import { getCampaignTypeIcon, CampaignType } from '../utils/campaignTypes';

interface AdminCampaign {
  id: string;
  name: string;
  description: string;
  clientName: string;
  clientId: string;
  status: 'draft' | 'active' | 'archived';
  type: CampaignType;
  participants: number;
  views: number;
  conversionRate: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

interface AdminStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalClients: number;
  totalViews: number;
  avgConversionRate: number;
}

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClient, setFilterClient] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  // Mock data - remplacera par des vraies données Supabase
  const mockStats: AdminStats = {
    totalCampaigns: 247,
    activeCampaigns: 43,
    totalClients: 28,
    totalViews: 125430,
    avgConversionRate: 4.2
  };

  const mockCampaigns: AdminCampaign[] = [
    {
      id: '1',
      name: 'Quiz Marketing Digital',
      description: 'Quiz pour évaluer les connaissances en marketing digital',
      clientName: 'TechCorp Solutions',
      clientId: 'client1',
      status: 'active',
      type: 'quiz',
      participants: 342,
      views: 1250,
      conversionRate: 27.4,
      startDate: '2025-03-15',
      endDate: '2025-04-15',
      createdAt: '2025-03-10'
    },
    {
      id: '2',
      name: 'Concours Photo Été',
      description: 'Concours de photos estivales avec nos produits',
      clientName: 'Fashion Brand',
      clientId: 'client2',
      status: 'draft',
      type: 'contest',
      participants: 0,
      views: 0,
      conversionRate: 0,
      startDate: '2025-06-01',
      endDate: '2025-07-15',
      createdAt: '2025-05-20'
    },
    {
      id: '3',
      name: 'Roue de la Fortune Soldes',
      description: 'Roue de la fortune pour gagner des réductions',
      clientName: 'E-commerce Plus',
      clientId: 'client3',
      status: 'archived',
      type: 'wheel',
      participants: 1256,
      views: 5430,
      conversionRate: 23.1,
      startDate: '2025-02-01',
      endDate: '2025-03-01',
      createdAt: '2025-01-15'
    }
  ];

  const uniqueClients = [...new Set(mockCampaigns.map(c => c.clientName))];

  const filteredCampaigns = mockCampaigns
    .filter((campaign) => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
      const matchesClient = filterClient === 'all' || campaign.clientName === filterClient;
      const matchesType = filterType === 'all' || campaign.type === filterType;
      return matchesSearch && matchesStatus && matchesClient && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'desc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'clientName') {
        return sortOrder === 'desc'
          ? b.clientName.localeCompare(a.clientName)
          : a.clientName.localeCompare(b.clientName);
      }
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(filteredCampaigns.map(c => c.id));
    }
  };

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title="Administration"
        size="sm"
        actions={
          <div className="flex gap-x-4">
            <Link
              to="/admin/clients"
              className="inline-flex items-center px-6 py-2.5 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <Users className="w-5 h-5 mr-2" />
              Gestion Clients
            </Link>
            <Link
              to="/admin/analytics"
              className="inline-flex items-center px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Analytiques
            </Link>
          </div>
        }
      />

      <div className="px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Campagnes</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-[#841b60]/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Campagnes Actives</p>
                <p className="text-2xl font-bold text-green-600">{mockStats.activeCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-2xl font-bold text-blue-600">{mockStats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Vues</p>
                <p className="text-2xl font-bold text-purple-600">{mockStats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Taux Conversion Moyen</p>
                <p className="text-2xl font-bold text-orange-600">{mockStats.avgConversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par nom, client ou description..."
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
                  <option value="archived">Archivé</option>
                </select>

                <select
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                >
                  <option value="all">Tous les clients</option>
                  {uniqueClients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>

                <select
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tous les types</option>
                  <option value="quiz">Quiz</option>
                  <option value="wheel">Roue</option>
                  <option value="contest">Concours</option>
                  <option value="survey">Sondage</option>
                </select>
              </div>
            </div>

            {selectedCampaigns.length > 0 && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">
                  {selectedCampaigns.length} campagne(s) sélectionnée(s)
                </span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Supprimer
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Archiver
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        setSortBy('clientName');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                    >
                      <span>Client & Campagne</span>
                      <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => {
                  const CampaignIcon = getCampaignTypeIcon(campaign.type);
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCampaigns.includes(campaign.id)}
                          onChange={() => handleSelectCampaign(campaign.id)}
                          className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <CampaignIcon />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {campaign.clientName}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusText(campaign.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div>{campaign.views.toLocaleString()} vues</div>
                          <div>{campaign.participants} participants</div>
                          <div className="text-green-600 font-medium">{campaign.conversionRate}% conversion</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div>Créé: {new Date(campaign.createdAt).toLocaleDateString('fr-FR')}</div>
                          <div>Début: {new Date(campaign.startDate).toLocaleDateString('fr-FR')}</div>
                          <div>Fin: {new Date(campaign.endDate).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <Archive className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-[#841b60] rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucune campagne ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
