import { ActionIcon, Loader, Table } from '@mantine/core';
import { useGetShift } from '../../api';
import { ShiftType } from '@/admin_features/types';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const TableShift: React.FC = () => {
  const [shifts, setShifts] = useState<ShiftType[]>([]); // [1
  const { data: DataShift, error: errorShift, isLoading: loadingShift } = useGetShift();

  useEffect(() => {
    if (DataShift) {
      setShifts(DataShift.data);
    }
  }, [DataShift]);

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
            <Table.Th className="font-bold">Mulai</Table.Th>
            <Table.Th className="font-bold">Selesai</Table.Th>
            <Table.Th className="font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shifts.map((shift: ShiftType, index: number) => {
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
  );
};
