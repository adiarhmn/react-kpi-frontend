/* eslint-disable import/order */
import { Badge, Button, Divider, Text } from '@mantine/core';
import { IconCalendarEvent, IconChevronLeft, IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSchedule } from '../api';
import { useGetActivityAlias, useGetActivityDetail } from '../api/getActivity';
import { useGetAttendance } from '../api/getAttendance';
import { ActivityDetailType, AttendanceType, ScheduleType } from '../types';
import { formatterDate } from '@/features/history';

export const AttendanceInfo: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: dataAttendance } = useGetAttendance(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataAttendance) {
      setAttendance(dataAttendance);
    }
  }, [dataAttendance]);

  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: dataSchedule } = useGetSchedule(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataSchedule) {
      setSchedule(dataSchedule[0]);
    }
  }, [dataSchedule]);

  // [All about  Activity Alias]
  const [activityAlias, setActivityAlias] = useState([]);
  const { data: dataActivityAlias } = useGetActivityAlias(creds?.company_id);
  useEffect(() => {
    if (dataActivityAlias) {
      setActivityAlias(dataActivityAlias);
    }
  }, [dataActivityAlias]);
  // [End Activity Alias]

  // [All about Activity Detail]
  const [activityDetail, setActivityDetail] = useState<ActivityDetailType[]>([]);
  const { data: dataActivity } = useGetActivityDetail(
    creds?.employee_id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataActivity) {
      setActivityDetail(dataActivity);
    }
  }, [dataActivity]);
  // [End Activity Detail]

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
        <div className="flex justify-between text-base items-center p-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={
              attendance?.check_in == null
                ? 'red'
                : attendance?.check_out == null
                  ? 'yellow'
                  : 'green'
            }
          >
            {attendance?.check_in == null
              ? 'Belum CheckIn'
              : attendance?.check_out == null
                ? 'Sedang Bekerja'
                : 'Selesai bekerja'}
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
              <Text size="auto" fw={700}>
                {formatterDate(new Date(), 'EEEE, dd MMMM yyyy')}
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

      {/* Tugas card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Kegiatan hari ini</span>
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          {activityDetail.length > 0 ? (
            activityDetail.map((activity, index) => (
              <section
                key={index}
                className="bg-white mx-auto max-w-xs w-full z-50 relative  p-2 px-2 text-slate-700 "
              >
                <div className="flex justify-between text-xs items-center mb-2">
                  <span className="text-sm font-bold text-blue-700">Kegiatan {index + 1}</span>
                  <Button
                    onClick={() =>
                      navigate(`/activity/detail/`, {
                        state: {
                          activity: activity,
                          alias: activityAlias[0],
                          index: index,
                        },
                      })
                    }
                    variant="transparent"
                    className="shadow-xs "
                    size="xs"
                  >
                    <IconInfoCircle size={18} />
                  </Button>
                </div>
                <div className="grid grid-cols-12 gap-x-2">
                  {activityDetail != null && activityAlias[0] != null
                    ? Array.from(
                        { length: 10 },
                        (_, i) =>
                          activityAlias[0][`cs${i + 1}_name`] != '' && (
                            <div key={i} className="mb-1 col-span-6 w-full">
                              <Text size="xs" fw={700}>
                                {activityAlias[0][`cs${i + 1}_name`]}
                              </Text>
                              <Text truncate="end" style={{ textAlign: 'left' }} size="xs">
                                {activity[`custom${i + 1}`]}
                              </Text>
                            </div>
                          )
                      )
                    : ''}
                </div>
                <div className="text-right mt-2 me-2">
                  <Text truncate="end" size="xs">
                    {formatterDate(new Date(activity['created_at'] ?? 0), 'HH:mm')}
                  </Text>
                </div>
                <Divider size={'xs'} className="mt-4" />
              </section>
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
      {/* End tugas card */}
    </main>
  );
};
