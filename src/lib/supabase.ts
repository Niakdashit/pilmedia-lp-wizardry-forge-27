
// Mock Supabase client for development
export const supabase = {
  from: (table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        order: (orderColumn: string, options?: { ascending?: boolean }) => 
          Promise.resolve({ data: [], error: null })
      }),
      order: (orderColumn: string, options?: { ascending?: boolean }) => 
        Promise.resolve({ data: [], error: null })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data, error: null })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};
