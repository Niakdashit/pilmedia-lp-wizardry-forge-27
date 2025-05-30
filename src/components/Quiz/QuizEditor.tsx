import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Plus, GripVertical, Trash2, Copy, Edit3, Clock, HelpCircle, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  timeLimit?: number;
  type: 'multiple-choice' | 'true-false' | 'text';
}

interface QuizEditorProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ questions, onQuestionsChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const questionTemplates = [
    {
      name: "Question Marketing",
      question: "Quel est le meilleur canal pour le marketing B2B ?",
      options: ["Facebook", "LinkedIn", "Instagram", "TikTok"],
      correctAnswer: 1,
      explanation: "LinkedIn est la plateforme de référence pour le marketing B2B"
    },
    {
      name: "Question Culture",
      question: "Quelle est la capitale de l'Australie ?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correctAnswer: 2,
      explanation: "Canberra est la capitale de l'Australie, pas Sydney"
    }
  ];

  const addQuestion = (template?: any) => {
    const newQuestion: QuizQuestion = template ? {
      id: Date.now().toString(),
      type: 'multiple-choice' as const,
      timeLimit: 30,
      ...template
    } : {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      type: 'multiple-choice' as const,
      timeLimit: 30,
      explanation: ''
    };

    onQuestionsChange([...questions, newQuestion]);
    setEditingId(newQuestion.id);
  };

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    onQuestionsChange(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
  };

  const duplicateQuestion = (question: QuizQuestion) => {
    const duplicate = { ...question, id: Date.now().toString() };
    onQuestionsChange([...questions, duplicate]);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);

    onQuestionsChange(newQuestions);
  };

  const QuestionCard = ({ question, index }: { question: QuizQuestion; index: number }) => {
    const isEditing = editingId === question.id;

    return (
      <Draggable draggableId={question.id} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.draggableProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-xl border-2 transition-all duration-200 ${
              snapshot.isDragging ? 'shadow-xl border-purple-300' : 'border-gray-200 hover:border-purple-200'
            } ${isEditing ? 'ring-2 ring-purple-500' : ''}`}
          >
            {isEditing ? (
              <QuestionEditor
                question={question}
                onSave={(updates) => {
                  updateQuestion(question.id, updates);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div {...provided.dragHandleProps} className="cursor-grab hover:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      Question {index + 1}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(question.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateQuestion(question)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  {question.question || 'Question sans titre'}
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border text-sm ${
                        optionIndex === question.correctAnswer
                          ? 'bg-green-50 border-green-200 text-green-800 font-medium'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      {option || `Option ${optionIndex + 1}`}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{question.timeLimit}s</span>
                    </span>
                    {question.explanation && (
                      <span className="flex items-center space-x-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>Avec explication</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    {question.type}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </Draggable>
    );
  };

  const QuestionEditor = ({ question, onSave, onCancel }: {
    question: QuizQuestion;
    onSave: (updates: Partial<QuizQuestion>) => void;
    onCancel: () => void;
  }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    return (
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Question</label>
            <textarea
              value={editedQuestion.question}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 resize-none text-lg"
              rows={2}
              placeholder="Tapez votre question ici..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Options de réponse</label>
            <div className="space-y-3">
              {editedQuestion.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`correct-${editedQuestion.id}`}
                    checked={editedQuestion.correctAnswer === optionIndex}
                    onChange={() => setEditedQuestion({ ...editedQuestion, correctAnswer: optionIndex })}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editedQuestion.options];
                      newOptions[optionIndex] = e.target.value;
                      setEditedQuestion({ ...editedQuestion, options: newOptions });
                    }}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Temps limite
              </label>
              <select
                value={editedQuestion.timeLimit}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, timeLimit: parseInt(e.target.value) })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300"
              >
                <option value={10}>10 secondes</option>
                <option value={20}>20 secondes</option>
                <option value={30}>30 secondes</option>
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Explication (optionnel)
            </label>
            <textarea
              value={editedQuestion.explanation || ''}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, explanation: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300 resize-none"
              rows={2}
              placeholder="Explication de la réponse..."
            />
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => onSave(editedQuestion)}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              Sauvegarder
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Questions du Quiz</h2>
          <p className="text-gray-600 mt-1">{questions.length} question(s) créée(s)</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            <span>Templates</span>
          </button>
          <button
            onClick={() => addQuestion()}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle question</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <h3 className="font-semibold text-blue-800 mb-4">Templates de questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionTemplates.map((template, index) => (
                <div
                  key={index}
                  onClick={() => addQuestion(template)}
                  className="bg-white p-4 rounded-lg border border-blue-200 hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <h4 className="font-medium text-blue-800 mb-2">{template.name}</h4>
                  <p className="text-sm text-blue-600">{template.question}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              <AnimatePresence>
                {questions.map((question, index) => (
                  <QuestionCard key={question.id} question={question} index={index} />
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {questions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucune question créée</h3>
            <p className="text-gray-500 mb-6">Commencez par ajouter votre première question</p>
            <button
              onClick={() => addQuestion()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Créer ma première question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizEditor;
