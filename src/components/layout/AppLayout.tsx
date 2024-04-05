import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';

export const AppLayout: React.FC = () => {
  // const { creds } = useAuth();

  // if (!creds) return <Navigate to="/login" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="w-full min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] max-w-md relative overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
    </Suspense>
  );
};
