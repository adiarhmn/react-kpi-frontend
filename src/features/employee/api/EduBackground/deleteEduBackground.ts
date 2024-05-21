import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

const deleteEduBackground = async (id: number) => {
  const response = await axios.delete(`${BaseURL}/employee_education/${id}`);
  return response;
};

export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteEduBackground(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
