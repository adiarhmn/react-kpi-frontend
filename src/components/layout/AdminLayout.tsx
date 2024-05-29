import { AppShell, Avatar, Burger, Group, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconCalendar,
  IconHome2,
  IconSettings,
  IconTrash,
  IconClockHour1,
  IconUsersGroup,
  IconClipboardText,
  IconGauge,
  IconBuildingEstate,
  IconBriefcase,
  IconLogout,
  IconLuggage,
  IconFileOff,
} from '@tabler/icons-react';
import { Suspense, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { MantineLogo } from '@mantinex/mantine-logo';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';
import { SideNav } from '../navigation';

const MenuMain = [{ title: 'Beranda', href: '/beranda', icon: IconHome2 }];

const MenuDataMaster = [
  { title: 'Divisi', href: '/division', icon: IconBuildingEstate },
  { title: 'Shift', href: '/shift', icon: IconClockHour1 },
  { title: 'User', href: '/users', icon: IconUsersGroup },
  { title: 'Karyawan', href: '/employees', icon: IconBriefcase },
];

const MenuAbsensi = [
  { title: 'Jadwal', href: '/schedule', icon: IconCalendar },
  { title: 'Presensi', href: '/attendance', icon: IconClipboardText },
  { title: 'Aktivitas', href: '/activity', icon: IconGauge },
];

const MenuPengajuan = [
  { title: 'Cuti', href: '/leave', icon: IconLuggage },
  { title: 'Izin', href: '/permit', icon: IconFileOff },
  { title: 'Lembur', href: '/overtime', icon: IconTrash },
];

export const AdminLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('Beranda');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { creds, logout } = useAuth();
  if (!creds) return <Navigate to="/login" replace />;
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 240,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header className="shadow-md">
          <Group h="100%" justify="space-between" gap={0} className="px-3">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group
              gap={5}
              justify={isMobile ? 'end' : 'center'}
              style={{ width: 240 }}
              className="h-full"
            >
              <img className="w-24" src="/images/logo-2-kpi.png" alt="KPI" />
              {/* <div className='text-xs -mt-3 font-semibold'>Key Performance Indicator</div> */}
            </Group>

            {/* Profile and Name Information */}
            {!isMobile && (
              <Group className="grow h-full" justify="space-between">
                <h1 className="px-3 py-2 font-semibold text-center">{title}</h1>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group gap={16} px={20}>
                        <div className="text-sm text-end">
                          <div className="font-semibold">{creds.username}</div>
                          <div className="text-xs -mt-1 text-slate-400">
                            {creds.role === 'admin' ? 'Administrator' : 'Karyawan'}
                          </div>
                        </div>
                        <Avatar
                          src={'/images/user-blue-person.png'}
                          alt={'User'}
                          radius="xl"
                          size={33}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>List Menu</Menu.Label>
                    <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      onClick={() => logout()}
                      color="red"
                      leftSection={<IconLogout size={14} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar style={{ transition: 'all 0.3s ease' }}>
          <section className="overflow-x-auto min-h-screen pt-1 bar-scroll-blue">
            <div className="p-2 flex flex-col">
              <SideNav
                SideNavProps={MenuMain}
                HeaderList={null}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              <SideNav
                SideNavProps={MenuDataMaster}
                HeaderList={'Data Master'}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              <SideNav
                SideNavProps={MenuAbsensi}
                HeaderList={'Absensi'}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              <SideNav
                SideNavProps={MenuPengajuan}
                HeaderList={'Pengajuan'}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
            </div>
          </section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
