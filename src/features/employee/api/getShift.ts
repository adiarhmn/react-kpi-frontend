import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Shift } from '../types';

type ShiftDTO = {
  id: number;
};

export async function getShift({ id }: ShiftDTO) {
  const res = await axios.get<Shift>(`/shift/${id}`);

  return res.data;
}

type QueryFnType = typeof getShift;

type UseShiftOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useShift({ config, id }: UseShiftOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['shift', id],
    queryFn: () => getShift({ id }),
  });
}
