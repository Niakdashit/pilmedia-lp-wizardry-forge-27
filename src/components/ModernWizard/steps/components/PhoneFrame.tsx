
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  logoUrl?: string;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, logoUrl }) => (
  <div className="flex justify-center">
    <div className="relative">
      {/* Phone frame */}
      <div className="w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Phone UI elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

          {/* Game content */}
          <div className="pt-12 pb-8 px-8 h-full flex flex-col justify-center overflow-y-auto">
            {/* Brand logo */}
            {logoUrl && (
              <div className="text-center mb-8">
                <img src={logoUrl} alt="Brand logo" className="w-16 h-16 object-contain mx-auto" />
              </div>
            )}
            
            {/* Game/Quiz preview */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* Floating animations */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-fuchsia-400 rounded-full animate-bounce z-20" />
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-ping z-20" />
    </div>
  </div>
);

export default PhoneFrame;
