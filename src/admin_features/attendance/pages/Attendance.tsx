import { Table } from '@mantine/core';

const AttendanceData = {
  data: [
    {
      id: 1,
      check_in: '2024-04-24T14:55:41+07:00',
      check_out: '2024-04-24T14:57:44+07:00',
      shift_in: '12:00',
      shift_out: '23:00',
      status: 'late',
      employee_id: 3,
      employee: {
        id: 3,
        name: 'El Amat Ambatron',
        address: 'Tebing Siring',
        phone: '081272201112',
        status: true,
        user_id: 1,
        user: {
          id: 1,
          username: 'amat',
          password: '$2a$10$OiMcwwAIRr6A9hiU2URHhuDND8NHVEMpwRcLmE4NfzR.H2j1qNRYG',
          role: 'employee',
          status: true,
        },
        shift_id: 1,
        shift: {
          id: 1,
          shift_name: 'Siang',
          start_time: '12:00',
          end_time: '23:00',
          employees: null,
        },
        division_id: 1,
        division: {
          id: 1,
          division_name: 'Divisi Marketing',
          employees: null,
        },
      },
    },
    {
      id: 2,
      check_in: '2024-04-24T14:58:37+07:00',
      check_out: '0001-01-01T00:00:00Z',
      shift_in: '16:00',
      shift_out: '23:59',
      status: 'present',
      employee_id: 4,
      employee: {
        id: 4,
        name: 'El Agustian',
        address: 'Kurau',
        phone: '081272101112',
        status: true,
        user_id: 2,
        user: {
          id: 2,
          username: 'agus',
          password: '$2a$10$ekHFQ4gm8NYicfHuYeZ2fOH5DQsOZnp9se9LjkAbaCYkWn7lpaBpa',
          role: 'employee',
          status: true,
        },
        shift_id: 2,
        shift: {
          id: 2,
          shift_name: 'Malam',
          start_time: '16:00',
          end_time: '23:59',
          employees: null,
        },
        division_id: 3,
        division: {
          id: 3,
          division_name: 'Divisi Guild Petualang',
          employees: null,
        },
      },
    },
  ],
  status: '200',
};
export const Attendance: React.FC = () => {
  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-5">
        <h1 className="font-semibold">Presensi Karyawan</h1>
        <div className="-mt-1 text-xs text-slate-400 mb-2">Berikut data presensi karyawan</div>
        <div className="overflow-x-auto">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-semibold">Nama</Table.Th>
                <Table.Th className="font-semibold">Check In</Table.Th>
                <Table.Th className="font-semibold">Check Out</Table.Th>
                <Table.Th className="font-semibold">Shift</Table.Th>
                <Table.Th className="font-semibold">Status</Table.Th>
                <Table.Th className="font-semibold">Employee</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {AttendanceData?.data.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.employee.name}</Table.Td>
                  <Table.Td>
                    {new Date(item?.check_in).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Table.Td>
                  <Table.Td>{new Date(item?.check_out).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</Table.Td>
                  <Table.Td>{item.shift_in +"-"+ item.shift_out}</Table.Td>
                  <Table.Td>{item.status}</Table.Td>
                  <Table.Td>{item.employee?.name}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
