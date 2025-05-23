import React, { useState } from 'react';
import { Calendar, Clock, Percent, Gift, Plus, Trash2 } from 'lucide-react';

interface CampaignSettingsProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({ campaign, setCampaign }) => {
  const [rewardMode, setRewardMode] = useState('probability');
  const [timeSlots, setTimeSlots] = useState([
    { id: '1', date: '', time: '', quantity: 1 }
  ]);

  const handleRewardModeChange = (mode: string) => {
    setRewardMode(mode);
    setCampaign(prev => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        mode
      }
    }));
  };

  const handleProbabilityChange = (value: string) => {
    setCampaign(prev => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        probability: parseFloat(value)
      }
    }));
  };

  const handleQuantityChange = (value: string) => {
    setCampaign(prev => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        quantity: parseInt(value, 10)
      }
    }));
  };

  const addTimeSlot = () => {
    setTimeSlots(prev => [
      ...prev,
      { id: Date.now().toString(), date: '', time: '', quantity: 1 }
    ]);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const updateTimeSlot = (id: string, field: string, value: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4 mb-4">
        <p className="text-[#841b60] text-sm">
          Configurez les paramètres de dotation pour votre campagne. Choisissez entre un mode probabilité 
          ou un calendrier de gain précis.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre total de lots à gagner
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Gift className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="number"
            min="1"
            value={campaign.rewards?.quantity || 1}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            placeholder="Nombre de lots"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Mode d'attribution
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleRewardModeChange('probability')}
            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
              rewardMode === 'probability'
                ? 'border-[#841b60] bg-[#f8f0f5]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Percent className={`w-8 h-8 ${
              rewardMode === 'probability' ? 'text-[#841b60]' : 'text-gray-400'
            }`} />
            <span className={`font-medium ${
              rewardMode === 'probability' ? 'text-[#841b60]' : 'text-gray-600'
            }`}>
              Mode Probabilité
            </span>
          </button>

          <button
            onClick={() => handleRewardModeChange('schedule')}
            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
              rewardMode === 'schedule'
                ? 'border-[#841b60] bg-[#f8f0f5]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Calendar className={`w-8 h-8 ${
              rewardMode === 'schedule' ? 'text-[#841b60]' : 'text-gray-400'
            }`} />
            <span className={`font-medium ${
              rewardMode === 'schedule' ? 'text-[#841b60]' : 'text-gray-600'
            }`}>
              Mode Calendrier
            </span>
          </button>
        </div>
      </div>

      {rewardMode === 'probability' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Probabilité de gain
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={campaign.rewards?.probability || 10}
                onChange={(e) => handleProbabilityChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#841b60]"
              />
            </div>
            <div className="w-16">
              <input
                type="number"
                min="0"
                max="100"
                value={campaign.rewards?.probability || 10}
                onChange={(e) => handleProbabilityChange(e.target.value)}
                className="w-full px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              />
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            1 chance sur {Math.round(100 / (campaign.rewards?.probability || 10))} de gagner
          </p>
        </div>
      )}

      {rewardMode === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Créneaux de gain</h3>
            <button
              onClick={addTimeSlot}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#841b60] bg-[#f8f0f5] rounded-lg hover:bg-[#f0e5ec] transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter un créneau
            </button>
          </div>

          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => updateTimeSlot(slot.id, 'date', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => updateTimeSlot(slot.id, 'time', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </div>

                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    value={slot.quantity}
                    onChange={(e) => updateTimeSlot(slot.id, 'quantity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    placeholder="Lots"
                  />
                </div>

                <button
                  onClick={() => removeTimeSlot(slot.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  disabled={timeSlots.length === 1}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignSettings;