import { Badge, Divider, Image, Tabs, Text, rem } from '@mantine/core';
import {
  IconChevronLeft,
  IconClipboardText,
  IconClock,
  IconDoorEnter,
  IconDoorExit,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const DetailAbsence: React.FC = () => {
  const navigate = useNavigate();
  const iconStyle = { width: rem(12), height: rem(12) };
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
            <h2 className="font-semibold ">Detail izin</h2>
          </div>
          <Badge
            size="xs"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color="green"
          >
            Disetujui
          </Badge>
        </div>
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              3
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              Hari
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="17px" fw={700}>
              15 April 2024 - 17 April 2024
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-4 text-left mt-1 ms-1">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="10px" fw={500}>
                  Keterangan :
                </Text>
              </div>
              <div className="col-span-8 text-left" style={{ marginTop: '-4px' }}>
                <Badge
                  size="xs"
                  style={{
                    marginTop: '7px',
                    marginLeft: '4px',
                    borderRadius: '2px',
                  }}
                  color="red"
                >
                  Sakit
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-3 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span style={{ fontSize: '14px' }} className="font-bold text-blue-700">
            Lampiran dan keterangan
          </span>
          <IconClipboardText className="opacity-80" size={20} />
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="gap-2 mt-0">
            <Text size="xs" fw={700}>
              Lampiran :
            </Text>
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
            <Text size="xs" fw={700}>
              Keterangan :{' '}
            </Text>
            <Text size="xs">Sakit demam</Text>
          </div>
        </div>
      </section>
    </main>
  );
};
