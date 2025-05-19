
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignsList from './pages/CampaignsList';
import CampaignEditor from './pages/CampaignEditor';
import Statistics from './pages/Statistics';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PublicCampaign from './pages/PublicCampaign';
import ProtectedRoute from './components/ProtectedRoute';
import Gamification from './pages/Gamification';
import GamificationEditor from './pages/GamificationEditor';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:id" element={<PublicCampaign />} />
      
      <Route path="/" element={<ProtectedRoute requireAuth={false}><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/campaigns" element={<CampaignsList />} />
        <Route path="dashboard/campaigns/new" element={<CampaignEditor />} />
        <Route path="dashboard/campaigns/:id" element={<CampaignEditor />} /> 
        <Route path="dashboard/statistics" element={<Statistics />} />
        <Route path="dashboard/gamification" element={<Gamification />} />
        <Route path="dashboard/gamification/editor" element={<GamificationEditor />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
