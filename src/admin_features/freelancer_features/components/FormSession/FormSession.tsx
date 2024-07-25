import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { SessionCreateType } from '../../api';

interface FormSessionProps {
  onsubmit: (data: SessionCreateType) => void;
}
export const FormSession: React.FC<FormSessionProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const form = useForm({
    initialValues: {
      name: '',
      company_id: creds?.company_id || 0,
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onsubmit(form.values);
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Sesi"
        placeholder="Nama Sesi"
        required
        {...form.getInputProps('name')}
      />
      <div className="mt-10">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
