import { ActionIcon, Loader, Table, UnstyledButton } from '@mantine/core';
import { useGetEmployees } from '../../api';
import { useEffect, useState } from 'react';
import { EmployeeType } from '@/admin_features/types';
import { IconInfoCircle, IconPencil, IconTrash } from '@tabler/icons-react';

export const TableEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { data, error, isLoading } = useGetEmployees();

  // UseEffect for access API
  useEffect(() => {
    if (data) {
      console.log(data);
      setEmployees(data);
    }
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
    <div className="mt-7">
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Nama</Table.Th>
            <Table.Th className="font-bold">Alamat</Table.Th>
            <Table.Th className="font-bold">Divisi</Table.Th>
            <Table.Th className="font-bold">Username</Table.Th>
            <Table.Th className="font-bold">Role</Table.Th>
            <Table.Th className="font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {employees.map((employee, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{employee?.name}</Table.Td>
                <Table.Td>{employee?.address}</Table.Td>
                <Table.Td>{employee?.division.division_name}</Table.Td>
                <Table.Td>{employee?.user.username}</Table.Td>
                <Table.Td>{employee?.user.role}</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon color="yellow">
                    <IconPencil size={14} />
                  </ActionIcon>
                  <ActionIcon color="red">
                    <IconTrash size={14} />
                  </ActionIcon>
                  <UnstyledButton>
                    <IconInfoCircle className="text-blue-600" size={20} />
                  </UnstyledButton>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
};
