
import React, { useState } from 'react';
import { Calendar, Clock, Mail, Users, Send, PlusCircle } from 'lucide-react';

const SendTab: React.FC = () => {
  const [sendOption, setSendOption] = useState<'now' | 'schedule' | 'segment'>('now');
  const [schedule, setSchedule] = useState({
    date: '',
    time: ''
  });
  const [segment, setSegment] = useState('all');
  
  const handleSendNow = () => {
    console.log('Sending newsletter now');
    // Logique d'envoi immédiat
  };
  
  const handleSchedule = () => {
    console.log('Scheduling newsletter', schedule);
    // Logique de planification
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Envoyer ou planifier l'envoi</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setSendOption('now')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              sendOption === 'now' 
                ? 'border-[#841b60] bg-[#f8f0f5]' 
                : 'border-gray-200 hover:border-gray-300'
            } transition-colors`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${sendOption === 'now' ? 'bg-[#f8f0f5]' : 'bg-gray-100'}`}>
                <Send className={`w-6 h-6 ${sendOption === 'now' ? 'text-[#841b60]' : 'text-gray-500'}`} />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-lg">Envoyer maintenant</h3>
                <p className="text-sm text-gray-500">Envoi immédiat à tous les destinataires</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setSendOption('schedule')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              sendOption === 'schedule' 
                ? 'border-[#841b60] bg-[#f8f0f5]' 
                : 'border-gray-200 hover:border-gray-300'
            } transition-colors`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${sendOption === 'schedule' ? 'bg-[#f8f0f5]' : 'bg-gray-100'}`}>
                <Calendar className={`w-6 h-6 ${sendOption === 'schedule' ? 'text-[#841b60]' : 'text-gray-500'}`} />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-lg">Planifier l'envoi</h3>
                <p className="text-sm text-gray-500">Choisir une date et une heure spécifiques</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setSendOption('segment')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              sendOption === 'segment' 
                ? 'border-[#841b60] bg-[#f8f0f5]' 
                : 'border-gray-200 hover:border-gray-300'
            } transition-colors`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${sendOption === 'segment' ? 'bg-[#f8f0f5]' : 'bg-gray-100'}`}>
                <Users className={`w-6 h-6 ${sendOption === 'segment' ? 'text-[#841b60]' : 'text-gray-500'}`} />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-lg">Segmenter l'audience</h3>
                <p className="text-sm text-gray-500">Envoyer à une partie de votre liste</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      
      {sendOption === 'now' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">Résumé de l'envoi</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-gray-600">Objet de l'email</p>
                <p className="font-semibold">Newsletter mensuelle Leadya</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-5 h-5 text-gray-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-gray-600">Destinataires</p>
                <p className="font-semibold">Tous les contacts (1,245 adresses)</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSendNow}
            className="w-full py-3 bg-[#841b60] text-white font-semibold rounded-lg hover:bg-[#6d164f] transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Envoyer maintenant
          </button>
        </div>
      )}
      
      {sendOption === 'schedule' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">Planifier l'envoi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'envoi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={schedule.date}
                  onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heure d'envoi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={schedule.time}
                  onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSchedule}
            className="w-full py-3 bg-[#841b60] text-white font-semibold rounded-lg hover:bg-[#6d164f] transition-colors flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Planifier l'envoi
          </button>
        </div>
      )}
      
      {sendOption === 'segment' && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">Segmenter votre audience</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choisir un segment</label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            >
              <option value="all">Tous les contacts (1,245)</option>
              <option value="active">Contacts actifs (892)</option>
              <option value="new">Nouveaux contacts (124)</option>
              <option value="inactive">Contacts inactifs (229)</option>
            </select>
          </div>
          
          <div className="flex justify-end mb-8">
            <button className="flex items-center text-[#841b60] hover:text-[#6d164f]">
              <PlusCircle className="w-5 h-5 mr-1" />
              Créer un nouveau segment
            </button>
          </div>
          
          <button
            className="w-full py-3 bg-[#841b60] text-white font-semibold rounded-lg hover:bg-[#6d164f] transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Envoyer au segment sélectionné
          </button>
        </div>
      )}
    </div>
  );
};

export default SendTab;
