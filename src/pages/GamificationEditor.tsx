import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import GamePreview from '../components/GamePreview';

interface GameSettings {
  id: string;
  name: string;
  type: string;
  created_at: string;
  user_id: string;
  game_settings: {
    [key: string]: any;
  };
}

interface Segment {
  text: string;
  color: string;
  probability?: number;
}

const GamificationEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('game_settings')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setSettings(data);
        setName(data.name);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [id]);

  const handleImageUpload = async (file: File, gameType: string) => {
    if (!settings) return;
    
    try {
      const filePath = `${gameType}-images/${uuidv4()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('game-assets')
        .upload(filePath, file);
        
      const { data: { publicUrl } } = supabase.storage
        .from('game-assets')
        .getPublicUrl(filePath);
        
      setSettings(prev => {
        if (!prev) return prev;
        
        const updatedSettings = {
          ...prev,
          game_settings: {
            ...prev.game_settings,
            [gameType]: {
              ...prev.game_settings[gameType],
              imageUrl: publicUrl
            }
          }
        };
        
        return updatedSettings;
      });
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  const handlePuzzleImageUpload = useCallback(async (file: File) => {
    if (!settings) return;
    
    try {
      const filePath = `puzzle-images/${uuidv4()}.${file.name.split('.').pop()}`;
      
      const { error } = await supabase.storage
        .from('game-assets')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('game-assets')
        .getPublicUrl(filePath);
        
      setSettings(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          game_settings: {
            ...prev.game_settings,
            puzzle: {
              ...prev.game_settings.puzzle,
              imageUrl: publicUrl,
              gridSize: prev.game_settings.puzzle.gridSize || 3
            }
          }
        };
      });
      
    } catch (error) {
      console.error('Error uploading puzzle image:', error);
    }
  }, [settings]);
  
  const handleSegmentAdd = () => {
    if (!settings) return;
    
    const newSegment: Segment = { text: 'New Segment', color: '#ffffff', probability: 1 };
    
    setSettings(prev => {
      if (!prev) return prev;
      
      const updatedSegments = [...(prev.game_settings.wheel?.segments || []), newSegment];
      
      return {
        ...prev,
        game_settings: {
          ...prev.game_settings,
          wheel: {
            ...prev.game_settings.wheel,
            segments: updatedSegments
          }
        }
      };
    });
  };
  
  const handleSegmentRemove = (index: number) => {
    if (!settings) return;
    
    setSettings(prev => {
      if (!prev) return prev;
      
      const updatedSegments = [...(prev.game_settings.wheel?.segments || [])];
      updatedSegments.splice(index, 1);
      
      return {
        ...prev,
        game_settings: {
          ...prev.game_settings,
          wheel: {
            ...prev.game_settings.wheel,
            segments: updatedSegments
          }
        }
      };
    });
  };

  const handleSegmentChange = (index: number, field: string, value: any) => {
    if (!settings) return;
  
    setSettings(prev => {
      if (!prev) return prev;
  
      const updatedSegments = [...(prev.game_settings.wheel?.segments || [])];
      updatedSegments[index] = {
        ...updatedSegments[index],
        [field]: value
      };
  
      return {
        ...prev,
        game_settings: {
          ...prev.game_settings,
          wheel: {
            ...prev.game_settings.wheel,
            segments: updatedSegments
          }
        }
      };
    });
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('game_settings')
        .upsert({
          id: settings.id,
          name: name,
          type: settings.type,
          user_id: settings.user_id,
          game_settings: settings.game_settings,
          created_at: settings.created_at
        });

      if (error) throw error;

      navigate('/dashboard/gamification');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/gamification');
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

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
                <h1 className="text-xl font-semibold">{name || 'Nouveau Jeu'}</h1>
                <p className="text-sm text-gray-500">{settings?.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-3 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Paramètres Généraux</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom du Jeu</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Aperçu</h2>
            </div>
            <div className="p-6">
              <GamePreview settings={settings} />
            </div>
          </div>
        </div>

        {settings.type === 'puzzle' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Paramètres du Puzzle</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image du Puzzle</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handlePuzzleImageUpload(e.target.files[0]);
                      }
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                  />
                  {settings.game_settings.puzzle?.imageUrl && (
                    <img
                      src={settings.game_settings.puzzle.imageUrl}
                      alt="Puzzle Preview"
                      className="mt-2 rounded-md"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Taille de la Grille</label>
                  <select
                    value={settings.game_settings.puzzle?.gridSize || 3}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSettings(prev => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          game_settings: {
                            ...prev.game_settings,
                            puzzle: {
                              ...prev.game_settings.puzzle,
                              gridSize: value
                            }
                          }
                        };
                      });
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                  >
                    <option value="3">3x3</option>
                    <option value="4">4x4</option>
                    <option value="5">5x5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {settings.type === 'wheel' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Paramètres de la Roue</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={handleSegmentAdd}
                  className="bg-[#841b60] text-white px-4 py-2 rounded-md hover:bg-[#6d1750] transition-colors"
                >
                  Ajouter un Segment
                </button>
                {settings.game_settings.wheel?.segments?.map((segment: Segment, index: number) => (
                  <div key={index} className="border rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-700">Segment {index + 1}</h3>
                      <button
                        onClick={() => handleSegmentRemove(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Texte</label>
                      <input
                        type="text"
                        value={segment.text}
                        onChange={(e) => handleSegmentChange(index, 'text', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Couleur</label>
                      <input
                        type="color"
                        value={segment.color}
                        onChange={(e) => handleSegmentChange(index, 'color', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Probabilité</label>
                      <input
                        type="number"
                        value={segment.probability || 1}
                        onChange={(e) => handleSegmentChange(index, 'probability', parseFloat(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#841b60] focus:border-[#841b60] sm:text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationEditor;
