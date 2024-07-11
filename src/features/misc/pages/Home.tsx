/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { Anchor, Badge, Divider, Group, Loader, RingProgress, Text } from '@mantine/core';
import {
  IconCalendar,
  IconFileTime,
  IconNews,
  IconFingerprint,
  IconClockHour8,
  IconClock24,
  IconLuggage,
  IconClipboardText,
  IconFileDollar,
  IconUsersGroup,
  IconClock,
  IconFileText,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { AttendanceType, ScheduleType, useGetAttendanceMonthly } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { ActivityCard } from '@/features/components';
import { useGetEmployee } from '@/features/employee/api/Profile';
import { AbsenceType, formatterDate, useGetAbsenceByType } from '@/features/history';
import { useGetScheduleDaily } from '@/features/schedule/api';
import { EmployeeType } from '@/admin_features/types';
import { AttendanceRequestType } from '@/features/late-request';
import { useGetAttendanceRequest } from '@/features/late-request/api/getAttendanceRequest';
import { useGetAttendanceRecapByDivision } from '@/admin_features/attendance/api';
// import { SchedulesType } from '@/admin_features/schedule/types';
import { MotionConfig } from 'framer-motion';

type DataAttendanceDivisionType = {
  Hadir: number;
  BelumHadir: number;
  Cuti: number;
  Terlambat: number;
  Sakit: number;
  Izin: number;
  Overall: any;
};

export const Home: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
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

  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);

  const [request, setRequest] = useState<AbsenceType[]>([]);
  const { data: DataRequest } = useGetAbsenceByType(creds?.employee_id, 'sakit', 'Disetujui');
  useEffect(() => {
    if (DataRequest) {
      setRequest(DataRequest);
    }
  }, [DataRequest]);

  // console.log(request);

  const [attendanceReq, setAttendanceReq] = useState<AttendanceRequestType[]>([]);
  const { data: DataAttendanceReq } = useGetAttendanceRequest(creds?.employee_id);
  useEffect(() => {
    if (DataAttendanceReq) {
      setAttendanceReq(DataAttendanceReq);
    }
  }, [DataAttendanceReq]);

  const [attendanceDivision, setAttendanceDivision] = useState<DataAttendanceDivisionType>();
  const { data: DataAttendanceDivision, isLoading: LoadingDataAttendanceDivision } =
    useGetAttendanceRecapByDivision(formatterDate(new Date(), 'yyyy-MM-dd'), employee?.division_id);
  useEffect(() => {
    if (DataAttendanceDivision) {
      setAttendanceDivision(DataAttendanceDivision);
    }
  });
  console.log(attendanceDivision);
  // console.log('Data attendanceReq : ', attendanceReq);
  if (LoadingDataAttendanceDivision) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  return (
    <main>
      <section className="bg-blue-700 w-full rounded-b-3xl px-5 pt-8 pb-20 relative">
        <img
          src="/images/predictive-analytics.svg"
          className="absolute w-44 right-3 -top-4 opacity-85"
          alt=""
        />
        <div className="text-white text-2xl font-bold relative z-10">{employee?.name}</div>
        <div className="text-sm font-semibold text-white">{creds?.role}</div>

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
            <IconCalendar className="opacity-80" size={20} />
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
                {request.length}
              </div>
              <div className="text-xs mt-1">Izin / Sakit</div>
            </Link>
            <Link to="#" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-sky-400 text-white rounded-xl font-bold w-full h-full text-center shadow">
                {attendanceReq.length}
              </div>
              <div className="text-xs mt-1 t">Pengajuan</div>
            </Link>
          </div>
          <div className=" text-xs divide-x divide-gray-300 p-2"></div>
        </div>
      </section>

      {/* Menu List => Berisi daftar menu pada sistem */}
      <section className="px-7 mt-5 mb-7">
        {creds?.role == 'supervisor' ? (
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
              {
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
                title: 'Slip Gaji',
                href: '/development',
                icon: IconFileDollar,
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
                title: 'Permintaan',
                href: '/employee-request',
                icon: IconFileText,
                color: 'bg-blue-600',
              },
              {
                title: 'Divisi',
                href: '/employee-division',
                icon: IconUsersGroup,
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
        ) : (
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
              {
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
        )}
      </section>

      {creds?.role == 'supervisor' && (
        <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 -mt-4">
          <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
            <div>
              <Text fw={700} c="blue">
                Rekap kehadiran hari ini
              </Text>
            </div>
          </div>
          <Divider size={'sm'} />

          <div className="w-full grid grid-cols-12  p-1 -mb-2">
            <div className="col-span-5 text-center m-auto p-1">
              <MotionConfig transition={{ duration: 0.5 }}>
                <RingProgress
                  className="mx-auto -ms-2 mb-2"
                  size={100}
                  roundCaps
                  thickness={10}
                  label={
                    <div className="text-center text-xs font-semibold text-slate-500">
                      Hadir {attendanceDivision?.Hadir ?? 0}
                    </div>
                  }
                  sections={[
                    {
                      value:
                        ((attendanceDivision?.Hadir ?? 0) / (attendanceDivision?.Overall ?? 1)) *
                          100 || 0,
                      color: 'green',
                    },
                    {
                      value:
                        ((attendanceDivision?.BelumHadir ?? 0) /
                          (attendanceDivision?.Overall ?? 1)) *
                          100 || 0,
                      color: 'red',
                    },
                    {
                      value:
                        ((attendanceDivision?.Izin ?? 0) / (attendanceDivision?.Overall ?? 1)) *
                          100 || 0,
                      color: 'blue',
                    },
                    {
                      value:
                        ((attendanceDivision?.Sakit ?? 0) / (attendanceDivision?.Overall ?? 1)) *
                          100 || 0,
                      color: 'yellow',
                    },
                    {
                      value:
                        ((attendanceDivision?.Cuti ?? 0) / (attendanceDivision?.Overall ?? 1)) *
                          100 || 0,
                      color: 'grape',
                    },
                  ]}
                ></RingProgress>
              </MotionConfig>
            </div>
            <Divider className="col-span-1" orientation="vertical" />
            <div className="col-span-6 text-left my-auto">
              <div className="flex items-center space-x-1">
                <Badge color="green" radius="xs" size="xs"></Badge>
                <Text size="sm">Hadir : </Text>
                <Text size="sm">{attendanceDivision?.Hadir}</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Badge color="red" radius="xs" size="xs"></Badge>
                <Text size="sm">Belum hadir : </Text>
                <Text size="sm">{attendanceDivision?.BelumHadir}</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Badge color="blue" radius="xs" size="xs"></Badge>
                <Text size="sm">Izin : </Text>
                <Text size="sm">{attendanceDivision?.Izin}</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Badge color="yellow" radius="xs" size="xs"></Badge>
                <Text size="sm">Sakit : </Text>
                <Text size="sm">{attendanceDivision?.Sakit}</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Badge color="grape" radius="xs" size="xs"></Badge>
                <Text size="sm">Cuti : </Text>
                <Text size="sm">{attendanceDivision?.Cuti}</Text>
              </div>
            </div>
          </div>
          <Divider size={'sm'} className="mt-2" />
          <div className="py-2">
            <Group justify="center">
              <Anchor
                size="sm"
                onClick={() => navigate(`/employee-division/monthly-attendance`)}
                target="_blank"
                underline="always"
              >
                Lihat rekap bulanan
              </Anchor>
              {/* <IconCalendar color="blue" className="-ms-2" /> */}
            </Group>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Jadwal
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
              {schedule == undefined
                ? ''
                : schedule.attendance_place
                  ? schedule.attendance_place
                  : 'WFO'}
            </Badge>
            <Badge
              size="sm"
              className="uppercase"
              style={{
                marginTop: '7px',
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={
                schedule?.attendance_status == 'Belum hadir'
                  ? 'red'
                  : schedule?.attendance_status == 'cuti'
                    ? 'grape'
                    : schedule?.attendance_status == 'sakit'
                      ? 'teal'
                      : schedule?.attendance_status == 'izin'
                        ? 'yellow'
                        : 'blue'
              }
            >
              {schedule?.attendance_status}
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

      <ActivityCard employee={employee} date={new Date()} />
    </main>
  );
};
