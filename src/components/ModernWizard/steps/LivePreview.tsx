
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet, Play, RefreshCw } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';

interface LivePreviewProps {
  campaignData: CampaignData;
  onNext: () => void;
  onBack: () => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  campaignData,
  onNext,
  onBack
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isPlaying, setIsPlaying] = useState(false);

  const devices = [
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: 'w-80', height: 'h-96' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: 'w-96', height: 'h-80' },
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: 'w-full', height: 'h-96' }
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const renderGamePreview = () => {
    const generatedContent = campaignData.generatedContent || {};
    
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        {/* Logo */}
        <div className="mb-4">
          {campaignData.logo ? (
            typeof campaignData.logo === 'string' ? (
              <img src={campaignData.logo} alt="Logo" className="h-12 w-auto max-w-32" />
            ) : (
              <img 
                src={URL.createObjectURL(campaignData.logo)} 
                alt="Logo" 
                className="h-12 w-auto max-w-32" 
              />
            )
          ) : (
            <div className="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">Logo</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          {generatedContent.gameTitle || campaignData.slogan || 'Game Title'}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 text-center max-w-xs">
          {generatedContent.welcomeMessage || 'Welcome to our amazing game!'}
        </p>

        {/* Game Area */}
        <div className="mb-6">
          {campaignData.gameType === 'wheel' ? (
            <div className="relative">
              <div 
                className={`w-32 h-32 rounded-full border-8 transition-transform duration-3000 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ 
                  borderColor: campaignData.mainColor,
                  background: `conic-gradient(
                    ${campaignData.mainColor} 0deg 45deg,
                    white 45deg 90deg,
                    ${campaignData.mainColor} 90deg 135deg,
                    white 135deg 180deg,
                    ${campaignData.mainColor} 180deg 225deg,
                    white 225deg 270deg,
                    ${campaignData.mainColor} 270deg 315deg,
                    white 315deg 360deg
                  )`
                }}
              >
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">SPIN</span>
                </div>
              </div>
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent"
                style={{ borderBottomColor: campaignData.mainColor }}
              />
            </div>
          ) : campaignData.gameType === 'quiz' ? (
            <div className="bg-white rounded-xl p-4 shadow-lg border-2" style={{ borderColor: campaignData.mainColor }}>
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Sample Question</div>
                <div className="text-sm text-gray-600 mb-4">What is your favorite feature?</div>
                <div className="space-y-2">
                  {['Option A', 'Option B', 'Option C'].map((option, index) => (
                    <button 
                      key={index}
                      className="w-full p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="w-32 h-32 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: campaignData.mainColor }}
            >
              {campaignData.gameType?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Play Button */}
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-6 py-3 rounded-xl font-medium text-white transition-all flex items-center space-x-2 ${
            isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${campaignData.mainColor}, ${campaignData.brandConfig?.secondaryColor || campaignData.mainColor})` 
          }}
        >
          {isPlaying ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Playing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>{campaignData.generatedContent?.buttonTexts?.play || 'Play Game'}</span>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Live Preview
        </h1>
        <p className="text-lg text-gray-600">
          Test your interactive campaign across different devices
        </p>
      </motion.div>

      {/* Device Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
          <div className="flex space-x-1">
            {devices.map((device) => {
              const Icon = device.icon;
              const isSelected = selectedDevice === device.id;
              
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#841b60] to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{device.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Preview Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
      >
        <div className="flex justify-center">
          <div className={`bg-gray-100 rounded-2xl p-4 ${
            selectedDevice === 'mobile' ? 'w-80 h-[600px]' :
            selectedDevice === 'tablet' ? 'w-[600px] h-96' :
            'w-full max-w-4xl h-96'
          } transition-all duration-300`}>
            <div className="w-full h-full bg-white rounded-xl shadow-inner overflow-hidden">
              {renderGamePreview()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#841b60] mb-2">98%</div>
          <div className="text-sm text-gray-600">Mobile Compatibility</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#841b60] mb-2">2.1s</div>
          <div className="text-sm text-gray-600">Load Time</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
          <div className="text-2xl font-bold text-[#841b60] mb-2">A+</div>
          <div className="text-sm text-gray-600">Performance Score</div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-[#841b60] to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
        >
          Finalize & Publish →
        </button>
      </div>
    </div>
  );
};

export default LivePreview;
