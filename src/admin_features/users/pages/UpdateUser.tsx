/* eslint-disable linebreak-style */
import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';

import { useUpdateUser } from '../api/updateUser';
import { FormUser } from '../components';

export const UpdateUser: React.FC = () => {
  const MutationUpdateUser = useUpdateUser();
  const location = useLocation();
  const user = location.state.user as UserType;

  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  // Fungsi Submit form data user
  const handleSubmit = async (dataUser: UserType) => {
    await MutationUpdateUser.mutateAsync(dataUser, {
      onSuccess: () => {
        navigate('/users');
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
            <h2 className="font-bold">Update User</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk memperbarui data pengguna
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormUser currentUser={user} loading={false} onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
};
