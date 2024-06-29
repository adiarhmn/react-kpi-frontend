import { Table } from '@mantine/core';
import { useEffect } from 'react';

import { useAuth } from '@/features/auth';
import { getDaysInMonths } from '@/utils/format';

import { useGetRecap } from '../api';

interface Props {
  date: string;
}
export const RecapAttendance: React.FC<Props> = ({ date }) => {
  const { creds } = useAuth();
  const month = new Date(date);
  const DayinMonth = getDaysInMonths(month.getMonth(), month.getFullYear());
  const { data: DataRecap, isLoading: LoadingRecap } = useGetRecap(creds?.company_id);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  if (LoadingRecap) return <div>Loading...</div>;

  console.log(DataRecap);
  return (
    <section className="bg-white rounded-lg shadow-lg p-5 mt-7">
      <div className="grid lg:grid-cols-2">
        <div>
          <h1 className="font-semibold">Rekap Absensi Karyawan</h1>
          <div className="-mt-1 text-xs text-slate-400 mb-2">
            Berikut rekap absensi pada :{' '}
            <span className="text-blue-500 font-semibold">
              {' '}
              {month.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-300" id="RecapAttendance">
        <Table withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="sticky left-0 bg-gray-200 min-w-60 font-semibold">
                <sub>Nama</sub>\<sup>Tgl</sup>
              </Table.Th>
              {DayinMonth.map((day, index) => (
                <Table.Th key={index} className="bg-gray-200 font-semibold">
                  <div className="text-center">
                    <div className={`text-xxs ${day.dayName === 'Min' ? 'text-red-700' : ''}`}>
                      {day.dayName}
                    </div>
                    <div>{index + 1}</div>
                  </div>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {DataRecap?.map((recap, index) => (
              <Table.Tr key={recap.name + index}>
                <Table.Td align="center" className="sticky left-0 min-w-60 bg-white">
                  {recap.name}
                </Table.Td>
                {recap.recap?.map((schedule: any, colIndex: number) => (
                  <Table.Td key={colIndex}>1</Table.Td>
                ))}
                {recap.recap?.length < 1 && (
                  <Table.Td colSpan={DayinMonth?.length}>
                    <div className="text-red-600 text-xs text-center">
                      Karyawan Belum Ada Jadwal
                    </div>
                  </Table.Td>
                )}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </section>
  );
};
