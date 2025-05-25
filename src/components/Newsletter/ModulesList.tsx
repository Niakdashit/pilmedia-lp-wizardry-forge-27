import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image as ImageIcon, Link as LinkIcon, Minus, Share2, Columns, Layout, Video, Quote, FilterIcon as FooterIcon, Code } from 'lucide-react';

const modules = [
  { id: 'header', label: 'En-tête', icon: <Layout className="w-5 h-5" />, description: 'Logo, titre et liens' },
  { id: 'text', label: 'Texte', icon: <Type className="w-5 h-5" />, description: 'Paragraphe avec mise en forme' },
  { id: 'image', label: 'Image', icon: <ImageIcon className="w-5 h-5" />, description: 'Image avec légende optionnelle' },
  { id: 'button', label: 'Bouton', icon: <LinkIcon className="w-5 h-5" />, description: "Bouton d'appel à l'action" },
  { id: 'divider', label: 'Séparateur', icon: <Minus className="w-5 h-5" />, description: 'Ligne de séparation' },
  { id: 'columns', label: 'Colonnes', icon: <Columns className="w-5 h-5" />, description: 'Disposition en 2 ou 3 colonnes' },
  { id: 'social', label: 'Réseaux sociaux', icon: <Share2 className="w-5 h-5" />, description: 'Liens vers vos profils sociaux' },
  { id: 'footer', label: 'Pied de page', icon: <FooterIcon className="w-5 h-5" />, description: 'Coordonnées et mentions légales' },
  { id: 'video', label: 'Vidéo', icon: <Video className="w-5 h-5" />, description: 'Intégration de vidéo' },
  { id: 'testimonial', label: 'Témoignage', icon: <Quote className="w-5 h-5" />, description: 'Citation avec photo et nom' },
  { id: 'html', label: 'HTML', icon: <Code className="w-5 h-5" />, description: 'Code HTML personnalisé' },
];

function DraggableModule({ id, label, icon, description }: typeof modules[number]) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white border border-gray-200 rounded-lg p-4 cursor-grab transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'hover:border-[#841b60] hover:shadow-md'
      }`}
    >
      <div className="flex items-center">
        <div className="text-gray-400 mr-3">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-800">{label}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export const ModulesList: React.FC = () => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg text-gray-800">Modules</h2>
        <p className="text-sm text-gray-500">Glissez les éléments dans l'éditeur</p>
      </div>

      <div className="p-4 space-y-3">
        {modules.map((module) => (
          <DraggableModule key={module.id} {...module} />
        ))}
      </div>
    </div>
  );
};