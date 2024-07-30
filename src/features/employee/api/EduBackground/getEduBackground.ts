import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getEduBackground(employee: number | undefined) {
  const res = await axios.get(`${BaseURL}/employee-education?employee=${employee}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.message;
}

export const useGetEduBackground = (employee: number | undefined) => {
  return useQuery({
    queryKey: ['employee-education', employee],
    queryFn: () => getEduBackground(employee),
  });
};
