import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useEmployees } from '../api';
import { Employee, EmployeeQuery } from '../types';

type Props = {
  params?: EmployeeQuery;
  onChange?: (id: number | null) => void;
  onSelected?: (employee: Employee | null) => void;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const EmployeeSelect: React.FC<Props> = ({ onChange, onSelected, params, ...props }) => {
  const { data, isLoading } = useEmployees({ params: { limit: -1, ...params } });

  const employees = useMemo(() => {
    if (!data) return [];

    return data.result.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));
  }, [data]);

  function handleChange(v: string | null) {
    if (onChange) onChange(v ? parseInt(v) : null);

    if (onSelected && v) {
      onSelected(data?.result.filter(({ id }) => id == parseInt(v!)).at(0) || null);
    }
  }

  return <Select {...props} data={employees} disabled={isLoading} onChange={handleChange} />;
};
