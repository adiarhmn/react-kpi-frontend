import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { TablePermission } from '../components';

export const Permission: React.FC = () => {
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Pengajuan Izin</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar pengajuan izin yang terdaftar pada sistem
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
        </div>
        <div className="mt-7">
          <TablePermission />
        </div>
      </section>
    </main>
  );
};
