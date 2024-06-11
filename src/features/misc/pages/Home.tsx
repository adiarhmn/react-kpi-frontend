import { Badge, Divider, Text } from '@mantine/core';
import {
  IconCalendar,
  IconFileTime,
  IconNews,
  IconFingerprint,
  IconChevronRight,
  IconClockHour8,
  IconClock24,
  IconLuggage,
  IconClipboardText,
  IconFileDollar,
  IconUsersGroup,
  IconClock,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { AttendanceType, ScheduleType, useGetAttendanceMonthly } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';
// eslint-disable-next-line no-restricted-imports
import { useGetScheduleDaily } from '@/features/schedule/api';

export const Home: React.FC = () => {
  const { creds } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule } = useGetScheduleDaily(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataSchedule) {
      setSchedule(DataSchedule[0]);
    }
  }, [DataSchedule]);

  const currentDate = new Date();
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const { data: DataAttendance } = useGetAttendanceMonthly(
    creds?.employee_id,
    formatterDate(currentDate, 'MM'),
    formatterDate(currentDate, 'yyyy')
  );
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);

  return (
    <main>
      <section className="bg-blue-700 w-full rounded-b-3xl px-5 pt-8 pb-20 relative">
        <img
          src="/images/predictive-analytics.svg"
          className="absolute w-44 right-3 -top-4 opacity-85"
          alt=""
        />
        <div style={{ fontSize: '25px' }} className="text-white font-bold relative z-10">
          {creds?.username}
        </div>
        <div className="text-sm= font-semibold text-white">{creds?.role}</div>

        <div className="absolute right-5 top-5">
          <img src="/images/white-logo.png" alt="" className="w-14" />
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full -mt-16 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="divide-y divide-gray-300">
          <div className="flex justify-between text-xs items-center p-2">
            <Text fw={700} c="blue">
              Rekap absensi bulan ini
            </Text>
            <IconChevronRight className="opacity-80" size={20} />
          </div>
          <div className="w-full grid grid-cols-3 divide-x divide-gray-300 pb-2 pt-2">
            <Link to="#" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-green-500 text-white rounded-xl font-bold w-full h-full text-center shadow">
                {attendance.length}
              </div>
              <div className="text-xs mt-1">Hadir</div>
            </Link>
            <Link to="#" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-yellow-500 text-white rounded-xl font-bold w-full h-full text-center shadow">
                7
              </div>
              <div className="text-xs mt-1">Izin</div>
            </Link>
            <Link to="#" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-sky-400 text-white rounded-xl font-bold w-full h-full text-center shadow">
                7
              </div>
              <div className="text-xs mt-1 t">Sisa Cuti</div>
            </Link>
          </div>
          <div className=" text-xs divide-x divide-gray-300 p-2"></div>
        </div>
      </section>

      {/* Menu List => Berisi daftar menu pada sistem */}
      <section className="px-7 mt-5 mb-7">
        <MenuList
          navigations={[
            {
              title: 'Kehadiran',
              href: '/info-attendance',
              icon: IconFingerprint,
              color: 'bg-blue-600',
            },
            {
              title: 'Jadwal',
              href: '/schedule',
              icon: IconCalendar,
              color: 'bg-blue-600',
            },
            creds?.role == 'supervisor'
              ? {
                  title: 'Divisi',
                  href: '/absence',
                  icon: IconUsersGroup,
                  color: 'bg-blue-600',
                }
              : {
                  title: 'Izin',
                  href: '/absence',
                  icon: IconFileTime,
                  color: 'bg-blue-600',
                },
            {
              title: 'Cuti',
              href: '/paid-leave',
              icon: IconLuggage,
              color: 'bg-blue-600',
            },
            {
              title: 'Testing',
              href: '/test',
              icon: IconClock,
              color: 'bg-blue-600',
            },
            {
              title: 'Pengajuan',
              href: '/late-request',
              icon: IconClipboardText,
              color: 'bg-blue-600',
            },
            {
              title: 'Lembur',
              href: '/overtime',
              icon: IconClock24,
              color: 'bg-blue-600',
            },
            {
              title: 'Slip Gaji',
              href: '/development',
              icon: IconFileDollar,
              color: 'bg-blue-600',
            },
            {
              title: 'Berita',
              href: '/development',
              icon: IconNews,
              color: 'bg-blue-600',
            },
          ]}
        />
      </section>

      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-5">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Jadwal hari ini
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <Badge
              size="sm"
              className="uppercase"
              style={{
                marginTop: '7px',
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={schedule?.status == 'on' ? 'green' : 'red'}
            >
              {schedule?.status}
            </Badge>
            <Badge
              size="sm"
              className="uppercase"
              style={{
                marginTop: '7px',
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={schedule?.attendance_place == 'WFH' ? 'yellow' : 'blue'}
            >
              {schedule?.attendance_place}
            </Badge>
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="divide-y divide-gray-300">
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
            <div className="col-span-3 text-center m-auto p-1">
              <Text size="28px" fw={700}>
                {schedule?.shift.shift_code}
              </Text>
              <Text style={{ marginTop: '-5px' }} size="sm">
                {schedule?.shift.shift_name}
              </Text>
            </div>
            <div className="col-span-9 ms-2 text-left">
              <div className="ms-2 -mb-2">
                <Text size="xs">Hari & tanggal : </Text>
                <Text size="sm" fw={700}>
                  {schedule?.date != undefined
                    ? formatterDate(new Date(schedule?.date), 'EEEE, dd MMMM yyyy')
                    : '--'}
                </Text>
              </div>
              <Divider my="sm" />
              <div className="-mt-2 w-full grid grid-cols-12 mb-1">
                <div className="col-span-6 text-left mt-1 ms-2">
                  <Text size="xs">Jam kerja</Text>
                  <Text size="sm" fw={700}>
                    {schedule?.shift.start_time} - {schedule?.shift.end_time}
                  </Text>
                </div>
                <div className="col-span-6 text-right -mt-1"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 text-xs divide-x divide-gray-300 p-2">
            <div className="flex gap-2">
              <IconClockHour8 size={15} className="text-green-400" /> Masuk :{' '}
              {schedule?.shift.start_time}
            </div>
            <div className="ps-3 flex gap-2">
              <IconClockHour8 size={15} className="text-rose-400" /> Keluar :{' '}
              {schedule?.shift.end_time}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
