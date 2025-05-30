
import React from 'react';
import { Layout, Move, Maximize2 } from 'lucide-react';

interface LayoutSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const LayoutSection: React.FC<LayoutSectionProps> = ({ campaign, setCampaign }) => {
  const updateLayout = (key: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      layout: { ...prev.layout, [key]: value }
    }));
  };

  const positions = [
    { id: 'top', label: 'Haut', description: 'En haut de l\'écran' },
    { id: 'center', label: 'Centre', description: 'Au centre de l\'écran' },
    { id: 'bottom', label: 'Bas', description: 'En bas de l\'écran' },
    { id: 'left', label: 'Gauche', description: 'À gauche de l\'écran' },
    { id: 'right', label: 'Droite', description: 'À droite de l\'écran' }
  ];

  const spacings = [
    { id: 'compact', label: 'Compact', description: 'Espacement réduit' },
    { id: 'normal', label: 'Normal', description: 'Espacement standard' },
    { id: 'relaxed', label: 'Relaxé', description: 'Espacement large' }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Position des blocs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-500 to-[#841b60] rounded-lg flex items-center justify-center">
            <Layout className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Position des éléments</h2>
            <p className="text-gray-600 text-sm lg:text-base">Contrôlez la disposition de vos éléments</p>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Position des blocs de contenu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
              {positions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => updateLayout('blockPosition', position.id)}
                  className={`p-3 lg:p-4 rounded-lg border-2 transition-all text-center text-sm lg:text-base ${
                    campaign.layout?.blockPosition === position.id
                      ? 'border-[#841b60] bg-[#841b60]/5 text-[#841b60]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{position.label}</div>
                  <div className="text-xs text-gray-500 mt-1 hidden lg:block">{position.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Position du jeu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
              {positions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => updateLayout('gamePosition', position.id)}
                  className={`p-3 lg:p-4 rounded-lg border-2 transition-all text-center text-sm lg:text-base ${
                    campaign.layout?.gamePosition === position.id
                      ? 'border-[#841b60] bg-[#841b60]/5 text-[#841b60]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{position.label}</div>
                  <div className="text-xs text-gray-500 mt-1 hidden lg:block">{position.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espacement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Maximize2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Espacement</h3>
            <p className="text-gray-600 text-sm lg:text-base">Ajustez l'espacement entre les éléments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {spacings.map((spacing) => (
            <button
              key={spacing.id}
              onClick={() => updateLayout('spacing', spacing.id)}
              className={`p-3 lg:p-4 rounded-lg border-2 transition-all text-center ${
                campaign.layout?.spacing === spacing.id
                  ? 'border-[#841b60] bg-[#841b60]/5 text-[#841b60]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="font-medium">{spacing.label}</div>
              <div className="text-sm text-gray-500 mt-1">{spacing.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aperçu de la mise en page */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Move className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Aperçu de la mise en page</h3>
            <p className="text-gray-600 text-sm lg:text-base">Visualisez la disposition de vos éléments</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 lg:p-8 min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 w-full max-w-sm lg:max-w-md h-48 lg:h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Layout className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4" />
              <p className="text-sm lg:text-base">Aperçu de la mise en page</p>
              <p className="text-xs lg:text-sm">Position: {campaign.layout?.blockPosition || 'center'}</p>
              <p className="text-xs lg:text-sm">Espacement: {campaign.layout?.spacing || 'normal'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSection;
