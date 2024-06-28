import { Button } from '@mantine/core';
import { IconBulldozer } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Development: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center flex-col text-center h-screen pb-24 bg-blue-600">
      <img className="w-52" src="/images/development-maintenance.svg" alt="" />
      <div className="text-white">
        <h1 className="font-bold text-lg">Fitur masih dalam tahap pengembangan</h1>
        {/* <p className="mb-2 text-sm">Tekan tombol dibawah untuk kembali</p> */}
        <Button variant="white" color="blue" radius="10px" size="xs" onClick={() => navigate(-1)}>
          <span className="font-semibold">Kembali</span>
        </Button>
      </div>
    </main>
  );
};
