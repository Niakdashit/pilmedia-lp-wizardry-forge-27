
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MoreVertical } from 'lucide-react';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../../utils/campaignTypes';
import { RecentCampaign } from './types';
import Button from '../common/Button';
import Card from '../common/Card';

const RecentCampaigns: React.FC = () => {
  const recentCampaigns: RecentCampaign[] = [
    {
      id: '1',
      name: 'Quiz Marketing Digital',
      type: 'quiz' as CampaignType,
      participants: 4,
      status: 'draft',
      createdAt: '17 mai 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: '2',
      name: 'Roue de la fortune Soldes',
      type: 'wheel' as CampaignType,
      participants: 45,
      status: 'active',
      createdAt: '16 mai 2025',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      id: '3',
      name: 'Campagne Instagram Été',
      type: 'dice' as CampaignType,
      participants: 128,
      status: 'active',
      createdAt: '15 mai 2025',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500 text-white';
      case 'draft':
        return 'bg-slate-500 text-white';
      case 'ended':
        return 'bg-rose-500 text-white';
      default:
        return 'bg-slate-500 text-white';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Galerie des créations</h2>
          <p className="text-gray-600">Vos dernières campagnes avec style</p>
        </div>
        <Button variant="primary" icon={ChevronRight} onClick={() => window.location.href = '/campaigns'}>
          Voir toutes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentCampaigns.map((campaign, index) => {
          const IconComponent = getCampaignTypeIcon(campaign.type);
          return (
            <Card 
              key={campaign.id} 
              hover
              padding="sm"
              className="group relative overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Campaign Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                {campaign.image && (
                  <>
                    <img 
                      src={campaign.image} 
                      alt={campaign.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </>
                )}

                {/* Campaign Type Badge */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm text-[#841b60] px-3 py-1.5 text-sm font-semibold rounded-full border border-white/50">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{getCampaignTypeText(campaign.type)}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    <span className="flex items-center">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {getStatusText(campaign.status)}
                    </span>
                  </div>
                </div>

                {/* Actions Button */}
                <button 
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Options"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Campaign Info */}
              <div className="space-y-3">
                {/* Campaign Title - Properly truncated */}
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#841b60] transition-colors duration-300 line-clamp-2">
                  {campaign.name}
                </h3>
                
                {/* Campaign Meta Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Créé le {campaign.createdAt}</span>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-xs whitespace-nowrap ml-2">
                    {campaign.participants} participants
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentCampaigns;
