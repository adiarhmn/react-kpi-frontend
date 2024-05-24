import formatterDate from '@/features/history/api/getAbsence';
import { Badge, Button, Divider, Image, JsonInput, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft, IconClock24, IconDeviceTablet, IconMap2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddOvertime: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };
    const intervalId = setInterval(updateCurrentDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
            <Text style={{ marginLeft: '4px' }} size="15px" fw={700}>
              {formatterDate(currentDate, 'EEEE, dd MMM yyyy')}
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1 mb-3">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="16px" fw={500}>
                  {formatterDate(currentDate, 'HH:mm')}
                </Text>
              </div>
              <div className=" col-span-6 text-right -mt-6">
                <Button
                  onClick={open}
                  className="shadow-lg"
                  style={{ borderRadius: '15px', width: '110px' }}
                  size="sm"
                  color="green"
                >
                  Mulai
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
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
                {/* {formattedTime} */}
                -- --
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 mb-1">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Lembur selesai</Text>
                <Text size="sm" fw={700}>
                  {/* {formattedTime} */}
                  -- --
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
        <div className="mb-2">
          <JsonInput
            label="Kegiatan"
            placeholder="masukkan kegiatan yang akan dilakukan"
            formatOnBlur
            autosize
            minRows={5}
          />
        </div>
        <div className="mb-2 mt-3">
          <Button fullWidth rightSection={<IconClock24 />}>
            Mulai lembur
          </Button>
        </div>
      </Modal>
    </main>
  );
};
