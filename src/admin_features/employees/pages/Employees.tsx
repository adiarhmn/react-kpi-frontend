/* eslint-disable linebreak-style */
import { Button, Select } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetDivisions } from '@/admin_features/division/api';
import { useAuth } from '@/features/auth';

import { TableEmployee } from '../components';

// Base URL API

export const Employees: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [DivisionID, setDivisionID] = useState<number>(0);
  if (creds === null) navigate('/login');

  const {
    data: dataDivisi,
    isLoading: loadDivisi,
    error: errorDivisi,
  } = useGetDivisions(creds?.company_id);

  if (loadDivisi) {
    return <div>Loading...</div>;
  }
  if (errorDivisi) {
    return <div className="text-red-600 text-center my-20 font-bold">{errorDivisi.message}</div>;
  }

  const optionDataDivision = dataDivisi.map((division: any) => ({
    value: division.id.toString(),
    label: division.division_name,
  }));

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
          <Select
            placeholder="Pilih Divisi"
            data={[{ value: '0', label: 'Semua Divisi' }, ...optionDataDivision]}
            required
            defaultValue={'0'}
            onChange={(e) => setDivisionID(parseInt(e ?? ''))}
          />
        </div>
        <TableEmployee division_id={DivisionID} />
      </section>
    </main>
  );
};
