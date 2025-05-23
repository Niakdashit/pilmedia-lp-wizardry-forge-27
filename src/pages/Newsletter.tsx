
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Eye, Send, Save } from 'lucide-react';
import { ModulesList } from '../components/Newsletter/ModulesList';
import { EditorCanvas } from '../components/Newsletter/EditorCanvas';
import { PropertiesPanel } from '../components/Newsletter/PropertiesPanel';
import { useNewsletterStore } from '../stores/newsletterStore';
import PreviewModal from '../components/Newsletter/PreviewModal';
import SettingsTab from '@/components/Newsletter/properties/Tab/SettingsTab';

const Newsletter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'settings' | 'send' | 'automate'>('edit');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { modules, addModule } = useNewsletterStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'editor') {
      const moduleType = active.id as string;
      addModule({
        id: `module-${Date.now()}`,
        type: moduleType as any,
        content: '',
        settings: {}
      });
    }
  };

  return (
    <div className="bg-[#cdfbff] min-h-screen -mx-6 -mt-6">
      {/* Header */}
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Éditeur de Newsletter</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30"
            >
              <Eye className="w-5 h-5 mr-2" /> Aperçu
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30">
              <Save className="w-5 h-5 mr-2" /> Enregistrer
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 shadow-lg">
              <Send className="w-5 h-5 mr-2" /> Envoyer
            </button>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-[#ebf4f7] border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-6">
            <button
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'edit'
                  ? 'bg-white text-[#841b60] border-b-2 border-[#841b60]'
                  : 'text-gray-600 hover:text-[#841b60] hover:bg-white rounded-t-md'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Modifier
            </button>
            <button
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'settings'
                  ? 'bg-white text-[#841b60] border-b-2 border-[#841b60]'
                  : 'text-gray-600 hover:text-[#841b60] hover:bg-white rounded-t-md'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Paramètres
            </button>
            <button
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'send'
                  ? 'bg-white text-[#841b60] border-b-2 border-[#841b60]'
                  : 'text-gray-600 hover:text-[#841b60] hover:bg-white rounded-t-md'
              }`}
              onClick={() => setActiveTab('send')}
            >
              Envoyer ou planifier
            </button>
            <button
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'automate'
                  ? 'bg-white text-[#841b60] border-b-2 border-[#841b60]'
                  : 'text-gray-600 hover:text-[#841b60] hover:bg-white rounded-t-md'
              }`}
              onClick={() => setActiveTab('automate')}
            >
              Automatiser
            </button>
          </div>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="flex h-[calc(100vh-160px)]">
        {activeTab === 'edit' && (
          <DndContext onDragEnd={handleDragEnd}>
            <ModulesList />
            <EditorCanvas />
            <PropertiesPanel />
            <DragOverlay>{/* Preview during drag */}</DragOverlay>
          </DndContext>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 bg-white p-6 overflow-auto">
            <SettingsTab />
          </div>
        )}

        {activeTab === 'send' && (
          <div className="flex-1 p-6 bg-white text-gray-600">
            <h2>Envoyer ou planifier</h2>
          </div>
        )}

        {activeTab === 'automate' && (
          <div className="flex-1 p-6 bg-white text-gray-600">
            <h2>Automatiser</h2>
          </div>
        )}
      </div>

      {/* Modale Aperçu */}
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        modules={modules}
      />
    </div>
  );
};

export default Newsletter;
