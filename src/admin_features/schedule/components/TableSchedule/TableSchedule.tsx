import { MonthPickerInput } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSchedule } from '../../api/getSchedule';
import { Button, Table } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

type TableScheduleProps = {
  month: Date;
  setMonth: (month: Date) => void;
};

export const TableSchedule: React.FC<TableScheduleProps> = ({ month, setMonth }) => {
  const [FreeDays, setFreeDay] = useState(false);
  const [dataSchedule, setDataSchedule] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading } = useGetSchedule(month.getMonth() + 1, month.getFullYear());
  useEffect(() => {
    if (data) {
      setDataSchedule(data.data);
    }
  }, [data]);

  return (
    <section className="bg-white rounded-lg shadow-lg p-3">
      <div className="mb-3 flex gap-2 justify-between flex-wrap">
        <MonthPickerInput
          className="w-56"
          placeholder="Pilih Bulan"
          value={month}
          onChange={(value) => {
            if (value === null) {
              setMonth(new Date());
            } else {
              setMonth(value);
            }
          }}
        ></MonthPickerInput>
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
      {dataSchedule.length > 0 && (
        <div
          className="relative bg-white overflow-x-auto border border-slate-300"
          style={{ zIndex: FreeDays ? 9999 : 1 }}
        >
          <Table withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="sticky left-0 bg-white">
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </Table.Th>
                {Array.from({ length: data?.data[0]?.Schedules.length }).map((_, index) => (
                  <Table.Th key={index}>Hari {index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {dataSchedule.map((item: any, indexnumber: number) => (
                <Table.Tr key={indexnumber}>
                  <Table.Td className="sticky left-0 bg-white">{item.employee.name}</Table.Td>
                  {item?.Schedules.map((schedule: any, colIndex: number) => (
                    <Table.Td
                      key={colIndex}
                      onClick={() => {
                        // if (FreeDays) {
                        //   const newEmployees = [...employees];
                        //   newEmployees[rowIndex].schedule[colIndex].free =
                        //     !newEmployees[rowIndex].schedule[colIndex].free;
                        //   setEmployees(newEmployees);
                        // }
                      }}
                      className={schedule.status == 'off' ? 'bg-red-600 text-white' : ''}
                    >
                      {schedule.status == 'off' ? '-' : schedule.shift_id}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      )}

      {dataSchedule.length === 0 && (
        <div className="text-center text-slate-400 my-20">Tidak ada jadwal yang tersedia</div>
      )}
    </section>
  );
};
