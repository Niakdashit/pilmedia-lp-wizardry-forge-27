
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModernEditorCanvas from '../components/ModernEditor/ModernEditorCanvas';

const ModernCampaignEditor: React.FC = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [gameSize, setGameSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [gamePosition, setGamePosition] = useState<'top' | 'center' | 'bottom' | 'left' | 'right'>('center');

  useEffect(() => {
    // Mock campaign data for now - in real app this would fetch from API
    const mockCampaign = {
      id,
      name: 'Test Campaign',
      type: 'wheel',
      design: {
        background: '#f8fafc',
        backgroundImage: null,
      },
      buttonConfig: {
        text: 'Jouer',
        color: '#841b60'
      },
      gameConfig: {
        wheel: {
          mode: 'instant_winner',
          winProbability: 0.1,
          maxWinners: 10,
          winnersCount: 0
        }
      }
    };
    setCampaign(mockCampaign);
  }, [id]);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la campagne...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Éditeur Moderne - {campaign.name}
          </h1>
          
          <div className="flex gap-4 items-center">
            {/* Device selector */}
            <select 
              value={previewDevice} 
              onChange={(e) => setPreviewDevice(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="desktop">Bureau</option>
              <option value="tablet">Tablette</option>
              <option value="mobile">Mobile</option>
            </select>

            {/* Game size selector */}
            <select 
              value={gameSize} 
              onChange={(e) => setGameSize(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>

            {/* Game position selector */}
            <select 
              value={gamePosition} 
              onChange={(e) => setGamePosition(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="top">Haut</option>
              <option value="center">Centre</option>
              <option value="bottom">Bas</option>
              <option value="left">Gauche</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <ModernEditorCanvas
          campaign={campaign}
          previewDevice={previewDevice}
          gameSize={gameSize}
          gamePosition={gamePosition}
        />
      </div>
    </div>
  );
};

export default ModernCampaignEditor;
