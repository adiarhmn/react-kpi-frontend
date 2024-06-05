import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getActivitys() {
  const res = await axios.get(`${BaseURL}/activity`);
  return res.data.data;
}

export const useGetActivitys = () => {
  return useQuery({ queryKey: ['activity'], queryFn: () => getActivitys() });
};
