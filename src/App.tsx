
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignEditor from './pages/CampaignEditor';
import ModernCampaignEditor from './pages/ModernCampaignEditor';
import QuickCampaign from './pages/QuickCampaign';
import Gamification from './pages/Gamification';
import Contacts from './pages/Contacts';
import Data from './pages/Data';
import Statistics from './pages/Statistics';
import Studies from './pages/Studies';
import Social from './pages/Social';
import Newsletter from './pages/Newsletter';
import Account from './pages/Account';
import ModernWizard from './components/ModernWizard/ModernWizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/modern-wizard" element={<ModernWizard />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaign/:id" element={<CampaignEditor />} />
          <Route path="modern-campaign/:id" element={<ModernCampaignEditor />} />
          <Route path="modern-campaign/new" element={<ModernCampaignEditor />} />
          <Route path="quick-campaign" element={<QuickCampaign />} />
          <Route path="gamification" element={<Gamification />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="data" element={<Data />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="studies" element={<Studies />} />
          <Route path="social" element={<Social />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
