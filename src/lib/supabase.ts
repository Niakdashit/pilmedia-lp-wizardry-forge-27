


// Mock Supabase client for development
export const supabase = {
  from: (_table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (_columns?: string) => {
      // Create a chainable object that supports both direct awaiting and method chaining
      const chainableQuery = {
        eq: (_column: string, _value: any) => ({
          order: (_orderColumn: string, _options?: { ascending?: boolean }) => 
            Promise.resolve({ data: [], error: null })
        }),
        order: (_orderColumn: string, _options?: { ascending?: boolean }) => 
          Promise.resolve({ data: [], error: null }),
        // Make it awaitable by implementing thenable interface
        then: (resolve: any, reject?: any) => {
          return Promise.resolve({ data: [], error: null }).then(resolve, reject);
        },
        catch: (reject: any) => {
          return Promise.resolve({ data: [], error: null }).catch(reject);
        }
      };
      
      return chainableQuery;
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


