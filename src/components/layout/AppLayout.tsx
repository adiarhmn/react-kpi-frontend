import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { useOutletContext } from '@/features/outlet';

import { LoadingScreen } from '../elements';

export const AppLayout: React.FC = () => {
  const { creds } = useAuth();
  const { outlet } = useOutletContext();

  if (!creds) return <Navigate to="/login" replace />;
  if (!outlet) return <Navigate to="/outlet" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};
