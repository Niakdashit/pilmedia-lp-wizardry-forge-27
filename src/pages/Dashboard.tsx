
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import CampaignCard from '../components/CampaignCard';
import { Campaign, StatCardProps } from '../types';

const Dashboard = () => {
  const [campaigns] = useState<Campaign[]>([]);
  const [recentCampaigns] = useState<Campaign[]>([]);

  // Fixer les cartes pour utiliser correctement l'interface StatCardProps
  const statCards: StatCardProps[] = [
    {
      title: "Campagnes",
      value: campaigns.length,
      change: "+12%",
      icon: "trending-up",
      positive: true,
      stat: "par rapport au mois précédent"
    },
    {
      title: "Campagnes actives",
      value: campaigns.filter(c => c.status === 'active').length,
      change: "+8%",
      icon: "activity",
      positive: true,
      stat: "par rapport au mois précédent"
    },
    {
      title: "Participants totaux",
      value: campaigns.reduce((sum, campaign) => sum + (campaign.participants || 0), 0),
      change: "+25%",
      icon: "users",
      positive: true,
      stat: "par rapport au mois précédent"
    },
    {
      title: "Taux de complétion",
      value: "84%",
      change: "+4%",
      icon: "percent",
      positive: true,
      stat: "par rapport au mois précédent"
    }
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
      </header>
      
      {/* Aperçu des statistiques */}
      <section className="mb-10">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </section>
      
      {/* Campagnes récentes */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Campagnes récentes</h2>
          <Link 
            to="/dashboard/campaigns"
            className="text-sm text-[#841b60] hover:text-[#6d1750] font-medium"
          >
            Voir tout
          </Link>
        </div>
        
        {recentCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 mb-4">Vous n'avez pas encore créé de campagnes.</p>
            <Link
              to="/dashboard/campaigns/new"
              className="inline-block px-4 py-2 bg-[#841b60] text-white rounded-md hover:bg-[#6d1750] transition-colors"
            >
              Créez votre première campagne
            </Link>
          </div>
        )}
      </section>
      
      {/* Actions rapides */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/dashboard/campaigns/new?type=quiz"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Créer un quiz</h3>
            <p className="text-gray-600 text-sm">Engagez votre audience avec des quiz interactifs.</p>
          </Link>
          
          <Link
            to="/dashboard/campaigns/new?type=survey"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-green-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Créer un sondage</h3>
            <p className="text-gray-600 text-sm">Collectez des retours précieux de votre audience.</p>
          </Link>
          
          <Link
            to="/dashboard/campaigns/new?type=contest"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Créer un concours</h3>
            <p className="text-gray-600 text-sm">Organisez des concours engageants pour développer votre audience.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
