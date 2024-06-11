import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableLocations } from '../components';

export const Locations: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Lokasi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar lokasi yang digunakan untuk lokasi presensi kehadiran
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Lokasi Absen
          </Button>
        </div>
        <div className="mt-7">
          <TableLocations />
        </div>
      </section>
    </main>
  );
};
