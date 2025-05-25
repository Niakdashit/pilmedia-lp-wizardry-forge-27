
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Eye, Send, Save } from 'lucide-react';
import { ModulesList } from '../components/Newsletter/ModulesList';
import { EditorCanvas } from '../components/Newsletter/EditorCanvas';
import { PropertiesPanel } from '../components/Newsletter/PropertiesPanel';
import { useNewsletterStore } from '../stores/newsletterStore';
import PreviewModal from '../components/Newsletter/PreviewModal';
import { SettingsTab } from '@/components/Newsletter/properties/Tab/SettingsTab';

const Newsletter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'settings' | 'send' | 'automate'>('edit');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { addModule } = useNewsletterStore();

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

  // Mock campaign data for preview
  const mockCampaign = {
    name: 'Newsletter Test',
    description: 'Newsletter de test',
    design: {
      background: '#ffffff',
      primaryColor: '#841b60'
    }
  };

  return (
    <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
        
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

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            height="10"
          >
            <path
              d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z"
              fill="#ebf4f7"
            />
          </svg>
        </div>
      </div>

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

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        campaign={mockCampaign}
      />
    </div>
  );
};

export default Newsletter;
