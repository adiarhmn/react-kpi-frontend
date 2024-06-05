import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { RequestsType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function putRequest(data?: RequestsType) {
  if (!data) {
    return null;
  }
  const res = await axios.put(`${BaseURL}/request/${data.id}`, data);
  return res.data;
}

export const usePutRequest = () => {
  return useMutation({
    mutationFn: putRequest,
  });
};
