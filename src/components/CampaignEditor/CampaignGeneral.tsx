
import React from 'react';
import { Calendar, Link as LinkIcon, Clock } from 'lucide-react';

interface CampaignGeneralProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignGeneral: React.FC<CampaignGeneralProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaign((prev: any) => ({ ...prev, [name]: value }));
  };
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase()
      .replace(/\s+/g, '-')       
      .replace(/[^\w\-]+/g, '')   
      .replace(/\-\-+/g, '-')     
      .replace(/^-+/, '')         
      .replace(/-+$/, '');        
    
    setCampaign((prev: any) => ({ ...prev, url: value }));
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Configurez votre
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> campagne</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Définissez les informations essentielles de votre campagne pour créer 
              une expérience personnalisée et engageante.
            </p>
          </div>
        </div>

        {/* Configuration Cards */}
        <div className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Informations générales</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#141E29] mb-2">
                  Nom de la campagne
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={campaign.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  placeholder="Ex: Quiz Marketing Digital"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-[#141E29] mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={campaign.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] resize-none"
                  placeholder="Décrivez brièvement l'objectif et le contenu de votre campagne..."
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-semibold text-[#141E29] mb-2">
                  URL de la campagne
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#64748B] font-medium">
                    leadya.com/c/
                  </div>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={campaign.url}
                    onChange={handleUrlChange}
                    className="w-full pl-[7rem] pr-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                    placeholder="votre-campagne"
                  />
                </div>
                <p className="mt-2 text-sm text-[#64748B] font-medium">
                  Cette URL sera utilisée pour accéder à votre campagne.
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Planification</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold text-[#141E29] mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={campaign.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
                
                <div>
                  <label htmlFor="startTime" className="block text-sm font-semibold text-[#141E29] mb-2">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={campaign.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="endDate" className="block text-sm font-semibold text-[#141E29] mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={campaign.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-semibold text-[#141E29] mb-2">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={campaign.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Paramètres</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-[#141E29] mb-2">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  value={campaign.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                >
                  <option value="draft">Brouillon</option>
                  <option value="scheduled">Programmé</option>
                  <option value="active">Actif</option>
                  <option value="ended">Terminé</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-[#141E29] mb-2">
                  Type de campagne
                </label>
                <select
                  id="type"
                  name="type"
                  value={campaign.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                >
                  <option value="quiz">Quiz</option>
                  <option value="survey">Sondage</option>
                  <option value="contest">Concours</option>
                  <option value="wheel">Roue de la fortune</option>
                  <option value="scratch">Carte à gratter</option>
                  <option value="memory">Jeu de mémoire</option>
                  <option value="form">Formulaire dynamique</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="dice">Dés chanceux</option>
                  <option value="jackpot">Jackpot</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignGeneral;
