/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import { useEffect, useState } from 'react';

import { ScheduleType } from '@/features/attendance';
import { formatterDate } from '@/features/history';
import { useGetScheduleMonthly } from '@/features/schedule/api';
import { useNavigate } from 'react-router-dom';
import { Badge, Text } from '@mantine/core';

type AttendanceProps = {
  month: Date;
  shift: string;
  status: string;
  modalState: boolean;
  employee_id: number | string | undefined;
};

export const AttendanceList: React.FC<AttendanceProps> = ({
  month,
  shift,
  status,
  modalState,
  employee_id,
}: AttendanceProps) => {
  // const { creds } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedule] = useState<ScheduleType[]>([]);
  const [params, setParams] = useState({
    employeeId: employee_id,
    month: month.getMonth() + 1,
    year: month.getFullYear(),
    shift,
    status,
  });

  const { data } = useGetScheduleMonthly(
    params.employeeId,
    params.month,
    params.year,
    params.shift,
    params.status
  );

  useEffect(() => {
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  useEffect(() => {
    const newParams = {
      employeeId: employee_id,
      month: month.getMonth() + 1,
      year: month.getFullYear(),
      shift,
      status,
    };
    setParams(newParams);
  }, [modalState, month]);

  console.log(schedules);

  return (
    <div className="text-center">
      <div className="w-full grid grid-cols-12 px-6">
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className="col-span-6 px-1">
              <button
                onClick={() =>
                  navigate(`/employee-division/attendance/detail`, {
                    state: { schedule: schedule },
                  })
                }
                className={`${schedule.attendance_status == 'Hadir' || schedule?.attendance_status == 'cuti' ? `bg-white` : `bg-gray-100`} mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700`}
              >
                <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
                  {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
                  <div className="col-span-4 text-center -ms-5 mt-4">
                    <Text size="30px" fw={700}>
                      {formatterDate(schedule?.date, 'dd')}
                    </Text>
                    <Text style={{ marginTop: '-5px' }} size="xs">
                      {formatterDate(schedule?.date, 'MMM')}
                    </Text>
                  </div>
                  <div className="col-span-8">
                    <div className="my-auto text-right -mt-3 -me-3">
                      <Badge
                        size="xs"
                        style={{
                          fontSize: '7px',
                          marginTop: '7px',
                          marginLeft: '4px',
                          borderRadius: '2px',
                        }}
                        // color={absence?.status == 'Disetujui' ? 'green' : 'red'}
                        color={
                          schedule?.attendance_status == 'Hadir'
                            ? 'green'
                            : schedule?.attendance_status == 'izin'
                              ? 'yellow'
                              : schedule?.attendance_status == 'sakit'
                                ? 'teal'
                                : schedule?.attendance_status == 'cuti'
                                  ? 'grape'
                                  : 'red'
                        }
                      >
                        {schedule?.attendance_status}
                      </Badge>
                    </div>
                    <div className="my-auto ms-4 mt-1">
                      <Text size="30px" fw={700}>
                        {/* {formatdate(absence?.date_start)} */}
                        {schedule?.shift.shift_code}
                      </Text>
                      <Text size="7px" fw={500}>
                        {/* {formatdate(absence?.date_start)} */}
                        {schedule?.shift.start_time} - {schedule?.shift.end_time}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="text-left -mb-2">
                  <Text style={{ marginLeft: '0px', padding: '8px' }} size="9px" fw={500}>
                    Hari : {formatterDate(schedule?.date, 'EEEE, dd MMM yyyy')}
                  </Text>
                </div>
              </button>
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
              <span className="font-bold text-slate-400 text-xl">Belum ada data absensi</span>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
