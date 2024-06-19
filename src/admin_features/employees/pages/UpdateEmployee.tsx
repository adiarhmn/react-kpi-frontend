import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';
import { useGetUsersById } from '@/admin_features/users/api';
import { useAuth } from '@/features/auth';

import { useUpdateEmployee } from '../api';
import { FormEmployee, FormEmployeeType } from '../components';

export const UpdateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const location = useLocation();
  if (creds === null) navigate('/login');
  if (!location.state.employee) navigate(-1);

  const [user, setUser] = useState<UserType | null>(null);
  const mutationEmployeeCreate = useUpdateEmployee();
  const { data: DataUser, isLoading: loadUser } = useGetUsersById(
    location.state.employee.user_id ?? 0
  );

  const NavBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (data: FormEmployeeType) => {
    await mutationEmployeeCreate.mutateAsync(data, {
      onSuccess: () => {
        notifications.show({
          title: 'Berhasil',
          message: 'Karyawan berhasil ditambahkan',
          color: 'teal',
        });
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    if (DataUser) {
      setUser(DataUser);
    }
  }, [DataUser]);

  if (loadUser) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan karyawan
            </div>
          </div>
        </div>
        <div className="mt-5">
          <FormEmployee
            onsubmit={handleSubmit}
            loading={mutationEmployeeCreate.isPending}
            initialValues={{
              ...location.state.employee,
              username: user?.username ?? '',
              password: '',
              role: 'employee',
              status: true,
              company_id: creds?.company_id,
            }}
          />
        </div>
      </section>
    </main>
  );
};
