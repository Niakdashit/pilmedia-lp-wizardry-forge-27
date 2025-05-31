
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target, TrendingUp, Users, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="-mx-6 -mt-6">
      {/* Hero Section */}
      <div className="relative h-[200px] bg-gradient-to-r from-[#841b60] to-[#a855f7] overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Tableau de bord</h1>
            <p className="text-xl text-white/90">Bienvenue sur votre plateforme de gamification</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/quick-campaign" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Création rapide de campagne
            </Link>
            <Link 
              to="/campaigns" 
              className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Voir toutes les campagnes
            </Link>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            viewBox="0 0 1440 116" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full" 
            preserveAspectRatio="none" 
            height="20"
          >
            <path 
              d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" 
              fill="#ebf4f7" 
            />
          </svg>
        </div>
      </div>

      <div className="px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-10 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Campagnes actives</h3>
              <Target className="w-5 h-5 text-[#841b60]" />
            </div>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">5</span>
              <span className="ml-2 text-sm text-green-600">+2 cette semaine</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Participations</h3>
              <Users className="w-5 h-5 text-[#841b60]" />
            </div>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">1254</span>
              <span className="ml-2 text-sm text-green-600">+18% ce mois</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Taux de conversion</h3>
              <TrendingUp className="w-5 h-5 text-[#841b60]" />
            </div>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900">42%</span>
              <span className="ml-2 text-sm text-green-600">+5% ce mois</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Prochaine campagne</h3>
              <Target className="w-5 h-5 text-[#841b60]" />
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">2j</span>
              <span className="ml-2 text-sm text-gray-600">10 avril</span>
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Campagnes récentes</h2>
              <Link 
                to="/campaigns" 
                className="text-[#841b60] hover:text-[#6d1649] font-medium"
              >
                Voir toutes
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Campaign 1 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">🧠 Quiz</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Brouillon</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quiz Marketing Digital</h3>
                <p className="text-sm text-gray-600 mb-3">Créé le 17 mai 2025</p>
                <p className="text-sm text-gray-500">4 participants</p>
              </div>

              {/* Campaign 2 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">🎡 Roue de la Fortune</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actif</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Roue de la fortune Soldes</h3>
                <p className="text-sm text-gray-600 mb-3">Créé le 16 mai 2025</p>
                <p className="text-sm text-gray-500">45 participants</p>
              </div>

              {/* Campaign 3 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">🎲 Dés</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actif</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Campagne Instagram Été</h3>
                <p className="text-sm text-gray-600 mb-3">Créé le 15 mai 2025</p>
                <p className="text-sm text-gray-500">128 participants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
