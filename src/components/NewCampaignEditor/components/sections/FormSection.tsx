
import React from 'react';
import { Users } from 'lucide-react';
import FormEditor from '../../../campaign/FormEditor';

interface FormSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const FormSection: React.FC<FormSectionProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Formulaire de contact</h2>
            <p className="text-gray-600">Configurez les champs de collecte de données</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg">
          <FormEditor
            formFields={campaign.formFields || []}
            setFormFields={(fields) => setCampaign((prev: any) => ({ ...prev, formFields: fields }))}
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection;
