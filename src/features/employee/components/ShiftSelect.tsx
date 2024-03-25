import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useShifts } from '../api';
import { Shift, ShiftQuery } from '../types';

type Props = {
  onChange?: (id: number | null) => void;
  onSelected?: (shift: Shift | null) => void;
  params?: ShiftQuery;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const ShiftSelect: React.FC<Props> = ({ onChange, onSelected, params, ...props }) => {
  const { data, isLoading } = useShifts({ params: { ...params, limit: -1 } });

  const shifts = useMemo(() => {
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

  return <Select {...props} data={shifts} disabled={isLoading} onChange={handleChange} />;
};
