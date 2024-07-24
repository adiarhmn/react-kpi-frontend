import { ActionIcon, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { SessionType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetSession } from '../../api';

export const TableSession: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  const { data, isLoading, isError } = useGetSession(creds?.company_id || 0);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-80 flex justify-center items-center">Data Sesi Tidak Ditemukan</div>
      ) : (
        <div>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                  No
                </Table.Th>
                <Table.Th className="font-bold">Nama Sesi</Table.Th>
                <Table.Th className="flex gap-2 items-center justify-center font-bold">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((session: SessionType, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td style={{ width: 70, textAlign: 'center' }}>1</Table.Td>
                  <Table.Td>{session?.name}</Table.Td>
                  <Table.Td className="flex gap-2 items-center justify-center">
                    <ActionIcon color="yellow">
                      <IconPencil size={14} />
                    </ActionIcon>
                    <ActionIcon color="red">
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
