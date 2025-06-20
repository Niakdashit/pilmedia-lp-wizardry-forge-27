import React from 'react';
import Modal from './Modal';
import { generateEmbedSnippet } from '../../utils/embedSnippet';

interface EmbedCodeModalProps {
  campaignId: string;
  onClose: () => void;
}

const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ campaignId, onClose }) => {
  const snippet = generateEmbedSnippet(campaignId);
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).catch(() => {});
  };

  return (
    <Modal title="Code d'intégration" onClose={onClose}>
      <p className="mb-2 text-sm text-gray-600">
        Copiez ce code pour intégrer la campagne sur votre site :
      </p>
      <textarea
        className="w-full border rounded p-2 text-sm font-mono"
        value={snippet}
        readOnly
        rows={3}
        onFocus={(e) => e.currentTarget.select()}
      />
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleCopy}
      >
        Copier
      </button>
    </Modal>
  );
};

export default EmbedCodeModal;
