import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type lateRequestPost = {
  employee_id: number | undefined | null;
  reason: string;
  attendance_request_lat: string;
  attendance_request_lon: string;
};

export const postCreateLateRequest = async (lateRequestPost: lateRequestPost) => {
  console.log('Data yang dikirim : ', lateRequestPost);
  const response = await axios.post(`${BaseURL}/attendance-request`, lateRequestPost);
  return response.data;
};

export const useCreateLateRequest = () => {
  return useMutation({
    mutationFn: postCreateLateRequest,
    onMutate: async (lateRequestPost: lateRequestPost) => {
      console.log(lateRequestPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
