
import React from 'react';

const SocialProperties: React.FC<{ module: any }> = ({ module }) => {
  const handleChange = (key: string, value: string) => {
    module.settings = { ...module.settings, [key]: value };
  };
  
  const platforms = [
    { name: 'facebook', label: 'Facebook URL' },
    { name: 'twitter', label: 'Twitter URL' },
    { name: 'instagram', label: 'Instagram URL' },
    { name: 'linkedin', label: 'LinkedIn URL' },
    { name: 'youtube', label: 'YouTube URL' },
    { name: 'website', label: 'Website URL' },
  ].map((platform) => {
    return {
      ...platform,
      value: module.settings?.[platform.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(platform.name, e.target.value);
      },
    };
  });
  
  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <div key={platform.name} className="grid grid-cols-3 items-center gap-4">
          <label htmlFor={platform.name} className="text-right">
            {platform.label}
          </label>
          <input
            type="url"
            id={platform.name}
            value={platform.value}
            onChange={platform.onChange}
            className="col-span-2 border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>
      ))}
    </div>
  );
};

export default SocialProperties;
