import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Outlet } from '@/features/outlet';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ResultResponse } from '@/types/api';

type EmployeesDTO = {
  id: number | 'me';
};

export async function getEmployeeOutlet({ id }: EmployeesDTO) {
  const res = await axios.get<ResultResponse<Outlet>>(`/employee/${id}/outlet`);

  return res.data;
}

type QueryFnType = typeof getEmployeeOutlet;

type UseEmployeesOptions = {
  id?: number | 'me';
  config?: QueryConfig<QueryFnType>;
};

export function useEmployeeOutlet({ id = 'me', config }: UseEmployeesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employee-outlets', id],
    queryFn: () => getEmployeeOutlet({ id }),
    placeholderData: keepPreviousData,
  });
}
