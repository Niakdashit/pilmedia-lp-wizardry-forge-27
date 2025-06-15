
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Copy, Edit, Trash2, ArrowLeft, Zap, Target, Users, Filter } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';
import { getCampaignTypeIcon, CampaignType } from '../utils/campaignTypes';

interface GameTemplate {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  thumbnail: string;
  isPrivate: boolean;
  usageCount: number;
  createdAt: string;
  createdBy: string;
  tags: string[];
}

const AdminTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all');

  // Mock data
  const mockTemplates: GameTemplate[] = [
    {
      id: 'template1',
      name: 'Roue de la Fortune Luxe',
      description: 'Template premium avec design élégant pour secteur luxe',
      type: 'wheel',
      thumbnail: '/api/placeholder/300/200',
      isPrivate: false,
      usageCount: 23,
      createdAt: '2025-01-05',
      createdBy: 'Admin',
      tags: ['luxe', 'premium', 'élégant']
    },
    {
      id: 'template2',
      name: 'Quiz Marketing B2B',
      description: 'Quiz prêt à l\'emploi pour lead generation B2B',
      type: 'quiz',
      thumbnail: '/api/placeholder/300/200',
      isPrivate: true,
      usageCount: 8,
      createdAt: '2025-01-03',
      createdBy: 'Admin',
      tags: ['b2b', 'leads', 'professionnel']
    },
    {
      id: 'template3',
      name: 'Jackpot E-commerce',
      description: 'Jeu de jackpot optimisé pour sites e-commerce',
      type: 'quiz',
      thumbnail: '/api/placeholder/300/200',
      isPrivate: false,
      usageCount: 45,
      createdAt: '2024-12-28',
      createdBy: 'Admin',
      tags: ['ecommerce', 'conversion', 'promo']
    }
  ];

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesVisibility = 
      filterVisibility === 'all' ||
      (filterVisibility === 'private' && template.isPrivate) ||
      (filterVisibility === 'public' && !template.isPrivate);
    return matchesSearch && matchesType && matchesVisibility;
  });

  return (
    <div className="-mx-6 -mt-6">
      <PageHeader
        title="Modèles de Jeux"
        size="sm"
        actions={
          <div className="flex gap-x-4">
            <Link
              to="/admin"
              className="inline-flex items-center px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour Dashboard
            </Link>
            <button className="inline-flex items-center px-6 py-2.5 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base">
              <Plus className="w-5 h-5 mr-2" />
              Créer un Modèle
            </button>
          </div>
        }
      />

      <div className="px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Modèles</p>
                <p className="text-2xl font-bold text-gray-900">{mockTemplates.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Modèles Publics</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockTemplates.filter(t => !t.isPrivate).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Modèles Privés</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockTemplates.filter(t => t.isPrivate).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Utilisations Totales</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par nom, description ou tags..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tous les types</option>
                  <option value="quiz">Quiz</option>
                  <option value="wheel">Roue</option>
                  <option value="survey">Sondage</option>
                </select>

                <select
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  value={filterVisibility}
                  onChange={(e) => setFilterVisibility(e.target.value)}
                >
                  <option value="all">Toute visibilité</option>
                  <option value="public">Public</option>
                  <option value="private">Privé</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const CampaignIcon = getCampaignTypeIcon(template.type);
            return (
              <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <CampaignIcon />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.isPrivate 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {template.isPrivate ? 'Privé' : 'Public'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Utilisé {template.usageCount} fois</span>
                    <span>Par {template.createdBy}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(template.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle trouvé</h3>
            <p className="text-gray-500 mb-6">Aucun modèle ne correspond à votre recherche.</p>
            <button className="inline-flex items-center px-6 py-3 bg-[#841b60] text-white font-semibold rounded-xl hover:bg-[#6d164f] transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Créer le premier modèle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTemplates;
