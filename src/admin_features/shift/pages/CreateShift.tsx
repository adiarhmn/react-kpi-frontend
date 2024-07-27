import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useCreateShift } from '../api/createShift';
import { FormShift } from '../components';

export const CreateShift: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  // Mutation Create Shift
  const mutationShift = useCreateShift();

  const handleSubmit = async (data: ShiftType) => {
    await mutationShift.mutateAsync(data, {
      onSuccess: () => {
        navigate(-1);
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
            <h2 className="font-bold">Tambah Shift</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut form untuk menambahkan shift</div>
          </div>
        </div>
        <div className="mt-5">
          <FormShift onSubmit={handleSubmit} loading={mutationShift.isPending} />
        </div>
      </section>
    </main>
  );
};
