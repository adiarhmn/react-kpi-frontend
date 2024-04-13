import { Badge } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconCalendar, IconCalendarMonth, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataAttendance: React.FC = () => {
  const [month, setMonth] = useState<Date | null>(new Date());
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data Absensi</h2>
          </div>
        </div>

        {/* Month Picker or Input Date */}
        <div>
          <p className="text-xs text-slate-400 mb-1">Pencarian berdasarkan bulan :</p>
          <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
        </div>
      </section>

      {/* List Attendance Data List */}
      <section className="px-2 flex flex-col gap-3 text-slate-600 mx-3 mt-4">
        <div className="grid grid-cols-3 gap-2 divide-x divide-slate-400 pt-2">
          <div className="bg-green-600 text-white rounded-lg py-1 text-center">
            <span className="text-sm">Jum'at, 13</span>
            <h3 className="text-sm font-bold">Hadir</h3>
          </div>

          <div className="text-sm flex flex-col ps-2">
            <span>Masuk : 08.13</span>
            <span className="text-xs bg-red-600 text-white text-center rounded-md">Terlambat</span>
          </div>

          <div className="text-sm flex flex-col ps-2">
            <span>Keluar : 17.13</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 divide-x divide-slate-400 pt-2">
          <div className="bg-green-600 text-white rounded-lg py-1 text-center">
            <span className="text-sm">Jum'at, 13</span>
            <h3 className="text-sm font-bold">Hadir</h3>
          </div>

          <div className="text-sm flex flex-col ps-2">
            <span>Masuk : 08.13</span>
            <span className="text-xs bg-red-600 text-white text-center rounded-md">Terlambat</span>
          </div>

          <div className="text-sm flex flex-col ps-2">
            <span>Keluar : 17.13</span>
          </div>
        </div>
      </section>
    </main>
  );
};
