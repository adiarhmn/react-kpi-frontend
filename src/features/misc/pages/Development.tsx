import { Button } from '@mantine/core';
import { IconBulldozer } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Development: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center flex-col text-center h-screen pb-24">
      <IconBulldozer size={48} />
      <h1 className="font-bold text-lg">Fitur dalam Pengembangan</h1>
      <p className="mb-2 text-sm">Tekan tombol dibawah untuk kembali</p>
      <Button size="xs" onClick={() => navigate(-1)}>
        Kembali
      </Button>
    </main>
  );
};
