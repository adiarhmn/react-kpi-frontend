import { ActionIcon, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useCreateDivision, postCreateDivision } from '../api';

export const CreateDivision: React.FC = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { division_name: '' },
    validate: {
      division_name: (value) => (value.length < 10 ? 'Name must have at least 10 letters' : null),
    },
  });

  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  const mutation = useCreateDivision();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const divisionDataPost = {
      division_name: form.values.division_name,
    };

    await mutation.mutateAsync(divisionDataPost, {
      onSuccess: (data) => {
        console.log('Success:', data);
        navigate('/division', { state: { success: 'Data berhasil ditambahkan' } });
      },
    });
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
          <form onSubmit={handleSubmit}>
            <TextInput
              className="mb-3"
              label="Nama Divisi"
              placeholder="Nama Divisi"
              required
              {...form.getInputProps('division_name')}
            />
            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5" disabled={mutation.isPending}>
                {mutation.isPending ? 'Loading...' : 'Simpan'}
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
