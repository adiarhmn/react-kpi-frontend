import { Button, Input, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { TableUser } from '../components';

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (state?.success && !hasNotifiedRef.current) {
      notifications.show({
        message: state.success,
        color: 'green',
      });
      hasNotifiedRef.current = true;
    }
  });
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Users</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar user atau pengguna yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah User
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
          <Select
            placeholder="Pilih Role"
            data={['Semua Role', 'Admin', 'Superadmin', 'Employee']}
            defaultValue="Semua Role"
            allowDeselect={false}
          />
        </div>
        <div className="mt-7">
          <TableUser />
        </div>
      </section>
    </main>
  );
};
