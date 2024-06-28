import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  NavLink,
  UnstyledButton,
  Indicator,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconCalendar,
  IconHome2,
  IconSettings,
  IconClockHour1,
  IconUsersGroup,
  IconClipboardText,
  IconGauge,
  IconBuildingEstate,
  IconBriefcase,
  IconLogout,
  IconLuggage,
  IconAlarmPlus,
  IconFileAlert,
  IconClockPin,
  IconMap2,
  IconAlertCircle,
  IconBuildingBank,
  IconBell,
} from '@tabler/icons-react';
import { Suspense, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';
import { NavSuperadmin, SideNav } from '../navigation';

const MenuMain = [{ title: 'Beranda', href: '/beranda', icon: IconHome2 }];
const MenuDataMasterSuperadmin = [{ title: 'Company', href: '/company', icon: IconBuildingBank }];

const MenuDataMaster = [
  { title: 'Divisi', href: '/division', icon: IconBuildingEstate },
  { title: 'Shift', href: '/shift', icon: IconClockHour1 },
  { title: 'User', href: '/users', icon: IconUsersGroup },
  { title: 'Lokasi', href: '/locations', icon: IconMap2 },
  { title: 'Karyawan', href: '/employees', icon: IconBriefcase },
];

const MenuAbsensi = [
  { title: 'Jadwal', href: '/schedule', icon: IconCalendar },
  { title: 'Presensi', href: '/attendance', icon: IconClipboardText },
  { title: 'Aktivitas', href: '/activity', icon: IconGauge },
];

const MenuPengajuan = [
  { title: 'Absensi', href: '/request-attendance', icon: IconClockPin },
  { title: 'Cuti', href: '/leave', icon: IconLuggage },
  { title: 'Izin', href: '/permission', icon: IconFileAlert },
  { title: 'Lembur', href: '/overtime', icon: IconAlarmPlus },
];

// ================================================================================
// ================== THIS LAYOUT FOR SUPERADMIN & ADMIN ==========================
// ================================================================================
export const AdminLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('Beranda');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { creds, logout } = useAuth();
  const ID_COMPANY = localStorage.getItem('id_company');
  const NAME_COMPANY = localStorage.getItem('name_company');

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
                {NAME_COMPANY && <div className="text-sm font-semibold">{NAME_COMPANY}</div>}
                <Group gap={5} className="h-full" justify="end">
                  <div className="border-r border-slate-400 pe-5">
                    <Indicator inline label="2" size={16} color="red">
                      <ActionIcon radius={'xl'} color="rgba(219,219,219,1)">
                        <IconBell className="text-slate-500" size={20} />
                      </ActionIcon>
                    </Indicator>
                  </div>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <UnstyledButton>
                        <Group gap={16} px={20}>
                          <div className="text-sm text-end">
                            <div className="font-semibold">{creds?.username}</div>
                            <div className="text-xs -mt-1 text-slate-400 capitalize">
                              {creds?.role}
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
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar style={{ transition: 'all 0.3s ease' }}>
          <section className="overflow-x-auto min-h-screen pt-1 bar-scroll-blue">
            <div className="p-2 flex flex-col pb-20">
              {creds?.role == 'superadmin' && <NavSuperadmin />}
              <SideNav
                SideNavProps={MenuMain}
                HeaderList={null}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              {creds?.role == 'superadmin' && (
                <SideNav
                  SideNavProps={MenuDataMasterSuperadmin}
                  HeaderList={'Data Master'}
                  ToggleButton={() => toggle()}
                  TitleSetting={setTitle}
                />
              )}
              {creds?.role == 'admin' || ID_COMPANY !== null ? (
                <>
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
                </>
              ) : (
                <NavLink
                  className="rounded-xl mt-5"
                  label={<span className="text-red-500">Pilih Company</span>}
                  leftSection={<IconAlertCircle className="text-red-500" size={22} />}
                  active={false}
                  disabled
                />
              )}
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
