import { MonthPickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OvertimeList } from '../component/OvertimeList';

export const DataOvertime: React.FC = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState<Date | null>(new Date());

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
            <h2 className="font-semibold ">Data lembur</h2>
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

      <OvertimeList />
    </main>
  );
};
