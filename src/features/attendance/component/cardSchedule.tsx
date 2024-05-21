import { Badge, Button, Divider, Loader, Text } from '@mantine/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useGetSchedule } from '../api';
import { AttendanceType, ScheduleType } from '../types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconArrowBarToRight } from '@tabler/icons-react';

const BaseURL = import.meta.env.VITE_API_URL;

export const huahahaha: React.FC = () => {
  const navigate = useNavigate();
  const currentDate: Date = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd', { locale: id });
  const dateNow = format(currentDate, 'yyyy-MM-dd', { locale: id });
  const { data, error, isLoading } = useGetSchedule(1, dateNow);
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);

  const createAttendance = async (attendanceDataPost: AttendanceType) => {
    const response = await axios.post(`${BaseURL}/request`, attendanceDataPost);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createAttendance,
    onSuccess: (data) => {
      console.log(data);
      if (data.status == 201) {
        navigate(-1);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      setSchedule(data);
      // setShift(data.shift);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const absenceData = {
      schedule_id: schedule[0].id,
      employee_id: schedule[0].employee_schedule.employee_id,
    };
    mutation.mutateAsync(absenceData);
  };

  console.log(schedule[0]);

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
          color="red"
        >
          belum check-in
        </Badge>
      </div>
      <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
        <div className="col-span-2 text-center m-auto p-1">
          <Text size="23px" fw={700}>
            {schedule[0].shift.shift_code}
          </Text>
          <Text style={{ marginTop: '-5px' }} size="sm">
            Pagi
          </Text>
        </div>
        <div className="col-span-10 ms-2 text-left">
          <div className="ms-2 -mb-2">
            <Text size="xs">Tanggal</Text>
            <Text size="sm" fw={700}>
              {schedule[0].date}
            </Text>
          </div>
          <Divider my="sm" />
          <div className="-mt-2 w-full grid grid-cols-12 mb-1">
            <div className="col-span-6 text-left mt-1 ms-2">
              <Text size="xs">Jam kerja</Text>
              <Text size="sm" fw={700}>
                {schedule[0].shift.start_time} - {schedule[0].shift.end_time}
              </Text>
            </div>
            <div className="col-span-6 text-right -mt-1"></div>
          </div>
        </div>
      </div>
      <div className="p-2 mt-2">
        {/* <form onClick={handleSubmit}> */}
        <Button type="submit" fullWidth rightSection={<IconArrowBarToRight />}>
          Check-in
        </Button>
        {/* </form> */}
      </div>
    </section>
  );
};
