import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getRequest(type?: string, date?: string, company_id?: number) {
  let URL = `${BaseURL}/request?company_id=${company_id}`;
  if (date) URL = `${BaseURL}/request?company_id=${company_id}&date=${date}`;
  if (type) URL = `${BaseURL}/request?types=${type}`;
  if (type && company_id) URL = `${BaseURL}/request?company=${company_id}&types=${type}`;
  if (type && date) URL = `${BaseURL}/request?company_id=${company_id}&date=${date}&types=${type}`;

  console.log('URL -->', URL);

  const res = await axios.get(URL);
  return res.data.data;
}

export const useGetRequest = (type?: string, date?: string, company_id?: number) => {
  return useQuery({
    queryKey: ['RequestData', type, date, company_id],
    queryFn: () => getRequest(type, date, company_id),
  });
};
