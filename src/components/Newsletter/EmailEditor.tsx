import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  List, 
  ListOrdered, 
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Strikethrough,
  Underline,
  Code,
  Undo,
  Redo,
  Type
} from 'lucide-react';

interface EmailEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: 'Commencez à écrire votre newsletter...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL de l\'image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('URL du lien:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const toolbarGroups = [
    [
      {
        icon: <Undo className="w-4 h-4" />,
        title: 'Annuler',
        action: () => editor.chain().focus().undo().run(),
        isDisabled: () => !editor.can().undo(),
      },
      {
        icon: <Redo className="w-4 h-4" />,
        title: 'Refaire',
        action: () => editor.chain().focus().redo().run(),
        isDisabled: () => !editor.can().redo(),
      },
    ],
    [
      {
        icon: <Type className="w-4 h-4" />,
        title: 'Paragraphe',
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive('paragraph'),
      },
      {
        icon: <Heading1 className="w-4 h-4" />,
        title: 'Titre 1',
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive('heading', { level: 1 }),
      },
      {
        icon: <Heading2 className="w-4 h-4" />,
        title: 'Titre 2',
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive('heading', { level: 2 }),
      },
    ],
    [
      {
        icon: <Bold className="w-4 h-4" />,
        title: 'Gras',
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive('bold'),
      },
      {
        icon: <Italic className="w-4 h-4" />,
        title: 'Italique',
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive('italic'),
      },
      {
        icon: <Underline className="w-4 h-4" />,
        title: 'Souligné',
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: () => editor.isActive('underline'),
      },
      {
        icon: <Strikethrough className="w-4 h-4" />,
        title: 'Barré',
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
      },
      {
        icon: <Code className="w-4 h-4" />,
        title: 'Code',
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive('code'),
      },
    ],
    [
      {
        icon: <AlignLeft className="w-4 h-4" />,
        title: 'Aligner à gauche',
        action: () => editor.chain().focus().setTextAlign('left').run(),
        isActive: () => editor.isActive({ textAlign: 'left' }),
      },
      {
        icon: <AlignCenter className="w-4 h-4" />,
        title: 'Centrer',
        action: () => editor.chain().focus().setTextAlign('center').run(),
        isActive: () => editor.isActive({ textAlign: 'center' }),
      },
      {
        icon: <AlignRight className="w-4 h-4" />,
        title: 'Aligner à droite',
        action: () => editor.chain().focus().setTextAlign('right').run(),
        isActive: () => editor.isActive({ textAlign: 'right' }),
      },
    ],
    [
      {
        icon: <List className="w-4 h-4" />,
        title: 'Liste à puces',
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive('bulletList'),
      },
      {
        icon: <ListOrdered className="w-4 h-4" />,
        title: 'Liste numérotée',
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive('orderedList'),
      },
      {
        icon: <Quote className="w-4 h-4" />,
        title: 'Citation',
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive('blockquote'),
      },
    ],
    [
      {
        icon: <LinkIcon className="w-4 h-4" />,
        title: 'Ajouter un lien',
        action: addLink,
        isActive: () => editor.isActive('link'),
      },
      {
        icon: <ImageIcon className="w-4 h-4" />,
        title: 'Ajouter une image',
        action: addImage,
      },
    ],
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {toolbarGroups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              <div className="flex gap-1">
                {group.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    disabled={item.isDisabled?.()}
                    className={`p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      item.isActive?.() ? 'bg-gray-200' : ''
                    }`}
                    title={item.title}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
              {groupIndex < toolbarGroups.length - 1 && (
                <div className="w-px h-8 bg-gray-200 my-auto" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[400px] prose max-w-none" />
    </div>
  );
};

export default EmailEditor;