import { ActionIcon, Button, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OvertimeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { useGetOvertime, useUpdateOvertime } from '../../api';

interface TableOvertimeProps {
  month: Date;
}
export const TableOvertime: React.FC<TableOvertimeProps> = ({ month }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const [opened, { open, close }] = useDisclosure(false);
  const [DataOvertime, setDataOvertime] = useState<OvertimeType | undefined>(undefined);
  const mutationUpdateOvertime = useUpdateOvertime();
  const { data, isLoading, error, refetch } = useGetOvertime(
    creds?.company_id,
    month.getMonth() + 1,
    month.getFullYear()
  );

  const HandleUpdateOvertime = (status: string) => {
    if (!DataOvertime)
      return notifications.show({
        title: 'Error',
        message: 'Please Select Data Overtime',
        color: 'red',
      });

    const dataPost = {
      id: DataOvertime.id,
      status: status,
    };

    mutationUpdateOvertime.mutateAsync(dataPost, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'Success Update Overtime',
          color: 'green',
        });
        refetch();
        close();
      },
    });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">No</Table.Th>
            <Table.Th className="font-bold">Nama Karyawan</Table.Th>
            <Table.Th className="font-bold">Dibuat</Table.Th>
            <Table.Th className="font-bold">Keterangan</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data?.map((item: OvertimeType, index: number) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item?.attendance.employee.name}</Table.Td>
                <Table.Td>{formatDateToString(item?.start_time ?? '') || ''}</Table.Td>
                <Table.Td>{item?.detail}</Table.Td>
                <Table.Td>{item?.status}</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon
                    onClick={() => {
                      setDataOvertime(item);
                      open();
                    }}
                    disabled={item?.status == 'Disetujui'}
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
          <p className="text-sm font-semibold">Apakah anda yakin ingin menyetujui pengajuan :</p>
          <table className="text-sm">
            <tbody>
              <tr>
                <td>Nama Karyawan</td>
                <td className="w-5 text-center">:</td>
                <td>{DataOvertime?.attendance?.employee?.name}</td>
              </tr>
              <tr>
                <td>Keterangan</td>
                <td className="w-5 text-center">:</td>
                <td>{DataOvertime?.detail}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-2 justify-end mt-4">
            <Button color="red" onClick={() => HandleUpdateOvertime('Ditolak')}>
              Tolak
            </Button>
            <Button color="green" onClick={() => HandleUpdateOvertime('Disetujui')}>
              Terima
            </Button>
            <Button color="gray" onClick={close}>
              Tutup
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
