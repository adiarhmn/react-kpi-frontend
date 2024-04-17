import { FileInput, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { FileList } from '../components';

export const FileProfile: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      namaBerkas: '',
    },
    validate: {
      namaBerkas: (value) =>
        value.length < 5 ? 'Jenjang setidaknya harus memuat lebih dari 2 karakter' : null,
    },
  });
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
          <div>
            <button className="bg-transparent me-2" onClick={open}>
              <IconPlus size={21} className="font-bold rounded-md" />
            </button>
          </div>
        </div>
      </section>

      <FileList />

      <Modal
        opened={opened}
        onClose={close}
        title={<span className="font-semibold text-lg">Tambah berkas</span>}
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <TextInput
          label="Nama berkas"
          name="namaBerkas"
          withAsterisk
          {...form.getInputProps('namaBerkas')}
        />
        <FileInput label="Lampiran" withAsterisk placeholder="Masukkan bukti berkas" />
      </Modal>
    </main>
  );
};
