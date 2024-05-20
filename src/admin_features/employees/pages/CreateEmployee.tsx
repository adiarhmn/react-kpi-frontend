import { ActionIcon, Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  const form = useForm({
    
  })

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah Karyawan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan karyawan
            </div>
          </div>
        </div>
        <div className="mt-5">
          <form action="">
            <TextInput
              className="mb-3"
              label="Nama Karyawan"
              placeholder="Nama Karyawan"
              required
            />
            <TextInput className="mb-3" label="NIK" placeholder="NIK" required />
            <TextInput className="mb-3" label="NIP" placeholder="NIP" required />
            <TextInput className="mb-3" label="Nomor BPJS" placeholder="Nomor BPJS" required />
            <Select
              className="mb-3"
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              data={['Laki-laki', 'Perempuan']}
            />
            <TextInput className="mb-3" label="Tempat Lahir" placeholder="Tempat Lahir" required />
            <Select
              className="mb-3"
              label="Agama"
              placeholder="Pilih Agama"
              data={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu']}
            />
            <TextInput className="mb-3" label="Alamat" placeholder="Alamat" required />
            <TextInput
              className="mb-3"
              label="Nomor Telepon"
              placeholder="Nomor Telepon"
              required
            />
            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5">
                Simpan
              </Button>
              <Button onClick={NavBack} type="button" color="gray" className="mt-5">
                Batal
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
