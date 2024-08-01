/* eslint-disable linebreak-style */
import { ActionIcon, Button, Table, UnstyledButton, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAttendanceReq } from '@/admin_features/attendance/api';
import { useGetOvertime } from '@/admin_features/overtime';
import { useGetRequest, usePutRequest } from '@/admin_features/permission/api';
import { RequestsType } from '@/admin_features/types';
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
  const MutationUpdateRequest = usePutRequest();
  const [opened, { open, close }] = useDisclosure(false);
  const [DataRequest, setDataRequest] = useState<RequestsType>();

  const typeReq = typeRequest === 'Semua Pengajuan' ? undefined : typeRequest;
  const {
    data: DataRequestList,
    isLoading: LoadRequest,
    refetch,
  } = useGetRequest(undefined, undefined, creds?.company_id, 'Belum Disetujui');

  const { data: AttendanceReq, isLoading: LoadAttendance } = useGetAttendanceReq(
    date,
    creds?.company_id
  );

  const { data: DataOvertime, isLoading: loadOvertime } = useGetOvertime(creds?.company_id);

  const HandleUpdateRequest = async () => {
    if (!DataRequest) return;

    const DataPut = {
      ...DataRequest,
      status: 'Disetujui',
    };

    await MutationUpdateRequest.mutateAsync(DataPut, {
      onSuccess: () => {
        refetch();
      },
    });
    close();
  };

  if (LoadRequest || LoadAttendance || loadOvertime) return <div>Loading...</div>;
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
          {typeReq == 'Cuti' || typeReq == 'Izin' || (typeReq == 'Sakit' && DataRequestList > 0)
            ? DataRequestList?.map((request: any, index: number) => (
                <Table.Tr key={index} className="text-xxs">
                  <Table.Td>{request.employee.name}</Table.Td>
                  <Table.Td>{formatDateToString(request.created_at)}</Table.Td>
                  <Table.Td>{typeReq}</Table.Td>
                  <Table.Td>{request.description}</Table.Td>
                  <Table.Td>{request.status}</Table.Td>
                  <Table.Td className="text-center">
                    <ActionIcon
                      onClick={() => {
                        setDataRequest(request);
                        open();
                      }}
                      color="green"
                      disabled={request.status == 'Belum Disetujui' ? false : true}
                    >
                      <IconCheck size={14} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))
            : ''}

          {/* APROVAL UNTUK ABSENSI DAN LEMBUR */}
          {typeReq == 'Absensi'
            ? AttendanceReq?.map((request: any, index: number) => (
                <Table.Tr key={index} className="text-xxs">
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

          {typeReq == 'Lembur'
            ? DataOvertime?.data.map((request: any, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{request.attendance.employee.name}</Table.Td>
                  <Table.Td>{formatDateToString(request.start_time)}</Table.Td>
                  <Table.Td>{typeReq}</Table.Td>
                  <Table.Td>{request.detail}</Table.Td>
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

      <Modal opened={opened} onClose={close} title="Konfirmasi">
        <div>
          <p className="text-sm font-semibold">Apakah anda yakin ingin menyetujui pengajuan :</p>
          <table className="text-sm">
            <tbody>
              <tr>
                <td>Nama Karyawan</td>
                <td className="w-5 text-center">:</td>
                <td>{DataRequest?.employee.name}</td>
              </tr>
              <tr>
                <td>Keterangan</td>
                <td className="w-5 text-center">:</td>
                <td>{DataRequest?.description}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-2 justify-end mt-4">
            <Button color="green" onClick={HandleUpdateRequest}>
              Ya
            </Button>
            <Button color="red" onClick={close}>
              Tidak
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
