
import React from 'react';
import { Crown, Users, BarChart, Share2, Mail } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const MonetizationFeatures: React.FC = () => {
  const { monetization, setLeadCapture, setAnalytics, setSocialSharing } = useQuickCampaignStore();

  const features = [
    {
      id: 'leadCapture',
      icon: Users,
      title: 'Capture de leads',
      description: 'Collectez automatiquement les informations des participants',
      enabled: monetization.leadCapture,
      toggle: setLeadCapture
    },
    {
      id: 'analytics',
      icon: BarChart,
      title: 'Analytics avancées',
      description: 'Statistiques détaillées et tableaux de bord',
      enabled: monetization.analytics,
      toggle: setAnalytics
    },
    {
      id: 'socialSharing',
      icon: Share2,
      title: 'Partage social',
      description: 'Boutons de partage sur les réseaux sociaux',
      enabled: monetization.socialSharing,
      toggle: setSocialSharing
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Crown className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Fonctionnalités de monétisation</h3>
      </div>

      <div className="space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                </div>
              </div>
              <button
                onClick={() => feature.toggle(!feature.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                  feature.enabled ? 'bg-yellow-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    feature.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
        <div className="flex items-center space-x-2 mb-2">
          <Crown className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Fonctionnalités Premium</span>
        </div>
        <p className="text-sm text-yellow-700">
          Ces fonctionnalités nécessitent un abonnement Premium pour être activées en production.
        </p>
      </div>
    </div>
  );
};

export default MonetizationFeatures;
