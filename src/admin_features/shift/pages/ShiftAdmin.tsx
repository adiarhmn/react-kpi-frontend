import { ActionIcon, Button, Loader, Table } from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useGetShift } from '../api';
import { ShiftType } from '@/admin_features/types';

export const ShiftAdmin: React.FC = () => {
  const { data, error, isLoading } = useGetShift();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  const dataShift: ShiftType[] = data?.data;

  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Shift</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar shift yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Shift
          </Button>
        </div>
        <div className="mt-3">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold">Nama Shift</Table.Th>
                <Table.Th className="font-bold">Mulai</Table.Th>
                <Table.Th className="font-bold">Selesai</Table.Th>
                <Table.Th className="font-bold">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataShift.map((shift, index) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{shift?.shift_name}</Table.Td>
                    <Table.Td>{shift?.start_time}</Table.Td>
                    <Table.Td>{shift?.end_time}</Table.Td>
                    <Table.Td>
                      <ActionIcon className="me-2" color="yellow">
                        <IconPencil size={14} />
                      </ActionIcon>
                      <ActionIcon className="me-2" color="red">
                        <IconTrash size={14} />
                      </ActionIcon>
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
