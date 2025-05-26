import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Users, Target, ArrowUpRight, Calendar, Download } from 'lucide-react';
const Statistics: React.FC = () => {
  const [period, setPeriod] = useState('30');
  return <div className="-mx-6 -mt-6">
      <div className="relative h-[100px] bg-[#841b60] overflow-hidden">
        <div className="absolute inset-10 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-3">Statistiques</h1>
          <div className="flex space-x-2">
            <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-white/90 backdrop-blur-sm border-0 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 mb-3">
              <option value="7">7 derniers jours</option>
              <option value="30">30 derniers jours</option>
              <option value="90">90 derniers jours</option>
              <option value="365">Cette année</option>
            </select>
            
            <button className="px-4 py-2 bg-white/90 backdrop-blur-sm border-0 text-gray-700 rounded-xl hover:bg-white transition-colors duration-200 flex items-center mb-3">
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="10">
            <path d="M0 116L60 96.3C120 76.7 240 37.3 360 21.7C480 6 600 14 720 34.7C840 55.3 960 89.7 1080 96.3C1200 103 1320 82 1380 71.5L1440 61V116H1380C1320 116 1200 116 1080 116C960 116 840 116 720 116C600 116 480 116 360 116C240 116 120 116 60 116H0Z" fill="#ebf4f7" />
          </svg>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Participants Total</p>
                <h3 className="text-2xl font-bold mt-1">12,845</h3>
                <p className="text-green-500 text-sm mt-1">+12.5% vs période précédente</p>
              </div>
              <div className="bg-[#f8f0f5] p-3 rounded-lg">
                <Users className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Taux de Conversion</p>
                <h3 className="text-2xl font-bold mt-1">34.2%</h3>
                <p className="text-green-500 text-sm mt-1">+2.4% vs période précédente</p>
              </div>
              <div className="bg-[#f8f0f5] p-3 rounded-lg">
                <ArrowUpRight className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Campagnes Actives</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <p className="text-green-500 text-sm mt-1">+3 vs période précédente</p>
              </div>
              <div className="bg-[#f8f0f5] p-3 rounded-lg">
                <Target className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Durée Moyenne</p>
                <h3 className="text-2xl font-bold mt-1">3m 24s</h3>
                <p className="text-red-500 text-sm mt-1">-15s vs période précédente</p>
              </div>
              <div className="bg-[#f8f0f5] p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-[#841b60]" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Évolution des participations</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-sm bg-[#841b60] text-white rounded-lg">Participants</button>
                <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg">Taux de conversion</button>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
              <LineChart className="w-10 h-10 text-gray-300" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Répartition par type</h2>
            <div className="h-64 flex items-center justify-center">
              <PieChart className="w-10 h-10 text-gray-300" />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#841b60] mr-2"></div>
                  <span className="text-sm text-gray-600">Quiz</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2c7be5] mr-2"></div>
                  <span className="text-sm text-gray-600">Concours</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00b8d9] mr-2"></div>
                  <span className="text-sm text-gray-600">Sondage</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f5803e] mr-2"></div>
                  <span className="text-sm text-gray-600">Jeux</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Top Campagnes</h2>
            
            <div className="space-y-4">
              {[{
              name: 'Quiz Marketing Digital',
              type: 'quiz',
              participants: 1245,
              conversion: '68%'
            }, {
              name: 'Roue de la Fortune Soldes',
              type: 'wheel',
              participants: 1056,
              conversion: '54%'
            }, {
              name: 'Concours Photo Été',
              type: 'contest',
              participants: 867,
              conversion: '42%'
            }, {
              name: 'Sondage Satisfaction',
              type: 'survey',
              participants: 643,
              conversion: '38%'
            }].map((campaign, index) => <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#f8f0f5] flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-[#841b60]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{campaign.name}</p>
                      <p className="text-sm font-medium text-gray-600">{campaign.participants}</p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">{campaign.type}</p>
                      <p className="text-xs text-green-500">{campaign.conversion}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Sources de Trafic</h2>
            
            <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
              <BarChart3 className="w-10 h-10 text-gray-300" />
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#841b60] mr-2"></div>
                  <span className="text-sm text-gray-600">Réseaux sociaux</span>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2c7be5] mr-2"></div>
                  <span className="text-sm text-gray-600">Liens directs</span>
                </div>
                <span className="text-sm font-medium">22%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00b8d9] mr-2"></div>
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f5803e] mr-2"></div>
                  <span className="text-sm text-gray-600">Autres</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Statistics;