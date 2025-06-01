
import React from 'react';
import ContrastBackground from '../../common/ContrastBackground';
import { getTextBlockStyle } from './styles';

interface MobileContentProps {
  mobileConfig: any;
  campaign: any;
  previewMode: string;
}

const MobileContent: React.FC<MobileContentProps> = ({ mobileConfig, campaign, previewMode }) => {
  const renderContent = () => {
    const contrastBg = mobileConfig.contrastBackground || {};
    
    const textBlock = (mobileConfig.showTitle !== false || mobileConfig.showDescription !== false) ? (
      <div style={getTextBlockStyle()}>
        <ContrastBackground
          enabled={contrastBg.enabled}
          config={contrastBg}
          className="w-full"
        >
          {mobileConfig.showTitle !== false && (
            <h2
              className={`font-bold mb-3 ${mobileConfig.titleAlignment || 'text-center'}`}
              style={{
                color: mobileConfig.titleColor || '#000',
                fontSize: previewMode === 'mobile' ? '1.20rem' : '1.35rem',
                fontWeight: mobileConfig.titleWeight === 'font-normal' ? 'normal' :
                  mobileConfig.titleWeight === 'font-medium' ? '500' :
                  mobileConfig.titleWeight === 'font-semibold' ? '600' :
                  mobileConfig.titleWeight === 'font-extrabold' ? '800' : 'bold',
                lineHeight: 1.3,
                wordBreak: 'break-word' as const
              }}
            >
              {mobileConfig.title || campaign.screens?.[1]?.title || 'Tentez votre chance !'}
            </h2>
          )}
          {mobileConfig.showDescription !== false && (
            <p
              className={mobileConfig.descriptionAlignment || 'text-center'}
              style={{
                color: mobileConfig.descriptionColor || '#666',
                fontSize: previewMode === 'mobile' ? '0.95rem' : '1.05rem',
                lineHeight: 1.45,
                wordBreak: 'break-word' as const
              }}
            >
              {mobileConfig.description || campaign.screens?.[1]?.description || 'Participez pour avoir une chance de gagner !'}
            </p>
          )}
        </ContrastBackground>
      </div>
    ) : null;

    return [textBlock];
  };

  return (
    <>
      {renderContent().map((element, idx) =>
        element ? <React.Fragment key={idx}>{element}</React.Fragment> : null
      )}
    </>
  );
};

export default MobileContent;
