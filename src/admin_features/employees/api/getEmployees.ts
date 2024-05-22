import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getEmployees() {
  const res = await axios.get(`${BaseURL}/employee`);
  return res.data.data;
}


export const useGetEmployees = () => {
  return useQuery({ queryKey: ['employee'], queryFn: () => getEmployees() });
}