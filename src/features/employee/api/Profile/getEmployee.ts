import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEmployee(employee_id?: number | null) {
  const res = await axios.get(`${BaseURL}/employee/${employee_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetEmployee = (employee_id?: number | null) => {
  return useQuery({
    queryKey: ['employee', employee_id],
    queryFn: () => getEmployee(employee_id),
  });
};

export async function getEmployeeByDivision(division_id?: number) {
  const res = await axios.get(`${BaseURL}/employee?division-id=${division_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetEmployeeByDivision = (division_id?: number) => {
  return useQuery({
    queryKey: ['employee', division_id],
    queryFn: () => getEmployeeByDivision(division_id),
  });
};
