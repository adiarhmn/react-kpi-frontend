/* eslint-disable linebreak-style */
import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { DivisionType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useCreateDivision } from '../api';
import { FormDivision } from '../components';

export const CreateDivision: React.FC = () => {
  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  const mutation = useCreateDivision();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const handleSubmit = async (dataDivision: DivisionType) => {
    const divisionDataPost = {
      division_name: dataDivision.division_name,
      company_id: creds?.company_id,
    };

    await mutation.mutateAsync(divisionDataPost, {
      onSuccess: () => {
        navigate('/division', { state: { success: 'Data berhasil ditambahkan' } });
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
