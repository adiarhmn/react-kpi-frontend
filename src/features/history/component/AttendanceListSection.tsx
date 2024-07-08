/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { ScheduleType, useGetAttendance } from '@/features/attendance';
import { useAuth } from '@/features/auth';
import { useGetScheduleAttendance, useGetScheduleDaily } from '@/features/schedule/api';
import { Badge, Divider, Indicator, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar, IconClockHour8 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { formatterDate } from '../api';
import { AttendanceType, EmployeeType } from '@/admin_features/types';
import { ActivityCard } from '@/features/components';
import { useGetEmployee } from '@/features/employee/api/Profile';

type AttendanceListSectionProps = {
  employee_id?: number;
  with_activity?: boolean;
};

export const AttendanceListSection: React.FC<AttendanceListSectionProps> = ({
  employee_id,
  with_activity = true,
}: AttendanceListSectionProps) => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const { creds } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth() + 1);
    setCurrentYear(date.getFullYear());
  };

  const employeeID: number | undefined = employee_id;

  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(employeeID);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  console.log('EMPLOYEEEE : ', employee);
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule, refetch: RefetchSchedule } = useGetScheduleDaily(
    employeeID,
    formatterDate(dateValue, 'yyyy-MM-dd')
  );
  useEffect(() => {
    RefetchSchedule();
    if (DataSchedule) {
      setSchedule(DataSchedule[0]);
    }
  }, [DataSchedule, dateValue]);

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: dataAttendance } = useGetAttendance(
    creds?.employee_id,
    formatterDate(dateValue, 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (dataAttendance) {
      setAttendance(dataAttendance);
    }
  }, [dataAttendance, dateValue]);

  // [Hadir]
  const [schedulePresent, setSchedulePresent] = useState<ScheduleType[]>([]);
  const { data: DataPresent } = useGetScheduleAttendance(
    employeeID,
    currentMonth,
    currentYear,
    'Hadir'
  );
  useEffect(() => {
    if (DataPresent) {
      setSchedulePresent(DataPresent);
    }
  }, [DataPresent]);

  const datesArray = schedulePresent.map((item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    const month = date.getMonth();
    return { day, month };
  });
  // [END Hadir]

  // [Cuti]
  const [schedulePaidLeave, setSchedulePaidLeave] = useState<ScheduleType[]>([]);
  const { data: DataPaidLeave } = useGetScheduleAttendance(
    employeeID,
    currentMonth,
    currentYear,
    'cuti'
  );
  useEffect(() => {
    if (DataPaidLeave) {
      setSchedulePaidLeave(DataPaidLeave);
    }
  }, [DataPaidLeave]);

  const datesPaidLeave = schedulePaidLeave.map((item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    const month = date.getMonth();
    return { day, month };
  });
  // [END Cuti]

  console.log(dateValue);

  return (
    <>
      <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Kalender
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <IconCalendar />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="flex justify-center">
          <DatePicker
            value={dateValue}
            onChange={setDateValue}
            onNextMonth={handleMonthChange}
            onPreviousMonth={handleMonthChange}
            renderDay={(date) => {
              const day = date.getDate();
              const month = date.getMonth();
              const showGreenBackground = datesArray.some(
                (d) => d.day === day && d.month === month
              );
              const showYellowBackground = datesPaidLeave.some(
                (d) => d.day === day && d.month === month
              );
              const isSelected = dateValue && date.toDateString() === dateValue.toDateString();
              return (
                <div style={{ position: 'relative' }}>
                  <div
                    className={`${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : showGreenBackground
                          ? 'bg-green-600 text-white'
                          : showYellowBackground
                            ? 'bg-emerald-800 text-white'
                            : ''
                    } rounded w-9 h-9 flex items-center justify-center`}
                  >
                    {day}
                  </div>
                </div>
              );
            }}
          />
        </div>
        <div className="mt-2 mb-2 px-4">
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              <Indicator className="mt-2" color="#16a34a" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Hadir
              </Text>
            </div>
            <div className="col-span-1">
              <Indicator className="mt-2" color="#065f46" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Cuti
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Absensi
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
            {schedule?.attendance_status != 'Hadir' &&
              schedule?.attendance_status != 'Belum Hadir' && (
                <Badge
                  size="sm"
                  className="uppercase"
                  style={{
                    marginTop: '7px',
                    marginLeft: '4px',
                    borderRadius: '2px',
                  }}
                  color={
                    schedule?.attendance_status == 'izin'
                      ? 'yellow'
                      : schedule?.attendance_status == 'sakit'
                        ? 'teal'
                        : 'grape'
                  }
                >
                  {schedule?.attendance_status}
                </Badge>
              )}
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
                  {schedule != undefined
                    ? formatterDate(new Date(schedule?.date), 'EEEE, dd MMMM yyyy')
                    : '--'}
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
          <div className="grid grid-cols-2 text-xs divide-x divide-gray-300 p-2 mt-2">
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

      {
        // Activity Card
        with_activity && <ActivityCard employee={employee} date={dateValue} />
      }
    </>
  );
};
