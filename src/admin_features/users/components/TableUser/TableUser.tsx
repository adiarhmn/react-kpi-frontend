/* eslint-disable linebreak-style */
import { ActionIcon, Badge, Button, Loader, Modal, Pagination, Select, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';
import { useGetUsers, useDeleteUser } from '@/admin_features/users/api';
import { useAuth } from '@/features/auth';

export const TableUser = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const [users, setUsers] = useState<UserType[]>([]);
  const { data, error, isLoading, refetch } = useGetUsers(creds?.company_id);
  const [UserData, setUserData] = useState<UserType>({
    id: 0,
    username: '',
    role: '',
    status: 1,
    password: '',
  });

  // Pagination Feature
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [opened, { open, close }] = useDisclosure(false);
  const mutationDeleteUser = useDeleteUser();

  // Fungsi Get User By Id
  const UpdateUser = (user: UserType) => {
    navigate('/users/update', { state: { user } });
  };

  // Fungsi Delete User
  const deleteUserModal = (user: UserType) => {
    setUserData(user);
    open();
  };
  const confirmDeleteUser = async () => {
    mutationDeleteUser.mutateAsync(UserData?.id, {
      onSuccess: () => {
        refetch();
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

  // Pagination Feature
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Mendapatkan employees untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-7">
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Username</Table.Th>
            <Table.Th className="font-bold">Role</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
            <Table.Th className="font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {currentItems.map((user, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{user?.username}</Table.Td>
                <Table.Td>{user?.role}</Table.Td>
                <Table.Td>
                  <div className="flex justify-center">
                    {user?.status ? <Badge>Aktif</Badge> : <Badge color="red">Nonaktif</Badge>}
                  </div>
                </Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon onClick={() => UpdateUser(user)} color="yellow">
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

      <section className="flex justify-between mt-3">
        <div className="flex items-center gap-4">
          {/* Selection */}
          <Select
            placeholder="5"
            data={['5', '10', '15', '25']}
            size="xs"
            style={{ width: 70 }}
            defaultValue={'5'}
            value={itemsPerPage.toString()}
            allowDeselect={false}
            onChange={(e) => {
              setItemsPerPage(Number(e));
              setCurrentPage(1);
            }}
          />
          <span className="text-xs text-gray-500">
            Menampilkan {indexOfFirstItem + 1} -{' '}
            {totalPages == currentPage ? users?.length : indexOfLastItem} dari {users?.length} data
          </span>
        </div>
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
          mt="sm"
          size="xs"
        />
      </section>

      {/* Modal Confirm for Delete Data */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        Yakin hapus user atau akun{' '}
        <span className="font-semibold text-blue-600">{UserData?.username}</span>
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
