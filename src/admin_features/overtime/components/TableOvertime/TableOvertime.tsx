import { ActionIcon, Table } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetOvertime } from '../../api';

interface TableOvertimeProps {
  month: Date;
}
export const TableOvertime: React.FC<TableOvertimeProps> = ({ month }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const { data, isLoading, error } = useGetOvertime(month.getMonth() + 1, month.getFullYear());
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="font-bold">No</Table.Th>
          <Table.Th className="font-bold">Nama Karyawan</Table.Th>
          <Table.Th className="font-bold">Keterangan</Table.Th>
          <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.data.map((item: any, index: number) => {
          return (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item?.attendance.employee.name}</Table.Td>
              <Table.Td>{item?.detail}</Table.Td>
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
  );
};
