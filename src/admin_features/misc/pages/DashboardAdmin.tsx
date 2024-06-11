import { Button, RingProgress, Select, Table, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconEye } from '@tabler/icons-react';
import { useState } from 'react';

import { AllEmployeeCard, FemaleEmployeeCard, MaleEmployeeCard } from '../components';
// TODO: Membuat Data Rekap Absensi Dinamis
export const DashboardAdmin: React.FC = () => {
  const [ringHovered, setRingHovered] = useState<string | null>('Hadir 40');
  return (
    <main>
      {/* Rekap Absensi Hari ini */}
      <div className="grid lg:grid-cols-2 gap-4">
        <section className="bg-white shadow-lg p-3 rounded-lg">
          <div className="grid lg:grid-cols-2">
            <div>
              <h2 className="font-bold">Rekap Absensi Karyawan</h2>
              <div className="-mt-1 text-xs text-slate-400">
                Berikut rekap absensi pada hari ini
              </div>
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
                    <td>: 40 </td>
                    <td>Orang</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-red-600 w-5 h-5"></div>
                    </td>
                    <td>Belum Absen</td>
                    <td>: 20 </td>
                    <td>Orang</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-blue-600 w-5 h-5"></div>
                    </td>
                    <td>Izin</td>
                    <td>: 10 </td>
                    <td>Orang</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="bg-yellow-600 w-5 h-5"></div>
                    </td>
                    <td>Terlambat</td>
                    <td>: 15 </td>
                    <td>Orang</td>
                  </tr>
                </tbody>
              </table>
              <Button
                justify="space-between"
                fullWidth
                className="mt-2 border-2 shadow-lg"
                rightSection={<IconChevronRight size={14} />}
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        </section>

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

        <section className="bg-white shadow-lg p-3 rounded-lg">
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
              data={['Semua Pengajuan', 'Izin', 'Cuti', 'Sakit', 'Lembur']}
              defaultValue="Semua Pengajuan"
            />
          </div>
          <div className="mt-3">
            <Table withColumnBorders withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nama</Table.Th>
                  <Table.Th>Tanggal</Table.Th>
                  <Table.Th>Jenis</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>John Doe</Table.Td>
                  <Table.Td>12-12-2021</Table.Td>
                  <Table.Td>Cuti</Table.Td>
                  <Table.Td>Menunggu Persetujuan</Table.Td>
                  <Table.Td className="text-center">
                    <UnstyledButton>
                      <IconEye size={20} className="text-blue-600" />
                    </UnstyledButton>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </section>
      </div>
    </main>
  );
};
