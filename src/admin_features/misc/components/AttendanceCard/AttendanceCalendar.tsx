import { BarChart } from '@mantine/charts';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';

const data = [
  { item: 'Hadir', total: 21, color: 'green' },
  { item: 'Alpa', total: 15.5, color: 'red' },
  { item: 'Izin', total: 3, color: 'blue' },
  { item: 'Sakit', total: 3, color: 'cyan' },
  { item: 'Terlambat. ', total: 2, color: 'yellow' },
  { item: 'Cuti', total: 2, color: 'purple' },
];

export const AttendanceCalendar: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <section className="bg-white shadow-lg p-3 rounded-lg">
      <div className="grid lg:grid-cols-2">
        <div>
          <h2 className="font-bold">Kalendar Presensi</h2>
          <div className="-mt-1 text-xs text-slate-400">
            Tentukan Tanggal Untuk Melihat Rekap Presensi
          </div>
        </div>
      </div>
      <div className="flex mt-5 justify-between">
        <div>
          <DatePicker size="xs" value={value} onChange={setValue} />
        </div>
        <div className="flex-grow pt-2  overflow-hidden">
          <BarChart
            h={200}
            w={430}
            opacity={0.85}
            data={data}
            dataKey="item"
            withTooltip={false}
            series={[{ name: 'total', color: 'blue' }]}
          />
        </div>
      </div>
    </section>
  );
};
