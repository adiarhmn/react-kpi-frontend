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
  IconAdjustmentsFilled,
} from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Companys, useAuth } from '@/features/auth';
import { useGetCompanys } from '@/superadmin/company';

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

const MenuJadwal = [
  { maintitle: 'none', title: 'Jadwal', href: '/schedule', icon: <IconCalendar size={15} /> },
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
];

const MenuAbsensi = [
  {
    maintitle: 'Laporan',
    title: 'Presensi',
    href: '/attendance',
    icon: <IconClipboardText size={15} />,
  },
  { maintitle: 'Laporan', title: 'Aktivitas', href: '/activity', icon: <IconGauge size={15} /> },
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

const MenuFreelancer = [
  {
    maintitle: 'Pekerja Lepas',
    title: 'Data Pekerja',
    href: '/freelancer',
    icon: <IconUsersGroup size={15} />,
  },
  {
    maintitle: 'Pekerja Lepas',
    title: 'Data Sesi',
    href: '/session',
    icon: <IconClockHour1 size={15} />,
  },
  {
    maintitle: 'Pekerja Lepas',
    title: 'Data Kelompok',
    href: '/group',
    icon: <IconBuildingEstate size={15} />,
  },
  {
    maintitle: 'Pekerja Lepas',
    title: 'Presensi',
    href: '/attendance_freelancer',
    icon: <IconClipboardText size={15} />,
  },
];

// ================================================================================
// ================== THIS LAYOUT FOR SUPERADMIN & ADMIN ==========================
// ================================================================================
export const AdminLayout: React.FC = () => {
  const BASE_URL = window.location.origin;
  const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/';

  const [company, setCompany] = useState<Companys | undefined>(undefined);
  const COMPANY_DATA = JSON.parse(localStorage.getItem('COMPANY_DATA') || '{}');

  const { data, isLoading, isError } = useGetCompanys();

  useEffect(() => {
    if (data) {
      // Search for the company that matches the base URL
      const company = data.find((company: any) => company.companyUrl === BASE_URL);
      company && localStorage.setItem('company', company);
      setCompany(company);
    }
  }, [BASE_URL, data]);

  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const { title, setTitle } = useTitleContext();
  const navigate = useNavigate();
  const [submenu, setSubmenu] = useState<SubMenuListType[]>(MenuBeranda);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const isTablet = useMediaQuery('(max-width: 1000px)');

  const ID_COMPANY = localStorage.getItem('id_company');
  const { creds, logout } = useAuth();

  // if (!ID_COMPANY && creds?.role !== 'admin') navigate('/beranda');

  const ChangeRole = () => {
    localStorage.setItem('role', 'employee');
    setTimeout(() => {
      window.location.replace('/');
    }, 1000);
  };

  const changeCompany = () => {
    localStorage.removeItem('id_company');
    localStorage.removeItem('name_company');
    setTimeout(() => {
      window.location.replace('/beranda');
    }, 100);
  };

  useEffect(() => {
    if (!location.pathname.includes('/beranda') && creds?.role !== 'admin') {
      if (!ID_COMPANY) window.location.replace('/beranda');
    }

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
      setSubmenu([
        ...MenuDataMaster,
        ...(creds?.role === 'superadmin'
          ? [
              {
                maintitle: 'Data Master',
                title: 'Data User',
                href: '/users',
                icon: <IconUsersGroup size={15} />,
              },
            ]
          : []),
      ]);
      setTitle('Data Master');
    }

    if (['/attendance', '/activity'].some((path) => location.pathname.includes(path))) {
      setSubmenu(MenuAbsensi);
      setTitle('Laporan');
    }

    if (location.pathname.includes('/schedule')) {
      setSubmenu(MenuJadwal);
      setTitle('Jadwal');
    }

    if (
      [`/request-attendance`, '/permission', '/overtime'].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuPengajuan);
      setTitle('Pengajuan');
    }

    if (
      [`/freelancer`, '/session', '/group', '/attendance_freelancer'].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      if (creds?.is_freelanced) {
        setSubmenu(MenuFreelancer);
        setTitle('Pekerja Lepas');
      } else {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creds, navigate]);

  if (!creds) return <Navigate to="/login" replace />;
  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error</div>;

  // ==================================================================================================================================================>
  // ==================================================================================================================================================>
  // ==== RENDER COMPONENT =============================================================================================================================>
  // ==================================================================================================================================================>
  // ==================================================================================================================================================>
  if (isMobile) {
    return (
      <div className="bg-blue-600 min-h-screen text-white flex justify-center items-center text-lg text-center p-20">
        Halaman Admin dan Superadmin hanya bisa diakses Melalui Layar Desktop{' '}
      </div>
    );
  }
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
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
            <Group
              gap={5}
              justify={isMobile ? 'end' : 'center'}
              style={{ width: 240 }}
              className="h-full"
            >
              <div className="flex gap-2 items-center">
                {company && creds?.role == 'admin' ? (
                  <>
                    <Avatar
                      className="shadow-lg"
                      src={
                        company?.company_logo
                          ? BaseURL + '/public/company-logo/' + company?.company_logo
                          : '/images/kpi-logo.png'
                      }
                      alt="Logo company"
                      size={40}
                    />
                    <div className="text-sm font-bold uppercase text-slate-700 text-center">
                      {company?.name}
                    </div>
                  </>
                ) : (
                  <>
                    <img src="/images/kpi-logo.png" alt="" className="w-10" />
                    <div className="text-xs font-bold uppercase text-slate-700 text-center">
                      {COMPANY_DATA?.name ?? 'KPI'}
                    </div>
                  </>
                )}
              </div>
            </Group>

            {/* Navigation Untuk Admin */}
            {creds?.role === 'admin' || ID_COMPANY ? (
              <>{!isTablet && <SegmentControl title={title} />}</>
            ) : (
              <div className="text-slate-500 font-semibold">Superadmin</div>
            )}

            {/* Profile and Name Information */}
            {!isTablet && (
              <Group className="h-full" justify="space-between">
                <Group gap={5} className="h-full" justify="end">
                  {ID_COMPANY && creds?.role === 'superadmin' ? (
                    <div className="border-r border-slate-400 pe-5">
                      <Button
                        size="xs"
                        onClick={changeCompany}
                        leftSection={<IconAdjustmentsFilled size={18}></IconAdjustmentsFilled>}
                      >
                        Ganti Company
                      </Button>
                    </div>
                  ) : (
                    <div className="border-r border-slate-400 pe-5">
                      <Indicator inline label="2" size={16} color="red">
                        <ActionIcon radius={'xl'} color="rgba(219,219,219,1)">
                          <IconBell className="text-slate-500" size={20} />
                        </ActionIcon>
                      </Indicator>
                    </div>
                  )}
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
        {isTablet && (
          <AppShell.Navbar p="sm">
            <SegmentControl title={title} navbar={true} />
          </AppShell.Navbar>
        )}
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
