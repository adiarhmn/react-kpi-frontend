import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Freelancer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Data Pekerja</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar pekerja yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Pekerja
          </Button>
        </div>
        <div className="flex gap-2"></div>
        <div className="mt-7"></div>
      </section>
    </main>
  );
};
