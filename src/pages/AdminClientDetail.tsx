
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Copy, Archive, Trash2, Edit, Plus, Target, Calendar, BarChart2, Users } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';
import { getCampaignTypeIcon, CampaignType } from '../utils/campaignTypes';

interface ClientCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  type: CampaignType;
  participants: number;
  views: number;
  conversionRate: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const AdminClientDetail: React.FC = () => {
  const { clientId } = useParams();
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock client data
  const clientData = {
    id: 'client1',
    name: 'Jean Dupont',
    email: 'jean.dupont@techcorp.com',
    company: 'TechCorp Solutions',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Tech, 75001 Paris',
    website: 'https://techcorp-solutions.com',
    createdAt: '2024-01-15',
    lastActivity: '2025-01-10',
    status: 'active',
    notes: 'Client premium avec besoins spécifiques en gamification.'
  };

  // Mock campaigns data
  const campaigns: ClientCampaign[] = [
    {
      id: '1',
      name: 'Quiz Marketing Digital',
      description: 'Quiz pour évaluer les connaissances en marketing digital',
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
      name: 'Roue de la Fortune',
      description: 'Jeu de roue pour les soldes d\'été',
      status: 'archived',
      type: 'wheel',
      participants: 856,
      views: 3200,
      conversionRate: 26.8,
      startDate: '2024-07-01',
      endDate: '2024-08-15',
      createdAt: '2024-06-20'
    },
    {
      id: '3',
      name: 'Concours Photo',
      description: 'Concours de photos de produits',
      status: 'draft',
      type: 'contest',
      participants: 0,
      views: 0,
      conversionRate: 0,
      startDate: '2025-05-01',
      endDate: '2025-06-01',
      createdAt: '2025-04-15'
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    filterStatus === 'all' || campaign.status === filterStatus
  );

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

  const totalViews = campaigns.reduce((sum, c) => sum + c.views, 0);
  const totalParticipants = campaigns.reduce((sum, c) => sum + c.participants, 0);
  const avgConversion = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length 
    : 0;

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title={`Client: ${clientData.company}`}
        size="sm"
        actions={
          <div className="flex gap-x-4">
            <Link
              to="/admin/clients"
              className="inline-flex items-center px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour Clients
            </Link>
            <button className="inline-flex items-center px-6 py-2.5 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle Campagne
            </button>
          </div>
        }
      />

      <div className="px-6">
        {/* Client Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Client</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Principal</label>
                  <p className="text-gray-900">{clientData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{clientData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Téléphone</label>
                  <p className="text-gray-900">{clientData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Site Web</label>
                  <a href={clientData.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800">
                    {clientData.website}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques Globales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Vues</p>
                      <p className="text-xl font-bold text-blue-900">{totalViews.toLocaleString()}</p>
                    </div>
                    <BarChart2 className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Participants</p>
                      <p className="text-xl font-bold text-green-900">{totalParticipants.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Campagnes</p>
                      <p className="text-xl font-bold text-purple-900">{campaigns.length}</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Conversion Moy.</p>
                      <p className="text-xl font-bold text-orange-900">{avgConversion.toFixed(1)}%</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {clientData.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
              <p className="text-gray-900">{clientData.notes}</p>
            </div>
          )}
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Campagnes du Client</h3>
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campagne
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
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
                        <div className="flex items-center justify-center">
                          <CampaignIcon />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
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
                          <button className="p-2 text-gray-500 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <Archive className="w-4 h-4" />
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
                <p className="text-gray-500">Aucune campagne ne correspond au filtre sélectionné.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientDetail;
