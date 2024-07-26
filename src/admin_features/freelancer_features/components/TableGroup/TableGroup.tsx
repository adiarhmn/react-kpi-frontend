import { ActionIcon, Button, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetGroup } from '../../api';

export const TableGroup: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const [opened, { open, close }] = useDisclosure();
  const [detailGroup, setDetailGroup] = useState<GroupType | undefined>(undefined);
  const DetailGroupChange = (group: GroupType) => {
    setDetailGroup(group);
    setTimeout(() => {
      open();
    }, 50);
  };

  console.log('Detail Group', detailGroup);
  const { data, isLoading, isError } = useGetGroup(creds?.company_id || 0);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.length < 1 ? (
        <div className="h-64 flex justify-center items-center">Data Kelompok tidak ditemukan</div>
      ) : (
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
                No
              </Table.Th>
              <Table.Th className="font-bold">Nama Kelompok</Table.Th>
              <Table.Th className="font-bold">Jumlah Anggota</Table.Th>
              <Table.Th className="font-bold">Jumlah Sesi</Table.Th>
              <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((group: GroupType, index: number) => (
              <Table.Tr key={index}>
                <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
                <Table.Td>{group?.name}</Table.Td>
                <Table.Td>{group?.EmployeeGroups.length} Orang</Table.Td>
                <Table.Td>{group?.GroupSessions.length} Sesi</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon color="red">
                    <IconTrash size={14} />
                  </ActionIcon>
                  <Button
                    onClick={() => DetailGroupChange(group)}
                    size="xs"
                    color="blue"
                    leftSection={<IconEye size={14} />}
                  >
                    Detail
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      {/* Modal Detail Groups */}
      <Modal
        size={'lg'}
        opened={opened}
        onClose={close}
        title={<div className="font-semibold">Detail {detailGroup?.name || 'Group'}</div>}
      >
        <div>
          <div className="font-semibold flex gap-2 mb-5">
            {' '}
            <div>Nama Kelompok : </div>
            {detailGroup?.name}
          </div>
          <div className="mb-5">
            <div className="font-semibold text-xs">Anggota Kelompok</div>
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 font-semibold">Nama Pekerja</th>
                  <th className="border border-slate-300 font-semibold">Kode Pekerja</th>
                  <th className="border border-slate-300 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {detailGroup?.EmployeeGroups.map((employee, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">{employee.employee.name}</td>
                    <td className="border border-slate-300 p-1">{employee.employee.nip || '-'}</td>
                    <td className="border border-slate-300 p-1 text-center">
                      <ActionIcon color="red">
                        <IconTrash size={14} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold text-xs">Sesi Kerja</div>
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="border border-slate-300 font-semibold">Nama Sesi</th>
                  <th className="border border-slate-300 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {detailGroup?.GroupSessions.map((session, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">{session.session.name}</td>
                    <td className="border border-slate-300 p-1 text-center">
                      <ActionIcon color="red">
                        <IconTrash size={14} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Button color="gray" onClick={close}>
            Tutup Detail
          </Button>
        </div>
      </Modal>
    </div>
  );
};
