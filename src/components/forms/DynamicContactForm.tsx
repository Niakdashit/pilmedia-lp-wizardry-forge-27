import React, { useState } from 'react';

export type FieldConfig = {
  name: string;                // ex: "email"
  label: string;               // ex: "Email"
  type?: string;               // ex: "text", "email", "tel", "select"
  required?: boolean;
  options?: string[];          // pour select (civilité, etc.)
  placeholder?: string;
  autoComplete?: string;
};

interface DynamicContactFormProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
  defaultValues?: Record<string, string>;
  className?: string;
}

const DynamicContactForm: React.FC<DynamicContactFormProps> = ({
  fields,
  onSubmit,
  submitLabel = "Envoyer",
  defaultValues = {},
  className = ""
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = "Ce champ est requis";
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit} autoComplete="on">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={field.name}>
            {field.label}{field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === "select" && field.options ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            >
              <option value="">Sélectionner</option>
              {field.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete || "on"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          )}
          {errors[field.name] && <span className="text-xs text-red-500">{errors[field.name]}</span>}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-6 py-3 font-medium transition-colors duration-200 bg-[#841b60] text-white rounded-lg"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default DynamicContactForm;
