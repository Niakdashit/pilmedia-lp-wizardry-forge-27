
import React from 'react';
import { X } from 'lucide-react';

interface NewsletterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const NewsletterPreviewModal: React.FC<NewsletterPreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Aperçu de la newsletter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-gray-100 p-4 rounded">
            <p>Aperçu de la campagne: {campaign?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPreviewModal;
