
import React from 'react';
import { useParams } from 'react-router-dom';
import ModernCampaignEditor from '../components/ModernEditor/ModernCampaignEditor';

const ModernEditorPage: React.FC = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  return (
    <ModernCampaignEditor 
      campaignId={isNew ? undefined : id}
      isNew={isNew}
    />
  );
};

export default ModernEditorPage;
