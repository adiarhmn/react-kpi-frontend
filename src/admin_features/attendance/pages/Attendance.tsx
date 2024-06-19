/* eslint-disable linebreak-style */
import { Badge, Button, Table } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScheduleAttendanceType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetAttendance } from '../api';

export const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const [date, setDate] = useState<Date>(new Date());

  const { data: DataAttendances, isLoading: LoadingGetAttendance } = useGetAttendance(
    formatDateToString(date.toString()),
    creds?.company_id
  );

  if (LoadingGetAttendance) return <div>Loading...</div>;
  console.log(DataAttendances);
  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <div className="grid lg:grid-cols-2 mb-5">
          <div className="mb-2">
            <div>
              <h1 className="font-semibold">Presensi Karyawan</h1>
              <div className="-mt-1 text-xs text-slate-400 mb-2">
                Berikut data presensi karyawan
              </div>
            </div>
            <DatePickerInput
              className="max-w-56"
              placeholder="Pick date"
              value={date}
              onChange={(value) => setDate(value as Date)}
            />
          </div>
          <div>
            <Button
              className="border-2 shadow-lg lg:max-w-40 lg:float-end"
              rightSection={<IconArrowUpRight size={14} />}
            >
              Download PDF
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-semibold">Nama</Table.Th>
                <Table.Th className="font-semibold">Status Kehadiran</Table.Th>
                <Table.Th className="font-semibold">Keterangan</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {DataAttendances?.map((item: ScheduleAttendanceType) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.employee_schedule.employee.name}</Table.Td>
                  <Table.Td className="uppercase">
                    {item.Attendance.length > 0 ? 'Hadir' : item.attendance_status}
                  </Table.Td>
                  <Table.Td>
                    {item.Attendance.length > 0 ? (
                      <Badge color={item.Attendance[0].status == 'present' ? 'green' : 'red'}>
                        {item.Attendance[0].status}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
