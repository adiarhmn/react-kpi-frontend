import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Employee, EmployeeQuery } from '../types';

type EmployeesRequest = {
  params?: EmployeeQuery;
};

export async function getEmployees({ params }: EmployeesRequest) {
  const res = await axios.get<PaginatedResult<Employee>>(`/employee`, { params });

  return res.data;
}

type QueryFnType = typeof getEmployees;

type UseEmployeesOptions = {
  params?: EmployeeQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useEmployees({ config, params }: UseEmployeesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employees', params],
    queryFn: () => getEmployees({ params }),
    placeholderData: keepPreviousData,
  });
}
