/* eslint-disable linebreak-style */
import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DivisionType } from '@/admin_features/types';

import { useUpdateDivision } from '../api';
import { FormDivision } from '../components';

export const UpdateDivision: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const NavBack = () => {
    navigate(-1);
  };

  const division = location.state.division as DivisionType;

  const mutation = useUpdateDivision();

  const handleSubmit = async (dataDivision: DivisionType) => {
    const dataDivisionUpdate = {
      id: dataDivision.id,
      division_name: dataDivision.division_name,
    };

    await mutation.mutateAsync(dataDivisionUpdate, {
      onSuccess: (data) => {
        console.log('Success:', data);
        navigate('/division', { state: { success: 'Data berhasil diupdate' } });
      },
    });
  };

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Update Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk mengubah data divisi
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormDivision
            currentValue={division}
            loading={mutation.isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </main>
  );
};
