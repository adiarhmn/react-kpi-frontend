import { Button, Table } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetAttendance } from '../api';

export const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');
  const DateNow = new Date();

  const { data: DataAttendances, isLoading: LoadingGetAttendance } = useGetAttendance(
    formatDateToString(DateNow.toString()),
    creds?.company_id
  );

  useEffect(() => {
    console.log(DataAttendances);
  }, [DataAttendances]);

  if (LoadingGetAttendance) return <div>Loading...</div>;
  console.log(DataAttendances);
  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <div className="grid lg:grid-cols-2">
          <div>
            <h1 className="font-semibold">Presensi Karyawan</h1>
            <div className="-mt-1 text-xs text-slate-400 mb-2">Berikut data presensi karyawan</div>
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
                {/* <Table.Th className="font-semibold">Check In</Table.Th>
                <Table.Th className="font-semibold">Check Out</Table.Th>
                <Table.Th className="font-semibold">Shift</Table.Th> */}
                <Table.Th className="font-semibold">Status Kehadiran</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {DataAttendances?.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.employee_schedule.employee.name}</Table.Td>
                  {/* <Table.Td>
                    {new Date(item?.check_in).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Table.Td>
                  <Table.Td>
                    {new Date(item?.check_out).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Table.Td>
                  <Table.Td>{item.shift_in + '-' + item.shift_out}</Table.Td> */}
                  <Table.Td>{item.attendance_status}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
