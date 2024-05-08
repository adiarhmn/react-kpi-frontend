import {
  Button,
  ActionIcon,
  Text,
  Card,
  Image,
  Group,
  Badge,
  Modal,
  Divider,
  Input,
  JsonInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceTablet } from '@tabler/icons-react';
import {
  IconArrowBarRight,
  IconArrowBarToRight,
  IconChevronLeft,
  IconMap2,
  IconPlus,
} from '@tabler/icons-react';
import { IconChevronRight } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const Attendance: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const currentDate: Date = new Date();
  const formattedDate = format(currentDate, 'EEEE, dd MMM yyyy', { locale: id });

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
              F2
            </Text>
            <Text style={{ marginTop: '-5px' }} size="sm">
              Pagi
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <div className="ms-2 -mb-2">
              <Text size="xs">Tanggal</Text>
              <Text size="sm" fw={700}>
                {formattedDate}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 mb-1">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Jam kerja</Text>
                <Text size="sm" fw={700}>
                  08:00 - 16:00
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1"></div>
            </div>
          </div>
        </div>
        <div className="p-2 mt-2">
          <Button fullWidth rightSection={<IconArrowBarToRight />}>
            Check-in
          </Button>
        </div>
      </section>
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
