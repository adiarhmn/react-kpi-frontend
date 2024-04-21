import { Button, ActionIcon, Text, Card, Image, Group, Badge, Modal } from '@mantine/core';
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

export const Attendance: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

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
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <IconDeviceTablet className="opacity-80" size={20} />
        </div>
        <div className="w-full pb-2">
          <p className="text-center text-sm text-gray-600">Senin, 12 Mar 2024 </p>
          <h1 className="text-center font-bold">Shift pagi</h1>
          <h1 className="text-center">08.00 - 16.00</h1>
          <div className="flex justify-between">
            <Button variant="filled" rightSection={<IconArrowBarToRight />} fullWidth>
              Check-in
            </Button>
          </div>
        </div>
      </section>
      {/* End absen card */}
      {/* Tugas card */}
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Tugas</span>
          <Button variant="filled" size="xs" onClick={open}>
            <IconPlus className="opacity-80" size={20} />
          </Button>
        </div>
        <div className="w-full pb-2"></div>
      </section>
      {/* End tugas card */}

      <Modal opened={opened} onClose={close} title="Tambah tugas">
        {/* Modal content */}
      </Modal>
    </main>
  );
};
