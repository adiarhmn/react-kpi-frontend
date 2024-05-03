import { Button, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconPlus, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Employees = [
  {
    id: 1,
    name: 'Adi Aulia Rahman',
    schedule: [
      { date: new Date('2022-01-01'), day: 1, shift: 1, free: false },
      { date: new Date('2022-01-02'), day: 2, shift: 1, free: false },
      { date: new Date('2022-01-03'), day: 3, shift: 1, free: false },
      { date: new Date('2022-01-04'), day: 4, shift: 1, free: false },
      { date: new Date('2022-01-05'), day: 5, shift: 1, free: false },
      { date: new Date('2022-01-06'), day: 6, shift: 1, free: false },
      { date: new Date('2022-01-07'), day: 7, shift: 1, free: false },
      { date: new Date('2022-01-08'), day: 8, shift: 1, free: false },
      { date: new Date('2022-01-09'), day: 9, shift: 1, free: false },
      { date: new Date('2022-01-10'), day: 10, shift: 1, free: false },
      { date: new Date('2022-01-11'), day: 11, shift: 2, free: false },
      { date: new Date('2022-01-12'), day: 12, shift: 2, free: false },
      { date: new Date('2022-01-13'), day: 13, shift: 2, free: false },
      { date: new Date('2022-01-14'), day: 14, shift: 2, free: false },
      { date: new Date('2022-01-15'), day: 15, shift: 2, free: false },
      { date: new Date('2022-01-16'), day: 16, shift: 2, free: false },
      { date: new Date('2022-01-17'), day: 17, shift: 2, free: false },
      { date: new Date('2022-01-18'), day: 18, shift: 2, free: false },
      { date: new Date('2022-01-19'), day: 19, shift: 2, free: false },
      { date: new Date('2022-01-20'), day: 20, shift: 2, free: false },
      { date: new Date('2022-01-21'), day: 21, shift: 1, free: false },
      { date: new Date('2022-01-22'), day: 22, shift: 1, free: false },
      { date: new Date('2022-01-23'), day: 23, shift: 1, free: false },
      { date: new Date('2022-01-24'), day: 24, shift: 1, free: false },
      { date: new Date('2022-01-25'), day: 25, shift: 1, free: false },
      { date: new Date('2022-01-26'), day: 26, shift: 1, free: false },
      { date: new Date('2022-01-27'), day: 27, shift: 1, free: false },
      { date: new Date('2022-01-28'), day: 28, shift: 1, free: false },
      { date: new Date('2022-01-29'), day: 29, shift: 1, free: false },
      { date: new Date('2022-01-30'), day: 30, shift: 1, free: false },
      { date: new Date('2022-01-31'), day: 31, shift: 1, free: false },
    ],
  },
  {
    id: 2,
    name: 'Muhammad Budi',
    schedule: [
      { date: new Date('2022-01-01'), day: 1, shift: 1, free: false },
      { date: new Date('2022-01-02'), day: 2, shift: 1, free: false },
      { date: new Date('2022-01-03'), day: 3, shift: 1, free: false },
      { date: new Date('2022-01-04'), day: 4, shift: 1, free: false },
      { date: new Date('2022-01-05'), day: 5, shift: 1, free: false },
      { date: new Date('2022-01-06'), day: 6, shift: 1, free: false },
      { date: new Date('2022-01-07'), day: 7, shift: 1, free: false },
      { date: new Date('2022-01-08'), day: 8, shift: 1, free: false },
      { date: new Date('2022-01-09'), day: 9, shift: 1, free: false },
      { date: new Date('2022-01-10'), day: 10, shift: 1, free: false },
      { date: new Date('2022-01-11'), day: 11, shift: 2, free: false },
      { date: new Date('2022-01-12'), day: 12, shift: 2, free: false },
      { date: new Date('2022-01-13'), day: 13, shift: 2, free: false },
      { date: new Date('2022-01-14'), day: 14, shift: 2, free: false },
      { date: new Date('2022-01-15'), day: 15, shift: 2, free: false },
      { date: new Date('2022-01-16'), day: 16, shift: 2, free: false },
      { date: new Date('2022-01-17'), day: 17, shift: 2, free: false },
      { date: new Date('2022-01-18'), day: 18, shift: 2, free: false },
      { date: new Date('2022-01-19'), day: 19, shift: 2, free: false },
      { date: new Date('2022-01-20'), day: 20, shift: 2, free: false },
      { date: new Date('2022-01-21'), day: 21, shift: 1, free: false },
      { date: new Date('2022-01-22'), day: 22, shift: 1, free: false },
      { date: new Date('2022-01-23'), day: 23, shift: 1, free: false },
      { date: new Date('2022-01-24'), day: 24, shift: 1, free: false },
      { date: new Date('2022-01-25'), day: 25, shift: 1, free: false },
      { date: new Date('2022-01-26'), day: 26, shift: 1, free: false },
      { date: new Date('2022-01-27'), day: 27, shift: 1, free: false },
      { date: new Date('2022-01-28'), day: 28, shift: 1, free: false },
      { date: new Date('2022-01-29'), day: 29, shift: 1, free: false },
      { date: new Date('2022-01-30'), day: 30, shift: 1, free: false },
      { date: new Date('2022-01-31'), day: 31, shift: 1, free: false },
    ],
  },
];

const ScheduleEmployees = {
  month: '01',
  year: '2022',
  Employees: [
    {
      id: 1,
      name: 'Adi Aulia Rahman',
      schedule: [
        { date: new Date('2022-01-01'), day: 1, shift: 1, free: false },
        { date: new Date('2022-01-02'), day: 2, shift: 1, free: false },
        { date: new Date('2022-01-03'), day: 3, shift: 1, free: false },
        { date: new Date('2022-01-04'), day: 4, shift: 1, free: false },
        { date: new Date('2022-01-05'), day: 5, shift: 1, free: false },
        { date: new Date('2022-01-06'), day: 6, shift: 1, free: false },
        { date: new Date('2022-01-07'), day: 7, shift: 1, free: false },
        { date: new Date('2022-01-08'), day: 8, shift: 1, free: false },
        { date: new Date('2022-01-09'), day: 9, shift: 1, free: false },
        { date: new Date('2022-01-10'), day: 10, shift: 1, free: false },
        { date: new Date('2022-01-11'), day: 11, shift: 2, free: false },
        { date: new Date('2022-01-12'), day: 12, shift: 2, free: false },
        { date: new Date('2022-01-13'), day: 13, shift: 2, free: false },
        { date: new Date('2022-01-14'), day: 14, shift: 2, free: false },
        { date: new Date('2022-01-15'), day: 15, shift: 2, free: false },
        { date: new Date('2022-01-16'), day: 16, shift: 2, free: false },
        { date: new Date('2022-01-17'), day: 17, shift: 2, free: false },
        { date: new Date('2022-01-18'), day: 18, shift: 2, free: false },
        { date: new Date('2022-01-19'), day: 19, shift: 2, free: false },
        { date: new Date('2022-01-20'), day: 20, shift: 2, free: false },
        { date: new Date('2022-01-21'), day: 21, shift: 1, free: false },
        { date: new Date('2022-01-22'), day: 22, shift: 1, free: false },
        { date: new Date('2022-01-23'), day: 23, shift: 1, free: false },
        { date: new Date('2022-01-24'), day: 24, shift: 1, free: false },
        { date: new Date('2022-01-25'), day: 25, shift: 1, free: false },
        { date: new Date('2022-01-26'), day: 26, shift: 1, free: false },
        { date: new Date('2022-01-27'), day: 27, shift: 1, free: false },
        { date: new Date('2022-01-28'), day: 28, shift: 1, free: false },
        { date: new Date('2022-01-29'), day: 29, shift: 1, free: false },
        { date: new Date('2022-01-30'), day: 30, shift: 1, free: false },
        { date: new Date('2022-01-31'), day: 31, shift: 1, free: false },
      ],
    },
    {
      id: 2,
      name: 'Muhammad Budi',
      schedule: [
        { date: new Date('2022-01-01'), day: 1, shift: 1, free: false },
        { date: new Date('2022-01-02'), day: 2, shift: 1, free: false },
        { date: new Date('2022-01-03'), day: 3, shift: 1, free: false },
        { date: new Date('2022-01-04'), day: 4, shift: 1, free: false },
        { date: new Date('2022-01-05'), day: 5, shift: 1, free: false },
        { date: new Date('2022-01-06'), day: 6, shift: 1, free: false },
        { date: new Date('2022-01-07'), day: 7, shift: 1, free: false },
        { date: new Date('2022-01-08'), day: 8, shift: 1, free: false },
        { date: new Date('2022-01-09'), day: 9, shift: 1, free: false },
        { date: new Date('2022-01-10'), day: 10, shift: 1, free: false },
        { date: new Date('2022-01-11'), day: 11, shift: 2, free: false },
        { date: new Date('2022-01-12'), day: 12, shift: 2, free: false },
        { date: new Date('2022-01-13'), day: 13, shift: 2, free: false },
        { date: new Date('2022-01-14'), day: 14, shift: 2, free: false },
        { date: new Date('2022-01-15'), day: 15, shift: 2, free: false },
        { date: new Date('2022-01-16'), day: 16, shift: 2, free: false },
        { date: new Date('2022-01-17'), day: 17, shift: 2, free: false },
        { date: new Date('2022-01-18'), day: 18, shift: 2, free: false },
        { date: new Date('2022-01-19'), day: 19, shift: 2, free: false },
        { date: new Date('2022-01-20'), day: 20, shift: 2, free: false },
        { date: new Date('2022-01-21'), day: 21, shift: 1, free: false },
        { date: new Date('2022-01-22'), day: 22, shift: 1, free: false },
        { date: new Date('2022-01-23'), day: 23, shift: 1, free: false },
        { date: new Date('2022-01-24'), day: 24, shift: 1, free: false },
        { date: new Date('2022-01-25'), day: 25, shift: 1, free: false },
        { date: new Date('2022-01-26'), day: 26, shift: 1, free: false },
        { date: new Date('2022-01-27'), day: 27, shift: 1, free: false },
        { date: new Date('2022-01-28'), day: 28, shift: 1, free: false },
        { date: new Date('2022-01-29'), day: 29, shift: 1, free: false },
        { date: new Date('2022-01-30'), day: 30, shift: 1, free: false },
        { date: new Date('2022-01-31'), day: 31, shift: 1, free: false },
      ],
    },
  ],
};

export const Schedule: React.FC = () => {
  const [employees, setEmployees] = useState(Employees);
  const [FreeDays, setFreeDay] = useState(false);
  const navigate = useNavigate();
  const [month, setMonth] = useState<Date | null>(new Date('2022-01-01'));
  
  return (
    <main>
      {/* Header */}
      <section className="bg-white p-2 px-4 rounded-lg shadow-lg mb-4 flex justify-between">
        <div>
          <h1 className="font-semibold">Jadwal : Juni 2024</h1>
          <div className="text-xs -mt-1 text-slate-500">
            Berikut Data Jadwal pada bulan Juni 2024
          </div>
        </div>
        <Button onClick={() => navigate('/schedule/create')} leftSection={<IconPlus size={15} />}>
          Tambah Data
        </Button>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-3">
        <div className="mb-3 flex gap-2 justify-between flex-wrap">
          <div>
            <MonthPickerInput
              className="w-56"
              placeholder="Pilih Bulan"
              value={month}
              onChange={setMonth}
            ></MonthPickerInput>
          </div>
          <div className="flex gap-2">
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
        </div>
        <div
          className="absolute bg-black opacity-50 top-0 left-0 w-full h-screen"
          style={{ zIndex: FreeDays ? 999 : 1, display: FreeDays ? '' : 'none' }}
        ></div>
        <div className="relative bg-white overflow-x-auto" style={{ zIndex: FreeDays ? 9999 : 1 }}>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className='sticky left-0 bg-white'>
                  {' '}
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {Array.from({ length: 31 }).map((_, index) => (
                  <Table.Th key={index}>{index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Employees.map((employee, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  <Table.Td className='sticky left-0 bg-white'>{employee.name}</Table.Td>
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
