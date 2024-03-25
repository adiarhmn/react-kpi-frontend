import { Icon } from '@tabler/icons-react';

import { NavItem } from './NavItem';

export type Navigation = {
  title: string;
  href: string;
  icon: Icon;
};

interface Props {
  navigations: Navigation[];
}

export const BottomNav: React.FC<Props> = ({ navigations }) => {
  return (
    <footer className="fixed max-w-md w-full z-50 bottom-0 shadow-md bg-white border-t border-gray-100 flex items-center justify-around py-2.5">
      {navigations.map((navigation) => (
        <NavItem key={navigation.title} {...navigation} />
      ))}
    </footer>
  );
};
