import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getAttendance(date: string, company_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&company=${company_id}&date=${date}`);
  return res.data.data;
}

export const useGetAttendance = (date: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance', date, company_id],
    queryFn: () => getAttendance(date, company_id),
  });
};
