// API FOR SESSION
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGetAttendanceWorker = (company_id?: number, group_id?: number) => {
  return useQuery({
    queryKey: ['worker_attendance', company_id, group_id],
    queryFn: async () => {
      if (group_id) {
        const res = await axios.get(`${BaseURL}/worker-attendance?group=${group_id}`, {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`,
          },
        });
        return res.data.data;
      }

      const res = await axios.get(`${BaseURL}/worker-attendance?company=${company_id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      return res.data.data;
    },
  });
};

export const useGetReport = () => {
  return useMutation({
    mutationFn: async (group_id: string) => {
      const res = await axios.get(`${BaseURL}/generate-worker-report?group=${group_id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      });
      return res.data;
    },
  });
};
