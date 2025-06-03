
import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import ImageUpload from '../../common/ImageUpload';

interface WheelGameConfigProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const WheelGameConfig: React.FC<WheelGameConfigProps> = ({
  campaign,
  setCampaign
}) => {
  const segments = campaign.config?.roulette?.segments || [];
  const borderColor = campaign.config?.roulette?.borderColor || '#841b60';

  const addSegment = () => {
    setCampaign((prev: any) => ({
      ...prev,
      config: {
        ...prev.config,
        roulette: {
          ...prev.config?.roulette,
          segments: [...segments, {
            label: `Segment ${segments.length + 1}`,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
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

  return <div className="space-y-6">
      {/* Couleur de bordure de la roue */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Couleur de la bordure</label>
        <div className="flex items-center space-x-2">
          <input type="color" value={borderColor} onChange={e => updateBorderColor(e.target.value)} className="w-10 h-10 rounded border border-gray-300" />
          <input type="text" value={borderColor} onChange={e => updateBorderColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent" />
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
                <span className="text-sm font-medium text-gray-700">Segment {index + 1}</span>
                <button onClick={() => removeSegment(index)} className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={segment.label || ''} onChange={e => updateSegment(index, 'label', e.target.value)} placeholder="Texte du segment" className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#841b60] focus:border-transparent" />
                <div className="flex items-center space-x-2">
                  <input type="color" value={segment.color || '#841b60'} onChange={e => updateSegment(index, 'color', e.target.value)} className="w-8 h-8 rounded border" />
                </div>
              </div>

              {/* Image upload for segment */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-medium text-gray-600">
                  <Upload className="w-3 h-3 mr-1" />
                  Image du segment
                </label>
                <ImageUpload value={segment.image || ''} onChange={value => updateSegment(index, 'image', value)} label="" compact={true} />
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
