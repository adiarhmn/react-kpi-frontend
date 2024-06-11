import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type requestPost = {
  date_start: string;
  date_end: string;
  type: string;
  description: string;
  employee_id?: number;
};

export const postCreateRequest = async (requestPost: requestPost) => {
  console.log('Data yang dikirim : ', requestPost);
  const response = await axios.post(`${BaseURL}/request`, requestPost);
  return response.data;
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: postCreateRequest,
    onMutate: async (requestPost: requestPost) => {
      console.log(requestPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
