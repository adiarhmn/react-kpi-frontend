/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
import { AttendanceRequestType } from '@/features/late-request';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function putAttendanceRequest(data?: AttendanceRequestType) {
  if (!data) {
    return null;
  }
  const res = await axios.put(`${BaseURL}/attendance-request/${data.id}`, data);
  return res.data;
}

export const usePutAttendanceRequest = () => {
  return useMutation({
    mutationFn: putAttendanceRequest,
  });
};
