import { ActionIcon, Button, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetRequest, usePutRequest } from '@/admin_features/permission/api';
import { RequestsType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

export const TableLeave = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, error, refetch } = useGetRequest('cuti', undefined, creds?.company_id);
  const [DataRequest, setDataRequest] = useState<RequestsType>();
  const MutationUpdateRequest = usePutRequest();

  const HandleUpdateRequest = async (status: string) => {
    if (!DataRequest) return;

    const DataPut = {
      ...DataRequest,
      status: status,
    };

    await MutationUpdateRequest.mutateAsync(DataPut, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {},
    });
    close();
  };
  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }
  return (
    <>
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold">No</Table.Th>
            <Table.Th className="font-bold">Nama Karyawan</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
            <Table.Th className="font-bold">Keterangan</Table.Th>
            <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((request: RequestsType, index: number) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{request?.employee.name}</Table.Td>
                <Table.Td>{request?.status}</Table.Td>
                <Table.Td>{request?.description}</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
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
    </>
  );
};
