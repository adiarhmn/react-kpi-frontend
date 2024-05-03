import { ActionIcon, Button, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const ShiftAdmin: React.FC = () => {
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    // Akses API
    async function fetchShifts() {
      const res = await axios.get(`/shifts`);
      setShifts(res.data);
    }
  }, []);

  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-3">
        <div>
          <h1 className="font-semibold">Daftar Shift</h1>
          <div className="text-slate-400 text-xs -mt-1">Berikut daftar shift yang sudah terdaftar</div>
        </div>

        <div className="mt-3">
         <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nama Shift</Table.Th>
                <Table.Th>Mulai</Table.Th>
                <Table.Th>Selesai</Table.Th>
                <Table.Th>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Shift 1</Table.Td>
                <Table.Td>08:00</Table.Td>
                <Table.Td>16:00</Table.Td>
                <Table.Td>
                  <ActionIcon className='me-2' color="yellow"><IconPencil size={14}/></ActionIcon>
                  <ActionIcon className='me-2' color="red"><IconTrash size={14}/></ActionIcon>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
         </Table>
        </div>
      </section>
    </main>
  );
};
