
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
import EditorLayout from '../components/Layout/EditorLayout';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <EditorLayout>
      <div className="space-y-6">
        <QuickCampaignCreator />
      </div>
    </EditorLayout>
  );
};

export default QuickCampaign;
