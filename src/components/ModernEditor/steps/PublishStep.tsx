
import React from 'react';
import { Sparkles, Globe, Share2, Download } from 'lucide-react';

const PublishStep: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Publiez votre
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> campagne</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Votre campagne est prête ! Choisissez comment vous souhaitez 
              la partager avec votre audience et commencez à engager vos visiteurs.
            </p>
          </div>
        </div>

        {/* Publication Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Web Publication */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Publication web</h3>
            </div>
            <p className="text-[#64748B] mb-6">
              Générez un lien unique pour intégrer votre campagne sur votre site web.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#EDF3F7]">
                <p className="text-sm text-[#64748B] font-medium">
                  URL de publication en cours de génération...
                </p>
              </div>
              <button className="w-full px-4 py-3 bg-[#951B6D] text-white rounded-xl font-bold hover:bg-[#A020F0] transition-colors">
                Générer l'URL
              </button>
            </div>
          </div>

          {/* Sharing Options */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Options de partage</h3>
            </div>
            <p className="text-[#64748B] mb-6">
              Partagez votre campagne sur les réseaux sociaux et par email.
            </p>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-[#F3F6F9] text-[#64748B] rounded-xl font-semibold hover:bg-[#EDF3F7] hover:text-[#951B6D] transition-colors border border-[#EDF3F7]">
                Partager sur Facebook
              </button>
              <button className="w-full px-4 py-3 bg-[#F3F6F9] text-[#64748B] rounded-xl font-semibold hover:bg-[#EDF3F7] hover:text-[#951B6D] transition-colors border border-[#EDF3F7]">
                Partager sur LinkedIn
              </button>
              <button className="w-full px-4 py-3 bg-[#F3F6F9] text-[#64748B] rounded-xl font-semibold hover:bg-[#EDF3F7] hover:text-[#951B6D] transition-colors border border-[#EDF3F7]">
                Envoyer par email
              </button>
            </div>
          </div>
        </div>

        {/* Success State */}
        <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#F8E9F0] rounded-xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#951B6D]" />
          </div>
          <h3 className="text-2xl font-bold text-[#141E29] mb-4">
            Félicitations ! Votre campagne est prête
          </h3>
          <p className="text-[#64748B] mb-8 max-w-2xl mx-auto">
            Vous avez créé une expérience interactive unique qui captivera votre audience. 
            Il ne vous reste plus qu'à la partager avec le monde !
          </p>
          
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-[#951B6D] hover:bg-[#A020F0] text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
              <Globe className="w-5 h-5" />
              <span>Publier maintenant</span>
            </button>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-[#F3F6F9] text-[#64748B] hover:text-[#951B6D] rounded-xl font-bold transition-all duration-300 hover:bg-[#EDF3F7] border border-[#EDF3F7]">
              <Download className="w-5 h-5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
