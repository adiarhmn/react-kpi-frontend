import { Button, Divider, Image, Loader, Modal, Text } from '@mantine/core';
import { IconChevronRight, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useAuth } from '@/features/auth';

import { useDeleteFiles, useGetEmployeeFiles } from '../api';
import { EmployeeFilesType } from '../types';
import { baseURL } from '@/lib/axios';
import { useDisclosure } from '@mantine/hooks';
import Swal from 'sweetalert2';

export const FileList: React.FC = () => {
  const BaseURL = import.meta.env.VITE_API_URL;
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [files, setFiles] = useState<EmployeeFilesType[]>([]);
  const { data, error, isLoading, refetch } = useGetEmployeeFiles(creds?.employee_id);

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  const [fileToDelete, setFileToDelete] = useState<EmployeeFilesType>();

  const openDeleteModal = (file: EmployeeFilesType) => {
    setFileToDelete(file);
    open();
  };

  const deleteFilesMutation = useDeleteFiles();
  const deleteFiles = async () => {
    deleteFilesMutation.mutateAsync(fileToDelete?.id, {
      onSuccess: (data) => {
        console.log('Success Delete:', data);
        refetch();
        close();
        Swal.fire({
          width: '80%',
          title: 'Berkas berhasil dihapus!',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
    });
  };

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
          <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
            <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
              <div>
                <Text fw={700} c="blue">
                  Berkas {index + 1}
                </Text>
              </div>
              <div className="my-auto text-right ">
                <button className="bg-transparent me-2" onClick={() => openDeleteModal(file)}>
                  <IconTrash color="#F03E3E" size={20} className="font-bold rounded-md" />
                </button>
              </div>
            </div>
            <Divider size={'sm'} />
            <div className="divide-y divide-gray-300">
              <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4">
                <div className="gap-1 align-item-left ">
                  <Text size="xs" fw={700}>
                    Nama berkas
                  </Text>
                  <Text size="xs">{file.file_name}</Text>
                </div>
                <div className="gap-2 mt-2">
                  <Text size="xs" fw={700}>
                    Lampiran
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
                    src={`${baseURL}/public/employee-files/${file.file}`}
                  />
                </div>
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

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Apakah anda yakin ingin menghapus berkas</span>
          <span className="font-semibold text-blue-600"> {fileToDelete?.file_name}</span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteFilesMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteFiles}>Yakin</Button>
          )}

          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </>
  );
};
