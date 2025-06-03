import React from 'react';
import { motion } from 'framer-motion';
import { Palette, RotateCcw, Settings } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
const ColorCustomizer: React.FC = () => {
  const {
    selectedGameType,
    customColors,
    segmentCount,
    setCustomColors,
    setSegmentCount
  } = useQuickCampaignStore();
  const presetColorCombinations = [{
    name: 'Violet Corporate',
    colors: {
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    }
  }, {
    name: 'Orange Énergique',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#facc15'
    }
  }, {
    name: 'Bleu Professionnel',
    colors: {
      primary: '#1e40af',
      secondary: '#0891b2',
      accent: '#059669'
    }
  }, {
    name: 'Rose Moderne',
    colors: {
      primary: '#e11d48',
      secondary: '#c026d3',
      accent: '#7c3aed'
    }
  }, {
    name: 'Vert Nature',
    colors: {
      primary: '#16a34a',
      secondary: '#059669',
      accent: '#0d9488'
    }
  }, {
    name: 'Noir Élégant',
    colors: {
      primary: '#171717',
      secondary: '#374151',
      accent: '#6b7280'
    }
  }];
  const resetToDefault = () => {
    setCustomColors({
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    });
  };
  return <div className="space-y-6 sm:space-y-8">
      {/* Couleurs prédéfinies */}
      <div>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-[#841b60]" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Combinaisons de couleurs
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {presetColorCombinations.map((preset, index) => <motion.button key={index} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setCustomColors(preset.colors)} className={`
                p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left
                bg-white/60 backdrop-blur-sm shadow-lg
                ${JSON.stringify(customColors) === JSON.stringify(preset.colors) ? 'border-[#841b60] bg-[#841b60]/10 shadow-xl' : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'}
              `}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border" style={{
              backgroundColor: preset.colors.primary
            }} />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border" style={{
              backgroundColor: preset.colors.secondary
            }} />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border" style={{
              backgroundColor: preset.colors.accent
            }} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 break-words">
                {preset.name}
              </p>
            </motion.button>)}
        </div>
      </div>

      {/* Personnalisation manuelle */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Couleurs personnalisées
          </h3>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={resetToDefault} className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-lg sm:rounded-xl hover:bg-gray-100 text-sm sm:text-base">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Reset</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-white-700 mb-2 sm:mb-3 bg-white/0">
              Couleur principale
            </label>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <input type="color" value={customColors.primary} onChange={e => setCustomColors({
              ...customColors,
              primary: e.target.value
            })} className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 cursor-pointer" />
              <input type="text" value={customColors.primary} onChange={e => setCustomColors({
              ...customColors,
              primary: e.target.value
            })} className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#841b60] focus:outline-none transition-all bg-white/80 backdrop-blur-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm sm:text-base font-medium text-white-700 mb-2 sm:mb-3">
              Couleur secondaire
            </label>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <input type="color" value={customColors.secondary} onChange={e => setCustomColors({
              ...customColors,
              secondary: e.target.value
            })} className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 cursor-pointer" />
              <input type="text" value={customColors.secondary} onChange={e => setCustomColors({
              ...customColors,
              secondary: e.target.value
            })} className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#841b60] focus:outline-none transition-all bg-white/80 backdrop-blur-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Couleur accent
            </label>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <input type="color" value={customColors.accent || '#10b981'} onChange={e => setCustomColors({
              ...customColors,
              accent: e.target.value
            })} className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-300 cursor-pointer" />
              <input type="text" value={customColors.accent || '#10b981'} onChange={e => setCustomColors({
              ...customColors,
              accent: e.target.value
            })} className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#841b60] focus:outline-none transition-all bg-white/80 backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Options spécifiques à la roue */}
      {selectedGameType === 'roue' && <div>
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#841b60]" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Configuration de la roue
            </h3>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                  Nombre de segments
                </label>
                <input type="range" min="4" max="12" value={segmentCount} onChange={e => setSegmentCount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  <span>4</span>
                  <span className="font-medium text-[#841b60]">{segmentCount} segments</span>
                  <span>12</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
                  Aperçu des couleurs
                </label>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {Array.from({
                length: Math.min(segmentCount, 6)
              }).map((_, index) => {
                const colors = [customColors.primary, customColors.secondary, customColors.accent || '#10b981'];
                const color = colors[index % colors.length];
                return <div key={index} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md" style={{
                  backgroundColor: color
                }} />;
              })}
                  {segmentCount > 6 && <span className="text-xs sm:text-sm text-gray-500 ml-2">+{segmentCount - 6}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default ColorCustomizer;