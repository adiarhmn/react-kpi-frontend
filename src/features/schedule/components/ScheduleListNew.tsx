import { Table } from '@mantine/core';
import { useEffect, useState } from 'react';

import { ScheduleType } from '@/features/attendance';
import { formatterDate } from '@/features/history';

import { useGetScheduleMonthly } from '../api';

type ScheduleProps = {
  month: Date;
  shift: string;
  status: string;
  modalState: boolean;
  employee_id: number | string | undefined;
};

export const ScheduleListNew: React.FC<ScheduleProps> = ({
  month,
  shift,
  status,
  modalState,
  employee_id,
}: ScheduleProps) => {
  // const { creds } = useAuth();
  const [schedules, setSchedule] = useState<ScheduleType[]>([]);
  const [params, setParams] = useState({
    employeeId: employee_id,
    month: month.getMonth() + 1,
    year: month.getFullYear(),
    shift,
    status,
  });

  const { data } = useGetScheduleMonthly(
    params.employeeId,
    params.month,
    params.year,
    params.shift,
    params.status
  );

  useEffect(() => {
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  useEffect(() => {
    const newParams = {
      employeeId: employee_id,
      month: month.getMonth() + 1,
      year: month.getFullYear(),
      shift,
      status,
    };
    setParams(newParams);
  }, [modalState, month]);

  console.log(employee_id);
  const rows = schedules.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{formatterDate(element.date, 'dd MMMM')}</Table.Td>
      <Table.Td>{element.shift.shift_code}</Table.Td>
      <Table.Td>{element.shift.shift_name}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));
  console.log('Data schedule :', schedules);
  return (
    <>
      {schedules.length > 0 ? (
        <Table className="text-center" striped stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr className="text-center">
              <Table.Th className="font-bold">Tanggal</Table.Th>
              <Table.Th className="font-bold text-center">Kode</Table.Th>
              <Table.Th className="font-bold text-center">Shift</Table.Th>
              <Table.Th className="font-bold text-center">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          {/* <Table.Caption>Scroll page to see sticky thead</Table.Caption> */}
        </Table>
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center">
            <img
              className="w-40 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt="Tidak ada data"
            />
            <span className="font-bold text-slate-400 text-xl">Belum ada data jadwal</span>
          </section>
        </div>
      )}
    </>
  );
};
