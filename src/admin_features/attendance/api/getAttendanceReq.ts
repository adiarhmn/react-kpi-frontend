/* eslint-disable linebreak-style */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function getAttendance(company_id?: number, date?: string) {
  let URL = `${BaseURL}/attendance-request?company=${company_id}`;
  if (date) URL = `${BaseURL}/attendance-request?company=${company_id}&date=${date}`;

  const res = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAttendanceReq = (date?: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance_request', date, company_id],
    queryFn: () => getAttendance(company_id, date),
  });
};
