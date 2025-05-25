
import React from 'react';

interface CampaignGeneralProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const CampaignGeneral: React.FC<CampaignGeneralProps> = ({ campaign, setCampaign }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaign((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la campagne
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={campaign.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={campaign.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type de campagne
        </label>
        <select
          id="type"
          name="type"
          value={campaign.type}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
        >
          <option value="quiz">Quiz</option>
          <option value="survey">Sondage</option>
          <option value="contest">Concours</option>
          <option value="wheel">Roue de la fortune</option>
          <option value="scratch">Carte à gratter</option>
          <option value="memory">Jeu de mémoire</option>
          <option value="form">Formulaire dynamique</option>
          <option value="puzzle">Puzzle</option>
          <option value="dice">Dés chanceux</option>
        </select>
      </div>
    </div>
  );
};

export default CampaignGeneral;
