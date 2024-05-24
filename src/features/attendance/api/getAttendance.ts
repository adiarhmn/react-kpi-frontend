import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAttendance(employee_id: number | undefined, date: string) {
  const res = await axios.get(`${BaseURL}/attendance?employee=${employee_id}&date=${date}`);
  return res.data.data;
}

export const useGetAttendance = (employee_id: number | undefined, date: string) => {
  return useQuery({
    queryKey: ['schedule', employee_id, date],
    queryFn: () => getAttendance(employee_id, date),
  });
};
