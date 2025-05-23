
import React, { useState } from 'react';
import { X, Smartphone, Monitor } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import { ModuleRenderer } from './ModuleRenderer';
import { NewsletterModule } from '../../types/newsletter';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: NewsletterModule[];
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, modules }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    config: { tension: 280, friction: 20 }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <animated.div 
        style={modalSpring}
        className={`bg-white rounded-lg shadow-xl ${
          viewMode === 'mobile' ? 'w-[375px]' : 'w-[90vw]'
        } h-[90vh] flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg ${
                viewMode === 'desktop' 
                  ? 'bg-[#841b60] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg ${
                viewMode === 'mobile' 
                  ? 'bg-[#841b60] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {modules.map((module) => (
              <ModuleRenderer key={module.id} module={module} />
            ))}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default PreviewModal;
