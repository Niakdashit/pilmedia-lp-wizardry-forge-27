
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Save } from 'lucide-react';

const WordingStep: React.FC = () => {
  const [wording, setWording] = useState({
    welcome: {
      title: 'Bienvenue !',
      subtitle: 'Tentez votre chance et gagnez de superbes prix',
      button: 'Commencer'
    },
    game: {
      title: 'Votre jeu',
      instruction: 'Cliquez pour jouer',
      button: 'Jouer'
    },
    win: {
      title: 'Félicitations !',
      message: 'Vous avez gagné un prix fantastique !',
      button: 'Récupérer mon prix'
    },
    lose: {
      title: 'Dommage !',
      message: 'Vous n\'avez pas gagné cette fois-ci',
      button: 'Réessayer'
    },
    form: {
      title: 'Récupérez votre prix',
      email: 'Votre email',
      name: 'Votre nom',
      phone: 'Votre téléphone',
      button: 'Valider'
    },
    thanks: {
      title: 'Merci !',
      message: 'Nous vous contacterons bientôt',
      button: 'Fermer'
    }
  });

  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [selectedSection, setSelectedSection] = useState('welcome');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const sections = [
    { id: 'welcome', name: 'Écran d\'accueil', icon: '👋' },
    { id: 'game', name: 'Jeu', icon: '🎮' },
    { id: 'win', name: 'Victoire', icon: '🏆' },
    { id: 'lose', name: 'Défaite', icon: '😔' },
    { id: 'form', name: 'Formulaire', icon: '📝' },
    { id: 'thanks', name: 'Remerciements', icon: '🙏' }
  ];

  const updateText = (section: string, field: string, value: string) => {
    setWording(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const currentSection = wording[selectedSection as keyof typeof wording];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-[#841b60]" />
          Textes et messages
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sélection de langue */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-[#841b60]" />
              Langue
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-[#841b60] bg-[#841b60]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Sections */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    selectedSection === section.id
                      ? 'border-[#841b60] bg-[#841b60]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium text-sm">{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Édition des textes */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Édition : {sections.find(s => s.id === selectedSection)?.name}
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors">
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(currentSection).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field === 'title' ? 'Titre' :
                     field === 'subtitle' ? 'Sous-titre' :
                     field === 'message' ? 'Message' :
                     field === 'button' ? 'Bouton' :
                     field === 'instruction' ? 'Instruction' :
                     field === 'email' ? 'Email' :
                     field === 'name' ? 'Nom' :
                     field === 'phone' ? 'Téléphone' : field}
                  </label>
                  {field === 'message' || field === 'subtitle' ? (
                    <textarea
                      value={value as string}
                      onChange={(e) => updateText(selectedSection, field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent resize-none"
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value as string}
                      onChange={(e) => updateText(selectedSection, field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Aperçu */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Aperçu</h4>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {(currentSection as any).title}
                </h3>
                {(currentSection as any).subtitle && (
                  <p className="text-gray-600 mb-4">{(currentSection as any).subtitle}</p>
                )}
                {(currentSection as any).message && (
                  <p className="text-gray-600 mb-4">{(currentSection as any).message}</p>
                )}
                {(currentSection as any).instruction && (
                  <p className="text-sm text-gray-500 mb-4">{(currentSection as any).instruction}</p>
                )}
                <button className="px-6 py-2 bg-[#841b60] text-white rounded-lg">
                  {(currentSection as any).button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WordingStep;
