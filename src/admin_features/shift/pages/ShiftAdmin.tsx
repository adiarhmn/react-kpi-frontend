import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableShift } from '../components';

export const ShiftAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Shift</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar shift yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Shift
          </Button>
        </div>
        <TableShift />
      </section>
    </main>
  );
};
