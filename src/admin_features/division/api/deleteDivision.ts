import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const deleteDivision = async (id: number) => {
  const response = await axios.delete(`${BaseURL}/division/${id}`);
  return response;
};

export const useDeleteDivision = () => {
  return useMutation({
    mutationFn: (id: number) => deleteDivision(id),
  });
};
