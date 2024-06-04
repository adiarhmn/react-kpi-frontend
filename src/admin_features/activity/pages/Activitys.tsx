import { Input, Table } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { ActivitysType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetActivitys } from '../api';

export const Activitys: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const {
    data: DataActivity,
    error: errorActivity,
    isLoading: loadingActivity,
  } = useGetActivitys();

  if (loadingActivity) {
    return <div>Loading...</div>;
  }
  if (errorActivity) {
    return <div className="text-red-600 text-center my-20 font-bold">{errorActivity.message}</div>;
  }
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Aktivitas</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar aktivitas karyawan pada hari ini
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
        </div>
        <div className="mt-7">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold">Nama</Table.Th>
                <Table.Th className="font-bold">Aktivitas</Table.Th>
                <Table.Th className="font-bold">Deskripsi</Table.Th>
                {/* <Table.Th className="font-bold">Aksi</Table.Th> */}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {DataActivity.map((activity: ActivitysType, index: number) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{activity?.attendance.employee?.name}</Table.Td>
                    <Table.Td>{activity?.name}</Table.Td>
                    <Table.Td>{activity?.description}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
