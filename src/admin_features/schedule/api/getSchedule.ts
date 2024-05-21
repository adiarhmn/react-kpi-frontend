import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getSchedule(month: number, year: number) {
  console.log(month, year);
  const res = await axios.get(`${BaseURL}/employee-schedule?month=${month}&year=${year}`);
  console.log(res.data);
  return res.data;
}

export const useGetSchedule = (month: number, year: number) => {
  return useQuery({ queryKey: ['schedule', month, year], queryFn: () => getSchedule(month, year) });
};
