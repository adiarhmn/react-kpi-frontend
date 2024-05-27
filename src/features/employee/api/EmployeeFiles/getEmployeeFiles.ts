import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEmployeeFiles(employee_id?: number | null) {
  const res = await axios.get(`${BaseURL}/employee-files?employee=` + employee_id);
  console.log('URL : ', `${BaseURL}/employee-files?employee=` + employee_id);
  return res.data;
}

export const useGetEmployeeFiles = (employee_id?: number | null) => {
  return useQuery({ queryKey: ['files'], queryFn: () => getEmployeeFiles(employee_id) });
};
