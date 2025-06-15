
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, Edit3 } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'button';
  content: string;
  position: { x: number; y: number };
}

const ContentStep: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    { id: '1', type: 'text', content: 'Titre principal', position: { x: 50, y: 20 } },
    { id: '2', type: 'text', content: 'Description de la campagne', position: { x: 50, y: 40 } },
    { id: '3', type: 'button', content: 'Jouer maintenant', position: { x: 50, y: 70 } }
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  const addContentItem = (type: 'text' | 'image' | 'button') => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'Nouveau texte' : type === 'button' ? 'Nouveau bouton' : 'Image',
      position: { x: 50, y: 50 }
    };
    setContentItems([...contentItems, newItem]);
  };

  const updateContent = (id: string, content: string) => {
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { ...item, content } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setContentItems(items => items.filter(item => item.id !== id));
  };

  const startEdit = (item: ContentItem) => {
    setSelectedItem(item.id);
    setEditingContent(item.content);
  };

  const saveEdit = () => {
    if (selectedItem) {
      updateContent(selectedItem, editingContent);
      setSelectedItem(null);
      setEditingContent('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-[#841b60]" />
          Contenu de la campagne
        </h2>

        {/* Toolbar */}
        <div className="mb-6 flex space-x-3">
          <button
            onClick={() => addContentItem('text')}
            className="flex items-center space-x-2 px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter du texte</span>
          </button>
          <button
            onClick={() => addContentItem('button')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un bouton</span>
          </button>
        </div>

        {/* Content Items List */}
        <div className="space-y-4">
          {contentItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'text' ? 'bg-green-500' :
                  item.type === 'button' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div>
                  <div className="font-medium text-gray-900 capitalize">{item.type}</div>
                  <div className="text-sm text-gray-600">{item.content}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-gray-600 hover:text-[#841b60] hover:bg-white rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Modifier le contenu</h3>
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ContentStep;
