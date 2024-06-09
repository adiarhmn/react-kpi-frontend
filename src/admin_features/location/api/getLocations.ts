import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getLocations(company_id?: number) {
  const res = await axios.get(`${BaseURL}/attendance-location?company=${company_id}`);
  return res.data.data;
}

export const useGetLocations = (company_id?: number) => {
  return useQuery({ queryKey: ['location', company_id], queryFn: () => getLocations(company_id) });
};
