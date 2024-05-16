import {
  ActionIcon,
  Button,
  Input,
  Modal,
  Notification,
  Select,
  Table,
  UnstyledButton,
} from '@mantine/core';
import { IconInfoCircle, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsers } from '../api';
import axios from 'axios';
import { UserType } from '@/admin_features/types';
import { useDisclosure } from '@mantine/hooks';

// Base URL API
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  // Get Data User
  const navigate = useNavigate();
  
  // Fungsi Delete User
  const deleteUserModal = (user: UserType) => {
    setUserToDelete(user);
    open();
  };
  const confirmDeleteUser = async () => {
    try {
      const response = await axios.delete(`${BaseURL}/user/${userToDelete?.id}`);
      if (response.data.status == 200) {
        close();
        const newUsers = users.filter((user) => user.id !== userToDelete?.id);
        setUsers(newUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  // Fungsi Fetch Data User
  const { data, error, isLoading } = useGetUsers();

  // console.log(data);
  console.log(data);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
              {users.map((user, index) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{user?.username}</Table.Td>
                    <Table.Td>{user?.role}</Table.Td>
                    <Table.Td className="flex gap-2 items-center justify-center">
                      <ActionIcon color="yellow">
                        <IconPencil size={14} />
                      </ActionIcon>
                      <ActionIcon onClick={() => deleteUserModal(user)} color="red">
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

      {/* Modal Confirm for Delete Data */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        Yakin hapus user atau akun{' '}
        <span className="font-semibold text-blue-600">{userToDelete?.username}</span>
        <div className="pt-10 flex gap-2 justify-end">
          <Button onClick={confirmDeleteUser}>Yakin</Button>
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </main>
  );
};
