import { UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface SegmentControlProps {
  title: string;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({ title }) => {
  const navigate = useNavigate();

  const MenuListSimple = [
    {
      title: 'Beranda',
      href: '/beranda',
    },
    {
      title: 'Data Master',
      href: '/division',
    },
    {
      title: 'Absensi',
      href: '/attendance',
    },
    {
      title: 'Pengajuan',
      href: '/permission',
    },
  ];

  return (
    <section className="flex gap-7">
      {MenuListSimple.map((item, index) => (
        <UnstyledButton key={index} onClick={() => navigate(item.href)}>
          <span
            className={`${
              title === item.title ? 'text-blue-500' : 'text-slate-400'
            } font-semibold cursor-pointer text-sm`}
          >
            {item.title}
          </span>
        </UnstyledButton>
      ))}
    </section>
  );
};
