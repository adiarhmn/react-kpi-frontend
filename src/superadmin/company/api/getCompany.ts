import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getCompanys() {
  const res = await axios.get(`${BaseURL}/company`);
  return res.data.data;
}

export const useGetCompanys = () => {
  return useQuery({ queryKey: ['division'], queryFn: () => getCompanys() });
};
