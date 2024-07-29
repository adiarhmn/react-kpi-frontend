import {
  Button,
  FileButton,
  FileInput,
  Group,
  Loader,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { FileList } from '../components';
import { useEffect, useRef, useState } from 'react';
import { useCreateFiles, useGetEmployeeFiles } from '../api';
import { useAuth } from '@/features/auth';
import Swal from 'sweetalert2';
import { EmployeeFilesType } from '../types';

export const FileProfile: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  // const [files, setFiles] = useState<EmployeeFilesType[]>([]);
  // const {
  //   data: DataFiles,
  //   error: ErrorFiles,
  //   isLoading: LoadingFiles,
  //   refetch,
  // } = useGetEmployeeFiles(creds?.employee_id);

  // useEffect(() => {
  //   if (DataFiles) {
  //     setFiles(DataFiles);
  //   }
  // }, [DataFiles]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      namaBerkas: '',
      image: null as File | null,
      employee_id: creds?.employee_id,
    },
    validate: {
      namaBerkas: (value) =>
        value.length < 2 ? 'Nama file setidaknya harus memuat lebih dari 2 karakter' : null,
    },
  });

  const mutationCreateFiles = useCreateFiles();
  const handleSubmitFile = async (values: typeof form.values) => {
    const FilesData = {
      filename: values.namaBerkas,
      file: values.image,
      employee_id: values.employee_id,
    };

    await mutationCreateFiles.mutateAsync(FilesData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        localStorage.setItem('hasNotifiedFiles', 'no');
        close();
        Swal.fire({
          width: '80%',
          title: 'Data berhasil ditambahkan',
          timer: 3000,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        form.reset();
      },
    });
  };

  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    form.setFieldValue('image', null);
    resetRef.current?.();
  };


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
            <h2 className="font-semibold ">Kelengkapan berkas</h2>
          </div>

          <span className="font-semibold">
            <Button className="shadow-sm me-1" size="xs" onClick={open}>
              <IconPlus className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <FileList  />

      <Modal
        opened={opened}
        onClose={close}
        title={<span className="font-semibold text-lg">Tambah berkas</span>}
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <form onSubmit={form.onSubmit(handleSubmitFile)}>
          <div>
            <TextInput
              label="Nama berkas"
              name="namaBerkas"
              required
              withAsterisk
              {...form.getInputProps('namaBerkas')}
            />
          </div>
          <div className="mt-2">
            <Text size="sm" fw={500}>
              Lampiran
            </Text>
            <div className="flex items-center justify-center mb-2">
              <div className="h-36 w-80 bg-slate-500 text-white">
                {form.values.image ? (
                  <img
                    src={URL.createObjectURL(form.values.image)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs ms-2">format png/jpeg</span>
                )}
              </div>
            </div>
            <div className="my-auto">
              <Group justify="center">
                <FileButton
                  resetRef={resetRef}
                  onChange={(file) => form.setFieldValue('image', file)}
                  accept="image/png,image/jpeg"
                >
                  {(props) => <Button {...props}>Pilih foto</Button>}
                </FileButton>
                <Button disabled={!form.values.image} color="red" onClick={clearFile}>
                  Hapus foto
                </Button>
              </Group>
            </div>
          </div>
          <div className="mt-3">
            <Button fullWidth type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
