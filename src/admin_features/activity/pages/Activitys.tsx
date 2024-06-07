import { Input, Table } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { ActivitysType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetActivityAlias, useGetActivitys } from '../api';

export const Activitys: React.FC = () => {
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

  console.log(DataActivity);
  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Aktivitas</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar aktivitas karyawan pada hari ini
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
        </div>
        <div className="mt-7">
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
        </div>
      </section>
    </main>
  );
};
