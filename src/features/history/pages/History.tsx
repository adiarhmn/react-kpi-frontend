import { Progress, Tooltip } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconChartCandle, IconChartPie2, IconChevronRight, IconReport } from '@tabler/icons-react';
import { useState } from 'react';

export const History: React.FC = () => {
  const [month, setMonth] = useState<Date | null>(new Date());

  return (
    <main className="px-3 pt-5">
      <section className="bg-white m-2 p-3 shadow-md rounded-lg flex flex-col gap-2 divide-y divide-gray-300">
        <div className="flex items-center font-semibold justify-between text-sm">
          <span className="font-bold">Rekap Absensi </span>
          <div>
            <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
          </div>
        </div>

        <div className='py-2'>
          <Progress.Root size="xl">
            <Tooltip label="Hadir">
            <Progress.Section value={10} color="green">
              <Progress.Label>Hadir</Progress.Label>
            </Progress.Section>
            </Tooltip>

            <Progress.Section value={28} color="pink">
              <Progress.Label>Alpa</Progress.Label>
            </Progress.Section>
            <Progress.Section value={15} color="blue">
              <Progress.Label>Izin</Progress.Label>
            </Progress.Section>
            <Progress.Section value={15} color="orange">
              <Progress.Label>Sakit</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </div>
      </section>

      <section className="p-2 flex flex-col gap-3 text-slate-600">
        {/* Data Absensi */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm">
          <div className="flex gap-3 items-center">
            <IconChartCandle size={25} className="text-blue-700" />
            <span className="font-semibold">Data Absensi</span>
          </div>
          <IconChevronRight size={25} />
        </div>

        {/* Data Izin */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm">
          <div className="flex gap-3 items-center">
            <IconChartPie2 size={25} className="text-blue-700" />
            <span className="font-semibold">Data Izin</span>
          </div>
          <IconChevronRight size={25} />
        </div>

        {/* Data Lembur */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm">
          <div className="flex gap-3 items-center">
            <IconReport size={25} className="text-blue-700" />
            <span className="font-semibold">Data Lembur</span>
          </div>
          <IconChevronRight size={25} />
        </div>
      </section>
    </main>
  );
};
