
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

const Account = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [company, setCompany] = useState('');
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setUserProfile(user);
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
        setCompany(data.company || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        company,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Une erreur est survenue lors de la mise à jour du profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Paramètres du compte</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profil</h2>
        <form onSubmit={updateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              value={userProfile?.email || ''}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Vous ne pouvez pas modifier votre email
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'avatar
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compte créé le
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              value={userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : ''}
              disabled
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
        <div className="space-y-4">
          <button
            onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Modifier le mot de passe
          </button>
          <button
            onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Activer la double authentification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
