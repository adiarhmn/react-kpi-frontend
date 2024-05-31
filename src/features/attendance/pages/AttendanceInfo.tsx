import { Badge, Divider, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSchedule } from '../api';
import { useGetActivity } from '../api/getActivity';
import { useGetAttendance } from '../api/getAttendance';
import { ActivityType, AttendanceType, ScheduleType } from '../types';

export const AttendanceInfo: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceType>();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const status = localStorage.getItem('isCheckedIn');
  const currentDate: Date = new Date();
  const dateSend = format(currentDate, 'yyyy-MM-dd', { locale: id });

  function formatterDate(date: Date | string, formatType: string) {
    return format(date, formatType, { locale: id });
  }

  const { data: dataAttendance, error: errorAttendance } = useGetAttendance(
    creds?.employee_id,
    dateSend
  );

  const { data: dataSchedule } = useGetSchedule(creds?.employee_id, dateSend);

  useEffect(() => {
    if (dataSchedule) {
      setSchedule(dataSchedule[0]);
    }
  }, [dataSchedule]);

  useEffect(() => {
    if (dataAttendance) {
      setAttendance(dataAttendance[0]);
    }
  }, [dataAttendance]);

  const { data: dataActivities } = useGetActivity(attendance?.id);
  useEffect(() => {
    if (dataActivities) {
      setActivities(dataActivities);
    }
  }, [dataActivities]);
  if (errorAttendance) {
    return (
      <div className="text-red-600 text-center my-20 font-bold">{errorAttendance.message}</div>
    );
  }

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
            <h2 className="font-semibold ">Informasi kehadiran </h2>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={status == 'false' ? 'red' : 'yellow'}
          >
            {status === 'false' ? 'Belum CheckIn' : 'Sedang Bekerja'}
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-3 text-center m-auto ">
            <Text size="27px" fw={700}>
              {schedule?.shift.shift_code}
            </Text>
            <Text style={{ marginTop: '-5px' }} size="sm">
              {schedule?.shift.shift_name}
            </Text>
          </div>
          <div className="col-span-9 ms-2 text-left">
            <div className="ms-2">
              <Text size="xs">Tanggal</Text>
              <Text size="sm" fw={700}>
                {formatterDate(currentDate, 'EEEE, dd MMM yyyy')}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 pb-2">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Check-in</Text>
                <Text size="sm" fw={700}>
                  {attendance?.check_in != undefined
                    ? formatterDate(attendance?.check_in, 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
              <div className="col-span-6 text-left mt-1">
                <Text size="xs">Check-out</Text>
                <Text size="sm" fw={700}>
                  {attendance?.check_out != undefined
                    ? formatterDate(attendance?.check_out, 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Kegiatan</span>
        </div>
        <div className="w-full pb-2">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index}>
                {' '}
                <div className="-mt-2 p-2">
                  <Text size="xs" fw={700}>
                    Judul
                  </Text>
                  <Text style={{ textAlign: 'justify' }} size="sm">
                    {activity?.name}
                  </Text>
                </div>
                <div className="mt-1 p-2">
                  <Text size="xs" fw={700}>
                    Deskripsi kegiatan
                  </Text>
                  <Text style={{ textAlign: 'justify' }} size="sm">
                    {activity?.description}
                  </Text>
                </div>
                <Divider my="md" />
              </div>
            ))
          ) : (
            <div className="w-full col-span-12">
              <section className="min-h-96 flex flex-col items-center justify-center mt-10">
                <img
                  className="w-40 mb-2 bg-slate-200 rounded-full p-2"
                  src="/images/blank-canvas.svg"
                  alt=""
                />
                <span className="font-bold text-slate-400 text-lg">Belum ada data kegiatan</span>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
