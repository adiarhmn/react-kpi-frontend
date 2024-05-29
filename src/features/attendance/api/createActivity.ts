import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type ActivityDataPost = {
  attendance_id?: number;
  name: string;
  description: string;
};

export const postCreateActivity = async (activityDataPost: ActivityDataPost) => {
  console.log('Data yang dikirim : ', activityDataPost);
  const response = await axios.post(`${BaseURL}/activity/`, activityDataPost);
  return response.data;
};

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: postCreateActivity,
    onMutate: async (activityDataPost: ActivityDataPost) => {
      console.log(activityDataPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
