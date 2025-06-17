
import { ExternalLink, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

interface PreviewWindowButtonProps {
  campaign: any;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const PreviewWindowButton: FC<PreviewWindowButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    // Naviguer vers la page d'aperçu au lieu d'ouvrir une popup
    navigate('/preview');
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
      case 'ghost':
        return 'bg-transparent text-gray-600 hover:bg-gray-100';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      onClick={handlePreview}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-lg font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      {children || (
        <>
          <Eye className="w-4 h-4" />
          Aperçu
          <ExternalLink className="w-3 h-3" />
        </>
      )}
    </button>
  );
};

export default PreviewWindowButton;
