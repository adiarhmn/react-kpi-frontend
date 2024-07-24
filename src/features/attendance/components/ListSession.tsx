import { Divider, Text } from '@mantine/core';
import { IconClockEdit, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const ListSession: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar Sesi pekerjaan
          </Text>
        </div>
        <span className="font-semibold">
          <IconClockEdit />
        </span>
      </div>
      <Divider size={'sm'} />
      <button
        onClick={() => navigate(`/laborer-group/session/laborer`)}
        className="grid grid-cols-12 px-2 mb-1 bg-white shadow-md mt-2"
      >
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'md'} fw={700}>
              Sesi 1 - Pondasi
            </Text>
          </div>
          <Divider className="w-full mt-2" />
          <div className="grid grid-cols-12 text-left">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah pekerja : 6
              </Text>
            </div>
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah hadir : 4
              </Text>
            </div>
          </div>
        </div>
      </button>
      <button className="grid grid-cols-12 px-2 mb-1 bg-white shadow-md mt-2">
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'md'} fw={700}>
              Sesi 2 - Tiang
            </Text>
          </div>
          <Divider className="w-full mt-2" />
          <div className="grid grid-cols-12 text-left">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah pekerja : 6
              </Text>
            </div>
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah hadir : 4
              </Text>
            </div>
          </div>
        </div>
      </button>
      <button className="grid grid-cols-12 px-2 mb-1 bg-white shadow-md mt-2">
        <div className="col-span-12 py-2">
          <div className="my-auto text-left">
            <Text lineClamp={1} size={'md'} fw={700}>
              Sesi 2 - Kawat
            </Text>
          </div>
          <Divider className="w-full mt-2" />
          <div className="grid grid-cols-12 text-left">
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah pekerja : 6
              </Text>
            </div>
            <div className="col-span-6">
              <Text size={'xs'} fw={500}>
                Jumlah hadir : 4
              </Text>
            </div>
          </div>
        </div>
      </button>
    </section>
  );
};
