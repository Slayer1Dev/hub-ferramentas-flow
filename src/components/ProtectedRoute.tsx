// src/components/ProtectedRoute.tsx (Código Corrigido)

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

const ProtectedRoute = () => {
  const { authStatus } = useAuth();

  // Nós não precisamos mais do 'loading' aqui, porque o AuthProvider já trata isso.
  // Se o status final for 'unauthenticated', nós redirecionamos.
  if (authStatus === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  // Se for 'authenticated', permite o acesso.
  return <Outlet />;
};

export default ProtectedRoute;