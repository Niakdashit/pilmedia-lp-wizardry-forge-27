import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          throw new Error('Identifiant ou mot de passe incorrect');
        case 'Email not confirmed':
          throw new Error('Veuillez confirmer votre email avant de vous connecter');
        default:
          throw new Error('Une erreur est survenue lors de la connexion');
      }
    }

    // After successful login, get user profile
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      }
    }

    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error };
    }
    return { 
      data: null, 
      error: new Error('Une erreur est survenue lors de la connexion') 
    };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}