
import React from 'react';
import { FileText, Type } from 'lucide-react';

const WordingStep: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Personnalisez vos
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> textes</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Rédigez les messages qui accompagneront votre campagne et 
              guideront vos participants tout au long de leur expérience.
            </p>
          </div>
        </div>

        {/* Text Configuration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Welcome Messages */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Messages d'accueil</h3>
            </div>
            <p className="text-[#64748B] mb-6">
              Configurez les textes qui apparaîtront à l'arrivée de vos visiteurs.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#EDF3F7]">
                <p className="text-sm text-[#64748B] font-medium">
                  Éditeur de textes en cours de développement...
                </p>
              </div>
            </div>
          </div>

          {/* Result Messages */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Type className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Messages de résultat</h3>
            </div>
            <p className="text-[#64748B] mb-6">
              Définissez les messages qui s'afficheront selon les résultats du jeu.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#EDF3F7]">
                <p className="text-sm text-[#64748B] font-medium">
                  Configuration des messages en cours de développement...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-12">
          <button className="flex items-center space-x-2 px-6 py-3 text-[#64748B] hover:text-[#951B6D] transition-all duration-300 hover:bg-[#F3F6F9] rounded-xl border border-[#EDF3F7] font-semibold">
            <div className="w-1.5 h-1.5 bg-[#64748B] rounded-full"></div>
            <span>Retour</span>
          </button>
          
          <button className="flex items-center space-x-3 px-8 py-3 bg-[#951B6D] hover:bg-[#A020F0] text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
            <span>Continuer</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordingStep;
