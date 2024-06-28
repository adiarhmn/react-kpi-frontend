import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function deleteEmployee(id: number) {
  const res = await axios.delete(`${BaseURL}/employee/${id}`);
  return res.data;
}

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: (id: number) => deleteEmployee(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
