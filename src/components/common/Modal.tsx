
import React from 'react';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  contained?: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, width = 'max-w-md', contained = false }) => {
  return (
    <div className={`${contained ? 'absolute' : 'fixed'} inset-0 ${contained ? 'z-30' : 'z-50'} flex items-center justify-center bg-black/40`}>
      {/* Container modal responsive */}
      <div 
        className={`bg-white rounded-xl shadow-xl w-full ${width} relative max-h-[95vh] overflow-hidden`}
        style={{
          // Responsive mobile - assure que la modal ne dépasse jamais
          margin: '10px',
          maxWidth: contained ? 'calc(100vw - 20px)' : 'calc(100vw - 20px)',
          maxHeight: contained ? 'calc(100vh - 20px)' : 'calc(100vh - 20px)'
        }}
      >
        {/* Bouton de fermeture */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold z-10"
          onClick={onClose}
          aria-label="Fermer"
          type="button"
        >
          ×
        </button>
        
        {/* Titre */}
        {title && (
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-lg font-semibold pr-8">{title}</h3>
          </div>
        )}
        
        {/* Contenu avec scroll si nécessaire */}
        <div 
          className="px-6 pb-6 pt-2 overflow-y-auto"
          style={{
            maxHeight: title ? 'calc(95vh - 120px)' : 'calc(95vh - 80px)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
