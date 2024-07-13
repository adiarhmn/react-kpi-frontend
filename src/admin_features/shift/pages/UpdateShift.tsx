import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useUpdateShift } from '../api';
import { FormShift } from '../components';

export const UpdateShift: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  if (!id) navigate('/shift');

  console.log('State:', state);

  if (!state?.shift) {
    navigate('/shift');
  }

  // Mutation Create Shift
  const mutate = useUpdateShift();

  const handleSubmit = async (data: ShiftType) => {
    await mutate.mutateAsync(data, {
      onSuccess: (data) => {
        console.log('Success:', data);
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
            <h2 className="font-bold">Edit Shift</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut form untuk menambahkan shift</div>
          </div>
        </div>
        <div className="mt-5">
          <FormShift
            onSubmit={handleSubmit}
            loading={mutate.isPending}
            initialValues={state?.shift}
            edit={true}
          />
        </div>
      </section>
    </main>
  );
};
