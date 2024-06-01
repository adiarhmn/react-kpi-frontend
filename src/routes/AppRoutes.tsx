import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, AdminLayout } from '@/components/layout';
import { useAuth } from '@/features/auth';
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from '@/utils/lazyImport';

const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { NotFoundLayout } = lazyImport(() => import('@/components/layout'), 'NotFoundLayout');
const { Login } = lazyImport(() => import('@/features/auth'), 'Login');

// Employee Role Pages
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
const { PaidLeave } = lazyImport(() => import('@/features/paid-leave'), 'PaidLeave');
const { AddPaidLeave } = lazyImport(() => import('@/features/paid-leave'), 'AddPaidLeave');
const { Overtime } = lazyImport(() => import('@/features/overtime'), 'Overtime');
const { AddOvertime } = lazyImport(() => import('@/features/overtime'), 'AddOvertime');
const { Schedule } = lazyImport(() => import('@/features/schedule'), 'Schedule');
const { EduBackground } = lazyImport(() => import('@/features/employee'), 'EduBackground');
const { EduBackgroundAdd } = lazyImport(() => import('@/features/employee'), 'EduBackgroundAdd');
const { Biodata } = lazyImport(() => import('@/features/employee'), 'Biodata');
const { BiodataEdit } = lazyImport(() => import('@/features/employee'), 'BiodataEdit');
const { FileProfile } = lazyImport(() => import('@/features/employee'), 'FileProfile');

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
const { UpdateSchedule } = lazyImport(() => import('@/admin_features/schedule'), 'UpdateSchedule');
const { ShiftAdmin } = lazyImport(() => import('@/admin_features/shift'), 'ShiftAdmin');
const { Employees } = lazyImport(() => import('@/admin_features/employees'), 'Employees');
const { Division } = lazyImport(() => import('@/admin_features/division'), 'Division');
const { CreateDivision } = lazyImport(() => import('@/admin_features/division'), 'CreateDivision');
const { UpdateDivision } = lazyImport(() => import('@/admin_features/division'), 'UpdateDivision');
const { CreateShift } = lazyImport(() => import('@/admin_features/shift'), 'CreateShift');
const { CreateEmployee } = lazyImport(() => import('@/admin_features/employees'), 'CreateEmployee');
const { Users } = lazyImport(() => import('@/admin_features/users'), 'Users');
const { CreateUser } = lazyImport(() => import('@/admin_features/users'), 'CreateUser');
const { UpdateUser } = lazyImport(() => import('@/admin_features/users'), 'UpdateUser');
const { Activitys } = lazyImport(() => import('@/admin_features/activity'), 'Activitys');
const { Leave } = lazyImport(() => import('@/admin_features/leaves'), 'Leave');
const { Permission } = lazyImport(() => import('@/admin_features/permission'), 'Permission');

export const AppRoutes: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!creds) {
      navigate('/login');
    }
  }, [creds, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Routes for Employee or Mobile APP ======================>*/}
        {creds?.role === 'employee' && (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="info-attendance" element={<AttendanceInfo />} />
            <Route path="history">
              <Route index element={<History />} />
              <Route path="data-attendance" element={<DataAttendance />} />
              <Route path="data-absence">
                <Route index element={<DataAbsence />} />
                <Route path=":id" element={<DetailAbsence />} />
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
              <Route path="edu-background">
                <Route index element={<EduBackground />} />
                <Route path="add" element={<EduBackgroundAdd />} />
              </Route>
            </Route>

            {/* Route Menu List */}
            <Route path="absence">
              <Route index element={<Absence />} />
              <Route path="add" element={<AddAbsence />} />
            </Route>
            <Route path="paid-leave">
              <Route index element={<PaidLeave />} />
              <Route path="add" element={<AddPaidLeave />} />
            </Route>
            <Route path="overtime">
              <Route index element={<Overtime />} />
              <Route path="add" element={<AddOvertime />} />
            </Route>

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
            <Route path="schedule/update" element={<UpdateSchedule />} />
            <Route path="shift" element={<ShiftAdmin />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="employees" element={<Employees />} />
            <Route path="division" element={<Division />} />
            <Route path="division/create" element={<CreateDivision />} />
            <Route path="division/update" element={<UpdateDivision />} />
            <Route path="shift/create" element={<CreateShift />} />
            <Route path="employees/create" element={<CreateEmployee />} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/update" element={<UpdateUser />} />
            <Route path="activity" element={<Activitys />} />
            <Route path="leave" element={<Leave />} />
            <Route path="permission" element={<Permission />} />
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
