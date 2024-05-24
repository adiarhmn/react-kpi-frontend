import { Badge, Button, Divider, Text } from '@mantine/core';
import { ScheduleType } from '../types';
import { useCreateAttendance } from '../api';
import { useNavigate } from 'react-router-dom';
import { IconArrowBarToLeft, IconArrowBarToRight } from '@tabler/icons-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ButtonCheckIn } from './ButtonCheckIn';
import { ButtonCheckOut } from './ButtonCheckOut';

type ScheduleProps = {
  schedule: ScheduleType;
};

export const CardAttendance: React.FC<ScheduleProps> = ({ schedule }: ScheduleProps) => {
  const mutationCheckOut = useCreateAttendance();
  // const [attendanceId, setAttendanceId] = useState();
  const [isCheckIn, setIsCheckIn] = useState(localStorage.getItem('isCheckin'));
  console.log('Apakah sudah checkin? :', isCheckIn);
  console.log(schedule);
  const navigate = useNavigate();
  // const [isCheckIn, setCheckIn] = useState(false);

  function formatDate(date: string, formatType: string) {
    return format(date, formatType, { locale: id });
  }
  // console.log(schedule);

  // const handleCheckOut = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('checkout button');
  //   const attendanceCheckOut = {
  //     schedule_id: schedule.id,
  //     employee_id: schedule.employee_schedule.employee_id,
  //   };

  //   await mutationCheckOut.mutateAsync(attendanceCheckOut, {
  //     onSuccess: (data) => {
  //       setAttendanceId(data.id);
  //       console.log('Success:', data);
  //       console.log('Attendance ID', data.id);
  //       setCheckIn(false);
  //     },
  //   });
  // };

  // const handleCheckIn = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('Checkin button');
  //   const attendanceCheckIn = {
  //     schedule_id: schedule.id,
  //     employee_id: schedule.employee_schedule.employee_id,
  //   };

  //   await mutationCheckIn.mutateAsync(attendanceCheckIn, {
  //     onSuccess: (data) => {
  //       console.log('Success:', data);
  //       setCheckIn(true);
  //     },
  //   });

  console.log('Status checkIn :', isCheckIn);

  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
      <div className="flex justify-between text-xs items-center p-2">
        <span className="font-bold text-blue-700">Absensi</span>

        <Badge
          size="xs"
          style={{
            marginLeft: '4px',
            borderRadius: '2px',
          }}
          // color={isCheckIn == true ? 'red' : 'yellow'}
        >
          {/* {isCheckIn == true ? 'Belum check-in' : 'Sedang bekerja'} */}
        </Badge>
      </div>
      <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
        <div className="col-span-2 text-center m-auto p-1">
          <Text size="28px" fw={700}>
            {schedule.shift.shift_code}
          </Text>
          <Text style={{ marginTop: '-5px' }} size="sm">
            {schedule.shift.shift_name}
          </Text>
        </div>
        <div className="col-span-10 ms-2 text-left">
          <div className="ms-2 -mb-2">
            <Text size="xs">Tanggal</Text>
            <Text size="sm" fw={700}>
              {formatDate(schedule.date, 'EEEE, dd MMM yyyy')}
            </Text>
          </div>
          <Divider my="sm" />
          <div className="-mt-2 w-full grid grid-cols-12 mb-1">
            <div className="col-span-6 text-left mt-1 ms-2">
              <Text size="xs">Jam kerja</Text>
              <Text size="sm" fw={700}>
                {schedule.shift.start_time} - {schedule.shift.end_time}
              </Text>
            </div>
            <div className="col-span-6 text-right -mt-1"></div>
          </div>
        </div>
      </div>
      <div className="p-2 mt-2">
        {isCheckIn == 'no' ? (
          <ButtonCheckIn schedule={schedule} />
        ) : (
          <ButtonCheckOut schedule={schedule} />
        )}
      </div>
    </section>
  );
};