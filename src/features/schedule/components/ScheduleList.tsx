/* eslint-disable import/order */
import { ScheduleType } from '@/features/attendance';
import { Badge, Divider, Indicator, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar, IconClockHour8 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useGetScheduleDaily, useGetScheduleMonthly } from '../api';
import { AbsenceType, formatterDate, useGetAbsenceMonthly } from '@/features/history';
import { useAuth } from '@/features/auth';
import { useLocation } from 'react-router-dom';

export const ScheduleList: React.FC = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const location = useLocation();
  const { creds } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth() + 1);
    setCurrentYear(date.getFullYear());
  };
  let employeeID: number | undefined = creds?.employee_id;
  if (location.state) {
    employeeID = location.state.employee.id;
  }

  // [RED INDICATOR]
  const [scheduleOff, setScheduleOff] = useState<ScheduleType[]>([]);
  const { data: DataOff } = useGetScheduleMonthly(employeeID, currentMonth, currentYear, '', 'off');
  useEffect(() => {
    if (DataOff) {
      setScheduleOff(DataOff);
    }
  }, [DataOff]);

  const datesArray = scheduleOff.map((item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    const month = date.getMonth();
    return { day, month };
  });
  // [END RED INDICATOR]

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

  const generateDateRange = (start: Date | string, end: Date | string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    // eslint-disable-next-line prefer-const
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  // [TEAL INDICATOR]
  const [requestSick, setRequestSick] = useState<AbsenceType[]>([]);
  const [formattedAllDates, setFormattedAllDates] = useState([]);
  const { data: DataRequest } = useGetAbsenceMonthly(
    employeeID,
    currentMonth,
    currentYear,
    'sakit',
    'Disetujui'
  );
  useEffect(() => {
    if (DataRequest) {
      setRequestSick(DataRequest);
    }
  }, [DataRequest, currentMonth]);

  useEffect(() => {
    const allDates = requestSick.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const formattedDates = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1, // getMonth() mengembalikan bulan dari 0-11, jadi tambahkan 1
      year: date.getFullYear(),
    }));

    setFormattedAllDates(formattedDates);
  }, [requestSick]);
  // [END TEAL INDICATOR]

  // [YELLOW INDICATOR]
  const [requestLeave, setRequestLeave] = useState<AbsenceType[]>([]);
  const [leaveDates, setLeaveDates] = useState([]);
  const { data: DataLeave } = useGetAbsenceMonthly(
    employeeID,
    currentMonth,
    currentYear,
    'izin',
    'Disetujui'
  );
  useEffect(() => {
    if (DataLeave) {
      setRequestLeave(DataLeave);
    }
  }, [DataLeave, currentMonth]);

  useEffect(() => {
    const allDates = requestLeave.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const leaveDate = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }));

    setLeaveDates(leaveDate);
  }, [requestLeave]);
  // [END YELLOW INDICATOR]

  // [GRAPE INDICATOR]
  const [paidLeave, setPaidLeave] = useState<AbsenceType[]>([]);
  const [paidLeaveDates, setPaidLeaveDates] = useState([]);
  const { data: DataPaidLeave } = useGetAbsenceMonthly(
    employeeID,
    currentMonth,
    currentYear,
    'cuti',
    'Disetujui'
  );
  useEffect(() => {
    if (DataPaidLeave) {
      setPaidLeave(DataPaidLeave);
    }
  }, [DataPaidLeave, currentMonth]);

  useEffect(() => {
    const allDates = paidLeave.reduce((acc: any, item: any) => {
      const dates: any = generateDateRange(item.date_start, item.date_end);
      return acc.concat(dates);
    }, []);

    const paidLeaveDate = allDates.map((date: any) => ({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }));

    setPaidLeaveDates(paidLeaveDate);
  }, [paidLeave]);
  // [END GRAPE INDICATOR]

  console.log('Schedule off : ', scheduleOff);
  // console.log('Dates array : ', datesArray);
  console.log('Request off: ', requestSick);
  console.log('Tanggal izin ', leaveDates);
  console.log(currentMonth);
  console.log(currentYear);
  console.log('Date off :', formattedAllDates);

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
              const showIndicatorOff = datesArray.some((d) => d.day === day && d.month === month);
              const showIndicatorAbsence = formattedAllDates.some(
                (d: any) => d.day === day && d.month === month + 1
              );
              const showIndicatorLeave = leaveDates.some(
                (d: any) => d.day === day && d.month === month + 1
              );
              const showIndicatorPaidLeave = paidLeaveDates.some(
                (d: any) => d.day === day && d.month === month + 1
              );

              // console.log(showIndicatorAbsence);

              return (
                <div>
                  <div style={{ position: 'relative' }}>
                    {showIndicatorAbsence && (
                      <Indicator
                        size={6}
                        color="teal"
                        offset={-9}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      ></Indicator>
                    )}
                    <div>{day}</div>
                    {showIndicatorOff && (
                      <Indicator
                        size={6}
                        color="red"
                        offset={-9}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                    {showIndicatorLeave && (
                      <Indicator
                        size={6}
                        color="yellow"
                        offset={-9}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                    {showIndicatorPaidLeave && (
                      <Indicator
                        size={6}
                        color="grape"
                        offset={-9}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
        <div className="mt-2 mb-2 px-4">
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              <Indicator className="mt-2" color="red" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Libur
              </Text>
            </div>
            <div className="col-span-1">
              <Indicator className="mt-2" color="yellow" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Izin
              </Text>
            </div>
            <div className="col-span-1">
              <Indicator className="mt-2" color="teal" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Sakit
              </Text>
            </div>
            <div className="col-span-1">
              <Indicator className="mt-2" color="grape" position="middle-center"></Indicator>
            </div>
            <div className="col-span-2">
              <Text className="" size={'xs'} c="dimmed">
                Cuti
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4">
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
    </>
  );
};
