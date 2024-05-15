import { ActionIcon, Button, Input, Select, Table, UnstyledButton } from '@mantine/core';
import { IconInfoCircle, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../api';
import { EmployeeType } from '@/admin_features/types';

// Base URL API
const BaseURL = import.meta.env.VITE_API_URL;

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const navigate = useNavigate();

  // UseEffect for access API
  useEffect(() => {
    async function fetchEmployees() {
      const res = await getEmployees();
      setEmployees(res.data);
    }
    fetchEmployees();
  }, []);

  // Components
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar karyawan yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Karyawan
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
          <Select
            placeholder="Pilih Divisi"
            data={['Semua Divisi', 'IT Support', 'HRD', 'Finance']}
            defaultValue="Semua Divisi"
            allowDeselect={false}
          />
        </div>
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
      </section>
    </main>
  );
};
