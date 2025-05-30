
import React from 'react';
import { FileText } from 'lucide-react';
import FormEditor from '../campaign/FormEditor';

interface ModernFormTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernFormTab: React.FC<ModernFormTabProps> = ({
  campaign,
  setCampaign
}) => {
  const handleFormFieldsChange = (fields: any[]) => {
    setCampaign((prev: any) => ({
      ...prev,
      formFields: fields
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration du formulaire</h2>
        <p className="text-sm text-gray-600">
          Créez et personnalisez les champs de votre formulaire de participation
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
          <FileText className="w-5 h-5 mr-2" />
          Éditeur de formulaire
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-1">
          <FormEditor
            formFields={campaign.formFields || []}
            setFormFields={handleFormFieldsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernFormTab;
