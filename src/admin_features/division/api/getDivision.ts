import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getDivisions(id_company?: number) {
  const token = storage.getToken();
  const res = await axios.get(`${BaseURL}/division?company=${id_company}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}

export const useGetDivisions = (id_company?: number) => {
  return useQuery({ queryKey: ['division', id_company], queryFn: () => getDivisions(id_company) });
};
