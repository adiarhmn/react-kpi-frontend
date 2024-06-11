import { Button, Table } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetActivityAlias, useGetActivitys } from '../../api';

export const TableActivitys: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const {
    data: DataActivity,
    error: errorActivity,
    isLoading: loadingActivity,
  } = useGetActivitys(creds?.company_id);

  const { data: DataActivityAlias, isLoading: LoadingActivityAlias } = useGetActivityAlias(
    creds?.company_id
  );

  if (loadingActivity || LoadingActivityAlias) {
    return <div>Loading...</div>;
  }
  if (errorActivity || !DataActivity) {
    return <div className="text-red-600 text-center my-20 font-bold">{errorActivity?.message}</div>;
  }

  if (DataActivityAlias.length === 0) {
    return (
      <div className="min-h-52 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="text-center">Tidak Ada Data Variabel Aktivitas</div>
          <div className="text-xs text-slate-400 mb-2 -mt-1">
            Tekan Tombol untuk membuat variabel aktivitas
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={14}></IconPlus>}>
            Buat Aktivitas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          {Array.from(
            { length: 10 },
            (_, i) =>
              DataActivityAlias[0][`cs${i + 1}_name`] != '' && (
                <Table.Th key={i} className="font-bold capitalize">
                  {DataActivityAlias[0][`cs${i + 1}_name`]}
                </Table.Th>
              )
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {DataActivity.map((activity: any, index: number) => {
          return (
            <Table.Tr key={index}>
              {Array.from(
                { length: 10 },
                (_, i) =>
                  activity[`custom${i + 1}`] != '' && (
                    <Table.Th key={i} className="capitalize">
                      {activity[`custom${i + 1}`]}
                    </Table.Th>
                  )
              )}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
