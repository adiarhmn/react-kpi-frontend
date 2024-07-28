import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { WorkerCreateType } from '../../api';

interface FormFreelancerProps {
  onsubmit: (data: WorkerCreateType) => void;
}
export const FormFreelancer: React.FC<FormFreelancerProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('./login');

  const form = useForm({
    initialValues: {
      name: '',
      status: 2,
      company_id: creds?.company_id || 0,
      nip: '',
      user_id: 1,
      division_id: 1,
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onsubmit(form.values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Lengkap"
        placeholder="Nama Lengkap"
        required
        {...form.getInputProps('name')}
      />
      <TextInput
        className="mb-3"
        label="Kode Pegawai"
        placeholder="Kode Pegawai"
        required
        {...form.getInputProps('nip')}
      />
      <div className="mt-10">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
