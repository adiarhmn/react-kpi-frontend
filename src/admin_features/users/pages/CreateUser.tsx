/* eslint-disable linebreak-style */
import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useCreateUser } from '../api/createUser';
import { FormUser } from '../components';

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const mutationUser = useCreateUser();
  const NavBack = () => {
    navigate(-1);
  };

  // Fungsi Submit form data user
  const handleSubmit = async (dataUser: UserType) => {
    const userData = {
      username: dataUser.username,
      password: dataUser.password,
      role: dataUser.role,
      status: true,
      company_id: creds?.company_id,
    };

    await mutationUser.mutateAsync(userData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        if (data.status === '400') {
          notifications.show({
            message: data.message,
            color: 'red',
          });
          return;
        } else {
          navigate('/users', { state: { success: 'Data berhasil ditambahkan' } });
        }
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
            <h2 className="font-bold">Tambah User</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan user atau pengguna baru
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormUser loading={mutationUser.isPending} onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
};
