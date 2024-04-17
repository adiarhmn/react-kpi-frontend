import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

import { LoadingScreen } from '../elements';
import { IconHome2, IconMagnetic } from '@tabler/icons-react';
import { SideNav } from '../navigation';

export const AdminLayout: React.FC = () => {
  // const { creds } = useAuth();

  // if (!creds) return <Navigate to="/login" replace />;
  const [opened, { toggle }] = useDisclosure();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <IconMagnetic size={30} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="sm">
          <SideNav SideNavProps={[
            { title: 'Beranda', href: '/', icon: IconHome2 },
            { title: 'Presensi', href: '/attendance', icon: IconHome2 },
            { title: 'Riwayat', href: '/history', icon: IconHome2 },
            { title: 'Profil', href: '/profile', icon: IconHome2 },
          
          ]} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
