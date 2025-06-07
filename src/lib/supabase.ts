

// Mock Supabase client for development
export const supabase = {
  from: (_table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (_columns?: string) => {
      // Create a promise that also has chaining methods
      const promise = Promise.resolve({ data: [], error: null });
      
      // Add chaining methods
      promise.eq = (_column: string, _value: any) => ({
        order: (_orderColumn: string, _options?: { ascending?: boolean }) => 
          Promise.resolve({ data: [], error: null })
      });
      
      promise.order = (_orderColumn: string, _options?: { ascending?: boolean }) => 
        Promise.resolve({ data: [], error: null });
      
      return promise;
    },
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

