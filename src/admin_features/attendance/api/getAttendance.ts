import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getAttendance(date: string) {
  const res = await axios.get(`${BaseURL}/schedule?date=${date}`);
  return res.data.data;
}

export const useGetAttendance = (date: string) => {
  return useQuery({ queryKey: ['attendance'], queryFn: () => getAttendance(date) });
};
