
import React from 'react';
import { useNewsletterStore } from '@/stores/newsletterStore';
import { Trash2, GripVertical, ChevronUp, ChevronDown, Copy } from 'lucide-react';

interface ModuleRendererProps {
  module: any;
}

export const ModuleRenderer: React.FC<ModuleRendererProps> = ({ module }) => {
  const { updateModule, removeModule, selectModule, modules } = useNewsletterStore();

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = modules.findIndex(m => m.id === module.id);
    if (currentIndex > 0) {
      const newModules = [...modules];
      [newModules[currentIndex], newModules[currentIndex - 1]] = [newModules[currentIndex - 1], newModules[currentIndex]];
      // Réorganiser via le store
    }
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = modules.findIndex(m => m.id === module.id);
    if (currentIndex < modules.length - 1) {
      const newModules = [...modules];
      [newModules[currentIndex], newModules[currentIndex + 1]] = [newModules[currentIndex + 1], newModules[currentIndex]];
      // Réorganiser via le store
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { addModule } = useNewsletterStore.getState();
    addModule({
      id: `module-${Date.now()}`,
      type: module.type,
      content: module.content,
      settings: { ...module.settings }
    });
  };

  return (
    <div 
      className="relative p-4 border border-gray-200 rounded-lg mb-4 group hover:border-[#841b60] transition-colors duration-200"
      onClick={() => selectModule(module.id)}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
        <button
          onClick={handleMoveUp}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleMoveDown}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <button
          onClick={handleDuplicate}
          className="p-1 text-gray-400 hover:text-[#841b60] rounded-lg transition-colors duration-200"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeModule(module.id);
          }}
          className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="pl-6 pr-24">
        {module.type === 'text' && (
          <div className="w-full p-4 border border-gray-200 rounded bg-white">
            <div 
              className="min-h-[60px] whitespace-pre-wrap"
              style={{ fontSize: '14px', lineHeight: '1.5' }}
            >
              {module.content || 'Cliquez pour modifier ce texte...'}
            </div>
          </div>
        )}

        {module.type === 'image' && (
          <div className="space-y-2">
            {module.content ? (
              <img
                src={module.content}
                alt=""
                className="max-w-full h-auto rounded border"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-500">Image - URL à configurer</span>
              </div>
            )}
          </div>
        )}

        {module.type === 'button' && (
          <div className="text-center">
            <button className="px-6 py-3 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
              {module.content || 'Bouton'}
            </button>
          </div>
        )}

        {module.type === 'divider' && (
          <hr className="border-t-2 border-gray-300 my-4" />
        )}

        {module.type === 'header' && (
          <div className="bg-white p-6 border border-gray-200 rounded">
            <div className="flex justify-between items-center">
              <div className="w-32 h-10 bg-[#841b60] rounded flex items-center justify-center text-white font-bold">
                LOGO
              </div>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-[#841b60] hover:underline">Accueil</a>
                <a href="#" className="text-[#841b60] hover:underline">Produits</a>
                <a href="#" className="text-[#841b60] hover:underline">Contact</a>
              </div>
            </div>
          </div>
        )}

        {module.type === 'footer' && (
          <div className="bg-gray-50 p-6 border border-gray-200 rounded">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">Entreprise SAS - 123 rue de l'exemple, 75000 Paris</p>
              <p className="mb-2">Pour vous désabonner, <a href="#" className="text-[#841b60] underline">cliquez ici</a></p>
              <p>&copy; 2023 Tous droits réservés</p>
            </div>
          </div>
        )}

        {module.type === 'social' && (
          <div className="text-center bg-white p-4 border border-gray-200 rounded">
            <p className="mb-4 text-sm text-gray-600">Suivez-nous sur les réseaux sociaux</p>
            <div className="flex justify-center space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((network) => (
                <div
                  key={network}
                  className="w-10 h-10 rounded-full bg-[#841b60] flex items-center justify-center text-white text-xs font-bold"
                >
                  {network[0]}
                </div>
              ))}
            </div>
          </div>
        )}

        {module.type === 'columns' && (
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${module.settings?.columns || 2}, 1fr)` }}>
            {Array.from({ length: module.settings?.columns || 2 }).map((_, index) => {
              let columnContent = '';
              try {
                const parsedContent = JSON.parse(module.content || '[]');
                columnContent = Array.isArray(parsedContent) ? (parsedContent[index] || `Contenu colonne ${index + 1}`) : `Contenu colonne ${index + 1}`;
              } catch {
                columnContent = index === 0 ? (module.content || `Contenu colonne ${index + 1}`) : `Contenu colonne ${index + 1}`;
              }
              
              return (
                <div key={index} className="border border-gray-200 rounded p-4 bg-white">
                  <div className="min-h-[80px]">
                    {columnContent}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {module.type === 'html' && (
          <div className="bg-white border border-gray-200 rounded p-4">
            <div
              className="bg-gray-50 p-4 border rounded min-h-[60px]"
              dangerouslySetInnerHTML={{ __html: String(module.content || '<p>Code HTML personnalisé</p>') }}
            />
          </div>
        )}

        {module.type === 'video' && (
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  ▶
                </div>
                <span>Vidéo - URL à configurer</span>
              </div>
            </div>
          </div>
        )}

        {module.type === 'testimonial' && (
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "{module.content || 'Un témoignage client fantastique...'}"
              </blockquote>
              <cite className="text-sm font-semibold text-gray-600">
                - {module.settings?.author || 'Nom du client'}
              </cite>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleRenderer;
