import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getSchedule() {
  const res = await axios.get(`${BaseURL}/employee-schedule`);
  return res.data;
}

export const useGetSchedule = () => {
  return useQuery({ queryKey: ['schedule'], queryFn: () => getSchedule() });
};
