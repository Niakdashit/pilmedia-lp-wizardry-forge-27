
import React from 'react';

interface ProductNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductNameInput: React.FC<ProductNameInputProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
      <h3 className="font-semibold text-[#141e29] mb-4">Nom du produit</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez le nom de votre produit ou campagne"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d] transition-colors"
      />
    </div>
  );
};

export default ProductNameInput;
