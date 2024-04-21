import { Badge, Progress, Tooltip } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconChartCandle, IconChartPie2, IconChevronRight, IconReport } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const History: React.FC = () => {
  const [month, setMonth] = useState<Date | null>(new Date());

  return (
    <main className="">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 divide-y divide-gray-300 -mt-10">
        <div className="flex items-center font-semibold justify-between text-sm">
          <span className="font-bold text-blue-700">Rekap Absensi </span>
          <div>
            <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
          </div>
        </div>

        {/* Progress Bar Absensi */}
        <div className="py-2">
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

        <div className="py-2 grid grid-cols-2 divide-x divide-gray-300 text-sm">
          <div className="pe-3">
            <Badge color="yellow" fullWidth>
              <span className="font-semibold">20 Terlambat</span>
            </Badge>
          </div>
          <div className="ps-3">
            <Badge color="cyan" fullWidth>
              <span className="font-semibold">20 Lembur</span>
            </Badge>
          </div>
        </div>
      </section>

      <section className="p-2 flex flex-col gap-3 text-slate-600 mx-3 mt-4">
        <h2 className="font-semibold text-sm text-blue-700">Data Riwayat Lainnya:</h2>
        {/* Data Absensi */}

        <Link
          to="/history/data-attendance"
          className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
        >
          <div className="flex gap-3 items-center">
            <IconChartCandle size={25} className="text-blue-700" />
            <div>
              <span className="font-semibold">Data Absensi</span>
              <p className="text-xs text-slate-400">Data Absensi</p>
            </div>
          </div>
          <IconChevronRight className="text-blue-700" size={25} />
        </Link>

        {/* Data Izin */}
        <Link
          to="/history/data-absence"
          className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
        >
          <div className="flex gap-3 items-center">
            <IconChartPie2 size={25} className="text-blue-700" />
            <div>
              <span className="font-semibold">Data Izin</span>
              <p className="text-xs text-slate-400">Data izin atau cuti yang disetujui</p>
            </div>
          </div>
          <IconChevronRight className="text-blue-700" size={25} />
        </Link>

        {/* Data Lembur */}
        <Link
          to="/history/data-overtime"
          className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
        >
          <div className="flex gap-3 items-center">
            <IconReport size={25} className="text-blue-700" />
            <div>
              <span className="font-semibold">Data Lembur</span>
              <p className="text-xs text-slate-400">Data Lembur yang sudah disetujui</p>
            </div>
          </div>
          <IconChevronRight className="text-blue-700" size={25} />
        </Link>
      </section>
    </main>
  );
};
