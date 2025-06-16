
import React from 'react';

export const FooterModule: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 border border-gray-200 rounded">
      <div className="text-center text-sm text-gray-600">
        <p className="mb-2">Entreprise SAS - 123 rue de l'exemple, 75000 Paris</p>
        <p className="mb-2">Pour vous désabonner, <a href="#" className="text-[#841b60] underline">cliquez ici</a></p>
        <p>&copy; 2023 Tous droits réservés</p>
      </div>
    </div>
  );
};
