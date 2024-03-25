import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Employee } from '../types';

type EmployeeDTO = {
  id: number | 'me';
};

export async function getEmployee({ id }: EmployeeDTO) {
  const res = await axios.get<Employee>(`/employee/${id}`);

  return res.data;
}

type QueryFnType = typeof getEmployee;

type UseEmployeesOptions = {
  id?: EmployeeDTO['id'];
  config?: QueryConfig<QueryFnType>;
};

export function useEmployee({ id = 'me', config }: UseEmployeesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employee', id],
    queryFn: () => getEmployee({ id }),
  });
}
