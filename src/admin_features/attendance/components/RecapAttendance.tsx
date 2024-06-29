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

  // About Date
  const month = new Date(date);
  const DayinMonth = getDaysInMonths(month.getMonth(), month.getFullYear());
  const dayNow = new Date().getDate();
  const monthNow = new Date().getMonth();

  // Data Recap
  const { data: DataRecap, isLoading: LoadingRecap } = useGetRecap(
    creds?.company_id,
    month.getMonth() + 1,
    month.getFullYear()
  );

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

  const getBGColor = (status: string, date: number) => {
    if (monthNow === month.getMonth()) {
      if (date < dayNow && status === 'hadir') return 'bg-green-600 text-center text-white';
      if (date < dayNow && status === 'izin') return 'bg-blue-600 text-center text-white';
      if (date < dayNow && status === 'sakit') return 'bg-cyan-500 text-center text-white';
      if (date < dayNow && status === 'belum hadir') return 'bg-red-600 text-center text-white';
      if (date < dayNow && status === 'cuti') return 'bg-purple-600 text-center text-white';
    }

    if (monthNow > month.getMonth()) {
      if (status === 'hadir') return 'bg-green-600 text-center text-white';
      if (status === 'izin') return 'bg-blue-600 text-center text-white';
      if (status === 'sakit') return 'bg-cyan-500 text-center text-white';
      if (status === 'belum hadir') return 'bg-red-600 text-center text-white';
      if (status === 'cuti') return 'bg-purple-600 text-center text-white';
    }
    return '';
  };

  if (LoadingRecap) return <div>Loading...</div>;

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
                <div className=" flex justify-center items-center">
                  <sub>Nama</sub>\<sup>Tgl</sup>
                </div>
              </Table.Th>
              {DayinMonth.map((day, index) => (
                <Table.Th key={index} className="bg-gray-200 font-semibold">
                  <div className="text-center">
                    <div className={`text-xxs ${day.dayName === 'Min' ? 'text-red-600' : ''}`}>
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
              <Table.Tr key={index + 999}>
                <Table.Td align="center" className="sticky left-0 min-w-60 bg-white">
                  {recap.name}
                </Table.Td>
                {recap.recap?.map((recap_item: any, colIndex: number) => (
                  <Table.Td
                    key={colIndex + 55}
                    // 6  8
                    // 6 5
                    className={`${getBGColor(recap_item.attendance_status.toLowerCase(), colIndex)}`}
                  >
                    {colIndex + 1 < dayNow ? (
                      <div>{recap_item.shift_id}</div>
                    ) : (
                      <div>{recap_item.shift_id}</div>
                    )}
                  </Table.Td>
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
