
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Admin/AdminLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Gamification from './pages/Gamification';
import Newsletter from './pages/Newsletter';
import Statistics from './pages/Statistics';
import Contacts from './pages/Contacts';
import Data from './pages/Data';
import Social from './pages/Social';
import Studies from './pages/Studies';
import Account from './pages/Account';
import Login from './pages/Login';

// Campagne pages
import CampaignEditor from './pages/CampaignEditor';
import ModernCampaignEditor from './pages/ModernCampaignEditor';
import QuickCampaign from './pages/QuickCampaign';
import ModernWizardPage from './pages/ModernWizardPage';
import ModernEditorPage from './pages/ModernEditorPage';

// Admin pages
import Admin from './pages/Admin';
import AdminCampaigns from './pages/AdminCampaigns';
import AdminClients from './pages/AdminClients';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminTemplates from './pages/AdminTemplates';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminTeam from './pages/AdminTeam';
import AdminAlerts from './pages/AdminAlerts';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Main app routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="gamification" element={<Gamification />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="data" element={<Data />} />
            <Route path="social" element={<Social />} />
            <Route path="studies" element={<Studies />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Campaign editor routes */}
          <Route path="/campaign/:id" element={<CampaignEditor />} />
          <Route path="/modern-campaign-editor/:id" element={<ModernCampaignEditor />} />
          <Route path="/quick-campaign" element={<QuickCampaign />} />
          <Route path="/modern-wizard" element={<ModernWizardPage />} />
          <Route path="/modern-editor/:id" element={<ModernEditorPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/:id" element={<AdminClientDetail />} />
            <Route path="templates" element={<AdminTemplates />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
