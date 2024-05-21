import {
  ActionIcon,
  Alert,
  Button,
  CheckIcon,
  Notification,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../api/createUser';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const CreateUser: React.FC = () => {
  const [alert, setAlert] = useState(false);
  const mutationUser = useCreateUser();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { username: '', password: '', role: 'Employee' },
    validate: {
      username: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
      password: (value) => (value.length < 8 ? 'Name must have at least 8 letters' : null),
      role: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    },
  });

  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  // Fungsi Submit form data user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      username: form.values.username,
      password: form.values.password,
      role: form.values.role,
      status: true,
    };

    await mutationUser.mutateAsync(userData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        setAlert(true);
        navigate(-1);
      },
    });
  };

  return (
    <main>
      {
        // Alert Notification
        alert && (
          <Notification
            className="mb-5"
            title="Berhasil"
            color="teal"
            icon={<CheckIcon size={14} />}
            onClose={() => setAlert(false)}
            withCloseButton
          >
            User berhasil ditambahkan
          </Notification>
        )
      }

      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah User</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan user atau pengguna baru
            </div>
          </div>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <TextInput
              {...form.getInputProps('username')}
              className="mb-3"
              label="Username"
              placeholder="Username"
              required
            />
            <TextInput
              {...form.getInputProps('password')}
              className="mb-3"
              label="Password"
              placeholder="Password"
              required
            />
            <Select
              label="Role atau Level"
              required
              placeholder="Pilih Role"
              data={['Supervisor', 'Admin', 'Superadmin', 'Employee']}
              defaultValue="Employee"
              allowDeselect={false}
              {...form.getInputProps('role')}
            />
            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5" disabled={mutationUser.isPending}>
                {mutationUser.isPending ? 'Loading...' : 'Simpan'}
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
