import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

import { LoadingScreen } from '../elements';
import { IconCalendar, IconChartDonut4, IconHome2, IconMagnetic } from '@tabler/icons-react';
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
            <IconChartDonut4 className="text-blue-600" size={35} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <SideNav
            SideNavProps={[
              { title: 'Beranda', href: '/admin', icon: IconHome2 },
              { title: 'Jadwal', href: '/admin-jadwal', icon: IconCalendar },
              { title: 'Riwayat', href: '/admin/history', icon: IconHome2 },
              { title: 'Profil', href: '/profile', icon: IconHome2 },
            ]}
          />
        </AppShell.Navbar>
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
