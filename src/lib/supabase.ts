
// Mock Supabase client for development
export const supabase = {
  from: (table: string) => ({
    insert: (data: any) => ({
      data,
      error: null,
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        eq: (column2: string, value2: any) => Promise.resolve({ count: 0, error: null })
      })
    }),
    update: (data: any) => Promise.resolve({ data, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};
