import { useId } from '@mantine/hooks';
import { Icon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type Navigation = {
  title: string;
  href: string;
  icon: Icon;
};

export const MenuItem: React.FC<Navigation> = ({ title, href, icon }) => {
  const Icon = icon;
  return (
    // Test
    <Link to={href}>
      <div className="cursor-pointer flex flex-col items-center justify-center">
        <div className="bg-blue-500 rounded-lg w-10 h-10 text-white shadow-xl flex justify-center items-center">
          <Icon />
        </div>
        <h3 className="text-xs text-gray-700 font-semibold mt-2 text-center px-1">{title}</h3>
      </div>
    </Link>
  );
};

type Props = {
  navigations: Navigation[];
};

export const MenuList: React.FC<Props> = ({ navigations }) => {
  const id = useId();

  return (
    <div className="grid grid-cols-4 gap-4">
      {navigations.map((nav, i) => (
        <MenuItem key={`${id}_${i}`} {...nav} />
      ))}
    </div>
  );
};
