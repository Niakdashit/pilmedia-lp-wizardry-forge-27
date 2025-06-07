
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

  const buttonLabel = campaign.buttonConfig?.text || campaign.gameConfig?.form?.buttonLabel || 'Valider le formulaire';

  const handleFormSubmit = (formData: Record<string, string>) => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const getSizeStyles = () => {
    switch (gameSize) {
      case 'small':
        return { maxWidth: '300px', padding: '16px' };
      case 'large':
        return { maxWidth: '600px', padding: '32px' };
      case 'xlarge':
        return { maxWidth: '800px', padding: '40px' };
      default:
        return { maxWidth: '450px', padding: '24px' };
    }
  };

  if (isSubmitted) {
    return (
      <div 
        className={`flex items-center justify-center bg-white rounded-lg shadow-lg ${className}`}
        style={getSizeStyles()}
      >
        <div className="text-center py-8">
          <div className="text-green-500 text-2xl mb-4">✓</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Formulaire soumis !
          </h3>
          <p className="text-gray-600">
            Merci pour votre participation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-lg ${className}`}
      style={getSizeStyles()}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {campaign.screens?.[1]?.title || 'Vos informations'}
        </h2>
        <p className="text-gray-600 text-sm">
          {campaign.screens?.[1]?.description || 'Remplissez le formulaire ci-dessous'}
        </p>
      </div>
      
      <DynamicContactForm
        fields={fields}
        submitLabel={buttonLabel}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default FormPreview;
