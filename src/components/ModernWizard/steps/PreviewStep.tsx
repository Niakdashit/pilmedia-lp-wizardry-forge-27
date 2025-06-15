import React from 'react';
import { WizardData } from '../ModernWizard';
import { Eye, Monitor, Smartphone, Tablet, Loader } from 'lucide-react';
import QuizPreview from '../../GameTypes/QuizPreview';
interface PreviewStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}
const PreviewStep: React.FC<PreviewStepProps> = ({
  wizardData,
  nextStep,
  prevStep
}) => {
  const buildQuizConfig = () => {
    if (!wizardData.generatedQuiz) return { questions: [] };
    const qs = wizardData.generatedQuiz.questions || [];
    return {
      questions: qs.map((q: any, qi: number) => ({
        id: qi,
        text: q.question,
        options: q.choices.map((c: string, ci: number) => ({
          id: ci,
          text: c,
          isCorrect: c === q.answer
        })),
        feedback: { correct: wizardData.generatedQuiz.successText, incorrect: wizardData.generatedQuiz.errorText }
      }))
    };
  };

  const [selectedDevice, setSelectedDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const visual = selectedDevice === 'mobile' ? (wizardData.mobileVisual || wizardData.desktopVisual) : wizardData.desktopVisual;

  return <div className="space-y-6">
      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100/50">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Aperçu de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Découvrez le rendu final de votre campagne sur différents appareils avant de la publier.
          </p>
        </div>

        {/* Device Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-[#141e29] mb-4">Sélectionnez un appareil</h3>
          <div className="flex space-x-2">
            {[{
            id: 'desktop',
            label: 'Desktop',
            icon: Monitor
          }, {
            id: 'tablet',
            label: 'Tablet',
            icon: Tablet
          }, {
            id: 'mobile',
            label: 'Mobile',
            icon: Smartphone
          }].map(device => {
            const Icon = device.icon;
            return <button key={device.id} onClick={() => setSelectedDevice(device.id as any)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${selectedDevice === device.id ? 'bg-[#951b6d] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{device.label}</span>
                </button>;
          })}
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#951b6d]" />
            </div>
            <h3 className="font-semibold text-[#141e29]">Aperçu {selectedDevice}</h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 min-h-96 flex items-center justify-center" style={{ backgroundImage: visual ? `url(${visual})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {wizardData.generatedQuiz ? (
              <QuizPreview config={buildQuizConfig()} design={{}} />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#951b6d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader className="w-8 h-8 text-[#951b6d] animate-spin" />
                </div>
                <p className="text-gray-600">Chargement de l'aperçu...</p>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Summary */}
        

        {/* Navigation */}
        <div className="flex justify-between">
          <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
            Retour
          </button>
          <button onClick={nextStep} className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-colors shadow-sm hover:shadow-md">
            Publier la campagne
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;