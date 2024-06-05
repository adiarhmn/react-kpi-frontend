import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getOvertime(month?: number, year?: number) {
  const res = await axios.get(`${BaseURL}/overtime?month=${month}&year=${year}`);
  console.log('Data Overtime :', res.data);
  return res.data;
}

export const useGetOvertime = (month?: number, year?: number) => {
  return useQuery({ queryKey: ['overtime', month, year], queryFn: () => getOvertime(month, year) });
};
