import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';

export const AuthLayout: React.FC = () => {
  // const { creds } = useAuth();

  // if (creds) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};
