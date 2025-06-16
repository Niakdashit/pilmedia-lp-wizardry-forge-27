
import React from 'react';
import AdminTemplateCard, { GameTemplate } from './AdminTemplateCard';

interface AdminTemplatesGridProps {
  templates: GameTemplate[];
}

const AdminTemplatesGrid: React.FC<AdminTemplatesGridProps> = ({ templates }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {templates.map((template) => (
        <AdminTemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};

export default AdminTemplatesGrid;
