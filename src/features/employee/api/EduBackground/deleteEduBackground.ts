import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const deleteEduBackground = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/employee-education/${id}`);
  return response.data;
};

export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteEduBackground(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
