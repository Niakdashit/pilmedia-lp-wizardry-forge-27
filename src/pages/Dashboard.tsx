import React from 'react';
import { Users, Target, BarChart, Calendar, ChevronRight, MoreVertical, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../utils/campaignTypes';

const Dashboard: React.FC = () => {
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

  // Tous les types de jeux disponibles
  const gameTypes = [
    { type: 'wheel', label: 'Roue de la fortune' },
    { type: 'quiz', label: 'Quiz' },
    { type: 'scratch', label: 'Grattage' },
    { type: 'dice', label: 'Dés' },
    { type: 'jackpot', label: 'Jackpot' },
    { type: 'memory', label: 'Memory' },
    { type: 'puzzle', label: 'Puzzle' },
    { type: 'form', label: 'Formulaire' }
  ];

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
    <div className="-mx-6 -mt-6">
      <div className="relative h-[200px] bg-gradient-to-b from-[#841b60] to-transparent overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-3">Tableau de bord</h1>
          <select className="bg-white/90 backdrop-blur-sm border-0 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 mb-3">
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
            <option>90 derniers jours</option>
            <option>Cette année</option>
          </select>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Section de création rapide avec icônes de jeux */}
        <div className="w-full mt-8">
          {/* Titre centré */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Qu'allez-vous créer aujourd'hui ?</h2>
          </div>

          {/* Ligne d'icônes de jeux centrée */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center space-x-8 max-w-5xl">
              {gameTypes.map((game, index) => {
                const IconComponent = getCampaignTypeIcon(game.type);
                return (
                  <Link
                    key={game.type}
                    to={`/quick-campaign?type=${game.type}`}
                    className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-gray-100">
                      <IconComponent className="w-8 h-8 text-[#841b60] group-hover:text-[#6d164f] transition-colors" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors text-center">
                      {game.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bouton de création rapide centré */}
          <div className="flex justify-center">
            <Link
              to="/quick-campaign"
              className="inline-flex items-center px-8 py-4 bg-[#841b60] text-white font-semibold rounded-2xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Zap className="w-6 h-6 mr-3" />
              Création rapide de campagne
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, statIndex) => <div key={statIndex} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-700 font-semibold">{stat.name}</p>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-green-600 text-sm">{stat.change}</p>
                  </div>
                </div>
                <div className="bg-[#f8e9f0] rounded-full p-3">
                  {stat.icon}
                </div>
              </div>
            </div>)}
        </div>

        <div className="relative">
          <div className="p-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Campagnes récentes</h2>
              <Link to="/campaigns" className="text-[#841b60] hover:text-[#6d164f] font-medium flex items-center transition-colors">
                Voir toutes
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCampaigns.map(campaign => {
              const IconComponent = getCampaignTypeIcon(campaign.type);
              return <div key={campaign.id} className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
                    {campaign.image && <div className="relative h-40 w-full overflow-hidden">
                        <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />

                        <div className="absolute top-3 left-3">
                          <div className="inline-flex items-center rounded-full bg-white text-[#841b60] px-3 py-1 text-xs font-medium">
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

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
