
import React, { useState } from 'react';
import { Plus, Zap, Target, Gamepad2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Nouvelle campagne',
      href: '/modern-wizard',
      color: 'from-purple-500 to-blue-500'
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      label: 'Jeu rapide',
      href: '/quick-campaign',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Newsletter',
      href: '/newsletter',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Quick actions menu */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        {quickActions.map((action, index) => (
          <Link
            key={action.label}
            to={action.href}
            className={`flex items-center space-x-3 px-4 py-3 bg-white/90 backdrop-blur-xl border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className={`p-2 rounded-full bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <span className="text-gray-700 font-medium whitespace-nowrap pr-2">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center group ${isOpen ? 'rotate-45' : ''}`}
      >
        {/* Glassy effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        
        {/* Animated plus icon */}
        <Plus className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Background overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;
