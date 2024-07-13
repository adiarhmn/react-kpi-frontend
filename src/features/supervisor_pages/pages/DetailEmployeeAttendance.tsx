/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import {
  ActivityDetailType,
  AttendanceType,
  ScheduleType,
  useGetAttendanceBySchedule,
  useGetSchedule,
} from '@/features/attendance';
import { useGetActivityAlias, useGetActivityDetail } from '@/features/attendance/api/getActivity';
import { useGetEmployee } from '@/features/employee/api/Profile';
import { formatterDate } from '@/features/history';
import { useGetScheduleDaily } from '@/features/schedule/api';
import { Badge, Button, Divider, Loader, Text } from '@mantine/core';
import { IconChevronLeft, IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const DetailEmployeeAttendance: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const attendance = location.state.attendance as AttendanceType;

  // [GET EMPLOYEE]
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee, isLoading: LoadingEmployee } = useGetEmployee(attendance.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  // [END GET EMPLOYEE]

  // [GET SCHEDULE]
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: dataSchedule, isLoading: LoadingSchedule } = useGetScheduleDaily(
    employee?.id,
    formatterDate(new Date(attendance.check_in), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataSchedule) {
      setSchedule(dataSchedule[0]);
    }
  }, [dataSchedule]);
  console.log('Data Schedule', schedule);
  // [END GET SCHEDULE]

  // [All about  Activity Alias]
  const [activityAlias, setActivityAlias] = useState([]);
  const { data: dataActivityAlias } = useGetActivityAlias(employee?.user.company_id);
  useEffect(() => {
    if (dataActivityAlias) {
      setActivityAlias(dataActivityAlias);
    }
  }, [dataActivityAlias]);
  // [End Activity Alias]

  // [All about Activity Detail]
  const [activityDetail, setActivityDetail] = useState<ActivityDetailType[]>([]);
  const { data: dataActivity } = useGetActivityDetail(
    employee?.id,
    formatterDate(new Date(attendance.id), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataActivity) {
      setActivityDetail(dataActivity);
    }
  }, [dataActivity]);
  // [End Activity Detail]

  if (LoadingSchedule && LoadingEmployee) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

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
            <h2 className="font-semibold ">Data absensi</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2">
        <div className="flex justify-between text-base items-center py-1 px-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <div>
            <Badge
              size="sm"
              style={{
                marginLeft: '4px',
                borderRadius: '2px',
              }}
              color={
                attendance?.status == 'present'
                  ? 'green'
                  : attendance?.status == 'late'
                    ? 'yellow'
                    : 'red'
              }
            >
              {attendance?.status == 'present'
                ? 'hadir'
                : attendance?.status == 'late'
                  ? 'terlambat'
                  : 'belum hadir'}
            </Badge>
          </div>
        </div>
        <Divider size={'sm'} />
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
                {formatterDate(new Date(attendance.check_in), 'EEEE, dd MMMM yyyy')}
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
        <Divider className='mt-2 mb-2' size={'sm'} />
      </section>

      {/* <ActivityCard employee={scheduleData.employee_schedule.employee} /> */}

      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Kegiatan</span>
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          {activityDetail.length > 0 ? (
            activityDetail.map((activity, index) => (
              <section
                key={index}
                className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 "
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
                <div className="grid grid-cols-12">
                  {activityDetail != null && activityAlias[0] != null
                    ? Array.from(
                        { length: 10 },
                        (_, i) =>
                          activityAlias[0][`cs${i + 1}_name`] != '' && (
                            <div key={i} className="mb-1 col-span-6 w-full">
                              <Text size="xs" fw={700}>
                                {activityAlias[0][`cs${i + 1}_name`]}
                              </Text>
                              <Text style={{ textAlign: 'left' }} size="xs">
                                {activity[`custom${i + 1}`]}
                              </Text>
                            </div>
                          )
                      )
                    : ''}
                </div>
                <Divider size={'xs'} className="mt-4" />
              </section>
            ))
          ) : (
            <div className="w-full col-span-12">
              <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-10">
                <img
                  className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                  src="/images/blank-canvas.svg"
                  alt=""
                />
                <span className="font-bold text-slate-400 text-sm">Belum ada data kegiatan</span>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
