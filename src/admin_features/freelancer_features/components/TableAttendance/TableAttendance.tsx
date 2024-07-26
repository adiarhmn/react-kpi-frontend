import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { AttendanceWorkerType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetAttendanceWorker } from '../../api';

export const TableAttendance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const { data, isLoading, isError } = useGetAttendanceWorker(creds?.company_id || 0);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  console.log(data);
  return (
    <div>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Pekerja</Table.Th>
            <Table.Th className="font-bold">Kelompok</Table.Th>
            <Table.Th className="font-bold">Sesi</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((worker: AttendanceWorkerType, index: number) => (
            <Table.Tr key={index}>
              <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
              <Table.Td>{worker?.employee?.name}</Table.Td>
              <Table.Td>{worker?.group_name}</Table.Td>
              <Table.Td>{worker?.session_name}</Table.Td>
              <Table.Td>{worker?.detail}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
