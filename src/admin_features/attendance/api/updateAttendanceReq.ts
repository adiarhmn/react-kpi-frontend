import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { AttendanceReqType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function putAttendanceRequest(data?: AttendanceReqType) {
  if (!data) {
    throw new Error('Data is required');
  }
  const res = await axios.put(`${BaseURL}/attendance-request/${data.id}`, data);
  return res.data;
}

export const usePutAttendanceRequest = () => {
  return useMutation({
    mutationFn: putAttendanceRequest,
  });
};
