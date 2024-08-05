import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { EmployeeType } from '@/admin_features/types';
import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getEmployees(company_id?: number, division_id?: number, sex?: string) {
  let url = `${BaseURL}/employee`;
  if (company_id) url += `?company=${company_id}`;
  if (division_id) url += `&division=${division_id}`;
  if (sex) url += `&sex=${sex}`;
  url += '&status=1';

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  console.log(url, res.data.data);
  return res.data.data;
}

async function getEmployeeByID(id: number) {
  const res = await axios.get(`${BaseURL}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetEmployees = (company_id?: number, division_id?: number, sex?: string) => {
  return useQuery({
    queryKey: ['employee', company_id, division_id, sex],
    queryFn: () => getEmployees(company_id, division_id, sex),
  });
};

export const useGetEmployee = (id: number) => {
  return useQuery<EmployeeType>({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeByID(id),
  });
};
