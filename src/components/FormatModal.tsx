import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FormatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormatModal: React.FC<FormatModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectFormat = (format: string) => {
    onClose();
    navigate(`/dashboard/campaign/new?type=${format}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Quel format de campagne souhaitez-vous créer ?</h2>
        <p className="text-xs text-gray-500">Vous pourrez personnaliser votre campagne après ce choix.</p>
        <div className="grid grid-cols-1 gap-4">
          <button 
            className="px-6 py-3 text-sm md:text-base rounded-md shadow-sm transition bg-[#841b60] text-white hover:bg-[#6d1750] w-full"
            onClick={() => handleSelectFormat('quiz')}
          >
            🎯 Quiz
          </button>
          <button 
            className="bg-[#841b60] hover:bg-[#6d1750] text-white px-4 py-2 rounded-lg transition"
            onClick={() => handleSelectFormat('contest')}
          >
            🎁 Instants gagnants
          </button>
          <button 
            className="bg-[#841b60] hover:bg-[#6d1750] text-white px-4 py-2 rounded-lg transition"
            onClick={() => handleSelectFormat('form')}
          >
            📝 Formulaire
          </button>
          <button 
            className="bg-[#841b60] hover:bg-[#6d1750] text-white px-4 py-2 rounded-lg transition"
            onClick={() => handleSelectFormat('other')}
          >
            📦 Autre
          </button>
          <button 
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormatModal;