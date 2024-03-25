import { IconClock, IconHome, IconBox, IconUser } from '@tabler/icons-react';
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
          { title: 'Beranda', href: '/', icon: IconHome },
          { title: 'Riwayat', href: '/transaction', icon: IconClock },
          { title: 'Inventaris', href: '/inventory', icon: IconBox },
          { title: 'Pengguna', href: '/profile', icon: IconUser },
        ]}
      />
    </>
  );
};
