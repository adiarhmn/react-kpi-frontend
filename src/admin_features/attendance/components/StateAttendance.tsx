import { Skeleton } from '@mantine/core';

import { useAuth } from '@/features/auth';

import { useGetAttendanceRecap } from '../api';

interface Props {
  date: string;
}

export const StateAttendance: React.FC<Props> = ({ date }) => {
  const { creds } = useAuth();
  const { data, isLoading } = useGetAttendanceRecap(date, creds?.company_id);

  if (isLoading) {
    <section className="grid grid-cols-1 lg:grid-cols-6 gap-2 mb-4 text-slate-400">
      <Skeleton className="p-3"></Skeleton>
      <Skeleton className="p-3"></Skeleton>
      <Skeleton className="p-3"></Skeleton>
      <Skeleton className="p-3"></Skeleton>
    </section>;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-6 gap-2 mb-4 text-white">
      <div className="p-3  rounded-xl bg-gradient-to-l from-green-400 to-green-900 text-sm flex justify-between items-center">
        <span>Hadir</span>
        <span className="font-semibold text-xl">{data?.Hadir}</span>
      </div>
      <div className="p-3  rounded-xl bg-gradient-to-l from-red-400 to-red-900 text-sm flex justify-between items-center ">
        <span>Belum Hadir</span>
        <span className="font-semibold text-xl">{data?.BelumHadir}</span>
      </div>
      <div className="p-3  rounded-xl bg-gradient-to-l from-blue-400 to-blue-900 text-sm flex justify-between items-center ">
        <span>Izin</span>
        <span className="font-semibold text-xl">{data?.Izin}</span>
      </div>
      <div className="p-3  rounded-xl bg-gradient-to-l from-yellow-400 to-yellow-900 text-sm flex justify-between items-center ">
        <span>Terlambat</span>
        <span className="font-semibold text-xl">{data?.Terlambat}</span>
      </div>
      <div className="p-3  rounded-xl bg-gradient-to-l from-cyan-400 to-cyan-900 text-sm flex justify-between items-center ">
        <span>Sakit</span>
        <span className="font-semibold text-xl">{data?.Sakit}</span>
      </div>
      <div className="p-3  rounded-xl bg-gradient-to-l from-purple-400 to-purple-900 text-sm flex justify-between items-center ">
        <span>Cuti</span>
        <span className="font-semibold text-xl">{data?.Cuti}</span>
      </div>
    </section>
  );
};
