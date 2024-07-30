import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getPermissions() {
  const res = await axios.get(`${BaseURL}/request?type=izin`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetPermissions = () => {
  return useQuery({ queryKey: ['permissions'], queryFn: () => getPermissions() });
};
