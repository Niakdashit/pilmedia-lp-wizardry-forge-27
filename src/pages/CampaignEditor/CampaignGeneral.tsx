{/* Update the type selector in CampaignGeneral.tsx */}
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