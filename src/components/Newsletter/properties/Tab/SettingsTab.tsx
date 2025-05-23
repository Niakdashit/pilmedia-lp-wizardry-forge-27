import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface SettingsTabProps {
  selectedModule: any;
  onUpdateModule: (id: string, updates: Partial<any>) => void;
  onDeleteModule: (id: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = () => {
  const [settings, setSettings] = useState({
    senderName: "Leadya Marketing",
    senderEmail: "marketing@leadya.com",
    replyToEmail: "no-reply@leadya.com",
    subject: "Newsletter mensuelle Leadya",
    previewText: "Découvrez nos dernières actualités et offres exclusives",
    templateWidth: "600",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
    fontColor: "#333333",
    linkColor: "#841b60",
    socialMediaLinks: true
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings({ ...settings, [name]: checked });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };
  
  const handleSave = () => {
    // Enregistrer les paramètres
    console.log('Settings saved:', settings);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Paramètres de la newsletter</h2>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Paramètres d'envoi</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'expéditeur</label>
            <input
              type="text"
              name="senderName"
              value={settings.senderName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email de l'expéditeur</label>
            <input
              type="email"
              name="senderEmail"
              value={settings.senderEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email de réponse</label>
            <input
              type="email"
              name="replyToEmail"
              value={settings.replyToEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Paramètres du contenu</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objet de l'email</label>
            <input
              type="text"
              name="subject"
              value={settings.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte de prévisualisation</label>
            <textarea
              name="previewText"
              value={settings.previewText}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
            <p className="mt-1 text-xs text-gray-500">Ce texte apparaît dans les clients de messagerie avant l'ouverture de l'email.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Paramètres de design</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Largeur du template (px)</label>
            <input
              type="number"
              name="templateWidth"
              value={settings.templateWidth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de fond</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="backgroundColor"
                value={settings.backgroundColor}
                onChange={handleChange}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.backgroundColor}
                onChange={handleChange}
                name="backgroundColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Police de caractères</label>
            <select
              name="fontFamily"
              value={settings.fontFamily}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
              <option value="'Times New Roman', Times, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Courier New', Courier, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="fontColor"
                value={settings.fontColor}
                onChange={handleChange}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.fontColor}
                onChange={handleChange}
                name="fontColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur des liens</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="linkColor"
                value={settings.linkColor}
                onChange={handleChange}
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.linkColor}
                onChange={handleChange}
                name="linkColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Options supplémentaires</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="socialMediaLinks"
              name="socialMediaLinks"
              checked={settings.socialMediaLinks}
              onChange={handleChange}
              className="h-4 w-4 text-[#841b60] focus:ring-[#841b60] border-gray-300 rounded"
            />
            <label htmlFor="socialMediaLinks" className="ml-2 text-sm text-gray-700">
              Inclure les liens vers les réseaux sociaux
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
