import { Button, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetSession, GroupFormType, useGetWorkers } from '../../api';

interface FormGroupProps {
  onsubmit: (data: GroupFormType) => void;
}
export const FormGroup: React.FC<FormGroupProps> = ({ onsubmit }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate('/login');

  const {
    data: workers,
    isLoading: LoadWorkers,
    isError: ErWorkers,
  } = useGetWorkers(creds?.company_id || 0, 2, true);

  // Use Form Group
  const form = useForm({
    initialValues: {
      name: '',
      details: '',
      session: [],
      worker: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Data Form INI', form.values);

    // Maping Data
    const data: GroupFormType = {
      name: form.values.name,
      company_id: creds?.company_id || 0,
      details: form.values.details,
      session: form.values.session.map((session: string) => ({ session_id: parseInt(session) })),
      worker: form.values.worker.map((worker: string) => ({ employee_id: parseInt(worker) })),
    };

    onsubmit(data);
  };

  // Get Data Session
  const {
    data: dataSession,
    isLoading: LoadSession,
    isError: ErSession,
  } = useGetSession(creds?.company_id || 0);

  if (LoadSession || LoadWorkers) return <div>Loading...</div>;
  if (ErSession || ErWorkers)
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

  const OptionsWorkers = workers?.map((worker: any) => ({
    value: worker.id.toString(),
    label: worker.name,
  }));

  console.log('WorkersOption', OptionsWorkers);
  console.log('Workers', workers);

  console.log('OptionSession', form.values);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Kelompok"
        placeholder="Nama Kelom"
        required
        {...form.getInputProps('name')}
      />

      <TextInput
        className="mb-3"
        label={`Details`}
        placeholder="Nama Kelom"
        required
        {...form.getInputProps(`details`)}
      />

      <MultiSelect
        label="Pilih Pekerja"
        className="mb-3"
        placeholder="Pilih Pekerja"
        data={OptionsWorkers}
        required
        {...form.getInputProps('worker')}
      />

      <MultiSelect
        className="mb-5"
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
