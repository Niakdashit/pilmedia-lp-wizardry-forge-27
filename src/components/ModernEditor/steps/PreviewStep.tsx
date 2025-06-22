
import React from 'react';
import { Eye, Monitor, Smartphone, Tablet } from 'lucide-react';

const PreviewStep: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Prévisualisez votre
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> campagne</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Visualisez le rendu final de votre campagne sur différents appareils 
              avant de la publier et de la partager avec votre audience.
            </p>
          </div>
        </div>

        {/* Preview Controls */}
        <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Aperçu multi-appareils</h3>
            </div>
            
            <div className="flex items-center space-x-2 bg-[#F8FAFC] p-1 rounded-lg border border-[#EDF3F7]">
              <button className="flex items-center space-x-2 px-3 py-2 bg-[#951B6D] text-white rounded-lg font-semibold text-sm">
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-[#64748B] hover:text-[#951B6D] rounded-lg font-semibold text-sm">
                <Tablet className="w-4 h-4" />
                <span>Tablette</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-[#64748B] hover:text-[#951B6D] rounded-lg font-semibold text-sm">
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>
            </div>
          </div>
          
          <div className="bg-[#F8FAFC] rounded-lg border border-[#EDF3F7] p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F8E9F0] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-[#951B6D]" />
              </div>
              <h4 className="text-lg font-bold text-[#141E29] mb-2">Aperçu en cours de développement</h4>
              <p className="text-[#64748B]">
                La prévisualisation de votre campagne apparaîtra ici
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button className="flex items-center space-x-2 px-6 py-3 text-[#64748B] hover:text-[#951B6D] transition-all duration-300 hover:bg-[#F3F6F9] rounded-xl border border-[#EDF3F7] font-semibold">
            <div className="w-1.5 h-1.5 bg-[#64748B] rounded-full"></div>
            <span>Retour</span>
          </button>
          
          <button className="flex items-center space-x-3 px-8 py-3 bg-[#951B6D] hover:bg-[#A020F0] text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
            <span>Publier</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
