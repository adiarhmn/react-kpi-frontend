/* eslint-disable linebreak-style */
import { Button, Input } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TableDivision } from '../components';

export const Division: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (state?.success && !hasNotifiedRef.current) {
      notifications.show({
        message: state.success,
        color: 'green',
      });
      hasNotifiedRef.current = true;
      navigate('.', { state: undefined });
    }
  }, [state, navigate]);

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar divisi yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Divisi
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
        </div>
        <div className="mt-7">
          <TableDivision />
        </div>
      </section>
    </main>
  );
};
