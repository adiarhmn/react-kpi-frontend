import { IconHome, IconUser, IconHandStop, IconChecklist, IconNews } from '@tabler/icons-react';
import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { NavItem } from '../navigation/BottomNav/NavItem';

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
  const path = location.pathname;
  const [currentPath, setCurrentPath] = useState(path || '/');
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);
  return (
    <div className="w-full min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] max-w-md relative overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>

      <footer className="fixed max-w-md w-full z-50 bottom-0 shadow-md bg-white border-t border-gray-100 flex items-center justify-around py-2.5">
        {navigationsleft.map((navigation) => (
          <NavItem key={navigation.title} {...navigation} currentPath={currentPath} />
        ))}
        <div className="w-full">
          <div className="min-w-20 w-20 bg-blue-600 rounded-full max-w-20 min-h-20 h-20 absolute bottom-1 shadow-lg">
            <Link
              to={'/attendance'}
              className={'flex flex-col items-center justify-center w-full h-full text-white'}
            >
              <IconHandStop className="mb-1" size={33} />
              <div className="text-xs font-medium mb-1">Check-In</div>
            </Link>
          </div>
        </div>
        {navigationsright.map((navigation) => (
          <NavItem key={navigation.title} {...navigation} currentPath={currentPath} />
        ))}
      </footer>
    </div>
  );
};
