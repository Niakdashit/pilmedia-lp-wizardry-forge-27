
import React, { useState } from 'react';
import { Palette, Type, Image as ImageIcon, Sparkles, Eye, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizDesign {
  template: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  animations: boolean;
  layout: 'card' | 'fullscreen' | 'chat';
  backgroundImage?: string;
}

interface QuizDesignerProps {
  design: QuizDesign;
  onDesignChange: (design: QuizDesign) => void;
}

const QuizDesigner: React.FC<QuizDesignerProps> = ({ design, onDesignChange }) => {
  const [activeTab, setActiveTab] = useState<'template' | 'colors' | 'typography' | 'layout'>('template');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const templates = [
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Style moderne avec gradients colorés',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      config: {
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        backgroundColor: '#ffffff',
        textColor: '#2d3748',
        fontFamily: 'Inter',
        borderRadius: '16px',
        layout: 'card' as const
      }
    },
    {
      id: 'buzzfeed',
      name: 'BuzzFeed',
      description: 'Interface ludique et colorée',
      preview: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
      config: {
        primaryColor: '#ff6b6b',
        secondaryColor: '#ffd93d',
        backgroundColor: '#fff9e6',
        textColor: '#2d3748',
        fontFamily: 'Inter',
        borderRadius: '12px',
        layout: 'fullscreen' as const
      }
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Style professionnel et épuré',
      preview: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
      config: {
        primaryColor: '#2d3748',
        secondaryColor: '#4a5568',
        backgroundColor: '#f7fafc',
        textColor: '#2d3748',
        fontFamily: 'Georgia',
        borderRadius: '8px',
        layout: 'card' as const
      }
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Style arcade avec néons',
      preview: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 100%)',
      config: {
        primaryColor: '#00f5ff',
        secondaryColor: '#ff00ff',
        backgroundColor: '#0a0a0a',
        textColor: '#ffffff',
        fontFamily: 'Arial',
        borderRadius: '4px',
        layout: 'fullscreen' as const
      }
    }
  ];

  const colorPresets = [
    { name: 'Violet', primary: '#8b5cf6', secondary: '#a78bfa' },
    { name: 'Bleu', primary: '#3b82f6', secondary: '#60a5fa' },
    { name: 'Vert', primary: '#10b981', secondary: '#34d399' },
    { name: 'Rose', primary: '#ec4899', secondary: '#f472b6' },
    { name: 'Orange', primary: '#f59e0b', secondary: '#fbbf24' },
    { name: 'Rouge', primary: '#ef4444', secondary: '#f87171' }
  ];

  const updateDesign = (updates: Partial<QuizDesign>) => {
    onDesignChange({ ...design, ...updates });
  };

  const applyTemplate = (template: any) => {
    updateDesign({ ...template.config, template: template.id });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Design du Quiz</h2>
          <p className="text-gray-600 mt-1">Personnalisez l'apparence de votre quiz</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                previewMode === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Desktop</span>
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                previewMode === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">Mobile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        {[
          { id: 'template', label: 'Templates', icon: Sparkles },
          { id: 'colors', label: 'Couleurs', icon: Palette },
          { id: 'typography', label: 'Typographie', icon: Type },
          { id: 'layout', label: 'Layout', icon: ImageIcon }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'template' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    design.template === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-full h-24 rounded-lg mb-4"
                    style={{ background: template.preview }}
                  />
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Presets de couleurs</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => updateDesign({
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary
                    })}
                    className="group p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex space-x-1 mb-2">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-gray-800">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Couleur principale
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={design.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Couleur secondaire
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={design.secondaryColor}
                    onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.secondaryColor}
                    onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Arrière-plan
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={design.backgroundColor}
                    onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.backgroundColor}
                    onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Police de caractères
                </label>
                <select
                  value={design.fontFamily}
                  onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Inter">Inter (Modern)</option>
                  <option value="Arial">Arial (Sans-serif)</option>
                  <option value="Georgia">Georgia (Serif)</option>
                  <option value="Courier New">Courier New (Monospace)</option>
                  <option value="Helvetica">Helvetica (Classic)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Couleur du texte
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={design.textColor}
                    onChange={(e) => updateDesign({ textColor: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.textColor}
                    onChange={(e) => updateDesign({ textColor: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Style de présentation
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', name: 'Carte', description: 'Questions dans des cartes' },
                  { id: 'fullscreen', name: 'Plein écran', description: 'Une question par écran' },
                  { id: 'chat', name: 'Chat', description: 'Style conversation' }
                ].map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => updateDesign({ layout: layout.id as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      design.layout === layout.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{layout.name}</h3>
                    <p className="text-sm text-gray-600">{layout.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Coins arrondis
                </label>
                <select
                  value={design.borderRadius}
                  onChange={(e) => updateDesign({ borderRadius: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="4px">Légèrement arrondis</option>
                  <option value="8px">Modérément arrondis</option>
                  <option value="12px">Arrondis</option>
                  <option value="16px">Très arrondis</option>
                  <option value="24px">Extrêmement arrondis</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={design.animations}
                    onChange={(e) => updateDesign({ animations: e.target.checked })}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Activer les animations
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizDesigner;
