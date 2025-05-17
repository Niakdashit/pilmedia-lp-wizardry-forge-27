import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Building2, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User as UserType } from '../types';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUserProfile();
    
    const storedTab = localStorage.getItem('accountActiveTab');
    if (storedTab === 'security') {
      setActiveTab('security');
      localStorage.removeItem('accountActiveTab');
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setMessage({ type: 'error', text: 'Aucun utilisateur connecté' });
        return;
      }

      // Get the existing profile
      const { data: profile, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        throw new Error('Failed to fetch user profile');
      }

      if (profile) {
        setUserProfile({
          id: profile.id,
          email: profile.email,
          fullName: profile.full_name || '',
          avatarUrl: profile.avatar_url,
          phone: profile.phone || '',
          company: profile.company || '',
          role: profile.role,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erreur lors du chargement du profil. Veuillez réessayer.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userProfile) return;
    
    try {
      setSaving(true);
      
      // Validate required fields
      if (!userProfile.fullName?.trim()) {
        throw new Error('Le nom complet est requis');
      }
      if (!userProfile.company?.trim()) {
        throw new Error('Le nom de l\'entreprise est requis');
      }
      if (!userProfile.phone?.trim()) {
        throw new Error('Le numéro de téléphone est requis');
      }

      const { error } = await supabase
        .from('users')
        .update({
          full_name: userProfile.fullName.trim(),
          company: userProfile.company.trim(),
          phone: userProfile.phone.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
      await loadUserProfile(); // Reload profile to ensure we have the latest data
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil' 
      });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres du compte</h1>
        <p className="text-gray-600 mt-1">Gérez vos informations personnelles et vos préférences</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-[#841b60] border-b-2 border-[#841b60]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profil
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'text-[#841b60] border-b-2 border-[#841b60]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Sécurité
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && userProfile && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {userProfile.avatarUrl ? (
                      <img
                        src={userProfile.avatarUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
                  <p className="text-sm text-gray-500">JPG, GIF ou PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4" />
                      <span>Nom complet</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={userProfile.fullName || ''}
                    onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <Mail className="w-4 h-4" />
                      <span>Email professionnel</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <Building2 className="w-4 h-4" />
                      <span>Entreprise</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={userProfile.company || ''}
                    onChange={(e) => setUserProfile({ ...userProfile, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Téléphone</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone || ''}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-center">
                  <p className="ml-3 text-sm text-yellow-700">
                    Pour plus de sécurité, nous vous recommandons d'activer l'authentification à deux facteurs.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Modifier le mot de passe</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors flex items-center"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;