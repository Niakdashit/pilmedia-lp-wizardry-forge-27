import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { signIn } from '../lib/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
        return;
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
          <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
          <p className="text-gray-600 mt-2">Bienvenue sur votre espace de gestion</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </div>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Mot de passe
                </div>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#841b60] focus:ring-[#841b60] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <a href="#" className="text-sm text-[#841b60] hover:text-[#6d1750]">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-[#841b60] hover:bg-[#6d1750] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#841b60]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="text-[#841b60] hover:text-[#6d1750] font-medium">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;