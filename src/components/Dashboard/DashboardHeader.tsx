
import React from 'react';
import { Bell, Search } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="relative">
      {/* Glassy header with gradient background */}
      <div className="relative bg-gradient-to-r from-purple-600/20 via-blue-500/15 to-indigo-600/20 backdrop-blur-xl border-b border-white/10">
        {/* Abstract illustration overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/10 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400/8 via-transparent to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-indigo-300/6 to-purple-300/6 rounded-full blur-xl"></div>
        </div>
        
        {/* Glossy light reflections */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-sm"></div>
          <div className="absolute top-0 right-1/3 w-2 h-32 bg-gradient-to-b from-white/15 via-transparent to-transparent blur-sm transform rotate-12"></div>
        </div>

        <div className="relative z-10 px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Welcome message */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome Jonathan 👋
              </h1>
              <p className="text-gray-600 font-medium">
                Ready to launch a new campaign?
              </p>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-gray-600 hover:text-purple-600 hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="relative p-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-gray-600 hover:text-purple-600 hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg ring-2 ring-white/20">
                J
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
