import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';

export const AdminLayout: React.FC = () => {
  // const { creds } = useAuth();

  // if (!creds) return <Navigate to="/login" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};
