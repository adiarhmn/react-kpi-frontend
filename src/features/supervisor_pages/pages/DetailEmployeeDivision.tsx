/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import { AttendanceType, ScheduleType, useGetAttendance } from '@/features/attendance';
import { ActivityCard } from '@/features/components';
import { formatterDate } from '@/features/history';
import { useGetScheduleDaily } from '@/features/schedule/api';
import { Anchor, Badge, Divider, Group, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const DetailEmployeeDivision: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state.employee as EmployeeType;

  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule } = useGetScheduleDaily(
    employee.id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataSchedule) {
      setSchedule(DataSchedule[0]);
    }
  }, [DataSchedule]);

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendance } = useGetAttendance(
    employee?.id,
    formatterDate(new Date(), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data karyawan</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
        <div className="flex justify-between items-center text-blue-700">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Biodata
            </Text>
          </div>
          <span className="font-semibold"></span>
        </div>
        <div className="grid grid-cols-12 px-2">
          <div className="col-span-4 px-2 flex items-left">
            <img className="w-full rounded-lg p-2" src="/images/profile-pic.svg" alt="" />
          </div>
          <div className="col-span-8">
            <div className="mt-2">
              <Text size="auto" fw={700}>
                {employee.name}
              </Text>
            </div>
            <div>
              <Text size="xs" c="grey" fw={700}>
                {employee.user.role}
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Jadwal hari ini
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
              color={schedule?.attendance_place == 'WFO' ? 'blue' : 'yellow'}
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
                  {schedule?.date != null
                    ? formatterDate(schedule.date, 'EEEE, dd MMMM yyyy')
                    : '-'}
                </Text>
              </div>
              <Divider my="sm" />
              <div className="-mt-2 w-full grid grid-cols-12 mb-1">
                <div className="col-span-6 text-left mt-1 ms-2">
                  <Text size="xs">Jam kerja</Text>
                  <Text size="sm" fw={700}>
                    {/* {schedule?.shift.start_time != undefined
                      ? formatterDate(new Date(schedule?.shift.start_time), 'HH:mm')
                      : '-- --'} */}
                    {schedule?.shift.start_time} - {schedule?.shift.end_time}
                  </Text>
                </div>
                <div className="col-span-6 text-right -mt-1"></div>
              </div>
            </div>
          </div>
          <div className="text-center text-xs divide-x divide-gray-300 p-2">
            <Group justify="center">
              <Anchor
                size="sm"
                onClick={() =>
                  navigate(`/employee-division/schedule`, { state: { employee: employee } })
                }
                target="_blank"
                underline="always"
              >
                Lihat jadwal bulanan
              </Anchor>
              {/* <IconCalendar color="blue" className="-ms-2" /> */}
            </Group>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2">
        <div className="flex justify-between text-base items-center p-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <Badge
            size="xs"
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
              ? 'Belum CheckIn'
              : attendance?.check_out == null
                ? 'Sedang Bekerja'
                : 'Selesai bekerja'}
          </Badge>
        </div>
        <Divider size={'sm'} />
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-3 text-center m-auto ">
            <Text size="27px" fw={700}>
              {schedule?.shift.shift_code}
            </Text>
            <Text style={{ marginTop: '-5px' }} size="sm">
              {schedule?.shift.shift_name}
            </Text>
          </div>
          <div className="col-span-9 ms-2 text-left">
            <div className="ms-2">
              <Text size="xs">Tanggal</Text>
              <Text size="sm" fw={700}>
                {formatterDate(new Date(), 'EEEE, dd MMMM yyyy')}
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
        <Divider size={'sm'} className="mt-2" />
        <div className="text-center text-xs divide-x divide-gray-300 p-2">
          <Group justify="center">
            <Anchor
              size="sm"
              onClick={() =>
                navigate(`/employee-division/attendance`, { state: { employee: employee } })
              }
              target="_blank"
              underline="always"
            >
              Lihat riwayat absen
            </Anchor>
            {/* <IconCalendar color="blue" className="-ms-2" /> */}
          </Group>
        </div>
      </section>

      <ActivityCard employee={employee} date={new Date()} />
    </main>
  );
};
