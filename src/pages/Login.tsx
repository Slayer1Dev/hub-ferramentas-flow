// src/pages/Login.tsx
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/lib/supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          localization={{
            variables: {
              sign_in: { email_label: 'Seu email', password_label: 'Sua senha', button_label: 'Entrar', social_provider_text: 'Entrar com {{provider}}' },
              sign_up: { email_label: 'Seu email', password_label: 'Crie uma senha', button_label: 'Criar conta', social_provider_text: 'Criar conta com {{provider}}' }
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;