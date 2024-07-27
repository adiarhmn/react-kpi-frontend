import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
export async function getLocationEmployees(employee_id?: number) {
  const url = `${BaseURL}/employee-location?employee=${employee_id}`;

  const res = await axios.get(url);
  return res.data.data;
}

export const useGetLocationEmployees = (employee_id?: number) => {
  return useQuery({
    queryKey: ['employee', employee_id],
    queryFn: () => getLocationEmployees(employee_id),
  });
};
