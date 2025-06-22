
import React from 'react';
import ModernEditorLayout from './ModernEditorLayout';

interface ModernCampaignEditorProps {
  campaignId?: string;
  isNew?: boolean;
}

const ModernCampaignEditor: React.FC<ModernCampaignEditorProps> = ({ 
  campaignId,
  isNew = false 
}) => {
  return (
    <ModernEditorLayout />
  );
};

export default ModernCampaignEditor;
