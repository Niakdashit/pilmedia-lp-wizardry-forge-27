
// Mock Supabase client for development
export const supabase = {
  from: (_table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (_columns?: string) => ({
      eq: (_column: string, _value: any) => ({
        order: (_orderColumn: string, _options?: { ascending?: boolean }) => 
          Promise.resolve({ data: [], error: null })
      }),
      order: (_orderColumn: string, _options?: { ascending?: boolean }) => 
        Promise.resolve({ data: [], error: null })
    }),
    update: (data: any) => ({
      eq: (_column: string, _value: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data, error: null })
        })
      })
    }),
    delete: () => ({
      eq: (_column: string, _value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};
