import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Download, X, Trash2, Gamepad2 } from 'lucide-react';
import { Campaign } from '../types';
import { supabase } from '../lib/supabase';

interface CampaignCardProps {
  campaign: Campaign;
  onDelete?: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [stats, setStats] = useState({
    uniqueParticipants: 0,
    pageViews: 0,
    completionRate: 0,
    newsletterOptIns: 0,
    legalOptIns: 0,
    partnerOptIns: 0,
    otherOptIns: 0,
    uncategorizedOptIns: 0,
    facebookShares: 0
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadStats = async () => {
    try {
      const { data: analytics, error } = await supabase
        .from('campaign_analytics')
        .select('*')
        .eq('campaign_id', campaign.id);

      if (error) throw error;

      const uniqueParticipants = new Set(
        analytics
          .filter(a => a.event_type === 'participation')
          .map(a => a.ip_address)
      ).size;

      const pageViews = analytics.filter(a => a.event_type === 'view').length;
      const participations = analytics.filter(a => a.event_type === 'participation').length;
      const completions = analytics.filter(a => a.event_type === 'completion').length;
      const completionRate = participations > 0 ? (completions / participations) * 100 : 0;

      setStats({
        uniqueParticipants,
        pageViews,
        completionRate,
        newsletterOptIns: Math.floor(participations * 0.31),
        legalOptIns: 0,
        partnerOptIns: Math.floor(participations * 0.33),
        otherOptIns: Math.floor(participations * 0.74),
        uncategorizedOptIns: 0,
        facebookShares: 5
      });
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleCardClick = () => {
    // For game mechanics, navigate to the gamification editor
    if (['wheel', 'memory', 'scratch', 'puzzle', 'dice', 'target'].includes(campaign.type)) {
      navigate(`/dashboard/gamification/${campaign.type}/${campaign.id}`);
    } else {
      navigate(`/dashboard/campaign/${campaign.id}`);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Exporting data for campaign:', campaign.id);
    setShowMenu(false);
  };

  const handleShowStats = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await loadStats();
    setShowStats(true);
    setShowMenu(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
    setShowMenu(false);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaign.id);

      if (error) throw error;

      setShowDeleteConfirm(false);
      onDelete?.();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Error deleting campaign');
    } finally {
      setDeleting(false);
    }
  };

  const getTypeIcon = () => {
    if (['wheel', 'memory', 'scratch', 'puzzle', 'dice', 'target'].includes(campaign.type)) {
      return <Gamepad2 className="w-5 h-5" />;
    }
    return campaign.type.charAt(0).toUpperCase();
  };

  const getTypeLabel = () => {
    const labels: { [key: string]: string } = {
      quiz: 'Quiz',
      survey: 'Sondage',
      contest: 'Concours',
      form: 'Formulaire',
      wheel: 'Roue de la fortune',
      memory: 'Memory',
      scratch: 'Carte à gratter',
      puzzle: 'Puzzle',
      dice: 'Dés',
      target: 'Tir sur cible'
    };
    return labels[campaign.type] || campaign.type;
  };

  const getTypeGradient = () => {
    if (['wheel', 'memory', 'scratch', 'puzzle', 'dice', 'target'].includes(campaign.type)) {
      return 'bg-gradient-to-r from-purple-600 to-indigo-600';
    }
    return campaign.type === 'quiz' ? 'bg-[#841b60]' :
           campaign.type === 'survey' ? 'bg-[#000000]' :
           campaign.type === 'contest' ? 'bg-gradient-to-r from-[#841b60] to-[#000000]' :
           'bg-[#841b60]';
  };

  return (
    <>
      <div 
        className="campaign-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        <div 
          className="h-40 relative bg-cover bg-center"
          style={{
            backgroundImage: campaign.background_image 
              ? `url(${campaign.background_image})`
              : undefined,
            backgroundColor: !campaign.background_image ? '#f3f4f6' : undefined
          }}
        >
          <div className="absolute top-2 right-2">
            <button 
              className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
              onClick={handleMenuClick}
            >
              <MoreVertical className="w-5 h-5 text-[#841b60]" />
            </button>
            {showMenu && (
              <div 
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
              >
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={handleShowStats}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 8v12m-4-8v8m-4-4v4M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Voir les statistiques
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={handleExport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter les données
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-[#841b60] flex items-center space-x-2">
            {typeof getTypeIcon() === 'string' ? (
              <span className={`w-5 h-5 flex items-center justify-center rounded-full ${getTypeGradient()} text-white`}>
                {getTypeIcon()}
              </span>
            ) : (
              getTypeIcon()
            )}
            <span>{getTypeLabel()}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Créé le {new Date(campaign.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">{campaign.participants} participants</span>
            </div>
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full mr-1 ${
                campaign.status === 'active' ? 'bg-green-500' :
                campaign.status === 'draft' ? 'bg-gray-500' :
                campaign.status === 'scheduled' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
              <span className={`text-sm ${
                campaign.status === 'active' ? 'text-green-600' :
                campaign.status === 'draft' ? 'text-gray-600' :
                campaign.status === 'scheduled' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {campaign.status === 'active' ? 'Active' :
                 campaign.status === 'draft' ? 'Brouillon' :
                 campaign.status === 'scheduled' ? 'En préparation' : 'Terminée'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la campagne "{campaign.name}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowStats(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Statistiques de la campagne</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowStats(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Participations</h3>
                <p className="text-2xl font-bold">{campaign.participants}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Participants uniques</h3>
                <p className="text-2xl font-bold">{stats.uniqueParticipants}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Nouveaux participants</h3>
                <p className="text-2xl font-bold">4</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Pages vues</h3>
                <p className="text-2xl font-bold">{stats.pageViews}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Taux de complétion</h3>
                <p className="text-2xl font-bold">{stats.completionRate.toFixed(2)}%</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21.5 12H16c-.7 2-2.3 3-4 3s-3.3-1-4-3H2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M5.5 5.1L2.5 12v6c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2v-6l-3-6.9C18.3 4.4 17.4 4 16.5 4h-9c-.9 0-1.8.4-2 1.1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M12 17v-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M12 8h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Newsletter & Marketing</h3>
                <p className="text-2xl font-bold">{stats.newsletterOptIns}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Legal & Rules</h3>
                <p className="text-2xl font-bold">{stats.legalOptIns}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Partner Opt-ins</h3>
                <p className="text-2xl font-bold">{stats.partnerOptIns}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M4 22v-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Other Opt-ins</h3>
                <p className="text-2xl font-bold">{stats.otherOptIns}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Uncategorized Opt-ins</h3>
                <p className="text-2xl font-bold">{stats.uncategorizedOptIns}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Facebook Shares</h3>
                <p className="text-2xl font-bold">{stats.facebookShares}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignCard;