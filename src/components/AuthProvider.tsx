
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, checkSupabaseConnection } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  supabaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  supabaseConfigured: false
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Supabase is properly configured
    checkSupabaseConnection().then(isConfigured => {
      setSupabaseConfigured(isConfigured);
      
      // Only try to get session if Supabase is configured
      if (isConfigured) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleSignIn = async (email: string) => {
    if (!supabaseConfigured) {
      alert('Supabase is not properly configured. Please set up your environment variables.');
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the magic link to sign in.');
    } catch (error: any) {
      console.error('Error signing in:', error);
      alert(error.error_description || error.message || 'An error occurred during sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading,
      signIn: handleSignIn, 
      signOut: handleSignOut,
      supabaseConfigured 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
