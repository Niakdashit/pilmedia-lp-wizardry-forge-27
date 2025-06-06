import React from 'react';
import { BarChart2, AlertCircle, Plus } from 'lucide-react';
const Social: React.FC = () => {
  return <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-3">Réseaux sociaux</h1>
          <button className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl mb-3">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Publication
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Publications</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(post => <div key={post} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400">Image</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 mb-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>❤️ 245</span>
                          <span>💬 23</span>
                          <span>🔄 12</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Comparatif multi-réseaux</h2>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]">
                    <option>Likes</option>
                    <option>Commentaires</option>
                    <option>Partages</option>
                  </select>
                  <button className="px-4 py-2 bg-[#841b60] text-white font-medium rounded-lg hover:bg-[#6d164f] transition-colors duration-200">
                    Comparer
                  </button>
                </div>
                <div className="h-64 border border-gray-200 rounded-lg flex items-center justify-center">
                  <BarChart2 className="w-8 h-8 text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Alertes</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-50 text-red-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Baisse d'engagement</p>
                    <p className="text-sm">-15% cette semaine</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Commentaire négatif</p>
                    <p className="text-sm">2 nouveaux signalements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Performances</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Engagement moyen</span>
                  <span className="font-medium">4.8%</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Meilleur post</span>
                  <span className="font-medium">852 likes</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Portée totale</span>
                  <span className="font-medium">12.4k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Social;