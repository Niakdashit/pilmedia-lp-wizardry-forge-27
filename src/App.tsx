
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignEditor from './pages/CampaignEditor';
import QuickCampaign from './pages/QuickCampaign';
import Gamification from './pages/Gamification';
import Newsletter from './pages/Newsletter';
import Account from './pages/Account';
import Statistics from './pages/Statistics';
import Contacts from './pages/Contacts';
import Data from './pages/Data';
import Social from './pages/Social';
import Studies from './pages/Studies';
import Admin from './pages/Admin';
import AdminClients from './pages/AdminClients';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminLayout from './components/Admin/AdminLayout';
import Layout from './components/Layout/Layout';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AppProvider>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {isAdminRoute ? (
          <AdminLayout>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/clients/:clientId" element={<AdminClientDetail />} />
            </Routes>
          </AdminLayout>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaign/:id" element={<CampaignEditor />} />
              <Route path="/quick-campaign" element={<QuickCampaign />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/data" element={<Data />} />
              <Route path="/social" element={<Social />} />
              <Route path="/studies" element={<Studies />} />
              <Route path="/account" element={<Account />} />
              <Route path="/logout" element={<div className="p-6"><h1 className="text-2xl font-bold">Déconnexion</h1><p>Vous avez été déconnecté avec succès.</p></div>} />
            </Routes>
          </Layout>
        )}
      </div>
    </AppProvider>
  );
}

export default App;
