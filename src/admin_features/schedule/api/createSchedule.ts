import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:3000';
type SchedulePost = {
  date_start: string;
  date_end: string;
  employee_id: number;
};

const CreateSchedule = async (schedule: SchedulePost) => {
  const response = await axios.post(`${BaseURL}/schedule`, schedule);
  return response.data;
};

const useCreateSchedule = () => {
  return useMutation({
    mutationFn: CreateSchedule,
    onMutate: async (schedule: SchedulePost) => {
      console.log(schedule);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
