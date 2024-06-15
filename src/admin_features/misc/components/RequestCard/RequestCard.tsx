import { Table, UnstyledButton } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useGetAttendanceReq } from '@/admin_features/attendance/api';
import { useGetRequest } from '@/admin_features/permission/api';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

interface ResquestCardProps {
  typeRequest: string;
}
export const RequestCard: React.FC<ResquestCardProps> = ({ typeRequest }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const date = formatDateToString(new Date().toDateString());

  console.log(date);

  const typeReq = typeRequest === 'Semua Pengajuan' ? undefined : typeRequest;
  const { data: DataRequest, isLoading: LoadRequest } = useGetRequest(
    typeReq,
    date,
    creds?.company_id
  );

  const { data: AttendanceReq, isLoading: LoadAttendance } = useGetAttendanceReq(
    date,
    creds?.company_id
  );

  if (LoadRequest || LoadAttendance) return <div>Loading...</div>;
  console.log('DataRequest -->', AttendanceReq);
  return (
    <div>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Tanggal</Table.Th>
            <Table.Th>Jenis</Table.Th>
            <Table.Th>Keterangan</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {typeReq == 'Cuti' || typeReq == 'Izin' || typeReq == 'Sakit'
            ? DataRequest.map((request: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{request.employee.name}</Table.Td>
                  <Table.Td>{formatDateToString(request.created_at)}</Table.Td>
                  <Table.Td>{typeReq}</Table.Td>
                  <Table.Td>{request.description}</Table.Td>
                  <Table.Td>{request.status}</Table.Td>
                  <Table.Td className="text-center">
                    <UnstyledButton>
                      <IconEye size={20} className="text-blue-600" />
                    </UnstyledButton>
                  </Table.Td>
                </Table.Tr>
              ))
            : ''}

          {typeReq == 'Absensi'
            ? AttendanceReq.map((request: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{request.employee.name}</Table.Td>
                  <Table.Td>{formatDateToString(request.date)}</Table.Td>
                  <Table.Td>{typeReq}</Table.Td>
                  <Table.Td>{request.reason}</Table.Td>
                  <Table.Td>{request.status}</Table.Td>
                  <Table.Td className="text-center">
                    <UnstyledButton>
                      <IconEye size={20} className="text-blue-600" />
                    </UnstyledButton>
                  </Table.Td>
                </Table.Tr>
              ))
            : ''}
        </Table.Tbody>
      </Table>
    </div>
  );
};
