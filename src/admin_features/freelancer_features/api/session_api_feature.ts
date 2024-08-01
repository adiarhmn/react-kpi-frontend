// API FOR SESSION
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetSession = (company_id: number) => {
  return useQuery({
    queryKey: ['session', company_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BaseURL}/session?company=${company_id}`, {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        });
        return res.data.data;
      } catch (e) {
        return [];
      }
    },
  });
};

export type SessionCreateType = {
  id?: number;
  name: string;
  company_id: number;
};

export const useCreateSession = () => {
  return useMutation({
    mutationFn: async (data: SessionCreateType) => {
      const res = await axios.post(`${BaseURL}/session`, data);
      return res.data;
    },
  });
};

export const useUpdateSession = () => {
  return useMutation({
    mutationFn: async (data: SessionCreateType) => {
      const res = await axios.put(`${BaseURL}/session/${data.id}`, data);
      return res.data;
    },
  });
};
