import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  UnstyledButton,
  Indicator,
  Button,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconCalendar,
  IconSettings,
  IconClockHour1,
  IconUsersGroup,
  IconClipboardText,
  IconGauge,
  IconBuildingEstate,
  IconBriefcase,
  IconLogout,
  IconAlarmPlus,
  IconFileAlert,
  IconClockPin,
  IconMap2,
  IconBell,
  IconDashboard,
} from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { LoadingScreen } from '../elements';
import { SegmentControl } from '../navigation';
import { useTitleContext } from '../providers/TitleProvider';

type SubMenuListType = {
  maintitle: string;
  title: string;
  href: string;
  icon: JSX.Element;
};

const MenuBeranda = [
  { maintitle: 'none', title: 'Beranda', href: '/beranda', icon: <IconCalendar size={15} /> },
];

const MenuDataMaster = [
  {
    maintitle: 'Data Master',
    title: 'Data Divisi',
    href: '/division',
    icon: <IconBuildingEstate size={15} />,
  },
  {
    maintitle: 'Data Master',
    title: 'Data Shift',
    href: '/shift',
    icon: <IconClockHour1 size={15} />,
  },
  {
    maintitle: 'Data Master',
    title: 'Data Lokasi',
    href: '/locations',
    icon: <IconMap2 size={15} />,
  },
  {
    maintitle: 'Data Master',
    title: 'Data Karyawan',
    href: '/employees',
    icon: <IconBriefcase size={15} />,
  },
  {
    maintitle: 'Data Master',
    title: 'Data User',
    href: '/users',
    icon: <IconUsersGroup size={15} />,
  },
];

const MenuAbsensi = [
  { maintitle: 'Absensi', title: 'Jadwal', href: '/schedule', icon: <IconCalendar size={15} /> },
  {
    maintitle: 'Data Absensi',
    title: 'Presensi',
    href: '/attendance',
    icon: <IconClipboardText size={15} />,
  },
  { maintitle: 'Absensi', title: 'Aktivitas', href: '/activity', icon: <IconGauge size={15} /> },
];

const MenuPengajuan = [
  {
    maintitle: 'Pengajuan',
    title: 'Absensi',
    href: '/request-attendance',
    icon: <IconClockPin size={15} />,
  },
  { maintitle: 'Pengajuan', title: 'Izin', href: '/permission', icon: <IconFileAlert size={15} /> },
  { maintitle: 'Pengajuan', title: 'Lembur', href: '/overtime', icon: <IconAlarmPlus size={15} /> },
];

// ================================================================================
// ================== THIS LAYOUT FOR SUPERADMIN & ADMIN ==========================
// ================================================================================
export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const { title, setTitle } = useTitleContext();
  const navigate = useNavigate();
  const [submenu, setSubmenu] = useState<SubMenuListType[]>(MenuBeranda);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { creds, logout } = useAuth();
  // const ID_COMPANY = localStorage.getItem('id_company');
  const NAME_COMPANY = localStorage.getItem('name_company');

  const ChangeRole = () => {
    localStorage.setItem('role', 'employee');
    setTimeout(() => {
      window.location.replace('/');
    }, 1000);
  };

  useEffect(() => {
    if (location.pathname.includes('/beranda')) {
      setSubmenu(MenuBeranda);
      setTitle('Beranda');
      navigate('/beranda');
    }

    if (
      [`/division`, '/shift', '/users', '/locations', '/employees'].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuDataMaster);
      setTitle('Data Master');
    }

    if (
      [`/schedule`, '/attendance', '/activity'].some((path) => location.pathname.includes(path))
    ) {
      setSubmenu(MenuAbsensi);
      setTitle('Absensi');
    }

    if (
      [`/request-attendance`, '/permission', '/overtime'].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuPengajuan);
      setTitle('Pengajuan');
    }
  }, [creds, navigate, submenu, location.pathname, setTitle]);

  if (!creds) return <Navigate to="/login" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 0,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header className="shadow-md">
          <Group w="100%" h="100%" justify="space-between" gap={0} className="px-3">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group
              gap={5}
              justify={isMobile ? 'end' : 'center'}
              style={{ width: 240 }}
              className="h-full"
            >
              <img className="w-24" src="/images/logo-2-kpi.png" alt="KPI" />
            </Group>

            {/* Navigation */}
            <SegmentControl title={title} />

            {/* Profile and Name Information */}
            {!isMobile && (
              <Group className="h-full" justify="space-between">
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
                      <Menu.Label>Ganti Level</Menu.Label>
                      <Menu.Item leftSection={<IconDashboard size={14} />} onClick={ChangeRole}>
                        <div>Halaman Karyawan</div>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          {/* SUB MENU LIST */}
          {submenu[0].maintitle != 'none' && (
            <section id="submenulist" className="rounded-md mb-4 flex justify-center gap-5">
              {submenu?.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    navigate(item.href);
                  }}
                  variant={location.pathname.includes(item.href) ? 'filled' : 'outline'}
                  color="blue"
                  leftSection={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </section>
          )}
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
