import React from 'react';
import {
  Users,
  Target,
  BarChart,
  Calendar,
  ChevronRight,
  MoreVertical,
  Zap,
  Search,
  Plus
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../utils/campaignTypes';

const Dashboard: React.FC = () => {
  const { toggleSidebar } = useAppContext();
  const stats = [{
    name: 'Campagnes actives',
    value: '5',
    change: '+2 cette semaine',
    icon: <Target className="w-6 h-6 text-[#841b60]" />
  }, { 
    name: 'Participations',
    value: '1254',
    change: '+18% ce mois',
    icon: <Users className="w-6 h-6 text-[#841b60]" />
  }, {
    name: 'Taux de conversion',
    value: '42%',
    change: '+5% ce mois',
    icon: <BarChart className="w-6 h-6 text-[#841b60]" />
  }, {
    name: 'Prochaine campagne',
    value: '2j',
    change: '10 avril',
    icon: <Calendar className="w-6 h-6 text-[#841b60]" />
  }];
  const recentCampaigns = [{
    id: '1',
    name: 'Quiz Marketing Digital',
    type: 'quiz' as CampaignType,
    participants: 4,
    status: 'draft',
    createdAt: '17 mai 2025',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
  }, {
    id: '2',
    name: 'Roue de la fortune Soldes',
    type: 'wheel' as CampaignType,
    participants: 45,
    status: 'active',
    createdAt: '16 mai 2025',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
  }, {
    id: '3',
    name: 'Campagne Instagram Été',
    type: 'dice' as CampaignType,
    participants: 128,
    status: 'active',
    createdAt: '15 mai 2025',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'draft':
        return 'text-gray-500';
      case 'ended':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'draft':
        return 'Brouillon';
      case 'ended':
        return 'Terminée';
      default:
        return status;
    }
  };
  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Tableau de bord</h1>
          <div className="flex-1 mx-6 hidden md:block">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une campagne..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/campaigns" className="hidden md:inline-flex btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer une campagne
            </Link>
            <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </header>

      <div className="pt-20 px-6 space-y-6">
        {/* Quick Action Section */}
        <div className="flex justify-center mt-6">
          <Link
            to="/quick-campaign"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#841b60] to-[#a855f7] text-white font-semibold rounded-2xl hover:from-[#6d164f] hover:to-[#9333ea] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Zap className="w-6 h-6 mr-3" />
            Création rapide de campagne
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-start">
              <div>
                <p className="text-gray-700 font-semibold">{stat.name}</p>
                <div className="mt-2 flex items-baseline space-x-2">
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-green-600 text-sm">{stat.change}</p>
                </div>
              </div>
              <div className="bg-[#f8e9f0] rounded-full p-3 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>)}
        </div>

        <div className="relative">
          <div className="p-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Campagnes récentes</h2>
              <Link to="/campaigns" className="text-[#841b60] hover:text-[#6d164f] font-medium flex items-center">
                Voir toutes
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCampaigns.map(campaign => {
              const IconComponent = getCampaignTypeIcon(campaign.type);
              return <div key={campaign.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-[1.02]">
                    {campaign.image && <div className="relative h-40 w-full overflow-hidden">
                        <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />

                        <div className="absolute top-3 left-3">
                          <div className="inline-flex items-center rounded-full bg-[#ffffff] text-[#841b60] px-3 py-1 text-xs font-medium">
                            <IconComponent className="w-4 h-4" />
                            <span className="ml-2">{getCampaignTypeText(campaign.type)}</span>
                          </div>
                        </div>

                        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition" aria-label="Options">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>}
                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-semibold text-gray-800 truncate">{campaign.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Créé le {campaign.createdAt}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-gray-800 font-medium">{campaign.participants} participants</span>
                        <span className={`flex items-center text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />
                          {getStatusText(campaign.status)}
                        </span>
                      </div>
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
