
import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/Layout/PageHeader';
import { CampaignType, getCampaignTypeIcon } from '../utils/campaignTypes';

const Gamification: React.FC = () => {
  const gamificationTypes = [
    {
      name: 'Roue de la fortune',
      description: 'Faites tourner la roue pour gagner des réductions, cadeaux ou surprises',
      color: '#951B6D',
      type: 'wheel' as CampaignType
    },
    {
      name: 'Carte à gratter',
      description: 'Découvrez ce qui se cache sous la surface grattable',
      color: '#A020F0',
      type: 'scratch' as CampaignType
    },
    {
      name: 'Jeu de mémoire',
      description: 'Trouvez les paires correspondantes pour gagner des points',
      color: '#951B6D',
      type: 'memory' as CampaignType
    },
    {
      name: 'Quiz interactifs',
      description: 'Testez vos connaissances et gagnez des points en fonction de vos réponses',
      color: '#A020F0',
      type: 'quiz' as CampaignType
    },
    {
      name: 'Formulaire dynamique',
      description: 'Créez des formulaires interactifs avec logique conditionnelle et validation en temps réel',
      color: '#951B6D',
      type: 'form' as CampaignType
    },
    {
      name: 'Puzzle',
      description: 'Reconstituez l\'image en déplaçant les pièces au bon endroit',
      color: '#A020F0',
      type: 'puzzle' as CampaignType
    },
    {
      name: 'Dés chanceux',
      description: 'Lancez les dés et tentez votre chance pour gagner des lots',
      color: '#951B6D',
      type: 'dice' as CampaignType
    },
    {
      name: 'Jackpot',
      description: 'Faites tourner les rouleaux et tentez de décrocher le jackpot',
      color: '#A020F0',
      type: 'jackpot' as CampaignType
    }
  ];

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title="Gamification"
        actions={
          <Link
            to="/modern-wizard"
            className="inline-flex items-center px-8 py-4 bg-[#951B6D] text-white font-bold rounded-xl hover:bg-[#A020F0] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Jeu
          </Link>
        }
      />

      <div className="px-6 space-y-8">
        <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8 mt-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#141E29] mb-3">
              Mécaniques de 
              <span className="text-[#951B6D] relative">
                {' '}jeu
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#951B6D] opacity-40"></div>
              </span>
            </h2>
            <p className="text-[#64748B] text-lg">
              Utilisez ces éléments de gamification pour augmenter l'engagement dans vos campagnes.
              Chaque type de jeu est personnalisable et peut être intégré à vos campagnes marketing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamificationTypes.map((game, index) => {
              const IconComponent = getCampaignTypeIcon(game.type);
              return (
                <div key={index} className="bg-[#F8FAFC] border border-[#EDF3F7] rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                  <div className="h-24 flex items-center justify-center" style={{ backgroundColor: `${game.color}15` }}>
                    <IconComponent className="w-10 h-10" style={{ color: game.color }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#141E29] mb-2 text-lg">{game.name}</h3>
                    <p className="text-sm text-[#64748B] mb-4 leading-relaxed">{game.description}</p>
                    <Link 
                      to={`/modern-wizard?type=${game.type}`} 
                      className="w-full px-4 py-3 bg-[#F3F6F9] text-[#64748B] font-bold rounded-lg hover:bg-[#951B6D] hover:text-white transition-all duration-300 block text-center border border-[#EDF3F7] group-hover:border-[#951B6D]"
                    >
                      Créer une campagne
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#141E29] mb-6">Campagnes avec gamification</h2>
          
          <div className="overflow-hidden bg-[#F8FAFC] rounded-xl border border-[#EDF3F7]">
            <table className="min-w-full divide-y divide-[#EDF3F7]">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Nom de la campagne
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Type de jeu
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Participants
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Taux d'engagement
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#EDF3F7]">
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[#141E29]">Roue de la Fortune Soldes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#64748B] font-medium">Roue de la fortune</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">1,256</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">78%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                      Terminé
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[#141E29]">Mémoire Nouveaux Produits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#64748B] font-medium">Jeu de mémoire</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">842</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">65%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                      Actif
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[#141E29]">Grattage Anniversaire</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#64748B] font-medium">Carte à gratter</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">568</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#141E29] font-bold">72%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
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
