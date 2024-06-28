import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEmployeeLocation(employee_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/employee-location?employee=${employee_id}`);
  return res.data.data;
}

export const useGetEmployeeLocation = (employee_id: number | undefined) => {
  return useQuery({
    queryKey: ['employee-location', employee_id],
    queryFn: () => getEmployeeLocation(employee_id),
  });
};
