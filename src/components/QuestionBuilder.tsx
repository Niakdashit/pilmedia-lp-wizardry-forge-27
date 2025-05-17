import React, { useState, useEffect } from 'react';
import { FormField, Question } from '../types';
import { PlusCircle, X, ChevronDown, ChevronUp, Copy, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface ContentTemplate {
  id: string;
  name: string;
  type: string;
  data: {
    questions?: Question[];
    fields?: FormField[];
  };
}

interface FormBuilderProps {
  onAddField: (field: Omit<FormField, 'id'>) => void;
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  fields: FormField[];
  questions: Question[];
  onRemoveField: (id: string) => void;
  onRemoveQuestion: (id: string) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ 
  onAddField, 
  onAddQuestion,
  fields = [], 
  questions = [],
  onRemoveField,
  onRemoveQuestion
}) => {
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState<string>('text');
  const [isRequired, setIsRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<string[]>(['']);
  const [placeholder, setPlaceholder] = useState('');
  
  const [questionText, setQuestionText] = useState('');
  const [questionOptions, setQuestionOptions] = useState<string[]>(['']);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(true);
  const [isQuizBuilderOpen, setIsQuizBuilderOpen] = useState(false);
  const [isContentSearchOpen, setIsContentSearchOpen] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, [searchQuery]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('content_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Ensure data field is properly parsed
      const parsedTemplates = data?.map(template => ({
        ...template,
        data: typeof template.data === 'string' ? JSON.parse(template.data) : template.data
      })) || [];

      console.log('Loaded templates:', parsedTemplates);
      setTemplates(parsedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Veuillez entrer un nom pour le template');
      return;
    }

    try {
      setSavingTemplate(true);
      console.log('Saving template with fields:', fields, 'and questions:', questions);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const templateData = {
        fields: fields,
        questions: questions
      };

      console.log('Template data to save:', templateData);

      const { error } = await supabase
        .from('content_templates')
        .insert({
          name: templateName.trim(),
          type: questions.length > 0 ? 'quiz' : 'form',
          data: templateData,
          user_id: user.id
        });

      if (error) throw error;

      setTemplateName('');
      setShowSaveDialog(false);
      await loadTemplates();
      alert('Template sauvegardé avec succès');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Erreur lors de la sauvegarde du template');
    } finally {
      setSavingTemplate(false);
    }
  };

  const handleUseTemplate = async (template: ContentTemplate) => {
  try {
    console.log('Using template:', template);

    // Vérifie que le template contient bien des données
    if (!template.data || !template.data.fields || !template.data.questions) {
      console.error('Template data is incomplete:', template.data);
      alert('Template data is incomplete.');
      return;
    }

    // Clear existing fields and questions first
    while (fields.length > 0) {
      onRemoveField(fields[0].id);
    }
    while (questions.length > 0) {
      onRemoveQuestion(questions[0].id);
    }

    // Add form fields
    if (Array.isArray(template.data.fields)) {
      console.log('Adding fields:', template.data.fields);
      for (const field of template.data.fields) {
        if (field.label && field.type) {
          console.log('Adding field:', field); // Log chaque champ ajouté
          onAddField({
            label: field.label,
            type: field.type,
            required: field.required || false,
            options: field.options || [],
            placeholder: field.placeholder || ''
          });
        } else {
          console.warn('Missing required field data:', field);
        }
      }
    } else {
      console.error('Fields array is missing or invalid:', template.data.fields);
    }

    // Add quiz questions
    if (Array.isArray(template.data.questions)) {
      console.log('Adding questions:', template.data.questions);
      for (const question of template.data.questions) {
        if (question.text && question.type) {
          console.log('Adding question:', question); // Log chaque question ajoutée
          onAddQuestion({
            text: question.text,
            type: question.type || 'multiple-choice',
            options: question.options || [],
            correctAnswer: question.correctAnswer || null
          });
        } else {
          console.warn('Missing required question data:', question);
        }
      }
    } else {
      console.error('Questions array is missing or invalid:', template.data.questions);
    }

    console.log('Template loaded successfully');
  } catch (error) {
    console.error('Error using template:', error);
    alert('Erreur lors du chargement du template');
  }
};


  const handleAddFieldOption = () => {
    setFieldOptions([...fieldOptions, '']);
  };

  const handleChangeFieldOption = (index: number, value: string) => {
    const newOptions = [...fieldOptions];
    newOptions[index] = value;
    setFieldOptions(newOptions);
  };

  const handleRemoveFieldOption = (index: number) => {
    if (fieldOptions.length <= 1) return;
    const newOptions = [...fieldOptions];
    newOptions.splice(index, 1);
    setFieldOptions(newOptions);
  };

  const handleAddQuestionOption = () => {
    setQuestionOptions([...questionOptions, '']);
  };

  const handleChangeQuestionOption = (index: number, value: string) => {
    const newOptions = [...questionOptions];
    newOptions[index] = value;
    setQuestionOptions(newOptions);
  };

  const handleRemoveQuestionOption = (index: number) => {
    if (questionOptions.length <= 1) return;
    const newOptions = [...questionOptions];
    newOptions.splice(index, 1);
    setQuestionOptions(newOptions);
  };

  const handleAddField = () => {
    if (!fieldLabel.trim()) return;
    
    onAddField({
      label: fieldLabel,
      type: fieldType,
      required: isRequired,
      options: fieldType === 'select' || fieldType === 'radio' ? fieldOptions.filter(opt => opt.trim()) : undefined,
      placeholder: placeholder || undefined
    });
    
    setFieldLabel('');
    setFieldType('text');
    setIsRequired(false);
    setFieldOptions(['']);
    setPlaceholder('');
  };

  const handleAddQuestion = () => {
    if (!questionText.trim()) return;
    
    onAddQuestion({
      text: questionText,
      type: 'multiple-choice',
      options: questionOptions.filter(opt => opt.trim())
    });
    
    setQuestionText('');
    setQuestionOptions(['']);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">Constructeur de formulaire</h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center px-3 py-1 text-[#841b60] hover:bg-[#841b60] hover:text-white rounded transition-colors"
        >
          <Save className="w-4 h-4 mr-1" />
          Sauvegarder
        </button>
      </div>
      
      {/* Content Search Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
          onClick={() => setIsContentSearchOpen(!isContentSearchOpen)}
        >
          <span className="font-medium text-gray-700">Recherche de contenu existant</span>
          {isContentSearchOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {isContentSearchOpen && (
          <div className="p-4 space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                placeholder="Rechercher un template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#841b60] mx-auto"></div>
                </div>
              ) : templates.length > 0 ? (
                templates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-500">
                        {template.type === 'quiz' ? 'Quiz' : 'Form'} • 
                        {template.data.questions ? ` ${template.data.questions.length} questions` : ''}
                        {template.data.fields ? ` ${template.data.fields.length} fields` : ''}
                      </p>
                    </div>
                    <button
                      className="flex items-center px-3 py-1 text-[#841b60] hover:bg-[#841b60] hover:text-white rounded transition-colors"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Utiliser
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Aucun template trouvé
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Form Builder Accordion */}
      <div className="border rounded-lg overflow-hidden">
        <button
          className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
          onClick={() => setIsFormBuilderOpen(!isFormBuilderOpen)}
        >
          <span className="font-medium text-gray-700">Formulaire</span>
          {isFormBuilderOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {isFormBuilderOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label du champ</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
                type="text"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="Ex: Nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de champ</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
              >
                <option value="text">Texte</option>
                <option value="email">Email</option>
                <option value="tel">Téléphone</option>
                <option value="date">Date</option>
                <option value="select">Liste déroulante</option>
                <option value="radio">Boutons radio</option>
                <option value="checkbox">Case à cocher</option>
                <option value="textarea">Zone de texte</option>
              </select>
            </div>

            {(fieldType === 'text' || fieldType === 'email' || fieldType === 'tel' || fieldType === 'textarea') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texte d'aide (placeholder)</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
                  type="text"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                  placeholder="Ex: Entrez votre nom"
                />
              </div>
            )}

            {(fieldType === 'select' || fieldType === 'radio') && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                {fieldOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
                      type="text"
                      value={option}
                      onChange={(e) => handleChangeFieldOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    {fieldOptions.length > 1 && (
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFieldOption(index)}
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  className="text-[#841b60] hover:text-[#6d1750] text-sm flex items-center"
                  onClick={handleAddFieldOption}
                >
                  <PlusCircle size={16} className="mr-1" /> Ajouter une option
                </button>
              </div>
            )}

            <div className="flex items-center">
              <input 
                type="checkbox"
                id="required"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
                className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
              />
              <label htmlFor="required" className="ml-2 text-sm text-gray-700">
                Champ obligatoire
              </label>
            </div>

            <button 
              className="w-full px-4 py-2 bg-[#841b60] text-white rounded hover:bg-[#6d1750] transition"
              onClick={handleAddField}
            >
              Ajouter le champ
            </button>
          </div>
        )}
      </div>

      {/* Quiz Builder Accordion */}
      <div className="border rounded-lg overflow-hidden">
        <button
          className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-colors"
          onClick={() => setIsQuizBuilderOpen(!isQuizBuilderOpen)}
        >
          <span className="font-medium text-gray-700">Quiz</span>
          {isQuizBuilderOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {isQuizBuilderOpen && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ex: Quelle est la capitale de la France ?"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Réponses</label>
              {questionOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#841b60]" 
                    type="text"
                    value={option}
                    onChange={(e) => handleChangeQuestionOption(index, e.target.value)}
                    placeholder={`Réponse ${index + 1}`}
                  />
                  {questionOptions.length > 1 && (
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveQuestionOption(index)}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button 
                className="text-[#841b60] hover:text-[#6d1750] text-sm flex items-center"
                onClick={handleAddQuestionOption}
              >
                <PlusCircle size={16} className="mr-1" /> Ajouter une réponse
              </button>
            </div>

            <button 
              className="w-full px-4 py-2 bg-[#841b60] text-white rounded hover:bg-[#6d1750] transition"
              onClick={handleAddQuestion}
            >
              Ajouter la question
            </button>
          </div>
        )}
      </div>

      {/* Added Fields List */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Champs du formulaire</h4>
        <div className="space-y-2">
          {fields.map((field) => (
            <div 
              key={field.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border"
            >
              <div>
                <span className="font-medium">{field.label}</span>
                <span className="text-sm text-gray-500 ml-2">({field.type})</span>
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={() => onRemoveField(field.id)}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Added Questions List */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Questions du quiz</h4>
        <div className="space-y-2">
          {questions.map((question) => (
            <div 
              key={question.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border"
            >
              <div>
                <span className="font-medium">{question.text}</span>
                <div className="text-sm text-gray-500 mt-1">
                  {question.options?.map((option, index) => (
                    <div key={index} className="ml-4">• {option}</div>
                  ))}
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={() => onRemoveQuestion(question.id)}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Sauvegarder comme template</h3>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Nom du template"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSaveDialog(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1750] disabled:opacity-50"
                onClick={handleSaveTemplate}
                disabled={!templateName.trim() || savingTemplate}
              >
                {savingTemplate ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;