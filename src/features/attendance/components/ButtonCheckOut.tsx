import { Button } from '@mantine/core';
import { AttendanceType, ScheduleType } from '../types';
import { useCreateAttendance } from '../api';
import { IconArrowBarToLeft, IconArrowBarToRight } from '@tabler/icons-react';
import { useUpdateAttendance } from '../api/updateAttendance';
import { useEffect, useState } from 'react';
import { useGetAttendance } from '../api/getAttendance';

type ScheduleProps = {
  schedule: ScheduleType;
};
export const ButtonCheckOut: React.FC<ScheduleProps> = ({ schedule }) => {
  const mutationCheckOut = useUpdateAttendance();
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const [isCheckIn, setCheckIn] = useState<string | null>(localStorage.getItem('isCheckIn'));
  const { data, isLoading, error } = useGetAttendance(
    schedule.employee_schedule.employee_id,
    schedule.date
  );
  useEffect(() => {
    if (data) {
      setAttendance(data);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('isCheckIn', isCheckIn);
    console.log(localStorage.getItem('isCheckIn'));
  }, [isCheckIn]);
  // const dataAttendance = data;
  console.log('data Attendance : ', attendance);

  const handleCheckOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Checkout button 1 :', isCheckIn);
    const attendanceCheckOut = {
      attendance_id: attendance[0].id,
    };

    await mutationCheckOut.mutateAsync(attendanceCheckOut, {
      onSuccess: (data) => {
        console.log('Success:', data);
        setCheckIn('yes');
        console.log('Checkout button 2 :', isCheckIn);
      },
    });
  };
  return (
    <>
      <form onClick={handleCheckOut}>
        <Button type="submit" color="red" fullWidth rightSection={<IconArrowBarToLeft />}>
          Check-out
        </Button>
      </form>
    </>
  );
};
