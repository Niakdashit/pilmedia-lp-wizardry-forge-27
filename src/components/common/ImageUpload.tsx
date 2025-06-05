
import React, { useCallback, useState, useId } from 'react';
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
  const inputId = useId();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Drop event triggered');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Processing dropped file:', file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('File read complete, calling onChange with:', reader.result);
        onChange(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading dropped file');
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or no file dropped');
    }
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input change triggered');
    const file = e.target.files?.[0];
    if (file) {
      console.log('Processing selected file:', file.name, 'type:', file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('File read complete, calling onChange with:', reader.result);
        onChange(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading selected file');
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }, [onChange]);

  const handleRemoveImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Removing image');
    onChange('');
  }, [onChange]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Upload area clicked, attempting to trigger file input with id:', inputId);
    
    // Utiliser une approche plus directe pour déclencher l'input
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      console.log('File input found, triggering click');
      input.click();
    } else {
      console.error('File input not found with id:', inputId);
      // Fallback: chercher par sélecteur
      const fallbackInput = document.querySelector(`#${CSS.escape(inputId)}`) as HTMLInputElement;
      if (fallbackInput) {
        console.log('Found input via fallback selector, triggering click');
        fallbackInput.click();
      } else {
        console.error('No file input found with any method');
      }
    }
  }, [inputId]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className={`relative border-2 border-dashed border-gray-300 rounded-lg hover:border-[#841b60] transition-colors duration-200 cursor-pointer ${
          compact ? 'p-2' : 'p-6'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
        />
        
        <div className="text-center pointer-events-none">
          {value ? (
            <div className="relative">
              <img 
                src={value} 
                alt="Preview" 
                className={compact ? "max-h-16 mx-auto rounded" : "max-h-48 mx-auto rounded-lg"}
                onError={(e) => {
                  console.error('Error loading image preview:', e);
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs pointer-events-auto"
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
                {compact ? "Ajouter image" : "Glissez-déposez une image ici ou cliquez"}
                {!compact && (
                  <span className="text-[#841b60] hover:text-[#6d164f] ml-1">
                    pour parcourir vos fichiers
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
      </div>
    </div>
  );
};

export default ImageUpload;
