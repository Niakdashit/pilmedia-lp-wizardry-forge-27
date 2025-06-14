
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignEditor from './pages/CampaignEditor';
import QuickCampaign from './pages/QuickCampaign';
import Newsletter from './pages/Newsletter';
import Gamification from './pages/Gamification';
import Contacts from './pages/Contacts';
import Social from './pages/Social';
import Data from './pages/Data';
import Statistics from './pages/Statistics';
import Studies from './pages/Studies';
import Account from './pages/Account';
import ModernCampaignEditor from './pages/ModernCampaignEditor';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#161B33] to-[#24123B] relative overflow-hidden">
          {/* Enhanced animated background layer with neon orange accents */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Large moving bokeh effects with enhanced intensity and neon orange */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '2.5s'}}></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400/30 rounded-full blur-2xl animate-ping" style={{animationDuration: '3.5s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute top-1/3 right-10 w-28 h-28 bg-violet-400/25 rounded-full blur-2xl animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/3 right-1/2 w-36 h-36 bg-cyan-400/18 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '3s'}}></div>
            <div className="absolute top-10 left-3/4 w-24 h-24 bg-orange-500/25 rounded-full blur-2xl animate-ping" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}></div>
            
            {/* New neon orange floating orbs */}
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDuration: '7s'}}></div>
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-orange-300/18 rounded-full blur-lg animate-ping" style={{animationDuration: '3s', animationDelay: '2s'}}></div>
            
            {/* Enhanced medium floating orbs with more variety */}
            <div className="absolute top-1/4 left-1/2 w-18 h-18 bg-blue-300/18 rounded-full blur-xl animate-ping" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-1/4 left-20 w-14 h-14 bg-purple-300/22 rounded-full blur-lg animate-pulse" style={{animationDuration: '3.5s', animationDelay: '1s'}}></div>
            <div className="absolute top-3/4 right-1/4 w-22 h-22 bg-orange-400/16 rounded-full blur-xl animate-ping" style={{animationDuration: '8s', animationDelay: '4s'}}></div>
            
            {/* Enhanced moving lens flares and light rays with neon orange */}
            <div className="absolute top-10 left-1/3 w-3 h-28 bg-gradient-to-b from-transparent via-blue-300/35 to-transparent transform rotate-45 animate-pulse" style={{animationDuration: '2.5s'}}></div>
            <div className="absolute bottom-1/4 right-1/3 w-2 h-20 bg-gradient-to-b from-transparent via-orange-400/40 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '3s', animationDuration: '3.5s'}}></div>
            <div className="absolute top-1/2 left-10 w-2.5 h-32 bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent transform rotate-75 animate-pulse" style={{animationDelay: '5s', animationDuration: '5s'}}></div>
            <div className="absolute top-1/4 right-10 w-1.5 h-24 bg-gradient-to-b from-transparent via-orange-300/35 to-transparent transform rotate-30 animate-pulse" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
            
            {/* Enhanced diagonal light streaks with orange accents */}
            <div className="absolute top-0 right-1/4 w-0.5 h-40 bg-gradient-to-b from-blue-400/30 via-transparent to-transparent transform rotate-12 animate-pulse" style={{animationDuration: '4s'}}></div>
            <div className="absolute bottom-0 left-1/4 w-0.5 h-32 bg-gradient-to-t from-purple-400/25 via-transparent to-transparent transform -rotate-12 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            <div className="absolute top-0 left-1/3 w-0.5 h-36 bg-gradient-to-b from-orange-400/25 via-transparent to-transparent transform rotate-18 animate-pulse" style={{animationDuration: '5s', animationDelay: '3s'}}></div>
            
            {/* Enhanced light leaks with more intensity and orange blend */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-blue-400/15 via-blue-400/6 to-transparent animate-pulse" style={{animationDuration: '7s'}}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-purple-400/18 via-purple-400/8 to-transparent animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-radial from-indigo-400/12 via-transparent to-transparent animate-pulse" style={{animationDuration: '11s', animationDelay: '4s'}}></div>
            <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-gradient-radial from-orange-400/14 via-orange-400/4 to-transparent animate-pulse" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
            
            {/* Enhanced glass morphism layers with better visibility */}
            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/8 backdrop-blur-sm rounded-full animate-pulse border border-white/15" style={{animationDuration: '5s'}}></div>
            <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-white/6 backdrop-blur-sm rounded-full animate-pulse border border-white/10" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-orange-100/8 backdrop-blur-sm rounded-full animate-pulse border border-orange-200/12" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            
            {/* Enhanced floating particles with more visibility */}
            <div className="absolute top-1/5 left-1/5 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping" style={{animationDuration: '1.8s'}}></div>
            <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-ping" style={{animationDuration: '2.5s', animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-indigo-300/60 rounded-full animate-ping" style={{animationDuration: '3.5s', animationDelay: '2s'}}></div>
            <div className="absolute top-3/4 right-2/5 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-ping" style={{animationDuration: '2.8s', animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1/3 left-1/6 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-ping" style={{animationDuration: '3.2s', animationDelay: '1.8s'}}></div>
            
            {/* New animated energy waves */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-pulse transform -rotate-12" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-pulse transform rotate-6" style={{animationDuration: '10s', animationDelay: '4s'}}></div>
            
            {/* Enhanced grain overlay with better texture */}
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '180px 180px'
              }}
            ></div>
            
            {/* Enhanced secondary grain layer */}
            <div 
              className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px 120px'
              }}
            ></div>
            
            {/* Enhanced atmospheric haze layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3a]/30 via-transparent to-[#2a1340]/15"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/8 to-purple-900/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-orange-900/6 via-transparent to-indigo-900/8"></div>
            
            {/* Enhanced dynamic color overlays with orange accents */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/8 via-transparent to-purple-600/12 animate-pulse" style={{animationDuration: '12s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/6 via-transparent to-cyan-500/8 animate-pulse" style={{animationDuration: '18s', animationDelay: '6s'}}></div>
            
            {/* New pulsing edge lighting */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/25 to-transparent animate-pulse" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse" style={{animationDuration: '7s', animationDelay: '2s'}}></div>
            <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-400/20 to-transparent animate-pulse" style={{animationDuration: '9s', animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
              <Route path="/campaign/:id" element={<Layout><CampaignEditor /></Layout>} />
              <Route path="/modern-campaign/:id" element={<ModernCampaignEditor />} />
              <Route path="/quick-campaign" element={<Layout><QuickCampaign /></Layout>} />
              <Route path="/newsletter" element={<Layout><Newsletter /></Layout>} />
              <Route path="/gamification" element={<Layout><Gamification /></Layout>} />
              <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
              <Route path="/social" element={<Layout><Social /></Layout>} />
              <Route path="/data" element={<Layout><Data /></Layout>} />
              <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
              <Route path="/studies" element={<Layout><Studies /></Layout>} />
              <Route path="/account" element={<Layout><Account /></Layout>} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
