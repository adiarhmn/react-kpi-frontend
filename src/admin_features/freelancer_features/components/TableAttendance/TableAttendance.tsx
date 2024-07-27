import { Badge, Button, Select, Table } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AttendanceWorkerType, GroupType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetAttendanceWorker, useGetGroup } from '../../api';

export const TableAttendance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const {
    data: dataGroup,
    isLoading: LoadGroup,
    isError: ErGroup,
  } = useGetGroup(creds?.company_id || 0);
  const [groupPicker, setGroupPicker] = useState<string | undefined>(undefined);

  const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
  const handleGetReport = async () => {
    if (groupPicker && dataGroup?.length > 0) {
      window.open(`${BaseURL}/generate-worker-report?group=${groupPicker}`);
    }
  };

  const { data, isLoading, isError } = useGetAttendanceWorker(
    creds?.company_id || 0,
    parseInt(groupPicker ?? '0')
  );

  if (isLoading || LoadGroup) return <div>Loading</div>;
  if (isError || ErGroup) return <div>Error</div>;

  const OptionsGroup = dataGroup?.map((group: GroupType) => ({
    value: group.id.toString(),
    label: group.name,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Select
          className="max-w-sm"
          label="Pilih Kelompok"
          placeholder="Semua Kelompok"
          data={OptionsGroup}
          value={groupPicker}
          allowDeselect={false}
          onChange={(e) => {
            if (e) setGroupPicker(e);
          }}
        />
        {data?.length < 1 ? (
          <div className="text-red-500 text-xs">Tidak Ada data yang bisa Diprint</div>
        ) : (
          <div className="flex flex-col">
            {!groupPicker && <i className="text-xxs">*Pilih Kelompok Agar tombol aktif</i>}
            <Button onClick={handleGetReport} disabled={groupPicker == undefined}>
              Download PDF
            </Button>
          </div>
        )}
      </div>

      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="font-bold" style={{ width: 70, textAlign: 'center' }}>
              No
            </Table.Th>
            <Table.Th className="font-bold">Nama Pekerja</Table.Th>
            <Table.Th className="font-bold">Kelompok</Table.Th>
            <Table.Th className="font-bold">Sesi</Table.Th>
            <Table.Th className="font-bold">Ket</Table.Th>
            <Table.Th className="font-bold">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((worker: AttendanceWorkerType, index: number) => (
            <Table.Tr key={index}>
              <Table.Td style={{ width: 70, textAlign: 'center' }}>{index + 1}</Table.Td>
              <Table.Td>{worker?.employee?.name}</Table.Td>
              <Table.Td>{worker?.group_name}</Table.Td>
              <Table.Td>{worker?.session_name}</Table.Td>
              <Table.Td>{worker?.detail}</Table.Td>
              <Table.Td>
                {worker?.attendance_status.toLocaleLowerCase() === 'hadir' ? (
                  <Badge color="green">Hadir</Badge>
                ) : (
                  <Badge color="red">Alpa</Badge>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
