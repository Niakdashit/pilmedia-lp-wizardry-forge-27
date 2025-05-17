import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, Search, MoreVertical, BarChart2, Download, X, Trash2 } from 'lucide-react';
import FormatModal from '../components/FormatModal';
import { Campaign } from '../types';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';

const CampaignsList: React.FC = () => {
  const navigate = useNavigate();
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showStats, setShowStats] = useState<Campaign | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Campaign | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    setShowFormatModal(true);
  };

  const handleExportData = async (campaign: Campaign) => {
    try {
      // Fetch questions and form fields
      const [questionsResult, fieldsResult] = await Promise.all([
        supabase.from('questions').select('*').eq('campaign_id', campaign.id),
        supabase.from('form_fields').select('*').eq('campaign_id', campaign.id)
      ]);

      const questions = questionsResult.data || [];
      const fields = fieldsResult.data || [];

      // Prepare data for export
      const exportData = {
        'Campaign Info': [{
          Name: campaign.name,
          Type: campaign.type,
          Status: campaign.status,
          'Start Date': campaign.start_date,
          'End Date': campaign.end_date,
          Participants: campaign.participants,
          'Created At': new Date(campaign.created_at).toLocaleDateString()
        }],
        Questions: questions.map(q => ({
          Text: q.text,
          Type: q.type,
          Options: q.options ? JSON.stringify(q.options) : '',
          'Correct Answer': q.correct_answer || ''
        })),
        'Form Fields': fields.map(f => ({
          Label: f.label,
          Type: f.type,
          Required: f.required ? 'Yes' : 'No',
          Options: f.options ? JSON.stringify(f.options) : '',
          Placeholder: f.placeholder || ''
        }))
      };

      // Create workbook
      const wb = XLSX.utils.book_new();

      // Add worksheets
      Object.entries(exportData).forEach(([sheetName, data]) => {
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });

      // Generate Excel file
      XLSX.writeFile(wb, `campaign-${campaign.id}-export.xlsx`);

      setActiveMenu(null);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Erreur lors de l\'export des données');
    }
  };

  const toggleMenu = (campaignId: string) => {
    setActiveMenu(activeMenu === campaignId ? null : campaignId);
  };

  const handleShowStats = (campaign: Campaign) => {
    setShowStats(campaign);
    setActiveMenu(null);
  };

  const handleDelete = (campaign: Campaign) => {
    setShowDeleteConfirm(campaign);
    setActiveMenu(null);
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;
    
    try {
      setDeleting(true);
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', showDeleteConfirm.id);

      if (error) throw error;

      setCampaigns(campaigns.filter(c => c.id !== showDeleteConfirm.id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Error deleting campaign');
    } finally {
      setDeleting(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Toutes les campagnes</h1>
        <button 
          className="btn-primary px-4 py-2 rounded-md flex items-center"
          onClick={handleCreateCampaign}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouvelle campagne
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              className="bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#841b60] appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="quiz">Quiz</option>
              <option value="survey">Sondage</option>
              <option value="contest">Concours</option>
              <option value="form">Formulaire</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <div className="relative">
            <select 
              className="bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#841b60] appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="scheduled">En préparation</option>
              <option value="ended">Terminée</option>
              <option value="draft">Brouillon</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <input 
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
            placeholder="Rechercher..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded flex items-center justify-center text-white font-bold 
                        ${campaign.type === 'quiz' ? 'bg-[#841b60]' : 
                        campaign.type === 'survey' ? 'bg-[#000000]' : 
                        campaign.type === 'contest' ? 'bg-gradient-to-r from-[#841b60] to-[#000000]' : 
                        'bg-[#841b60]'}`}>
                        {campaign.type.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">ID: CAM-{String(campaign.id).slice(-3).padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#841b60] bg-opacity-10 text-[#841b60]">
                      {campaign.type === 'quiz' ? 'Quiz' : 
                      campaign.type === 'survey' ? 'Sondage' : 
                      campaign.type === 'contest' ? 'Concours' : 'Formulaire'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(campaign.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      campaign.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {campaign.status === 'active' ? 'Active' :
                      campaign.status === 'draft' ? 'Brouillon' :
                      campaign.status === 'scheduled' ? 'En préparation' :
                      'Terminée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(campaign.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {activeMenu === campaign.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                          <button
                            onClick={() => handleShowStats(campaign)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <BarChart2 className="w-4 h-4 mr-2" />
                            Voir les statistiques
                          </button>
                          <button
                            onClick={() => handleExportData(campaign)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Exporter les données
                          </button>
                          <button
                            onClick={() => handleDelete(campaign)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredCampaigns.length}</span> sur <span className="font-medium">{campaigns.length}</span> résultats
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
            Précédent
          </button>
          <button className="px-3 py-1 rounded-md bg-[#841b60] text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>

      {/* Format Modal */}
      <FormatModal 
        isOpen={showFormatModal} 
        onClose={() => setShowFormatModal(false)} 
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la campagne "{showDeleteConfirm.name}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowDeleteConfirm(null)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowStats(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Statistiques de la campagne</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowStats(null)}
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
                <p className="text-2xl font-bold">{showStats.participants}</p>
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
                <p className="text-2xl font-bold">{Math.floor(showStats.participants * 0.85)}</p>
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
                <p className="text-2xl font-bold">{showStats.participants * 3}</p>
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
                <p className="text-2xl font-bold">65.16%</p>
                <p className="text-sm text-gray-500">9 019 participants</p>
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
                <p className="text-2xl font-bold">{Math.floor(showStats.participants * 0.31)}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Legal & Rules</h3>
                <p className="text-2xl font-bold">0</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Partner Opt-ins</h3>
                <p className="text-2xl font-bold">{Math.floor(showStats.participants * 0.33)}</p>
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
                <p className="text-2xl font-bold">{Math.floor(showStats.participants * 0.74)}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Uncategorized Opt-ins</h3>
                <p className="text-2xl font-bold">0</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-[#841b60] bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#841b60]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-gray-500 mb-1">Facebook Shares</h3>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsList;