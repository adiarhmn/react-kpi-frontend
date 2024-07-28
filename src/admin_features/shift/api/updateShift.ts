import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type ShiftPost = {
  id: number;
  shift_name: string;
  start_time: string;
  end_time: string;
  shift_code: string;
  company_id?: number;
  is_active?: boolean | string;
};

const updateShift = async (shift: ShiftPost) => {
  const response = await axios.put(`${BaseURL}/shift/${shift.id}`, shift);
  return response.data;
};

export const useUpdateShift = () => {
  return useMutation({
    mutationFn: updateShift,
  });
};
