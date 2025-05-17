import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    // Function to handle session initialization
    const initializeSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }

        // Only redirect to login for dashboard routes
        if (!session?.user && location.pathname.startsWith('/dashboard')) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    // Initialize session
    initializeSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);

        // Only redirect to login for dashboard routes
        if (!session?.user && location.pathname.startsWith('/dashboard')) {
          navigate('/login', { replace: true });
        }
      }
    });

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};