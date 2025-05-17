import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignsList from './pages/CampaignsList';
import CampaignEditor from './pages/CampaignEditor';
import Statistics from './pages/Statistics';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PublicCampaign from './pages/PublicCampaign';
import Gamification from './pages/Gamification';
import GamificationEditor from './pages/GamificationEditor';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:slug" element={<PublicCampaign />} />
          
          {/* Protected routes under /dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="campaigns" element={<CampaignsList />} />
            <Route path="campaign/:id" element={<CampaignEditor />} />
            <Route path="campaign/new" element={<CampaignEditor />} />
            <Route path="gamification" element={<Gamification />} />
            <Route path="gamification/:type/new" element={<GamificationEditor />} />
            <Route path="gamification/:type/:id" element={<GamificationEditor />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;