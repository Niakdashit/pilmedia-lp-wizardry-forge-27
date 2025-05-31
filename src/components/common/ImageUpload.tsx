import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label, className }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#841b60] transition-colors duration-200"
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
            {value ? (
              <div className="relative">
                <img 
                  src={value} 
                  alt="Preview" 
                  className="max-h-48 mx-auto rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onChange('');
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <div className="mx-auto w-12 h-12 bg-[#f8f0f5] rounded-full flex items-center justify-center mb-3">
                  {value ? (
                    <ImageIcon className="w-6 h-6 text-[#841b60]" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#841b60]" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Glissez-déposez une image ici ou
                  <span className="text-[#841b60] hover:text-[#6d164f] ml-1">
                    parcourez vos fichiers
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG jusqu'à 5MB
                </p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;