/* eslint-disable linebreak-style */
import { Badge, Progress, Text, Tooltip } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconLuggage,
  IconChartCandle,
  IconChartPie2,
  IconChevronRight,
  IconReport,
  IconCalendar,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatterDate, useGetAbsenceByType } from '../api';
import { AttendanceType } from '@/admin_features/types';
import { useGetAttendanceMonthly } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { AbsenceType } from '../types';
import { AttendanceRequestType } from '@/features/late-request';
import { useGetAttendanceRequest } from '@/features/late-request/api/getAttendanceRequest';

export const History: React.FC = () => {
  const [month, setMonth] = useState<Date | null>(new Date());
  const { creds } = useAuth();
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

  const [request, setRequest] = useState<AbsenceType[]>([]);
  const { data: DataRequest } = useGetAbsenceByType(creds?.employee_id, 'sakit', 'Disetujui');
  useEffect(() => {
    if (DataRequest) {
      setRequest(DataRequest);
    }
  }, [DataRequest]);

  const [attendanceReq, setAttendanceReq] = useState<AttendanceRequestType[]>([]);
  const { data: DataAttendanceReq } = useGetAttendanceRequest(creds?.employee_id);
  useEffect(() => {
    if (DataAttendanceReq) {
      setAttendanceReq(DataAttendanceReq);
    }
  }, [DataAttendanceReq]);

  return (
    <main className="">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
{/* 
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 divide-y divide-gray-300 -mt-10">
        <div className="flex items-center font-semibold justify-between text-sm">
          <span className="font-bold text-blue-700">Rekap Absensi </span>
          <div>
            <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
          </div>
        </div>

        <div className="py-2">
          <Progress.Root size="xl">
            <Tooltip label="Hadir">
              <Progress.Section value={50} color="green">
                <Progress.Label>Hadir</Progress.Label>
              </Progress.Section>
            </Tooltip>

            <Progress.Section value={20} color="pink">
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
      </section> */}

      <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
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

      <section className="p-2 flex flex-col gap-3 text-slate-600 mx-3 mt-4">
        <h2 className="font-semibold text-sm text-blue-700">Data Riwayat :</h2>
        {/* Data Absensi */}

        <Link
          to="/history/data-attendance"
          className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
        >
          <div className="flex gap-3 items-center">
            <IconChartCandle size={25} className="text-blue-700" />
            <div>
              <span className="font-semibold">Riwayat Absensi</span>
              <p className="text-xs text-slate-400">Riwayat Absensi</p>
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
              <span className="font-semibold">Riwayat Izin</span>
              <p className="text-xs text-slate-400">Riwayat izin yang disetujui</p>
            </div>
          </div>
          <IconChevronRight className="text-blue-700" size={25} />
        </Link>

        {/* Data Cuti */}
        <Link
          to="/history/data-paid-leave"
          className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
        >
          <div className="flex gap-3 items-center">
            <IconLuggage size={25} className="text-blue-700" />
            <div>
              <span className="font-semibold">Riwayat Cuti</span>
              <p className="text-xs text-slate-400">Riwayat cuti yang disetujui</p>
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
              <span className="font-semibold">Riwayat Lembur</span>
              <p className="text-xs text-slate-400">Riwayat Lembur yang sudah disetujui</p>
            </div>
          </div>
          <IconChevronRight className="text-blue-700" size={25} />
        </Link>
      </section>
    </main>
  );
};
