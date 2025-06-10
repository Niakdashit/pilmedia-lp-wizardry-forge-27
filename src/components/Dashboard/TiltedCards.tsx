
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Layout } from 'lucide-react';

const TiltedCards: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-5xl mx-auto">
        {/* Carte Mes campagnes - inclinée à gauche */}
        <Link 
          to="/campaigns" 
          className="group relative w-full transform -rotate-2 hover:-rotate-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="w-full bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl p-8 shadow-lg border border-pink-100/50 group-hover:shadow-pink-200/50 group-hover:border-pink-200/70 transition-all duration-300">
            {/* Glow effect au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <FolderOpen className="w-6 h-6 text-[#841b60]" />
                </div>
                <div className="text-xs text-pink-600/70 font-medium">Accès rapide</div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#841b60] transition-colors duration-300">
                  Mes campagnes
                </h3>
                <p className="text-sm text-gray-600">
                  Gérez et suivez toutes vos campagnes actives
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Carte Modèles - inclinée à droite */}
        <Link 
          to="/templates" 
          className="group relative w-full transform rotate-2 hover:rotate-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-8 shadow-lg border border-blue-100/50 group-hover:shadow-blue-200/50 group-hover:border-blue-200/70 transition-all duration-300">
            {/* Glow effect au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Layout className="w-6 h-6 text-[#841b60]" />
                </div>
                <div className="text-xs text-blue-600/70 font-medium">Inspiration</div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#841b60] transition-colors duration-300">
                  Modèles
                </h3>
                <p className="text-sm text-gray-600">
                  Découvrez nos modèles prêts à l'emploi
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TiltedCards;
