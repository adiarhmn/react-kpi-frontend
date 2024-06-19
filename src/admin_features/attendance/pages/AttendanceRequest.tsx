import { ActionIcon, Table } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { AttendanceReqType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetAttendanceReq } from '../api';

export const AttendanceRequest: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const date = formatDateToString(new Date().toDateString());
  const { data, isLoading } = useGetAttendanceReq(date, creds?.company_id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Pengajuan Absensi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar pengajuan absensi yang terdaftar pada sistem
            </div>
          </div>
        </div>
        <div className="mt-7">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold">No</Table.Th>
                <Table.Th className="font-bold">Nama</Table.Th>
                <Table.Th className="font-bold">Keterangan</Table.Th>
                <Table.Th className="font-bold">Status</Table.Th>
                <Table.Th className="flex gap-2 items-center justify-center font-bold">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item: AttendanceReqType, index: number) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.employee.name}</Table.Td>
                    <Table.Td>{item.reason}</Table.Td>
                    <Table.Td>{item.status}</Table.Td>
                    <Table.Td className="flex gap-2 items-center justify-center">
                      <ActionIcon disabled={item?.status == 'Disetujui'} color="green">
                        <IconCheck size={14} />
                      </ActionIcon>
                    </Table.Td>
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
