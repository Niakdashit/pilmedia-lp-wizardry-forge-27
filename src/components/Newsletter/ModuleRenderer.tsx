
// Remove React import as it's not directly used
import { NewsletterModule } from '../../types/newsletter';

// Fix TextAlign type issues by being explicit about allowed values
type TextAlign = 'left' | 'center' | 'right';

export const renderText = (module: NewsletterModule) => {
  return (
    <div
      style={{
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        textAlign: (module.settings.textAlign as TextAlign) || 'left',
        color: module.settings.color || '#000',
        fontSize: module.settings.fontSize || '16px',
      }}
    >
      {module.content}
    </div>
  );
};

export const renderImage = (module: NewsletterModule) => {
  return (
    <div
      style={{
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        textAlign: (module.settings.textAlign as TextAlign) || 'center',
      }}
    >
      <img
        src={module.settings.imageUrl || ''}
        alt="Newsletter Image"
        style={{
          width: module.settings.width || 'auto',
          height: module.settings.height || 'auto',
          borderRadius: module.settings.borderRadius || '0',
        }}
      />
    </div>
  );
};

export const renderButton = (module: NewsletterModule) => {
  return (
    <div
      style={{
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        textAlign: (module.settings.textAlign as TextAlign) || 'center',
      }}
    >
      <a
        href={module.settings.href || '#'}
        style={{
          backgroundColor: '#841b60',
          color: '#fff',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: module.settings.borderRadius || '5px',
          fontSize: module.settings.fontSize || '16px',
        }}
      >
        {module.content}
      </a>
    </div>
  );
};

export const renderSocial = (module: NewsletterModule) => {
  // Convert the content to string to handle both array and string cases
  const socialLinks = typeof module.content === 'string' ? module.content : JSON.stringify(module.content);

  return (
    <div
      style={{
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        textAlign: (module.settings.textAlign as TextAlign) || 'center',
      }}
    >
      {socialLinks}
    </div>
  );
};

export const renderColumns = (module: NewsletterModule) => {
  // Convert columns to number and ensure valid fallback
  const numColumns = module.settings.columns ? Number(module.settings.columns) : 2;
  const columnWidth = 100 / numColumns + '%';

  return (
    <div
      style={{
        display: 'flex',
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        gap: module.settings.spacing || '10px',
      }}
    >
      {Array.isArray(module.content) &&
        module.content.map((item, index) => (
          <div
            key={index}
            style={{
              width: columnWidth,
              textAlign: (module.settings.textAlign as TextAlign) || 'left',
              verticalAlign: module.settings.verticalAlignment || 'top',
            }}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export const renderDivider = (module: NewsletterModule) => {
  return (
    <div
      style={{
        padding: module.settings.padding || '10px',
        backgroundColor: module.settings.backgroundColor || 'transparent',
        textAlign: (module.settings.textAlign as TextAlign) || 'center',
      }}
    >
      <hr style={{ border: '1px solid #ccc' }} />
    </div>
  );
};

// Update the ModuleRenderer props interface
interface ModuleRendererProps {
  module: NewsletterModule;
  preview?: boolean;
}

// Export as named export
export const ModuleRenderer = ({ module, preview }: ModuleRendererProps) => {
  switch (module.type) {
    case 'text':
      return renderText(module);
    case 'image':
      return renderImage(module);
    case 'button':
      return renderButton(module);
    case 'social':
      return renderSocial(module);
    case 'columns':
      return renderColumns(module);
    case 'divider':
      return renderDivider(module);
    default:
      return <div>Unknown module type: {module.type}</div>;
  }
};

// Keep default export for backward compatibility with other files
export default ModuleRenderer;
