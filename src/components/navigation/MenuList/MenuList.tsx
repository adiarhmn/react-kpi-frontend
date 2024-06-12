import { useId } from '@mantine/hooks';
import { Icon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type Navigation = {
  title: string;
  href: string;
  icon: Icon;
  color?: string;
};

export const MenuItem: React.FC<Navigation> = ({
  title,
  href,
  icon,
  color = 'bg-gradient-to-r from-blue-700 to-blue-400',
}) => {
  const Icon = icon;
  return (
    // Test
    <Link to={href}>
      <div className="cursor-pointer flex flex-col items-center justify-center">
        <div
          className={` ${color} rounded-xl w-14 h-14 text-white shadow-md flex justify-center items-center`}
        >
          <Icon size={37} />
        </div>
        <h3 className="text-xs text-gray-700 font-semibold mt-1 text-center px-1">{title}</h3>
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
    <div className="overflow-x-auto overflow-y-hidden pb-3">
      <div className="w-screen grid grid-cols-5 grid-rows-2 mx-2 gap-y-4">
        {navigations.map((nav, i) => (
          <MenuItem key={`${id}_${i}`} {...nav} />
        ))}
      </div>
    </div>
  );
};
