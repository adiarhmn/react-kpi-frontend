import { Link } from 'react-router-dom';

import { clsx } from '@/utils/format';

import type { Navigation } from './BottomNav';

export const NavItem: React.FC<Navigation> = ({ title, href, icon, currentPath }) => {
  const isActive = currentPath == href;
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
