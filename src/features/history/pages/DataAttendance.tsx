import { Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataAttendance: React.FC = () => {
  const [month, setMonth] = useState<Date | null>(new Date());

  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data Absensi</h2>
          </div>
          <span className="font-semibold">
            {month?.toLocaleString('default', { month: 'long' })} {month?.getFullYear()}
          </span>
        </div>

        {/* Month Picker or Input Date */}
        <div>
          <p className="text-xs text-slate-400 mb-1">Pencarian berdasarkan bulan :</p>
          <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
        </div>
      </section>

      {/* List Attendance Data List */}
      <section className="px-2 flex flex-col gap-1 text-slate-600 mx-3 mt-4 divide-y divide-slate-300">
        {/* Header */}
        <div className="grid grid-cols-4 text-center gap-1 pt-2 text-sm text-blue-700">
          <div className="text-center font-semibold">Hari</div>
          <div className="flex gap-1 items-center ps-2 font-semibold">Jam Masuk</div>
          <div className="flex flex-col ps-2 font-semibold">Jam Keluar</div>
          <div className="flex flex-col ps-2 font-semibold">Keterangan</div>
        </div>

        {/* Data */}
        <div className="grid grid-cols-4 text-center gap-1 p-1 text-sm">
          <div>Jum'at, 13</div>
          <div className="ps-2">
            <span>08.13</span>
            <span className="text-xs bg-red-600 text-white rounded-md m-1 px-1">T</span>
          </div>
          <div className="ps-2">
            <span>08.13</span>
            <span className="text-xs bg-red-600 text-white rounded-md m-1 px-1">PC</span>
          </div>
          <div className="ps-2">
            <span className="bg-green-300 px-2 rounded-full">Lembur</span>
          </div>
        </div>

        <div className="grid grid-cols-4 text-center gap-1 p-1 text-sm">
          <div>Sabtu, 14</div>
          <div className="ps-2">
            <span>08.13</span>
            <span className="text-xs bg-red-600 text-white rounded-md m-1 px-1">T</span>
          </div>
          <div className="ps-2">
            <span>08.13</span>
            <span className="text-xs bg-red-600 text-white rounded-md m-1 px-1">PC</span>
          </div>
          <div className="ps-2">
            <span className="bg-red-300 px-2 rounded-full">Lembur</span>
          </div>
        </div>

        <div className="grid grid-cols-4 text-center gap-1 p-1 text-sm bg-red-200">
          <div>Minggu, 15</div>
          <div className="ps-2">-</div>
          <div className="ps-2">-</div>
          <div className="ps-2">-</div>
        </div>
      </section>

      <section className="px-2">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Element position</Table.Th>
              <Table.Th>Element name</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>Atomic mass</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>Element position</Table.Th>
              <Table.Th>Element name</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>Atomic mass</Table.Th>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </section>
    </main>
  );
};
