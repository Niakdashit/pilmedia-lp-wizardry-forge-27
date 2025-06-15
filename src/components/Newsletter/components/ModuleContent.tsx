
import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';
import { TextModule } from '../modules/TextModule';
import { ImageModule } from '../modules/ImageModule';
import { ButtonModule } from '../modules/ButtonModule';
import { DividerModule } from '../modules/DividerModule';
import { HeaderModule } from '../modules/HeaderModule';
import { FooterModule } from '../modules/FooterModule';
import { SocialModule } from '../modules/SocialModule';
import { ColumnsModule } from '../modules/ColumnsModule';
import { HTMLModule } from '../modules/HTMLModule';
import { VideoModule } from '../modules/VideoModule';
import { TestimonialModule } from '../modules/TestimonialModule';

interface ModuleContentProps {
  module: ModuleData;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  switch (module.type) {
    case 'text':
      return <TextModule module={module} />;
    case 'image':
      return <ImageModule module={module} />;
    case 'button':
      return <ButtonModule module={module} />;
    case 'divider':
      return <DividerModule />;
    case 'header':
      return <HeaderModule />;
    case 'footer':
      return <FooterModule />;
    case 'social':
      return <SocialModule />;
    case 'columns':
      return <ColumnsModule module={module} />;
    case 'html':
      return <HTMLModule module={module} />;
    case 'video':
      return <VideoModule />;
    case 'testimonial':
      return <TestimonialModule module={module} />;
    default:
      return <div>Module non supporté</div>;
  }
};
