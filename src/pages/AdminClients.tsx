
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Edit, ArrowLeft, Users, Target } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  totalCampaigns: number;
  activeCampaigns: number;
  totalViews: number;
  avgConversionRate: number;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'inactive';
}

const AdminClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const mockClients: Client[] = [
    {
      id: 'client1',
      name: 'Jean Dupont',
      email: 'jean.dupont@techcorp.com',
      company: 'TechCorp Solutions',
      phone: '+33 1 23 45 67 89',
      totalCampaigns: 12,
      activeCampaigns: 3,
      totalViews: 15420,
      avgConversionRate: 24.5,
      createdAt: '2024-01-15',
      lastActivity: '2025-01-10',
      status: 'active'
    },
    {
      id: 'client2',
      name: 'Marie Martin',
      email: 'marie@fashionbrand.fr',
      company: 'Fashion Brand',
      phone: '+33 1 98 76 54 32',
      totalCampaigns: 8,
      activeCampaigns: 2,
      totalViews: 9850,
      avgConversionRate: 31.2,
      createdAt: '2024-03-22',
      lastActivity: '2025-01-08',
      status: 'active'
    },
    {
      id: 'client3',
      name: 'Pierre Legrand',
      email: 'pierre@ecommerce-plus.com',
      company: 'E-commerce Plus',
      totalCampaigns: 15,
      activeCampaigns: 0,
      totalViews: 22100,
      avgConversionRate: 18.7,
      createdAt: '2023-11-10',
      lastActivity: '2024-12-15',
      status: 'inactive'
    }
  ];

  const filteredClients = mockClients
    .filter((client) => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Actif' : 'Inactif';
  };

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title="Gestion des Clients"
        size="sm"
        actions={
          <div className="flex gap-x-4">
            <Link
              to="/admin"
              className="inline-flex items-center px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour Admin
            </Link>
          </div>
        }
      />

      <div className="px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Clients Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockClients.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Campagnes</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockClients.reduce((sum, c) => sum + c.totalCampaigns, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Taux Conversion Moyen</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(mockClients.reduce((sum, c) => sum + c.avgConversionRate, 0) / mockClients.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par nom, entreprise ou email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <select
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campagnes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière Activité
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{client.email}</div>
                        {client.phone && (
                          <div className="text-sm text-gray-500">{client.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {getStatusText(client.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>Total: {client.totalCampaigns}</div>
                        <div className="text-green-600">Actives: {client.activeCampaigns}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{client.totalViews.toLocaleString()} vues</div>
                        <div className="text-green-600 font-medium">{client.avgConversionRate}% conversion</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(client.lastActivity).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/clients/${client.id}`}
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredClients.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucun client ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClients;
