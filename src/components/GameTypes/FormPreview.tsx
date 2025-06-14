
import React, { useState } from 'react';
import DynamicContactForm from '../forms/DynamicContactForm';
import { DEFAULT_FIELDS } from '../../utils/wheelConfig';
import Modal from '../common/Modal';

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
  const [showModal, setShowModal] = useState(true);

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

  // Styles appliqués au conteneur de formulaire dans la modale
  const containerStyle = {
    backgroundColor: containerBackground,
    borderColor: borderColor,
    borderRadius: containerBorderRadius,
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: design.enableShadow !== false 
      ? '0 8px 24px 0 rgb(0 0 0 / 0.11), 0 1.5px 8px -2px rgb(0 0 0 / 0.03)' 
      : 'none',
    ...getSizeStyles()
  };

  // Ouvre la modale (par défaut au premier rendu)
  // const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal
          title={campaign.screens?.[1]?.title || "Vos informations"}
          onClose={() => setShowModal(false)}
          width="max-w-lg"
          contained={false}
        >
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
                  {/* Le titre est déjà sur la modale, ici juste description */}
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
        </Modal>
      )}
      {/* Optionnel : Fond grisé dessous, rien d’autre n’est affiché */}
    </>
  );
};

export default FormPreview;

