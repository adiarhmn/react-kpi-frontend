import { Badge, Button, Divider, Text, em } from '@mantine/core';
import { IconBan, IconCircleCheck, IconDoorEnter, IconDoorExit } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

import { useAuth } from '@/features/auth';

import { useCreateAttendance } from '../api';
import { useUpdateAttendance } from '../api/updateAttendance';
import { AttendanceType, EmployeeLocationType, ScheduleType } from '../types';

type ScheduleProps = {
  schedule: ScheduleType;
  refetchAttendance: () => any;
  attendance: AttendanceType | undefined;
  long: any;
  lat: any;
  statusLocation: boolean;
  attendance_location_id?: number;
  employee_location: EmployeeLocationType[] | undefined;
};

export const CardAttendance: React.FC<ScheduleProps> = ({
  schedule,
  refetchAttendance,
  attendance,
  long,
  lat,
  statusLocation,
  attendance_location_id,
  employee_location,
}: ScheduleProps) => {
  const { creds } = useAuth();

  function formatDate(date: string, formatType: string) {
    return format(date, formatType, { locale: id });
  }

  // {BUTTON CHECK-IN}
  const mutationCheckIn = useCreateAttendance();
  const handleCheckIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const attendanceCheckIn = {
      schedule_id: schedule.id,
      employee_id: creds?.employee_id,
      attendance_lat: lat.toString(),
      attendance_lon: long.toString(),
      attendance_location_id: attendance_location_id,
      company_id: creds?.company_id,
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
        refetchAttendance();
      },
    });
  };
  // {END BUTTON CHECK-IN}

  // {BUTTON CHECK-OUT}
  const mutationCheckOut = useUpdateAttendance();

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
        refetchAttendance();
      },
    });
  };
  // {END BUTTON CHECK-OUT}

  return (
    <>
      {schedule != null ? (
        <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
          <div className="flex justify-between text-xs items-center p-2">
            <span className="text-base font-bold text-blue-700">Absensi</span>
            <div>
              {schedule?.attendance_status != 'Belum Hadir' && (
                <Badge
                  size="sm"
                  className="uppercase"
                  style={{
                    marginTop: '7px',
                    marginLeft: '4px',
                    borderRadius: '2px',
                  }}
                  color={
                    schedule?.attendance_status == 'cuti'
                      ? 'grape'
                      : schedule?.attendance_status == 'sakit'
                        ? 'teal'
                        : schedule?.attendance_status == 'izin'
                          ? 'yellow'
                          : 'blue'
                  }
                >
                  {schedule?.attendance_status}
                </Badge>
              )}
              <Badge
                size="sm"
                style={{
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color={
                  attendance?.check_in == null
                    ? 'red'
                    : attendance?.check_out == null
                      ? 'yellow'
                      : 'green'
                }
              >
                {attendance?.check_in == null
                  ? 'Belum check-in'
                  : attendance?.check_out == null
                    ? 'Sedang bekerja'
                    : 'Selesai bekerja'}
              </Badge>
            </div>
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
            {attendance?.check_in == null ? (
              <form onSubmit={handleCheckIn}>
                <Button
                  disabled={
                    statusLocation == false ||
                    employee_location == null ||
                    schedule.attendance_status != 'Belum Hadir' ||
                    schedule.status == 'off'
                  }
                  type="submit"
                  fullWidth
                  rightSection={
                    statusLocation == false || schedule.attendance_status != 'Belum Hadir' ? (
                      <IconBan />
                    ) : (
                      <IconDoorEnter />
                    )
                  }
                >
                  {employee_location == null
                    ? 'Lokasi anda belum ditentukan'
                    : statusLocation == false
                      ? 'Anda berada di luar kantor'
                      : schedule.attendance_status === 'Belum Hadir'
                        ? 'Check-in'
                        : schedule.attendance_status === 'Hadir'
                          ? 'Anda sudah absen hari ini'
                          : `Status anda sedang ${schedule.attendance_status}`}
                </Button>
              </form>
            ) : attendance?.check_out == null ? (
              <form onSubmit={handleCheckOut}>
                <Button type="submit" color="red" fullWidth rightSection={<IconDoorExit />}>
                  Check-out
                </Button>
              </form>
            ) : (
              <Button disabled fullWidth rightSection={<IconCircleCheck />}>
                Anda sudah absen hari ini
              </Button>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
          <div className="flex justify-between text-xs items-center p-2">
            <span className="text-base font-bold text-blue-700">Absensi</span>
          </div>
          <div className="w-full col-span-12 -mt-20 -mb-20">
            <div className="min-h-96 flex flex-col items-center justify-center -mb-2">
              <img
                className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                src="/images/blank-canvas.svg"
                alt=""
              />
              <span className="font-bold text-slate-400 text-base">Belum ada jadwal</span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
