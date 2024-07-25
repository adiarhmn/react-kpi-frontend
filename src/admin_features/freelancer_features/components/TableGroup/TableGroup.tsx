import { ActionIcon, Button, Table } from '@mantine/core';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetGroup } from '../../api';

export const TableGroup: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const { data, isLoading, isError } = useGetGroup(creds?.company_id || 0);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  console.log('Data Kelompok', data);
  return (
    <div>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Kelompok</Table.Th>
            <Table.Th className="font-bold">Jumlah Anggota</Table.Th>
            <Table.Th className="font-bold">Jumlah Sesi</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.length < 1 ? (
            <div className="h-64 flex justify-center items-center">
              Data Kelompok tidak ditemukan
            </div>
          ) : (
            <>
              {data?.map((group: GroupType, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                  <Table.Td>{group?.name}</Table.Td>
                  <Table.Td>{group?.EmployeeGroups.length} Orang</Table.Td>
                  <Table.Td>{group?.GroupSessions.length} Sesi</Table.Td>
                  <Table.Td className="flex gap-2 items-center justify-center">
                    <ActionIcon color="red">
                      <IconTrash size={14} />
                    </ActionIcon>
                    <Button size="xs" color="blue" leftSection={<IconEye size={14} />}>
                      Detail
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
};
