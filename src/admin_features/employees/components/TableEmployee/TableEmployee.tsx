/* eslint-disable linebreak-style */
import { ActionIcon, Button, Indicator, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconMapPin, IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetEmployees } from '../../api';
import { useDeleteEmployee } from '../../api/deleteEmployee';

import { ModalEmployeeLocation } from './ModalEmployeeLocation';

interface TableEmployeeProps {
  division_id: number;
}
export const TableEmployee: React.FC<TableEmployeeProps> = ({ division_id }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMap, { open: MapOpen, close: MapClose }] = useDisclosure(false);
  const [employeePick, setEmployeePick] = useState<EmployeeType>();
  const mutationDeleteEmployee = useDeleteEmployee();
  const { data, error, isLoading } = useGetEmployees(creds?.company_id, division_id);

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
    setEmployeePick(Employee);
    open();
  };

  const handleClickMap = (employee: EmployeeType) => {
    setEmployeePick(employee);
    MapOpen();
  };

  const confirmDeleteDivision = async () => {
    if (employeePick) {
      deleteEmployee(employeePick?.id);
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

  // Edit Employee
  const editEmployee = (employee: EmployeeType) => {
    navigate(`/employees/update`, { state: { employee } });
  };

  // Pagination Features
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Hitung jumlah total halaman [(❁´◡`❁)]
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Mendapatkan employees untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

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

  console.log('Current Items', currentItems);
  console.log('Curent Page', currentPage);
  return (
    <div className="mt-7">
      <Table withColumnBorders withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">No</Table.Th>
            <Table.Th className="font-bold">Nama</Table.Th>
            <Table.Th className="font-bold">Divisi</Table.Th>
            <Table.Th className="font-bold">Username</Table.Th>
            <Table.Th className="font-bold">Role</Table.Th>
            <Table.Th className="font-bold">Aksi</Table.Th>
            <Table.Th className="font-bold">
              <div className="text-center font-bold">Detail</div>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {currentItems.map((employee, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{indexOfFirstItem + index + 1}</Table.Td>
                <Table.Td>{employee?.name}</Table.Td>
                <Table.Td>{employee?.division.division_name}</Table.Td>
                <Table.Td>{employee?.user.username}</Table.Td>
                <Table.Td>{employee?.user.role}</Table.Td>
                <Table.Td>
                  <div className="flex gap-2 items-center justify-center pt-1">
                    <ActionIcon onClick={() => editEmployee(employee)} color="yellow">
                      <IconPencil size={14} />
                    </ActionIcon>
                    <ActionIcon onClick={() => openDeleteModal(employee)} color="red">
                      <IconTrash size={14} />
                    </ActionIcon>
                    <Indicator
                      processing={employee.EmployeeLocation.length < 1}
                      label={
                        <div style={{ paddingTop: 2 }}>{employee.EmployeeLocation.length}</div>
                      }
                      color={employee.EmployeeLocation.length < 1 ? 'red' : 'blue'}
                      size={14}
                    >
                      <ActionIcon onClick={() => handleClickMap(employee)} color="green">
                        <IconMapPin size={14} />
                      </ActionIcon>
                    </Indicator>
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="text-center">
                    <Button
                      rightSection={<IconChevronRight size={14} />}
                      onClick={() => navigate(`/employees/detail/${employee.id}`)}
                      color="blue"
                      size="xs"
                    >
                      Detail
                    </Button>
                  </div>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      {/* WKWK */}
      <section className="flex justify-between mt-3">
        <div>
          <span className="text-xs text-gray-500">
            Menampilkan {indexOfFirstItem + 1} - {indexOfLastItem} dari {employees.length} data
          </span>
        </div>
        <div className="flex gap-2">
          {/* Render tombol pagination */}
          {/* Next and Back */}
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            color="blue"
            variant="outline"
            size="xs"
          >
            Back
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            color="blue"
            variant="outline"
            size="xs"
          >
            Next
          </Button>
        </div>
      </section>

      {/* Delete Employee */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Yakin hapus karyawan </span>
          <span className="font-semibold text-blue-600"> {employeePick?.name}</span>
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

      {/* Modal Add Location */}
      <ModalEmployeeLocation
        opened={openedMap}
        close={MapClose}
        open={MapOpen}
        employee={employeePick}
      />
    </div>
  );
};
