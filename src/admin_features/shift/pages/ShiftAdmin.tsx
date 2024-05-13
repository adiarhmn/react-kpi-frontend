import { ActionIcon, Button, Table } from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShift } from '../api';

export const ShiftAdmin: React.FC = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchShifts() {
      const res = await getShift();
      console.log(res);
      setShifts(res.data);
    }
    fetchShifts();
  }, []);

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
                <Table.Th className='font-bold'>Nama Shift</Table.Th>
                <Table.Th className='font-bold'>Mulai</Table.Th>
                <Table.Th className='font-bold'>Selesai</Table.Th>
                <Table.Th className='font-bold'>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {
                shifts.map((shift, index) => {
                  return(
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
                })
              }
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
