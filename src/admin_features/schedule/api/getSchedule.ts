import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getSchedule(month: number, year: number, company_id?: number) {
  const res = await axios.get(
    `${BaseURL}/employee-schedule?company=${company_id}&month=${month}&year=${year}`
  );
  return res.data;
}

export const useGetSchedule = (month: number, year: number, company_id?: number) => {
  return useQuery({
    queryKey: ['schedule', month, year],
    queryFn: () => getSchedule(month, year, company_id),
  });
};
