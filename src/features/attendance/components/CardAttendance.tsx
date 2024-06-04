import { Badge, Button, Divider, Text } from '@mantine/core';
import { IconArrowBarToLeft, IconArrowBarToRight, IconBan } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { useCreateAttendance } from '../api';
import { useGetAttendance } from '../api/getAttendance';
import { useUpdateAttendance } from '../api/updateAttendance';
import { AttendanceType, ScheduleType } from '../types';

import { CardActivity } from './CardActivity';

type ScheduleProps = {
  schedule: ScheduleType;
  isCheckedIn: boolean;
  setIsCheckIn: (value: boolean) => void;
  long: any;
  lat: any;
  statusLocation: boolean;
};

export const CardAttendance: React.FC<ScheduleProps> = ({
  schedule,
  isCheckedIn,
  setIsCheckIn,
  long,
  lat,
  statusLocation,
}: ScheduleProps) => {
  console.log('status checkin : ', isCheckedIn);

  const [attendance, setAttendance] = useState<AttendanceType>();
  console.log(schedule);
  // const navigate = useNavigate();

  function formatDate(date: string, formatType: string) {
    return format(date, formatType, { locale: id });
  }

  // {BUTTON CHECK-IN}
  const mutationCheckIn = useCreateAttendance();
  const handleCheckIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const attendanceCheckIn = {
      schedule_id: schedule.id,
      employee_id: schedule.employee_schedule.employee_id,
      attendance_lat: lat,
      attendance_lon: long,
    };

    await mutationCheckIn.mutateAsync(attendanceCheckIn, {
      onSuccess: (data) => {
        Swal.fire({
          width: '80%',
          title: 'Check In Berhasil!',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        console.log('Success:', data);
        setAttendance(data.data);
        setIsCheckIn(true);

        // console.log('Apakah sudah checkin :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // {END BUTTON CHECK-IN}

  // {BUTTON CHECK-OUT}
  const mutationCheckOut = useUpdateAttendance();

  const { data } = useGetAttendance(schedule.employee_schedule.employee_id, schedule.date);
  useEffect(() => {
    if (data) {
      setAttendance(data[0]);
    }
  }, [data]);

  const handleCheckOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const attendanceCheckOut = {
      attendance_id: attendance?.id,
    };

    await mutationCheckOut.mutateAsync(attendanceCheckOut, {
      onSuccess: (data) => {
        Swal.fire({
          width: '80%',
          title: 'Check Out Berhasil!',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        console.log('Success:', data);
        setIsCheckIn(false);
        // console.log('Sesudah update  :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // {END BUTTON CHECK-OUT}

  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Absensi</span>

          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={isCheckedIn == false ? 'red' : 'yellow'}
          >
            {isCheckedIn == false ? 'Belum check-in' : 'Sedang bekerja'}
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-3 text-center m-auto p-1">
            <Text size="28px" fw={700}>
              {schedule.shift.shift_code}
            </Text>
            <Text style={{ marginTop: '-5px' }} size="sm">
              {schedule.shift.shift_name}
            </Text>
          </div>
          <div className="col-span-9 ms-2 text-left">
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
          {isCheckedIn == false ? (
            <form onSubmit={handleCheckIn}>
              <Button
                disabled={statusLocation == false}
                type="submit"
                fullWidth
                rightSection={statusLocation == false ? <IconBan /> : <IconArrowBarToRight />}
              >
                {statusLocation == false ? 'Anda berada diluar kantor' : 'Check-in'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCheckOut}>
              <Button type="submit" color="red" fullWidth rightSection={<IconArrowBarToLeft />}>
                Check-out
              </Button>
            </form>
          )}
        </div>
      </section>

      <CardActivity isCheckedIn={isCheckedIn} />
    </>
  );
};
