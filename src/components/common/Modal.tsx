import React from 'react';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  contained?: boolean; // Limite la modale au conteneur parent (device)
  noOverlay?: boolean; // Retire le masque de fond
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  width = 'max-w-md',
  contained = false,
  noOverlay = false
}) => {
  // Si contained, la modale prend 100% du parent, sinon full viewport
  const containerClass = contained
    ? 'absolute inset-0 z-30 flex items-center justify-center bg-black/10' // léger overlay dans le device
    : `fixed inset-0 z-50 flex items-center justify-center ${noOverlay ? '' : 'bg-black/40'}`;

  // Largeur responsive : si contained, adapte à la largeur device
  const modalWidth = contained ? 'w-[92%] max-w-xs sm:max-w-sm' : `w-full ${width}`;

  return (
    <div className={containerClass}>
      <div className={`bg-white rounded-xl shadow-xl ${modalWidth} relative mx-2`}>
        {/* Bouton de fermeture */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Fermer"
          type="button"
        >
          ×
        </button>
        {/* Titre */}
        {title && (
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        {/* Contenu */}
        <div className="px-6 pb-6 pt-2 max-h-80 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
