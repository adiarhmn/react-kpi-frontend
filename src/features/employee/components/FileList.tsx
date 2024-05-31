import { Image, Loader, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useAuth } from '@/features/auth';

import { useGetEmployeeFiles } from '../api';
import { EmployeeFilesType } from '../types';

export const FileList: React.FC = () => {
  const { creds } = useAuth();
  const [files, setFiles] = useState<EmployeeFilesType[]>([]);
  const { data, error, isLoading } = useGetEmployeeFiles(creds?.id);

  useEffect(() => {
    if (data) {
      console.log('Data response :', data);
      setFiles(data);
    }
  }, [data]);

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

  return (
    <>
      {files.length > 0 ? (
        files.map((file, index) => (
          <section
            key={index}
            className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
          >
            <div className="flex justify-between text-xs items-center p-2">
              <span className="font-bold text-blue-700">Dokumen / Berkas </span>
              <IconChevronRight className="opacity-80" size={20} />
            </div>
            <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4">
              <div className="gap-2 align-item-left">
                <Text size="xs">Nama berkas</Text>
                <Text size="xs" fw={700}>
                  {file.file_name}
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
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada berkas</span>
        </section>
      )}
    </>
  );
};
