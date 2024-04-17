import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const NotFoundLayout: React.FC = () => {
    const navigate = useNavigate();
  return (
    <main className="flex items-center justify-center flex-col text-center h-screen pb-24 bg-blue-600">
      <img className="w-52" src="/images/development-maintenance.svg" alt="" />
      <div className="text-white">
        <h1 className="font-bold text-lg">404 Not Found</h1>
        <p className="mb-2 text-sm">Halaman yang anda cari tidak ada</p>
        <Button variant="white" color="blue" radius="xl" size="xs" onClick={() => navigate(-1)}>
          <span className="font-semibold">Kembali</span>
        </Button>
      </div>
    </main>
  );
};
