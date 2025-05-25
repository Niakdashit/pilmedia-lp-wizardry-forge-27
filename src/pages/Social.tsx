
import React, { useState } from 'react';
import { Share2, Calendar, TrendingUp, Users } from 'lucide-react';

const Social: React.FC = () => {
  const [posts] = useState([
    { id: 1, platform: 'Facebook', content: 'Participez à notre nouveau quiz !', scheduled: '2023-03-20 14:00', status: 'scheduled' },
    { id: 2, platform: 'Instagram', content: 'Tentez votre chance à la roue de la fortune !', scheduled: '2023-03-21 10:00', status: 'draft' },
    { id: 3, platform: 'Twitter', content: 'Nouveau jeu disponible maintenant !', scheduled: '2023-03-19 16:00', status: 'published' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Réseaux Sociaux</h1>
        <button className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white text-sm font-medium rounded-lg hover:bg-[#6d164f]">
          <Share2 className="w-4 h-4 mr-2" />
          Nouveau Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-[#841b60]" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Posts Programmés</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="text-2xl font-bold text-gray-800">+12%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Portée Totale</p>
              <p className="text-2xl font-bold text-gray-800">45,230</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Posts Récents</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.platform}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status === 'published' ? 'Publié' : 
                       post.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-2">{post.content}</p>
                  <p className="text-sm text-gray-500">Programmé le {post.scheduled}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
