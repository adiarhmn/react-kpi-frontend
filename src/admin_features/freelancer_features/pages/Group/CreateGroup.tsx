import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { FormGroup } from '../../components';

export const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-start">
          <ActionIcon onClick={() => navigate(-1)} color="blue" className="mt-1">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <div className="flex gap-3 items-center">
              <h2 className="font-bold">Tambah Kelompok</h2>
            </div>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan Kelompok
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormGroup />
        </div>
      </section>
    </main>
  );
};
