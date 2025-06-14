
import React, { useState } from 'react';
import DynamicContactForm from '../forms/DynamicContactForm';
import { DEFAULT_FIELDS } from '../../utils/wheelConfig';

interface FormPreviewProps {
  campaign: any;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  campaign,
  gameSize = 'medium',
  className = ""
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fields = Array.isArray(campaign.formFields) && campaign.formFields.length > 0
    ? campaign.formFields 
    : DEFAULT_FIELDS;

  const design = campaign.design || {};
  const buttonColor = design.buttonColor || "#841b60";
  const buttonTextColor = design.buttonTextColor || "#fff";
  const borderColor = design.borderColor || "#E5E7EB";
  const focusColor = buttonColor;
  const containerBackground = design.blockColor || "#ffffff";
  const containerBorderRadius = design.borderRadius || "16px";

  const buttonLabel = campaign.buttonConfig?.text || campaign.gameConfig?.form?.buttonLabel || 'Valider le formulaire';

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const getSizeStyles = () => {
    switch (gameSize) {
      case 'small':
        return { maxWidth: '300px', padding: '24px' };
      case 'large':
        return { maxWidth: '600px', padding: '32px' };
      case 'xlarge':
        return { maxWidth: '800px', padding: '40px' };
      default:
        return { maxWidth: '450px', padding: '24px' };
    }
  };

  // Conteneur pour le CADRE du formulaire : couleur, bordure, arrondi
  const containerStyle = {
    backgroundColor: containerBackground, // cadre visible
    borderColor: borderColor,
    borderRadius: containerBorderRadius,
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: design.enableShadow !== false 
      ? '0 8px 24px 0 rgb(0 0 0 / 0.11), 0 1.5px 8px -2px rgb(0 0 0 / 0.03)' 
      : 'none',
    ...getSizeStyles()
  };

  // Centrage vertical et horizontal, fond subtil transparent (pour se détacher de l'image sous-jacente)
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`} style={{ minHeight: '350px', pointerEvents: 'auto' }}>
      <div style={containerStyle} className="mx-auto w-full">
        {isSubmitted ? (
          <div className="flex items-center justify-center" style={{ minHeight: '220px' }}>
            <div className="text-center py-8 w-full">
              <div className="text-green-500 text-2xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Formulaire soumis !
              </h3>
              <p className="text-gray-600">
                Merci pour votre participation
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {campaign.screens?.[1]?.title || 'Vos informations'}
              </h2>
              <p className="text-gray-600 text-sm text-center">
                {campaign.screens?.[1]?.description || 'Remplissez le formulaire ci-dessous'}
              </p>
            </div>
            
            <DynamicContactForm
              fields={fields}
              submitLabel={buttonLabel}
              onSubmit={handleFormSubmit}
              textStyles={{
                label: design.textStyles?.label,
                button: {
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                  borderRadius: design.borderRadius,
                  fontFamily: design.fontFamily,
                  fontWeight: design.textStyles?.button?.fontWeight,
                  fontSize: design.textStyles?.button?.fontSize,
                },
              }}
              inputBorderColor={borderColor}
              inputFocusColor={focusColor}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FormPreview;
