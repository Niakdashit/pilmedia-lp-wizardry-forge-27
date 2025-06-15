
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MoreVertical, Play, Edit3, BarChart3 } from 'lucide-react';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../../utils/campaignTypes';
import { RecentCampaign } from './types';

const RecentCampaigns: React.FC = () => {
  const recentCampaigns: RecentCampaign[] = [
    {
      id: '1',
      name: 'Quiz Marketing Digital',
      type: 'quiz' as CampaignType,
      participants: 342,
      status: 'active',
      createdAt: '17 mai 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: '2',
      name: 'Roue de la fortune Soldes',
      type: 'wheel' as CampaignType,
      participants: 1205,
      status: 'active',
      createdAt: '16 mai 2025',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      id: '3',
      name: 'Jeu concours Été',
      type: 'scratch' as CampaignType,
      participants: 856,
      status: 'draft',
      createdAt: '15 mai 2025',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500 text-white';
      case 'draft':
        return 'bg-amber-500 text-white';
      case 'ended':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
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
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vos dernières créations
          </h2>
          <p className="text-gray-600">
            Gérez et optimisez vos campagnes en cours
          </p>
        </div>
        <Link 
          to="/campaigns" 
          className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span>Voir toutes</span>
          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Campaigns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentCampaigns.map((campaign, index) => {
          const IconComponent = getCampaignTypeIcon(campaign.type);
          return (
            <div 
              key={campaign.id} 
              className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/20 hover:bg-white/80 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Campaign image background */}
              <div className="relative h-48 overflow-hidden">
                {campaign.image && (
                  <>
                    <img 
                      src={campaign.image} 
                      alt={campaign.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* Glass morphism overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </>
                )}

                {/* Campaign type badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-purple-600 font-semibold text-sm shadow-lg">
                    <IconComponent className="w-4 h-4" />
                    <span>{getCampaignTypeText(campaign.type)}</span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getStatusColor(campaign.status)}`}>
                    {getStatusText(campaign.status)}
                  </div>
                </div>

                {/* Action buttons - revealed on hover */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Campaign info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-200">
                  {campaign.name}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Créé le {campaign.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {campaign.participants}
                      </div>
                      <div className="text-xs text-gray-500">
                        Participants
                      </div>
                    </div>
                  </div>

                  <button className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-all duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCampaigns;
