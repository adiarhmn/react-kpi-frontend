import { Button, Text, Image, Loader, Modal, Input, JsonInput, Textarea } from '@mantine/core';
import { IconArrowBarToRight, IconMap2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardAttendance } from '../components';
import { useDisclosure } from '@mantine/hooks';
import { ScheduleType } from '../types';
import { useGetSchedule } from '../api';

export const Attendance: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: dataschedule, error, isLoading } = useGetSchedule(1, '2024-05-22');

  // console.log('adaaa;', dataschedule);
  useEffect(() => {
    //
    // console.log('test running');
  }, [dataschedule]);
  // console.log('Data schedule', schedule);

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

  const datasceduleboss = dataschedule;
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
      <CardAttendance schedule={datasceduleboss[0]} />
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
          <Textarea
            label="Deskripsi kegiatan"
            placeholder="masukkan deskripsi kegiatan"
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
