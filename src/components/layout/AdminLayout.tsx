import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Avatar, Burger, Button, Group, Menu, UnstyledButton, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

import { LoadingScreen } from '../elements';
import {
  IconCalendar,
  IconHome2,
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconChevronRight,
  IconClockHour1,
  IconUsersGroup,
  IconChevronDown,
} from '@tabler/icons-react';
import { SideNav } from '../navigation';

export const AdminLayout: React.FC = () => {
  // const { creds } = useAuth();
  // if (!creds) return <Navigate to="/login" replace />;
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header>
          <Group h="100%" px="lg" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap={5}>
              <img className="w-24" src="/images/logo-2-kpi.png" alt="KPI" />
            </Group>
            {!isMobile && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap={16}>
                      <Avatar
                        src={'/images/user-blue-person.png'}
                        alt={'Adi Aulia Rahman'}
                        radius="xl"
                        size={33}
                      />
                      <div className="text-sm">
                        <div>Adi Aulia Rahman</div>
                        <div className="text-xs -mt-1 text-slate-400">adiauliarahman@gmail.com</div>
                      </div>
                      <IconChevronDown size={20} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                  <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                  <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
                  <Menu.Item
                    leftSection={<IconSearch size={14} />}
                    rightSection={<IconSearch size={14} />}
                  >
                    Search
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                    Delete my account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <SideNav
            SideNavProps={[
              { title: 'Beranda', href: '/beranda', icon: IconHome2 },
              { title: 'Jadwal', href: '/schedule', icon: IconCalendar },
              { title: 'Shift', href: '/shift', icon: IconClockHour1 },
              { title: 'Karyawan', href: '/employee', icon: IconUsersGroup },
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
