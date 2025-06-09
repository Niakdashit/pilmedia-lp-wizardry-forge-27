import React from 'react';
import { Users, Target, Calendar, ChevronRight, MoreVertical, Search, Plus, Cookie, Brain, HelpCircle, Puzzle, DollarSign, Sparkles, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../utils/campaignTypes';
const Dashboard: React.FC = () => {
  const stats = [{
    name: 'Campagnes actives',
    value: '5',
    change: '+2 cette semaine',
    icon: <Target className="w-6 h-6 text-white" />,
    gradient: 'from-[#841b60] to-[#a855f7]'
  }, {
    name: 'Participations',
    value: '1254',
    change: '+18% ce mois',
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: 'from-[#841b60] to-[#c084fc]'
  }, {
    name: 'Taux de conversion',
    value: '42%',
    change: '+5% ce mois',
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    gradient: 'from-[#9333ea] to-[#841b60]'
  }, {
    name: 'Prochaine campagne',
    value: '2j',
    change: '10 avril',
    icon: <Calendar className="w-6 h-6 text-white" />,
    gradient: 'from-[#a855f7] to-[#841b60]'
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
  const quickGames = [{
    id: 'wheel',
    label: 'Roue',
    icon: Target,
    color: 'bg-gradient-to-br from-[#841b60] to-[#a855f7]'
  }, {
    id: 'scratch',
    label: 'Grattage',
    icon: Cookie,
    color: 'bg-gradient-to-br from-[#9333ea] to-[#841b60]'
  }, {
    id: 'memory',
    label: 'Memory',
    icon: Brain,
    color: 'bg-gradient-to-br from-[#a855f7] to-[#c084fc]'
  }, {
    id: 'quiz',
    label: 'Quiz',
    icon: HelpCircle,
    color: 'bg-gradient-to-br from-[#841b60] to-[#9333ea]'
  }, {
    id: 'puzzle',
    label: 'Puzzle',
    icon: Puzzle,
    color: 'bg-gradient-to-br from-[#c084fc] to-[#841b60]'
  }, {
    id: 'jackpot',
    label: 'Jackpot',
    icon: DollarSign,
    color: 'bg-gradient-to-br from-[#a855f7] to-[#9333ea]'
  }];
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header moderne */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <div className="hidden md:flex items-center px-3 py-1 bg-[#f5eaf2] text-[#841b60] rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-1" />
              Pro
            </div>
          </div>
          
          <div className="flex-1 mx-8 hidden lg:block">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Rechercher une campagne..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all duration-200" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/campaigns" className="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#841b60] to-[#a855f7] text-white font-semibold rounded-xl hover:from-[#6d1550] hover:to-[#9333ea] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Créer une campagne
            </Link>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#841b60] to-[#a855f7] flex items-center justify-center">
              <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-8 h-8 rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Section d'accueil avec message */}
        

        {/* Bulles de jeux modernes */}
        <div className="flex flex-wrap justify-center gap-6 py-8">
          {quickGames.map(game => {
          const Icon = game.icon;
          return <Link key={game.id} to={`/quick-campaign?type=${game.id}`} className="group relative">
                <div className={`w-24 h-24 ${game.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-2`}>
                  <Icon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-semibold">{game.label}</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#841b60] to-[#a855f7] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </Link>;
        })}
        </div>

        {/* Statistiques modernes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => <div key={index} className="relative group">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Section campagnes récentes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Campagnes récentes</h2>
            <Link to="/campaigns" className="inline-flex items-center text-[#841b60] hover:text-[#6d1550] font-semibold transition-colors duration-200">
              Voir toutes
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCampaigns.map(campaign => {
            const IconComponent = getCampaignTypeIcon(campaign.type);
            return <div key={campaign.id} className="group relative">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:scale-[1.02]">
                    {campaign.image && <div className="relative h-48 overflow-hidden">
                        <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                          <div className="inline-flex items-center rounded-xl bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 text-xs font-semibold shadow-sm">
                            <IconComponent className="w-4 h-4 mr-1.5" />
                            {getCampaignTypeText(campaign.type)}
                          </div>
                        </div>

                        <button className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>}
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#841b60] transition-colors duration-200">
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
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                          {getStatusText(campaign.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;