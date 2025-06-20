
import React from 'react';
import Step3Header from './Step3/Step3Header';
import ConfigurationPanel from './Step3/ConfigurationPanel';
import PreviewPanel from './Step3/PreviewPanel';
import ProgressIndicator from './Step3/ProgressIndicator';
import Step3Styles from './Step3/Step3Styles';

const Step3VisualStyle: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <Step3Header />

        <div className="grid grid-cols-12 gap-8">
          <ConfigurationPanel />
          <PreviewPanel />
        </div>

        <ProgressIndicator />
      </div>

      <Step3Styles />
    </div>
  );
};

export default Step3VisualStyle;
