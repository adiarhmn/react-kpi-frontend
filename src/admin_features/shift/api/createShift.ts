import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type ShiftPost = {
  shift_name: string;
  start_time: string;
  end_time: string;
  shift_code: string;
  company_id?: number;
};

const CreateShift = async (shift: ShiftPost) => {
  const response = await axios.post(`${BaseURL}/shift`, shift);
  return response.data;
};

export const useCreateShift = () => {
  return useMutation({
    mutationFn: CreateShift,
  });
};
