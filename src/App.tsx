/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthStart from './components/auth/AuthStart';
import OnboardingFlow from './components/auth/OnboardingFlow';
import LoginFlow from './components/auth/LoginFlow';
import Dashboard from './components/dashboard/Dashboard';
import { supabase } from './supabaseClient';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AuthRedirectRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF5E62]/30 selection:text-white">
      <Navbar onAuth={() => navigate('/auth')} />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

function AuthStartWrapper() {
  const navigate = useNavigate();
  return <AuthStart onContinue={() => navigate('/onboarding')} onBack={() => navigate('/')} onLogin={() => navigate('/login')} />;
}

function LoginFlowWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; message?: string } | null;
  
  return <LoginFlow 
    onBack={() => navigate(-1)} 
    initialEmail={state?.email || ''} 
    message={state?.message || ''} 
  />;
}

function OnboardingFlowWrapper() {
  const navigate = useNavigate();
  return <OnboardingFlow 
      onBack={() => navigate(-1)} 
      onComplete={() => navigate('/dashboard')} 
      onSignupSuccess={(email, msg) => {
        navigate('/login', { state: { email, message: msg } });
      }}
    />;
}

import PublicProfile from './pages/PublicProfile';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirectRoute><LandingPage /></AuthRedirectRoute>} />
        <Route path="/auth" element={<AuthRedirectRoute><AuthStartWrapper /></AuthRedirectRoute>} />
        <Route path="/login" element={<AuthRedirectRoute><LoginFlowWrapper /></AuthRedirectRoute>} />
        <Route path="/onboarding" element={<AuthRedirectRoute><OnboardingFlowWrapper /></AuthRedirectRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
