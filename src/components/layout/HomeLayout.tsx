import { IconHome, IconUser, IconHandStop, IconChecklist } from '@tabler/icons-react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { BottomNav } from '../navigation';

export const HomeLayout: React.FC = () => {
  return (
    <>
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
    </>
  );
};
