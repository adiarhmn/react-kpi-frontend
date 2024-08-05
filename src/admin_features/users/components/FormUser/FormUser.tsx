/* eslint-disable linebreak-style */
import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
interface FormUserProps {
  currentUser?: UserType;
  loading: boolean;
  onSubmit: (data: UserType) => void;
}

export const FormUser: React.FC<FormUserProps> = ({ currentUser, loading, onSubmit }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const form = useForm({
    validateInputOnChange: true,
    initialValues: currentUser
      ? { ...currentUser, password: '', company_id: creds?.company_id }
      : { id: '', username: '', password: '', role: 'employee', company_id: creds?.company_id },
    validate: {
      password: (value: string) => (value.length < 8 ? 'Password Minimal 8 Karakter' : null),
      role: (value) => (value.length < 2 ? 'Role atau Hak Akses Wajib diisi' : null),
    },
  });

  const NavBack = () => {
    navigate(-1);
  };

  // Fungsi Submit form data user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      id: currentUser?.id || 0,
      username: form.values.username,
      password: form.values.password,
      role: form.values.role,
      status: 1,
      company_id: creds?.company_id,
    };

    onSubmit(userData);
  };

  return (
    <>
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
          required={!currentUser}
        />
        <Select
          label="Role atau Level"
          required
          placeholder="Pilih Role"
          data={[
            {
              value: 'admin',
              label: 'Admin',
            },
            {
              value: 'supervisor',
              label: 'Supervisor',
            },
            ...(creds?.role === 'superadmin'
              ? [
                  {
                    value: 'superadmin',
                    label: 'Superadmin',
                  },
                ]
              : []),
          ]}
          value={form.values.role}
          allowDeselect={false}
          {...form.getInputProps('role')}
        />
        <div className="flex gap-3">
          <Button type="submit" color="blue" className="mt-5" loading={loading}>
            Simpan
          </Button>
          <Button onClick={NavBack} type="button" color="gray" className="mt-5">
            Batal
          </Button>
        </div>
      </form>
    </>
  );
};
