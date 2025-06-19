// src/providers/AuthProvider.tsx (Código Corrigido e Mais Robusto)

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  // Trocamos 'loading' por um status mais descritivo
  authStatus: 'loading' | 'authenticated' | 'unauthenticated';
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  authStatus: 'loading',
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // O estado agora é mais claro sobre o que está acontecendo
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    // A primeira verificação ao carregar a página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthStatus(session ? 'authenticated' : 'unauthenticated');
    });

    // O "vigia" para mudanças de estado (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthStatus(session ? 'authenticated' : 'unauthenticated');
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user,
    authStatus,
  };

  // Enquanto estiver carregando, não renderizamos nada para evitar o "pulo" para a dashboard
  if (authStatus === 'loading') {
    return <div>Carregando aplicação...</div>; // Ou um spinner bonito
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};