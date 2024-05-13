import { ActionIcon, Button, Input, Select, Table, UnstyledButton } from '@mantine/core';
import { IconInfoCircle, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Users: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Users</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar user atau pengguna yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah User
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
          <Select
            placeholder="Pilih Role"
            data={['Semua Role', 'Admin', 'Superadmin', 'Employee']}
            defaultValue="Semua Role"
            allowDeselect={false}
          />
        </div>
        <div className="mt-7">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold">Username</Table.Th>
                <Table.Th className="font-bold">Role</Table.Th>
                <Table.Th className="font-bold">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Adi Aulia Rahman</Table.Td>
                <Table.Td>Role</Table.Td>
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
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
