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
  IconClockHour1,
  IconUsersGroup,
  IconClipboardText,
  IconGauge,
  IconBuildingEstate,
} from '@tabler/icons-react';
import { SideNav } from '../navigation';

const MenuMain = [
  { title: 'Beranda', href: '/beranda', icon: IconHome2 },
];

const MenuDataMaster = [
  { title: 'Divisi', href: '/division', icon: IconBuildingEstate},
  { title: 'Shift', href: '/shift', icon: IconClockHour1 },
  { title: 'Karyawan', href: '/employees', icon: IconUsersGroup },
];

const MenuAbsensi = [
  { title: 'Jadwal', href: '/schedule', icon: IconCalendar },
  { title: 'Presensi', href: '/attendance', icon: IconClipboardText },
  { title: 'Aktivitas', href: '/activity', icon: IconGauge },
]

const MenuPengajuan = [
  { title: 'Cuti', href: '/leave', icon: IconTrash },
  { title: 'Izin', href: '/permit', icon: IconTrash },
  { title: 'Lembur', href: '/overtime', icon: IconTrash },
]


export const AdminLayout: React.FC = () => {
  // const { creds } = useAuth();
  // if (!creds) return <Navigate to="/login" replace />;
  const [opened, { toggle }] = useDisclosure();

  const [title, setTitle] = useState('Beranda');
  const isMobile = useMediaQuery('(max-width: 768px)');

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
                          <div className="font-semibold">Adi Aulia Rahman</div>
                          <div className="text-xs -mt-1 text-slate-400">
                            adiauliarahman@gmail.com
                          </div>
                        </div>
                        <Avatar
                          src={'/images/user-blue-person.png'}
                          alt={'Adi Aulia Rahman'}
                          radius="xl"
                          size={33}
                        />
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
                HeaderList={"Data Master"}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              <SideNav
                SideNavProps={MenuAbsensi}
                HeaderList={"Absensi"}
                ToggleButton={() => toggle()}
                TitleSetting={setTitle}
              />
              <SideNav
                SideNavProps={MenuPengajuan}
                HeaderList={"Pengajuan"}
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
