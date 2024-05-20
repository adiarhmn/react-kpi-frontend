import { ActionIcon, Button, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const CreateShift: React.FC = () => {
  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { shift_name: '', start_time: '', end_time: '' },
    validate: {
      shift_name: (value) => (value.length < 8 ? 'Name must have at least 8 letters' : null),
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
    };

    console.log(shiftDataPost);

    try {
      const response = await axios.post(`${BaseURL}/shift`, shiftDataPost);
      if (response.data.status == 201) {
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
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
            <TextInput
              className="mb-3"
              label="Nama Shift"
              placeholder="Nama Shift"
              required
              {...form.getInputProps('shift_name')}
            />
            <div className="grid grid-cols-2 gap-5 mb-3">
              <TimeInput label="Jam Masuk" {...form.getInputProps('start_time')} />
              <TimeInput label="Jam Keluar" {...form.getInputProps('end_time')} />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <TimeInput label="Minimal Jam Masuk" />
              <TimeInput label="Maksimal Jam Keluar" />
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
