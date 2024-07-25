import { ActionIcon, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { WorkersType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetWorkers } from '../../api';

export const TableFreelancer: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const { data, isLoading, isError } = useGetWorkers(creds?.company_id || 0);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-80 flex justify-center items-center">Data Pekerja Tidak Ditemukan</div>
      ) : (
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                No
              </Table.Th>
              <Table.Th className="font-bold">Nama Pekerja</Table.Th>
              <Table.Th className="font-bold">Kode Pekerja</Table.Th>
              <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.length < 1 ? (
              <div></div>
            ) : (
              <>
                {data?.map((worker: WorkersType, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td style={{ width: 70, textAlign: 'center' }}>1</Table.Td>
                    <Table.Td>{worker?.name}</Table.Td>
                    <Table.Td>{worker?.nip}</Table.Td>
                    <Table.Td className="flex gap-2 items-center justify-center">
                      <ActionIcon color="red">
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </>
            )}
          </Table.Tbody>
        </Table>
      )}
    </div>
  );
};
