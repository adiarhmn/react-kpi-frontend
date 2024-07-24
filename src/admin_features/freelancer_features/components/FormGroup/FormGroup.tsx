import { Button, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSession, GroupFormType } from '../../api';

interface FormGroupProps {
  onsubmit: (data: GroupFormType) => void;
}
export const FormGroup: React.FC<FormGroupProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  // Use Form Group
  const form = useForm({
    initialValues: {
      name: '',
      session: [],
      worker: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Data Form', form.values);

    // Maping Data
    const data: GroupFormType = {
      name: form.values.name,
      company_id: creds?.company_id || 0,
      details: 'Details',
      session: form.values.session.map((session: string) => ({ session_id: parseInt(session) })),
      worker: form.values.worker.map((worker: string) => ({ employee_id: parseInt(worker) })),
    };

    onsubmit(data);
  };

  // Get Data Session
  const { data: dataSession, isLoading: LoadSession, isError: ErSession } = useGetSession(1);

  if (LoadSession) return <div>Loading...</div>;
  if (ErSession)
    return (
      <div className="h-64 flex justify-center items-center">
        Error...
        <br /> Pastikan sudah Mengisi Data Sesi Dan Pekerja
      </div>
    );

  const OptionsSession = dataSession?.map((session: any) => ({
    value: session.id.toString(),
    label: session.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Kelompok"
        placeholder="Nama Kelom"
        required
        {...form.getInputProps('name')}
      />
      <MultiSelect
        label="Pilih Pekerja"
        className="mb-3"
        placeholder="Pilih Pekerja"
        data={[
          { value: '1', label: 'Pekerja 1' },
          { value: '2', label: 'Pekerja 2' },
          { value: '3', label: 'Pekerja 3' },
        ]}
        required
        {...form.getInputProps('worker')}
      />

      <MultiSelect
        label="Pilih Sesi atau Kegiatan"
        placeholder="Pilih Sesi / Kegiatan"
        data={OptionsSession}
        required
        {...form.getInputProps('session')}
      />

      <div className="mt-10">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};
