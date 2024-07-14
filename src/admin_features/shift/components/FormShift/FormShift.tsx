import { Button, Select, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

interface FormShiftProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  initialValues?: ShiftType;
  edit?: boolean;
}
export const FormShift: React.FC<FormShiftProps> = ({
  onSubmit,
  loading,
  initialValues,
  edit = false,
}) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const form = useForm({
    validateInputOnChange: true,
    initialValues: initialValues || {
      shift_name: '',
      shift_code: '',
      start_time: '',
      end_time: '',
      is_active: '1',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shiftDataPost = {
      id: initialValues?.id,
      shift_name: form.values.shift_name,
      start_time: form.values.start_time,
      end_time: form.values.end_time,
      shift_code: form.values.shift_code,
      company_id: creds?.company_id,
      is_active: form.values.is_active === '1' ? true : false,
    };

    await onSubmit(shiftDataPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-5 mb-3">
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
        <Select
          label="Status Fitur Shift"
          className="mb-3"
          placeholder="Pilih"
          required
          defaultValue={'1'}
          data={[
            { value: '1', label: 'Aktif' },
            { value: '0', label: 'Tidak Aktif' },
          ]}
          {...form.getInputProps('shift_active')}
        />
      </div>
      {edit ? (
        <>
          <div className="grid grid-cols-2 gap-5">
            <TimeInput disabled label="Jam Masuk" {...form.getInputProps('start_time')} />
            <TimeInput disabled label="Jam Keluar" {...form.getInputProps('end_time')} />
          </div>
          <span className="text-red-600 text-xs italic">Waktu Shift tidak bisa diubah !</span>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-5 mb-3">
          <TimeInput label="Jam Masuk" {...form.getInputProps('start_time')} />
          <TimeInput label="Jam Keluar" {...form.getInputProps('end_time')} />
        </div>
      )}
      <div className="flex gap-3">
        <Button loading={loading} type="submit" color="blue" className="mt-5">
          Simpan
        </Button>
        <Button onClick={() => navigate(-1)} type="button" color="gray" className="mt-5">
          Batal
        </Button>
      </div>
    </form>
  );
};
