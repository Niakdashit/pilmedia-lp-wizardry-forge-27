import React, { useState } from 'react';
import { Calendar, Download, ChevronRight } from 'lucide-react';

const Studies: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string[]>([]);
  
  const marketingEvents = [
    { id: '1', name: 'Saint-Valentin', date: '14 février' },
    { id: '2', name: 'Soldes d\'été', date: '28 juin' },
    { id: '3', name: 'Black Friday', date: '29 novembre' },
    { id: '4', name: 'Noël', date: '25 décembre' },
  ];
  
  const toggleEvent = (id: string) => {
    setSelectedEvent(prev => 
      prev.includes(id) 
        ? prev.filter(eventId => eventId !== id)
        : [...prev, id]
    );
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
          <h1 className="text-3xl font-bold text-white">Études</h1>
          <button className="inline-flex items-center px-6 py-3 bg-white text-[#841b60] font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Download className="w-5 h-5 mr-2" />
            Télécharger le rapport
          </button>
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

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Publication hebdomadaire</h2>
              <div className="prose max-w-none">
                <h3>Tendances du marché - Mai 2025</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4>Points clés :</h4>
                <ul>
                  <li>Augmentation de 25% des ventes en ligne</li>
                  <li>Nouvelles réglementations RGPD</li>
                  <li>Émergence des achats via réseaux sociaux</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Résumé de veille</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#841b60] pl-4">
                  <h3 className="font-medium text-gray-800">Tendances du marché</h3>
                  <p className="text-gray-600 mt-1">
                    Les consommateurs privilégient de plus en plus les marques engagées 
                    dans le développement durable. 73% des millennials sont prêts à payer plus 
                    cher pour des produits éco-responsables.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#841b60] pl-4">
                  <h3 className="font-medium text-gray-800">Analyse concurrentielle</h3>
                  <p className="text-gray-600 mt-1">
                    Lancement d'une nouvelle gamme de produits par le concurrent principal. 
                    Forte présence sur TikTok avec une campagne virale atteignant 2M de vues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Calendrier marketing</h2>
              <div className="space-y-3">
                {marketingEvents.map(event => (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#841b60] transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">{event.name}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedEvent.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#841b60]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#841b60]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Axes stratégiques</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#f8f0f5] rounded-lg">
                  <h3 className="font-medium text-[#841b60] mb-2">
                    Promotion Saint-Valentin
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lancer une campagne spéciale couples avec des codes promo personnalisés.
                  </p>
                  <button className="mt-3 text-sm text-[#841b60] hover:text-[#6d164f] font-medium flex items-center">
                    En savoir plus
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="p-4 bg-[#f8f0f5] rounded-lg">
                  <h3 className="font-medium text-[#841b60] mb-2">
                    Campagne UGC
                  </h3>
                  <p className="text-sm text-gray-600">
                    Encourager les utilisateurs à partager leurs expériences sur les réseaux sociaux.
                  </p>
                  <button className="mt-3 text-sm text-[#841b60] hover:text-[#6d164f] font-medium flex items-center">
                    En savoir plus
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studies;
