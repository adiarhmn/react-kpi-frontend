import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { CreateAttendanceLocationType, useUpdateLocations } from '../api';
import { FormLocations } from '../components';

export const UpdateLocations: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const { state } = useLocation();
  if (creds === null) navigate('/login');
  if (state === undefined) navigate('/locations');

  const mutation = useUpdateLocations();
  const handleSubmit = async (data: CreateAttendanceLocationType) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => {
        navigate('/locations', { state: { success: 'Data berhasil Diperbarui' } });
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
            <h2 className="font-bold">Update Lokasi Absensi Kehadiran</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk memperbarui Lokasi Absensi
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormLocations
            onSubmit={handleSubmit}
            loading={mutation.isPending}
            initialValues={state}
          />
        </div>
      </section>
    </main>
  );
};
