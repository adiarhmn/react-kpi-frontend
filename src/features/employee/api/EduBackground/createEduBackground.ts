import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type EduBackgroundDataPost = {
  type: string;
  name: string;
  major: string;
  graduate_from: string;
  entry_year: string;
  graduation_year: string;
  employee_id?: number;
};

export const postCreateEduBackground = async (eduBackgroundDataPost: EduBackgroundDataPost) => {
  console.log('Data yang dikirim : ', eduBackgroundDataPost);
  const response = await axios.post(`${BaseURL}/employee-education/`, eduBackgroundDataPost);
  return response.data;
};

export const useCreateEduBackground = () => {
  return useMutation({
    mutationFn: postCreateEduBackground,
    onMutate: async (eduBackgroundDataPost: EduBackgroundDataPost) => {
      console.log(eduBackgroundDataPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
