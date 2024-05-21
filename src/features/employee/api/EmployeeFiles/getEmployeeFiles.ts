import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEmployeeFiles(employee_id: number) {
  const res = await axios.get(`${BaseURL}/employee-files?employee=` + employee_id);
  return res.data.data;
}

export const useGetEmployeeFiles = (employee_id: number) => {
  return useQuery({ queryKey: ['division'], queryFn: () => getEmployeeFiles(employee_id) });
};
