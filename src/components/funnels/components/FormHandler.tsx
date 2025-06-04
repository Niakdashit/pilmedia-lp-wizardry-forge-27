
import React from 'react';
import Modal from '../../common/Modal';
import DynamicContactForm from '../../forms/DynamicContactForm';
import { FieldConfig as DynamicFormFieldConfig } from '../../forms/DynamicContactForm';

interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  options?: string[];
}

interface FormHandlerProps {
  showFormModal: boolean;
  campaign: any;
  fields: FieldConfig[];
  participationLoading: boolean;
  modalContained: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, string>) => void;
}

const FormHandler: React.FC<FormHandlerProps> = ({
  showFormModal,
  campaign,
  fields,
  participationLoading,
  modalContained,
  onClose,
  onSubmit
}) => {
  if (!showFormModal) return null;

  // Convertir les fields vers le format attendu par DynamicContactForm
  // Exclure le type 'radio' qui n'est pas supporté
  const convertedFields: DynamicFormFieldConfig[] = fields
    .filter(field => field.type !== 'radio') // Filtrer les champs radio non supportés
    .map(field => ({
      id: field.id,
      label: field.label,
      type: field.type as 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox',
      required: field.required,
      options: field.options
    }));

  return (
    <Modal
      onClose={onClose}
      title={campaign.screens?.[1]?.title || 'Vos informations'}
      contained={modalContained}
    >
      <DynamicContactForm
        fields={convertedFields}
        submitLabel={participationLoading ? 'Chargement...' : campaign.screens?.[1]?.buttonText || "C'est parti !"}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default FormHandler;
