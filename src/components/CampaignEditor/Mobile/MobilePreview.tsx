import React from 'react';
import MobileWheelPreview from '../../GameTypes/MobileWheelPreview';
import { Quiz, Scratch, Memory, Puzzle, Dice, Jackpot } from '../../GameTypes';

interface MobilePreviewProps {
  campaign: any;
  previewMode: 'mobile' | 'tablet';
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ campaign, previewMode }) => {
  const mobileConfig = campaign.mobileConfig || {};

  const getDeviceStyle = () => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '280px',
          minHeight: '500px',
          height: 'auto',
          maxHeight: '100%',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        };
      case 'tablet':
        return {
          width: '340px',
          minHeight: '520px',
          height: 'auto',
          maxHeight: '100%',
          borderRadius: '14px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        };
    }
  };

  // ... (reste du code inchangé)

export default MobilePreview;
