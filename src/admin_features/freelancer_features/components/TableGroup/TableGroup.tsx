import { ActionIcon, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export const TableGroup: React.FC = () => {
  return (
    <div>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Kelompok</Table.Th>
            <Table.Th className="font-bold">Jumlah Anggota</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td style={{ width: 70, textAlign: 'center' }}>1</Table.Td>
            <Table.Td>Kelompok 1 - Budidaya</Table.Td>
            <Table.Td>10 Orang</Table.Td>
            <Table.Td className="flex gap-2 items-center justify-center">
              <ActionIcon color="yellow">
                <IconPencil size={14} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size={14} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  );
};
