
import React from 'react';
import {
  Users,
  Target,
  Calendar,
  ChevronRight,
  MoreVertical,
  Search,
  Plus,
  Cookie,
  Brain,
  HelpCircle,
  Puzzle,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../utils/campaignTypes';

const Dashboard: React.FC = () => {
  const stats = [{
    name: 'Campagnes actives',
    value: '5',
    change: '+2 cette semaine',
    icon: <Target className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#841b60]'
  }, { 
    name: 'Participations',
    value: '1254',
    change: '+18% ce mois',
    icon: <Users className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#841b60]'
  }, {
    name: 'Taux de conversion',
    value: '42%',
    change: '+5% ce mois',
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#841b60]'
  }, {
    name: 'Prochaine campagne',
    value: '2j',
    change: '10 avril',
    icon: <Calendar className="w-5 h-5 text-white" />,
    bgColor: 'bg-[#841b60]'
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

  const quickGames = [
    { id: 'wheel', label: 'Roue', icon: Target, color: 'bg-[#841b60]' },
    { id: 'scratch', label: 'Grattage', icon: Cookie, color: 'bg-[#841b60]' },
    { id: 'memory', label: 'Memory', icon: Brain, color: 'bg-[#841b60]' },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'bg-[#841b60]' },
    { id: 'puzzle', label: 'Puzzle', icon: Puzzle, color: 'bg-[#841b60]' },
    { id: 'jackpot', label: 'Jackpot', icon: DollarSign, color: 'bg-[#841b60]' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'draft':
        return 'text-gray-600 bg-gray-50';
      case 'ended':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
    <div className="min-h-screen bg-white">
      {/* Header épuré */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-3xl font-light text-gray-900">
              Tableau de bord
            </h1>
          </div>
          
          <div className="flex-1 mx-12 hidden lg:block">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une campagne..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/campaigns" 
              className="inline-flex items-center px-6 py-3 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d1550] transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer une campagne
            </Link>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-8 h-8 rounded-md" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Section d'accueil épurée */}
        <div className="text-center py-12">
          <h2 className="text-5xl font-light text-gray-900 mb-6">
            Créez votre campagne
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Choisissez un type de jeu pour commencer ou consultez vos campagnes existantes
          </p>
        </div>

        {/* Jeux en grille épurée */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {quickGames.map(game => {
            const Icon = game.icon;
            return (
              <Link
                key={game.id}
                to={`/quick-campaign?type=${game.id}`}
                className="group"
              >
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 ${game.color} rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg mx-auto`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#841b60] transition-colors duration-200">
                    {game.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Statistiques épurées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
              <p className="text-sm text-green-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Section campagnes récentes épurée */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-light text-gray-900">Campagnes récentes</h2>
            <Link 
              to="/campaigns" 
              className="inline-flex items-center text-[#841b60] hover:text-[#6d1550] font-medium transition-colors duration-200"
            >
              Voir toutes
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentCampaigns.map(campaign => {
              const IconComponent = getCampaignTypeIcon(campaign.type);
              return (
                <div key={campaign.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                    {campaign.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={campaign.image} 
                          alt={campaign.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        
                        <div className="absolute top-4 left-4">
                          <div className="inline-flex items-center rounded-lg bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-2 text-xs font-medium">
                            <IconComponent className="w-4 h-4 mr-2" />
                            {getCampaignTypeText(campaign.type)}
                          </div>
                        </div>

                        <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-colors duration-200">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    )}
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#841b60] transition-colors duration-200">
                        {campaign.name}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Créé le {campaign.createdAt}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {campaign.participants} participants
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                          {getStatusText(campaign.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
