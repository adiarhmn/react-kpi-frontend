import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getRequest(
  type?: string,
  date?: string,
  company_id?: number,
  status?: string
) {
  let URL = `${BaseURL}/request?company=${company_id}`;
  if (status && company_id) URL = `${BaseURL}/request?company=${company_id}&status=${status}`;
  if (type && company_id) URL = `${BaseURL}/request?company=${company_id}&types=${type}`;
  if (type && date) URL = `${BaseURL}/request?company=${company_id}&date=${date}&types=${type}`;
  if (type && date && company_id)
    URL = `${BaseURL}/request?company=${company_id}&date=${date}&types=${type}`;

  if (type && date && company_id && status)
    URL = `${BaseURL}/request?company=${company_id}&date=${date}&types=${type}&status=${status}`;

  const res = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetRequest = (
  type?: string,
  date?: string,
  company_id?: number,
  status?: string
) => {
  return useQuery({
    queryKey: ['RequestData', type, date, company_id, status],
    queryFn: () => getRequest(type, date, company_id, status),
  });
};
