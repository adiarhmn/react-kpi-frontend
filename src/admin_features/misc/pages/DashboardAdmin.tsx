import { Button, RingProgress, Select, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconEye } from '@tabler/icons-react';
import { useState } from 'react';

export const DashboardAdmin: React.FC = () => {
  const [ringHovered, setRingHovered] = useState<string | null>('Hadir 40');
  return (
    <main>
      {/* Rekap Absensi Hari ini */}
      <div className="grid lg:grid-cols-2 gap-2">
        <section className="bg-white shadow-lg p-3 rounded-lg">
          <div className="flex justify-between">
          <div>
            <h2 className="font-bold">Rekap Absensi Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut rekap absensi pada hari ini</div>
          </div>
          <Select 
          className='max-w-40'
          placeholder="Pilih Divisi"
          data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
          defaultValue="Semua Divisi"
          />
          </div>
          <div className="grid lg:grid-cols-2">
            <RingProgress
              className='mx-auto'
              size={220}
              thickness={25}
              label={<div className="text-center font-semibold text-slate-500">{ringHovered}</div>}
              sections={[
                {
                  value: 40,
                  color: 'green',
                  tooltip: 'Hadir 40 Karyawan',
                  onMouseEnter: () => setRingHovered('Hadir 40'),
                },
                {
                  value: 20,
                  color: 'red',
                  tooltip: 'Belum Absen 20 Karyawan',
                  onMouseEnter: () => setRingHovered('Belum Absen 20'),
                },
                {
                  value: 10,
                  color: 'blue',
                  tooltip: 'Izin 10 Karyawan',
                  onMouseEnter: () => setRingHovered('Izin 10'),
                },
                {
                  value: 15,
                  color: 'yellow',
                  tooltip: 'Terlambat 10 Karyawan',
                  onMouseEnter: () => setRingHovered('Terlambat 15'),
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
                    <td>: 40 Karyawan</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-red-600 w-5 h-5"></div>
                    </td>
                    <td>Belum Absen</td>
                    <td>: 20 Karyawan</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-blue-600 w-5 h-5"></div>
                    </td>
                    <td>Izin</td>
                    <td>: 10 Karyawan</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-yellow-600 w-5 h-5"></div>
                    </td>
                    <td>Terlambat</td>
                    <td>: 15 Karyawan</td>
                  </tr>
                </tbody>
              </table>
              <Button justify='space-between' fullWidth className='mt-2 border-2 shadow-lg' rightSection={<IconChevronRight size={14}/>}>Lihat Semua</Button>
            </div>
          </div>
        </section>
        <section className="bg-white shadow-lg p-3 rounded-lg">
          <h2 className="font-bold">Jumlah Karyawan</h2>
          <div className="grid grid-cols-3">
            <div>Total 299</div>
            <div>Pria 299</div>
            <div>Wanita 299</div>
          </div>
        </section>
      </div>
    </main>
  );
};
