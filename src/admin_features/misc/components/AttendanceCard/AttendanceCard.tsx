import { Button, RingProgress, Select } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAttendanceRecap } from '@/admin_features/attendance/api';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

export const AttendanceCard: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');
  const [ringHovered, setRingHovered] = useState<string | null>('Hadir 40');
  const DateNow = formatDateToString(new Date().toDateString());

  const { data, isLoading } = useGetAttendanceRecap(DateNow, creds?.company_id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="bg-white shadow-lg p-3 rounded-lg">
      <div className="grid lg:grid-cols-2">
        <div>
          <h2 className="font-bold">Rekap Absensi Karyawan</h2>
          <div className="-mt-1 text-xs text-slate-400">Berikut rekap absensi pada hari ini</div>
        </div>
        <Select
          className="mt-2 lg:mt-0 w-full"
          placeholder="Pilih Divisi"
          data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
          defaultValue="Semua Divisi"
        />
      </div>
      <div className="grid lg:grid-cols-2">
        <RingProgress
          className="mx-auto"
          size={220}
          thickness={25}
          label={<div className="text-center font-semibold text-slate-500">{ringHovered}</div>}
          sections={[
            {
              value: ((data?.Hadir ?? 0) / (data?.Overall ?? 1)) * 100 || 0,
              color: 'green',
              tooltip: `Hadir ${data?.Hadir ?? 0} Karyawan`,
              onMouseEnter: () => setRingHovered(`Hadir ${data?.Hadir ?? 0}`),
            },
            {
              value: ((data?.BelumHadir ?? 0) / (data?.Overall ?? 1)) * 100 || 0,
              color: 'red',
              tooltip: `Belum Absen ${data?.BelumHadir ?? 0} Karyawan`,
              onMouseEnter: () => setRingHovered(`Belum Absen ${data?.BelumHadir ?? 0}`),
            },
            {
              value: ((data?.Izin ?? 0) / (data?.Overall ?? 1)) * 100 || 0,
              color: 'blue',
              tooltip: `Izin ${data?.Izin ?? 0} Karyawan`,
              onMouseEnter: () => setRingHovered(`Izin ${data?.Izin ?? 0}`),
            },
            {
              value: ((data?.Terlambat ?? 0) / (data?.Overall ?? 1)) * 100 || 0,
              color: 'yellow',
              tooltip: `Terlambat ${data?.Terlambat ?? 0} Karyawan`,
              onMouseEnter: () => setRingHovered(`Terlambat ${data?.Terlambat ?? 0}`),
            },
            {
              value: ((data?.Cuti ?? 0) / (data?.Overall ?? 1)) * 100 || 0,
              color: 'purple',
              tooltip: `Cuti ${data?.Cuti ?? 0} Karyawan`,
              onMouseEnter: () => setRingHovered(`Cuti ${data?.Cuti ?? 0}`),
            },
          ]}
        ></RingProgress>
        <div className="py-7 text-sm flex flex-col justify-between">
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <div className="bg-green-600 w-5 h-5"></div>
                </td>
                <td>Hadir</td>
                <td>: {data?.Hadir} </td>
                <td>Orang</td>
              </tr>
              <tr>
                <td>
                  <div className="bg-red-600 w-5 h-5"></div>
                </td>
                <td>Belum Absen</td>
                <td>: {data?.BelumHadir} </td>
                <td>Orang</td>
              </tr>
              <tr>
                <td>
                  <div className="bg-blue-600 w-5 h-5"></div>
                </td>
                <td>Izin</td>
                <td>: {data?.Izin} </td>
                <td>Orang</td>
              </tr>
              <tr>
                <td>
                  <div className="bg-yellow-600 w-5 h-5"></div>
                </td>
                <td>Terlambat</td>
                <td>: {data?.Terlambat} </td>
                <td>Orang</td>
              </tr>
              <tr>
                <td>
                  <div className="bg-purple-600 w-5 h-5"></div>
                </td>
                <td>Cuti</td>
                <td>: {data?.Cuti} </td>
                <td>Orang</td>
              </tr>
            </tbody>
          </table>
          <Button
            justify="space-between"
            fullWidth
            className="mt-2 border-2 shadow-lg"
            onClick={() => navigate('/attendance')}
            rightSection={<IconChevronRight size={14} />}
          >
            Lihat Semua
          </Button>
        </div>
      </div>
    </section>
  );
};