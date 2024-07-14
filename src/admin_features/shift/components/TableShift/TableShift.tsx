import { ActionIcon, Badge, Button, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetShift, useUpdateShift } from '../../api';

export const TableShift: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const mutate = useUpdateShift();
  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const [deleteShift, setDeleteShift] = useState<ShiftType | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: DataShift,
    error: errorShift,
    isLoading: loadingShift,
  } = useGetShift(creds?.company_id);

  useEffect(() => {
    if (DataShift) {
      setShifts(DataShift.data);
    }
  }, [DataShift]);

  const confirmDelete = async () => {
    if (deleteShift) {
      await mutate.mutateAsync(
        { ...deleteShift, is_active: false },
        {
          onSuccess: () => {
            close();
            notifications.show({
              title: 'Berhasil',
              message: 'Shift berhasil Nonaktifkan',
              color: 'teal',
            });
          },
        }
      );
    }
  };

  if (loadingShift) {
    return (
      <div className="my-20 flex justify-center">
        <Loader />
      </div>
    );
  }
  if (errorShift) {
    return <div className="text-red-600 text-center my-20 font-bold">{errorShift.message}</div>;
  }

  return (
    <div className="mt-3">
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">Nama Shift</Table.Th>
            <Table.Th className="font-bold">Kode</Table.Th>
            <Table.Th className="font-bold">Mulai</Table.Th>
            <Table.Th className="font-bold">Selesai</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
            <Table.Th className="font-bold">Aksi</Table.Th>
            {/* <Table.Th className="font-bold">Aksi</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shifts.map((shift: ShiftType, index: number) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{shift?.shift_name}</Table.Td>
                <Table.Td>{shift?.shift_code}</Table.Td>
                <Table.Td>{shift?.start_time}</Table.Td>
                <Table.Td>{shift?.end_time}</Table.Td>
                <Table.Td>
                  {shift?.is_active ? (
                    <Badge color="teal">Aktif</Badge>
                  ) : (
                    <Badge color="red">Nonaktif</Badge>
                  )}
                </Table.Td>
                <Table.Td>
                  <div className="flex gap-2 items-center justify-center pt-1">
                    <ActionIcon
                      onClick={() => {
                        // serta mengirim state shift ke halaman update
                        navigate(`/shift/${shift.id}`, { state: { shift } });
                      }}
                      color="yellow"
                    >
                      <IconPencil size={14} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        setDeleteShift(shift);
                        open();
                      }}
                      color="red"
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </div>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      {/* Delete Employee */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div className="text-xs">
          <span>
            Yakin hapus shift{' '}
            <span className="font-semibold text-blue-600"> {deleteShift?.shift_name}</span>? (Ini
            Hanya Akan Menonaktifkan){' '}
          </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          <Button onClick={confirmDelete} loading={mutate.isPending}>
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
