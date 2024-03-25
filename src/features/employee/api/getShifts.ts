import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Shift, ShiftQuery } from '../types';

type ShiftsDTO = {
  params?: ShiftQuery;
};

export async function getShifts({ params }: ShiftsDTO) {
  const res = await axios.get<PaginatedResult<Shift>>(`/shift`, { params });

  return res.data;
}

type QueryFnType = typeof getShifts;

type UseShiftsOptions = {
  params?: ShiftQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useShifts({ config, params }: UseShiftsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['shifts', params],
    queryFn: () => getShifts({ params }),
    placeholderData: keepPreviousData,
  });
}
