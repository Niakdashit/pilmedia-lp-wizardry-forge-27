
import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  value?: string | File;
  onChange: (value: string | File) => void;
  label?: string;
  className?: string;
  compact?: boolean;
  acceptFiles?: boolean; // Pour accepter les objets File
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  label, 
  className,
  compact = false,
  acceptFiles = false
}) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (acceptFiles) {
        onChange(file);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onChange, acceptFiles]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (acceptFiles) {
        onChange(file);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onChange, acceptFiles]);

  // Fonction pour obtenir l'URL d'aperçu
  const getPreviewUrl = () => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  };

  const previewUrl = getPreviewUrl();

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className={`relative border-2 border-dashed border-gray-300 rounded-lg hover:border-[#841b60] transition-colors duration-200 ${
          compact ? 'p-2' : 'p-6'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        
        <label
          htmlFor="image-upload"
          className="cursor-pointer"
        >
          <div className="text-center">
            {previewUrl ? (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className={compact ? "max-h-16 mx-auto rounded" : "max-h-48 mx-auto rounded-lg"}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onChange(acceptFiles ? null as any : '');
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                >
                  ×
                </button>
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
                    <span className="text-[#841b60] hover:text-[#6d164f] ml-1">
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
