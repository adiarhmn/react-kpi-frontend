// API FOR SESSION

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetSession = (company_id: number) => {
  return useQuery({
    queryKey: ['session', company_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BaseURL}/session?company=${company_id}`);
        return res.data.data;
      } catch (e) {
        return [];
      }
    },
  });
};

export type SessionCreateType = {
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