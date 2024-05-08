import { Route, Routes } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, AdminLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Attendance } = lazyImport(() => import('@/features/attendance'), 'Attendance');
const { AttendanceInfo } = lazyImport(() => import('@/features/attendance'), 'AttendanceInfo');
const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');
const { DataAttendance } = lazyImport(() => import('@/features/history'), 'DataAttendance');
const { History } = lazyImport(() => import('@/features/history'), 'History');
const { DataAbsence } = lazyImport(() => import('@/features/history'), 'DataAbsence');
const { DetailAbsence } = lazyImport(() => import('@/features/history'), 'DetailAbsence');
const { DataPaidLeave } = lazyImport(() => import('@/features/history'), 'DataPaidLeave');
const { DetailPaidLeave } = lazyImport(() => import('@/features/history'), 'DetailPaidLeave');
const { DataOvertime } = lazyImport(() => import('@/features/history'), 'DataOvertime');
const { DetailOvertime } = lazyImport(() => import('@/features/history'), 'DetailOvertime');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');
const { Absence } = lazyImport(() => import('@/features/leave'), 'Absence');
const { AddAbsence } = lazyImport(() => import('@/features/leave'), 'AddAbsence');
const { Overtime } = lazyImport(() => import('@/features/overtime'), 'Overtime');
const { AddOvertime } = lazyImport(() => import('@/features/overtime'), 'AddOvertime');
const { Schedule } = lazyImport(() => import('@/features/schedule'), 'Schedule');
const { EduBackground } = lazyImport(() => import('@/features/employee'), 'EduBackground');
const { Biodata } = lazyImport(() => import('@/features/employee'), 'Biodata');
const { BiodataEdit } = lazyImport(() => import('@/features/employee'), 'BiodataEdit');
const { FileProfile } = lazyImport(() => import('@/features/employee'), 'FileProfile');

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
          <Route path="info-attendance" element={<AttendanceInfo />} />
          <Route path="history">
            <Route index element={<History />} />
            <Route path="data-attendance" element={<DataAttendance />} />
            <Route path="data-absence">
              <Route index element={<DataAbsence />} />
              <Route path="detail" element={<DetailAbsence />} />
            </Route>
            <Route path="data-paid-leave">
              <Route index element={<DataPaidLeave />} />
              <Route path="detail" element={<DetailPaidLeave />} />
            </Route>
            <Route path="data-overtime">
              <Route index element={<DataOvertime />} />
              <Route path="detail" element={<DetailOvertime />} />
            </Route>
          </Route>
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="biodata" element={<Biodata />} />
            <Route path="file" element={<FileProfile />} />
            <Route path="biodata/edit" element={<BiodataEdit />} />
            <Route path="edu-background" element={<EduBackground />} />
          </Route>

          {/* Route Menu List */}
          <Route path="absence">
            <Route index element={<Absence />} />
            <Route path="add" element={<AddAbsence />} />
          </Route>
          <Route path="overtime">
            <Route index element={<Overtime />} />
            <Route path="add" element={<AddOvertime />} />
          </Route>

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
