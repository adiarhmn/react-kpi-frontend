import {
  Button,
  Text,
  Image,
  Badge,
  Modal,
  Divider,
  Input,
  JsonInput,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowBarToRight, IconMap2 } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AttendanceType, ScheduleType } from '../types';
import { useGetScheduleDaily } from '@/features/schedule/api';

const BaseURL = import.meta.env.VITE_API_URL;

export const Attendance: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const currentDate: Date = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd', { locale: id });
  const dateNow = format(currentDate, 'yyyy-MM-dd', { locale: id });
  console.log(dateNow);
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);

  const { data, error, isLoading } = useGetScheduleDaily(1, dateNow);

  useEffect(() => {
    console.log('data:', isLoading, data);
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  // useEffect(() => {
  //   async function fetchEducations() {
  //     const data = await getSchedule(1, dateNow);
  //     setSchedule(Array.isArray(data) ? data : []);
  //     console.log('Data Schedule :', schedule);
  //   }
  //   fetchEducations();
  // }, []);

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

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  if (error) {
    // console.log('Error log : ', error.message);
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const attendanceDataPost = {
      schedule_id: schedule[0].id,
      employee_id: schedule[0].employee_schedule.employee_id,
    };
    mutation.mutateAsync(attendanceDataPost);
  };

  console.log('Data schedule', schedule);

  return (
    <main className="min-h-96 relative">
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      {/* Card Map */}
      <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
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
      <form onClick={handleSubmit}>
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
            <Button type="submit" fullWidth rightSection={<IconArrowBarToRight />}>
              Check-in
            </Button>
          </div>
        </section>
      </form>
      {/* End absen card */}

      {/* Tugas card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Kegiatan</span>
          <Button
            style={{
              borderRadius: '40px',
              height: '40px',
              width: '40px',
              padding: '0px',
              backgroundColor: 'transparent',
              color: 'blue',
              fontSize: '20px',
            }}
            onClick={open}
          >
            +
          </Button>
        </div>
        <div className="w-full pb-2">
          <div className="-mt-2 p-2">
            <Text size="xs" fw={700}>
              Judul kegiatan
            </Text>
            <Text style={{ textAlign: 'justify' }} size="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
          </div>
          <div className="mt-1 p-2">
            <Text size="xs" fw={700}>
              Deskripsi kegiatan
            </Text>
            <Text style={{ textAlign: 'justify' }} size="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>
        </div>
      </section>
      {/* End tugas card */}

      <Modal opened={opened} onClose={close} title="Tambah kegiatan">
        <div className="mb-2">
          <Input.Wrapper label="Judul kegiatan" description="" error="">
            <Input placeholder="masukkan judul kegiatan" />
          </Input.Wrapper>
        </div>
        <div className="mb-2">
          <JsonInput
            label="Deskripsi kegiatan"
            placeholder="masukkan deskripsi kegiatan"
            formatOnBlur
            autosize
            minRows={5}
          />
        </div>
        <div className="mb-2 mt-3">
          <Button fullWidth rightSection={<IconArrowBarToRight />}>
            Simpan
          </Button>
        </div>
      </Modal>
    </main>
  );
};
