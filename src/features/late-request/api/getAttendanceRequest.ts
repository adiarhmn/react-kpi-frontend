import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAttendanceRequest(employee_id?: number) {
  const res = await axios.get(`${BaseURL}/attendance-request?employee=${employee_id}`);
  return res.data.data;
}

export const useGetAttendanceRequest = (employee_id?: number) => {
  return useQuery({
    queryKey: ['attendance_request', employee_id],
    queryFn: () => getAttendanceRequest(employee_id),
  });
};
