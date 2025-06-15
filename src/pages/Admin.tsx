
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Copy, Archive, ChevronDown, BarChart2, MoreVertical, Users, Target, Activity, TrendingUp, Calendar, AlertCircle, Plus } from 'lucide-react';
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
  totalParticipations: number;
  avgConversionRate: number;
  topGameType: string;
  topClient: string;
}

interface RecentActivity {
  id: string;
  type: 'campaign_created' | 'campaign_published' | 'status_change' | 'participation_spike';
  message: string;
  time: string;
  campaignName?: string;
  clientName?: string;
}

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClient, setFilterClient] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  // Mock data - à remplacer par des vraies données Supabase
  const mockStats: AdminStats = {
    totalCampaigns: 247,
    activeCampaigns: 43,
    totalClients: 28,
    totalParticipations: 125430,
    avgConversionRate: 4.2,
    topGameType: 'Roue de la Fortune',
    topClient: 'TechCorp Solutions'
  };

  const mockRecentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'campaign_created',
      message: 'Nouvelle campagne "Quiz Marketing" créée',
      time: 'Il y a 2 minutes',
      campaignName: 'Quiz Marketing',
      clientName: 'TechCorp Solutions'
    },
    {
      id: '2',
      type: 'participation_spike',
      message: 'Pic de participation (+150%) sur "Roue Summer"',
      time: 'Il y a 15 minutes',
      campaignName: 'Roue Summer',
      clientName: 'Fashion Brand'
    },
    {
      id: '3',
      type: 'campaign_published',
      message: 'Campagne "Concours Photo" publiée',
      time: 'Il y a 1 heure',
      campaignName: 'Concours Photo',
      clientName: 'E-commerce Plus'
    },
    {
      id: '4',
      type: 'status_change',
      message: 'Campagne "Quiz Produit" archivée',
      time: 'Il y a 3 heures',
      campaignName: 'Quiz Produit',
      clientName: 'TechCorp Solutions'
    }
  ];

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
      type: 'quiz',
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'campaign_created':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'campaign_published':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'status_change':
        return <Archive className="w-4 h-4 text-orange-600" />;
      case 'participation_spike':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
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
        title="Dashboard Administrateur"
        size="sm"
        actions={
          <div className="flex gap-x-4">
            <Link
              to="/admin/templates"
              className="inline-flex items-center px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <Target className="w-5 h-5 mr-2" />
              Modèles
            </Link>
            <Link
              to="/admin/clients"
              className="inline-flex items-center px-6 py-2.5 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <Users className="w-5 h-5 mr-2" />
              Gestion Clients
            </Link>
          </div>
        }
      />

      <div className="px-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
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
                <p className="text-gray-600 text-sm font-medium">Total Participations</p>
                <p className="text-2xl font-bold text-purple-600">{mockStats.totalParticipations.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
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

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Jeu le Plus Populaire</p>
                <p className="text-lg font-bold text-blue-600">{mockStats.topGameType}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Client Top Perf.</p>
                <p className="text-lg font-bold text-indigo-600">{mockStats.topClient}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-2xl font-bold text-[#841b60]">{mockStats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-[#841b60]/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    {activity.clientName && (
                      <p className="text-sm text-gray-500">Client: {activity.clientName}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Accès Rapide</h3>
            <div className="space-y-3">
              <Link
                to="/admin/campaigns/new"
                className="flex items-center p-3 rounded-lg bg-[#841b60] text-white hover:bg-[#6d164f] transition-colors"
              >
                <Plus className="w-5 h-5 mr-3" />
                <span className="font-medium">Nouvelle Campagne</span>
              </Link>
              <Link
                to="/admin/analytics"
                className="flex items-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                <span className="font-medium">Voir Statistiques</span>
              </Link>
              <Link
                to="/admin/clients"
                className="flex items-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Users className="w-5 h-5 mr-3" />
                <span className="font-medium">Gérer Clients</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Alertes Système</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-orange-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>3 campagnes inactives depuis 30j</span>
                </div>
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>1 client inactif</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Toutes les Campagnes</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#841b60] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Target className="w-4 h-4" />
                </button>
              </div>
            </div>

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
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Exporter
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
                    Client & Campagne
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
                          <Link 
                            to={`/admin/clients/${campaign.clientId}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            {campaign.clientName}
                          </Link>
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
