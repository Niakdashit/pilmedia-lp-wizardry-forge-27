import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import ImageUpload from '../../common/ImageUpload';
import ColorPaletteSelector from './ColorPaletteSelector';
interface WheelGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}
const WheelGameConfig: React.FC<WheelGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
  const [selectedPalette, setSelectedPalette] = useState<any>(undefined);
  const segments = campaign.config?.roulette?.segments || [];
  const borderColor = campaign.config?.roulette?.borderColor || '#841b60';
  const borderOutlineColor = campaign.config?.roulette?.borderOutlineColor || '#FFD700';
  const segmentColor1 = campaign.config?.roulette?.segmentColor1 || '#ff6b6b';
  const segmentColor2 = campaign.config?.roulette?.segmentColor2 || '#4ecdc4';
  const handlePaletteSelect = (palette: any) => {
    setSelectedPalette(palette);

    // Appliquer la palette aux couleurs spécifiques de la roue
    setCampaign((prev: any) => {
      const newConfig = {
        ...prev,
        config: {
          ...prev.config,
          roulette: {
            ...prev.config?.roulette,
            borderColor: palette.primary,
            borderOutlineColor: palette.accent || palette.secondary,
            segmentColor1: palette.primary,
            segmentColor2: palette.secondary
          }
        }
      };

      // Mettre à jour les segments existants avec les nouvelles couleurs alternées
      if (newConfig.config.roulette.segments) {
        newConfig.config.roulette.segments = newConfig.config.roulette.segments.map((segment: any, index: number) => ({
          ...segment,
          color: index % 2 === 0 ? palette.primary : palette.secondary
        }));
      }
      return newConfig;
    });
  };
  const addSegment = () => {
    const newSegmentIndex = segments.length;
    const segmentColor = newSegmentIndex % 2 === 0 ? segmentColor1 : segmentColor2;
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          segments: [...segments, {
            label: `Segment ${segments.length + 1}`,
            color: segmentColor,
            image: null
          }]
        }
      }
    }));
  };
  const updateSegment = (index: number, field: string, value: any) => {
    const updatedSegments = [...segments];
    updatedSegments[index] = {
      ...updatedSegments[index],
      [field]: value
    };
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          segments: updatedSegments
        }
      }
    }));
  };
  const removeSegment = (index: number) => {
    const updatedSegments = segments.filter((_: any, i: number) => i !== index);
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          segments: updatedSegments
        }
      }
    }));
  };
  const updateBorderColor = (color: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          borderColor: color
        }
      }
    }));
  };
  const updateBorderOutlineColor = (color: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          borderOutlineColor: color
        }
      }
    }));
  };
  const updateSegmentColors = (colorIndex: 1 | 2, color: string) => {
    const colorKey = `segmentColor${colorIndex}`;
    setCampaign((prev: any) => {
      const newConfig = {
        ...prev,
        config: {
          ...prev.config,
          roulette: {
            ...prev.config?.roulette,
            [colorKey]: color
          }
        }
      };

      // Update existing segments with the new alternating colors
      if (newConfig.config.roulette.segments) {
        newConfig.config.roulette.segments = newConfig.config.roulette.segments.map((segment: any, index: number) => ({
          ...segment,
          color: index % 2 === 0 ? colorIndex === 1 ? color : newConfig.config.roulette.segmentColor1 || segmentColor1 : colorIndex === 2 ? color : newConfig.config.roulette.segmentColor2 || segmentColor2
        }));
      }
      return newConfig;
    });
  };
  return <div className="space-y-6">
      {/* Combinaisons de couleurs */}
      <ColorPaletteSelector selectedPalette={selectedPalette} onPaletteSelect={handlePaletteSelect} gameType="wheel" />

      {/* Couleurs de la roue */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Couleurs personnalisées</h3>
        
        {/* Couleur de bordure principale */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Couleur de la bordure</label>
          <div className="flex items-center space-x-2">
            <input type="color" value={borderColor} onChange={e => updateBorderColor(e.target.value)} className="w-10 h-10 rounded border border-gray-300" />
            <input type="text" value={borderColor} onChange={e => updateBorderColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent" />
          </div>
        </div>

        {/* Couleur du contour de bordure */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Couleur du contour de bordure</label>
          <div className="flex items-center space-x-2">
            <input type="color" value={borderOutlineColor} onChange={e => updateBorderOutlineColor(e.target.value)} className="w-10 h-10 rounded border border-gray-300" />
            <input type="text" value={borderOutlineColor} onChange={e => updateBorderOutlineColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent" />
          </div>
        </div>

        {/* Couleurs des segments alternées */}
        <div className="grid grid-cols-2 gap-4">
          
          
          
        </div>
        
        
      </div>

      {/* Segments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Segments de la roue</label>
          <button onClick={addSegment} className="flex items-center space-x-1 px-3 py-1 text-sm bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors">
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {segments.map((segment: any, index: number) => <div key={index} className="p-3 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Segment {index + 1}</span>
                  <div className="w-4 h-4 rounded border border-gray-300" style={{
                backgroundColor: index % 2 === 0 ? segmentColor1 : segmentColor2
              }}></div>
                </div>
                <button onClick={() => removeSegment(index)} className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <input type="text" value={segment.label || ''} onChange={e => updateSegment(index, 'label', e.target.value)} placeholder="Texte du segment" className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent" />
                
                {/* Image upload for segment */}
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-600">
                    <Upload className="w-3 h-3 mr-1" />
                    Image du segment
                  </label>
                  <ImageUpload value={segment.image || ''} onChange={value => updateSegment(index, 'image', value)} label="" compact={true} />
                </div>
              </div>
            </div>)}
        </div>

        {segments.length === 0 && <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Aucun segment configuré</p>
            <p className="text-xs">Cliquez sur "Ajouter" pour créer votre premier segment</p>
          </div>}
      </div>
    </div>;
};
export default WheelGameConfig;