
import { createClient } from '@supabase/supabase-js';

// Use fallback values if environment variables are not defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

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
    // First check if we're using fallback values
    if (supabaseUrl === 'https://your-supabase-url.supabase.co' || 
        supabaseAnonKey === 'your-anon-key') {
      console.warn('Using fallback Supabase credentials. Please set up proper environment variables.');
      return false;
    }
    
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
