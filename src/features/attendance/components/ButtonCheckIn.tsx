import { Button } from '@mantine/core';
import { AttendanceType, ScheduleType } from '../types';
import { useCreateAttendance, useGetSchedule } from '../api';
import { IconArrowBarToRight } from '@tabler/icons-react';
import { useGetAttendance } from '../api/getAttendance';
import { useEffect, useState } from 'react';

type ScheduleProps = {
  schedule: ScheduleType;
};
export const ButtonCheckIn: React.FC<ScheduleProps> = ({ schedule }) => {
  const mutationCheckIn = useCreateAttendance();
  const [isCheckIn, setCheckIn] = useState('no');
  useEffect(() => {
    localStorage.setItem('isCheckIn', isCheckIn);
    console.log(localStorage.getItem('isCheckIn'));
  }, [isCheckIn]);
  const handleCheckIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Checkin button');
    const attendanceCheckIn = {
      schedule_id: schedule.id,
      employee_id: schedule.employee_schedule.employee_id,
    };

    await mutationCheckIn.mutateAsync(attendanceCheckIn, {
      onSuccess: (data) => {
        console.log('Success:', data);
        setCheckIn('yes');
      },
    });
  };
  return (
    <>
      <form onClick={handleCheckIn}>
        <Button type="submit" fullWidth rightSection={<IconArrowBarToRight />}>
          Check-in
        </Button>
      </form>
    </>
  );
};
