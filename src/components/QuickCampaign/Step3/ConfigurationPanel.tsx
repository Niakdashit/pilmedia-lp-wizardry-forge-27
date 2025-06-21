
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Palette, Sparkles, Crown, ChevronDown, ChevronRight } from 'lucide-react';
import WheelConfiguration from './WheelConfiguration';
import ButtonStyleSelector from './ButtonStyleSelector';
import GamePositionSelector from './GamePositionSelector';
import AdvancedModeToggle from './AdvancedModeToggle';
import AdvancedWheelCustomization from './AdvancedWheelCustomization';
import WheelRenderingEffects from './WheelRenderingEffects';
import MonetizationFeatures from './MonetizationFeatures';
import ProExtensions from './ProExtensions';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const ConfigurationPanel: React.FC = () => {
  const { advancedMode } = useQuickCampaignStore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['basic', 'buttonStyle'])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const configSections = [
    {
      id: 'basic',
      title: 'Configuration de base',
      icon: Settings,
      color: 'blue',
      component: <WheelConfiguration />
    },
    {
      id: 'buttonStyle',
      title: 'Style du bouton',
      icon: Palette,
      color: 'purple',
      component: <ButtonStyleSelector />
    },
    {
      id: 'gamePosition',
      title: 'Position du jeu',
      icon: Settings,
      color: 'green',
      component: <GamePositionSelector />
    }
  ];

  const advancedSections = [
    {
      id: 'wheelCustomization',
      title: 'Personnalisation avancée',
      icon: Sparkles,
      color: 'indigo',
      component: <AdvancedWheelCustomization />
    },
    {
      id: 'renderingEffects',
      title: 'Effets de rendu',
      icon: Sparkles,
      color: 'pink',
      component: <WheelRenderingEffects />
    },
    {
      id: 'monetization',
      title: 'Monétisation',
      icon: Crown,
      color: 'yellow',
      component: <MonetizationFeatures />
    },
    {
      id: 'extensions',
      title: 'Extensions Pro',
      icon: Crown,
      color: 'orange',
      component: <ProExtensions />
    }
  ];

  const allSections = [...configSections, ...(advancedMode ? advancedSections : [])];

  return (
    <div className="col-span-5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Configuration</h2>
              <p className="text-sm text-gray-600">Personnalisez votre campagne</p>
            </div>
          </div>
          <AdvancedModeToggle />
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-6 space-y-4">
          {allSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.has(section.id);
            
            return (
              <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r hover:shadow-md transition-all duration-200 ${
                    section.color === 'blue' ? 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200' :
                    section.color === 'purple' ? 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200' :
                    section.color === 'green' ? 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' :
                    section.color === 'indigo' ? 'from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200' :
                    section.color === 'pink' ? 'from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200' :
                    section.color === 'yellow' ? 'from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200' :
                    'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      section.color === 'blue' ? 'bg-blue-500' :
                      section.color === 'purple' ? 'bg-purple-500' :
                      section.color === 'green' ? 'bg-green-500' :
                      section.color === 'indigo' ? 'bg-indigo-500' :
                      section.color === 'pink' ? 'bg-pink-500' :
                      section.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border-t border-gray-100">
                        {section.component}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
