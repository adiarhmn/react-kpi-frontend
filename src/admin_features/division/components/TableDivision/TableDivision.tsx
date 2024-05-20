import { ActionIcon, Button, Loader, Modal, Table, UnstyledButton } from '@mantine/core';
import { IconInfoCircle, IconPencil, IconTrash } from '@tabler/icons-react';
import { useDeleteDivision, useGetDivisions } from '../../api';
import { DivisionType } from '@/admin_features/types';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

export const TableDivision = () => {
  const [division, setDivision] = useState<DivisionType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [divisionToDelete, setDivisionToDelete] = useState<DivisionType>();
  const { data, error, isLoading } = useGetDivisions();
  const deleteDivisionMutation = useDeleteDivision();

  // Fungsi Delete Division
  const deleteDivision = async (id: number) => {
    deleteDivisionMutation.mutateAsync(id);
    // Update Division Data
    const newDivision = division.filter((divisi) => divisi.id !== id);
    setDivision(newDivision);
  };
  const openDeleteModal = (division: DivisionType) => {
    setDivisionToDelete(division);
    console.log(divisionToDelete);
    open();
  };

  const confirmDeleteDivision = async () => {
    if (divisionToDelete) {
      deleteDivision(divisionToDelete.id);
      close();
    }
  };

  useEffect(() => {
    if (data) {
      setDivision(data);
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
    <>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Kode Divisi</Table.Th>
            <Table.Th className="font-bold">Nama Divisi</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {division.map((divisi, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{index}</Table.Td>
                <Table.Td>{divisi?.division_name}</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon color="yellow">
                    <IconPencil size={14} />
                  </ActionIcon>
                  <ActionIcon onClick={() => openDeleteModal(divisi)} color="red">
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
          <span>Yakin hapus user atau akun</span>
          <span className="font-semibold text-blue-600"> {divisionToDelete?.division_name}</span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteDivisionMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={confirmDeleteDivision}>Yakin</Button>
          )}

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </>
  );
};
