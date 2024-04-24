import { Button, Table } from '@mantine/core';
import { IconPlus, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Employees = [
  {
    id: 1,
    name: 'Adi Aulia Rahman',
    schedule: [
      { day: 1, shift: 1, free: false },
      { day: 2, shift: 1, free: false },
      { day: 3, shift: 1, free: false },
      { day: 4, shift: 1, free: false },
      { day: 5, shift: 1, free: true },
      { day: 6, shift: 1, free: false },
      { day: 7, shift: 1, free: false },
      { day: 8, shift: 1, free: false },
      { day: 9, shift: 1, free: false },
      { day: 10, shift: 1, free: false },
    ],
  },
  {
    id: 2,
    name: 'Muhammad Budi',
    schedule: [
      { day: 1, shift: 2, free: false },
      { day: 2, shift: 2, free: false },
      { day: 3, shift: 2, free: false },
      { day: 4, shift: 2, free: false },
      { day: 5, shift: 2, free: false },
      { day: 6, shift: 1, free: false },
      { day: 7, shift: 1, free: false },
      { day: 8, shift: 1, free: false },
      { day: 9, shift: 1, free: false },
      { day: 10, shift: 1, free: false },
    ],
  },
];

export const Schedule: React.FC = () => {
  const [employees, setEmployees] = useState(Employees);
  const [FreeDays, setFreeDay] = useState(false);
  const navigate = useNavigate();
  return (
    <main>
      {/* Header */}
      <section className="bg-white p-2 px-4 rounded-lg shadow-lg mb-4 flex justify-between">
        <h1 className="font-bold">Jadwal 2024</h1>
        <Button onClick={() => navigate('/schedule/create')} leftSection={<IconPlus size={15} />}>
          Buat Jadwal
        </Button>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-3">
        <div className="mb-3 flex gap-2 justify-end">
          <Button leftSection={<IconSettings size={15} />}> Atur Jadwal</Button>
          <Button
            onClick={() => {
              setFreeDay(!FreeDays);
            }}
            style={{ zIndex: FreeDays ? 9999 : 1, position: 'relative' }}
            leftSection={<IconSettings size={15} />}
          >
            {FreeDays ? 'Done' : 'Atur Libur'}
          </Button>
        </div>
        <div
          className="absolute bg-black opacity-50 top-0 left-0 w-full h-screen"
          style={{ zIndex:  FreeDays ? 999 : 1, display: FreeDays ? '' : 'none' }}
        ></div>
        <div className="relative bg-white" style={{ zIndex:  FreeDays ? 9999 : 1 }}>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  {' '}
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Table.Th key={index}>{index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Employees.map((employee, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  <Table.Td>{employee.name}</Table.Td>
                  {employee.schedule.map((schedule, colIndex) => (
                    <Table.Td
                      key={colIndex}
                      onClick={() => {
                        if (FreeDays) {
                          const newEmployees = [...employees];
                          newEmployees[rowIndex].schedule[colIndex].free =
                            !newEmployees[rowIndex].schedule[colIndex].free;
                          setEmployees(newEmployees);
                        }
                      }}
                      className={schedule.free ? 'bg-red-600 text-white' : ''}
                    >
                      {schedule.free ? '-' : schedule.shift}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
