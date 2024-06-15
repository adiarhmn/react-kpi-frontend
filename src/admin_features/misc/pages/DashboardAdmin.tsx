import { Select } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import {
  AllEmployeeCard,
  AttendanceCard,
  FemaleEmployeeCard,
  MaleEmployeeCard,
  RequestCard,
} from '../components';
// TODO: Membuat Data Rekap Absensi Dinamis
export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const [typeRequest, setTypeRequest] = useState<string>('Izin');

  const OptionRequest = [
    { value: 'Cuti', label: 'Cuti' },
    { value: 'Izin', label: 'Izin' },
    { value: 'Sakit', label: 'Sakit' },
    { value: 'Lembur', label: 'Lembur' },
    { value: 'Absensi', label: 'Absensi' },
  ];

  return (
    <main>
      {/* Rekap Absensi Hari ini */}
      <div className="grid lg:grid-cols-2 gap-4">
        <AttendanceCard />
        {/* Total Employees */}
        <section className="bg-white shadow-lg p-3 rounded-lg">
          <div className="mb-3">
            <h2 className="font-bold">Jumlah Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut jumlah karyawan yang terdaftar
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
            <AllEmployeeCard></AllEmployeeCard>
            <MaleEmployeeCard></MaleEmployeeCard>
            <FemaleEmployeeCard></FemaleEmployeeCard>
          </div>
        </section>

        <section className="bg-white shadow-lg p-3 rounded-lg col-span-2">
          <div className="grid lg:grid-cols-2">
            <div>
              <h2 className="font-bold">Daftar Pengajuan</h2>
              <div className="-mt-1 text-xs text-slate-400">
                Berikut pengajuan yang perlu di proses
              </div>
            </div>
            <Select
              className="mt-2 lg:mt-0 w-full"
              placeholder="Pilih Pengajuan"
              data={OptionRequest}
              defaultValue="Izin"
              onChange={(e) => setTypeRequest(e ?? 'Izin')}
            />
          </div>
          <div className="mt-3">
            <RequestCard typeRequest={typeRequest}></RequestCard>
          </div>
        </section>
      </div>
    </main>
  );
};
