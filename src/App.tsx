
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignEditor from './pages/CampaignEditor';
import Newsletter from './pages/Newsletter';
import Statistics from './pages/Statistics';
import Contacts from './pages/Contacts';
import Gamification from './pages/Gamification';
import Data from './pages/Data';
import Social from './pages/Social';
import Studies from './pages/Studies';
import Account from './pages/Account';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaign/:id" element={<CampaignEditor />} />
            <Route path="/campaign/new" element={<CampaignEditor />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/data" element={<Data />} />
            <Route path="/social" element={<Social />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
