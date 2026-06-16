import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

export function useInactivityTimeout(timeoutMinutes = 15) {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
    // Persist the last activity time to handle cross-tab or refresh scenarios.
    localStorage.setItem('lastActivityTime', Date.now().toString());
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast('Session expired due to inactivity', { icon: '⏳' });
      localStorage.removeItem('lastActivityTime');
      navigate('/login');
    }
  };

  useEffect(() => {
    const validateInitialSession = () => {
      const lastActivityStr = localStorage.getItem('lastActivityTime');
      if (lastActivityStr) {
        const lastActivity = parseInt(lastActivityStr, 10);
        if (Date.now() - lastActivity > timeoutMinutes * 60 * 1000) {
          // Time expired while away
          logout();
          return false;
        }
      }
      return true;
    };

    if (!validateInitialSession()) return;

    resetTimer();

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [timeoutMinutes, navigate]);
}
