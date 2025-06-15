
import React from 'react';
import { useParams } from 'react-router-dom';
import ModernCampaignEditor from './ModernCampaignEditor';

const ModernEditorPage: React.FC = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  return (
    <ModernCampaignEditor />
  );
};

export default ModernEditorPage;
