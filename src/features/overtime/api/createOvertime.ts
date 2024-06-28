import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type overtimeDataPost = {
  attendance_id: number | undefined;
  detail: string;
  overtime_lat: string;
  overtime_lon: string;
};

export const postCreateOvertime = async (overtimeDataPost: overtimeDataPost) => {
  console.log('Data yang dikirim : ', overtimeDataPost);
  const response = await axios.post(`${BaseURL}/overtime/in`, overtimeDataPost);
  return response.data;
};

export const useCreateOvertime = () => {
  return useMutation({
    mutationFn: postCreateOvertime,
    onMutate: async (overtimeDataPost: overtimeDataPost) => {
      console.log(overtimeDataPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
