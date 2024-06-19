/* eslint-disable linebreak-style */
import { Loader, Table } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Companys, useAuth } from '@/features/auth';

import { useGetCompanys } from '../../api';

interface Props {
  successInsert?: boolean;
}

export const TableCompany: React.FC<Props> = ({ successInsert = false }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const { data, isLoading, isError, refetch } = useGetCompanys();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successInsert]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (isError) {
    return <div className="text-red-600 text-center my-20 font-bold">Gagal Mengambil Data</div>;
  }

  return (
    <>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Nama</Table.Th>
            <Table.Th className="font-bold">Company Logo</Table.Th>
            <Table.Th className="font-bold">Status Shift</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item: Companys, index: number) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.shift_active ? 'Active' : 'Nonactive'}</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center"></Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
};
