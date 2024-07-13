import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const deleteFiles = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/employee-files/${id}`);
  return response.data;
};

export const useDeleteFiles = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteFiles(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
