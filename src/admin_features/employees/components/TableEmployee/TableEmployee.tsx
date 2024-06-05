import { ActionIcon, Button, Loader, Modal, Table, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconInfoCircle, IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetEmployees } from '../../api';
import { useDeleteEmployee } from '../../api/deleteEmployee';

export const TableEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeType>();
  const mutationDeleteEmployee = useDeleteEmployee();
  const { data, error, isLoading } = useGetEmployees(creds?.company_id);

  // Fungsi Delete Division
  const deleteEmployee = async (id: number) => {
    mutationDeleteEmployee.mutateAsync(id, {
      onSuccess: (data) => {
        console.log('Success:', data);
        const newEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(newEmployees);
      },
    });
  };

  const openDeleteModal = (Employee: EmployeeType) => {
    setEmployeeToDelete(Employee);
    open();
  };

  const confirmDeleteDivision = async () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete?.id);
      close();
    }
  };

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
                  <ActionIcon onClick={() => openDeleteModal(employee)} color="red">
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

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Yakin hapus karyawan </span>
          <span className="font-semibold text-blue-600"> {employeeToDelete?.name}</span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          <Button onClick={confirmDeleteDivision} disabled={mutationDeleteEmployee.isPending}>
            {mutationDeleteEmployee.isPending ? 'Loading...' : 'Yakin'}
          </Button>

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </div>
  );
};
