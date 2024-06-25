/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
import { OvertimeType } from '@/features/overtime/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function putOvertime(data?: OvertimeType) {
  if (!data) {
    return null;
  }
  const res = await axios.put(`${BaseURL}/overtime/approval/${data.id}`, data);
  return res.data;
}

export const usePutOvertime = () => {
  return useMutation({
    mutationFn: putOvertime,
  });
};
