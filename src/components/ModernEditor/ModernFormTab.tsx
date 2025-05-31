
import React from 'react';
import FormEditor from '../campaign/FormEditor';

interface ModernFormTabProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const ModernFormTab: React.FC<ModernFormTabProps> = ({ 
  campaign, 
  setCampaign 
}) => {
  return (
    <div className="p-6">
      <FormEditor
        formFields={campaign.formFields || []}
        setFormFields={(fields) => setCampaign((prev: any) => ({
          ...prev,
          formFields: fields
        }))}
      />
    </div>
  );
};

export default ModernFormTab;
