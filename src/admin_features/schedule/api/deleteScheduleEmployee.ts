import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function deleteScheduleEmployee(id: number) {
  const res = await axios.delete(`${BaseURL}/employee-schedule/${id}`);
  return res.data;
}

export const useDeleteScheduleEmployee = () => {
  return useMutation({
    mutationFn: (id: number) => deleteScheduleEmployee(id),
  });
};
