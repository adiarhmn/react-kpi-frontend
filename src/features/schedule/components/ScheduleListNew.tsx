import { Table } from '@mantine/core';
import { useEffect, useState } from 'react';

import { ScheduleType } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';

import { useGetScheduleMonthly } from '../api';

type ScheduleProps = {
  month: Date;
  shift: string;
  status: string;
  modalState: boolean;
};

export const ScheduleListNew: React.FC<ScheduleProps> = ({ month, shift, status, modalState }) => {
  const { creds } = useAuth();
  const [schedules, setSchedule] = useState<ScheduleType[]>([]);
  const [params, setParams] = useState({
    employeeId: creds?.employee_id,
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
    // console.log('effect jalan');
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  useEffect(() => {
    // console.log('effect jalan');
    const newParams = {
      employeeId: creds?.employee_id,
      month: month.getMonth() + 1,
      year: month.getFullYear(),
      shift,
      status,
    };
    setParams(newParams);
  }, [modalState, month]);

  const elements = [schedules];

  console.log('data schedules : ', schedules);

  const rows = schedules.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{formatterDate(element.date, 'dd MMMM')}</Table.Td>
      <Table.Td>{element.shift.shift_code}</Table.Td>
      <Table.Td>{element.shift.shift_name}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));

  return (
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
  );
};
