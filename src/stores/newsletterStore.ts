import { create } from 'zustand';

export type ModuleType =
  | 'header'
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'columns'
  | 'social'
  | 'footer'
  | 'video'
  | 'testimonial'
  | 'html';

export interface ModuleData {
  id: string;
  type: ModuleType;
  content: string;
  settings: Record<string, any>;
}

interface NewsletterState {
  modules: ModuleData[];
  selectedModuleId: string | null;
  generatedHTML: string;
  addModule: (module: ModuleData) => void;
  updateModule: (id: string, updates: Partial<ModuleData>) => void;
  removeModule: (id: string) => void;
  reorderModules: (startIndex: number, endIndex: number) => void;
  selectModule: (id: string | null) => void;
  setFromGeneratedHTML: (html: string) => void;
  loadGeneratedAsModules: () => void;
}

export const useNewsletterStore = create<NewsletterState>((set, get) => ({
  modules: [],
  selectedModuleId: null,
  generatedHTML: '',

  addModule: (module) =>
    set((state) => ({
      modules: [...state.modules, module],
    })),

  updateModule: (id, updates) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  removeModule: (id) =>
    set((state) => ({
      modules: state.modules.filter((m) => m.id !== id),
      selectedModuleId:
        state.selectedModuleId === id ? null : state.selectedModuleId,
    })),

  reorderModules: (startIndex, endIndex) =>
    set((state) => {
      const modules = [...state.modules];
      const [removed] = modules.splice(startIndex, 1);
      modules.splice(endIndex, 0, removed);
      return { modules };
    }),

  selectModule: (id) => set({ selectedModuleId: id }),

  setFromGeneratedHTML: (html) => set({ generatedHTML: html }),

  loadGeneratedAsModules: () => {
    const html = get().generatedHTML;

    if (!html) return;

    // Basic HTML to module converter (you can improve this)
    const div = document.createElement('div');
    div.innerHTML = html;

    const newModules: ModuleData[] = [];

    div.querySelectorAll('*').forEach((el, index) => {
      const tag = el.tagName.toLowerCase();
      const content = el.outerHTML;

      let type: ModuleType = 'html';

      if (tag === 'h1' || tag === 'h2' || tag === 'h3') type = 'header';
      else if (tag === 'p') type = 'text';
      else if (tag === 'img') type = 'image';
      else if (tag === 'a') type = 'button';
      else if (tag === 'hr') type = 'divider';

      newModules.push({
        id: `module-${Date.now()}-${index}`,
        type,
        content,
        settings: {},
      });
    });

    set({ modules: newModules });
  },
}));
