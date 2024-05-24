import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getDivisions() {
  const res = await axios.get(`${BaseURL}/division`);
  return res.data.data;
}

export const useGetDivisions = () => {
  return useQuery({ queryKey: ['division'], queryFn: () => getDivisions() });
};
