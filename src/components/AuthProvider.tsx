import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthContext = createContext<{
  session: any | null;
  user: any | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  session: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignIn = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the magic link to sign in.');
    } catch (error) {
      console.error('Error signing in:', error);
      alert(error.error_description || error.message);
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
    <AuthContext.Provider value={{ session, user, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
