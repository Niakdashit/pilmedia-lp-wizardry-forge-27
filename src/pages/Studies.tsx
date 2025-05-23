import React, { useState } from 'react';
import { Search, Filter, BarChart2, PieChart } from 'lucide-react';
// Remove Bell and Plus if they're not used

const Studies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockStudies = [
    {
      id: '1',
      name: 'Satisfaction Client 2024',
      description: 'Étude de satisfaction client menée en 2024',
      status: 'active',
      participants: 542,
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      type: 'survey'
    },
    {
      id: '2',
      name: 'Tendances du Marché Tech',
      description: 'Analyse des tendances actuelles du marché technologique',
      status: 'draft',
      participants: 0,
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      type: 'market research'
    },
    {
      id: '3',
      name: 'Impact de la Publicité sur les Ventes',
      description: 'Mesure de l\'impact des campagnes publicitaires sur les ventes',
      status: 'scheduled',
      participants: 0,
      startDate: '2024-05-01',
      endDate: '2024-06-30',
      type: 'advertising analysis'
    },
    {
      id: '4',
      name: 'Analyse des Réseaux Sociaux',
      description: 'Étude de l\'engagement et de la portée sur les réseaux sociaux',
      status: 'ended',
      participants: 1256,
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      type: 'social media analysis'
    }
  ];

  const filteredStudies = mockStudies.filter(study => {
    const matchesSearch = study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || study.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'draft': return 'Brouillon';
      case 'scheduled': return 'Programmé';
      case 'ended': return 'Terminé';
      default: return status;
    }
  };

  return (
    <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Études</h1>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm mt-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher une étude..."
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Étude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{study.name}</div>
                          <div className="text-sm text-gray-500">{study.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer mr-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={study.status === 'active'}
                            onChange={() => { }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#841b60]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#841b60]"></div>
                        </label>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(study.status)}`}>
                          {getStatusText(study.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {study.participants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(study.startDate).toLocaleDateString('fr-FR')} - {new Date(study.endDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {study.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center">
                        <BarChart2 className="w-4 h-4 mr-2" />
                        <PieChart className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudies.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucune étude ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studies;
