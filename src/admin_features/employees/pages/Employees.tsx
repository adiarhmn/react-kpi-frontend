import { Button, Input, Select } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { TableEmployee } from '../components';

// Base URL API

export const Employees: React.FC = () => {
  const navigate = useNavigate();

  // Components
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar karyawan yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Karyawan
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
          <Select
            placeholder="Pilih Divisi"
            data={['Semua Divisi', 'IT Support', 'HRD', 'Finance']}
            defaultValue="Semua Divisi"
            allowDeselect={false}
          />
        </div>
        <TableEmployee />
      </section>
    </main>
  );
};
