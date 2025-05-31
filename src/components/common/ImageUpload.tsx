
import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  compact?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  label, 
  className,
  compact = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        console.error('Erreur lors de la lecture du fichier');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        console.error('Erreur lors de la lecture du fichier');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  }, [onChange]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className={`relative border-2 border-dashed rounded-lg transition-colors duration-200 ${
          dragActive 
            ? 'border-[#841b60] bg-[#f8f0f5]' 
            : 'border-gray-300 hover:border-[#841b60]'
        } ${compact ? 'p-2' : 'p-6'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`image-upload-${Math.random()}`}
        />
        
        <label
          htmlFor={`image-upload-${Math.random()}`}
          className="cursor-pointer block"
        >
          <div className="text-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#841b60] mb-2"></div>
                <p className="text-sm text-gray-500">Chargement...</p>
              </div>
            ) : value ? (
              <div className="relative group">
                <img 
                  src={value} 
                  alt="Preview" 
                  className={`mx-auto rounded object-cover ${
                    compact ? "max-h-16 w-16" : "max-h-48 max-w-full"
                  }`}
                />
                <button
                  onClick={handleRemove}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  ×
                </button>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <span className="text-white text-sm font-medium">Changer l'image</span>
                </div>
              </div>
            ) : (
              <>
                <div className={`mx-auto bg-[#f8f0f5] rounded-full flex items-center justify-center mb-2 ${
                  compact ? 'w-8 h-8' : 'w-12 h-12 mb-3'
                }`}>
                  <Upload className={compact ? "w-4 h-4 text-[#841b60]" : "w-6 h-6 text-[#841b60]"} />
                </div>
                <p className={compact ? "text-xs text-gray-500" : "text-sm text-gray-500"}>
                  {compact ? "Ajouter image" : "Glissez-déposez une image ici ou"}
                  {!compact && (
                    <span className="text-[#841b60] hover:text-[#6d164f] ml-1 font-medium">
                      parcourez vos fichiers
                    </span>
                  )}
                </p>
                {!compact && (
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG jusqu'à 5MB
                  </p>
                )}
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
