import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeLayout, AuthLayout, AppLayout, AdminLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';
import { useEffect } from 'react';

const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { NotFoundLayout } = lazyImport(() => import('@/components/layout'), 'NotFoundLayout');
const { Login } = lazyImport(() => import('@/features/auth'), 'Login');

// Employee Role Pages
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Attendance } = lazyImport(() => import('@/features/attendance'), 'Attendance');
const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');
const { DataAttendance } = lazyImport(() => import('@/features/history'), 'DataAttendance');
const { History } = lazyImport(() => import('@/features/history'), 'History');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');
const { Leave } = lazyImport(() => import('@/features/leave'), 'Leave');
const { Schedule } = lazyImport(() => import('@/features/schedule'), 'Schedule');

// Admin Role Pages
const { DashboardAdmin } = lazyImport(() => import('@/admin_features/misc'), 'DashboardAdmin');
const { Schedule: AdminSchedule } = lazyImport(
  () => import('@/admin_features/schedule'),
  'Schedule'
);
const { Attendance: AdminAttendance } = lazyImport(
  () => import('@/admin_features/attendance'),
  'Attendance'
);
const { CreateSchedule } = lazyImport(() => import('@/admin_features/schedule'), 'CreateSchedule');
const { ShiftAdmin } = lazyImport(() => import('@/admin_features/shift'), 'ShiftAdmin');
const { Employees } = lazyImport(() => import('@/admin_features/employees'), 'Employees');
const { Division } = lazyImport(() => import('@/admin_features/division'), 'Division');

// Data Dummy Gambaran API Untuk Development
const useAuth = () => {
  return {
    creds: {
      role: 'admin',
    },
  };
};

export const AppRoutes: React.FC = () => {
  const { creds } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Routes for Employee or Mobile APP ======================>*/}
        {creds?.role === 'employee' && (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="history">
              <Route index element={<History />} />
              <Route path="data-attendance" element={<DataAttendance />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="leave" element={<Leave />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="attendances" element={<Attendances />} />
          </Route>
        )}

        {/* Routes for Admin with Desktop View ======================>*/}
        {creds?.role === 'admin' && (
          <Route element={<AdminLayout />}>
            <Route index path="/" element={<RedirectToBeranda />} />
            <Route path="beranda" element={<DashboardAdmin />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="schedule/create" element={<CreateSchedule />} />
            <Route path="shift" element={<ShiftAdmin />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="employees" element={<Employees />} />
            <Route path="Division" element={<Division />} />
          </Route>
        )}

        {/* Route For Development */}
        <Route path="development" element={<Development />} />
        <Route path="*" element={<NotFoundLayout />} />
      </Route>

      {/* Authentication Page */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

// ========================= List Function =======================
// Function For Redireact
const RedirectToBeranda: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/beranda');
  }, [navigate]);
  return null;
};
