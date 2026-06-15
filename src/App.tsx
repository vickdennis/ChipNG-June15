/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthStart from './components/auth/AuthStart';
import OnboardingFlow from './components/auth/OnboardingFlow';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'onboarding'>('home');

  if (currentView === 'auth') {
    return <AuthStart onContinue={() => setCurrentView('onboarding')} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'onboarding') {
    return <OnboardingFlow onBack={() => setCurrentView('auth')} onComplete={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onAuth={() => setCurrentView('auth')} />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
