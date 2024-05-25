import { ActionIcon, Button, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useCreateShift } from '../api/createShift';

export const CreateShift: React.FC = () => {
  const navigate = useNavigate();
  const mutationShift = useCreateShift();
  const NavBack = () => {
    navigate(-1);
  };
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { shift_name: '', shift_code: '', start_time: '', end_time: '' },
    validate: {
      shift_name: (value) => (value.length < 8 ? 'Name must have at least 8 letters' : null),
      shift_code: (value) => (value.length > 2 ? 'Shift Code cannot more than 2 letters' : null),
      start_time: (value) => (value.length < 2 ? 'Name must have at least 5 letters' : null),
      end_time: (value) => (value.length < 2 ? 'Name must have at least 5 letters' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shiftDataPost = {
      shift_name: form.values.shift_name,
      start_time: form.values.start_time,
      end_time: form.values.end_time,
      shift_code: form.values.shift_code,
    };

    console.log(shiftDataPost);

    await mutationShift.mutateAsync(shiftDataPost, {
      onSuccess: (data) => {
        console.log('Success:', data);
        navigate(-1);
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
            <h2 className="font-bold">Tambah Shift</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut form untuk menambahkan shift</div>
          </div>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <TextInput
                className="mb-3"
                label="Nama Shift"
                placeholder="Nama Shift"
                required
                {...form.getInputProps('shift_name')}
              />
              <TextInput
                className="mb-3"
                label="Kode Shift"
                placeholder="Kode Shift"
                required
                {...form.getInputProps('shift_code')}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <TimeInput label="Jam Masuk" {...form.getInputProps('start_time')} />
              <TimeInput label="Jam Keluar" {...form.getInputProps('end_time')} />
            </div>
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
