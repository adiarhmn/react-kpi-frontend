import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getWorker(group_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/worker?group=${group_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetWorker = (group_id: number | undefined) => {
  return useQuery({
    queryKey: ['worker', group_id],
    queryFn: () => getWorker(group_id),
  });
};
