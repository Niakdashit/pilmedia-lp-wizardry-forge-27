
import React from 'react';
import Step3Header from './Step3/Step3Header';
import ProgressIndicator from './Step3/ProgressIndicator';
import ConfigurationPanel from './Step3/ConfigurationPanel';
import PreviewPanel from './Step3/PreviewPanel';

const Step3VisualStyle: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <Step3Header />
        
        {/* Progress Indicator */}
        <ProgressIndicator />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-16rem)]">
          {/* Configuration Panel */}
          <ConfigurationPanel />
          
          {/* Preview Panel */}
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
