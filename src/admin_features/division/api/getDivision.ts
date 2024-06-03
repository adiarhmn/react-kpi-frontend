import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getDivisions(id_company?: number) {
  const res = await axios.get(`${BaseURL}/division?company=${id_company}`);
  return res.data.data;
}

export const useGetDivisions = (id_company?: number) => {
  return useQuery({ queryKey: ['division'], queryFn: () => getDivisions(id_company) });
};
