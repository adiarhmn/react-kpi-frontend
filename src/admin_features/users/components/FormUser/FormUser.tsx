import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { UserType } from '@/admin_features/types';
interface FormUserProps {
  currentUser?: UserType;
  loading: boolean;
  onSubmit: (data: UserType) => void;
}

export const FormUser: React.FC<FormUserProps> = ({ currentUser, loading, onSubmit }) => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: currentUser
      ? { ...currentUser, password: '' }
      : { id: '', username: '', password: '', role: 'employee' },
    validate: {
      username: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
      password: (value: string) => (value.length < 8 ? 'Name must have at least 8 letters' : null),
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
      id: currentUser?.id || 0,
      username: form.values.username,
      password: form.values.password,
      role: form.values.role,
      status: true,
    };

    onSubmit(userData);
  };

  return (
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
            value: 'employee',
            label: 'Employee',
          },
          {
            value: 'superadmin',
            label: 'Superadmin',
          },
          {
            value: 'supervisor',
            label: 'Supervisor',
          },
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
  );
};
