import React from 'react';
import { Gamepad2, Dices, Cookie, Sparkles, Plus, FormInput, Grid3X3, FlipHorizontal2, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignType } from '../utils/campaignTypes';
const Gamification: React.FC = () => {
  const gamificationTypes = [
    {
      name: 'Roue de la fortune',
      description: 'Faites tourner la roue pour gagner des réductions, cadeaux ou surprises',
      icon: <Gamepad2 className="w-10 h-10 text-white" />,
      color: '#841b60',
      type: 'wheel' as CampaignType
    },
    {
      name: 'Carte à gratter',
      description: 'Découvrez ce qui se cache sous la surface grattable',
      icon: <Cookie className="w-10 h-10 text-white" />,
      color: '#2c7be5',
      type: 'scratch' as CampaignType
    },
    {
      name: 'Jeu de mémoire',
      description: 'Trouvez les paires correspondantes pour gagner des points',
      icon: <FlipHorizontal2 className="w-10 h-10 text-white" />,
      color: '#00b8d9',
      type: 'memory' as CampaignType
    },
    {
      name: 'Quiz interactifs',
      description: 'Testez vos connaissances et gagnez des points en fonction de vos réponses',
      icon: <Sparkles className="w-10 h-10 text-white" />,
      color: '#f5803e',
      type: 'quiz' as CampaignType
    },
    {
      name: 'Formulaire dynamique',
      description: 'Créez des formulaires interactifs avec logique conditionnelle et validation en temps réel',
      icon: <FormInput className="w-10 h-10 text-white" />,
      color: '#36b37e',
      type: 'form' as CampaignType
    },
    {
      name: 'Puzzle',
      description: 'Reconstituez l\'image en déplaçant les pièces au bon endroit',
      icon: <Grid3X3 className="w-10 h-10 text-white" />,
      color: '#6554c0',
      type: 'puzzle' as CampaignType
    },
    {
      name: 'Dés chanceux',
      description: 'Lancez les dés et tentez votre chance pour gagner des lots',
      icon: <Dices className="w-10 h-10 text-white" />,
      color: '#ff5630',
      type: 'dice' as CampaignType
    },
    {
      name: 'Jackpot',
      description: 'Faites tourner les rouleaux et tentez de décrocher le jackpot',
      icon: <Coins className="w-10 h-10 text-white" />,
      color: '#ffd700',
      type: 'jackpot' as CampaignType
    }
  ];
  return (
    <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-3">Gamification</h1>
          <Link
            to="/modern-campaign/new?type=wheel"
            className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl mb-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Jeu
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6 space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Mécaniques de jeu</h2>
            <p className="text-gray-600">
              Utilisez ces éléments de gamification pour augmenter l'engagement dans vos campagnes.
              Chaque type de jeu est personnalisable et peut être intégré à vos campagnes marketing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {gamificationTypes.map((game, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-24 flex items-center justify-center" style={{ backgroundColor: game.color }}>
                  {game.icon}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{game.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                  <Link 
                    to={`/modern-campaign/new?type=${game.type}`} 
                    className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 block text-center"
                  >
                    Créer une campagne
                  </Link>
                </div>
              </div>
            ))}
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
