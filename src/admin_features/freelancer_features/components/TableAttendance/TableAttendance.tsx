import { Table } from '@mantine/core';

export const TableAttendance: React.FC = () => {
  return (
    <div>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Pekerja</Table.Th>
            <Table.Th className="font-bold">Kelompok</Table.Th>
            <Table.Th className="font-bold">Sesi</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td style={{ width: 70, textAlign: 'center' }}>1</Table.Td>
            <Table.Td>Sunjano</Table.Td>
            <Table.Td>Kelompok 1</Table.Td>
            <Table.Td>Sesi 1 - Bekerja</Table.Td>
            <Table.Td>Hadir</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  );
};
