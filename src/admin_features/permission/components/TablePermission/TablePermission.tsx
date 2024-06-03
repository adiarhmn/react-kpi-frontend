import { ActionIcon, Button, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { RequestsType } from '@/admin_features/types';

import { useGetPermissions } from '../../api';
import { usePutPermission } from '../../api/putPermission';

export const TablePermission = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, error, refetch } = useGetPermissions();
  const [DataRequest, setDataRequest] = useState<RequestsType>();
  const MutationUpdateRequest = usePutPermission();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const HandleUpdateRequest = async () => {
    if (!DataRequest) return console.log('Data Request Not Found');

    const DataPut = {
      ...DataRequest,
      status: 'Disetujui',
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
            <Button color="green" onClick={HandleUpdateRequest}>
              Ya
            </Button>
            <Button color="red" onClick={close}>
              Tidak
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
