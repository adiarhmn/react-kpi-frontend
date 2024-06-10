import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { CreateAttendanceLocationType, useCreateLocations } from '../api';

export const CreateLocations: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useCreateLocations();
  const handleSubmit = async (data: CreateAttendanceLocationType) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => {
        navigate('/locations', { state: { success: 'Data berhasil ditambahkan' } });
      },
    });
  };
  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={() => navigate(-1)} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan divisi
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormDivision loading={mutation.isPending} onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
};
