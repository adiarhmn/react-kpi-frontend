import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getRequest(type?: string) {
  const res = await axios.get(`${BaseURL}/request?types=${type}`);
  return res.data.data;
}

export const useGetRequest = (type?: string) => {
  return useQuery({ queryKey: ['Request'], queryFn: () => getRequest(type) });
};
