import { Route, Routes } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, AdminLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Attendance } = lazyImport(() => import('@/features/attendance'), 'Attendance');
const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');
const { DataAttendance } = lazyImport(() => import('@/features/history'), 'DataAttendance');
const { History } = lazyImport(() => import('@/features/history'), 'History');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');
const { Leave } = lazyImport(() => import('@/features/leave'), 'Leave');
const { Schedule } = lazyImport(() => import('@/features/schedule'), 'Schedule');

// Admin Pages
const { DashboardAdmin } = lazyImport(() => import('@/admin_features/misc'), 'DashboardAdmin');

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes for Employee or Mobile APP */}
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="history">
            <Route index element={<History />} />
            <Route path="data-attendance" element={<DataAttendance />} />
          </Route>
          <Route path="profile" element={<Profile />} />

          {/* Route Menu List */}
          <Route path="leave" element={<Leave />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="attendances" element={<Attendances />} />
        </Route>
        <Route path="*" element={<Development />}></Route>
      </Route>

      {/* Routes for Admin with Desktop View */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashboardAdmin />} />
        <Route path="*" element={<Development />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
