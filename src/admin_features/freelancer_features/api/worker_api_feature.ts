import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetWorkers = (company_id: number, status: number = 2) => {
  return useQuery({
    queryKey: ['workers', company_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BaseURL}/worker?status=${status}&company=${company_id}`);
        return res.data.data;
      } catch (e) {
        return [];
      }
    },
  });
};

export type WorkerCreateType = {
  name: string;
  status: number;
  company_id: number;
  nip: string;
  user_id: number;
  division_id: number;
};

export const useCreateWorker = () => {
  return useMutation({
    mutationFn: async (data: WorkerCreateType) => {
      const res = await axios.post(`${BaseURL}/worker`, data);
      return res.data;
    },
  });
};
