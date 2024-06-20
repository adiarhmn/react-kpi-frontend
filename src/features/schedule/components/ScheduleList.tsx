/* eslint-disable import/order */
import { ScheduleType } from '@/features/attendance';
import { Badge, Divider, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar, IconClockHour8 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useGetScheduleDaily, useGetScheduleMonthly } from '../api';
import { formatterDate } from '@/features/history';
import { useAuth } from '@/features/auth';

export const ScheduleList: React.FC = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const { creds } = useAuth();

  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule, refetch: RefetchSchedule } = useGetScheduleDaily(
    creds?.employee_id,
    formatterDate(dateValue, 'yyyy-MM-dd')
  );
  useEffect(() => {
    RefetchSchedule();
    if (DataSchedule) {
      setSchedule(DataSchedule[0]);
    }
  }, [DataSchedule, dateValue]);

  // const [scheduleOff, setScheduleOff] = useState<ScheduleType[]>([]);
  // const { data: DataScheduleOff } = useGetScheduleMonthly(
  //   creds?.employee_id,
  //   formatterDate(dateValue, 'MM'),
  //   formatterDate(dateValue, 'yyyy'),
  //   '',
  //   'off'
  // );
  // useEffect(() => {
  //   if (DataScheduleOff) {
  //     setScheduleOff(DataScheduleOff);
  //   }
  // }, [DataScheduleOff]);

  console.log('Tanggal :', dateValue);
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
          <DatePicker value={dateValue} onChange={setDateValue} />
        </div>
      </section>

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
