import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Eye, Copy, Archive, Trash2, ChevronDown, BarChart2, ExternalLink, MoreVertical } from 'lucide-react';
import { getCampaignTypeIcon, CampaignType } from '../utils/campaignTypes';
interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
  position: {
    x: number;
    y: number;
  };
}
const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  campaign,
  position
}) => {
  if (!isOpen) return null;
  const actions = [{
    icon: <Eye className="w-5 h-5" />,
    label: 'Voir',
    href: `/campaign/${campaign.id}`,
    color: 'text-gray-700'
  }, {
    icon: <BarChart2 className="w-5 h-5" />,
    label: 'Statistiques',
    color: 'text-gray-700'
  }, {
    icon: <ExternalLink className="w-5 h-5" />,
    label: 'Voir en ligne',
    color: 'text-gray-700'
  }, {
    icon: <Copy className="w-5 h-5" />,
    label: 'Dupliquer',
    color: 'text-gray-700'
  }, {
    icon: <Archive className="w-5 h-5" />,
    label: 'Archiver',
    color: 'text-gray-700'
  }, {
    icon: <Trash2 className="w-5 h-5" />,
    label: 'Supprimer',
    color: 'text-red-600'
  }];
  return <>
      <div className="fixed inset-0" onClick={onClose} />
      <div className="absolute z-50 bg-white rounded-lg shadow-lg py-1 min-w-[200px]" style={{
      top: position.y,
      left: position.x,
      transform: 'translateX(-90%)'
    }}>
        {actions.map((action, index) => action.href ? <Link key={index} to={action.href} className={`${action.color} hover:bg-gray-100 px-4 py-2 flex items-center space-x-3 text-sm`}>
              {action.icon}
              <span>{action.label}</span>
            </Link> : <button key={index} onClick={onClose} className={`${action.color} hover:bg-gray-100 px-4 py-2 flex items-center space-x-3 text-sm w-full text-left`}>
              {action.icon}
              <span>{action.label}</span>
            </button>)}
      </div>
    </>;
};
const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0
  });

  // Mock data for campaigns - AJOUT D'UN "JACKPOT"
  const mockCampaigns = [{
    id: '1',
    name: 'Quiz Marketing Digital',
    description: 'Quiz pour évaluer les connaissances en marketing digital',
    status: 'active',
    participants: 342,
    startDate: '2025-03-15',
    endDate: '2025-04-15',
    type: 'quiz'
  }, {
    id: '2',
    name: 'Concours Photo Été',
    description: 'Concours de photos estivales avec nos produits',
    status: 'draft',
    participants: 0,
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    type: 'contest'
  }, {
    id: '3',
    name: 'Sondage Satisfaction Client',
    description: 'Évaluation de la satisfaction client après achat',
    status: 'scheduled',
    participants: 0,
    startDate: '2025-04-10',
    endDate: '2025-05-10',
    type: 'survey'
  }, {
    id: '4',
    name: 'Roue de la Fortune Soldes',
    description: 'Roue de la fortune pour gagner des réductions',
    status: 'ended',
    participants: 1256,
    startDate: '2025-02-01',
    endDate: '2025-03-01',
    type: 'wheel'
  },
  // --- AJOUT CAMPAGNE JACKPOT ---
  {
    id: '5',
    name: 'Jackpot Anniversaire',
    description: 'Tentez de gagner le jackpot pour notre anniversaire',
    status: 'active',
    participants: 458,
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    type: 'jackpot'
  }];
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? new Date(b.startDate).getTime() - new Date(a.startDate).getTime() : new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
    return 0;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
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
      case 'scheduled':
        return 'Programmé';
      case 'ended':
        return 'Terminé';
      default:
        return status;
    }
  };
  const handleActionClick = (e: React.MouseEvent, campaign: any) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left,
      y: rect.bottom + window.scrollY + 5
    });
    setSelectedCampaign(campaign);
  };
  return <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Campagnes</h1>
          </div>
          <Link to="/campaign/new" className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Campagne
          </Link>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm mt-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input type="text" placeholder="Rechercher une campagne..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1" onClick={() => {
                    setSortBy('date');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}>
                      <span>Campagne</span>
                      <ChevronDown className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    </button>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map(campaign => {
                const CampaignIcon = getCampaignTypeIcon(campaign.type as CampaignType);
                return <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <CampaignIcon />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer mr-3">
                            <input type="checkbox" className="sr-only peer" checked={campaign.status === 'active'} onChange={() => {}} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#841b60]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#841b60]"></div>
                          </label>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {getStatusText(campaign.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.participants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(campaign.startDate).toLocaleDateString('fr-FR')} - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={e => handleActionClick(e, campaign)} className="p-2 text-gray-500 hover:text-[#841b60] rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
            
            {filteredCampaigns.length === 0 && <div className="text-center py-10">
                <p className="text-gray-500">Aucune campagne ne correspond à votre recherche.</p>
              </div>}
          </div>
        </div>
      </div>

      <ActionModal isOpen={selectedCampaign !== null} onClose={() => setSelectedCampaign(null)} campaign={selectedCampaign} position={modalPosition} />
    </div>;
};
export default Campaigns;