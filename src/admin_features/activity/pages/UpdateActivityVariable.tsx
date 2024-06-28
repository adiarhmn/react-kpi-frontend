import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetActivityAlias, useUpdateActivity } from '../api';
import { ActivitysVariableType, FormActivityVariabel } from '../components';

export const UpdateActivityVariable: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const { data, isLoading } = useGetActivityAlias(creds?.company_id);

  const mutation = useUpdateActivity();

  const handleSubmit = async (values: ActivitysVariableType) => {
    mutation.mutateAsync(values, {
      onSuccess: () => {
        navigate('/activity', { state: { success: 'Data berhasil Perbarui' } });
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={() => navigate(-1)} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Update Variabel Aktivitas</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk memperbarui variabel aktifitas
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormActivityVariabel
            loading={mutation.isPending}
            onSubmit={handleSubmit}
            inittialValues={data[0] || undefined}
          />
        </div>
      </section>
    </main>
  );
};
