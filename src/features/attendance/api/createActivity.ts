import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type ActivityDataPost = {
  attendance_id?: number;
  custom1: string | null;
  custom2: string | null;
  custom3: string | null;
  custom4: string | null;
  custom5: string | null;
  custom6: string | null;
  custom7: string | null;
  custom8: string | null;
  custom9: string | null;
  custom10: string | null;
  activity_lon: string;
  activity_lat: string;
};

export const postCreateActivity = async (activityDataPost: ActivityDataPost) => {
  console.log('Data yang dikirim : ', activityDataPost);
  const response = await axios.post(`${BaseURL}/activity-detail/`, activityDataPost);
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
