import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getShift(company_id?: number) {
  const res = await axios.get(`${BaseURL}/shift?company=${company_id}`);
  return res.data.data;
}

export const useGetShift = (company_id?: number) => {
  return useQuery({ queryKey: ['shift'], queryFn: () => getShift(company_id) });
};
