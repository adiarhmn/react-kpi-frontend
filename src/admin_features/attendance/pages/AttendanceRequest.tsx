import { ActionIcon, Badge, Button, Modal, Table } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AttendanceReqType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetAttendanceReq } from '../api';
import { usePutAttendanceRequest } from '../api/updateAttendanceReq';

export const AttendanceRequest: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');

  const [date, setDate] = useState<Date>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, refetch } = useGetAttendanceReq(
    formatDateToString(date.toDateString()),
    creds?.company_id
  );
  const MutationUpdateRequest = usePutAttendanceRequest();

  const [DataRequest, setDataRequest] = useState<AttendanceReqType>();

  const HandleUpdateRequest = async (status: string) => {
    if (!DataRequest) return console.log('Data Request Not Found');

    const DataPut = {
      ...DataRequest,
      status: status,
    };

    await MutationUpdateRequest.mutateAsync(DataPut, {
      onSuccess: () => {
        console.log('Success');
        refetch();
      },
      onError: (error) => {
        console.log('Error :', error);
      },
    });
    close();
  };

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Pengajuan Absensi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar pengajuan absensi yang terdaftar pada sistem
            </div>
            <DatePickerInput
              className="max-w-56 mt-2"
              placeholder="Pick date"
              value={date}
              onChange={(value) => setDate(value as Date)}
            />
          </div>
        </div>
        <div className="mt-7">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-bold">No</Table.Th>
                <Table.Th className="font-bold">Nama</Table.Th>
                <Table.Th className="font-bold">Keterangan</Table.Th>
                <Table.Th className="font-bold">Status</Table.Th>
                <Table.Th className="flex gap-2 items-center justify-center font-bold">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item: AttendanceReqType, index: number) => {
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.employee.name}</Table.Td>
                    <Table.Td>{item.reason}</Table.Td>
                    <Table.Td>
                      {item.status == 'Belum Disetujui' ? (
                        'Menunggu Persetujuan'
                      ) : (
                        <Badge color={item?.status == 'Disetujui' ? 'green' : 'red'}>
                          {item.status}
                        </Badge>
                      )}
                    </Table.Td>
                    <Table.Td className="flex gap-2 items-center justify-center">
                      <ActionIcon
                        onClick={() => {
                          setDataRequest(item);
                          open();
                        }}
                        disabled={item?.status != 'Belum Disetujui'}
                        color="green"
                      >
                        <IconCheck size={14} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>

          <Modal opened={opened} onClose={close} title="Konfirmasi">
            <div>
              <p className="text-sm font-semibold">
                Apakah anda yakin ingin menyetujui pengajuan :
              </p>
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
                    <td>{DataRequest?.reason}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex gap-2 justify-end mt-4">
                <Button color="red" onClick={() => HandleUpdateRequest('Ditolak')}>
                  Tolak
                </Button>
                <Button color="green" onClick={() => HandleUpdateRequest('Disetujui')}>
                  Terima
                </Button>
                <Button color="gray" onClick={close}>
                  Tutup
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </main>
  );
};
