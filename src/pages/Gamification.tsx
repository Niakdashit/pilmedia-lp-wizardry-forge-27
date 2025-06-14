
import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/Layout/PageHeader';
import { CampaignType } from '../utils/campaignTypes';

// Custom vector icons for each game type
const CustomGameIcons = {
  wheel: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 2 L18.5 8 L16 9 L13.5 8 Z" fill="currentColor"/>
      <path d="M30 16 L24 18.5 L23 16 L24 13.5 Z" fill="currentColor"/>
      <path d="M16 30 L13.5 24 L16 23 L18.5 24 Z" fill="currentColor"/>
      <path d="M2 16 L8 13.5 L9 16 L8 18.5 Z" fill="currentColor"/>
      <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
    </svg>
  ),
  scratch: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 10 L24 10 L24 22 L8 22 Z" fill="currentColor" opacity="0.1"/>
      <path d="M12 14 Q16 12 20 14 Q16 16 12 14" fill="currentColor"/>
      <circle cx="14" cy="18" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="18" r="1.5" fill="currentColor"/>
      <path d="M2 2 L8 8 M6 2 L12 8 M10 2 L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  memory: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="7" cy="10" r="2" fill="currentColor"/>
      <circle cx="17" cy="20" r="2" fill="currentColor"/>
      <path d="M25 8 L29 4 M25 4 L29 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 20 L29 24 M25 24 L29 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  quiz: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 12 L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16 L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 20 L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="22" cy="12" r="2" fill="currentColor"/>
      <path d="M20 2 L24 6 L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  form: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12 L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16 L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 20 L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <path d="M12 8 L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="18" width="6" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  puzzle: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 L14 6 Q16 4 18 6 L26 6 L26 14 Q28 16 26 18 L26 26 L18 26 Q16 28 14 26 L6 26 L6 18 Q4 16 6 14 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 16 L14 16 L14 6" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 6 L18 16 L26 16" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="4" r="2" fill="currentColor"/>
      <circle cx="28" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="4" cy="16" r="2" fill="currentColor"/>
    </svg>
  ),
  dice: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8 L14 4 L26 8 L26 20 L18 24 L6 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 8 L18 12 L26 8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 12 L18 24" stroke="currentColor" strokeWidth="2"/>
      <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
    </svg>
  ),
  jackpot: ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="24" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="7" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="13.5" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="11" width="5" height="10" rx="1" fill="currentColor" opacity="0.2"/>
      <circle cx="9.5" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <circle cx="22.5" cy="16" r="2" fill="currentColor"/>
      <path d="M12 4 L16 1 L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/>
      <circle cx="26" cy="6" r="1" fill="currentColor"/>
    </svg>
  )
};

const Gamification: React.FC = () => {
  const gamificationTypes = [
    {
      name: 'Roue de la fortune',
      description: 'Faites tourner la roue pour gagner des réductions, cadeaux ou surprises',
      color: '#841b60',
      type: 'wheel' as CampaignType
    },
    {
      name: 'Carte à gratter',
      description: 'Découvrez ce qui se cache sous la surface grattable',
      color: '#2c7be5',
      type: 'scratch' as CampaignType
    },
    {
      name: 'Jeu de mémoire',
      description: 'Trouvez les paires correspondantes pour gagner des points',
      color: '#00b8d9',
      type: 'memory' as CampaignType
    },
    {
      name: 'Quiz interactifs',
      description: 'Testez vos connaissances et gagnez des points en fonction de vos réponses',
      color: '#f5803e',
      type: 'quiz' as CampaignType
    },
    {
      name: 'Formulaire dynamique',
      description: 'Créez des formulaires interactifs avec logique conditionnelle et validation en temps réel',
      color: '#36b37e',
      type: 'form' as CampaignType
    },
    {
      name: 'Puzzle',
      description: 'Reconstituez l\'image en déplaçant les pièces au bon endroit',
      color: '#6554c0',
      type: 'puzzle' as CampaignType
    },
    {
      name: 'Dés chanceux',
      description: 'Lancez les dés et tentez votre chance pour gagner des lots',
      color: '#ff5630',
      type: 'dice' as CampaignType
    },
    {
      name: 'Jackpot',
      description: 'Faites tourner les rouleaux et tentez de décrocher le jackpot',
      color: '#ffd700',
      type: 'jackpot' as CampaignType
    }
  ];

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title="Gamification"
        actions={
          <Link
            to="/modern-campaign/new?type=wheel"
            className="inline-flex items-center px-8 py-4 bg-[#841b60] text-white font-semibold rounded-2xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Jeu
          </Link>
        }
      />

      <div className="px-6 space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Mécaniques de jeu</h2>
            <p className="text-gray-600">
              Utilisez ces éléments de gamification pour augmenter l'engagement dans vos campagnes.
              Chaque type de jeu est personnalisable et peut être intégré à vos campagnes marketing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamificationTypes.map((game, index) => {
              const IconComponent = CustomGameIcons[game.type];
              return (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                  <div className="h-32 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: game.color }}>
                    {/* Micro-animation background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <IconComponent className="w-10 h-10 text-white relative z-10 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight">{game.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{game.description}</p>
                    <Link 
                      to={`/modern-campaign/new?type=${game.type}`} 
                      className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 block text-center"
                    >
                      Créer une campagne
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Campagnes avec gamification</h2>
          
          <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom de la campagne
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type de jeu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taux d'engagement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Roue de la Fortune Soldes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Roue de la fortune</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">1,256</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">78%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Terminé
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mémoire Nouveaux Produits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Jeu de mémoire</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">842</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">65%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Actif
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Grattage Anniversaire</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Carte à gratter</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">568</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">72%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Programmé
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
