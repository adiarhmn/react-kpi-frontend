import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEmployee(employee_id?: number | null) {
  const res = await axios.get(`${BaseURL}/employee/${employee_id}`);
  return res.data.data;
}

export const useGetEmployee = (employee_id?: number | null) => {
  return useQuery({
    queryKey: ['employee', employee_id],
    queryFn: () => getEmployee(employee_id),
  });
};
