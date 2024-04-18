import { IconHome, IconUser, IconHandStop, IconChecklist } from '@tabler/icons-react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { BottomNav } from '../navigation';

export const HomeLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] max-w-md relative overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
      <BottomNav
        navigations={[
          { title: 'Home', href: '/', icon: IconHome },
          { title: 'Presensi', href: '/attendance', icon: IconHandStop },
          { title: 'Riwayat', href: '/history', icon: IconChecklist },
          { title: 'Profil', href: '/profile', icon: IconUser },
        ]}
      />
    </div>
  );
};
