import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DivisionType } from '@/admin_features/types';

interface FormDivisionProps {
  currentValue?: DivisionType;
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const FormDivision: React.FC<FormDivisionProps> = ({ currentValue, onSubmit, loading }) => {
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: currentValue || { division_name: '' },
    validate: {
      division_name: (value) => (value.length < 10 ? 'Name must have at least 10 letters' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(form.values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Divisi"
        placeholder="Nama Divisi"
        required
        {...form.getInputProps('division_name')}
      />
      <div className="flex gap-3">
        <Button type="submit" color="blue" className="mt-5" disabled={loading} loading={loading}>
          Simpan
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="button"
          color="gray"
          className="mt-5"
        >
          Batal
        </Button>
      </div>
    </form>
  );
};
