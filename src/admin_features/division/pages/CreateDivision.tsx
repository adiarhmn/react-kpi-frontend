import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const CreateDivision: React.FC = () => {
  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan divisi
            </div>
          </div>
        </div>
        <div className="mt-5">
          <form action="">
            <TextInput className="mb-3" label="Kode Divisi" placeholder="Kode Divisi" required />
            <TextInput className="mb-3" label="Nama Divisi" placeholder="Nama Divisi" required />
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
