import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, Save, Upload, X, Smartphone, Monitor, Layout, Type, Palette, Sliders } from 'lucide-react';
import GamePreview from '../components/GamePreview';
import EditorTabs from '../components/EditorTabs';
import QuestionBuilder from '../components/QuestionBuilder';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import ColorPicker from '../components/ColorPicker';

interface GameSettings {
  name: string;
  type: string;
  status: 'draft' | 'published';
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  url: string;
  background_image?: string;
  game_type: string;
  game_settings: {
    wheel?: {
      segments: Array<{
        text: string;
        color: string;
        probability?: number;
      }>;
    };
    memory?: {
      pairs: number;
      cards: Array<{
        content: string;
        image?: string;
      }>;
    };
    scratch?: {
      prize: {
        text: string;
        image?: string;
      };
      revealPercent: number;
    };
    puzzle?: {
      imageUrl: string;
      gridSize: number;
    };
    dice?: {
      sides: number;
      style: string;
    };
    target?: {
      targets: number;
      speed: number;
    };
  };
  game_content: {
    title: string;
    description: string;
    rules: string;
    successMessage: string;
    failureMessage: string;
  };
  game_style: {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      border: string;
      accent: string;
      hover: string;
      success: string;
      error: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      headingSize: string;
      lineHeight: string;
      fontWeight: string;
    };
    spacing: {
      padding: string;
      margin: string;
      gap: string;
      containerPadding: string;
    };
    effects: {
      borderRadius: string;
      buttonRadius: string;
      shadowSize: string;
      shadowColor: string;
      containerOpacity: string;
      blur: string;
      transition: string;
    };
    animation: {
      type: string;
      duration: string;
      delay: string;
      easing: string;
    };
    responsive: {
      breakpoints: {
        sm: string;
        md: string;
        lg: string;
      };
      scaling: {
        enabled: boolean;
        factor: number;
      };
    };
  };
  questions?: any[];
  fields?: any[];
  form_fields?: any[];
  public_url?: string;
}

const GamificationEditor: React.FC = () => {
  const { type, id } = useParams<{ type: string; id?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showPreview, setShowPreview] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeDesignSection, setActiveDesignSection] = useState('layout');
  const [settings, setSettings] = useState<GameSettings>({
    name: 'Nouvelle Campagne',
    type: type || 'wheel',
    status: 'draft',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    start_time: '00:00',
    end_time: '23:59',
    url: '',
    game_type: type || 'wheel',
    game_settings: {},
    game_content: {
      title: 'Titre de la campagne',
      description: 'Description de la campagne',
      rules: 'Règles du jeu',
      successMessage: 'Félicitations !',
      failureMessage: 'Essayez encore !'
    },
    game_style: {
      colors: {
        primary: '#841b60',
        secondary: '#6d1750',
        text: '#ffffff',
        background: '#ffffff',
        border: '#e5e7eb',
        accent: '#ffd700',
        hover: '#9b2170',
        success: '#22c55e',
        error: '#ef4444'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
        headingSize: '24px',
        lineHeight: '1.5',
        fontWeight: '500'
      },
      spacing: {
        padding: '16px',
        margin: '16px',
        gap: '12px',
        containerPadding: '24px'
      },
      effects: {
        borderRadius: '12px',
        buttonRadius: '8px',
        shadowSize: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        containerOpacity: '0.95',
        blur: '8px',
        transition: 'all 0.3s ease'
      },
      animation: {
        type: 'fade',
        duration: '0.3s',
        delay: '0s',
        easing: 'ease-in-out'
      },
      responsive: {
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px'
        },
        scaling: {
          enabled: true,
          factor: 0.9
        }
      }
    },
    questions: [],
    fields: [],
    form_fields: []
  });

  useEffect(() => {
    if (id) {
      loadCampaign();
    }
  }, [id]);

  const loadCampaign = async () => {
    try {
      const { data: campaign, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (campaign) {
        const { data: formFields } = await supabase
          .from('form_fields')
          .select('*')
          .eq('campaign_id', id);

        const { data: questions } = await supabase
          .from('questions')
          .select('*')
          .eq('campaign_id', id);

        setSettings({
          ...campaign,
          questions: questions || [],
          fields: formFields || [],
          form_fields: campaign.form_fields || []
        });
      }
    } catch (error) {
      console.error('Error loading campaign:', error);
    }
  };

  const handleSave = async (andExit = false) => {
    try {
      setSaving(true);

      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("Utilisateur non authentifié");

      const { fields = [], questions = [], ...rest } = settings;
      const campaignPayload = {
        ...rest,
        user_id: user.id,
        updated_at: new Date().toISOString(),
        form_fields: fields
      };
      
      let campaignId = id;
      if (id) {
        const { error } = await supabase
          .from("campaigns")
          .update(campaignPayload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("campaigns")
          .insert({
            ...campaignPayload,
            id: uuidv4(),
            created_at: new Date().toISOString(),
          })
          .select()
          .single();
        if (error) throw error;
        campaignId = data.id;
      }

      const gs = settings.game_settings;
      if (gs.wheel) {
        await supabase.from("wheel_settings").upsert({
          campaign_id: campaignId,
          segments: gs.wheel.segments,
        });
      }
      if (gs.memory) {
        await supabase.from("memory_settings").upsert({
          campaign_id: campaignId,
          pairs: gs.memory.pairs,
          cards: gs.memory.cards,
        });
      }
      if (gs.scratch) {
        await supabase.from("scratch_settings").upsert({
          campaign_id: campaignId,
          prize: gs.scratch.prize,
          reveal_percent: gs.scratch.revealPercent,
        });
      }
      if (gs.puzzle) {
        await supabase.from("puzzle_settings").upsert({
          campaign_id: campaignId,
          image_url: gs.puzzle.imageUrl,
          grid_size: gs.puzzle.gridSize,
        });
      }
      if (gs.dice) {
        await supabase.from("dice_settings").upsert({
          campaign_id: campaignId,
          sides: gs.dice.sides,
          style: gs.dice.style,
        });
      }
      if (gs.target) {
        await supabase.from("target_settings").upsert({
          campaign_id: campaignId,
          targets: gs.target.targets,
          speed: gs.target.speed,
        });
      }

      if (questions.length) {
        await Promise.all(
          questions.map(question =>
            supabase.from("questions").upsert({
              id: question.id,
              campaign_id: campaignId,
              text: question.text,
              type: question.type,
              options: question.options,
              correct_answer: question.correct_answer,
              created_at: question.created_at,
              updated_at: new Date().toISOString()
            })
          )
        );
      }

      if (andExit) {
        navigate("/dashboard/gamification");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Error saving campaign: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/gamification');
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
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
      const filePath = `game-backgrounds/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('campaign-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('campaign-assets')
        .getPublicUrl(filePath);

      setSettings(prev => ({
        ...prev,
        background_image: publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(error instanceof Error ? error.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }, []);

  const handlePuzzleImageUpload = useCallback(async (file: File) => {
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
      const fileName = `puzzle-images/${uuidv4()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('campaign-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('campaign-assets')
        .getPublicUrl(fileName);

      setSettings(prev => ({
        ...prev,
        game_settings: {
          ...prev.game_settings,
          puzzle: {
            ...prev.game_settings?.puzzle,
            imageUrl: publicUrl
          }
        }
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(error instanceof Error ? error.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const { getRootProps: getPuzzleImageRootProps, getInputProps: getPuzzleImageInputProps, isDragActive: isPuzzleImageDragActive } = useDropzone({
    onDrop: files => handlePuzzleImageUpload(files[0]),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const renderGeneralTab = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la campagne
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL publique
          </label>
          <div className="flex items-center space-x-2">
           <input
  type="text"
  value={`https://cerulean-sprite-d201e9.netlify.app/${settings.public_url || ''}`}
  readOnly
  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
/>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://cerulean-sprite-d201e9.netlify.app/${settings.public_url || ''}`);
                alert('URL copiée !');
              }}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Copier
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">Cette URL est générée automatiquement et permet d'accéder à votre jeu publiquement</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de début
          </label>
          <input
            type="date"
            value={settings.start_date}
            onChange={(e) => setSettings(prev => ({ ...prev, start_date: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin
          </label>
          <input
            type="date"
            value={settings.end_date}
            onChange={(e) => setSettings(prev => ({ ...prev, end_date: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure de début
          </label>
          <input
            type="time"
            value={settings.start_time}
            onChange={(e) => setSettings(prev => ({ ...prev, start_time: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure de fin
          </label>
          <input
            type="time"
            value={settings.end_time}
            onChange={(e) => setSettings(prev => ({ ...prev, end_time: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <select
            value={settings.status}
            onChange={(e) => setSettings(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>
      </div>
    );
  };

  const renderDesignTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveDesignSection('layout')}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              activeDesignSection === 'layout'
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Layout className="w-4 h-4 mr-2" />
            Layout
          </button>
          <button
            onClick={() => setActiveDesignSection('typography')}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              activeDesignSection === 'typography'
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Type className="w-4 h-4 mr-2" />
            Typography
          </button>
          <button
            onClick={() => setActiveDesignSection('colors')}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              activeDesignSection === 'colors'
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </button>
          <button
            onClick={() => setActiveDesignSection('effects')}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              activeDesignSection === 'effects'
                ? 'bg-[#841b60] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sliders className="w-4 h-4 mr-2" />
            Effects
          </button>
        </div>

        {activeDesignSection === 'colors' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur primaire
              </label>
              <ColorPicker
                color={settings.game_style.colors.primary}
                onChange={(color) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    colors: { ...prev.game_style.colors, primary: color }
                  }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur secondaire
              </label>
              <ColorPicker
                color={settings.game_style.colors.secondary}
                onChange={(color) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    colors: { ...prev.game_style.colors, secondary: color }
                  }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur d'accent
              </label>
              <ColorPicker
                color={settings.game_style.colors.accent}
                onChange={(color) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    colors: { ...prev.game_style.colors, accent: color }
                  }
                }))}
              />
            </div>
          </div>
        )}

        {activeDesignSection === 'typography' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Police
              </label>
              <select
                value={settings.game_style.typography.fontFamily}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    typography: { ...prev.game_style.typography, fontFamily: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille de police
              </label>
              <input
                type="text"
                value={settings.game_style.typography.fontSize}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    typography: { ...prev.game_style.typography, fontSize: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
              />
            </div>
          </div>
        )}

        {activeDesignSection === 'effects' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rayon des bordures
              </label>
              <input
                type="text"
                value={settings.game_style.effects.borderRadius}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    effects: { ...prev.game_style.effects, borderRadius: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opacité du conteneur
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={parseFloat(settings.game_style.effects.containerOpacity) * 100}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    effects: { ...prev.game_style.effects, containerOpacity: (parseInt(e.target.value) / 100).toString() }
                  }
                }))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeDesignSection === 'layout' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding du conteneur
              </label>
              <input
                type="text"
                value={settings.game_style.spacing.containerPadding}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    spacing: { ...prev.game_style.spacing, containerPadding: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espacement
              </label>
              <input
                type="text"
                value={settings.game_style.spacing.gap}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  game_style: {
                    ...prev.game_style,
                    spacing: { ...prev.game_style.spacing, gap: e.target.value }
                  }
                }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-[#841b60]"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <h1 className="text-xl font-semibold">{settings.name}</h1>
                <p className="text-sm text-gray-500">
                  {type === 'wheel' ? 'Roue de la Fortune' :
                   type === 'memory' ? 'Jeu de Mémoire' :
                   type === 'scratch' ? 'Carte à Gratter' :
                   type === 'puzzle' ? 'Puzzle' :
                   type === 'dice' ? 'Lancer de Dés' :
                   type === 'target' ? 'Tir sur Cible' : 'Jeu'}
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
                <Save className="w-4 h-4 mr-2" />
                Enregistrer et continuer
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center px-4 py-2 border border-[#841b60] text-[#841b60] rounded-lg hover:bg-[#841b60] hover:text-white transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer et quitter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex">
            <div className="w-1/3 border-r p-6">
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'content' && (
                <QuestionBuilder
                  onAddField={(field) => {
                    const newField = { ...field, id: uuidv4() };
                    setSettings(prev => ({
                      ...prev,
                      fields: [...(prev.fields || []), newField]
                    }));
                  }}
                  onAddQuestion={(question) => {
                    const newQuestion = { ...question, id: uuidv4() };
                    setSettings(prev => ({
                      ...prev,
                      questions: [...(prev.questions || []), newQuestion]
                    }));
                  }}
                  fields={settings.fields || []}
                  questions={settings.questions ||[]}
                  onRemoveField={(id) => {
                    setSettings(prev => ({
                      ...prev,
                      fields: prev.fields?.filter(f => f.id !== id) || []
                    }));
                  }}
                  onRemoveQuestion={(id) => {
                    setSettings(prev => ({
                      ...prev,
                      questions: prev.questions?.filter(q => q.id !== id) || []
                    }));
                  }}
                />
              )}
              {activeTab === 'design' && renderDesignTab()}
            </div>

            <div className="w-2/3 p-6">
              <div className="bg-gray-100 rounded-lg h-[calc(100vh-240px)] flex items-center justify-center">
                <div style={{ 
                  width: isMobilePreview ? '375px' : '1280px',
                  height: isMobilePreview ? '667px' : '720px',
                  transform: `scale(${isMobilePreview ? 0.75 : 0.6})`,
                  transformOrigin: 'center center',
                  overflow: 'hidden'
                }}>
                  <GamePreview type={type} settings={settings} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-medium">Aperçu de la campagne</h3>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setIsMobilePreview(false)}
                    className={`p-2 rounded-md flex items-center ${!isMobilePreview ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="ml-2 text-sm">Desktop</span>
                  </button>
                  <button
                    onClick={() => setIsMobilePreview(true)}
                    className={`p-2 rounded-md flex items-center ${isMobilePreview ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="ml-2 text-sm">Mobile</span>
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 p-8">
              <div
                className={`mx-auto transition-all duration-300 ${
                  isMobilePreview 
                    ? 'w-[375px] h-[667px]' 
                    : 'w-[1280px] h-[720px]'
                }`}
              >
                <GamePreview type={type} settings={settings} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4 px-6 flex justify-end space-x-4">
        <button
          onClick={handleCancel}
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

export default GamificationEditor;