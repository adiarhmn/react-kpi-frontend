import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getGroup() {
  const res = await axios.get(`${BaseURL}/group`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetGroup = () => {
  return useQuery({
    queryKey: ['group'],
    queryFn: () => getGroup(),
  });
};

export async function getGroupByCompany(company_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/group?company=${company_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetGroupByCompany = (company_id: number | undefined) => {
  return useQuery({
    queryKey: ['group', company_id],
    queryFn: () => getGroupByCompany(company_id),
  });
};
