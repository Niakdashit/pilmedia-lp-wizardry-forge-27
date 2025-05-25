
// Mock Supabase client for development
export const supabase = {
  from: (tableName: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null })
      })
    }),
    select: (columnsParam?: string) => ({
      eq: (columnName: string, valueParam: any) => ({
        eq: (column2Name: string, value2Param: any) => Promise.resolve({ count: 0, error: null })
      })
    }),
    update: (data: any) => Promise.resolve({ data, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
};
