
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
          {/* Animated background effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Bokeh effects */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/15 rounded-full blur-2xl animate-ping" style={{animationDuration: '4s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 right-10 w-20 h-20 bg-violet-400/12 rounded-full blur-2xl animate-ping" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
            
            {/* Moving lens flares */}
            <div className="absolute top-10 left-1/3 w-2 h-20 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent transform rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/3 w-1 h-16 bg-gradient-to-b from-transparent via-purple-300/25 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '3s'}}></div>
            
            {/* Light leaks */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-blue-400/5 via-transparent to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-purple-400/8 via-transparent to-transparent animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
            
            {/* Subtle grain overlay */}
            <div 
              className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
              }}
            ></div>
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
