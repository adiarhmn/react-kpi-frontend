import { Link, useLocation } from 'react-router-dom';

import { clsx } from '@/utils/format';

import type { Navigation } from './BottomNav';

export const NavItem: React.FC<Navigation> = ({ title, href, icon }) => {
  const location = useLocation();
  const isActive =
    href == '/' ? location.pathname == href : new RegExp(`${href}/*`, 'gi').test(location.pathname);
  const Icon = icon;

  return (
    <Link
      to={href}
      className={clsx(
        'flex flex-col items-center justify-center w-full',
        isActive ? 'text-blue-600' : 'text-dark-100'
      )}
    >
      <Icon className="w-5 h-5 mb-1" />
      <div className="text-xs font-medium">{title}</div>
    </Link>
  );
};
