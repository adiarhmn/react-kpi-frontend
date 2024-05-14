import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { clsx } from '@/utils/format';

const variants = {
  default: 'bg-white',
  outline: 'bg-white border-b border-gray-200',
  fill: 'bg-primary-600 text-white',
};

const positions = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

type Props = {
  title?: string;
  to?: string;
  variant?: keyof typeof variants;
  position?: keyof typeof positions;
  backButton?: boolean;
  rightSection?: React.ReactNode;
};

export const Navbar: React.FC<Props> = ({
  title,
  to,
  variant = 'default',
  position = 'center',
  backButton = true,
  rightSection,
}) => {
  const navigate = useNavigate();

  function handleBack() {
    if (to) return navigate(to);

    if (window.history.length <= 1) {
      return navigate('/');
    }

    return navigate(-1);
  }

  return (
    <header
      className={clsx(
        'px-5 py-3.5 flex items-center fixed max-w-md w-full top-0 z-20 space-x-4 text-left',
        variants[variant],
        positions[position]
      )}
    >
      <div className="min-w-[1.5rem] flex">
        {backButton && (
          <button
            onClick={handleBack}
            className="bg-transparent active:translate-y-0.5 transition-transform"
          >
            <IconArrowLeft size={24} />
          </button>
        )}
      </div>
      <div className="flex-grow">
        <h1 className="font-bold text-base">{title || 'Kembali'}</h1>
      </div>
      <div className="min-w-[1.5rem] flex">{rightSection}</div>
    </header>
  );1 
};
