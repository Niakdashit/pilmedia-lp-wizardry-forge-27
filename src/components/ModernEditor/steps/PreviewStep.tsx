
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Smartphone, Monitor, Tablet, Play, Share2, Download } from 'lucide-react';

const PreviewStep: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);

  const devices = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, dimensions: '1200x800' },
    { id: 'tablet', name: 'Tablette', icon: Tablet, dimensions: '768x1024' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, dimensions: '375x812' }
  ];

  const playPreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const getDeviceStyle = () => {
    switch (selectedDevice) {
      case 'tablet':
        return { width: '400px', height: '500px' };
      case 'mobile':
        return { width: '300px', height: '600px' };
      default:
        return { width: '800px', height: '500px' };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2 flex items-center">
          <Eye className="w-6 h-6 mr-2 text-[#841b60]" />
          Aperçu de la campagne
        </h2>

        {/* Sélecteur d'appareil */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    selectedDevice === device.id
                      ? 'bg-white text-[#841b60] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{device.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zone d'aperçu */}
        <div className="flex justify-center mb-8">
          <div 
            className="bg-gray-900 rounded-lg p-4 shadow-2xl transition-all duration-300"
            style={getDeviceStyle()}
          >
            <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
              {/* Simulation de contenu */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-[#841b60] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  Votre campagne interactive
                </h3>
                
                <p className="text-gray-600 text-center mb-6 text-sm">
                  Tentez votre chance et gagnez de superbes prix !
                </p>

                {/* Simulation du jeu */}
                <div className="mb-6">
                  <div 
                    className={`w-24 h-24 rounded-full border-4 border-[#841b60] transition-transform duration-1000 ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{
                      background: 'conic-gradient(#841b60 0deg 60deg, white 60deg 120deg, #841b60 120deg 180deg, white 180deg 240deg, #841b60 240deg 300deg, white 300deg 360deg)'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs font-bold">SPIN</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={playPreview}
                  disabled={isPlaying}
                  className={`flex items-center space-x-2 px-6 py-3 bg-[#841b60] text-white rounded-lg transition-all ${
                    isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6d164f] hover:shadow-lg'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{isPlaying ? 'En cours...' : 'Jouer'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informations sur l'appareil */}
        <div className="text-center text-sm text-gray-600 mb-6">
          Résolution : {devices.find(d => d.id === selectedDevice)?.dimensions}
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Partager</span>
          </button>
          
          <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Télécharger</span>
          </button>
        </div>

        {/* Statistiques de performance */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Compatibilité mobile</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">1.2s</div>
            <div className="text-sm text-gray-600">Temps de chargement</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">A+</div>
            <div className="text-sm text-gray-600">Score de performance</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreviewStep;
