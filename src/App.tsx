import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignEditor from './pages/CampaignEditor';
import QuickCampaign from './pages/QuickCampaign';
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
              {/* Ajouter d'autres routes admin ici */}
            </Routes>
          </AdminLayout>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaign/:id" element={<CampaignEditor />} />
              <Route path="/quick-campaign" element={<QuickCampaign />} />
            </Routes>
          </Layout>
        )}
      </div>
    </AppProvider>
  );
}

export default App;
