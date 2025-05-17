import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building2, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }
    if (!/[0-9]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)';
    }
    return null;
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Le nom complet est requis');
      return false;
    }
    if (!formData.company.trim()) {
      setError('Le nom de l\'entreprise est requis');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Le numéro de téléphone est requis');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    if (passwordError) {
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    
    if (name === 'password') {
      setPasswordError(validatePassword(value));
    }
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setPasswordError('Les mots de passe ne correspondent pas');
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Créer le compte utilisateur avec Supabase Auth
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company: formData.company,
            phone: formData.phone
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error('Aucune donnée utilisateur retournée après l\'inscription');

      // 2. Créer le profil utilisateur dans la table users
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: formData.email,
          full_name: formData.fullName,
          company: formData.company,
          phone: formData.phone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // 3. Rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 5C13.954 5 5 13.954 5 25C5 36.046 13.954 45 25 45C36.046 45 45 36.046 45 25C45 13.954 36.046 5 25 5Z" fill="#841b60"></path>
              <path d="M15 20H22V35H15V20Z" fill="white"></path>
              <path d="M25 15H32V35H25V15Z" fill="white"></path>
              <path d="M35 25H42V35H35V25Z" fill="white"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="text-gray-600 mt-2">Commencez à créer vos campagnes marketing</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          {error && (
            <div className="mb-6 p-4 text-sm bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Votre nom complet
                </div>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Votre email professionnel
                </div>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="vous@entreprise.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Le nom de votre entreprise
                </div>
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Votre numéro de téléphone
                </div>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Un mot de passe
                </div>
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="8 caractères minimum"
                minLength={8}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">Le mot de passe doit contenir :</p>
                <ul className="text-xs text-gray-500 list-disc list-inside">
                  <li>Au moins 8 caractères</li>
                  <li>Une lettre majuscule</li>
                  <li>Un chiffre</li>
                  <li>Un caractère spécial (!@#$%^&*)</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Confirmer le mot de passe
                </div>
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!passwordError}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-[#841b60] hover:bg-[#6d1750] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#841b60] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-[#841b60] hover:text-[#6d1750] font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;