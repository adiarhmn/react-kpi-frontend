import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ScheduleList } from '../components';

export const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState<Date>(new Date());
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
            <h2 className="font-semibold ">Data Izin</h2>
          </div>
          <span className="font-semibold">
            {month?.toLocaleString('default', { month: 'long' })} {month?.getFullYear()}
          </span>
        </div>

        {/* Month Picker or Input Date */}
        <div>
          <p className="text-xs text-slate-400 mb-1">Rekap izin bulan :</p>
          <MonthPickerInput
            size="xs"
            placeholder="Pick date"
            value={month}
            onChange={(value) => {
              if (value === null) {
                setMonth(new Date());
              } else {
                setMonth(value);
              }
            }}
          />
        </div>
      </section>

      <ScheduleList month={month} setMonth={setMonth} />

      {/* <section className="min-h-96 flex flex-col items-center justify-center mt-10">
        <img
          className="w-40 mb-2 bg-slate-200 rounded-full p-2"
          src="/images/blank-canvas.svg"
          alt=""
        />
        <span className="font-bold text-slate-400 text-xl">Belum ada data jadwal</span>
      </section> */}
    </main>
  );
};
