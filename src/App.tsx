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
import ModernDashboard from './pages/ModernDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/modern" element={<ModernDashboard />} />
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
      </Router>
    </AppProvider>
  );
}

export default App;
