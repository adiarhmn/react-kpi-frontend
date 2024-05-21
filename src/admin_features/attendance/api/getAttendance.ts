import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getAttendance() {
  const res = await axios.get(`${BaseURL}/attendance`);
  console.log(res);
  return res.data.data;
}

export const useGetAttendance = () => {
  return useQuery({ queryKey: ['attendance'], queryFn: () => getAttendance() });
};
