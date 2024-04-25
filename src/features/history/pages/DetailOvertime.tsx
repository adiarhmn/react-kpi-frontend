import { Badge, Divider, Image, Tabs, Text, rem } from '@mantine/core';
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconDoorEnter,
  IconDoorExit,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const DetailOvertime: React.FC = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const navigate = useNavigate();
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
            <h2 className="font-semibold ">Detail lembur</h2>
          </div>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color="red"
          >
            Belum disetujui
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              21
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              April
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="14px" fw={700}>
              Melanjutkan proses develop aplikasi
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="13px" fw={500}>
                  16:10 - 20:00
                </Text>
              </div>
              <div className="col-span-6 text-right" style={{ marginTop: '2px' }}>
                <IconClock size={16} className="font-bold rounded-md -ms-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="mulai">
        <section className="mx-5 p-1 py-3 -mb-2 my-2">
          <Tabs.List className="-mt-2 w-full grid grid-cols-12 text-center">
            <div className="col-span-6">
              <Tabs.Tab
                style={{ width: '160px' }}
                value="mulai"
                leftSection={<IconDoorEnter style={iconStyle} />}
              >
                Mulai
              </Tabs.Tab>
            </div>
            <div className="col-span-6">
              <Tabs.Tab
                style={{ width: '160px' }}
                className="col-span-6"
                color="#FA5252"
                value="selesai"
                leftSection={<IconDoorExit style={iconStyle} />}
              >
                Selesai
              </Tabs.Tab>
            </div>
          </Tabs.List>
        </section>

        <Tabs.Panel value="mulai">
          <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
            <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
              <span style={{ fontSize: '14px' }} className="font-bold text-blue-700">
                Lembur mulai
              </span>
              <IconDoorEnter className="opacity-80" size={20} />
            </div>
            <Divider my="sm" />
            <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
              <div className="gap-2 mt-0">
                <Text size="xs">Lampiran</Text>
                <Image
                  radius="md"
                  h={200}
                  style={{
                    justifyContent: 'center',
                    padding: '10',
                    marginTop: '-20px',
                    width: '90% ',
                  }}
                  fit="contain"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
              </div>
              <div className="gap-2 -mt-2">
                <Text size="xs">Keterangan</Text>
                <Text size="xs" fw={700}>
                  Mulai lembur melanjutkan proses develop aplikasi
                </Text>
              </div>
            </div>
          </section>
        </Tabs.Panel>
        <Tabs.Panel value="selesai">
          <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
            <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
              <span style={{ fontSize: '14px' }} className="font-bold text-blue-700">
                Lembur selesai
              </span>
              <IconDoorExit className="opacity-80" size={20} />
            </div>
            <Divider my="sm" />
            <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
              <div className="gap-2 mt-0">
                <Text size="xs">Lampiran</Text>
                <Image
                  radius="md"
                  h={200}
                  style={{
                    justifyContent: 'center',
                    padding: '10',
                    marginTop: '-20px',
                    width: '90% ',
                  }}
                  fit="contain"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
              </div>
              <div className="gap-2 -mt-2">
                <Text size="xs">Keterangan</Text>
                <Text size="xs" fw={700}>
                  Selesai mengerjakan proses develop aplikasi
                </Text>
              </div>
            </div>
          </section>
        </Tabs.Panel>
      </Tabs>
    </main>
  );
};
