import React from 'react';
interface ButtonConfig {
  color: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  size: 'small' | 'medium' | 'large';
  text: string;
  visible: boolean;
}
interface WheelButtonProps {
  buttonConfig: ButtonConfig;
  spinning: boolean;
  disabled: boolean;
  formValidated: boolean;
  onClick: () => void;
}
const WheelButton: React.FC<WheelButtonProps> = ({
  buttonConfig,
  spinning,
  disabled,
  formValidated,
  onClick
}) => {
  const getButtonSizeClasses = () => {
    switch (buttonConfig.size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };
  if (!buttonConfig.visible) return null;
  return <button onClick={onClick} disabled={spinning || disabled} style={{
    background: `linear-gradient(45deg, ${buttonConfig.color}, ${buttonConfig.color}dd)`,
    borderColor: buttonConfig.borderColor,
    borderWidth: `${buttonConfig.borderWidth}px`,
    borderRadius: `${buttonConfig.borderRadius}px`,
    borderStyle: 'solid',
    boxShadow: `0 4px 15px ${buttonConfig.borderColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
  }} className={`${getButtonSizeClasses()} text-white font-bold disabled:opacity-50 hover:opacity-90 transition-all duration-200 relative overflow-hidden`}>
      <span className="relative z-10">
        {spinning ? 'Tourne...' : formValidated ? 'Lancer la roue' : buttonConfig.text || 'Remplir le formulaire'}
      </span>
      <div style={{
      transform: 'skewX(-15deg)'
    }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 mx-0 px-0" />
    </button>;
};
export default WheelButton;