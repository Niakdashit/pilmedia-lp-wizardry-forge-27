
// Mock Supabase client for development
export const supabase = {
  from: (table: string) => ({
    insert: (data: any) => Promise.resolve({ data, error: null }),
    select: (columns?: string) => Promise.resolve({ data: [], error: null }),
    update: (data: any) => Promise.resolve({ data, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};
