import { ActionIcon, Loader, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RequestsType } from '@/admin_features/types';

import { useGetPermissions } from '../../api';

export const TablePermission = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPermissions();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }
  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="font-bold">Kode Divisi</Table.Th>
          <Table.Th className="font-bold">Nama Divisi</Table.Th>
          <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((request: RequestsType, index: number) => {
          return (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{request?.employee.name}</Table.Td>
              <Table.Td>{request?.description}</Table.Td>
              <Table.Td className="flex gap-2 items-center justify-center">
                <ActionIcon
                  onClick={() => {
                    navigate('/division/update');
                  }}
                  color="yellow"
                >
                  <IconPencil size={14} />
                </ActionIcon>
                <ActionIcon color="red">
                  <IconTrash size={14} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
