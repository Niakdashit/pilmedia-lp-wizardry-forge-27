
import { 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon, 
  Minus, 
  Share2, 
  Code,
  Layout,
  ListCollapse,
  Eye,
  BarChart3,
  LogIn,
  Video,
  Quote
} from 'lucide-react';

export const emailModules = [
  {
    id: 'logo-header',
    type: 'logo-header',
    icon: <Layout className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Logo + Titre',
    category: 'header'
  },
  {
    id: 'hero-image',
    type: 'hero-image',
    icon: <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Image principale',
    category: 'header'
  },
  {
    id: 'text',
    type: 'text',
    icon: <Type className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Texte',
    category: 'content'
  },
  {
    id: 'image',
    type: 'image',
    icon: <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Image',
    category: 'content'
  },
  {
    id: 'button',
    type: 'button',
    icon: <LinkIcon className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Bouton',
    category: 'content'
  },
  {
    id: 'divider',
    type: 'divider',
    icon: <Minus className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Séparateur',
    category: 'content'
  },
  {
    id: 'accordion',
    type: 'accordion',
    icon: <ListCollapse className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Accordéon',
    category: 'content'
  },
  {
    id: 'video',
    type: 'video',
    icon: <Video className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Vidéo',
    category: 'content'
  },
  {
    id: 'testimonial',
    type: 'testimonial',
    icon: <Quote className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Témoignage',
    category: 'content'
  },
  {
    id: 'tracking-pixel',
    type: 'tracking-pixel',
    icon: <Eye className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Pixel invisible',
    category: 'analytics'
  },
  {
    id: 'quick-poll',
    type: 'quick-poll',
    icon: <BarChart3 className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Sondage rapide',
    category: 'engagement'
  },
  {
    id: 'social',
    type: 'social',
    icon: <Share2 className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Réseaux sociaux',
    category: 'footer'
  },
  {
    id: 'unsubscribe',
    type: 'unsubscribe',
    icon: <LogIn className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'Désinscription',
    category: 'footer'
  },
  {
    id: 'html',
    type: 'html',
    icon: <Code className="w-6 h-6 text-gray-400 mb-2" />,
    label: 'HTML',
    category: 'advanced'
  }
];

export const moduleCategories = [
  { id: 'header', label: 'En-tête' },
  { id: 'content', label: 'Contenu' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'analytics', label: 'Analytique' },
  { id: 'footer', label: 'Pied de page' },
  { id: 'advanced', label: 'Avancé' }
];
