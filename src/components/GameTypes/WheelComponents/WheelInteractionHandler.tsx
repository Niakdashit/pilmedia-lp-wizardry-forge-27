
import React from 'react';

interface WheelInteractionHandlerProps {
  formValidated: boolean;
  buttonConfig: any;
  onWheelClick: () => void;
  children: React.ReactNode;
}

const WheelInteractionHandler: React.FC<WheelInteractionHandlerProps> = ({
  formValidated,
  buttonConfig,
  onWheelClick,
  children
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      
      {/* Click overlay for non-validated form */}
      {!formValidated && (
        <div 
          onClick={onWheelClick}
          className="absolute inset-0 flex items-center justify-center z-30 rounded-full cursor-pointer bg-black/0" 
        />
      )}
    </div>
  );
};

export default WheelInteractionHandler;
