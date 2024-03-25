import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useAccounts } from '../api';
import { Account, AccountQuery } from '../types';

type Props = {
  params?: AccountQuery;
  onChange?: (id: number | null) => void;
  onSelected?: (account: Account | null) => void;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const AccountSelect: React.FC<Props> = ({ onChange, onSelected, params, ...props }) => {
  const { data, isLoading } = useAccounts({ params: { limit: -1, ...params } });

  const accounts = useMemo(() => {
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

  return <Select {...props} data={accounts} disabled={isLoading} onChange={handleChange} />;
};
