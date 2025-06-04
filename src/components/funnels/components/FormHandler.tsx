
import React from 'react';
import Modal from '../../common/Modal';
import DynamicContactForm, { FieldConfig } from '../../forms/DynamicContactForm';

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

  return (
    <Modal
      onClose={onClose}
      title={campaign.screens?.[1]?.title || 'Vos informations'}
      contained={modalContained}
    >
      <DynamicContactForm
        fields={fields}
        submitLabel={participationLoading ? 'Chargement...' : campaign.screens?.[1]?.buttonText || "C'est parti !"}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default FormHandler;
