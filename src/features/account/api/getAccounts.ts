import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Account, AccountQuery } from '../types';

type AccountsRequest = {
  params?: AccountQuery;
};

export async function getAccounts({ params }: AccountsRequest) {
  const res = await axios.get<PaginatedResult<Account>>(`/account`, { params });

  return res.data;
}

type QueryFnType = typeof getAccounts;

type UseAccountsOptions = {
  params?: AccountQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useAccounts({ config, params }: UseAccountsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['accounts', params],
    queryFn: () => getAccounts({ params }),
    placeholderData: keepPreviousData,
  });
}
