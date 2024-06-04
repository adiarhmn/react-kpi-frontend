import { Badge, Button, Divider, Image, Modal, Text, Textarea, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft, IconClock24, IconDeviceTablet, IconMap2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AttendanceType } from '@/features/attendance';
// eslint-disable-next-line no-restricted-imports
import { useGetAttendance } from '@/features/attendance/api/getAttendance';
import { useAuth } from '@/features/auth';
// eslint-disable-next-line no-restricted-imports
import { formatterDate } from '@/features/history/api/getAbsence';

import { useCreateOvertime } from '../api/createOvertime';
import { useUpdateOvertime } from '../api/updateOvertime';
import { OvertimeType } from '../types';

export const AddOvertime: React.FC = () => {
  const [overtimeStatus, setOvertimeStatus] = useState<boolean>(() => {
    const savedState = localStorage.getItem('overtimeStatus');
    return savedState ? JSON.parse(savedState) : false;
  });
  // console.log('status lembur : ', overtimeStatus);
  useEffect(() => {
    localStorage.setItem('overtimeStatus', JSON.stringify(overtimeStatus));
  }, [overtimeStatus]);
  const status = localStorage.getItem('isCheckedIn');
  // const checkInStatus;
  const { creds } = useAuth();
  const [overtime, setOvertime] = useState<OvertimeType>();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      detail: '',
    },
    validate: {
      detail: (value) => (value === '' ? 'harap mengisi detail kegiatan' : null),
    },
  });

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data } = useGetAttendance(creds?.employee_id, formatterDate(currentDate, 'yyyy-MM-dd'));

  useEffect(() => {
    if (data) {
      setAttendance(data[0]);
    }
  }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };
    const intervalId = setInterval(updateCurrentDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // [Button start overtime]
  const mutationAddOvertime = useCreateOvertime();
  const handleOvertime = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const overtimeData = {
      attendance_id: attendance?.id,
      detail: form.values.detail,
    };

    await mutationAddOvertime.mutateAsync(overtimeData, {
      onSuccess: (data) => {
        console.log('Success:', data);

        setOvertime(data.data);
        setOvertimeStatus(true);
        close();
        // console.log('Apakah sudah checkin :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // [End Button start overtime]

  // [Button Stop Overtime]
  const mutationEndOvertime = useUpdateOvertime();

  const handleEndOvertime = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const attendanceCheckOut = {
      overtime_id: overtime?.id,
    };

    await mutationEndOvertime.mutateAsync(attendanceCheckOut, {
      onSuccess: (data) => {
        console.log('Success:', data);
        setOvertimeStatus(false);
        // console.log('Sesudah update  :', localStorage.getItem('isCheckIn'));
      },
    });
  };
  // [End Button Stop Overtime]

  // console.log('data overtime : ', overtime);
  // console.log('Sudah checkin? : ', status);
  // console.log('Data attendance : ', attendance);
  return (
    <main className="min-h-96 relative">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Tambah lembur</h2>
          </div>
        </div>
      </section>

      {/* Card Map */}
      <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Lokasi</span>
          <IconMap2 className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2">
          <Image src="/images/map.png" height={160} alt="Map" />
        </div>
      </section>
      {/* End card map */}

      {/* Absen card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Absensi lembur</span>
          <IconDeviceTablet className="opacity-80" size={20} />
        </div>
        <div className="w-full divide-x divide-gray-300 p-1 -mb-2">
          <div className="ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="auto" fw={700}>
              {formatterDate(currentDate, 'EEEE, dd MMMM yyyy')}
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1 mb-3">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="16px" fw={500}>
                  {formatterDate(currentDate, 'HH:mm')}
                </Text>
              </div>
              <div className=" col-span-6 text-right -mt-6">
                {overtimeStatus != true ? (
                  <Button
                    onClick={open}
                    disabled={status == 'true' || attendance == undefined}
                    className="shadow-lg"
                    style={{ borderRadius: '15px', width: '110px' }}
                    size="sm"
                    color={status != 'true' ? 'green' : 'grey'}
                  >
                    Mulai
                  </Button>
                ) : (
                  <form onSubmit={handleEndOvertime}>
                    {' '}
                    <Button
                      type="submit"
                      className="shadow-lg"
                      style={{ borderRadius: '15px', width: '110px' }}
                      size="sm"
                      color="red"
                    >
                      Selesai
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-7">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Data lembur</span>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color="red"
          >
            belum mulai
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              {formatterDate(currentDate, 'dd')}
            </Text>
            <Text style={{ marginTop: '-5px' }} size="md">
              {formatterDate(currentDate, 'MMM')}
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <div className="ms-2 -mb-2">
              <Text size="xs">Lembur mulai</Text>
              <Text size="sm" fw={700}>
                {overtime != undefined ? formatterDate(overtime.start_time, 'HH:mm') : '-- -- '}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 mb-1">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Lembur selesai</Text>
                <Text size="sm" fw={700}>
                  {/* {formattedTime} */}
                  {overtime != undefined ? formatterDate(overtime.end_time, 'HH:mm') : '-- -- '}
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1"></div>
            </div>
          </div>
        </div>
      </section>
      {/* End absen card */}

      {/* Modal tambah kegiatan lembur */}
      <Modal opened={opened} onClose={close} title="Pengajuan lembur">
        <form onSubmit={handleOvertime}>
          <div className="mb-2">
            <Textarea
              label="Kegiatan"
              placeholder="masukkan kegiatan yang akan dilakukan"
              autosize
              minRows={5}
              {...form.getInputProps('detail')}
            />
          </div>
          <div className="mb-2 mt-3">
            <Button type="submit" fullWidth rightSection={<IconClock24 />}>
              Mulai lembur
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
