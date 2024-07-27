import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

interface FormActivityVariabelProps {
  loading: boolean;
  onSubmit: (values: any) => void;
  inittialValues?: ActivitysVariableType;
}
export type ActivitysVariableType = {
  cs1_name: string;
  cs2_name: string;
  cs3_name: string;
  cs4_name: string;
  cs5_name: string;
  cs6_name: string;
  cs7_name: string;
  cs8_name: string;
  cs9_name: string;
  cs10_name: string;
  company_id?: number;
  id?: number;
};

export const FormActivityVariabel: React.FC<FormActivityVariabelProps> = ({
  loading,
  onSubmit,
  inittialValues,
}) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const form = useForm<ActivitysVariableType>({
    initialValues: inittialValues || {
      cs1_name: '',
      cs2_name: '',
      cs3_name: '',
      cs4_name: '',
      cs5_name: '',
      cs6_name: '',
      cs7_name: '',
      cs8_name: '',
      cs9_name: '',
      cs10_name: '',
      company_id: creds?.company_id,
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form.values);
  };
  return (
    <form onSubmit={handleSubmit}>
      {Array.from({ length: 10 }).map((_, index) => (
        <TextInput
          className="mb-2"
          key={index}
          label={`Nama Variabel ${index + 1}`}
          placeholder="Nama Variabel"
          {...form.getInputProps(`cs${index + 1}_name`)}
        />
      ))}
      <Button className="mt-5" type="submit" loading={loading} color="blue">
        Simpan
      </Button>
    </form>
  );
};
