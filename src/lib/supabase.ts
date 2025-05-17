import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// More detailed error checking for environment variables
if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is not defined in environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined in environment variables');
}

// Initialize the Supabase client with explicit session handling and error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    detectSessionInUrl: true
  },
  global: {
    fetch: (...args) => {
      return fetch(...args).catch(err => {
        console.error('Supabase fetch error:', err);
        throw new Error('Failed to connect to Supabase. Please check your internet connection and try again.');
      });
    }
  }
});

// Export a helper function to check if Supabase is properly configured
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to test Supabase connection:', err);
    return false;
  }
};