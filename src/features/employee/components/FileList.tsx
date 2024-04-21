import { Image, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

export const FileList: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
      <div className="flex justify-between text-xs items-center p-2">
        <span className="font-bold text-blue-700">Dokumen / Berkas </span>
        <IconChevronRight className="opacity-80" size={20} />
      </div>
      <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4">
        <div className="gap-2 align-item-left">
          <Text size="xs">Nama berkas</Text>
          <Text size="xs" fw={700}>
            Serfitikat kompetensi TOI
          </Text>
        </div>
        <div className="gap-2 mt-2">
          <Text size="xs">Lampiran</Text>
          <Image
            radius="md"
            h={200}
            style={{
              justifyContent: 'center',
              padding: '10',
              marginTop: '-10px',
              width: '90% ',
            }}
            fit="contain"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          />
        </div>
      </div>
    </section>
  );
};
