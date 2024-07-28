import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getWorker(company_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/worker?status=2&company=${company_id}`);
  return res.data.data;
}

export const useGetWorker = (company_id: number | undefined) => {
  return useQuery({
    queryKey: ['worker', company_id],
    queryFn: () => getWorker(company_id),
  });
};
