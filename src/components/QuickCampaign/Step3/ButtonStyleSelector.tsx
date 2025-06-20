
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const ButtonStyleSelector: React.FC = () => {
  const { customColors, setCustomColors } = useQuickCampaignStore();

  const buttonStyles = [
    {
      id: 'primary',
      name: 'Bouton Principal',
      preview: {
        backgroundColor: customColors.primary,
        color: '#ffffff',
        border: `2px solid ${customColors.primary}`,
        borderRadius: '8px'
      },
      textColor: '#ffffff'
    },
    {
      id: 'secondary',
      name: 'Bouton Secondaire',
      preview: {
        backgroundColor: customColors.secondary,
        color: customColors.primary,
        border: `2px solid ${customColors.secondary}`,
        borderRadius: '8px'
      },
      textColor: customColors.primary
    },
    {
      id: 'outline',
      name: 'Bouton Contour',
      preview: {
        backgroundColor: 'transparent',
        color: customColors.primary,
        border: `2px solid ${customColors.primary}`,
        borderRadius: '8px'
      },
      textColor: customColors.primary
    },
    {
      id: 'gradient',
      name: 'Bouton Dégradé',
      preview: {
        background: `linear-gradient(45deg, ${customColors.primary}, ${customColors.secondary})`,
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px'
      },
      textColor: '#ffffff'
    }
  ];

  const updateButtonStyle = (styleId: string) => {
    const style = buttonStyles.find(s => s.id === styleId);
    if (style) {
      setCustomColors({
        ...customColors,
        buttonStyle: styleId,
        textColor: style.textColor
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        🎨 Style du bouton
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {buttonStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => updateButtonStyle(style.id)}
            className="p-3 border-2 rounded-xl hover:border-blue-400 transition-all duration-200 group"
            style={{
              borderColor: customColors.buttonStyle === style.id ? '#3B82F6' : '#E5E7EB'
            }}
          >
            <div className="text-center space-y-2">
              <div
                className="w-full py-2 px-4 text-sm font-medium rounded-lg transition-transform group-hover:scale-105"
                style={style.preview}
              >
                Aperçu
              </div>
              <p className="text-xs text-gray-600">{style.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonStyleSelector;
