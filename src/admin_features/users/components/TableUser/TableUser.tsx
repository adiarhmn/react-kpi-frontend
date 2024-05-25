import { ActionIcon, Button, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { UserType } from '@/admin_features/types';
import { useGetUsers, useDeleteUser } from '@/admin_features/users/api';

export const TableUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { data, error, isLoading } = useGetUsers();
  const [userToDelete, setUserToDelete] = useState({ id: 0, username: '' });
  const [opened, { open, close }] = useDisclosure(false);
  const mutationDeleteUser = useDeleteUser();

  // Fungsi Delete User
  const deleteUserModal = (user: UserType) => {
    setUserToDelete(user);
    open();
  };
  const confirmDeleteUser = async () => {
    mutationDeleteUser.mutateAsync(userToDelete?.id, {
      onSuccess: (data) => {
        console.log('Success Delete:', data);
        const newUsers = users.filter((user) => user.id !== userToDelete?.id);
        setUsers(newUsers);
        close();

        notifications.show({
          message: 'Berhasil Menghapus Data',
          color: 'green',
        });
      },
    });
  };

  // Set Data Users
  useEffect(() => {
    if (data) {
      setUsers(data);
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
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

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
          <Button onClick={confirmDeleteUser} loading={mutationDeleteUser.isPending}>
            Yakin
          </Button>
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </div>
  );
};
