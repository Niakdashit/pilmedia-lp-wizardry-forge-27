import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Eye, Share2, Upload, X, ChevronRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Campaign, Question, FormField } from '../types';
import EditorTabs from '../components/EditorTabs';
import QuestionBuilder from '../components/QuestionBuilder';
import CampaignPreview from '../components/CampaignPreview';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';

const CampaignEditor: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'quiz';
  
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showMobileBuilder, setShowMobileBuilder] = useState(false);

  useEffect(() => {
    const initializeCampaign = async () => {
      try {
        if (id) {
          const { data: campaignData, error: campaignError } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', id)
            .single();

          if (campaignError) throw campaignError;

          const { data: questionsData, error: questionsError } = await supabase
            .from('questions')
            .select('*')
            .eq('campaign_id', id);

          if (questionsError) throw questionsError;

          const { data: fieldsData, error: fieldsError } = await supabase
            .from('form_fields')
            .select('*')
            .eq('campaign_id', id);

          if (fieldsError) throw fieldsError;

          setCampaign({
            ...campaignData,
            questions: questionsData || [],
            fields: fieldsData || []
          });
        } else {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('No authenticated user found');

          const today = new Date().toISOString().split('T')[0];

          const newCampaign: Campaign = {
            id: uuidv4(),
            name: 'Nouvelle Campagne',
            type,
            status: 'draft',
            start_date: today,
            end_date: today,
            start_time: '00:00',
            end_time: '23:59',
            url: '',
            background_image: '',
            user_id: user.id,
            style: {
              containerRadius: '12px',
              buttonRadius: '8px',
              containerOpacity: '0.9',
              buttonPadding: '12px 24px'
            },
            colors: {
              background: '#ffffff',
              button: '#841b60',
              buttonText: '#ffffff',
              text: '#333333',
              border: '#e5e7eb',
              questionBackground: 'rgba(255, 255, 255, 0.9)',
              progressBar: '#841b60'
            },
            participants: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            questions: [],
            fields: []
          };
          setCampaign(newCampaign);
        }
      } catch (error) {
        console.error('Error initializing campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeCampaign();
  }, [id, type]);

  const handleSave = async (andExit: boolean = false) => {
  if (!campaign) return;

  try {
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user found');

    // 🛠 Correction ici : s'assurer que public_url est défini
    if (!campaign.public_url) {
      campaign.public_url = campaign.id;
    }

    const { questions, fields, ...campaignData } = campaign;

// 🔥 Ajout critique
campaignData.form_fields = fields;


    const { error: campaignError } = await supabase
      .from('campaigns')
      .upsert({
        ...campaignData,
        user_id: user.id,
        updated_at: new Date().toISOString()
      });

    if (campaignError) throw campaignError;

    // (le reste reste inchangé…)


      if (campaignError) throw campaignError;

      if (questions && questions.length > 0) {
        const { error: deleteQuestionsError } = await supabase
          .from('questions')
          .delete()
          .eq('campaign_id', campaign.id);

        if (deleteQuestionsError) throw deleteQuestionsError;

        const { error: insertQuestionsError } = await supabase
          .from('questions')
          .insert(questions.map(q => ({
            ...q,
            campaign_id: campaign.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })));

        if (insertQuestionsError) throw insertQuestionsError;
      }

      if (fields && fields.length > 0) {
        const { error: deleteFieldsError } = await supabase
          .from('form_fields')
          .delete()
          .eq('campaign_id', campaign.id);

        if (deleteFieldsError) throw deleteFieldsError;

        const { error: insertFieldsError } = await supabase
          .from('form_fields')
          .insert(fields.map(f => ({
            ...f,
            campaign_id: campaign.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })));

        if (insertFieldsError) throw insertFieldsError;
      }

      if (andExit) {
        navigate('/dashboard/campaigns');
      } else {
        if (activeTab === 'general') {
          setActiveTab('content');
        } else if (activeTab === 'content') {
          setActiveTab('design');
        }
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Error saving campaign: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/campaigns');
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!campaign) return;
    
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadError(null);

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("L'image ne doit pas dépasser 5MB");
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Seules les images sont acceptées');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `campaign-backgrounds/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('campaign-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('campaign-assets')
        .getPublicUrl(filePath);

      setCampaign(prev => {
        if (!prev) return prev;
        return { ...prev, background_image: publicUrl };
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(error instanceof Error ? error.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }, [campaign]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const removeImage = () => {
    if (!campaign?.background_image) return;
    
    setCampaign(prev => {
      if (!prev) return prev;
      return { ...prev, background_image: '' };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">
                  {campaign?.name || 'Nouvelle Campagne'}
                </h1>
                <p className="text-sm text-gray-500">
                  {campaign?.type === 'quiz' ? 'Quiz' :
                   campaign?.type === 'survey' ? 'Sondage' :
                   campaign?.type === 'contest' ? 'Concours' : 'Formulaire'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer et continuer'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'general' && campaign && (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la campagne
                  </label>
                  <input
                    type="text"
                    value={campaign.name}
                    onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    placeholder="Ex: Quiz sur nos produits"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de la campagne
                  </label>
                  <input
                    type="url"
                    value={campaign.url || ''}
                    onChange={(e) => setCampaign({ ...campaign, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    placeholder="https://exemple.com/ma-campagne"
                  />
                </div>

               <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    URL publique
  </label>
  <div className="flex items-center space-x-2">
    <input
      type="text"
      value={`https://cerulean-sprite-d201e9.netlify.app/${campaign.public_url || campaign.id}`}
      readOnly
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
    />
    <button
      onClick={() => {
        navigator.clipboard.writeText(`https://cerulean-sprite-d201e9.netlify.app/${campaign.public_url || campaign.id}`);
        alert('URL copiée !');
      }}
      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      Copier
    </button>
  </div>
  <p className="mt-1 text-sm text-gray-500">Cette URL permet d'accéder à votre campagne publiquement</p>
</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={campaign.start_date}
                      onChange={(e) => setCampaign({ ...campaign, start_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={campaign.start_time}
                      onChange={(e) => setCampaign({ ...campaign, start_time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={campaign.end_date}
                      onChange={(e) => setCampaign({ ...campaign, end_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      value={campaign.end_time}
                      onChange={(e) => setCampaign({ ...campaign, end_time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    value={campaign.status}
                    onChange={(e) => setCampaign({ ...campaign, status: e.target.value as Campaign['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="scheduled">En préparation</option>
                    <option value="active">Active</option>
                    <option value="ended">Terminée</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'content' || activeTab === 'design') && campaign && (
            <div className="flex flex-col lg:flex-row">
              {/* Mobile Builder Toggle */}
              <div className="lg:hidden flex justify-between items-center p-4 border-b">
                <button
                  onClick={() => setShowMobileBuilder(!showMobileBuilder)}
                  className="text-[#841b60]"
                >
                  {showMobileBuilder ? 'Voir l\'aperçu' : 'Modifier le contenu'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Builder Panel */}
              <div className={`
                w-full lg:w-1/3 border-r
                ${showMobileBuilder ? 'block' : 'hidden lg:block'}
              `}>
                {activeTab === 'content' && (
                  <div className="p-4">
                    <QuestionBuilder
                      onAddField={(field) => {
                        const newField = { ...field, id: uuidv4() };
                        setCampaign({
                          ...campaign,
                          fields: [...(campaign.fields || []), newField]
                        });
                      }}
                      onAddQuestion={(question) => {
                        const newQuestion = { ...question, id: uuidv4() };
                        setCampaign({
                          ...campaign,
                          questions: [...(campaign.questions || []), newQuestion]
                        });
                      }}
                      fields={campaign.fields || []}
                      questions={campaign.questions || []}
                      onRemoveField={(id) => {
                        setCampaign({
                          ...campaign,
                          fields: campaign.fields?.filter(f => f.id !== id) || []
                        });
                      }}
                      onRemoveQuestion={(id) => {
                        setCampaign({
                          ...campaign,
                          questions: campaign.questions?.filter(q => q.id !== id) || []
                        });
                      }}
                    />
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="p-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Image de fond</h3>
                      <div className="space-y-4">
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                            ${isDragActive ? 'border-[#841b60] bg-[#841b60] bg-opacity-5' : 'border-gray-300 hover:border-[#841b60]'}`}
                        >
                          <input {...getInputProps()} />
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {isDragActive
                              ? "Déposez l'image ici"
                              : "Glissez-déposez une image ou cliquez pour sélectionner"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG ou GIF (max. 5MB)
                          </p>
                        </div>

                        {uploadError && (
                          <p className="text-sm text-red-600">{uploadError}</p>
                        )}

                        {uploading && (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#841b60] border-t-transparent"></div>
                            <span className="ml-2 text-sm text-gray-600">Upload en cours...</span>
                          </div>
                        )}

                        {campaign.background_image && (
                          <div className="relative">
                            <img
                              src={campaign.background_image}
                              alt="Aperçu"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={removeImage}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Couleurs</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Arrière-plan
                          </label>
                          <input
                            type="color"
                            value={campaign.colors?.background || '#ffffff'}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              colors: { ...(campaign.colors || {}), background: e.target.value }
                            })}
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Boutons
                          </label>
                          <input
                            type="color"
                            value={campaign.colors?.button || '#841b60'}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              colors: { ...(campaign.colors || {}), button: e.target.value }
                            })}
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Texte boutons
                          </label>
                          <input
                            type="color"
                            value={campaign.colors?.buttonText || '#ffffff'}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              colors: { ...(campaign.colors || {}), buttonText: e.target.value }
                            })}
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Texte
                          </label>
                          <input
                            type="color"
                            value={campaign.colors?.text || '#333333'}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              colors: { ...(campaign.colors || {}), text: e.target.value }
                            })}
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bordures
                          </label>
                          <input
                            type="color"
                            value={campaign.colors?.border || '#e5e7eb'}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              colors: { ...(campaign.colors || {}), border: e.target.value }
                            })}
                            className="w-full h-10 p-1 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Style</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rayon des coins (conteneur)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={parseInt(campaign.style?.containerRadius || '12')}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              style: {
                                ...(campaign.style || {}),
                                containerRadius: `${e.target.value}px`
                              }
                            })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rayon des coins (boutons)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={parseInt(campaign.style?.buttonRadius || '8')}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              style: {
                                ...(campaign.style || {}),
                                buttonRadius: `${e.target.value}px`
                              }
                            })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Opacité du conteneur
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={parseFloat(campaign.style?.containerOpacity || '0.9') * 100}
                            onChange={(e) => setCampaign({
                              ...campaign,
                              style: {
                                ...(campaign.style || {}),
                                containerOpacity: (parseInt(e.target.value) / 100).toString()
                              }
                            })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              <div className={`
                w-full lg:w-2/3
                ${showMobileBuilder ? 'hidden lg:block' : 'block'}
              `}>
                <div className="h-[calc(100vh-240px)] p-4">
                  {campaign && <CampaignPreview campaign={campaign} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPreview && campaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Aperçu de la campagne</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <CampaignPreview campaign={campaign} />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4 px-6 flex justify-end space-x-4">
        <button
          onClick={() => handleSave(true)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Fermer
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Enregistrement...
            </>
          ) : (
            'Enregistrer'
          )}
        </button>
      </div>
    </div>
  );
};

export default CampaignEditor;