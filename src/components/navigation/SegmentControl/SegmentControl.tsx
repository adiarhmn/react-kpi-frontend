import { UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

interface SegmentControlProps {
  title: string;
  navbar?: boolean;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({ title, navbar = false }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

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
      title: 'Jadwal',
      href: '/schedule',
    },
    {
      title: 'Pengajuan',
      href: '/permission',
    },
    {
      title: 'Laporan',
      href: '/attendance',
    },
  ];

  const MenuFreelanceFeatures = [
    {
      title: 'Pekerja Lepas',
      href: '/freelancer',
    },
  ];

  if (navbar) {
    return (
      <section className="flex flex-col gap-7">
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

        {creds?.is_freelanced
          ? MenuFreelanceFeatures.map((item, index) => (
              <UnstyledButton key={index} onClick={() => navigate(item.href)}>
                <span
                  className={`${
                    title === item.title ? 'text-blue-500' : 'text-slate-400'
                  } font-semibold cursor-pointer text-sm`}
                >
                  {item.title}
                </span>
              </UnstyledButton>
            ))
          : null}
      </section>
    );
  }

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

      {creds?.is_freelanced
        ? MenuFreelanceFeatures.map((item, index) => (
            <UnstyledButton key={index} onClick={() => navigate(item.href)}>
              <span
                className={`${
                  title === item.title ? 'text-blue-500' : 'text-slate-400'
                } font-semibold cursor-pointer text-sm`}
              >
                {item.title}
              </span>
            </UnstyledButton>
          ))
        : null}
    </section>
  );
};
