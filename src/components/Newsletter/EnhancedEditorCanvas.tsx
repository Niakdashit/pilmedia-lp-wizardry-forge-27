
import React, { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNewsletterStore } from '@/stores/newsletterStore';
import { SortableModule } from './SortableModule';
import { Plus, Save, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EnhancedEditorCanvas: React.FC = () => {
  const { modules, generatedHTML, setFromGeneratedHTML } = useNewsletterStore();
  const { setNodeRef, isOver } = useDroppable({ id: 'editor' });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Auto-sauvegarde toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (modules.length > 0) {
        setAutoSaveStatus('saving');
        setTimeout(() => {
          setLastSaved(new Date());
          setAutoSaveStatus('saved');
          setTimeout(() => setAutoSaveStatus('idle'), 2000);
        }, 1000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [modules]);

  useEffect(() => {
    if (generatedHTML) {
      setFromGeneratedHTML(generatedHTML);
    }
  }, [generatedHTML, setFromGeneratedHTML]);

  const formatLastSaved = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-y-auto relative">
      {/* Auto-save indicator */}
      <motion.div 
        className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {autoSaveStatus === 'saving' && (
          <div className="flex items-center space-x-2 text-blue-600">
            <Clock className="w-4 h-4 animate-spin" />
            <span className="text-sm">Sauvegarde...</span>
          </div>
        )}
        {autoSaveStatus === 'saved' && (
          <motion.div 
            className="flex items-center space-x-2 text-green-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Save className="w-4 h-4" />
            <span className="text-sm">Sauvegardé</span>
          </motion.div>
        )}
        {autoSaveStatus === 'idle' && lastSaved && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Dernière sauvegarde : {formatLastSaved(lastSaved)}</span>
          </div>
        )}
      </motion.div>

      <div className="max-w-[800px] mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Subject line */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#841b60]/5 to-[#841b60]/10">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Objet de l'email
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent transition-all duration-200"
              placeholder="Saisissez l'objet de votre newsletter..."
            />
          </div>

          {/* Canvas content */}
          <div
            ref={setNodeRef}
            className={`min-h-[600px] p-6 transition-all duration-300 ${
              isOver 
                ? 'bg-gradient-to-br from-[#841b60]/5 to-[#841b60]/10 border-2 border-dashed border-[#841b60]' 
                : 'bg-white'
            }`}
          >
            <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
              <AnimatePresence mode="popLayout">
                {modules.length === 0 ? (
                  <motion.div 
                    className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="text-center text-gray-500 space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-2">Créez votre newsletter</p>
                        <p className="text-sm">Glissez et déposez des modules depuis la barre latérale</p>
                        <p className="text-xs text-gray-400 mt-2">ou cliquez sur un module pour l'ajouter</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <motion.div
                        key={module.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <SortableModule module={module} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </SortableContext>

            {/* Drop zone indicator */}
            {isOver && (
              <motion.div
                className="absolute inset-4 border-2 border-dashed border-[#841b60] rounded-xl bg-[#841b60]/5 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center text-[#841b60]">
                  <Plus className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                  <p className="font-semibold">Déposez le module ici</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
