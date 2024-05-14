import { Badge, Divider, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export const AttendanceInfo: React.FC = () => {
  const navigate = useNavigate();
  const currentDate: Date = new Date();
  const formattedDate = format(currentDate, 'EEEE, dd MMM yyyy', { locale: id });

  return (
    <main>
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
            <h2 className="font-semibold ">Informasi kehadiran </h2>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Absensi</span>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color="yellow"
          >
            Sudah check-in
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
            <div className="ms-2">
              <Text size="xs">Tanggal</Text>
              <Text size="sm" fw={700}>
                {formattedDate}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 pb-2">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Check-in</Text>
                <Text size="sm" fw={700}>
                  07:53
                </Text>
              </div>
              <div className="col-span-6 text-left mt-1">
                <Text size="xs">Check-out</Text>
                <Text size="sm" fw={700}>
                  -- --
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="font-bold text-blue-700">Kegiatan</span>
        </div>
        <div className="w-full pb-2">
          <div className="mt-2 p-2">
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
          <Divider my="md" />
          <div className="p-2">
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
    </main>
  );
};
