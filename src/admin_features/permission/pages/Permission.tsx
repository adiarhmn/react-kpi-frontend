/* eslint-disable linebreak-style */
import { Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

import { formatDateToString } from '@/utils/format';

import { TablePermission } from '../components';

export const Permission: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<string>('Semua Status');
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
          <DatePickerInput
            className="max-w-56 mt-2 lg:mt-0"
            placeholder="Pick date"
            value={date}
            onChange={(value) => setDate(value as Date)}
          />
          <Select
            className="mt-2 lg:mt-0 max-w-xs"
            placeholder="Pilih Pengajuan"
            data={['Semua Status', 'Disetujui', 'Ditolak', 'Belum Disetujui']}
            defaultValue="Semua Status"
            onChange={(e) => setStatus(e ?? 'Semua Status')}
          />
        </div>
        <div className="mt-7">
          <TablePermission date={formatDateToString(date.toDateString())} status={status} />
        </div>
      </section>
    </main>
  );
};
