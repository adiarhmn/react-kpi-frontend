import { IconHome, IconUser, IconHandStop, IconChecklist, IconNews } from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { NavItem } from '../navigation/BottomNav/NavItem';
import { AttendanceType, useGetAttendance } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';

const navigationsleft = [
  { title: 'Home', href: '/', icon: IconHome },
  { title: 'Berita', href: '/news', icon: IconNews },
];
const navigationsright = [
  { title: 'Riwayat', href: '/history', icon: IconChecklist },
  { title: 'Profil', href: '/profile', icon: IconUser },
];

export const HomeLayout: React.FC = () => {
  const location = useLocation();
  const { creds } = useAuth();
  const path = location.pathname;
  const [currentPath, setCurrentPath] = useState(path || '/');
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendance } = useGetAttendance(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);
  return (
    <div className="w-full min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] max-w-md relative overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>

      <footer className="fixed max-w-md w-full z-50 bottom-0 shadow-md bg-white border-t border-gray-100 flex items-center justify-around py-2.5 ">
        {navigationsleft.map((navigation) => (
          <NavItem key={navigation.title} {...navigation} currentPath={currentPath} />
        ))}
        <div className="w-full flex justify-center">
          <div className="absolute bottom-1">
            <Link
              to={'/attendance'}
              className={`${attendance?.check_in != null && attendance?.check_out == null ? `bg-red-600 ` : attendance?.check_out != null ? 'bg-slate-300' : `bg-blue-600 `} flex flex-col items-center justify-center text-white w-16 max-w-16  rounded-full min-h-16 h-16 shadow-lg`}
            >
              <IconHandStop className="mb-1" size={37} />
            </Link>
            <div className="text-xs font-medium mb-1 mt-1 text-dark-100 w-full text-center">
              {attendance?.check_in != null && attendance?.check_out == null
                ? 'Check-out'
                : attendance?.check_out != null
                  ? 'Presensi'
                  : 'Check-in'}
            </div>
          </div>
        </div>
        {navigationsright.map((navigation) => (
          <NavItem key={navigation.title} {...navigation} currentPath={currentPath} />
        ))}
      </footer>
    </div>
  );
};
